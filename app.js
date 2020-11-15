import { QUOTES } from "./quotesDB.js";
import { IMAGES } from "./quotesDB.js";
const apiUrl = "https://api.pexels.com/v1/search?query=universe&maxResults=5";
const api_key = "563492ad6f91700001000001503878ac4de04b70ab7386fb1904e695";
$(document).ready(() => {
  const childElement = document.querySelector(".childElement");
  const authorName = document.querySelector(".author-name");
  const quoteCategory = document.querySelector("#quote-genre");
  const numberOfQuotes = document.querySelector("#number-of-quotes");
  const parentElement = document.querySelector("#parentElement");
  const avatar = document.querySelector("#avatar");
  const options = document.querySelectorAll("#options option");
  const nextQuote = document.querySelector("button#generate-quote");

  // nextQuote.addEventListener("click", () => {
  //   console.log(IMAGES);
  //   let ImageUrl = IMAGES[Math.floor(Math.random() * IMAGES.length)].url;
  //   document.querySelector("body").style.backgroundImage = ImageUrl;
  //   console.log(document.querySelector("body"), ImageUrl);
  // });

  // Random Quote
  const url = "https://quote-garden.herokuapp.com/api/v2/quotes/random";

  const getRandomQuoteFromDB = (quotes) => {
    $("#parentElement").on("click", "button", () => {
      const randomNumber = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomNumber];
      displayQuote(randomQuote);
    });
  };

  const displayMultipleQuotes = (num, quotes) => {
    let output = "";
    num++;
    while (num) {
      let randomNum = Math.floor(Math.random() * quotes.length);
      output += `<blockquote id="quote" class="blockquote text-left childElement h-auto w-100 m-auto">
      <p class="mb-0"style = 'font-size: 1.2rem'>${quotes[randomNum].quote}  </p> 
      <footer class="mb-1 blockquote-footer">${quotes[randomNum].authorFirstName} ${quotes[randomNum].authorSecondName} </footer>`;

      num--;
      parentElement.innerHTML = `${output}<button type='button' id="generate-quote" class="btn btn-light p-3 d-block w-25 m-auto">Back</button>`;
    }
  };

  const displayQuote = (quote) => {
    parentElement.innerHTML = `<blockquote id="quote" class="blockquote text-center childElement h-auto w-100 m-auto">
    <p class="mb-0"style = 'font-size: 1.5rem'>${quote.quote} </p> 
    <footer class="mb-1 blockquote-footer">${quote.authorFirstName} ${quote.authorSecondName} </footer>
    <button type='button' id="generate-quote" class="btn btn-light p-3 d-block w-auto m-auto">Next Quote</button>
  </blockquote>
  `;
    let ImageUrl = IMAGES[Math.floor(Math.random() * IMAGES.length)].url;
    $("img").src = ImageUrl;
    $("body").css(`background-color`, `#${Math.floor(Math.random() * 255)}`);
  };

  numberOfQuotes.addEventListener("change", (e) => {
    if (parseInt(e.target.value) >= 5) {
      $(".fade").modal("show");
    } else {
      displayMultipleQuotes(parseInt(e.target.value), QUOTES);
    }
  });

  const findQuoteGenre = (genre) => {
    if (genre === "random") {
      $("#quote-title").text(`${genre} quotes (${QUOTES.length})`);
      console.log(QUOTES.length);
      getRandomQuoteFromDB(QUOTES);
    } else {
      let selectedGenre = QUOTES.filter((quote) => quote.genre === genre);
      $("#quote-title").text(`${genre} quotes (${selectedGenre.length})`);
      getRandomQuoteFromDB(selectedGenre);
    }
  };
  $("select").change(function (e) {
    findQuoteGenre(e.target.value);
  });
  const displayQuotesOfSelectedGenre = (selectedQuoteArr) => {
    selectedQuoteArr.forEach((quote) => {
      displayQuote(quote);
    });
  };

  $("#flip-card.container").click(() => {});

  getRandomQuoteFromDB(QUOTES);
});
