import Keys from "./KeyboardKeys";

const config = require("./config.json");

export default class Falling {
    array: (number | string)[][] = [];
    piece: any;

    fallingInterval: any
    key: string
    keyboard: any
    fallLevel: number = 0
    leftLevel: number = 0;
    falled = false
    constructor(array: (number | string)[][], piece: any) {
        this.array = array
        this.piece = piece
        this.addPieceToBoard()
        //this.keyboard = new Keyboard()
        document.body.addEventListener("keydown", this.onKeyDown, false)

        let fall = () => {
            this.fallPiece(this.piece)

        }
        this.fallingInterval = setInterval(fall, 1000)
    }

    fallPiece(piece: any) {
        let chekDown = this.checkDownBeforeFall(piece)
        if (chekDown) {
            this.cleanArrayBeforeMove()
            this.clearBoard()

            this.addPieceToArray(piece)
            this.movePiece(piece, 'y', 1)
            this.addPieceToBoard()

            // console.clear()
            // console.table(this.array)
            // console.log(this.fallLevel + " : ")
            // console.log(this.leftLevel + " : ")

            // console.log(this.piece)

            return piece
        } else {

            for (let i = 0; i < piece.cords.length; i++) {
                piece.cords[i].state = 2
                this.array[piece.cords[i].y][piece.cords[i].x] = piece.cords[i].state
            }
            clearInterval(this.fallingInterval)
            document.body.removeEventListener("keydown", this.onKeyDown, false)

            // console.clear()
            // console.table(this.array)
            // console.log(piece)
            this.end()
        }

    }
    checkDownBeforeFall(piece: any) {
        let isGood = 0 //=0 - is good | >0 - is not good
        for (let i = 0; i < piece.cords.length; i++) {
            if (piece.cords[i].y == 20) {
                isGood++
            } else if (this.array[piece.cords[i].y][piece.cords[i].x] == '2') {
                isGood++
            }
        }
        return (isGood == 0)
    }
    checkLeftBeforeMove(piece: any) {
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
    checkRightBeforeMove(piece: any) {
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
    checkBeforeRotate(cords: any) {
        let isGood = 0 //=0 - is good | >0 - is not good
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
    onKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {

            case Keys.up:
                break;
            case Keys.left:
                let chekLeft = this.checkLeftBeforeMove(this.piece)

                if (chekLeft) {
                    this.cleanArrayBeforeMove()
                    this.clearBoard()


                    this.movePiece(this.piece, 'x', -1)
                    this.addPieceToArray(this.piece)
                    this.addPieceToBoard()

                    // console.clear()
                    // console.table(this.array)
                    // console.log(this.leftLevel)

                    return this.piece
                }
                break;
            case Keys.right:
                let chekRight = this.checkRightBeforeMove(this.piece)

                if (chekRight) {
                    this.cleanArrayBeforeMove()
                    this.clearBoard()


                    this.movePiece(this.piece, 'x', 1)
                    this.addPieceToArray(this.piece)
                    this.addPieceToBoard()

                    // console.clear()
                    // console.table(this.array)
                    // console.log(this.leftLevel)

                    return this.piece
                }
                break;
            case Keys.down:
                let chekDown = this.checkDownBeforeFall(this.piece)

                if (chekDown) {
                    this.cleanArrayBeforeMove()
                    this.clearBoard()

                    this.movePiece(this.piece, 'y', 1)
                    this.addPieceToArray(this.piece)
                    this.addPieceToBoard()

                    // console.clear()
                    // console.table(this.array)
                    // console.log(this.piece)

                    return this.piece
                }
                break;
            case Keys.leftArrow:
                if (this.piece.symbol.length == 4) {
                    let newSymbol: any = null
                    let arr = [1, 1, 1, 1]

                    if (this.piece.symbol[2][0] == 1)
                        newSymbol = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
                    else if (this.piece.symbol[3][1] == 1)
                        newSymbol = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]

                    let oldSymbol = this.piece.symbol
                    this.piece.symbol = newSymbol

                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + this.leftLevel, y: k - 1 + this.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        this.piece.cords = newCords
                        this.cleanArrayBeforeMove()
                        this.clearBoard()

                        this.addPieceToArray(this.piece)
                        this.addPieceToBoard()

                        // console.clear()
                        // console.table(this.array)
                        // console.table(this.piece.symbol)
                    } else {
                        this.piece.symbol = oldSymbol
                    }
                } else if (this.piece.symbol.length == 3) {
                    let newSymbol = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
                    if (this.piece.symbol[0][0] == 1)
                        newSymbol[0][2] = 1
                    if (this.piece.symbol[0][2] == 1)
                        newSymbol[2][2] = 1
                    if (this.piece.symbol[2][2] == 1)
                        newSymbol[2][0] = 1
                    if (this.piece.symbol[2][0] == 1)
                        newSymbol[0][0] = 1

                    if (this.piece.symbol[0][1] == 1)
                        newSymbol[1][2] = 1
                    if (this.piece.symbol[1][2] == 1)
                        newSymbol[2][1] = 1
                    if (this.piece.symbol[2][1] == 1)
                        newSymbol[1][0] = 1
                    if (this.piece.symbol[1][0] == 1)
                        newSymbol[0][1] = 1

                    let oldSymbol = this.piece.symbol
                    this.piece.symbol = newSymbol
                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + this.leftLevel, y: k - 1 + this.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        this.piece.cords = newCords
                        this.cleanArrayBeforeMove()
                        this.clearBoard()

                        this.addPieceToArray(this.piece)
                        this.addPieceToBoard()

                        // console.clear()
                        // console.table(this.array)
                        // console.table(this.piece.symbol)
                    } else {
                        this.piece.symbol = oldSymbol
                    }
                }
                break;
            case Keys.rightArrow:
                if (this.piece.symbol.length == 4) {
                    let newSymbol: any = null
                    let arr = [1, 1, 1, 1]

                    if (this.piece.symbol[2][0] == 1)
                        newSymbol = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
                    else if (this.piece.symbol[3][1] == 1)
                        newSymbol = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]

                    let oldSymbol = this.piece.symbol
                    this.piece.symbol = newSymbol

                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + this.leftLevel, y: k - 1 + this.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        this.piece.cords = newCords
                        this.cleanArrayBeforeMove()
                        this.clearBoard()

                        this.addPieceToArray(this.piece)
                        this.addPieceToBoard()

                        // console.clear()
                        // console.table(this.array)
                        // console.table(this.piece.symbol)
                    } else {
                        this.piece.symbol = oldSymbol
                    }
                } else if (this.piece.symbol.length == 3) {
                    let newSymbol = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
                    if (this.piece.symbol[0][0] == 1)
                        newSymbol[2][0] = 1
                    if (this.piece.symbol[0][2] == 1)
                        newSymbol[0][0] = 1
                    if (this.piece.symbol[2][2] == 1)
                        newSymbol[0][2] = 1
                    if (this.piece.symbol[2][0] == 1)
                        newSymbol[2][2] = 1

                    if (this.piece.symbol[0][1] == 1)
                        newSymbol[1][0] = 1
                    if (this.piece.symbol[1][2] == 1)
                        newSymbol[0][1] = 1
                    if (this.piece.symbol[2][1] == 1)
                        newSymbol[1][2] = 1
                    if (this.piece.symbol[1][0] == 1)
                        newSymbol[2][1] = 1

                    let oldSymbol = this.piece.symbol
                    this.piece.symbol = newSymbol
                    let newCords = []
                    let id = 0
                    for (let k = 0; k < newSymbol.length; k++) {
                        for (let l = 0; l < newSymbol[k].length; l++) {
                            if (newSymbol[k][l] == 1) {
                                newCords.push({ x: l + 4 + this.leftLevel, y: k - 1 + this.fallLevel, id: id, state: 1 })
                                id++
                            }
                        }
                    }
                    let check = this.checkBeforeRotate(newCords)
                    if (check) {
                        this.piece.cords = newCords
                        this.cleanArrayBeforeMove()
                        this.clearBoard()

                        this.addPieceToArray(this.piece)
                        this.addPieceToBoard()

                        // console.clear()
                        // console.table(this.array)
                        // console.table(this.piece.symbol)
                    } else {
                        this.piece.symbol = oldSymbol
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
    movePiece(piece: any, cord: string, value: number) {
        for (let i = 0; i < piece.cords.length; i++) {

            if (cord == 'x') {
                piece.cords[i].x = piece.cords[i].x + value
            } else if (cord == 'y') {
                piece.cords[i].y = piece.cords[i].y + value
            }

        }
        if (cord == 'y') {
            this.fallLevel = this.fallLevel + value
        } else if (cord == 'x') {
            this.leftLevel = this.leftLevel + value
        }
        return piece
    }
    addPieceToArray(piece: any) {
        for (let i = 0; i < piece.cords.length; i++) {
            if (this.array[piece.cords[i].y][piece.cords[i].x] != "X") {
                this.array[piece.cords[i].y][piece.cords[i].x] = piece.cords[i].state
            }
        }
    }
    addPieceToBoard() {
        let board = document.querySelectorAll('.table')
        let piece = this.piece

        for (let i = 0; i < board.length; i++) {

            let id = board[i].id.split('_')
            for (let j = 0; j < piece.cords.length; j++) {
                if (
                    piece.cords[j].x - 1 == parseInt(id[1]) &&
                    piece.cords[j].y - 1 == parseInt(id[0])
                ) {
                    board[i].innerHTML = "X"
                }
            }
        }
    }
    clearBoard() {
        let board = document.querySelectorAll('.table')
        for (let i = 0; i < board.length; i++) {
            if (board[i].innerHTML = "X")
                board[i].innerHTML = ""
        }
    }
    end() {
        this.falled = true
        return this.piece
    }
}