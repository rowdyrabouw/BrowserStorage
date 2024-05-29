let db;

const openDB = indexedDB.open("groceries-IndexedDB", 1);

openDB.onupgradeneeded = function (event) {
  db = openDB.result;

  const oldVer = event.oldVersion;
  console.info("Database version:", oldVer);

  if (oldVer < 1) {
    console.info("Creating object store groceryList");
    db.createObjectStore('groceryList', { keyPath: "product" });
  }
};

openDB.onsuccess = function () {
  console.info("Database opened successfully");
  db = openDB.result;
};

openDB.onerror = function () {
  console.error(openDB.error);
};

const saveData = () => {
  const product = document.querySelector('#product').value;
  const amount = parseInt(document.querySelector('#amount').value);
  const data = { product, amount };
  console.info(`Adding product "${product}" with amount "${amount}" to the database`);

  const store = db.transaction("groceryList", "readwrite").objectStore("groceryList");
  let request = store.put(data);

  request.onsuccess = function () {
    console.log("Product added:", request.result);
  };

  request.onerror = function () {
    console.warn(request.error);
  };
}
