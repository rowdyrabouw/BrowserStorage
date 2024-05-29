export const openDatabase = async () => {
  return await idb.openDB('groceries-idb-sync', 1, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      console.log('upgrade', db, oldVersion, newVersion, transaction, event);
      if (oldVersion < 1) {
        const store = db.createObjectStore('groceryList', { keyPath: "product" });
        store.createIndex("synced", "synced", { unique: false });
      }
    }
  });
};

export const getData = async () => {
  const db = await openDatabase();
  const data = await db.getAll('groceryList');
  db.close();
  return data;
}

export const saveData = async (data) => {
  if (data.length > 0) {
    const db = await openDatabase();
    data.forEach(async (item) => {
      await db.put('groceryList', item);
    });
    db.close();
  }
}