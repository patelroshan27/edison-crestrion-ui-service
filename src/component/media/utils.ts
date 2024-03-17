const secondsInMinute = 60;
export const formatSecondsToMinutes = (seconds: number): string => {
  if (!seconds) return '0';

  const secondsPart = seconds % secondsInMinute;
  const minutes = Math.floor(seconds / secondsInMinute);
  return `${minutes}:${secondsPart < 10 ? `0${secondsPart}` : secondsPart}`;
};
