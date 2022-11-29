import moment from 'moment';

// export function daysInMonth (month, year) {
//   return new Date(year, month, 0).getDate();
// }


export function formatDate(datetime) {
  return moment(parseInt(datetime)).format('MMM DD YYYY');
};

export function PDDDformat(datetime) {
  return moment(parseInt(datetime.payDay || datetime.dueDate)).format('MMM DD');
}

export function addDate(Value, Unit, date) {
  // console.log(Value, Unit)
  date = new Date(date)
  if (Unit === 'months') {
    date.setMonth(date.getMonth() + Value);
  }
  if (Unit === 'days') {
    date.setDate(date.getDate() + Value);
  }
  if (Unit === 'years') {
    date.setFullYear(date.getFullYear() + Value)
  }
  return date;
}

export function subtractDate(Value, Unit, date) {
  // console.log(Value, Unit)
  date = new Date(date)
  if (Unit === 'months') {
    date.setMonth(date.getMonth() - Value);
  }
  if (Unit === 'days') {
    date.setDate(date.getDate() - Value);
  }
  if (Unit === 'years') {
    date.setFullYear(date.getFullYear() - Value)
  }
  return date;
}

export function compareDate(Value, Unit, date1, date2) {
  date1 = new Date(date1)
  date2 = new Date(date2)
  date1.setHours(0,0,0,0)
  date2.setHours(0,0,0,0)
  let unitMath = false;
  if (Unit === 'days') {
    let dateDiff = Math.abs(date1 - date2)
    let dayDiff = dateDiff/(1000 * 60 * 60 * 24)
    unitMath = Math.floor(dayDiff%Value) === 0;
  }
  if (Unit === 'months') {
    let day1 = date1.getDate();
    let day2 = date2.getDate();
    let month2 = date2.getMonth();
    unitMath = day1 === day2 && month2%Value === 0;

  }
  if (Unit === 'years') {
    let day1 = date1.getDate();
    let day2 = date2.getDate();
    let month1 = date1.getMonth();
    let month2 = date2.getMonth();
    let year1 = date1.getFullYear();
    let year2 = date2.getFullYear();
    unitMath = (Math.abs(year1 - year2)%Value) === 0 && day1 === day2 && month1 === month2;
  }
  return unitMath;
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('budgetek', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('incomes', { keyPath: '_id' });
      db.createObjectStore('expenses', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}