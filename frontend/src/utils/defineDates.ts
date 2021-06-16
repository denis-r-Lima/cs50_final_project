export default function defineDates(week: number) {
  let daysOfTheWeek: Date[] = []
  const today = new Date(Date.now())

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      Date.now() + (i - today.getDay() + 7 * week) * 24 * 60 * 60 * 1000
    )
    daysOfTheWeek.push(new Date(date.setHours(0, 0, 0, 0)))
  }

  return daysOfTheWeek
}
