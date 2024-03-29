const secondsInMinute = 60;
export const formatSecondsToMinutes = (seconds: number): string => {
  if (!seconds) return '0';

  const secondsPart = seconds % secondsInMinute;
  const minutes = Math.floor(seconds / secondsInMinute);
  return `${minutes}:${secondsPart < 10 ? `0${secondsPart}` : secondsPart}`;
};

export const onMediaPlayerAction = (
  apiPromise: Promise<void>,
  cb: () => void,
): void => {
  apiPromise
    // wait 1s so muse API returns proper status
    .then(() => setTimeout(cb, 200))
    .catch((err) => console.log(err));
};
