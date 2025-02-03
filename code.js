function generateGameBoard() {
	const gameBoard = (function () {
		//generate locations for the tic tac toe board.
		const populate = () => Array(9).fill(null);

		// draw the board in the console
		const draw = (array) => {
			console.log(`
		${array[0]} _ ${array[1]} _ ${array[2]} 
		${array[3]} _ ${array[4]} _ ${array[5]}
		${array[6]} _ ${array[7]} _ ${array[8]}
		`);
		};
		return { populate, draw };
	})();
	// create board object
	const values = gameBoard.populate();
	const draw = () => gameBoard.draw(values);

	return { values, draw };
}
// User //
function createUser() {
	const name = prompt('Player name : ');
	const selection = prompt('Choose X or O').toUpperCase();

	const getName = () => name;
	const getSelection = () => selection;
	return { getName, getSelection };
}

function checkLocations(gameBoard) {
	// check if the grid is full
	return gameBoard.every((element) => element === 'X' || element === 'O');
}

// Game //
function createGame() {
	const board = generateGameBoard();
	let finished = false;
	const players = [];
	const playerOne = createUser();
	players.push(playerOne);
	const playerTwo = createUser();
	players.push(playerTwo);

	return { board, players, finished };
}

function handleWinLogic(board, player) {
    const values = board.values;
    const symbol = player.getSelection();

    // Ensure cells are filled with the same player's symbol
    const rowWin =
        (values[0] === symbol && values[1] === symbol && values[2] === symbol) ||
        (values[3] === symbol && values[4] === symbol && values[5] === symbol) ||
        (values[6] === symbol && values[7] === symbol && values[8] === symbol);

    const colWin =
        (values[0] === symbol && values[3] === symbol && values[6] === symbol) ||
        (values[1] === symbol && values[4] === symbol && values[7] === symbol) ||
        (values[2] === symbol && values[5] === symbol && values[8] === symbol);

    const diagWin =
        (values[0] === symbol && values[4] === symbol && values[8] === symbol) ||
        (values[2] === symbol && values[4] === symbol && values[6] === symbol);

    if (rowWin || colWin || diagWin) {
        console.log(`${player.getName()} (${symbol}) won!`);
        return true;
    }

    return false;
}

function startGame() {
    const gameData = createGame();
    gameData.board.draw();

    let currentPlayerIndex = 0;
    let moves = 0;
    let gameOver = false;

    while (moves < 9 && !gameOver) {
        assignPlayerLocation(gameData.board, gameData.players[currentPlayerIndex]);
        gameData.board.draw();

        if (handleWinLogic(gameData.board, gameData.players[currentPlayerIndex])) {
            gameOver = true;
            break;
        }

        currentPlayerIndex = 1 - currentPlayerIndex; // Switch players
        moves++;
    }

    if (!gameOver) {
        console.log("It's a draw!");
    }
}

function assignPlayerLocation(board, player) {
    let location;
    do {
        location = Number(prompt(`${player.getName()} (${player.getSelection()}), choose your location (0-8):`));
    } while (board.values[location] !== null); // Keep asking if location is taken

    board.values[location] = player.getSelection();
}