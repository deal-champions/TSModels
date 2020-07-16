export const Logger = {
  shouldLog: false,
  warnUninitializedClass: () =>
    Logger.shouldLog &&
    console.warn(
      'This instance contains uninitialized fields. This should only happen while (de)serializing'
    )
};
