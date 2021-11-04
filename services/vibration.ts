export const vibrate = (() => {
  let couldVibrate = true;
  return (duration: number) => {
    couldVibrate = couldVibrate && navigator.vibrate(duration);
  };
})();
