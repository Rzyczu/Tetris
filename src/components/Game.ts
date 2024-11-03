import Falling from "./Falling"
import Keys from "./KeyboardKeys";

const config = require("./config.json");

type pieceObj = {
    cords?: (cordsObj)[];
    symbol?: (number[])[];
    levels?: { fallLevel: number, leftLevel: number };
    img?: string
}

type cordsObj = {
    x?: number;
    y?: number;
    id?: number;
    state?: number;
}

export default class Game {
    array: (number | string)[][] = [];
    readonly x: number;
    readonly y: number;
    nextPieceSymbol: number;
    currentPiece: (pieceObj | null);
    nextPiece: (pieceObj | null);
    blockID: number = 0;
    end: boolean = false

    gameLevel: number
    gameScore: number = 0
    gameLines: number = 0


    fallingInterval: (ReturnType<typeof setInterval>)
    key: string

    constructor(array: (number | string)[][], level: number) {
        this.x = config.table.rows;
        this.y = config.table.columns;

        this.array = array
        this.gameLevel = level

        let lines: HTMLDivElement = document.createElement("div");
        lines.style.position = "absolute";
        lines.id = "lines"
        lines.style.backgroundColor = "black"
        lines.style.width = (10 * config.table.blockWidth + 10 * 5) / 3 + 'px'
        lines.style.height = 1.5 * config.table.blockWidth + 'px'
        lines.style.left = 833 + (10 * config.table.blockWidth + 10 * 5) / 3 * 2 + "px";
        lines.style.top = 72 + "px";
        lines.innerHTML = '000'
        lines.style.fontSize = "36px"
        document.getElementById("tableDiv").appendChild(lines)
        console.table(this.array)

        let levelDiv: HTMLDivElement = document.createElement("div");
        levelDiv.style.position = "absolute";
        levelDiv.id = "level"
        levelDiv.style.backgroundColor = "black"
        levelDiv.style.width = (10 * config.table.blockWidth + 10 * 5) / 4 + 'px'
        levelDiv.style.height = 1.5 * config.table.blockWidth + 'px'
        levelDiv.style.left = 1280 + "px";
        levelDiv.style.top = 695 + "px";
        levelDiv.innerHTML = '0' + this.gameLevel.toString()
        levelDiv.style.fontSize = "36px"
        document.getElementById("tableDiv").appendChild(levelDiv)
        console.table(this.array)

        let scoreDiv: HTMLDivElement = document.createElement("div");
        scoreDiv.style.position = "absolute";
        scoreDiv.id = "score"
        scoreDiv.style.backgroundColor = "black"
        scoreDiv.style.width = 215 + 'px'
        scoreDiv.style.height = 1.5 * config.table.blockWidth + 'px'
        scoreDiv.style.left = 1228 + "px";
        scoreDiv.style.top = 245 + "px";
        scoreDiv.innerHTML = ' 000000'
        scoreDiv.style.fontSize = "35px"
        document.getElementById("tableDiv").appendChild(scoreDiv)
        console.table(this.array)

        let firstPieceSymbol = this.randomPiece()
        let nextPieceSymbol = this.randomPiece()

        this.currentPiece = this.newPiece(firstPieceSymbol)
        this.nextPiece = this.newPiece(nextPieceSymbol)
        this.addPieceToArray(this.currentPiece)
        this.addPieceToBoard(this.currentPiece)

        document.body.addEventListener("keydown", (event) => this.onKeyDown(event, this.currentPiece), false)

        // console.log("this.currentPiece")
        // console.log((this.currentPiece).symbol)
        let fall = () => {
            this.fallPiece(this.currentPiece)
        }
        this.fallingInterval = setInterval(fall, 1000 / (this.gameLevel + 1))

        // console.table(this.array)

    }
    randomPiece() {
        let randomSymbolNum = Math.floor(Math.random() * config.game.pieces.length)
        let odleglosc = 4

        let allNext = document.querySelectorAll(".nextTable")
        // console.log(allNext)
        for (let i = 0; i < allNext.length; i++) {
            allNext[i].remove()
        }

        if (randomSymbolNum == 3) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {

                    let div: HTMLDivElement = document.createElement("div");
                    div.style.position = "absolute";
                    div.className = "nextTable"
                    div.id = i + "_" + j;
                    div.style.width = config.table.blockWidth + 'px'
                    div.style.backgroundImage = "url(./assets/piece_A.png"
                    div.style.backgroundPosition = 'center';
                    div.style.backgroundRepeat = ' no-repeat';
                    div.style.backgroundSize = 'cover';
                    div.style.height = config.table.blockWidth + 'px'
                    div.style.left = 1600 + config.table.blockWidth * j + odleglosc * j + "px";
                    div.style.top = 495 + config.table.blockWidth * i + odleglosc * i + "px";
                    document.getElementById("tableDiv").appendChild(div)
                }
            }
        } else if (randomSymbolNum != 6) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    let div: HTMLDivElement = document.createElement("div");
                    div.style.position = "absolute";
                    div.className = "nextTable"
                    div.id = i + "_" + j;

                    if (randomSymbolNum == 0) {
                        if (i == 1) {
                            div.style.backgroundImage = "url(./assets/piece_A.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                        if (i == 2 && j == 1) {
                            div.style.backgroundImage = "url(./assets/piece_A.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                    } else if (randomSymbolNum == 1) {
                        if (i == 1) {
                            div.style.backgroundImage = "url(./assets/piece_B.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                        if (i == 2 && j == 2) {
                            div.style.backgroundImage = "url(./assets/piece_B.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                    } else if (randomSymbolNum == 2) {
                        if (i == 1 && j != 2) {
                            div.style.backgroundImage = "url(./assets/piece_C.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                        if (i == 2 && j != 0) {
                            div.style.backgroundImage = "url(./assets/piece_C.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                    } else if (randomSymbolNum == 4) {
                        if (i == 1 && j != 0) {
                            div.style.backgroundImage = "url(./assets/piece_B.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                        if (i == 2 && j != 2) {
                            div.style.backgroundImage = "url(./assets/piece_B.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                    } else if (randomSymbolNum == 5) {
                        if (i == 1) {
                            div.style.backgroundImage = "url(./assets/piece_C.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                        if (i == 2 && j == 0) {
                            div.style.backgroundImage = "url(./assets/piece_C.png"
                            div.style.backgroundPosition = 'center';
                            div.style.backgroundRepeat = ' no-repeat';
                            div.style.backgroundSize = 'cover';
                        }
                    }



                    div.style.width = config.table.blockWidth + 'px'
                    div.style.height = config.table.blockWidth + 'px'
                    div.style.left = 1244 + config.table.blockWidth * j + odleglosc * j + "px";
                    div.style.top = 477 + config.table.blockWidth * i + odleglosc * i + "px";
                    document.getElementById("tableDiv").appendChild(div)
                }
            }
        } else {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {

                    let div: HTMLDivElement = document.createElement("div");
                    div.style.position = "absolute";
                    div.className = "nextTable"
                    div.id = i + "_" + j;
                    // div.style.backgroundColor = "black"
                    // div.style.backgroundImage = 'url(./assets/piece_A.png)'
                    // div.style.padding = "5px"
                    div.style.width = config.table.blockWidth + 'px'
                    div.style.height = config.table.blockWidth + 'px'

                    if (i == 2) {
                        div.style.backgroundImage = "url(./assets/piece_A.png"
                        div.style.backgroundPosition = 'center';
                        div.style.backgroundRepeat = ' no-repeat';
                        div.style.backgroundSize = 'cover';
                    }
                    div.style.left = 1228 + config.table.blockWidth * j + odleglosc * j + "px";
                    div.style.top = 459 + config.table.blockWidth * i + odleglosc * i + "px";
                    document.getElementById("tableDiv").appendChild(div)
                }
            }
        }

        return randomSymbolNum
    }
    newPiece(symbol: number) {

        let cords = []
        let pieceImgArr = ["piece_A", "piece_B", "piece_C"]
        let pieceImg
        if (symbol == 0 || symbol == 3 || symbol == 6) {
            pieceImg = pieceImgArr[0]
        } else if (symbol == 1 || symbol == 4) {
            pieceImg = pieceImgArr[1]
        } else if (symbol == 2 || symbol == 5) {
            pieceImg = pieceImgArr[2]
        }
        for (let i = 0; i < config.game.pieces[symbol].length; i++) {
            for (let j = 0; j < config.game.pieces[symbol][i].length; j++) {
                if (config.game.pieces[symbol][i][j] == 1) {
                    cords.push({ x: j + 4, y: i - 1, id: this.blockID, state: 1 })
                    this.blockID = this.blockID + 1
                }
            }
        }
        return new Object({ cords: cords, symbol: config.game.pieces[symbol], levels: { fallLevel: 0, leftLevel: 0 }, img: pieceImg })
    }
    fallPiece(piece: pieceObj) {
        // console.log(piece)

        let chekDown = this.checkDownBeforeFall(piece)
        if (chekDown) {
            this.clearBoard()
            this.cleanArrayBeforeMove()

            this.movePiece({ piece, cord: 'y', value: 1 })

            this.addPieceToArray(piece)
            this.addPieceToBoard(piece)

            // console.clear()
            // console.table(this.array)
            // console.clear()
            // console.table(this.array)
            // console.log(this.fallLevel + " : ")
            // console.log(this.leftLevel + " : ")

            // console.log(piece)

            let chekDownOneMore = this.checkDownBeforeFall(piece)

            if (!chekDownOneMore) {
                if (this.end == false) {
                    for (let i = 0; i < piece.cords.length; i++) {
                        piece.cords[i].state = 2
                        this.array[piece.cords[i].y][piece.cords[i].x] = piece.cords[i].state
                    }
                    // console.clear()
                    // console.table(this.array)
                    // console.log(piece)
                    this.endOfFalling()
                } else {
                    this.endGame()
                }
            }

        } else {

            if (this.end == false) {
                for (let i = 0; i < piece.cords.length; i++) {
                    piece.cords[i].state = 2
                    this.array[piece.cords[i].y][piece.cords[i].x] = piece.cords[i].state
                }
                // console.clear()
                // console.table(this.array)
                // console.log(piece)
                this.endOfFalling()
            } else {
                this.endGame()
            }
        }
    }
    onKeyDown = (event: KeyboardEvent, piece: pieceObj) => {
        // console.log(event.key)
        switch (event.keyCode) {

            case Keys.up:
                break;
            case Keys.left:
                let chekLeft = this.checkLeftBeforeMove(piece)

                if (chekLeft) {
                    this.clearBoard()
                    this.cleanArrayBeforeMove()
                    this.movePiece({ piece, cord: 'x', value: -1 })
                    this.addPieceToArray(piece)
                    this.addPieceToBoard(piece)

                    // console.clear()
                    // console.table(this.array)
                    // console.log(this.leftLevel)

                    return piece
                }
                break;
            case Keys.right:
                let chekRight = this.checkRightBeforeMove(piece)

                if (chekRight) {
                    this.clearBoard()
                    this.cleanArrayBeforeMove()
                    this.movePiece({ piece, cord: 'x', value: 1 })
                    this.addPieceToArray(piece)
                    this.addPieceToBoard(piece)

                    // console.clear()
                    // console.table(this.array)
                    // console.log(this.leftLevel)

                    return piece
                }
                break;
            case Keys.down:
                let chekDown = this.checkDownBeforeFall(piece)

                if (chekDown) {
                    this.clearBoard()
                    this.cleanArrayBeforeMove()
                    this.movePiece({ piece, cord: 'y', value: 1 })
                    this.addPieceToArray(piece)
                    this.addPieceToBoard(piece)

                    // console.clear()
                    // console.table(this.array)
                    // console.log(piece)

                    return piece
                }
                break;
            case Keys.leftArrow:
                if (piece.symbol.length == 4) {
                    let newSymbol: (null | (number[])[]) = null
                    let arr = [1, 1, 1, 1]

                    if (piece.symbol[2][0] == 1)
                        newSymbol = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
                    else if (piece.symbol[3][1] == 1)
                        newSymbol = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]

                    let oldSymbol = piece.symbol
                    piece.symbol = newSymbol

                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + piece.levels.leftLevel, y: k - 1 + piece.levels.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        piece.cords = newCords
                        this.clearBoard()
                        this.cleanArrayBeforeMove()
                        this.addPieceToArray(piece)
                        this.addPieceToBoard(piece)

                        // console.clear()
                        // console.table(this.array)
                        // console.table(piece.symbol)
                    } else {
                        piece.symbol = oldSymbol
                    }
                } else if (piece.symbol.length == 3) {
                    let newSymbol = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
                    if (piece.symbol[0][0] == 1)
                        newSymbol[0][2] = 1
                    if (piece.symbol[0][2] == 1)
                        newSymbol[2][2] = 1
                    if (piece.symbol[2][2] == 1)
                        newSymbol[2][0] = 1
                    if (piece.symbol[2][0] == 1)
                        newSymbol[0][0] = 1

                    if (piece.symbol[0][1] == 1)
                        newSymbol[1][2] = 1
                    if (piece.symbol[1][2] == 1)
                        newSymbol[2][1] = 1
                    if (piece.symbol[2][1] == 1)
                        newSymbol[1][0] = 1
                    if (piece.symbol[1][0] == 1)
                        newSymbol[0][1] = 1

                    let oldSymbol = piece.symbol
                    piece.symbol = newSymbol
                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + piece.levels.leftLevel, y: k - 1 + piece.levels.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        piece.cords = newCords
                        this.clearBoard()
                        this.cleanArrayBeforeMove()
                        this.addPieceToArray(piece)
                        this.addPieceToBoard(piece)

                        // console.clear()
                        // console.table(this.array)
                        // console.table(piece.symbol)
                    } else {
                        piece.symbol = oldSymbol
                    }
                }
                break;
            case Keys.rightArrow:
                if (piece.symbol.length == 4) {
                    let newSymbol: (number[])[] = null
                    let arr = [1, 1, 1, 1]

                    if (piece.symbol[2][0] == 1)
                        newSymbol = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
                    else if (piece.symbol[3][1] == 1)
                        newSymbol = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]

                    let oldSymbol = piece.symbol
                    piece.symbol = newSymbol

                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + piece.levels.leftLevel, y: k - 1 + piece.levels.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        piece.cords = newCords
                        this.clearBoard()
                        this.cleanArrayBeforeMove()
                        this.addPieceToArray(piece)
                        this.addPieceToBoard(piece)

                        // console.clear()
                        // console.table(this.array)
                        // console.table(piece.symbol)
                    } else {
                        piece.symbol = oldSymbol
                    }
                } else if (piece.symbol.length == 3) {
                    let newSymbol = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
                    if (piece.symbol[0][0] == 1)
                        newSymbol[2][0] = 1
                    if (piece.symbol[0][2] == 1)
                        newSymbol[0][0] = 1
                    if (piece.symbol[2][2] == 1)
                        newSymbol[0][2] = 1
                    if (piece.symbol[2][0] == 1)
                        newSymbol[2][2] = 1

                    if (piece.symbol[0][1] == 1)
                        newSymbol[1][0] = 1
                    if (piece.symbol[1][2] == 1)
                        newSymbol[0][1] = 1
                    if (piece.symbol[2][1] == 1)
                        newSymbol[1][2] = 1
                    if (piece.symbol[1][0] == 1)
                        newSymbol[2][1] = 1

                    let oldSymbol = piece.symbol
                    piece.symbol = newSymbol
                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + piece.levels.leftLevel, y: k - 1 + piece.levels.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        piece.cords = newCords
                        this.clearBoard()
                        this.cleanArrayBeforeMove()
                        this.addPieceToArray(piece)
                        this.addPieceToBoard(piece)

                        // console.clear()
                        // console.table(this.array)
                        // console.table(piece.symbol)
                    } else {
                        piece.symbol = oldSymbol
                    }
                }
                break;
            case Keys.enter:
                break;

        }
    }
    cleanArrayBeforeMove() {

        for (let i = 0; i <= config.table.rows; i++) {
            for (let j = 0; j <= config.table.columns; j++) {
                if (this.array[j][i] == 1) {
                    this.array[j][i] = 0
                }
            }
        }
    }
    movePiece({ piece, cord, value }: { piece: pieceObj; cord: string; value: number; }) {
        for (let i = 0; i < piece.cords.length; i++) {

            if (cord == 'x') {
                piece.cords[i].x = piece.cords[i].x + value
            } else if (cord == 'y') {
                piece.cords[i].y = piece.cords[i].y + value
            }

        }
        if (cord == 'y') {
            piece.levels.fallLevel = piece.levels.fallLevel + value
        } else if (cord == 'x') {
            piece.levels.leftLevel = piece.levels.leftLevel + value
        }
        return piece
    }
    addPieceToArray(piece: pieceObj) {
        for (let i = 0; i < piece.cords.length; i++) {
            if (this.array[piece.cords[i].y][piece.cords[i].x] != "X") {
                this.array[piece.cords[i].y][piece.cords[i].x] = piece.cords[i].state

            }

        }
    }
    addPieceToBoard(piece: pieceObj) {
        let board: (HTMLElement[])
        board = Array.from(document.querySelectorAll('.table'))

        for (let i = 0; i < board.length; i++) {

            let id = board[i].id.split('_')
            for (let j = 0; j < piece.cords.length; j++) {
                if (
                    piece.cords[j].x - 1 == parseInt(id[1]) &&
                    piece.cords[j].y - 1 == parseInt(id[0])
                ) {
                    // board[i].innerHTML = "x"
                    // let img: HTMLImageElement = document.createElement("img");
                    // img.id = "pieceImg";
                    // img.style.position = "absolute"
                    // img.style.top = parseInt(board[i].style.top) + config.table.blockWidth / 4 + 'px';
                    // img.style.left = parseInt(board[i].style.left) + config.table.blockWidth / 4 + 'px';
                    // img.src = './assets/' + piece.img + '.png';
                    // document.getElementById("gameBoard").appendChild(img)

                    board[i].style.backgroundImage = 'url("./assets/' + piece.img + '.png")';

                    board[i].style.backgroundPosition = 'center'; /* Center the image */
                    board[i].style.backgroundRepeat = ' no-repeat'; /* Do not repeat the image */
                    board[i].style.backgroundSize = 'cover'; /* Resize the background image to cover the entire container */
                    // console.log('url("./assets/"' + piece.img + '.png)')
                }

            }
        }
    }
    clearBoard() {
        let board: (HTMLElement[])
        board = Array.from(document.querySelectorAll('.table'))
        // for (let k = 0; k < board.length; k++) {
        //     if (board[k].innerHTML == "X") {
        //         board[k].innerHTML = ""

        //         let id = board[k].id.split('_')
        //         console.log(parseInt(id[1]) + 1, parseInt(id[0]) + 1)
        //     }

        // }
        // console.log("przerwaaaaaaaaaaa")
        // for (let i = 1; i < this.y + 2; i++) {
        //     for (let j = 1; j < this.x + 2; j++) {
        //         if (this.array[i - 1][j - 1] == 1) {
        //             console.log(j - 1, i - 1)

        //         }

        //     }
        // }

        for (let i = 1; i < this.y + 2; i++) {
            for (let j = 1; j < this.x + 2; j++) {
                if (this.array[i - 1][j - 1] == 1) {
                    for (let k = 0; k < board.length; k++) {
                        let id = board[k].id.split('_')
                        if (parseInt(id[1]) + 1 == j - 1) {
                            if (parseInt(id[0]) + 1 == i - 1) {
                                // boassrd[k].innerHTML = ''
                                board[k].style.backgroundImage = '';

                            }
                        }
                    }
                }
            }
        }
    }
    checkDownBeforeFall(piece: pieceObj): boolean {
        let isGood = 0 //=0 - is good | >0 - is not good
        for (let i = 0; i < piece.cords.length; i++) {
            if (piece.cords[i].y == 20) {
                isGood++
            } else if (this.array[piece.cords[i].y + 1][piece.cords[i].x] == 2) {
                isGood++
                if (piece.levels.fallLevel == 0)
                    this.end = true
            }
            // console.log(this.array[piece.cords[i].y + 1][piece.cords[i].x])

        }

        return (isGood == 0)
    }
    checkLeftBeforeMove(piece: pieceObj): boolean {
        let isGood = 0 //=0 - is good | >0 - is not good
        for (let i = 0; i < piece.cords.length; i++) {
            if (
                this.array[piece.cords[i].y][piece.cords[i].x - 1] == 'X' ||
                this.array[piece.cords[i].y][piece.cords[i].x - 1] == 2
            ) {
                isGood++
            }
        }
        return (isGood == 0)
    }
    checkRightBeforeMove(piece: pieceObj): boolean {
        let isGood = 0 //=0 - is good | >0 - is not good
        for (let i = 0; i < piece.cords.length; i++) {
            if (
                this.array[piece.cords[i].y][piece.cords[i].x + 1] == 'X' ||
                this.array[piece.cords[i].y][piece.cords[i].x + 1] == 2
            ) {
                isGood++
            }
        }
        return (isGood == 0)
    }
    checkBeforeRotate(cords: cordsObj[]): boolean {
        let isGood = 0 //=0 - is good | >0 - is not good
        // console.log(cords)
        for (let i = 0; i < cords.length; i++) {
            if (
                this.array[cords[i].y][cords[i].x] == 'X' ||
                this.array[cords[i].y][cords[i].x] == 2
            ) {
                isGood++
            }
        }
        return (isGood == 0)
    }
    endOfFalling() {
        clearInterval(this.fallingInterval)
        document.body.removeEventListener("keydown", (event) => this.onKeyDown(event, this.currentPiece), false)

        // console.log("end")

        this.checkCapture()


    }
    checkCapture() {
        let howManyLines = 0
        for (let i = 1; i < this.y + 2; i++) {
            if (this.array[i - 1][1] == 2)
                if (this.array[i - 1][2] == 2)
                    if (this.array[i - 1][3] == 2)
                        if (this.array[i - 1][4] == 2)
                            if (this.array[i - 1][5] == 2)
                                if (this.array[i - 1][6] == 2)
                                    if (this.array[i - 1][7] == 2)
                                        if (this.array[i - 1][8] == 2)
                                            if (this.array[i - 1][9] == 2)
                                                if (this.array[i - 1][10] == 2) {
                                                    this.capture(i)
                                                    this.gameLines++
                                                    howManyLines++

                                                }
        }
        this.score(howManyLines)

        this.nextMove()
    }
    score(lines: number) {
        if (lines == 1) {
            this.gameScore += 40 * (this.gameLevel + 1)
        } else if (lines == 2) {
            this.gameScore += 100 * (this.gameLevel + 1)
        } else if (lines == 3) {
            this.gameScore += 300 * (this.gameLevel + 1)
        } else if (lines == 4) {
            this.gameScore += 1200 * (this.gameLevel + 1)
        }

        let scoreDiv = document.getElementById("score")
        if (this.gameScore.toString().length == 1)
            scoreDiv.innerHTML = ' 00000' + this.gameScore.toString()
        else if (this.gameScore.toString().length == 2)
            scoreDiv.innerHTML = ' 0000' + this.gameScore.toString()
        else if (this.gameScore.toString().length == 3)
            scoreDiv.innerHTML = ' 000' + this.gameScore.toString()
        else if (this.gameScore.toString().length == 4)
            scoreDiv.innerHTML = ' 00' + this.gameScore.toString()
        else if (this.gameScore.toString().length == 5)
            scoreDiv.innerHTML = ' 0' + this.gameScore.toString()
        else if (this.gameScore.toString().length == 6)
            scoreDiv.innerHTML = this.gameScore.toString()
    }
    capture(col: number) {
        let board: (HTMLElement[])
        board = Array.from(document.querySelectorAll('.table'))
        console.log(col)
        for (let i = 1; i < this.y + 2; i++) {
            this.array[col - 1][i - 1] = 0
        }

        for (let i = 1; i < this.y + 2; i++) {
            for (let k = 0; k < board.length; k++) {
                let id = board[k].id.split('_')
                if (parseInt(id[1]) + 1 == i - 1) {
                    if (parseInt(id[0]) + 1 == col - 1) {
                        // boassrd[k].innerHTML = ''
                        board[k].style.backgroundImage = '';

                    }
                }
            }
        }
    }
    nextMove() {
        this.currentPiece = this.nextPiece
        let nextPieceSymbol = this.randomPiece()
        this.nextPiece = this.newPiece(nextPieceSymbol)

        let fall = () => {
            this.fallPiece(this.currentPiece)
        }
        this.fallingInterval = setInterval(fall, 1000 / (this.gameLevel + 1))



        let div = document.getElementById('lines')
        if (this.gameLines.toString().length == 1) {
            div.innerHTML = '00' + this.gameLines
        } else if (this.gameLines.toString().length == 2) {
            div.innerHTML = '0' + this.gameLines
        } else if (this.gameLines.toString().length == 3) {
            div.innerHTML = this.gameLines.toString()
        }
        console.log(div)
    }
    endGame() {
        let board: (HTMLElement[])
        board = Array.from(document.querySelectorAll('.table'))
        for (let i = 1; i < this.y + 2; i++) {
            for (let j = 1; j < this.x + 2; j++) {
                for (let k = 0; k < board.length; k++) {
                    let id = board[k].id.split('_')

                    board[k].style.backgroundImage = '';


                }
            }
        }




        console.log("over")
        let allNext = document.querySelectorAll(".nextTable")
        // console.log(allNext)
        for (let i = 0; i < allNext.length; i++) {
            allNext[i].remove()
        }



        for (let i = 0; i < board.length; i = i + 10) {

            setTimeout(() => {
                let img: HTMLImageElement = document.createElement("img");
                img.id = "pieceImg";
                img.style.width = "17%";
                img.style.position = "absolute"
                img.style.top = parseInt(board[i].style.top) + config.table.blockWidth / 4 + 'px';
                img.style.left = parseInt(board[i].style.left) + config.table.blockWidth / 4 + 'px';
                img.src = './assets/end.png';
                document.getElementById("gameBoard").appendChild(img)

            }, i / 10 * 50)
        }
        let goSetting = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case Keys.enter:
                    location.reload();
                    document.body.removeEventListener("keydown", goSetting, false)

                    break;
            }

        }

        document.body.addEventListener("keydown", goSetting, false)
    }

}
