const apiUrl = "https://api.pexels.com/v1/search?query=universe&maxResults=5";
import { QUOTES } from "./images/quotesDB.js";

const childElement = document.querySelector(".childElement");
const authorName = document.querySelector(".author-name");
const quoteCategory = document.querySelector("#quote-genre");
const numberOfQuotes = document.querySelector("#number-of-quotes");
const parentElement = document.querySelector("#parentElement");
const avatar = document.querySelector("#avatar");
const options = document.querySelectorAll("#options");
const nextQuote = document.querySelector("#generate-quote");

const getPhotoFromPexel = () => {
  fetch(apiUrl, {
    headers: {
      Authorization: "563492ad6f91700001000001503878ac4de04b70ab7386fb1904e695",
    },
    // mode: "no-cors",
  })
    .then((response) => response.json())
    .then((result) => {
      const image =
        result.photos[Math.floor(Math.random() * result.photos.length)].url;
      let setBg = document.getElementById("body");
      // setBg.style.backgroundImage = `url(${image})`;
      console.log(image);
    })
    .catch((err) => console.log(err));
};

// Random Quote
const url = "https://quote-garden.herokuapp.com/api/v2/quotes/random";

const getRandomQuoteFromDB = (quotes) => {
  $(document).ready(function () {
    $("#parentElement").on("click", "button", () => {
      const randomNumber = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomNumber];
      displayQuote(randomQuote);
    });
  });
};

const displayMultipleQuotes = (num, quotes) => {
  let output = "";
  while (num) {
    let randomNum = Math.floor(Math.random() * quotes.length);
    output += `<p>${quotes[randomNum].quote}  <small class='d-block my-0'>-${quotes[randomNum].authorFirstName} ${quotes[randomNum].authorSecondName}</small></p>
    `;
    num--;
    parentElement.innerHTML = output;
  }
};

const displayQuote = (quote) => {
  parentElement.innerHTML = `<div id="quote " class="childElement h-auto w-100 m-auto">
  <p style = 'font-size: 1.5rem'>${quote.quote}</p> 
  <small class='d-block'>-${quote.authorFirstName} ${quote.authorSecondName}</small>
 <button id="generate-quote" class="p-3 d-block w-auto m-auto">Next Quote</button>
  </div>  
  `;
};

numberOfQuotes.addEventListener("change", (e) => {
  displayMultipleQuotes(parseInt(e.target.value), QUOTES);
});

options.forEach((option) => {
  option.addEventListener("change", (e) => {
    findQuoteGenre(e.target.value);
  });
});

const findQuoteGenre = (genre) => {
  let selectedQuoteGenre = QUOTES.filter(
    (quote) => quote.genre === genre.trim()
  );
  displayQuotesOfSelectedGenre(selectedQuoteGenre);
};

const displayQuotesOfSelectedGenre = (selectedQuoteArr) => {
  // selectedQuoteArr.forEach((quote) => displayQuote(quote));
};

// nextQuote.addEventListener("click", () => {
getRandomQuoteFromDB(QUOTES);
// });
getPhotoFromPexel();
