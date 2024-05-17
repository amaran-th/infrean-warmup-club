const formatTime = (date) => {
  const today = new Date(date);
  const hours = today.getHours() % 12 ? today.getHours() % 12 : 12;
  const minutes =
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
  const ampm = today.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${ampm}`;
};

export { formatTime };
