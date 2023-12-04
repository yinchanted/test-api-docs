Prism.languages.jwt = {
  header: {
    pattern: /(eyJh[^.]*\.)/,
    greedy: true,
  },
  payload: {
    pattern: /([^.]*)\./,
    greedy: true,
  },
  signature: {
    pattern: /([^.]*$)/,
    greedy: true,
  },
};
