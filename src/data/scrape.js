const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.wordunscrambler.net/word-list/wordle-word-list';

async function scrapeWords() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // The words are inside <div class="list-unstyled">
    const rawText = $('.list-unstyled').text();

    // Split by line breaks or spaces
    const words = rawText
      .split(/\s+/)          // split by any whitespace
      .filter(word => word.length === 5) // only 5-letter words
      .map(word => word.trim().toUpperCase());
      
    // Remove duplicates
    const uniqueWords = [...new Set(words)];

    // Save as JSON
    fs.writeFileSync('wordlist.json', JSON.stringify(uniqueWords, null, 2));
    console.log(`Scraped ${uniqueWords.length} words and saved to wordlist.json`);

  } catch (err) {
    console.error('Error scraping:', err.message);
  }
}

scrapeWords();
