import { format, fromUnixTime, isValid as isDateValid, isDate } from 'date-fns';

/**
 * Basic Wrapper around the fetch API
 * @param {string} url
 * @returns {Promise}
 */
function fetchData(url) {
  return fetch(url, { mode: 'cors' }).then((res) => res.json());
}

/**
 * Date formatter utility converts Unix time into date
 * @param {number|Date} date - Must be either a valid unixTime or Date instance
 * @param {string} formatStr - Date format string. See date-fns docs
 * @returns {string}
 */
function formatDate(date, formatStr = "hh:mm - EEEE, dd MMM''yy") {
  // If valid, decide if its unix time or date object
  if (isDateValid(date)) {
    // Checks if date in an instance of Date
    return isDate(date)
      ? format(date, formatStr)
      : format(fromUnixTime(date), formatStr);
  }
}

function isValidValue(query) {
  return query && query.trim() !== '';
}

export { fetchData, formatDate, isValidValue };
