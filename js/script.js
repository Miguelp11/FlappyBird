let lienzo = document.getElementById("lienzo");
let ctx= lienzo.getContext("2d");
let ancho=300;
let alto= 530;
let canvas_ancho=300;
let canvas_alto=530;
lienzo.width= ancho;
lienzo.height= alto;
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
    x: lienzo.width,
    y: 0
}

//Imagenes
let bird= new Image();
bird.src= "img/bird.png"

let fondo= new Image();
fondo.src= "img/background.png"

let suelo= new Image();
suelo.src= "img/suelo.png"

let tuberiaN= new Image();
tuberiaN.src= "img/tuberiaNorte.png"

let tuberiaS= new Image();
tuberiaS.src= "img/tuberiaSur.png"

//Control
const presionarBoton =()=>{
    //Salto en pixeles 
    personaje.y -= 30;
};

const redimensionar =()=>{
    canvas_ancho = window.innerWidth;
    canvas_alto= window.innerHeight;

    lienzo.width = ancho;
    lienzo.height = alto;

    lienzo.style.height =""+canvas_alto+"px";
};
redimensionar();

const loop = ()=>{
    //Reiniciar personaje
    ctx.clearRect(0,0,300,530);

    //FONDO
    ctx.drawImage(fondo,0,0);
    ctx.drawImage(suelo,0, lienzo.height-suelo.height);
    
    //PERSONAJE
    ctx.drawImage(bird, personaje.x, personaje.y);
    
    //TUBERIAS
    for (let i=0; i < tuberias.length; i++){
        let constante= tuberiaN.height +80;
        ctx.drawImage(tuberiaN, tuberias[i].x, tuberias[i].y);
        ctx.drawImage(tuberiaS, tuberias[i].x, tuberias[i].y + constante);
        tuberias[i].x--;
        if(tuberias[i].y + tuberiaN.height < 80){
            tuberias[i].y = 0 
        }
        if(tuberias[i].x ==100){
            tuberias.push({
                x: lienzo.width,
                y: Math.floor(Math.random()*tuberiaN.height) -tuberiaN.height
            });
        }
        //colisiones
        if(personaje.x + bird.width >= tuberias[i].x+10 &&
            personaje.x <= tuberias[i].x + tuberiaN.width-5 && 
            (personaje.y <= tuberias[i].y + tuberiaN.height-5 || 
            personaje.y + bird.height >= tuberias[i].y+10 + constante) ||
            personaje.y + bird.height >= lienzo.height - suelo.height ){
            location.reload();
            alert("Chocaste y perdiste :(");
        }
        //sumar puntos
        if(tuberias[i].x == personaje.x){
            puntuacion++
        }
    }  
   
    //Desplazamiento del rectangulo en el eje Y
    personaje.y += gravedad;
    //Puntuacion
    ctx.fillStyle= "rgb(0,0,0)";
    ctx.font ="25px Arial";
    ctx.fillText("Puntos: "+puntuacion,5,lienzo.height-40 );
} 
setInterval(loop, 1000/FPS);

addEventListener('keydown', presionarBoton);
addEventListener('touchstart', presionarBoton);
addEventListener('resize', redimensionar);
