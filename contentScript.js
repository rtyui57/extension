if (typeof init === 'undefined' & !exists()) {
  appendDownloaderButton();
  console.log("Se ejecutó la función")
}

function appendDownloaderButton() {
  const menuTop = document.getElementsByClassName("SidebarMenu__sideMenuTop--vJNxy")[0];
  const xpath = '//*[@id="react-app"]/div/div/div[3]/div/div[1]/div[2]/div[1]/div[1]/button';
  const buttonElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (menuTop) {
    const nuevo = buttonElement.cloneNode(true);
    nuevo.textContent = "Download ZIP"
    nuevo.id = "zipDonwloader"
    nuevo.style.backgroundColor = 'red';
    const baseUrl = extractBaseUrl(window.location.href);
    nuevo.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'createNewTab', url: baseUrl });
    });
    menuTop.appendChild(nuevo);
  } else {
    console.log("No se ha encontrado el menu donde crear el botón")
  }
}

function extractBaseUrl(url) {
  const regex = /^(https?:\/\/www\.thingiverse\.com\/thing:\d{7})/;
  const matched = url.match(regex);
  return matched ? matched[1] + "/zip" : null;
}

function exists() {
  return document.querySelector("#zipDonwloader");
}