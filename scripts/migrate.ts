import * as fs from 'fs';
import * as path from 'path';

interface MigrationMove {
  from: string;
  to: string;
}

interface KataGroup {
  dir: string;
  category: string;
  numStr: string;
  number: number;
  mdFile: string;
  tsFiles: string[];
  testFile?: string;
}

interface MigrationItem {
  category: string;
  folderName: string;
  targetDir: string;
  title: string;
  moves: MigrationMove[];
  rewriteImports?: { file: string; fromImport: string; toImport: string }[];
}

const CATEGORY_MAP: Record<string, string> = {
  arrays: 'arrays',
  strings: 'strings',
  hash: 'hash-tables',
  dynamic: 'dynamic-programming',
  lists: 'linked-lists',
  math: 'math',
  'javascript/easy': 'javascript',
  'javascript/medium': 'javascript',
};

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractTitle(mdContent: string): string | null {
  const lines = mdContent.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('# ')) {
      let title = line.substring(2).trim();
      title = title.replace(/^Kata\s+\d+\s*[\u2013\-]\s*/i, '');
      title = title.replace(/^\d+\.\s*/, '');
      title = title.replace(
        /^[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{200D}\u{FE0F}]+\s*/u,
        ''
      );
      return title.trim();
    }
  }
  return null;
}

function scanKatas(srcDir: string): { groups: KataGroup[]; unhandled: string[] } {
  const allFiles: string[] = [];

  function walk(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        allFiles.push(fullPath);
      }
    }
  }

  walk(srcDir);

  const groupMap: Record<string, Partial<KataGroup>> = {};
  const unhandled: string[] = [];

  for (const filePath of allFiles) {
    const relPath = path.relative(srcDir, filePath);
    const parsed = path.parse(relPath);

    // Matches e.g. kata_01.md, kata_01.ts, kata_01.test.ts, kata_02a.ts, kata_01. md
    // Note the space in "kata_01. md"
    const match = parsed.base.match(/^(kata_(\d+)[a-z]?)(?:\.(test))?\.\s*(md|ts|js)$/i);

    if (!match) {
      unhandled.push(filePath);
      continue;
    }

    const kataKey = `${parsed.dir}/kata_${match[2].padStart(2, '0')}`;
    if (!groupMap[kataKey]) {
      const catKey = parsed.dir;
      const mappedCat = CATEGORY_MAP[catKey] || catKey;
      groupMap[kataKey] = {
        dir: parsed.dir,
        category: mappedCat,
        numStr: match[2].padStart(2, '0'),
        number: parseInt(match[2], 10),
        tsFiles: [],
      };
    }

    const group = groupMap[kataKey];
    const isTest = Boolean(match[3]);
    const ext = match[4].toLowerCase();

    if (ext === 'md') {
      group.mdFile = filePath;
    } else if (isTest) {
      group.testFile = filePath;
    } else if (ext === 'ts') {
      group.tsFiles!.push(filePath);
    } else {
      unhandled.push(filePath);
    }
  }

  const groups: KataGroup[] = [];
  for (const key of Object.keys(groupMap)) {
    const g = groupMap[key];
    if (g.mdFile && g.category && g.numStr && g.number !== undefined && g.tsFiles) {
      groups.push(g as KataGroup);
    } else {
      // Missing vital parts
      if (g.mdFile) unhandled.push(g.mdFile);
      if (g.testFile) unhandled.push(g.testFile);
      if (g.tsFiles) unhandled.push(...g.tsFiles);
    }
  }

  return { groups, unhandled };
}

export function generateMigrationPlan(srcDir: string = 'src'): {
  plan: MigrationItem[];
  unhandled: string[];
} {
  const { groups, unhandled } = scanKatas(srcDir);
  const plan: MigrationItem[] = [];

  for (const g of groups) {
    const mdContent = fs.readFileSync(g.mdFile, 'utf8');
    const title = extractTitle(mdContent);
    if (!title) {
      unhandled.push(g.mdFile, ...g.tsFiles);
      if (g.testFile) unhandled.push(g.testFile);
      continue;
    }

    const slug = slugify(title);
    const folderName = `${g.numStr}-${slug}`;
    const targetDir = path.join(srcDir, g.category, folderName);

    const moves: MigrationMove[] = [
      { from: g.mdFile, to: path.join(targetDir, 'README.md') },
    ];

    g.tsFiles.sort();
    if (g.tsFiles.length === 1) {
      moves.push({ from: g.tsFiles[0], to: path.join(targetDir, 'solution.ts') });
    } else {
      g.tsFiles.forEach((file) => {
        const base = path.basename(file);
        const letterMatch = base.match(/kata_\d+([a-z]+)\.ts$/i);
        const letter = letterMatch ? letterMatch[1].toLowerCase() : 'a';
        moves.push({
          from: file,
          to: path.join(targetDir, `solution-${letter}.ts`),
        });
      });
    }

    if (g.testFile) {
      moves.push({
        from: g.testFile,
        to: path.join(targetDir, 'solution.test.ts'),
      });
    }

    plan.push({
      category: g.category,
      folderName,
      targetDir,
      title,
      moves,
    });
  }

  return { plan, unhandled };
}

export function executeMigration(isDryRun: boolean = false): void {
  const { plan, unhandled } = generateMigrationPlan('src');

  console.log(`=== MIGRATION ANALYSIS (${isDryRun ? 'DRY RUN' : 'LIVE RUN'}) ===\n`);

  console.log(`Found ${plan.length} katas to migrate.\n`);

  for (const item of plan) {
    console.log(`📍 Kata: "${item.title}"`);
    console.log(`   Target Directory: ${item.targetDir}`);
    console.log(`   File operations:`);
    for (const m of item.moves) {
      console.log(`     - ${m.from}  ==>  ${m.to}`);
    }
    console.log('');
  }

  if (unhandled.length > 0) {
    console.log('⚠️ UNHANDLED / SKIPPED FILES (Could not determine kata or skipped):');
    for (const u of unhandled) {
      console.log(`  - ${u}`);
    }
    console.log('');
  }

  if (isDryRun) {
    console.log('✨ Dry run complete. No files were modified.');
    return;
  }

  // Execute migration
  console.log('🚀 Executing migration...');

  for (const item of plan) {
    fs.mkdirSync(item.targetDir, { recursive: true });

    for (const m of item.moves) {
      let content = fs.readFileSync(m.from, 'utf8');

      // If moving test file, update import `./kata_XX` to `./solution`
      if (m.to.endsWith('solution.test.ts')) {
        content = content.replace(/(from\s+['"])\.\/kata_\d+(['"])/g, '$1./solution$2');
      }

      fs.writeFileSync(m.to, content, 'utf8');
      fs.unlinkSync(m.from);
    }
  }

  // Clean up empty directories in src/
  function cleanupEmptyDirs(dir: string) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) {
        cleanupEmptyDirs(full);
      }
    }
    if (fs.readdirSync(dir).length === 0 && dir !== 'src') {
      fs.rmdirSync(dir);
    }
  }

  cleanupEmptyDirs('src');

  console.log('✅ Migration completed successfully!');
}

if (require.main === module) {
  const isDryRun = process.argv.includes('--dry-run');
  executeMigration(isDryRun);
}
