export const getDates = () => {
  const dates = [];
  const today = new Date();

  // Add three days before today
  for (let i = 3; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push({
      id: date.getTime().toString(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      fullDate: date
    });
  }

  // Add today
  dates.push({
    id: today.getTime().toString(),
    day: 'Today',
    date: today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
    fullDate: today,
    isSelected: true
  });

  // Add seven days after today
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      id: date.getTime().toString(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      fullDate: date
    });
  }

  // Add calendar button
  dates.push({
    id: 'calendar',
    day: '',
    date: '',
    isCalendar: true
  });

  return dates;
};

export const formatDate = (date) => {
  return {
    id: date.getTime().toString(),
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
    fullDate: date
  };
}; 