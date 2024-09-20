import moment from 'moment-timezone';

export default function TimestampConverter(timestamp?: Date, format : string = 'YYYY-MM-DD HH:mm:ss') {
    // Convert timestamp to Jakarta timezone
    return moment(timestamp).tz('Asia/Jakarta').format(format);
}