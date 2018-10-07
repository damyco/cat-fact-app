// Fetch fact from API - Using proxy to handle CORS.
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://catfact.ninja/facts?limit=1";

const getFact = () => {
  fetch(proxyurl + url) // Using proxy to handle CORS.
    .then(response => response.json())
    .then(content => {
      factElement.textContent = content.data[0].fact;
      loadingOff();
    })
    .catch(error => {
      console.log(`${error}. Unable to fetch response from ${url}`);
      factElement.textContent = "Oops! Something went wrong!";
      loadingOff();
    });
};

// get new fact + loader/spinner
const factElement = document.querySelector(".cat-fact");
const spinnerElement = document.querySelector(".lds-dual-ring");
const newFactButton = document.querySelector(".fa-sync-alt");

const loadingOff = () => {
  factElement.classList.remove("hidden");
  spinnerElement.classList.add("hidden");
};

const loadingOn = () => {
  factElement.classList.add("hidden");
  spinnerElement.classList.remove("hidden");
};

newFactButton.addEventListener("click", () => {
  loadingOn();
  getFact();
});

// toggling share button and modal
const shareWindowElement = document.querySelector(".share-toggle");
const shareToggleButton = document.querySelector(".fa-share-alt");
const modal = document.querySelector(".modal");

const toggleModal = () => {
  shareWindowElement.classList.toggle("hidden");
  modal.classList.toggle("show-modal");
};

const windowClick = e => {
  if (e.target === modal) {
    toggleModal();
  }
};

shareToggleButton.addEventListener("click", () => {
  toggleModal();
});

window.addEventListener("click", windowClick);

// initialize first load
loadingOn();
getFact();
