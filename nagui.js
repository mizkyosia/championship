document.addEventListener('DOMContentLoaded', () => {
    const validations = [
        {
            title: "Étape 1/5",
            html: `
            <h3>En raison d'une cyberattaque récente, la sécurité informatique de l'école a dû être renforcée<br>Veuillez prouver que vous n'êtes pas un robot pour vous inscrire</h3>
            <div class="check-wrapper">
                <label class="check-box">
                    <input type="checkbox" name="accept" id="accept">
                    <svg viewBox="0 -5 64 64" class="accept">
                        <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938" class="path">
                        </path>
                    </svg>
                </label>
                <p>Je confirme ne pas être un robot</p>
            </div>
            <button class="prettyButton" id="continue">Continuer</button>`,
            setup: () => {
                document.getElementById('continue').onclick = () => {
                    if (document.getElementById('accept').checked) {
                        continueGame();
                    } else {
                        clearInterval(id);
                        document.getElementById('gameFrame').classList.remove('visible');
                    }
                }
            }
        },
        {
            title: "Étape 2/5 : Sélectionner les bières du zytho",
            html: `
            <div class="captcha" style="--w:4;">
            </div>
            <button id="validate" class="prettyButton">Valider</button>
            `,
            setup: () => {
                const beers = ["anosteke", "charrue", "corbeau", "draak", "grimbergen", "karmeliet", "kasteel", "leffe", "rince-cochon-rouge", "troll", "vedett", "kronembourg"];
                const answers = ["anosteke", "charrue", "corbeau", "draak", "karmeliet", "kasteel", "rince-cochon-rouge", "troll", "vedett"];
    
                let captcha = document.querySelector('.captcha');
    
                shuffle(beers);
    
                console.log(beers.length);
    
                for (i of beers) {
                    let el = document.createElement('img');
                    captcha.appendChild(el);
                    el.setAttribute('src', `./images/beers/${i}.png`);
                    el.id = i;
                    el.onclick = toggleCaptchaCell;
                }
    
                document.getElementById('validate').onclick = () => {
                    let query = document.querySelectorAll('.captcha img.toggled');
                    if (query.length != answers.length) return startGame();
                    for (let img of query) {
                        let i = answers.indexOf(img.id);
                        if (i < 0) {
                            return startGame();
                        } else {
                            answers.splice(i, 1);
                        }
                    }
                    if (answers.length == 0) continueGame();
                    else startGame();
                }
            }
        },
        {
            title: "Étape 3/5 : Tapez les mots qui s'affichent à l'écran",
            html: `
            <h2 id="word">Word goes here</h2>
            <div class="input-box">
                <input id="typing" placeholder=" ">
                <label>Type...</label>
            </div>
            `,
            setup: () => {
                const words = [
                    "zyTh0",
                    "àlc0oL",
                    "b1èr€",
                    "Bþe"
                ];
    
                let output = document.getElementById('word');
    
                shuffle(words);
    
                output.innerHTML = words[0];
    
                document.getElementById('typing').addEventListener('input', e => {
                    if (e.target.value == words[0]) {
                        words.shift();
                        output.innerHTML = words[0];
                        e.target.value = "";
                    }
                    if (words.length == 0) continueGame();
                });
            }
        },
        {
            title: "Étape 3.14/5 : Pi",
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
    
                function checkPi() {
                    if (document.getElementById('pi').value.trim() == approx) continueGame();
                    else startGame();
                }
    
                document.getElementById('validate').onclick = checkPi;
            }
        },
        {
            title: "Étape 4/5 : Sélectionner les BDE réellement élus",
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
                    if (query.length != answers.length) return startGame();
                    for (let img of query) {
                        let i = answers.indexOf(img.id);
                        if (i < 0) {
                            return startGame();
                        } else {
                            answers.splice(i, 1);
                        }
                    }
                    if (answers.length == 0) continueGame();
                    else startGame();
                }
            }
        },
        {
            title: "Étape nagui/5 : NAGUI",
            html: `
            <h1>NAGUI</h1>
            <img src="images/nagui-surprise.gif">
            <h3>Me when Nagui</h3>
            <button class="prettyButton" id="nagui">Nagui</button>
            `,
            setup: () => {
                document.getElementById('nagui').onclick = continueGame;
            }
        },
        {
            title: "Étape 5/5 : Tapez les lettres grecques qui s'affichent à l'écran",
            html: `
            <h3 id="count">0/10<h3>
            <h2 id="word">Word goes here</h2>
            <div class="input-box">
                <input id="typing" placeholder=" " value="a">
                <label>Type...</label>
            </div>
            `,
            setup: () => {
                const letters = "αβγδεζηθικλμνξοπρΣσςτυχΦφΨψΞΓΔΘΩω";
                var count = 0, letter = 'a';
    
                let output = document.getElementById('word'),
                    input = document.getElementById('typing');
    
                const fn = () => {
                    if(input.value == letter) {
                        letter = letters.charAt(Math.floor(Math.random() * letters.length));
                        input.value = '';
                        count += 1;
                        output.innerHTML = letter;
                        document.getElementById('count').innerHTML = count + '/10';
                    }
                    if (count > 1) continueGame();
                };
    
                document.getElementById('typing').addEventListener('input', fn);
    
                fn();
            }
        },
    ]
    
    var gameFrame, part, timer, index, id;
    
    function startGame() {
        index = -1;
        timer = 60;
    
        gameFrame = document.getElementById('gameFrame');
        part = document.getElementById('part');
        gameFrame.classList.add("visible");
        gameFrame = gameFrame.children[3];
        clearInterval(id);
    
        continueGame();
    
        id = setInterval(() => {
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
    
        if (index >= validations.length) {
            clearInterval(id);
            const ms = Date.now() - start,
                seconds = Math.floor(ms / 1000),
                minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60);
    
            var format = `${seconds % 60}:${ms % 1000}`;
    
            if (minutes > 0 || hours > 0) {
                var toAdd = (minutes % 60) + ':';
                if (hours > 0) {
                    toAdd = hours + ':' + toAdd.padStart(3, '0');
                }
                format = toAdd + format;
            }
    
            const evals = { 10: "🤨🤨🤨 on avait dit sans tricher", 20: "Speedrun any%", 40: "Pas mal", 50: "J'espère que t'es plus rapide aux partiels" };
            var ev = "Ne passera pas l'année";
    
            for (let val in evals) {
                if (seconds < val) {
                    ev = evals[val];
                    break;
                }
            }
    
            document.body.innerHTML = `<div id="endScreen">
                <h1>Inscription terminée</h1>
                <h2>Temps : <font color="white">${format}</font></h2>
                <h2>Evaluation finale :<br><font color="white">${ev}</font></h2>
                </div>
            `;
        } else {
            let newGame = validations[index];
            console.log("Next game : ", newGame);
            part.innerHTML = newGame.title;
            gameFrame.innerHTML = newGame.html;
            newGame.setup();
        }
    }
    
    function toggleCaptchaCell() {
        this.classList.contains('toggled') ? this.classList.remove('toggled') : this.classList.add('toggled');
    }
    
    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
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
    
    const moveRange = 150;
    const tpRange = 50;
    
    function distanceTo(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
    
    const start = Date.now();

    let auth = document.getElementById('auth');
    let rect = auth.getBoundingClientRect();

    auth.style.setProperty('left', rect.left + 'px');
    auth.style.setProperty('top', rect.top - 5 + 'px');

    auth.classList.remove('static');

    document.querySelector('form').onsubmit = e => {
        e.preventDefault();
        startGame();
    }

    console.log(Object.defineProperties(new Error, {
        toString: { value() { (new Error).stack.includes('toString@') && alert('Safari devtools') } },
        message: { get() {
            document.body.innerHTML = `<h1>Pas de triche :3</h1><h2>Ferme la console et reload la page pour t'inscrire</h2>`;
            console.clear();
        } },
    }));

    document.addEventListener('mousemove', e => {
        let rect = auth.getBoundingClientRect(),
            centerX = rect.x + rect.width / 2,
            centerY = rect.y + rect.height / 2,
            d = distanceTo(e.clientX, e.clientY, centerX, centerY),
            newX = centerX, newY = centerY;
        if (d < tpRange) {
            newX = Math.random() * (window.innerWidth - rect.width);
            newY = Math.random() * (window.innerHeight - rect.height);
        } else if (d < moveRange) {
            let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            newX = Math.min(Math.max(e.clientX - moveRange * Math.cos(angle) - rect.width / 2, 0), window.innerWidth - rect.width);
            newY = Math.min(Math.max(e.clientY - moveRange * Math.sin(angle) - rect.height / 2, 0), window.innerHeight - rect.height);
        } else return;

        auth.style.setProperty('left', newX + 'px');
        auth.style.setProperty('top', newY + 'px');
    });
});