export const Logger = {
  warnUninitializedClass: () =>
    console.warn(
      'This instance contains uninitialized fields. This should only happen while (de)serializing'
    )
};
