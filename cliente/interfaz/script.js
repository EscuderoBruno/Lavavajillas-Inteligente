
 var electro = new Electro();

// JavaScript code

var idiomaSeleccionado = "";
var temperaturaSeleccionada = "20";
var tiempoSeleccionado = "20";

var volumen = "80";
var volumenGuardado = localStorage.getItem("volumen");

var brillo = "100";
var brilloGuardado = localStorage.getItem("brillo");

var t_prelavado = "20";
var t_prelavadoGuardado = localStorage.getItem("t_prelavado");

var cont = 0;

// Función para cambiar el color de fondo del div de idioma seleccionado 
function seleccionarIdioma(idioma) {
    // deseleccionar el div de idioma anterior (si lo hay)
    if (idiomaSeleccionado !== "" && idiomaSeleccionado != null) {
      document.getElementById(idiomaSeleccionado).style.color = "";
    }
    // seleccionar el div de idioma actual
    document.getElementById(idioma).style.color = "#FE6636";
    // guardar el idioma seleccionado
    idiomaSeleccionado = idioma;
}

// Función para realizar alguna acción con el idioma seleccionado
function aplicarIdioma() {
	// hacer algo con el idioma seleccionado (por ejemplo, redirigir a una página en el idioma seleccionado)
	if (idiomaSeleccionado == "espanol") {
  		window.location.href = "../index.html";
	} else if (idiomaSeleccionado !== "") {
  		window.location.href = "../idiomas/index_" + idiomaSeleccionado + ".html";
	}
}


// Funciones para seleccionar la temperatura deseada en el programa personalizado
function seleccionarTemperatura(temp) {

	// deseleccionar el div de idioma anterior (si lo hay)
    if (temperaturaSeleccionada !== "" && temperaturaSeleccionada != null) {
      document.getElementById(temperaturaSeleccionada).style.color = "";
    }
    // seleccionar el div de idioma actual
    document.getElementById(temp).style.color = "#FE6636";
    // guardar el idioma seleccionado
    console.log(temperaturaSeleccionada);
    temperaturaSeleccionada = temp;
    localStorage.setItem("temperatura", temperaturaSeleccionada);
}

function aplicarTemperatura() {

	window.location.href = "personalizado.html";
}

// Funciones para seleccionar el tiempo deseada en el programa personalizado
function seleccionarTiempo(tiempo) {

	// deseleccionar el div de idioma anterior (si lo hay)
    if (tiempoSeleccionado !== "" && tiempoSeleccionado != null) {
      document.getElementById(tiempoSeleccionado).style.color = "";
    }
    // seleccionar el div de idioma actual
    document.getElementById(tiempo).style.color = "#FE6636";
    // guardar el idioma seleccionado
    console.log(tiempoSeleccionado);
    tiempoSeleccionado = tiempo;
    localStorage.setItem("tiempo", tiempoSeleccionado);
}

function aplicarTiempo() {

	window.location.href = "personalizado.html";
}


// Obtén una referencia al botón
var boton = document.getElementById("flotante_iniciado2");

// Agrega el controlador de eventos
boton.addEventListener("click", function() {
    parar();
});

function parar() {

    electro.resistencia = false;
    electro.aperturaDetergente = false;
    electro.aperturaAbrillandador = false;
    electro.motor = false;
    electro.tomaAgua = false;
    electro.desague = true;
}


// Función para mostrar la hora y demás información por pantalla
function showInfo() {

	myDate = new Date();
	hours = myDate.getHours();
	minutes = myDate.getMinutes();
	seconds = myDate.getSeconds();
	wifi = "";
	presencia = "";

	if (hours < 10) hours = 0 + hours;

	if (minutes < 10) minutes = "0" + minutes;

	if (localStorage.getItem("wifi") == "true") {

		wifi="📶 ";
	} else {

		wifi=" ";
	}

	if (electro.presencia) {

		presencia="🚹";
	}

	txt = document.getElementById("horaActual");
 
	txt.innerHTML =  presencia+wifi+hours+ ":" +minutes;

	if (location.pathname.includes("hora.html") || location.pathname.includes("hora2.html")) {

		txt2 = document.getElementById("hora");
	 
		txt2.innerHTML =  hours+ ":" +minutes;

	}

	if (location.pathname.includes("analisis.html")) {
	// Analisis

		puertaabierta = electro.puertaAbierta;
		nivelagua = electro.nivelAgua;
		temperatura = electro.temperatura;
		consumo = electro.consumo;
		presenciab = electro.presencia;
		clientes = electro.clientes;

		txt = document.getElementById("puertaabierta");
		if (puertaabierta) {
			txt.innerHTML =  "Verdadero";
		} else {
			txt.innerHTML =  "Falso";
		}

		txt2 = document.getElementById("nivelagua");
		txt2.innerHTML =  nivelagua + " L";

		txt3 = document.getElementById("temperatura");
		txt3.innerHTML =  temperatura + " ºC";

		txt4 = document.getElementById("consumo");
		txt4.innerHTML =  consumo + " kW";

		txt5 = document.getElementById("presenciab");
		if (presencia) {
			txt5.innerHTML =  "Verdadero";
		} else {
			txt5.innerHTML =  "Falso";
		}

		txt6 = document.getElementById("clientes");
		txt6.innerHTML =  clientes;
	}

	// Programa Personalizado
	if (location.pathname.includes("personalizado.html")) {

		txt7 = document.getElementById("temperatura");	
		txt8 = document.getElementById("tiempo");
		txt9 = document.getElementById("contador");	  	  
		var temperaturaGuardada = localStorage.getItem("temperatura");
		var tiempoGuardado = localStorage.getItem("tiempo");

		if (temperaturaGuardada == null) {

			temperaturaGuardada = "20";
		} else if (tiempoGuardado == null) {

			tiempoGuardado = "20";
		}

		txt7.innerHTML =  temperaturaGuardada + " ºC";
		txt8.innerHTML =  tiempoGuardado + " min";
		//txt9.innerHTML =  tiempoGuardado + ":00";
	}

	// Internet

	if (location.pathname.includes("internet.html")) {

		txt10 = document.getElementById("internet");	

		if (localStorage.getItem("wifi") == "true") {

			txt10.innerHTML =  "Desactivar";
		} else {

			txt10.innerHTML = "Activar";
		}
	}

	// Boton Favorito

	if (location.pathname.includes("prelavado.html")) {

		txt11 = document.getElementById("flotante3");
		var linkElement = document.getElementById('flotante_volver');	

		if (localStorage.getItem("prelavado") == "false") {

			txt11.innerHTML =  '<span style="font-size: 35px;">☆ </span> Añadir';
		} else {

			txt11.innerHTML = '<span style="font-size: 35px;">★ </span> Favoritos';		
		}

		if (localStorage.getItem("favoritos") == "true") {

			linkElement.href = "../favoritos.html";
			localStorage.setItem("favoritos", "false");
		}
	}

	if (location.pathname.includes("eco.html")) {

		txt11 = document.getElementById("flotante3");
		var linkElement = document.getElementById('flotante_volver');	

		if (localStorage.getItem("eco") == "false") {

			txt11.innerHTML =  '<span style="font-size: 35px;">☆ </span> Añadir';
		} else {

			txt11.innerHTML = '<span style="font-size: 35px;">★ </span> Favoritos';		
		}

		if (localStorage.getItem("favoritos") == "true") {

			linkElement.href = "../favoritos.html";
			localStorage.setItem("favoritos", "false");
		} 
	}

	if (location.pathname.includes("auto.html")) {

		txt11 = document.getElementById("flotante3");
		var linkElement = document.getElementById('flotante_volver');	

		if (localStorage.getItem("auto") == "false") {

			txt11.innerHTML =  '<span style="font-size: 35px;">☆ </span> Añadir';
		} else {

			txt11.innerHTML = '<span style="font-size: 35px;">★ </span> Favoritos';		
		}

		if (localStorage.getItem("favoritos") == "true") {

			linkElement.href = "../favoritos.html";
			localStorage.setItem("favoritos", "false");
		} 
	}

	if (location.pathname.includes("intensivo.html")) {

		txt11 = document.getElementById("flotante3");
		var linkElement = document.getElementById('flotante_volver');	

		if (localStorage.getItem("intensivo") == "false") {

			txt11.innerHTML =  '<span style="font-size: 35px;">☆ </span> Añadir';
		} else {

			txt11.innerHTML = '<span style="font-size: 35px;">★ </span> Favoritos';	
		}

		if (localStorage.getItem("favoritos") == "true") {

			linkElement.href = "../favoritos.html";
			localStorage.setItem("favoritos", "false");
		}
	}

	if (location.pathname.includes("rapido.html")) {

		txt11 = document.getElementById("flotante3");
		var linkElement = document.getElementById('flotante_volver');	

		if (localStorage.getItem("rapido") == "false") {

			txt11.innerHTML =  '<span style="font-size: 35px;">☆ </span> Añadir';
		} else {

			txt11.innerHTML = '<span style="font-size: 35px;">★ </span> Favoritos';		
		}

		if (localStorage.getItem("favoritos") == "true") {

			linkElement.href = "../favoritos.html";
			localStorage.setItem("favoritos", "false");
		}
	}

	// Brillo Y Volumen

	var b = localStorage.getItem("brillo");
	var v = localStorage.getItem("volumen");
	document.body.style.filter = "brightness(" + (b / 100) + ")";

	if (location.pathname.includes("brillo.html")) { document.getElementById("brillo-range").setAttribute("value", b); }

	if (location.pathname.includes("volumen.html")) { document.getElementById("volume-range").setAttribute("value", v); }

	// Favoritos

	if (location.pathname.includes("favoritos.html")) {

		var num = getTotal();
		var elemento  = document.getElementById('favoritos');

		if (num == 0) {

			elemento.classList.add("scroll-items_favoritos0");

		} else if (num == 1) {

			elemento.classList.add("scroll-items_favoritos1");

		} else if (num == 2) {

			elemento.classList.add("scroll-items_favoritos2");

		} else if (num == 3) {

			elemento.classList.add("scroll-items_favoritos3");

		} else if (num == 4) {

			elemento.classList.add("scroll-items_favoritos4");

		} else if (num == 5) {

			elemento.classList.add("scroll-items_home");
		}

		//console.log(num);

		// Prelavado
		if (localStorage.getItem("prelavado") == "true") {

		var existingItems = document.querySelectorAll('.item2');
		// Verificar si el fragmento ya está presente
		var isFragmentPresent = Array.from(existingItems).some(function(item) {
		  return item.querySelector('a').getAttribute('href') === 'programas/prelavado.html';
		});

		// Insertar el fragmento solo si no está presente
			if (!isFragmentPresent) {
			  document.getElementById("favoritos").innerHTML += `
			    <div class="item2">
			    	<figure>
					  <a href="programas/prelavado.html" onclick="desdeFavoritos()"><img width="200x" src="resources/Prelavado.png" alt="Descripción de la imagen"></a>
					  <figcaption><div class="subtitulos">Prelavado<div></figcaption>
					</figure>
			    </div>
			  `;
			}
		}

		// Eco
		if (localStorage.getItem("eco") == "true") {

		var existingItems = document.querySelectorAll('.item2');
		// Verificar si el fragmento ya está presente
		var isFragmentPresent = Array.from(existingItems).some(function(item) {
		  return item.querySelector('a').getAttribute('href') === 'programas/eco.html';
		});

		// Insertar el fragmento solo si no está presente
			if (!isFragmentPresent) {
			  document.getElementById("favoritos").innerHTML += `
			    <div class="item2">
			      <figure>
			        <a href="programas/eco.html" onclick="desdeFavoritos()"><img width="220px" src="resources/Eco.png" alt="Programa Eco"></a>
			        <figcaption><div class="subtitulos">Eco</div></figcaption>
			      </figure>
			    </div>
			  `;
			}
		}

		// Auto
		if (localStorage.getItem("auto") == "true") {

		var existingItems = document.querySelectorAll('.item2');
		// Verificar si el fragmento ya está presente
		var isFragmentPresent = Array.from(existingItems).some(function(item) {
		  return item.querySelector('a').getAttribute('href') === 'programas/auto.html';
		});

		// Insertar el fragmento solo si no está presente
			if (!isFragmentPresent) {
			  document.getElementById("favoritos").innerHTML += `
			    <div class="item2">
			    	<figure>
					  <a href="programas/auto.html" onclick="desdeFavoritos()"><img width="240px" src="resources/Auto.png" alt="Descripción de la imagen"></a>
					  <figcaption><div class="subtitulos">Auto<div></figcaption>
					</figure>
			    </div>
			  `;
			}
		}

		// Intensivo
		if (localStorage.getItem("intensivo") == "true") {

		var existingItems = document.querySelectorAll('.item2');
		// Verificar si el fragmento ya está presente
		var isFragmentPresent = Array.from(existingItems).some(function(item) {
		  return item.querySelector('a').getAttribute('href') === 'programas/intensivo.html';
		});

		// Insertar el fragmento solo si no está presente
			if (!isFragmentPresent) {
			  document.getElementById("favoritos").innerHTML += `
			    <div class="item2">
			    	<figure>
					  <a href="programas/intensivo.html" onclick="desdeFavoritos()"><img width="220px" src="resources/Intensivo.png" alt="Descripción de la imagen"></a>
					  <figcaption><div class="subtitulos">Intensivo<div></figcaption>
					</figure>
			    </div>
			  `;
			}
		}

		// Rapido
		if (localStorage.getItem("rapido") == "true") {

		var existingItems = document.querySelectorAll('.item2');
		// Verificar si el fragmento ya está presente
		var isFragmentPresent = Array.from(existingItems).some(function(item) {
		  return item.querySelector('a').getAttribute('href') === 'programas/rapido.html';
		});

		// Insertar el fragmento solo si no está presente
			if (!isFragmentPresent) {
			  document.getElementById("favoritos").innerHTML += `
			    <div class="item2">
			    	<figure>
					  <a href="programas/rapido.html" onclick="desdeFavoritos()"><img width="175px" src="resources/Rapido.png" alt="Descripción de la imagen"></a>
					  <figcaption><div class="subtitulos">Rápido<div></figcaption>
					</figure>
			    </div>
			  `;
			}
		}
	}

	setTimeout("showInfo()",1000);
}

// Gestionar volumen y brillo del dispositivo

function aplicarVolumen() {
  	volumen = document.getElementById("volume-range").value;
  	localStorage.setItem("volumen", volumen);
  	// Aquí puedes aplicar el volumen a tu lavavajillas o hacer cualquier otra cosa que desees.
};

function aplicarbrillo() {
  	brillo = document.getElementById("brillo-range").value;
  	document.body.style.filter = "brightness(" + (brillo / 100) + ")";
  	localStorage.setItem("brillo", brillo);
}

function activarWifi() {

	if (localStorage.getItem("wifi") == "true") {

		localStorage.setItem("wifi", "false");
	} else {

		localStorage.setItem("wifi", "true");
	}
}

function favoritos_prelavado() {

	if (localStorage.getItem("prelavado") == "true") {

		localStorage.setItem("prelavado", "false");
	} else {

		localStorage.setItem("prelavado", "true");
	}
}

function favoritos_eco() {

	if (localStorage.getItem("eco") == "true") {

		localStorage.setItem("eco", "false");

	} else {

		localStorage.setItem("eco", "true");
	}
}

function favoritos_auto() {

	if (localStorage.getItem("auto") == "true") {

		localStorage.setItem("auto", "false");

	} else {

		localStorage.setItem("auto", "true");
	}
}

function favoritos_intensivo() {

	if (localStorage.getItem("intensivo") == "true") {

		localStorage.setItem("intensivo", "false");

	} else {

		localStorage.setItem("intensivo", "true");
	}
}

function favoritos_rapido() {

	if (localStorage.getItem("rapido") == "true") {

		localStorage.setItem("rapido", "false");

	} else {

		localStorage.setItem("rapido", "true");
	}
}

function getTotal() {

	var total = 0;

	if (localStorage.getItem("eco") == "true") {

		total++;
	} 

	if (localStorage.getItem("prelavado") == "true") {

		total++;
	}

	if (localStorage.getItem("auto") == "true") {

		total++;
	}

	if (localStorage.getItem("intensivo") == "true") {

		total++;
	}

	if (localStorage.getItem("rapido") == "true") {

		total++;
	}

	return total;
}

function desdeFavoritos() {

	localStorage.setItem("favoritos", true);
}



// Me he quedado con los favoritos, falta añadir funciones para el resto y ajustar el estilo dependiendo de cuantos programas haya en favoritos
