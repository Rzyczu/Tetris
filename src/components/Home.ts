import CreateTable from "./CreateTable"
import Keys from "./KeyboardKeys";

const config = require("./config.json");
let audio = new Audio

export default class Home {
    array: (number | string)[][] = [];
    readonly x: number;

    constructor() {
        // console.log(config.assets.credits.src)
        this.createBoard()
        // this.creditImg()
        // this.goPlay()
        this.goType_A()

    }
    createBoard() {
        let gameBoard: HTMLDivElement = document.createElement("div");
        gameBoard.id = "gameBoard";
        document.body.appendChild(gameBoard)
    }
    creditImg() {
        let img: HTMLImageElement = document.createElement("img");
        img.id = "creditImg";
        img.style.width = "90%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.src = config.assets.credits.src;
        document.getElementById("gameBoard").appendChild(img)

        setTimeout(() => {
            img.remove()
            this.homePage()

        }, 5000);
    }
    homePage() {
        let img: HTMLImageElement = document.createElement("img");
        img.id = "homePage";
        img.style.width = "90%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.src = config.assets.home.src;
        document.getElementById("gameBoard").appendChild(img)

        let goSetting = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case Keys.enter:
                    img.remove()
                    this.settingsPage()
                    audio = new Audio('./assets/Music_1.ogg');
                    audio.play();
                    document.body.removeEventListener("keydown", goSetting, false)

                    break;
            }

        }

        document.body.addEventListener("keydown", goSetting, false)



    }
    settingsPage(): void {
        let img: HTMLImageElement = document.createElement("img");
        img.id = "settingPage";
        img.style.width = "90%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.src = config.assets.settings.src;
        document.getElementById("gameBoard").appendChild(img)

        let gameTypes = ["A-TYPE", "B-TYPE"]
        let musicTypes = ["MUSIC-1", "MUSIC-2", "MUSIC-3", "OFF"]

        let gameType = 0
        let musicType = 0

        let arrows = true

        let arrowsInterval = () => {
            if (arrows) {
                let leftGT: HTMLImageElement = document.createElement("img");
                leftGT.id = "leftArrowGT";
                leftGT.style.position = "absolute";
                leftGT.style.width = "1.5%";
                if (gameType == 0) {

                    leftGT.style.left = "685px";
                    leftGT.style.top = "250px";
                } else if (gameType == 1) {
                    leftGT.style.left = "1092px";
                    leftGT.style.top = "250px";
                }
                leftGT.src = config.assets.settings.leftArrow;
                document.getElementById("gameBoard").appendChild(leftGT)

                let rightGT: HTMLImageElement = document.createElement("img");
                rightGT.id = "rightArrowGT";
                rightGT.style.position = "absolute";
                rightGT.style.width = "1.5%";
                if (gameType == 0) {
                    rightGT.style.left = "930px";
                    rightGT.style.top = "250px";
                } else if (gameType == 1) {
                    rightGT.style.left = "1333px";
                    rightGT.style.top = "250px";
                }
                rightGT.src = config.assets.settings.rightArrow;
                document.getElementById("gameBoard").appendChild(rightGT)

                let leftMT: HTMLImageElement = document.createElement("img");
                leftMT.id = "leftArrowMT";
                leftMT.style.position = "absolute";
                leftMT.style.width = "1.5%";
                if (musicType == 0) {

                    leftMT.style.left = "855px";
                    leftMT.style.top = "593px";
                } else if (musicType == 1) {
                    leftMT.style.left = "855px";
                    leftMT.style.top = "663px";
                } else if (musicType == 2) {
                    leftMT.style.left = "855px";
                    leftMT.style.top = "733px";
                } else if (musicType == 3) {
                    leftMT.style.left = "855px";
                    leftMT.style.top = "803px";
                }
                leftMT.src = config.assets.settings.leftArrow;
                document.getElementById("gameBoard").appendChild(leftMT)

                let rightMT: HTMLImageElement = document.createElement("img");
                rightMT.id = "rightArrowMT";
                rightMT.style.position = "absolute";
                rightMT.style.width = "1.5%";
                if (musicType == 0) {
                    rightMT.style.left = "1175px";
                    rightMT.style.top = "593px";
                } else if (musicType == 1) {
                    rightMT.style.left = "1175px";
                    rightMT.style.top = "663px";
                } else if (musicType == 2) {
                    rightMT.style.left = "1175px";
                    rightMT.style.top = "733px";
                }
                else if (musicType == 3) {
                    rightMT.style.left = "1175px";
                    rightMT.style.top = "803px";
                }
                rightMT.src = config.assets.settings.rightArrow;
                document.getElementById("gameBoard").appendChild(rightMT)

            } else {
                document.getElementById("leftArrowGT").remove()
                document.getElementById("rightArrowGT").remove()
                document.getElementById("leftArrowMT").remove()
                document.getElementById("rightArrowMT").remove()
            }
            arrows = !arrows
        }

        let changeArrows = setInterval(arrowsInterval, 100)



        let listener = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case Keys.left:
                    if (gameType == 1)
                        gameType = 0
                    break;
                case Keys.right:
                    if (gameType == 0)
                        gameType = 1
                    break;
                case Keys.down:
                    musicType++
                    if (musicType == 4)
                        musicType = 3

                    if (musicType != 3) {
                        // console.log(musicType)
                        audio.pause();
                        audio = new Audio('./assets/Music_' + (musicType + 1) + '.ogg');
                        audio.play()
                    } else {
                        audio.pause();
                    }
                    break;
                case Keys.up:
                    musicType--
                    if (musicType == -1)
                        musicType = 0

                    if (musicType != 3) {
                        // console.log(musicType)
                        audio.pause();
                        audio = new Audio('./assets/Music_' + (musicType + 1) + '.ogg');
                        audio.play()
                    } else {
                        audio.pause();
                    }
                    break;
                case Keys.enter:
                    if (gameType == 0) {
                        img.remove()
                        this.goType_A()

                        clearInterval(changeArrows);
                        document.body.addEventListener("keydown", listener, false)
                        if (document.getElementById("leftArrowMT") != undefined) {
                            document.getElementById("leftArrowGT").remove()
                            document.getElementById("rightArrowGT").remove()
                            document.getElementById("leftArrowMT").remove()
                            document.getElementById("rightArrowMT").remove()
                            document.body.removeEventListener("keydown", listener, false)
                        }
                    }


                    break;
            }
        }
        document.body.addEventListener("keydown", listener, false)

    }
    goType_A() {
        let img: HTMLImageElement = document.createElement("img");
        img.id = "settingPage";
        img.style.width = "90%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.src = config.assets["type-a"].src;
        document.getElementById("gameBoard").appendChild(img)

        let level = 0



        let active = true

        let frameInterval = () => {
            if (active) {

                let frame: HTMLImageElement = document.createElement("img");
                frame.id = "frame";
                frame.style.position = "absolute";
                frame.style.width = "3%";
                let basicLeft = 644
                let basicTop = 338
                if (level < 5) {
                    frame.style.left = basicLeft + level * 68 + 'px';
                    frame.style.top = basicTop + 'px';
                } else {
                    frame.style.left = basicLeft + (level - 5) * 68 + 'px';
                    frame.style.top = basicTop + 68 + 'px';
                }
                frame.src = config.assets["type-a"].frame;
                document.getElementById("gameBoard").appendChild(frame)

            } else {
                document.getElementById("frame").remove()
            }
            active = !active
        }

        let changeFrame = setInterval(frameInterval, 100)
        // this.goPlay()
        let listener = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case Keys.left:
                    level--
                    if (level == -1)
                        level = 0
                    break;
                case Keys.right:
                    level++
                    if (level == 10)
                        level = 9
                    break;
                case Keys.down:
                    if (level < 5)
                        level = level + 5

                    break;
                case Keys.up:
                    if (level >= 5)
                        level = level - 5
                    break;
                case Keys.enter:
                    img.remove()
                    this.goPlay(level)

                    clearInterval(changeFrame);
                    document.body.addEventListener("keydown", listener, false)
                    if (document.getElementById("frame") != undefined) {
                        document.getElementById("frame").remove()

                        document.body.removeEventListener("keydown", listener, false)
                    }

                    break;
            }
        }
        document.body.addEventListener("keydown", listener, false)
    }
    goPlay(level: number) {
        let table = new CreateTable(level)
    }
}