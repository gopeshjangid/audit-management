
export function formatDateStringFromTimestamp(formattedDateString) {
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
  
  
  
  export function formatDateString(formattedDateString) {
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