import './idb.js';

let db;

const openDatabase = async () => {
  db = await idb.openDB('groceries-idb', 1, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      console.log('upgrade', db, oldVersion, newVersion, transaction, event);
      if (oldVersion < 1) {
        db.createObjectStore('groceryList', { keyPath: "product" });
      }
    }
  });
};

const saveItem = async () => {
  const product = document.querySelector('#product').value;
  const amount = parseInt(document.querySelector('#amount').value);
  const data = { product, amount };
  console.info(`Adding product "${product}" with amount "${amount}" to the database`);

  await db.put('groceryList', data);
}

document.querySelector('button').addEventListener('click', async () => {
  saveItem();
});

document.addEventListener("DOMContentLoaded", async () => {
  await openDatabase();
});
