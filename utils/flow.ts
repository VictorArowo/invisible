const asyncFlow = (...fns: any[]) => (input: string) =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(input));

export default asyncFlow;
