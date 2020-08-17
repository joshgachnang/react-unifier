import uniformRowLayout from "./uniformRowLayout";

const stubCache = (
  measurements: {
    [item: string]: number;
  } = {}
) => {
  let cache = measurements;

  return {
    get(item: string) {
      return cache[item];
    },
    has(item: number) {
      return !!cache[item];
    },
    set(item: any, value: any) {
      cache[item] = value;
    },
    reset() {
      cache = {};
    },
  };
};

test("empty", () => {
  const layout = uniformRowLayout({
    cache: stubCache(),
    width: 500,
  });
  // $FlowFixMe: new errors found from flow 0.96 upgrade
  expect(layout([])).toEqual([]);
});

test("one row, equal heights", () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 100,
      c: 100,
    }),
    width: 500,
  });

  // $FlowFixMe: new errors found from flow 0.96 upgrade
  expect(layout(["a", "b", "c"])).toEqual([
    {top: 0, left: 0, width: 236, height: 100},
    {top: 0, left: 250, width: 236, height: 100},
    {top: 0, left: 500, width: 236, height: 100},
  ]);
});

test("one column, equal heights", () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 100,
      c: 100,
    }),
    width: 250,
    minCols: 1,
  });
  // $FlowFixMe: new errors found from flow 0.96 upgrade
  expect(layout(["a", "b", "c"])).toEqual([
    {top: 0, left: 0, width: 236, height: 100},
    {top: 114, left: 0, width: 236, height: 100},
    {top: 228, left: 0, width: 236, height: 100},
  ]);
});

test("one row, unequal heights", () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 120,
      c: 100,
    }),
    width: 500,
  });
  // $FlowFixMe: new errors found from flow 0.96 upgrade
  expect(layout(["a", "b", "c"])).toEqual([
    {top: 0, left: 0, width: 236, height: 100},
    {top: 0, left: 250, width: 236, height: 120},
    {top: 0, left: 500, width: 236, height: 100},
  ]);
});

test("multiple rows, unequal heights", () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 120,
      c: 100,
      d: 100,
    }),
    width: 750,
  });
  // $FlowFixMe: new errors found from flow 0.96 upgrade
  expect(layout(["a", "b", "c", "d"])).toEqual([
    {top: 0, left: 0, width: 236, height: 100},
    {top: 0, left: 250, width: 236, height: 120},
    {top: 0, left: 500, width: 236, height: 100},
    {top: 134, left: 0, width: 236, height: 100},
  ]);
});