Array.prototype.myFilter = function (callbackFn, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callbackFn.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myMap = function (callbackFn, thisArg) {
  const length = this.length;
  const result = new Array(length);
  for (let i = 0; i < this.length; i++) {
    if (Object.hasOwn(this, i)) {
      result[i] = callbackFn.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

const obj = { val: 20 };
const arr = [11, 22, 23, 54];
const filtered = arr.myFilter(function (data) {
  return data > this.val;
}, obj);
const mapped = arr.myMap(function (data) {
  return data + this.val;
}, obj);
//These callbacks doesn't work for arrow function

console.log('Filtered: ', filtered);
console.log('Mapped: ', mapped);

Array.prototype.myReduce = function (callbackFn, initialValue) {
  const isInitialValue = initialValue !== undefined;
  if (!isInitialValue && this.length == 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  let acc = isInitialValue ? initialValue : this[0];
  const index = isInitialValue ? 0 : 1;
  for (let i = index; i < this.length; i++) {
    if (Object.hasOwn(this, i)) {
      acc = callbackFn(acc, this[i], i, this);
    }
  }
  return acc;
};

const sum = [1, 2, 3].myReduce((prev, curr) => prev + curr, 4);
console.log('Reduced: ', sum);

function flatten(value) {
  // Recursive
  // return value.reduce((acc, curr) => {
  //   return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  // }, []);

  const copy = value.slice();
  const result = [];

  while (copy.length !== 0) {
    const element = copy.shift();
    if (Array.isArray(element)) {
      copy.unshift(...element);
    } else {
      result.push(element);
    }
  }
  return result;
}

console.log('Flattened: ', flatten([1, [2, [3, [4, [5]]]]]));

function jsonStringify(value) {
  if (typeof value !== 'object' || value === null) {
    return typeof value === 'string' ? `"${value}"` : String(value);
  }

  if (Array.isArray(value)) {
    const arrElements = value.map((elem) => jsonStringify(elem));
    return `[${arrElements.join(',')}]`;
  }

  const objValues = Object.entries(value).map(
    ([key, val]) => `"${key}":${jsonStringify(val)}`
  );
  return `{${objValues.join(',')}}`;
}
console.log(jsonStringify({ foo: 'bar', bar: [1, 2, 3] }));
