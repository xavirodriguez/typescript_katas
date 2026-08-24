class TimeLimitedCache {
  // Usamos un Map para asociar la clave numérica a un objeto
  // que contiene el valor y el tiempo de expiración.
  private cache = new Map<number, { value: number; expiration: number }>();

  /**
   * @param {number} key
   * @param {number} value
   * @param {number} duration em milisegundos
   * @return {boolean} true si ya existía una clave sin expirar.
   */
  set(key: number, value: number, duration: number): boolean {
    const now = Date.now();
    const hasUnexpiredKey = this.cache.has(key) && this.cache.get(key)!.expiration > now;

    this.cache.set(key, {
      value: value,
      expiration: now + duration,
    });

    return hasUnexpiredKey;
  }

  /**
   * @param {number} key
   * @return {number} el valor si la clave existe y no ha expirado, -1 en otro caso.
   */
  get(key: number): number {
    const entry = this.cache.get(key);
    if (entry && Date.now() < entry.expiration) {
      return entry.value;
    }
    return -1;
  }

  /**
   * @return {number} el número de claves sin expirar.
   */
  count(): number {
    const now = Date.now();
    let count = 0;
    // Iteramos sobre los valores del map para comprobar la expiración.
    this.cache.forEach((entry, key) => {
      if (now < entry.expiration) {
        count++;
      } else {
        this.cache.delete(key);
      }
    });
    return count;
  }
}

// --- Bloque de Verificación ---
const cache = new TimeLimitedCache();

// 1. Añadir una nueva clave
console.log('Añadiendo clave 1 (debe devolver false):', cache.set(1, 42, 100)); // false

// 2. Obtener la clave antes de que expire
console.log('Obteniendo clave 1 (debe devolver 42):', cache.get(1)); // 42

// 3. Contar claves activas
console.log('Contador (debe ser 1):', cache.count()); // 1

// 4. Sobrescribir clave 1 (debe devolver true)
console.log('Sobrescribiendo clave 1 (debe devolver true):', cache.set(1, 50, 200)); // true

// 5. Esperar a que la clave expire
setTimeout(() => {
  console.log('\n--- Después de 250ms ---');
  console.log('Obteniendo clave 1 (debe devolver -1):', cache.get(1)); // -1
  console.log('Contador (debe ser 0):', cache.count()); // 0
}, 250);
