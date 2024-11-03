class PF {
    ta_z_tabelka: (number | string)[][] = []
    roz: number;
    czy_jest_start: boolean = false;
    czy_jest_meta: boolean = false;
    miejsce_start_x: number;
    miejsce_start_y: number;
    miejsce_meta_x: number;
    miejsce_meta_y: number;
    constructor(roz: number) {
        this.ta_z_tabelka = [];
        this.roz = roz;
        this.fill();
        this.rand(5);
        this.HTML();
        this.render();
    }



    fill() { //*tworzy tablicę
        for (let i = 0; i < this.roz; i++) {
            this.ta_z_tabelka[i] = [];
            for (let j = 0; j < this.roz; j++) {
                this.ta_z_tabelka[i][j] = 0
            }
        }
    }

    rand(ile: number) { //*wpisuje do tablicy ściany
        let random_x: number;
        let random_y: number;
        let i = 0;
        while (i < ile) {
            random_x = Math.floor(Math.random() * 5);
            random_y = Math.floor(Math.random() * 5);

            if (this.ta_z_tabelka[random_y][random_x] != "X") {
                this.ta_z_tabelka[random_y][random_x] = "X";
                i++;
            }
        }
    }

    HTML() {//*rysuje tabelkę na stronie i oznacza na niej dane z tablicy
        let diwek: HTMLDivElement = document.createElement("div");
        diwek.classList.add("diwek")

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let mini_diwek: HTMLDivElement = document.createElement("div")

                mini_diwek = document.createElement("div")
                mini_diwek.classList.add("mini_diwek")
                mini_diwek.id = i + "_" + j;

                mini_diwek.style.left = j * 10 + "px"
                mini_diwek.style.top = i * 10 + "px"
                mini_diwek.addEventListener("click", (e) => { this.klik(e) })
                diwek.appendChild(mini_diwek)

            }
        }
        document.body.appendChild(diwek)
    }

    klik(e: MouseEvent) {
        //*e.target - kliknięty element 
        //*this - dalej odnosi się do klasy
        // console.log(e.target, this);
        // console.log(this.ta_z_tabelka);
        let start = (e.target as HTMLElement).id;
        let elem = document.getElementById(start);
        let podzial = start.split('_');
        let x = parseInt(podzial[0]);
        let y = parseInt(podzial[1]);

        if (this.czy_jest_start == false) {
            if (this.ta_z_tabelka[x][y] == 0) {
                for (let a = 0; a < this.ta_z_tabelka.length; a++) {
                    for (let b = 0; b < this.ta_z_tabelka.length; b++) {
                        if (this.ta_z_tabelka[x][y] == 0) {
                            this.czy_jest_start = false
                        }
                        else if (this.ta_z_tabelka[x][y] == 'X') {
                            this.czy_jest_start = false
                        }
                    }
                }
                this.ta_z_tabelka[x][y] = "S";
                this.czy_jest_start = true
                this.miejsce_start_x = x
                this.miejsce_start_y = y
            }
        } else {
            if (this.czy_jest_meta == false) {
                if (this.ta_z_tabelka[x][y] == 0) {
                    for (let a = 0; a < this.ta_z_tabelka.length; a++) {
                        for (let b = 0; b < this.ta_z_tabelka.length; b++) {
                            if (this.ta_z_tabelka[x][y] == 0) {
                                this.czy_jest_meta = false
                            }
                            else if (this.ta_z_tabelka[x][y] == 'X') {
                                this.czy_jest_meta = false
                            }
                            else if (this.ta_z_tabelka[x][y] == "S") {
                                this.czy_jest_meta = true
                            }
                        }
                    }
                    this.ta_z_tabelka[x][y] = "M";
                    this.czy_jest_meta = true
                    this.miejsce_meta_x = x
                    this.miejsce_meta_y = y
                }
            }
        }



        this.trasa();
        this.render();

    }
    trasa() {
        let wypisywana_x_p: number = 1
        let wypisywana_x_m: number = 1
        let wypisywana_y_p: number = 1
        let wypisywana_y_m: number = 1
        let x_plus: number = this.miejsce_start_x + 1;
        let y_plus: number = this.miejsce_start_y + 1;
        let x_minus: number = this.miejsce_start_x - 1;
        let y_minus: number = this.miejsce_start_y - 1;


        if (this.czy_jest_meta == true) {
            console.log('start: x:' + this.miejsce_start_x + ' y:' + this.miejsce_start_y);
            console.log('meta: x:' + this.miejsce_meta_x + ' y:' + this.miejsce_meta_y);
            console.table(this.ta_z_tabelka)
            for (let i = 0; i < 5; i++) {
                if (this.ta_z_tabelka[x_plus] != undefined && this.ta_z_tabelka[x_plus][this.miejsce_start_y] == 0 &&
                    this.ta_z_tabelka[x_plus][this.miejsce_start_y] != 'X') {
                    this.ta_z_tabelka[x_plus][this.miejsce_start_y] = wypisywana_x_p
                    x_plus++
                    wypisywana_x_p++
                }
                if (this.ta_z_tabelka[x_minus] != undefined && this.ta_z_tabelka[x_minus][this.miejsce_start_y] == 0 &&
                    this.ta_z_tabelka[x_minus][this.miejsce_start_y] != 'X') {
                    this.ta_z_tabelka[x_minus][this.miejsce_start_y] = wypisywana_x_m
                    x_minus--
                    wypisywana_x_m++
                }
                if (this.ta_z_tabelka[this.miejsce_start_x][y_plus] == 0 &&
                    this.ta_z_tabelka[this.miejsce_start_x][y_plus] != 'X') {
                    this.ta_z_tabelka[this.miejsce_start_x][y_plus] = wypisywana_y_p
                    y_plus++
                    wypisywana_y_p++
                }
                if (this.ta_z_tabelka[this.miejsce_start_x][y_minus] == 0 &&
                    this.ta_z_tabelka[this.miejsce_start_x][y_minus] != 'X') {
                    this.ta_z_tabelka[this.miejsce_start_x][y_minus] = wypisywana_y_m
                    y_minus--
                    wypisywana_y_m++
                }
                console.log('test')

                console.table(this.ta_z_tabelka)


            }
        }
    }
    wypelnianie() {
        //* funkacja bedzie zapisywac wspolrzedne dla danej liczy i bedzie dla nich wykonywac powyzsza funkcje
        for (let x = 0; x < this.ta_z_tabelka.length; x++) {
            for (let y = 0; y < this.ta_z_tabelka.length; y++) {

            }
        }
    }

    render() {
        for (let i = 0; i < this.roz; i++)
            for (let j = 0; j < this.roz; j++)
                document.getElementById(i + "_" + j).innerText = this.ta_z_tabelka[i][j].toString();

    }
}

let ob = new PF(5);
