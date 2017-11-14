var jugador = 1;
var tablero = [["","",""],["","",""],["","",""]];
var turno;
var reiniciarMarcador = $("#marcador").html();
var reiniciarTitulo = $("#indicador").html();

// ANTES DE COMENZAR HAY QUE COMPROBAR SI EL ARRAY EFECTIVAMENTE ESTA VACIO
function celdas(tr,td){
	if($("table tr:nth-of-type("+ (tr+1) +") td:nth-of-type("+ (td+1) +")").html() == "" && $("table").hasClass("disponible")){
		
		//VISUALIZACION DEL JUGADOR AL CUAL LE CORRESPONDE EL TURNO
		if(jugador == 1)  {
			turno="x";
            $("#player1").removeClass("enJuego");
			$("#player2").addClass("enJuego");
		}
		else{
			turno="o";
            $("#player2").removeClass("enJuego");
			$("#player1").addClass("enJuego");
		}
		
		//EMPAREJO LA TABLA CON LAS CELDAS AL COMPLETARLAS
		tablero[tr][td] = turno;
		$("table tr:nth-of-type("+ (tr+1) +") td:nth-of-type("+ (td+1) +")").html(turno);
		
        //COMBINACIONES POSIBLES
		if( turno === tablero[0][0] && turno === tablero[0][1] && turno === tablero[0][2] ||
            turno === tablero[1][0] && turno === tablero[1][1] && turno === tablero[1][2] ||
            turno === tablero[2][0] && turno === tablero[2][1] && turno === tablero[2][2] ||

            turno === tablero[0][0] && turno === tablero[1][0] && turno === tablero[2][0] ||
            turno === tablero[0][1] && turno === tablero[1][1] && turno === tablero[2][1] ||
            turno === tablero[0][2] && turno === tablero[1][2] && turno === tablero[2][2] ||
            
            turno === tablero[0][0] && turno === tablero[1][1] && turno === tablero[2][2] ||
            turno === tablero[2][0] && turno === tablero[1][1] && turno === tablero[0][2] )
            
        {   //ESTABLECEMOS QUE SE VISUALIZA UNA VEZ QUE TERMINA EL JUEGO
            //SI GANA JUGADOR 1
            if(jugador == 1){
                $("#indicador").text("El jugador " + jugador + " ha ganado!");
                $("#indicador").css("text-transform","uppercase");
                $("#player1").css("background-color","deeppink");
                $("table").css("background-color","deeppink");
                $("#player2").removeClass("enJuego");	
                $("table").removeClass("disponible");
            }else{
                //SI GANA JUGADOR 1
                $("#indicador").text("El jugador " + jugador + " ha ganado!");
                $("#indicador").css("text-transform","uppercase");
                $("#marcador #player2").css("background-color","cornflowerblue");
                $("table").css("background-color","cornflowerblue");
                $("#player1").removeClass("enJuego");	
                $("table").removeClass("disponible");
                }
            $("table").removeClass("disponible");
        }else{
            var empate = true;
            for(var i=0; empate && i<tablero.length; i++){
                for(var j=0; empate && j<tablero[0].length; j++){
                    if(tablero[i][j]==""){
                        empate = false;
                    }
                }
            }
            //EN CASO DE EMPATE
            if(empate){
                $("#indicador").html("Han empatado!");
                $("#indicador").css("text-transform","uppercase");
                $("table").css("background-color","#79f96b");
                $("#player1").removeClass("enJuego");
                $("#player2").removeClass("enJuego");	
                $("table").removeClass("disponible");			
                }	
            }
        
		  //CAMBIO DE TURNOS
		  jugador==1? jugador=2: jugador=1;
	}
}

//FINALMENTE RESETEO DE TODOS LOS VALORES A SU VALOR INICIAL PARA PODER VOLVER A COMENZAR
function resetGame(){
	$("table tr td").html(""); // vacio las celdas de la tabla
	tablero = [["","",""],["","",""],["","",""]];  //  Vuelvo a crear el objeto
	jugador = 1;   //  Jugador vuelve a inicializar en 1
    $("#indicador").html(reiniciarTitulo);
	$("#marcador").html(reiniciarMarcador);
	$("table").addClass("disponible"); //  La tabla vuelve a estar disponible
	$("table").css("background-color","");
}

// Puntajes desplegable 
function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
    $("container").addClass("overlay");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    $("#container").removeClass("overlay");
}