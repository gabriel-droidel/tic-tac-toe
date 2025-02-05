// Game board //
function createGameBoard() {
	const board = [];
	//generate all the values for the board
	for (let i = 0; i < 9; i++) {
		board.push(null);
	}
	// get the board values when needed
	const getBoard = () => board;

	// markCell
	const markCell = (location, selection) => {
		board[location] = selection;
	};

	return { getBoard, markCell };
}
// Player //
function createPlayers() {
	// handles the creation of the players
	const players = [];
	const playerOne = 'X';
	const playerTwo = 'O';
	players.push(playerOne, playerTwo);

	const get = () => players; // get the array of players

	return { get };
}

// Game //
function createGameController() {
	const board = createGameBoard();
	const players = createPlayers();
	const playerList = players.get();
	let activePlayer = playerList[0];
	let moves = 0;
	let gameOver = false;

	const switchPlayerTurn = () => {
		// switch between players
		activePlayer =
			activePlayer === playerList[0] ? playerList[1] : playerList[0];
	};

	const getActivePlayer = () => activePlayer;

	const handleWinLogic = (values, selection) => {
		// Ensure cells are filled with the same player's selection
		const rowWin =
			(values[0] === selection &&
				values[1] === selection &&
				values[2] === selection) ||
			(values[3] === selection &&
				values[4] === selection &&
				values[5] === selection) ||
			(values[6] === selection &&
				values[7] === selection &&
				values[8] === selection);

		const colWin =
			(values[0] === selection &&
				values[3] === selection &&
				values[6] === selection) ||
			(values[1] === selection &&
				values[4] === selection &&
				values[7] === selection) ||
			(values[2] === selection &&
				values[5] === selection &&
				values[8] === selection);

		const diagWin =
			(values[0] === selection &&
				values[4] === selection &&
				values[8] === selection) ||
			(values[2] === selection &&
				values[4] === selection &&
				values[6] === selection);

		if (rowWin || colWin || diagWin) {
			return true;
		}

		return false;
	};

	const playRound = (location) => {
		if (moves < 9 && gameOver === false) {
			if (board.getBoard()[location] === null) {
				board.markCell(location, getActivePlayer());
				if (handleWinLogic(board.getBoard(), getActivePlayer())) {
					gameOver = true;
					return 1;
				} else if (moves === 8 && gameOver === false) return 2;
				else {
					switchPlayerTurn();
					moves++;
				}
			}
		} else {
			return 2;
		}
	};

	return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function controlScreen() {
	// const playerOne = players.create(name,selection);
	const game = createGameController();
	const boardDiv = document.querySelector('.game-board');
	const gameContainerDiv = document.querySelector('.game-container');
	const turnDiv = document.querySelector('.active-player-board');
	const introBox = document.querySelector('.intro');
	const board = game.getBoard();
	let isPlaying = true;
	let activePlayer = game.getActivePlayer();
	const updateScreen = () => {
		boardDiv.textContent = '';
		introBox.classList.remove('disabled');
		gameContainerDiv.classList.add('disabled');
	};
	const refreshBoard = () => {
		board.forEach((item, index) => {
			const boxes = document.querySelectorAll('.cell');
			boxes[index].textContent = item;
		});
	};
	const displayActivePlayer = () =>
		(turnDiv.textContent = `It's ${activePlayer} Turn!`);

	displayActivePlayer();
	introBox.classList.add('disabled');
	gameContainerDiv.classList.remove('disabled');
	board.forEach((item, index) => {
		const box = document.createElement('div');
		box.classList.add('cell');
		box.textContent = item;
		box.addEventListener('click', () => clickPlay(index));
		boardDiv.appendChild(box);
	});

	const showModal = (message) => {
		document.getElementById('modal-message').textContent = message;
		document.getElementById('gameResultModal').style.display = 'flex';
	};

	const hideModal = () => {
		document.getElementById('gameResultModal').style.display = 'none';
		updateScreen();
	};
	document.getElementById('closeModal').addEventListener('click', hideModal);

	const clickPlay = (index) => {
		let result;
		if (isPlaying) {
			result = game.playRound(index);
			refreshBoard();

			if (result !== 1 && result !== 2) {
				activePlayer = game.getActivePlayer();
				displayActivePlayer();
			} else if (result === 1) {
				isPlaying = false;
				setTimeout(() => showModal(`${activePlayer} Won!`), 200);
			} else if (result === 2) {
				isPlaying = false;
				setTimeout(() => showModal(`TIE!`), 200);
			}
		}
	};
}

const startGame = document.querySelector('#start');
startGame.addEventListener('click', () => controlScreen());
