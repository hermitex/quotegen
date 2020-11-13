const apiUrl = "https://api.pexels.com/v1/search?query=universe&maxResults=5";
import { QUOTES } from "./images/quotesDB.js";

const childElement = document.querySelector(".childElement");
const nextQuote = document.querySelector("#generate-quote");
const authorName = document.querySelector("#author-name");
const quoteCategory = document.querySelector("#quote-genre");
const numberOfQuotes = document.querySelector("#number-of-quotes");
const prentElement = document.querySelector("#prentElement");
const avatar = document.querySelector("#avatar");

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

// Quotes By Specific Author

// const fetchQuote = async () => {
//   let loader = `
//      <div class="loader-dots text-success">
//         Loading
//     </div>
// `;

//   quoteContainer.innerHTML = loader;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     displayQuote(data.quote);
//   } catch (error) {
//     console.log(error);
//   }
// };

const getRandomQuoteFromDB = (quotes) => {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomNumber];
  displayQuote(randomQuote);
};

const displayMultipleQuotes = (num, quotes) => {
  let output = "";
  while (num) {
    let randomNum = Math.floor(Math.random() * quotes.length);
    output += `<p>${quotes[randomNum].quote}  <small class='d-block'>-${quotes[randomNum].authorFirstName} ${quotes[randomNum].authorSecondName}</small></p>
   
    `;
    num--;
    childElement.innerHTML = output;
    console.log(childElement);
  }
};

const displayQuote = (quote) => {
  console.log(avatar);
  childElement.innerHTML = `<p style = 'font-size: 1.5rem'>${quote.quote}</p>`;
  authorName.textContent = `-${quote.authorFirstName} ${quote.authorSecondName}`;
};

numberOfQuotes.addEventListener("change", (e) => {
  displayMultipleQuotes(parseInt(e.target.value), QUOTES);
});

nextQuote.addEventListener("click", () => {
  getRandomQuoteFromDB(QUOTES);
});
getPhotoFromPexel();
