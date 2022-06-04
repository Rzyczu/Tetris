import Game from "./Game"

const config = require("./config.json");

export default class CreateTable {
    array: (number | string)[][] = [];
    readonly x: number;
    readonly y: number;
    gameLevel: number

    constructor(level: number) {
        this.gameLevel = level

        this.x = config.table.rows;
        this.y = config.table.columns;

        this.boardImg()
        this.createArray();
        this.createGameBoard();
    }
    boardImg() {
        let img: HTMLImageElement = document.createElement("img");
        img.id = "boardImg";
        img.style.width = "90%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.src = config.assets.board.src;
        document.getElementById("gameBoard").appendChild(img)
    }
    createArray(): void {
        const style = 'font-weight: bold; font-size: 30px;color: red; text-shadow: 3px 3px 0 rgb(0,0,38)';
        // console.log('%c[y, x]', style)
        for (let i = 0; i < this.y + 2; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.x + 2; j++) {
                if (j == 0 || j == this.x + 1 || i == 0 || i == this.y + 1)
                    this.array[i][j] = 'X';
                else
                    this.array[i][j] = 0;
            }
        }
        // console.table(this.array)
    }
    createGameBoard(): void {
        let gameBoard: HTMLDivElement = document.createElement("div");
        gameBoard.className = "gameBoard"
        gameBoard.id = "gameBoard";
        document.body.appendChild(gameBoard)


        let tableDiv: HTMLDivElement = document.createElement("div");
        tableDiv.className = "tableDiv"
        tableDiv.id = "tableDiv";
        document.getElementById("gameBoard").appendChild(tableDiv)

        let odleglosc = 5

        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {

                let div: HTMLDivElement = document.createElement("div");
                div.style.position = "absolute";
                div.className = "table"
                div.id = i + "_" + j;
                // div.style.backgroundColor = "black"
                // div.style.backgroundImage = 'url(./assets/piece_A.png)'
                // div.style.padding = "5px"
                div.style.width = config.table.blockWidth + 'px'
                div.style.height = config.table.blockWidth + 'px'
                div.style.left = 823 + config.table.blockWidth * j + odleglosc * j + "px";
                div.style.top = 180 + config.table.blockWidth * i + odleglosc * i + "px";
                document.getElementById("tableDiv").appendChild(div)
            }
        }
        this.goPlay()
    }
    goPlay() {
        let play = new Game(this.array, this.gameLevel)
    }

}