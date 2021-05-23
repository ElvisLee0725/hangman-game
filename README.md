# hangman-game

A classic word guess game that you have to find out the right word, phrase or sentence within the limited tries.

## Technology Used

- Node.js
- Express
- MongoDB
- React.js
- React Hooks
- React-Bootstrap
- AWS EC2

## Live Demo

Try the application live at https://hangman.elvislee.com

## Features

- Players can start the game in easy mode by default
- To start, just enter from any letter from a to z on your keyboard
- Users can switch to 3 different levels of games to make it more challenging
- When players finish a game successfully, they will get a score and leave their names on the score board
- Players can see the top 10 scores reached for this game at "Top Scores" tab

## Preview

## Development

### System Requirements

- Node.js 10 or higher
- React.js 16 or higher
- NPM 6 or higher

### Getting Started

1. Clone the repository.

```
git clone https://github.com/ElvisLee0725/hangman-game.git
```

2. Install all dependencies with NPM.

```
npm install
```

3. Create a default.json file inside of config folder

```
"PORT": 5000,
"mongoURI":   // Need to open for public read
```

5. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

```
npm run dev
```
