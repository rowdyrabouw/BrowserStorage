const setItembutton = document.getElementById("setItem");
setItembutton.addEventListener("click", () => {
  document.getElementById("data").textContent = "";
  const key = document.getElementById("setItemKey").value;
  const value = document.getElementById("setItemValue").value;
  localStorage.setItem(key, value);
});

const getItemButton = document.getElementById("getItem");
getItemButton.addEventListener("click", () => {
  const key = document.getElementById("setItemKey").value;
  const data = localStorage.getItem(key);
  document.getElementById("data").textContent = data;
});

const removeItemButton = document.getElementById("removeItem");
removeItemButton.addEventListener("click", () => {
  document.getElementById("data").textContent = "";
  const key = document.getElementById("setItemKey").value;
  localStorage.removeItem(key);
});