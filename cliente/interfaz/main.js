 // ------------------------------ EMULADOR ------------------------------ //

 var electro = new Electro();

// Poner el nivel del agua a un objetivo. Cuando lo consigue llama a la función callback
function nivelAgua(objetivo, callback) {
    if (electro.nivelAgua <= objetivo) {
        console.log("Llenar de agua hasta el nivel:", objetivo);
        electro.tomaAgua = true;
        mostrar3();
    }
    else {
        console.log("Vaciar de agua hasta el nivel:", objetivo);
        electro.desague = true;
    }
    function agua(nivel) {
        if (nivel == objetivo) { // esperar a que sea el objetivo
            console.log("Nivel de agua conseguido");
            ocultar3()
            electro.off("nivelAgua", agua);
            electro.tomaAgua = false;
            electro.desague = false;
            callback();
        }
    }
    electro.on("nivelAgua", agua);
}

electro.on("connect", function () { // Esparar a que la librería se conecte con el electrodoméstico

    console.log("Ya estoy conectado con la electrodoméstico!!")
    console.log("Con este hay " + electro.clientes + " clientes conectados");

    // Actualizar el reloj
    electro.on("reloj", function (hora) {
        //document.getElementById("hora").innerHTML = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    });

    if (location.pathname.includes("auto.html") || location.pathname.includes("eco.html") || location.pathname.includes("intensivo.html") 
    || location.pathname.includes("prelavado.html") || location.pathname.includes("rapido.html") || location.pathname.includes("personalizado.html")) {

        // Con la presencia del usuario muestro los controles de cocinado
        electro.on("presencia", function (presente) {
            if (presente) {
                document.getElementById("controles").style.display = "block";
            } else {
                document.getElementById("controles").style.display = "none";
            }
        });

        // Obtengo referencia a controles

        var lavar = document.getElementById("lavar");
        var parar = document.getElementById("flotante_iniciado2");
        var tiempo = document.getElementById("tiempo");
        var temperatura = document.getElementById("temperatura");
        let separar = temperatura.textContent.split(" ");
        var temperatura_value = parseInt(separar[0]);
        let separar2 = tiempo.textContent.split(" ");
        var tiempo_value = parseInt(separar2[0]);

        if (location.pathname.includes("personalizado.html")) {

            var temperatura_value = localStorage.getItem("temperatura");
            var tiempo_value = localStorage.getItem("tiempo");
        }

        // Solo lavo si está la puerta cerrada
        electro.on("puertaAbierta", function (abierta) {
            lavar.disabled = abierta;
        });

        // Lavar
        lavar.addEventListener("click", function () {
            console.log("Comienzo a lavar. Tiempo:", tiempo_value, "Temperatura:", temperatura_value);
            // Bloquear controles
            lavar.disabled = true;
            tiempo.disabled = true;
            temperatura.disabled = true;
            // Cambiar imagen
            ocultar();

            // Lleno el agua al 100%
            nivelAgua(100, function () {
                electro.aperturaDetergente = true;
                console.log("Abro el detergente y espero 1 seg");
                setTimeout(function () {
                    console.log("Cierro el detergente");
                    electro.aperturaDetergente = false;
                    // Calentar el agua
                    electro.resistencia = true;
                    function temp(t) { // funcion termostato
                        if (t > temperatura_value) {
                            electro.resistencia = false;
                        }
                        else {
                            electro.resistencia = true;
                        }
                    }
                    electro.on("temperatura", temp);
                    // Esperar el tiempo de lavado
                    console.log("Empiezo a lavar");
                    electro.motor = true;
                    playMusic();
                    mostrar2();

                    setTimeout(function () {
                        console.log("Fin de lavado");
                        electro.off("temperatura", temp); // quito el termostato
                        electro.motor = false;
                        electro.resistencia = false;
                        nivelAgua(0, function () {
                            // NO está implementado pero habría que hacer el abrillantado (llenando otra vez de agua y abriendo la puerta del abrillantador)
                            lavar.disabled = false;
                            tiempo.disabled = false;
                            temperatura.disabled = false;
                        });
                    }, tiempo_value * 1000000);

                    let tiempoRestante = tiempo_value*60; // 30 minutos en segundos
                    let contador = document.getElementById("contador");

                    let intervalo = setInterval(() => {
                      let minutos = Math.floor(tiempoRestante / 60);
                      let segundos = tiempoRestante % 60;
                      contador.innerHTML = `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
                      if (tiempoRestante === 0) {
                        clearInterval(intervalo);
                        //alert("¡Tiempo agotado!");
                        ocultar2();
                        ocultar3();
                        mostrar4();
                      } else {
                        tiempoRestante--;
                      }
                    }, 1000);
                }, 1000);
            });
        });
    }
});

function mostrar() {
    document.getElementById("flotante").style.display = "block";
    document.getElementById("flotante2").style.display = "block";
    document.getElementById("flotante3").style.display = "block";
    document.getElementById("lavar").style.display = "block";
    document.getElementById("flotante_volver").style.display = "block";
}

function ocultar() {
    document.getElementById("flotante").style.display = "none";
    document.getElementById("flotante2").style.display = "none";
    document.getElementById("flotante3").style.display = "none";
    document.getElementById("lavar").style.display = "none";
    document.getElementById("flotante_volver").style.display = "none";
}

function mostrar2() {
    document.getElementById("flotante_iniciado").style.display = "block";
    document.getElementById("flotante_iniciado2").style.display = "block";

}

function ocultar2() {
    document.getElementById("flotante_iniciado").style.display = "none";
    document.getElementById("flotante_iniciado2").style.display = "none";
}

function mostrar3() {
    document.getElementById("flotante_llenando").style.display = "block";
    electro.desague = false;
}

function ocultar3() {
    document.getElementById("flotante_llenando").style.display = "none";
}

function mostrar4() {
    document.getElementById("flotante_finalizado").style.display = "block";
}

function ocultar4() {
    document.getElementById("flotante_finzalidado").style.display = "none";
}

function reproducir() {
    var audio = new Audio('resources/inicio.mp4');
    audio.play();
}

function playMusic() {
    var v = localStorage.getItem("volumen");
    var audio = new Audio('../resources/lavadora.mp3');
    audio.volume = v/100;
    audio.play();
    audio.addEventListener("ended", function() {
        audio.currentTime = 0;
        audio.play();
    });
}
