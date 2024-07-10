
let baseURLSound = 'https://oscaraccorsi.github.io/drones/';

const vol = new Tone.Volume(0).toDestination();
let dronePlaying;


let baseURLBack = 'https://oscaraccorsi.github.io/backgrounds/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let baseUrlPictures = ' https://oscaraccorsi.github.io/tartan/';
let logo;
let xLogo;
let img;

let dronesList = ['Drone01.mp3',
                  'Drone02.mp3',
                  'Drone03.mp3',
                  'Drone04.mp3',
                  'Drone05.mp3',
                  'Drone06.mp3',
                  'Drone07'];

let backgroundList = ['01.png', '02.png', 
                      '03.png', '04.png',
                      '05.png', '06.png', 
                      '07.png', '08.png', 
                      '09.png', '10.png', 
                      '11.png', '12.png',
                      '13.png', '14.png',
                      '15.png', '16.png',
                      '17.png', '18.png',
                      '19.png', '20.png',
                      '21.png', '22.png',
                      '23.png', '24.png'];

let pictureList = ['tartan01.jpeg', 
                   'tartan02.jpeg', 
                   'tartan03.jpeg', 
                   'tartan04.jpg',
                   'tartan05.jpeg', 
                   'tartan06.jpg', 
                   'tartan07.jpg',  
                   'tartan08.jpeg', 
                   'tartan09.jpg', 
                   'tartan10.jpeg', 
                   'tartan11.jpg',
                   'tartan12.png'];


let timeBackGroundArray = [13, 21, 34, 55, 89, 144];
let timeBackground;
palette = [];

let back;
let backWidth;
let backHeight; 

let back2;
let back2Width;
let back2Height; 

let backX1 = 0;
let backX2 = 0;

let from, to;
let amount;
let index = 0.01;
let inter;

let choiceArray = [colorFade, noColorFade];
let choice;
let sec, min, h, day;  


//-----------------------------------------------PRELOAD
function preload() {
  dronePlaying = new Tone.Player(baseURLSound + random(dronesList)).toDestination();
  logo = loadImage(baseURLImage + 'good one white.png');
  
  back = loadImage(baseURLBack + random(backgroundList));
  h = hour()%12;

  img = loadImage(baseUrlPictures + pictureList[h]);
  //back2 = loadImage(baseURLBack + '12.png');
}
//------------------------------------------------WINDOWRESIZED
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------SETUP
function setup() {
  dronePlaying.loop = true;
  dronePlaying.autostart = true;
  
  createCanvas(windowWidth, windowHeight);
  
  timeBackground = random(timeBackGroundArray);
  setInterval(reloadPage, 1000*timeBackground);
  console.log(timeBackground, h);
  
  img.resize(100, 0);
  img.loadPixels();
  
//-------------------------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 255);
    palette.push(c);    
  }
  
  xLogo = windowWidth-25;
  
  backHeight = height;
  bac2kHeight = height;
  backWidth = windowWidth;
  back2Width = windowWidth;
  
  
//-----------------------------------------lerp  
  from = random(palette);
  to = random(palette);
  amount = 0;
  inter = lerpColor(from, to, amount);  

  //---------------------------------choice
  choice = random(choiceArray);
 
}


//------------------------------------------DRAW
function draw() {
  //colorFade();
  choice();
  toRight();
  toLeft();
  //image(img, 0, 0);
  
}
//----------------------------------toLeft
function toLeft() {
  tint(255, 255, 255, 30);
  image(back, backX1, 0, backWidth, backHeight);
  image(back, backX1 + backWidth, 0, backWidth, backHeight);
  backX1 -=1;
  
  if (backX1 < -backWidth) {
    backX1 = 0;  
  }
}
//-----------------------------------toRight
function toRight() {
  tint(255, 255, 255, 45);
  image(back, backX2, 0, backWidth, backHeight);
  image(back, backX2 - backWidth, 0, backWidth, backHeight);
  backX2 +=1;
  
  if (backX2 > backWidth) {
    backX2 = 0;  
  }
}
//----------------------------------------colorFade
function colorFade() {
  inter = lerpColor(from, to, amount);
  background(inter);
  amount = amount +index;
  
  if (amount >= 1 || amount <= 0) {
  index = -index;
  } 
  if (amount >= 1-index) {
    from = random(palette);
  }
  if (amount <=  0 +index) {
     to = random(palette);
  }
}

function noColorFade() {
  background(10);
}

//----------------------------------------mousePressed
function mousePressed() {
  reloadPage();
    let fs = fullscreen();
    fullscreen(!fs);   
  
  // clear(); 
}

//--------------------------------space bar
function keyPressed() {
   if (keyCode === 32 ) {
    imageMode(CENTER);
  logo.resize(40, 0);
  tint(255, 255, 255);
  image(logo, xLogo, windowHeight-20);
  
  imageMode(CORNER);
  save();  
  }
}

function reloadPage() {
   window.location.reload();
}