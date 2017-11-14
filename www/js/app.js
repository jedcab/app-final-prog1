//////////////  GUARDAR LOS USUARIOS    //////////////////////
var Store = {
    load: function(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    save: function(key,obj){
        window.localStorage.setItem(key, JSON.stringify(obj)); //el stringify es para cuando lo voy a guardar
    },
    dele: function(key){
        window.localStorage.removeItem(key);
    },
    kill: function(){ //borra a cero el localStorage de mi aplicacion
        window.localStorage.clear();
    },
	search: function(what){ //search devuelve todos los key cuyos value contengan los que estan buscando.
		var matches=[];
		for(var i=0; i<window.localStorage.length;i++){ //recorrer todo el localStorage
			var keyName = window.localStorage.key(i); //guardar el nombre de todos los keys
			var val = window.localStorage.getItem(keyName); //guarda los valores
			if(val.indexOf(what) !== -1){ //si el valor de la variable "var" es igual a lo que se esta buscando, se guarda el keyName de ese valor en el array
				matches.push(keyName);
			}
		}
		return matches;
	}
};

//  REGISTRO DE JUGADORES
function guardarDatos(){
    //  JUGADOR #1
    var nombre1=$("#nombre1").val();
    var user1=$("#user1").val();
    
    Store.save("nombreJ1",nombre1);
    Store.save("usuario1",user1);
    
    //  JUGADOR #2
    var nombre2=$("#nombre2").val();
    var user2=$("#user2").val();  
    
    Store.save("nombreJ2",nombre2);
    Store.save("usuario2",user2);
    
    window.location="home.html";
    /*Storage.setItem("puntajej1",0);
    Storage.setItem("puntajej2",0);*/
};

//  DATOS DE LOS JUGADORES
var nameP1;
var nickP1;
var photoP1;
var puntajeP1;
var historialP1;

var nameP2;
var nickP2;
var photoP2;
var puntajeP2;
var historialP2;

function cargarDatos(){
    
    //  CARGA DE DATOS
    nameP1=Store.load("nombreJ1");
    nickP1=Store.load("usuario1");
    photoP1=Store.load("avatar1");
    puntajeP1=Store.load("historialP1");
    
    nameP2=Store.load("nombreJ2");
    nickP2=Store.load("usuario2");
    photoP2=Store.load("avatar2");
    puntajeP2=Store.load("historialP2");
    
    //  MOSTRAR DATOS
    $("#userNameP1").html(nameP1);
    $("#userNickP1").html(nickP1);
    //$("datosjugadores #puntaje1").html('Puntaje: '+ puntajeP1);
    $("#foto1 img").attr("src",photoP1);
    
    $("#userNameP2").html(nameP2);
    $("#userNickP2").html(nickP2);
	//$("#datosjugadores #puntaje2").html('Puntaje: '+ puntajeP2);
    $("#foto2 img").attr("src",photoP2);
    
    console.log(Store.load("nombreJ1"), Store.load("usuario1"), Store.load("nombreJ2"), Store.load("usuario2"), Store.load("historialP1"), Store.load("historialP2"));
};



//  VALIDAR LA TOTALIDAD DE LOS DATOS DE LOS USUARIOS
function validacion(){
    if(nameP1 ==="" || nickP1 ==="" || nameP2 ==="" || nickP2 ==="" || photoP1 ===null || photoP2 ===null){
        alert("Faltan datos por ingresar, registrese nuevamente.");
        window.location="registro.html";
    }else{
        window.location="home.html";
    }
};

//////////////  CAMARA  //////////////
var pictureSource;  
var destinationType; 
var smallImage;

    document.addEventListener("deviceready",onDeviceReady,false);
    //  No se puede acceder al hardware si el dispositivo no esta listo.
    //  El false es para que no propague el evento.

    function onDeviceReady() { // Setea el hardware.
      pictureSource = navigator.camera.PictureSourceType;   // Indica de donde quiero sacar la foto.
      destinationType = navigator.camera.DestinationType; // Indica de donde quiero guardar la foto.
        };

    function asignarFoto(a){
            idjugador = a;
        };

    //  Cuando puedo sacar la foto, van a estar coficados como data URL.
    function onPhotoDataSuccess(imageData) {
        //alert(imageData);
        smallImage = document.getElementById('photo-player-'+idjugador);
        smallImage.style.display = 'block';
        smallImage.src = "data:image/jpeg;base64," + imageData;
        Store.save("avatar"+idjugador, "data:image/jpeg;base64," + imageData);
        };

    //  Llama cuando quiero sacar la foto.
    function capturePhoto() {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL }); // Los guarda y los codifica como una data URL.
        };
    
    // Mensaje por si no pudo sacar la foto.
    function onFail(message) {
      alert('Ha ocurrido un error: ' + message);
    };