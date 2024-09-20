import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const singleDateParamGenerator = (
  date: string,
  dateField = 'dateRange',
) => {
  const userTimeZone = dayjs.tz.guess()

  const localDay = dayjs.tz(date, userTimeZone)
  const startDateLocal = localDay.startOf('day')
  const endDateLocal = localDay.endOf('day')

  const startDateUTC = startDateLocal.utc()
  const endDateUTC = endDateLocal.utc()

  return {
    [`${dateField}[0]`]: startDateUTC.format('YYYY-MM-DDTHH:mm:ss[Z]'),
    [`${dateField}[1]`]: endDateUTC.format('YYYY-MM-DDTHH:mm:ss[Z]'),
  }
}
