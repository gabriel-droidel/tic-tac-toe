function createGameBoard() {
	let board = [];
	for (let i = 1; i <=9; i++) {
		board.push(i);
	}
	return board;
}

const gameBoard = createGameBoard();

function drawGameBoard(array){
console.log(`
	${array[0]} _ ${array[1]} _ ${array[2]} 
	${array[3]} _ ${array[4]} _ ${array[5]}
	${array[6]} _ ${array[7]} _ ${array[8]}`
	);
}
drawGameBoard(gameBoard);
function createPlayer() {
	const name = prompt('Player name : ');
	const selection = prompt('Choose X or O');

	return { name, selection };
}

function getPlayerChoice(gameBoard, selection) {

	const location = Number(prompt('Choose your location on the board:'))-1;
	gameBoard[location]=selection;
	drawGameBoard(gameBoard);
	handleGameLogic(gameBoard,selection);
}

function handleGameLogic(gameBoard, selection) {
	const [first, second, third] = gameBoard;
	const [, , , forth, fifth, sixth] = gameBoard;
	const [, , , , , , seventh, eighth, ninth] = gameBoard;

	if (first === second && second === third) {
		checking = false;
		return selection ;
	} else if (forth === fifth && fifth === sixth) {
		checking = false;
		return selection;
	} else if (seventh === eighth && eighth === ninth) {
		checking = false;
		return selection;
	} else if (first === forth && forth === seventh) {
		checking = false;
		return selection;
	} else if (second === fifth && fifth === eighth) {
		checking = false;
		return selection;
	} else if (third === sixth && sixth === ninth) {
		checking = false;
		return selection;
	} else if (first === fifth && fifth === ninth) {
		checking = false;
		return selection;
	} else if (third === fifth && fifth === seventh) {
		checking = false;
		return selection;
	}
}
