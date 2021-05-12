let lienzo = document.getElementById("lienzo").getContext("2d");
lienzo.canvas.width= 300;
lienzo.canvas.height= 530;
let FPS=60;
let puntuacion=0;
let gravedad= 1.5;
let personaje = {
    x:50,
    y:150,
    ancho:50,
    altura:50
};

let tuberias = new Array();
tuberias[0] = {
    x: lienzo.canvas.width,
    y: 0
}

//Imagenes
let bird= new Image();
bird.src= "../img/bird.png"

let fondo= new Image();
fondo.src= "../img/background.png"

let suelo= new Image();
suelo.src= "../img/suelo.png"

let tuberiaN= new Image();
tuberiaN.src= "../img/tuberiaNorte.png"

let tuberiaS= new Image();
tuberiaS.src= "../img/tuberiaSur.png"

//Control
const presionarBoton =()=>{
    //Salto en pixeles 
    personaje.y -= 30;
};

const loop = ()=>{
    //Reiniciar personaje
    lienzo.clearRect(0,0,300,530);

    //FONDO
    lienzo.drawImage(fondo,0,0);
    lienzo.drawImage(suelo,0, lienzo.canvas.height-suelo.height);
    
    //PERSONAJE
    lienzo.drawImage(bird, personaje.x, personaje.y);
    
    //TUBERIAS
    for (let i=0; i < tuberias.length; i++){
        let constante= tuberiaN.height +80;
        lienzo.drawImage(tuberiaN, tuberias[i].x, tuberias[i].y);
        lienzo.drawImage(tuberiaS, tuberias[i].x, tuberias[i].y + constante);
        tuberias[i].x--;
        if(tuberias[i].y + tuberiaN.height < 80){
            tuberias[i].y = 0 
        }
        if(tuberias[i].x ==100){
            tuberias.push({
                x: lienzo.canvas.width,
                y: Math.floor(Math.random()*tuberiaN.height) -tuberiaN.height
            });
        }
        //colisiones
        if(personaje.x + bird.width >= tuberias[i].x+10 &&
            personaje.x <= tuberias[i].x + tuberiaN.width-5 && 
            (personaje.y <= tuberias[i].y + tuberiaN.height-5 || 
            personaje.y + bird.height >= tuberias[i].y+10 + constante) ||
            personaje.y + bird.height >= lienzo.canvas.height - suelo.height ){
            location.reload();
            alert("perdiste");
        }
        //sumar puntos
        if(tuberias[i].x == personaje.x){
            puntuacion++
        }
    }  
   
    //Desplazamiento del rectangulo en el eje Y
    personaje.y += gravedad;
    //Puntuacion
    lienzo.fillStyle= "rgb(0,0,0)";
    lienzo.font ="25px Arial";
    lienzo.fillText("Puntos: "+puntuacion,5,lienzo.canvas.height-40 );
} 
setInterval(loop, 1000/FPS);

addEventListener('keydown', presionarBoton);
addEventListener('touchstart', presionarBoton);