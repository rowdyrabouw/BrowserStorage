import './../idb-sync/idb.js';
import { getData } from "./../idb-sync/utils.js";

const btnWriteGroceryList = document.querySelector('#writeGroceryList');
btnWriteGroceryList.addEventListener('click', async () => {
  const fileHandle = await window.showSaveFilePicker({
    types: [
      {
        accept: { 'text/plain': ['.txt'] }
      }
    ]
  });

  const date = new Date();
  let text = `Grocery List for ${date.toLocaleDateString()}\n`;
  const data = await getData();
  data.forEach(item => {
    text += `${item.amount} ${item.product}\n`;
  });

  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
});

const btnOpenFile = document.querySelector('#openFile');
btnOpenFile.addEventListener('click', async () => {
  const fileHandle = await window.showOpenFilePicker(
    {
      types: [
        {
          accept: { 'text/plain': ['.txt'] }
        }
      ]
    });
  const file = await fileHandle[0].getFile();
  const contents = await file.text();
  const textArea = document.querySelector('#data');
  textArea.innerHTML = contents;
});
