function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  if (x < 10) {
    return true;
  }
  const arr: Array<string> = x.toString().split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr[arr.length - i - 1]) return false;
  }
  return true;
}

const xx = 121;
console.log(isPalindrome(xx));
