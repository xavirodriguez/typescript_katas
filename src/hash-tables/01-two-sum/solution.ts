function twoSum(nums: number[], target: number): number[] {
  const mapa = new Map();
  nums.forEach((v, k) => {
    mapa.set(v, k);
  });
  for (let i = 0; i <= nums.length; i++) {
    const needle = target - nums[i];
    if (mapa.has(needle) && mapa.get(needle) != i) {
      return [mapa.get(needle), i];
    }
  }
  return [0, 0];
}

const numeros = [2, 7, 11, 15];
const numeros2 = [3, 3];
console.log(twoSum(numeros2, 6));
//console.log(twoSum(numeros, 9));
