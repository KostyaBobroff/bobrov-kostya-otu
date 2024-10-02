const obj1 = {
  a: {
    b: 1,
  },
};

const obj2 = {
  a: {
    b: 2,
  },
};

const obj3 = {
  a: {
    b: 1,
  },
};

const OK = true

const deepEqual = (actual, expected) => {
  const calculateDeep = (a, e) => {
    if (typeof a !== typeof e) {
      return "";
    }

    if (Array.isArray(a)) {
      if (a.length !== e.length) {
        return "";
      }

      for (let i = 0; i < a.length; i++) {
        const result = calculateDeep(a[i], e[i]);
        if (result !== OK) {
          return result !== "" ? `${i}.${result}` : `${i}`;
        }
      }

      return OK;
    }

    if (typeof a === "object") {
      const result = calculateDeep(Object.keys(a), Object.keys(e));
      if (result !== OK) {
        return "";
      }

      const entries = Object.entries(a);
      for (let i = 0; i < entries.length; i++) {
        const [key, val] = entries[i];
        const expectedVal = e[key];
        const result = calculateDeep(val, expectedVal);
        if (result !== OK) {
          return result !== "" ? `${key}.${result}` : key;
        }
      }

      return OK;
    }

    if (a === e) {
      return OK;
    }

    return "";
  };

  const result = calculateDeep(actual, expected);

  return result !== OK ? `Error: ${result}` : "OK";
};

console.log(deepEqual(obj1, obj1));
// OK
console.log(deepEqual(obj1, obj2));
// Error: a.b
console.log(deepEqual(obj1, obj3));
// OK
