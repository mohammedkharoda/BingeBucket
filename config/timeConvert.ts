function convertMinutesToHoursAndMinutes(runtime: number) {
  if (!runtime) return "N/A"; // handle cases where runtime is not defined

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours} hr ${minutes} min`;
}

export { convertMinutesToHoursAndMinutes };
