const callServer = async () => {
  const response = await fetch("http://localhost:3000/cookie", {
    method: 'GET',
    credentials: 'include'
  })
  const data = await response.text();
  document.querySelector("#data").innerHTML = data;
}

const fetchButton = document.querySelector("#fetch");
fetchButton.addEventListener("click", () => {
  callServer();
});

const setCookieButton = document.querySelector("#setCookie");
setCookieButton.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const value = document.querySelector("#value").value;
  document.cookie = `${name}=${value}; path=/;`;
  callServer();
});

const deleteCookieButton = document.querySelector("#deleteCookie");
deleteCookieButton.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  document.cookie = `${name}=; path=/; max-age=0;`;
  document.querySelector("#data").innerHTML = 'Cookie deleted';
});
