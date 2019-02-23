document.addEventListener(
  "DOMContentLoaded",
  function() {
    // e.preventDefault();
    const DOM = {
      // Getting the DOM elements inside a Var
      myForm: document.getElementById("book-form"),
      search: document.getElementById("search-books"),
      result: document.getElementById("result"),
      button: document.getElementById("search-button")
    };

    // Function that gets the results of the books
    function getResults() {
      // Value of the input
      var searchValue = DOM.search.value;

      if (searchValue == "") {
        result.innerHTML = "Please put something in";
      } else {
        // 1. Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configure it: GET-request for the URL /article/.../hello.txt
        xhr.open(
          "GET",
          `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`
        );

        // 3. Send the request over the network
        xhr.send();

        // 4. This will be called after the response is received
        xhr.onload = function(response) {
          let data = JSON.parse(this.response);
          for (var i = 0; i < 11; i++) {
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
            var url = data.items[i].volumeInfo.imageLinks.infoLink;

            // Changes the elements innerHTML into the data that was
            // received from the API request
            titleCard.innerHTML = `${title}`;
            authorCard.innerHTML = `Written by: ${author}`;
            imageCard.innerHTML = `${imageCard.src}`;
            urlCard.innerHTML = `See this book`;

            //add CSS classes on the DOM elements.
            divCard.classList.add("book-card");
            textCard.classList.add("card-text");
            urlCard.classList.add("btn");

            // Appends the Title, Author, Image to the card.
            textCard.appendChild(titleCard);
            textCard.appendChild(authorCard);
            divCard.appendChild(imageCard);
            divCard.appendChild(textCard);

            document.body.appendChild(divCard);
          }
        };
      }
    }

    // When clicked on button, will fire the getResults function
    DOM.button.addEventListener("click", getResults);
  },
  false
);
