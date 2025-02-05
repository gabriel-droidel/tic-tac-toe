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
	const markCell = (location, selection) => (board[location] = selection);

	return { getBoard, markCell };
}
// Player //
function createPlayers() {
	const players = [];
	const createPlayer = () => {
		const name = prompt('Player name : ');
		const selection = prompt('Choose X or O').toUpperCase();
		return { name, selection };
	};
	const create = () => {
		const playerOne = createPlayer();
		const playerTwo = createPlayer();
		players.push(playerOne, playerTwo);
		return players;
	};
	const getPlayers = () => players;

	return { create, getPlayers };
}

// Game //
function createGameController(
	playerOneName = 'PlayerOne',
	playerTwoName = 'PlayerTwo'
) {
	const board = createGameBoard();
	const players = createPlayers();
	players.create();
	let activePlayer = players.getPlayers()[0];

	const switchPlayerTurn = () => {
		activePlayer =
			activePlayer === players.getPlayers()[0]
				? players.getPlayers()[1]
				: players.getPlayers()[0];
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
		let gameOver = false;
		let moves = 0;

		board.markCell(location, getActivePlayer().selection);
		switchPlayerTurn();
	};

	return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function controlScreen() {
	const game = createGameController();
	const boardDiv = document.querySelector('.game-board');
	const turnDiv = document.querySelector('.active-player-board');

	const updateScreen = () => (boardDiv.textContent = '');

	const board = game.getBoard();
	const activePlayer = game.getActivePlayer();

	turnDiv.textContent = `It's ${activePlayer.name}'s Turn!`;
	board.forEach((item, index) => {
		const box = document.createElement('div');
		box.classList.add('cell');
		box.textContent = item;
		box.addEventListener('click', () => {
			game.playRound(index);
			turnDiv.textContent = `It's ${activePlayer.name}'s Turn!`;
			refreshBoard();
		});
		boardDiv.appendChild(box);
	});

	const refreshBoard = () => {
		board.forEach((item,index)=>{
			const boxes = document.querySelectorAll('.cell')
			boxes[index].textContent= item;
		})

	}
	
}
