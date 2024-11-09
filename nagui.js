const validations = [
    {
        title: "1/5",
        html: `
        <div class="check-wrapper">
            <label class="check-box">
                <input type="checkbox" name="accept">
                <svg viewBox="0 -5 64 64" class="accept">
                    <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938" class="path">
                    </path>
                </svg>
            </label>
            <p>Je confirme ne pas être un robot</p>
        </div>
        <button class="prettyButton" onclick="continueGame()">Continuer</button>`,
        setup: () => {

        }
    },
    {
        title: "2/5 : Sélectionner les bières du zytho",
        html: `
        <div class="captcha" style="--w:4;">
        </div>
        <button id="validate" class="prettyButton">Valider</button>
        `,
        setup: () => {
            let captcha = document.querySelector('.captcha');
            let list = [];

            for (let i = 0; i < 16; i++) {
                list.push(i);
            }

            shuffle(list);

            for (i of list) {
                let el = document.createElement('img');
                captcha.appendChild(el);
                el.setAttribute('src', `./images/captcha1/${i}.jpg`);
                el.addEventListener('click', toggleCaptchaCell);
            }

            document.getElementById('validate').onclick = () => {
                if (document.querySelectorAll('.captcha img.toggled').length != 5) {
                    index--;
                }
                continueGame();
            }
        }
    },
    {
        title: "3/5 : Tapez les mots qui s'affichent à l'écran",
        html: `
        <p id="typing">

        </p>
        `,
        setup: () => {
            const words = [
                "zyTh0",
                "àlc0oL",
                "b1èr€",
                ""
            ];

            let typingElem = document.getElementById('typing'),
                timerElem = document.getElementById('timer');

            shuffle(words);

            function typeLetter(e) {
                if (words[0][0] == e.key) words[0] = words[0].slice(1);
                if (words[0].length == 0) words.shift();

                if (words.length == 0) {
                    document.removeEventListener('keypress', typeLetter);
                    continueGame();
                }

                typingElem.innerHTML = words[0];
                console.log(words);
            }

            typingElem.innerHTML = words[0];

            document.addEventListener('keypress', typeLetter);
            eventListeners.push(['keypress', typeLetter]);
        }
    },
    {
        title: "3.14/5 : Pi",
        html: `
        <h2>Donnez l'approximation à la 15e décimale de pi, en ajoutant 1 au chiffre actuel tous les 3 chiffres, en commençant par le 2ème</h2>
        <div class="input-box">
            <input id="pi" placeholder="     = 3.24...">
            <label>π</label>
        </div>
        <button class="prettyButton" id="validate">Valider</button>
        `,
        setup: () => {
            const approx = "3.241692753689893"

            function checkPi(e) {
                if(document.getElementById('pi').value.trim() == approx) continueGame();
                else startGame();
            }

            document.getElementById('validate').onclick = checkPi;
        }
    },
    {
        title: "4/5 : Sélectionner les BDE réellement élus",
        html: `
        <div class="captcha" style="--w:3;"></div>
        <button id="validate" class="prettyButton">Valider</button>
        `,
        setup: () => {
            const bdes = ["olympisen", "monarchisen", 'scoobisen', 'jurisenpark', 'bitchisen', 'saucissen', "toystorisen", "surimisen", "nisendo"];
            const answers = ['olympisen', 'monarchisen', 'scoobisen', 'nisendo'];

            let captcha = document.querySelector('.captcha');

            shuffle(bdes);

            for (i of bdes) {
                let el = document.createElement('img');
                captcha.appendChild(el);
                el.setAttribute('src', `./images/bdes/${i}.jpg`);
                el.id = i;
                el.onclick = toggleCaptchaCell;
            }

            document.getElementById('validate').onclick = () => {
                let query = document.querySelectorAll('.captcha img.toggled');
                if(query.length != answers.length) return startGame();
                for(let img of query) {
                    let i = answers.indexOf(img.id);
                    if(i < 0) {
                        return startGame();
                    } else {
                        answers.splice(i, 1);
                    }
                }
                if(answers.length == 0) continueGame();
                else startGame();
            }
        }
    },
]

var gameFrame, part, timer, index;
var intervals = [], eventListeners = [];

function startGame() {
    index = -1;
    timer = 30;

    gameFrame = document.getElementById('gameFrame');
    part = document.getElementById('part');
    gameFrame.classList.add("visible");
    gameFrame = gameFrame.children[3];

    continueGame();

    let id = setInterval(() => {
        timer--;
        document.getElementById('timer').innerHTML = timer;
        if (timer > 0) return;

        gameFrame.innerHTML = `<h2>Veuillez être plus rapide</h2><button id="retry" class="prettyButton">Recommencer</button>`;
        clearInterval(id);

        cleanGame();

        document.getElementById('retry').addEventListener('click', startGame);
    }, 1000);
    document.getElementById('timer').innerHTML = timer;
}

function continueGame() {
    index++;
    let newGame = validations[index];
    console.log("Next game : ", newGame);
    cleanGame();
    part.innerHTML = newGame.title;
    gameFrame.innerHTML = newGame.html;
    newGame.setup();
}

function toggleCaptchaCell() {
    this.classList.contains('toggled') ? this.classList.remove('toggled') : this.classList.add('toggled');
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function cleanGame() {
    intervals.forEach(i => clearInterval(i));
    eventListeners.forEach(([ev, callback]) => document.removeEventListener(ev, callback));

    intervals = [];
    eventListeners = [];
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }