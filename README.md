# MonkeyType Auto-Typer

A Node.js automation script that types automatically on [MonkeyType](https://monkeytype.com/) using Puppeteer. This bot can help with testing or demonstrating typing functionality on the MonkeyType platform.

## Features

- **Two Modes of Operation**:
  - **One-time Mode**: Types only the first visible set of words
  - **Continuous Mode**: Continuously types new words as they appear (for the entire test duration)
- Adjustable typing speed
- Uses your Chrome profile for OAuth compatibility
- Simple configuration

## Prerequisites

- Node.js (v14 or higher)
- Google Chrome installed on your system
- npm (comes with Node.js)

## Installation

1. Clone this repository or download the files
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Open `monkeytype-typer.js` in a text editor
2. Configure the settings at the top of the file:
   - Set `MODE` to either `'once'` or `'continuous'`
   - Adjust `TYPING_DELAY` (in milliseconds) to control typing speed
3. Run the script:
   ```bash
   node monkeytype-typer.js
   ```
4. The script will open Chrome and navigate to MonkeyType
5. Press any key in the MonkeyType browser window to start the auto-typer

## Notes

- The script is configured to use your default Chrome profile for OAuth compatibility
- Make sure Chrome is not running when you start the script

