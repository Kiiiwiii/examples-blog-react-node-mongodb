import * as moment from 'moment';
// @TODO, extend options if necessary
function DatePipe(date: Date | number | string, options?: any) {
  return moment(date).format(options);
}

export default DatePipe;