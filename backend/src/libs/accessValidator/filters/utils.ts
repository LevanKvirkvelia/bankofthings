import { Type } from "@sinclair/typebox";

export const Chains = Type.Union([
  Type.Literal("eth"),
  Type.Literal("ropsten"),
  Type.Literal("bsc"),
  Type.Literal("goerli"),
  Type.Literal("polygon"),
  Type.Literal("avalanche"),
  Type.Literal("fantom"),
  Type.Literal("rinkeby"),
]);

export function reversePromise(promise) {
  return new Promise((resolve, reject) =>
    Promise.resolve(promise).then(reject, resolve)
  );
}

export function rejectOnFalse(promise: Promise<boolean>) {
  return new Promise((resolve, reject) =>
    promise
      .then((r) => {
        if (!!r) resolve(true);
        else reject(false);
      })
      .catch((e) => reject(e))
  );
}

export function promiseAny(iterable) {
  return reversePromise(Promise.all([...iterable].map(reversePromise)));
}
