function bookSearch() {
  var search = document.getElementById("input_field").value;
  document.getElementById("title").innerHTML = "";
  document.getElementById("author").innerHTML = "";
  document.getElementById("image").innerHTML = "";
  console.log(search);

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
    dataType: "json",

    success: function(data) {
      for (i = 0; i < data.items.length; i++) {
        title.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "</h2>";
        author.innerHTML += "<p>" + data.items[i].volumeInfo.authors + "</p>";
        Image.innerHTML +=
          '<img src= "' +
          data.items[i].volumeInfo.imageLinks.smallThumbnail +
          '" alt="#">';
      }
    },
    type: "GET"
  });
}

document.getElementById("input_btn").addEventListener("click", bookSearch);

// const DOM = {
//   input: document.getElementById("input-field"),
//   button: document.getElementById("input-btn"),
//   title: document.getElementById("title"),
//   tester: document.getElementById("tester")
// };

// function getValue() {
//   var inputValue = DOM.input.value;

//   return (DOM.tester.innerHTML = inputValue);
// }

// DOM.button.addEventListener("click", getValue);

// const endpoint =
//   "https://www.googleapis.com/books/v1/volumes?q=${DOM.input}:keyes&key=AIzaSyCoB6R2r7zWFZx_C50_OpL2lTvO0F2oMdI&callback=handleResponse";

// function handleResponse(response) {
//   for (var i = 0; i < response.items.length; i++) {
//     var item = response.items[i];
//     // in production code, item.text should have the HTML entities escaped.
//     DOM.title.innerHTML += "<br>" + item.volumeInfo.title;
//   }
// }
