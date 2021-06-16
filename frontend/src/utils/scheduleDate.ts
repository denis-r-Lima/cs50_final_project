export default function scheduleDate(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

export function transformDate(date: Date, showHour: boolean = false) {
  const weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return `${weekDay[date.getDay()]}, ${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${
    showHour
      ? date.getHours() < 12
        ? `@ ${date.getHours()}:00 AM`
        : date.getHours() === 12
        ? '@ 12:00 PM'
        : `@ ${date.getHours() - 12}:00 PM`
      : ''
  }`
}
