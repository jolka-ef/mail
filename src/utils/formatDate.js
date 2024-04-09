import { format } from 'date-fns';

export function formatDate(sentAt) {
  const currentYear = new Date().getFullYear();
  let dateAndMonth = format(new Date(sentAt), 'MMM do');
  let year = format(new Date(sentAt), 'yyyy');
  if (year == currentYear) {
    return dateAndMonth;
  } else {
    return `${dateAndMonth} ${year}`;
  }
}
