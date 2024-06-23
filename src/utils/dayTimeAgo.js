const dayTimeAgo = (timestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  // Calculate the difference in milliseconds
  const differenceMs = currentDate.getTime() - targetDate.getTime();

  // Calculate hours and minutes difference
  const hoursAgo = Math.floor(differenceMs / (1000 * 60 * 60));
  const minutesAgo = Math.floor(differenceMs / (1000 * 60));

  // Check if it's the same day
  const isSameDay = currentDate.toDateString() === targetDate.toDateString();

  // Construct the output string based on the difference
  if (isSameDay) {
    if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else {
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    }
  } else {
    const daysAgo = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const plural = daysAgo === 1 ? "" : "s"; // Pluralize 'day' if necessary
    return `${daysAgo} day${plural} ago`;
  }
};

export default dayTimeAgo;