import { SubmissionError } from 'redux-form'
export const _global = {
  isEmpty,
  isEmptyObject,
  handleNumberMaxLength,
  leftTrim,
  cancelHandle,
  scrollToElement,
  getValue,
  getMax,
  formatPhoneNumber,
  formatPhoneNumberAsNumber,
  formatPhoneNumberOnProfile,
  formatDateString,
  formatDateStringFromTimestamp,
  getUrlVars,
  emailTester,
  phoneTester,
  zipTester,
  timeSince,
  submit,
  formatCapitalization,
  textCaseConverter,
  getText
};


function formatCapitalization(text){
  let arr = text.split(' ');
  return arr
    .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ');
};

function textCaseConverter (name) {
  if (name) {
    return name
      .split(' ')
      .map(nameVal => nameVal.charAt(0) + nameVal.slice(1).toLowerCase())
      .join(' ');
  }
};


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!['abc', 'xyz', 'dddd', 'aaaa'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}


/**
 * Description: isEmpty will check the empty value
 * @param {string} _param
 * @return {boolean}
 */
function isEmpty(_param) {
  return (
    _param === 'undefined' ||
    _param === undefined ||
    _param === '' ||
    _param === null
  );
}

/**
 * Description: isEmptyObject will check the empty object
 * @param {object} _obj
 * @return {boolean}
 */

function getText(record) {
  const { message } = record;
  let $tempInput = document.createElement('INPUT');
  document.body.appendChild($tempInput);
  $tempInput.setAttribute('value', message);
  $tempInput.select();
  document.execCommand('copy');
  document.body.removeChild($tempInput);
}

function isEmptyObject(_obj) {
  if (_obj == null) return true; // null and undefined are "empty"
  if (_obj.length > 0) return false;
  if (_obj.length === 0) return true;
  for (var key in _obj) {
    if (hasOwnProperty.call(_obj, key)) return false;
  }
  return true;
}

/**
 * Description: leftTrim will trim of string
 * @param {string} _str
 * @return {string}
 */
function leftTrim(_str) {
  return _str.replace(/^\s+/, '');
}

function handleNumberMaxLength(_event) {
  if (
    _event.target.hasAttribute('maxLength') &&
    _event.target.type === 'number'
  ) {
    if (
      _event.target.value.toString().length >
      parseInt(_event.target.maxLength, 10)
    ) {
      return false;
    }
    if (
      !isEmpty(_event.nativeEvent.data) &&
      !Number.isInteger(parseInt(_event.nativeEvent.data, 10))
    ) {
      _event.target.value = '';
      return false;
    }
  }
  return true;
}

function cancelHandle(flag, callback, self) {
  if (flag === false) {
    window.history.go(-1);
  } else {
    if (self && callback) {
      callback(self);
    }
  }
}

function scrollToElement(e) {
  return false;
}

/**
 * Description: get value from object
 * @param {object}   obj
 * @return {number}
 */
function getValue(obj) {
  return obj.sortorder.value;
}

/**
 * Description: get value from object
 * @param {number}   param1
 * @param {number}   param2
 * @return {number}
 */

function getMax(param1, param2) {
  return Math.max(param1, param2);
}

/**
 * Description: format phone string to US phone number format
 * @param {string}   phoneNumberString
 * @return {number}
 */
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return null;
}

/**
 * Description: format phone string to US phone number format
 * @param {string}   formattedPhoneNumberString
 * @return {number}
 */
function formatPhoneNumberAsNumber(formattedPhoneNumberString) {
  var cleaned = ('' + formattedPhoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return formattedPhoneNumberString
      .split('')
      .filter(v => v !== '(' && v !== ')' && v !== '-' && v !== ' ')
      .join('');
  }
  return undefined;
}

/**
 * Description: format phone string to US phone number format
 * @param {string}   phoneNumberString
 * @return {number}
 */

function formatPhoneNumberOnProfile(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

/**
 * Description: format date string to dd/mm/yyyy format
 * @param {string}   formattedDateString
 * @return {string}
 */

function formatDateStringFromTimestamp(formattedDateString) {
  let currentDate = new Date(+formattedDateString.toString().replace(/\/Date\((\d+)\)\//, '$1'));;
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
}



function formatDateString(formattedDateString) {
  let currentDate = new Date(formattedDateString);
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
}

/**
 * Description: get array of object of all url params
 * @return {array} vars
 */
function getUrlVars() {
  var vars = {};
  // var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
  //   m,
  //   key,
  //   value
  // ) {
  //   vars[key] = value;
  // });

  return vars;
}

function emailTester(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
  return false;
}

function phoneTester(phone) {
  // const re = /[2-9]{2}\d{8}/;
  const re = /^\d{10}$/;

  if (re.test(phone)) {
    return true;
  } else {
    return false;
  }
}

function zipTester(zip) {
  const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
  if (re.test(zip)) {
    return true;
  } else {
    return false;
  }
}

function timeSince(timeStamp) {
  let currentTime = Date.now();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  var elapsed = currentTime - timeStamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}
