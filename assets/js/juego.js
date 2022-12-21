/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']
let puntosJugador = 0,
  puntosComputadora = 0;
// Referencias del html
const btnPedir = document.querySelector("#btnPedir")
const divCartasJugador =  document.querySelector("#jugador-cartas")
const puntosHTML = document.querySelectorAll("small")


// Esta función crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    for (const especial of especiales) {
      deck.push(especial + tipo);

    }
  }

  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);

}

crearDeck();

// Esta función me permite tomar una carta
const perdirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const carta = deck.pop();
  return carta;
}


const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return (isNaN(valor)) ?
    (valor === 'A') ? 11 : 10
    : valor * 1;
}
const valor = valorCarta(perdirCarta());

// Eventos

btnPedir.addEventListener('click', () => {
  const carta = perdirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  console.log(puntosJugador);
  puntosHTML[0].innerText = puntosJugador;
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  if ( puntosJugador > 21 ) {
    console.warn("Perdiste")
    btnPedir.disabled = true;
  } else if ( puntosJugador === 21 ) {
    console.warn("21");
    btnPedir.disabled = true;
  }
});