// Monkeytype Typer Script: Two Modes
// 1. One-time: Types only the first visible set of words
// 2. Continuous: Types all new words as they appear (for the entire test duration)
//
// Usage:
//   npm install puppeteer
//   node monkeytype-typer.js
//
// Toggle mode by setting MODE to 'once' or 'continuous'

const puppeteer = require('puppeteer');

// Change this to 'once' or 'continuous'
const MODE = 'continuous'; // 'once' | 'continuous'

// Typing speed (ms per character)
const TYPING_DELAY = 8;

(async () => {
  // Use your real Chrome and default profile for OAuth compatibility
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    userDataDir: process.env.HOME + '/Library/Application Support/Google/Chrome',
  });
  const page = await browser.newPage();
  await page.goto('https://monkeytype.com/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.word');

  // Focus body to ensure typing works
  await page.evaluate(() => { document.body.focus(); });

  // Wait for the user to press any key before starting the bot
  console.log('Ready! Press any key in the Monkeytype browser window to start the bot...');
  await page.evaluate(() => {
    return new Promise(resolve => {
      const handler = () => {
        window.removeEventListener('keydown', handler, true);
        resolve();
      };
      window.addEventListener('keydown', handler, true);
    });
  });
  console.log('Key detected! Starting the bot...');

  if (MODE === 'once') {
    // Option 1: Type only the first visible set of words
    const words = await page.$$eval('.word', nodes => nodes.map(n => n.textContent));
    for (let word of words) {
      await page.keyboard.type(word + ' ', { delay: TYPING_DELAY });
    }
    // Optionally close after a short wait
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // await browser.close();
  } else if (MODE === 'continuous') {
    // Option 2: Continuously type words as they appear
    let lastTypedIndex = 0;
    let running = true;
    // Stop after 60 seconds or when test ends
    const STOP_AFTER_MS = 60000;
    setTimeout(() => { running = false; }, STOP_AFTER_MS);
    while (running) {
      // Get all words (including those that appear later)
      const words = await page.$$eval('.word', nodes => nodes.map(n => n.textContent));
      for (; lastTypedIndex < words.length; lastTypedIndex++) {
        await page.keyboard.type(words[lastTypedIndex] + ' ', { delay: TYPING_DELAY });
      }
      // Wait a bit for new words to appear
      await new Promise(resolve => setTimeout(resolve, 5));
      // Optionally, detect if the test is over by checking for a result element
      const testOver = await page.$('.result');
      if (testOver) break;
    }
    // Optionally close after a short wait
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // await browser.close();
  } else {
    console.error('Invalid MODE. Use "once" or "continuous".');
    process.exit(1);
  }
})();
