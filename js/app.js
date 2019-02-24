// ------------------------ VARIABLES

const DOM = {
  // Getting the DOM elements
  myForm: document.getElementById("book-form"),
  search: document.getElementById("search-books"),
  result: document.getElementById("result"),
  button: document.getElementById("search-button"),
  refresh: document.getElementById("refresh-button"),
  message: document.querySelector(".nothing-message")
};

// The used API Key (Currently N.Colomatin API Key)
var APIkey = `AIzaSyCoB6R2r7zWFZx_C50_OpL2lTvO0F2oMdI`;

// ------------------------ EVENT LISTENERS

// When clicked on button, will delete the search results
document.getElementsByClassName("refresh")[0].addEventListener("click", refreshBooks);

// Looks out for when enter is used on the keyboard
window.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    getResults();
  }
});

// When clicked on button, will fire the getResults function
document.getElementById("search-button").addEventListener("click", getResults);

// --------------------------    FUNCTIONS

// Function that gets the results of the books
function getResults() {

  //deletes the entries from previous searches if there are any
  if (document.getElementsByClassName("all-books")[0].innerHTML !== "") {
    refreshBooks();
  }

  // hides the standard message
  DOM.message.style.visibility = "hidden";

  // Value of the input
  var searchValue = DOM.search.value;

  // looks if there is a valid value in the input
  if (searchValue == "") {
    DOM.result.innerHTML = "Please put something in the search! 😃";
  } else {
    //deletes the result message
    DOM.result.style.visibility = "hidden";

    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL
    xhr.open(
      "GET",
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${APIkey}`,
      true
    );

    // 3. Send the request
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function addItems(response) {
      let data = JSON.parse(this.response);

      if (!data) {
        console.log("appel");
      } else {
        for (var i = 0; i < 11; i++) {
          // DOM element of ALL books.
          allBooks = document.querySelector(".all-books");

          //Creates the elements for the Book-card
          var divCard = document.createElement("div");
          var imageCard = document.createElement("img");
          var textCard = document.createElement("div");
          var titleCard = document.createElement("h2");
          var authorCard = document.createElement("p");
          var urlCard = document.createElement("a");

          // Retreives the data from the API request
          imageCard.src = data.items[i].volumeInfo.imageLinks.thumbnail;
          var title = data.items[i].volumeInfo.title;
          var author = data.items[i].volumeInfo.authors;
          var url = data.items[i].volumeInfo.infoLink;
          authorCard.innerHTML = `Written by: ${author}`;
          imageCard.innerHTML = `${imageCard.src}`;
          urlCard.innerHTML = `Search the Book`;
          urlCard.setAttribute("href", url);
          // Changes the elements innerHTML into the data that was
          // received from the API request
          titleCard.innerHTML = `${title}`;

          //add CSS classes on the DOM elements.
          divCard.classList.add("book-card");
          textCard.classList.add("card-text");
          urlCard.classList.add("btn");

          // Appends the Title, Author, Image to the card.
          textCard.appendChild(titleCard);
          textCard.appendChild(authorCard);
          textCard.appendChild(urlCard);
          divCard.appendChild(imageCard);
          divCard.appendChild(textCard);

          allBooks.appendChild(divCard);
        }
      }
    };
  }
}

// Refreshed the page books, so you can search for new ones.
function refreshBooks() {
  allBooks.innerHTML = "";
}
