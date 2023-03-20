



let editButton = document.querySelector("#edit-button")
editButton.onclick = () => Edit();

let display = document.querySelector("#display")

let loop;
let remainingTime
let initialTime;
let interTime;


let hours;
let minutes;
let seconds;
let taskChoosen;

let ac = { h:"" , m:"" , s:""  };



// This code will run in the main thread
const workerScript = `
// This code will run in the Web Worker
let timeLeft = 0;
let timerId = null;
let interTime;

let hours;
let minutes;
let seconds;


let display;


function startTimer(time) {

timerId = setInterval(() => {

interTime = new Date().getTime() ;

timeLeft = Math.floor((time - interTime) / 1000)  ;

hours = Math.floor(timeLeft / 3600 )
minutes = Math.floor((timeLeft % 3600) / 60 );
seconds = Math.floor(timeLeft % 60 );

if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display = {h:hours , m:minutes , s:seconds };

if (timeLeft <= 0) {
clearInterval(timerId);

}
postMessage(display);
}, 1000);
}

function stopTimer() {
clearInterval(timerId);
postMessage(display);

}

onmessage = (event) => {
const { type, data } = event.data;
switch (type) {
case 'start':
startTimer(data);
break;
case 'stop':
stopTimer();
break;
}
};

`;
const blob = new Blob([workerScript], { type: 'application/javascript' });
const blobUrl = URL.createObjectURL(blob);
const worker = new Worker(blobUrl);


// Start the timer for 25 minutes (1500 seconds)

 

let startButton = document.querySelector("#start-button");
startButton.onclick  = () => Start();

function Start(){ 
    
    initialTime = new  Date().getTime() + 1000 + hours * 3600000 + minutes * 60000 + seconds * 1000;
    worker.postMessage({ type: 'start', data: initialTime }); 
    console.log(initialTime);

    if( startButton.textContent == "Start") {
    startButton.textContent = "pause";
    startButton.onclick  = () => pause();
}       
    

};

function pause() {

    worker.postMessage({ type: 'stop', data: initialTime }); 
    startButton.textContent = "Start";
    startButton.onclick  = () => Start();
    
};




worker.onmessage = (event) => {
const timeLeft = event.data;

// Update the UI with the time left

display.textContent = timeLeft.h + ":" + timeLeft.m + ":" + timeLeft.s  ;
hours = timeLeft.h ; 
minutes = timeLeft.m ;
seconds = timeLeft.s; 

if(taskChoosen == ""){taskChoosen = "time is over"};

if(display.textContent == "00:00:00"){let newTab = window.open();newTab.alert(taskChoosen);
    
hours = ac.h;
minutes = ac.m;
seconds = ac.s;

if(hours == "" ){ hours = 0 };
if(minutes  == "" ){ minutes = 0 };
if(seconds  == "" ){ seconds =  0 };

if(hours  < 10 ){ hours   = "0" + hours };
if(minutes< 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display.textContent =  hours + ":" + minutes + ":" + seconds ;
taskChoosen = taskChoosen;

startButton.textContent = "Start";
startButton.onclick  = () => Start();
};
};



function Edit() {

editButton.onclick = console.log();

let hou = document.createElement("input");   hou.setAttribute("placeholder","horas");
let min = document.createElement("input"); min.setAttribute("placeholder","minutos");
let sec = document.createElement("input"); sec.setAttribute("placeholder","segundos");
let task = document.createElement("input"); task.setAttribute("placeholder","mensagem(opcional)");
let subButton = document.createElement("button"); subButton.textContent = "ok" ;

let inputContatiner = document.querySelector("#edit-container");
inputContatiner.append(hou,min,sec,task,subButton);

subButton.onclick = function(){       

   
editButton.onclick = () => Edit();

ac.h = hou.value;
ac.m = min.value;
ac.s = sec.value;
taskChoosen = task.value;

hours = hou.value;
minutes = min.value;
seconds = sec.value;
taskChoosen = task.value;

if(hou.value  == "" ){ hours = 0 };
if(min.value  == "" ){ minutes = 0 };
if(sec.value  == "" ){ seconds =  0 };

if(hou.value  < 10 ){ hours   = "0" + hours };
if(min.value < 10 ){ minutes = "0" + minutes };
if(sec.value < 10 ){ seconds = "0" + seconds };



display.textContent = hours + ":" + minutes + ":" + seconds ;

hou.remove();
min.remove();
sec.remove();
task.remove();
subButton.remove();

};

}






