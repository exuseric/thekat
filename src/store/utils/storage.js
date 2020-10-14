const ADD_ITEMS = (data) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let form = key.toLowerCase().includes('form');
      let menu = key.toLowerCase().includes('menu');
      if (!form && !menu)
        localStorage.setItem(key, JSON.stringify(data[key], null, 2));
    }
  }
};

const GET_ITEMS = (data) => {
  let state = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      Object.defineProperty(state, key, {
        value: JSON.parse(localStorage.getItem(key)),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }

  return state;
};

export { GET_ITEMS, ADD_ITEMS };
