
var imagenXSeleccionada = "img/x1.png"; // Imagen seleccionada para X
var imagenOSeleccionada = "img/o1.png"; // Imagen seleccionada para O
var turnoActual = "X";
var juegoTerminado = false;
var tiempoRestante = 180;
var timer;

// Selección de imagen para X u O
function seleccionarImagenes(tipo) {
    var imagenesX = ["img/x1.png", "img/x2.png", "img/x3.png"];
    var imagenesO = ["img/o1.png", "img/o2.png", "img/o3.png"];

    if (tipo === "X") {
        var seleccionX = document.getElementById("selectX").value;
        imagenXSeleccionada = imagenesX[seleccionX];
    } else if (tipo === "O") {
        var seleccionO = document.getElementById("selectO").value;
        imagenOSeleccionada = imagenesO[seleccionO];
    }

    // Actualizar botones ya seleccionados si cambian las imágenes
    const botones = document.querySelectorAll("input[type='button']");
    botones.forEach(boton => {
        if (boton.value === "X" && tipo === "X") {
            boton.style.backgroundImage = `url(${imagenXSeleccionada})`;
            boton.style.backgroundSize = "cover";
        } else if (boton.value === "O" && tipo === "O") {
            boton.style.backgroundImage = `url(${imagenOSeleccionada})`;
            boton.style.backgroundSize = "cover";
        }
    });
}

// Acción al hacer clic en una celda
function turno(boton) {
    if (juegoTerminado || boton.value !== "") return;

    if (turnoActual === "X") {
        boton.value = "X";
        boton.style.backgroundImage = `url(${imagenXSeleccionada})`;
    } else {
        boton.value = "O";
        boton.style.backgroundImage = `url(${imagenOSeleccionada})`;
    }

    boton.style.backgroundSize = "cover";

    verificarGanador();
    turnoActual = turnoActual === "X" ? "O" : "X";
}

// Verificar si hay un ganador
    function verificarGanador() {
        const tablero = document.getElementById("tablero");
        const celdas = tablero.getElementsByTagName("input");

        const combinaciones = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

    const colorLinea = document.getElementById("winColor").value;

    for (let combo of combinaciones) {
        const [a, b, c] = combo;
        if (
            celdas[a].value &&
            celdas[a].value === celdas[b].value &&
            celdas[b].value === celdas[c].value
        ) {
            // Dibujar línea ganadora (cambiar borde)
            [a, b, c].forEach(i => {
                celdas[i].style.border = `3px solid ${colorLinea}`;
            });
            juegoTerminado = true;
            clearInterval(timer);
            return;
        }
    }
}

// Temporizador
function iniciarTemporizador() {
    const display = document.getElementById('timer');
    timer = setInterval(() => {
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            juegoTerminado = true;
            alert('¡Tiempo agotado! Nadie ganó.');
        } else {
            tiempoRestante--;
            const min = String(Math.floor(tiempoRestante / 60)).padStart(2, '0');
            const seg = String(tiempoRestante % 60).padStart(2, '0');
            display.textContent = `${min}:${seg}`;
        }
    }, 1000);
}

// Fondo alternado tipo ajedrez
function cambiarColoresAlternados() {
    const colorAlternado = document.getElementById('bgColor').value; // Color para las celdas alternadas
    const colorBlanco = document.getElementById('bgAltColor').value; // Color para las celdas blancas
    const celdas = document.querySelectorAll("#tablero td");

    celdas.forEach((celda, index) => {
        if ((Math.floor(index / 3) + index % 3) % 2 === 0) {
            // Celdas alternadas
            celda.style.backgroundColor = colorAlternado;
        } else {
            // Celdas blancas
            celda.style.backgroundColor = colorBlanco;
        }
    });
}


// Reiniciar juego
function reiniciarJuego() {
    const botones = document.querySelectorAll("input[type='button']");
    const tablero = document.getElementById("tablero");
    const celdas = tablero.getElementsByTagName("input");

    // Reiniciar valores de las celdas
    botones.forEach(boton => {
        boton.value = "";
        boton.style.backgroundImage = "";
        boton.style.border = "1px solid black"; // Restablecer el borde de las celdas
    });

    // Reiniciar variables globales
    turnoActual = "X";
    juegoTerminado = false;
    clearInterval(timer);
    tiempoRestante = 180;

    // Reiniciar el temporizador
    const display = document.getElementById('timer');
    display.textContent = "03:00";
}


window.onload = () => {
    iniciarTemporizador();
    cambiarColoresAlternados();
};
// Asignar eventos a los botones de selección de imagen