import './idb.js';
import { getData, saveData } from "./utils.js";

const fetchData = async () => {
  let data = [];
  try {
    const response = await fetch('http://127.0.0.1:3000');
    data = await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
  finally {
    await saveData(data);
  }
}

const displayData = async () => {
  const data = await getData();
  if (data.length > 0) {
    const listContainer = document.querySelector('#data');
    listContainer.innerHTML = '';
    const list = document.createElement('ul');
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.amount} ${item.product}`;
      list.appendChild(listItem);
    });
    listContainer.appendChild(list);
  }
};


const saveItem = async () => {
  const product = document.querySelector('#product').value;
  const amount = document.querySelector('#amount').value;
  saveData([{ product, amount, synced: "false" }]);
  document.querySelector('#product').value = '';
  document.querySelector('#amount').value = '';
  displayData();
}


async function useWorker() {
  try {
    const worker = new Worker('worker.js', { type: 'module' });
    console.info('Worker created successfully.');
    worker.postMessage('CheckNetworkState');
    console.info('Worker is checking network state.');
  } catch (error) {
    console.error('Failed to create worker:', error);
  }
}

document.querySelector('button').addEventListener('click', async () => {
  saveItem();
});

document.addEventListener("DOMContentLoaded", async () => {
  await useWorker();
  await fetchData();
  await displayData();
});

