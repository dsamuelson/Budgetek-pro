import moment from 'moment';

export function formatDate(datetime) {
    return moment(parseInt(datetime)).format('MMM DD YYYY');
};

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