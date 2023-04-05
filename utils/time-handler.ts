import moment from 'moment';
class TimeHandler {
  public static getDate(date: Date) {
    return moment(date).utcOffset('+05:30').format('MMM Do YY');
  }
}

export default TimeHandler;
