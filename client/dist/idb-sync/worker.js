import './idb.js';
import { openDatabase, saveData } from "./utils.js";


onmessage = (e) => {
  if (e.data === 'CheckNetworkState') {
    checkNetworkState();
  }
};

const checkNetworkState = () => {
  setInterval(() => {
    if (navigator.onLine) {
      console.info('NetworkState: online')
      syncRecords();
    }
    else {
      console.info('NetworkState: offline')
    }
  }, 3000);
}

const syncRecords = async () => {
  const db = await openDatabase();
  const records = await db.getAllFromIndex('groceryList', 'synced', 'false');
  db.close();

  records.forEach(async (record) => {
    const response = await fetch('http://127.0.0.1:3000', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record)
    });

    if (response.status === 200) {
      console.info(`Record synced: ${record.amount} ${record.product}`);
      await saveData([{ ...record, synced: 'true' }]);
    }
  });
}
