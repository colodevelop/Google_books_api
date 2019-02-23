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
          "https://www.googleapis.com/books/v1/volumes?q=" + searchValue
        );

        // 3. Send the request over the network
        xhr.send();

        // 4. This will be called after the response is received
        xhr.onload = function(response) {
          let data = JSON.parse(this.response);
          for (var i = 0; i < 11; i++) {
            //Creates the elements for the Book-card
            var divCard = document.createElement("div");
            var titleCard = document.createElement("h2");
            var authorCard = document.createElement("p");

            // Retreives the data from the API request
            var title = data.items[i].volumeInfo.title;
            var author = data.items[i].volumeInfo.authors;

            // Changes the elements innerHTML into the data that was
            // received from the API request
            titleCard.innerHTML = `${title}`;
            authorCard.innerHTML = `${author}`;

            // Appends the Title, Author, Image to the card.
            divCard.appendChild(titleCard);
            divCard.appendChild(authorCard);

            document.body.appendChild(divCard);
          }
        };

        // var httpRequest = new XMLHttpRequest();
        // httpRequest.onload = function(response) {
        //   for (var i = 0; i < response.items.length; i++) {
        //     console.log(response);
        //   }

        //   // // Process our return data
        //   // if (httpRequest.status >= 200 && httpRequest.status < 300) {
        //   //   // What do when the request is successful

        //   //   console.log("success!", httpRequest);
        //   // } else {
        //   //   // What do when the request fails
        //   //   console.log("The request failed!");
        //   // }
        // };

        // httpRequest.open(
        //   "GET",
        //   "https://www.googleapis.com/books/v1/volumes?q=" + searchValue
        // );
        // httpRequest.send();
      }
    }

    // When clicked on button, will fire the getResults function
    DOM.button.addEventListener("click", getResults);
  },
  false
);
