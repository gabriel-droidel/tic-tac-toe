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
	const markCell = (player, selection) => {
		let location;
		do {
			location = Number(
				prompt(`${player} (${selection}), choose your location (0-8):`)
			);
		} while (board[location] !== null); // Keep asking if location is taken

		board[location] = selection;
	};

	// draw the board in the console
	const drawBoard = (array) => {
		console.log(`
		${array[0]} _ ${array[1]} _ ${array[2]} 
		${array[3]} _ ${array[4]} _ ${array[5]}
		${array[6]} _ ${array[7]} _ ${array[8]}
		`);
	};

	return { getBoard, drawBoard, markCell };
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

	const playRound = () => {
		board.drawBoard(board.getBoard());
		let gameOver = false;
		let moves = 0;

		while (!gameOver && moves < 9) {
			board.markCell(getActivePlayer().name, getActivePlayer().selection);
			board.drawBoard(board.getBoard());
			if (handleWinLogic(board.getBoard(), getActivePlayer().selection)) {
				gameOver = true;
				break;
			}
			switchPlayerTurn();
			moves++;
		}
		if (gameOver === true) return getActivePlayer().name;
		else return "It's a tie!";
	};

	return { playRound };
}

function drawGameBoard(board) {
	const pageContainer = document.querySelector('.game-container');
	pageContainer.textContent = '';
	console.log(board);
	board.forEach((item) => {
		const box = document.createElement('div');
		box.classList.add('selection-box');
		pageContainer.appendChild(box);
	});
}

function placeMarkerOnDOM(container) {}
