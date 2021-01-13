import { useState } from "react";

function App() {
  const anchoAltoCelda = 100;
  let casillas = [];
  for (let x = 1; x <= 3; x++) {
    for (let y = 1; y <= 3; y++) {
      casillas.push({
        x,
        y
      });
    }
  }
  const [rotacion, setRotacion] = useState(0);
  const [posicionActual, setPosicionActual] = useState({ x: 1, y: 1 });
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const moverACasilla = casilla => {
    girarPizza();
    setPosicionActual(casilla);
  };
  const estaFuera = casilla => casilla.x < 1 || casilla.x > 3 || casilla.y < 1 || casilla.y > 3;
  const moverPizzaArriba = () => {
    const nuevaCasilla = { ...posicionActual, x: posicionActual.x - 1 };
    if (estaFuera(nuevaCasilla)) {
      return;
    }
    girarPizza();
    setPosicionActual(nuevaCasilla);
  };
  const muestraAviso = () => {
    setMostrarAviso(true);
    setTimeout(() => {
      setMostrarAviso(false);
    }, 2000);
  };
  const moverPizzaAbajo = () => {
    const nuevaCasilla = { ...posicionActual, x: posicionActual.x + 1 };
    if (estaFuera(nuevaCasilla)) {
      muestraAviso();
      return;
    }
    girarPizza();
    setPosicionActual(nuevaCasilla);
  };
  const moverPizzaDerecha = () => {
    const nuevaCasilla = { ...posicionActual, y: posicionActual.y + 1 };
    if (estaFuera(nuevaCasilla)) {
      muestraAviso();
      return;
    }
    girarPizza();
    setPosicionActual(nuevaCasilla);
  };
  const moverPizzaIzquierda = () => {
    const nuevaCasilla = { ...posicionActual, y: posicionActual.y - 1 };
    if (estaFuera(nuevaCasilla)) {
      muestraAviso();
      return;
    }
    girarPizza();
    setPosicionActual(nuevaCasilla);
  };
  const girarPizza = () => {
    setRotacion((rotacion + 1) % 4);
  };

  return (
    <>
      <div className={`aviso${mostrarAviso ? " on" : ""}`}>¡Eh, que te sales!</div>
      <ul className="controles">
        <li onClick={moverPizzaArriba}>⬆</li>
        <li onClick={moverPizzaAbajo}>⬇</li>
        <li onClick={moverPizzaIzquierda}>⬅</li>
        <li onClick={moverPizzaDerecha}>➡</li>
      </ul>
      <div className="info">
        Casilla: {posicionActual.x}, {posicionActual.y}
      </div>
      <div className="tablero-contenedor">
        <ul className="tablero">
          {
            casillas.map(casilla =>
              <li
                onClick={() => moverACasilla({ x: casilla.x, y: casilla.y })}
                key={`${casilla.x}-${casilla.y}`}
              ></li>
            )
          }
        </ul>
        <div className={`ficha rotacion${rotacion}`} style={{
          top: posicionActual.x * anchoAltoCelda - (anchoAltoCelda / 2),
          left: posicionActual.y * anchoAltoCelda - (anchoAltoCelda / 2)
        }}>🍕</div>
      </div>
    </>
  );
}

export default App;
