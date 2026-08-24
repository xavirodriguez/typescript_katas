class TimeLimitedCacheb {
  private cache: { [key: number]: { value: number; timer: NodeJS.Timeout } };

  constructor() {
    this.cache = {};
  }

  set(key: number, value: number, duration: number): boolean {
    let result = false;
    if (this.cache.hasOwnProperty(key)) {
      result = true;
      clearTimeout(this.cache[key].timer);
    }

    let ref = this;
    const timeOutId = setTimeout(() => {
      delete ref.cache[key];
    }, duration);

    this.cache[key] = { value, timer: timeOutId };
    return result;
  }

  get(key: number): number {
    if (!this.cache.hasOwnProperty(key)) {
      return -1;
    }
    return this.cache[key].value;
  }

  count(): number {
    return Object.keys(this.cache).length;
  }
}
