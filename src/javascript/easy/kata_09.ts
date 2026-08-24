class Counter {
  state: number;
  init: number;
  constructor(n: number) {
    this.state = n;
    this.init = n;
  }
  increment() {
    return ++this.state;
  }
  decrement() {
    return --this.state;
  }
  reset() {
    this.state = this.init;
    return this.state;
  }
}
function createCounter(init: number): Counter {
  return new Counter(init);
}

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
