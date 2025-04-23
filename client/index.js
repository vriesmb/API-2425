import './index.css';
import '../server/views/index.js';

console.log('Hello, world!');

const gameIdGenres = document.querySelector('[data-genre-ids]').getAttribute('data-genre-ids').split(',') // haalt de data genre ids op van de html en split het in een array
console.log("gameIdGenres", gameIdGenres); // log de genres


let count = -1 // beginpuntt en teller voor de genres
const genreRotation = document.querySelector('#genre_item') // tekst element voor de genres
const rotateGenre = () => {
    if (!document.startViewTransition) { // fallback voor browsers zonder een view Transitions suppport
        console.log("ROTATE - No view transition support, using fallback.");
        genreRotation.innerText = gameIdGenres[(count += 1) % gameIdGenres.length] // verandert de tekst nooit meer dan lengte van de array en elke x 1 omhoog
    } else { // Als de browser View transitions support..
        document.startViewTransition(() => { // start de view transition
            console.log("ROTATE - View transition support, using view transition.");
            genreRotation.innerText = gameIdGenres[(count += 1) % gameIdGenres.length]  // verandert de tekst
        })
    }
}

rotateGenre(); // direct uitvoeren bij de eerste run - zonder deze wacht hij 4sec
setInterval(rotateGenre, 4000); // Interval tussen de verandering van genre tekst items

