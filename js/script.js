let lienzo = document.getElementById("lienzo").getContext("2d");
lienzo.canvas.width= 300;
lienzo.canvas.height= 500;
let FPS=60;
let gravedad= 1.5;
let personaje = {
    x:100,
    y:150,
    ancho:50,
    altura:50
};

//Control
const presionarBoton =()=>{
    //Salto en pixeles 
    personaje.y -= 30;
}

const loop = ()=>{
    //Reiniciar el rectangulo
    lienzo.clearRect(0,0,300,700)
    //Definir el color del rectangulo
    lienzo.fillStyle="rgba(100,0,0,1)";
    //Dibujar el reactangulo
    lienzo.fillRect(personaje.x,personaje.y,personaje.ancho,personaje.altura);
    //Desplazamiento del rectangulo en el eje Y
    personaje.y += gravedad;
}
setInterval(loop, 1000/FPS);

addEventListener('keydown', presionarBoton);