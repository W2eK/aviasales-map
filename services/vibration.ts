export const vibrate = (() => {
  let canVibrate = true;
  return (duration: number) => {
    canVibrate =
      canVibrate && !!navigator.vibrate && navigator.vibrate(duration);
  };
})();
