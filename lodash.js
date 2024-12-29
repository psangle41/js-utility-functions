function deepEqual(valueA, valueB) {
  // Checks both values are exactly same
  // NaN, NaN --> true
  // [], [] --> false
  if (Object.is(valueA, valueB)) {
    return true;
  }

  //const valueA = [1, 2, 3];
  // Using .call() (Correct)
  // console.log(Object.prototype.toString.call(valueA));
  // Output: "[object Array]"
  // Without .call() (Incorrect)
  // console.log(Object.prototype.toString(valueA));
  // Output: "[object Object]" (or throws an error in strict mode)
  const isBothObjects =
    Object.prototype.toString.call(valueA) === '[object Object]' &&
    Object.prototype.toString.call(valueB) === '[object Object]';

  const isBothArray = Array.isArray(valueA) && Array.isArray(valueB);

  if (!isBothArray && !isBothObjects) {
    return false;
  }

  if (Object.keys(valueA).length !== Object.keys(valueB).length) {
    return false;
  }

  for (const key of Object.keys(valueA)) {
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  return true;
}
console.log(deepEqual('foo', 'foo')); // true
console.log(deepEqual({ id: 1 }, { id: 1 })); // true
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([{ id: '1' }], [{ id: '2' }])); // false
