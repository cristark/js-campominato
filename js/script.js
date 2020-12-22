// | DESCRIZIONE
/* Il computer deve generare 16 numeri casuali tra 1 e 100.
I numeri non possono essere duplicati
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. */

// | BONUS: (da fare solo se funziona tutto il resto)
/* all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 =>  tra 1 e 80
con difficoltà 2 => tra 1 e 50 */

//Variabili principali
// Numeri di bombe presenti nel campo minato
var forbiddenNumb = 16;
// Variabili per determinare in maniera automatica "l'ampiezza" del campo minato
var minNumber = 1;
var maxNumber;
// Variabile da inserire manualmente per determinare la difficoltà della partita
var difficulty = prompt('Digita il livello di difficoltà: 0 - 1 - 2');
// Variabile contenente un coefficiente per determinare il punteggio ad ogni livello
var difficultyFactor = 1;

// | Creo lo switch per i livelli di difficoltà
switch (difficulty) {
    case '0':
        maxNumber = 100;
        break;
    case '1':
        maxNumber = 80;
        difficultyFactor = 2;
        break;
    case '2':
        maxNumber = 50;
        difficultyFactor = 5;
        break;
}

// Calcolo possibilità utente in base alla difficoltà della partita
var chances = maxNumber - forbiddenNumb;

console.log('Hai scelto la difficoltà: ' + difficulty);
console.log('Numeri proibiti: ' + forbiddenNumb);
console.log('NUmeri da ' + minNumber + ' a ' + maxNumber);
console.log('Hai ' + chances + ' possibilità!');

// | Faccio generare al computer 16 numeri casuali che non devono ripetersi
var bombs = [];

while (bombs.length < forbiddenNumb) {
    var bombsNumber = randomizer(minNumber, maxNumber);

    if (bombs.includes(bombsNumber) == false) {
        bombs.push(bombsNumber);
    }
}

console.log(bombs);

//Creo un contenitore di riferimento per semplificare selezioni sbagliate nel prompt successivo
var arrRif = numContainer(minNumber, maxNumber);

// | Creo prompt per utente dove inserirà i numeri per giocare
// Array contenente numeri inseriti dal giocatore
var userNumberArr = [];
// Variabile sentinella 
var sentinel = true;

while (userNumberArr.length < chances && sentinel) {
    var userNumber = parseInt(prompt('Inserisci un numero:'));

    if (arrRif.includes(userNumber) == false) {

        alert('ATTENZIONE! Numero non valido!');

    } else if (userNumberArr.includes(userNumber) == true) {

        alert('Il numero è stato già utilizzato! Riprova');

    } else if (bombs.includes(userNumber) == true) {

        sentinel = false;

    } else {

        userNumberArr.push(userNumber);
    }

}

// | Condizioni per determinare vittoria o sconfitta
if (userNumberArr.length == chances) {
    alert('COMPLIMENTI!! HAI VINTO!');
} else {
    alert("Hai colpito una mina!");
    alert('Il tuo punteggio è di: ' + (userNumberArr.length * difficultyFactor) + ' pt.');
    console.log("%cHai colpito una mina!", "color:red");
    console.log('Il tuo punteggio è di: ' + (userNumberArr.length * difficultyFactor) + ' pt.');
}

console.log(userNumberArr);

// - FUNZIONI
// Genera numeri random (min e max inclusi)
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function numContainer(min, max) {
    var arrContainer = [];
    for (var i= min; i <= max; i++) {
        arrContainer.push(i);
    }
    return arrContainer
}