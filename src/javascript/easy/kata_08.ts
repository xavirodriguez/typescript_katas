function* fibGenerator(): Generator<number, any, number> {
  let preprev = 0;
  let prev = 0;
  let aux;
  yield 0;
  prev = 1;
  yield 1;

  while (true) {
    aux = preprev;
    preprev = prev;
    prev = preprev + aux;
    yield prev;
  }
}
