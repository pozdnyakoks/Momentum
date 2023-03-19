const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

export async function getQuotes(language) {
  const quotes = `./assets/${language}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.round(Math.random() * (data.length - 1));
  quote.textContent = `${data[randomNum].text}`;
  author.textContent = `${data[randomNum].author}`;
}

