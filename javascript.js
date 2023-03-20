



let editButton = document.querySelector("#edit-button")
editButton.onclick = () => Edit();

let display = document.querySelector("#display")

let loop;
let remainingTime
let initialTime;
let interTime;

let taskChoosen;

let hours;
let minutes;
let seconds;

let time = {hours:"" , minutes:"" , seconds:"" };



// This code will run in the main thread
const workerScript = `
// This code will run in the Web Worker
let timeLeft = 0;
let timerId = null;
let interTime;

let hours;
let minutes;
let seconds;

let condition;

let actualSetting = { hours:"" , minutes:"" , seconds:""     };

let display;


function startTimer(time) {

actualSetting.hours = time.hours ;
actualSetting.minutes = time.minutes ;
actualSetting.seconds = time.seconds ;

if(condition != "paused" )   {   

hours = time.hours ;
minutes = time.minutes ;
seconds = time.seconds;

}

initialTime = new  Date().getTime() + 1000 + hours * 3600000 + minutes * 60000 + seconds * 1000;
console.log(initialTime);

timerId = setInterval(() => {

    

interTime = new Date().getTime() ;

timeLeft = Math.floor((initialTime - interTime) / 1000)  ;

hours = Math.floor(timeLeft / 3600 )
minutes = Math.floor((timeLeft % 3600) / 60 );
seconds = Math.floor(timeLeft % 60 );

if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display = hours + ":" + minutes + ":" + seconds ;

if (timeLeft <= 0) {
clearInterval(timerId);

if(actualSetting.hours  < 10 ){ actualSetting.hours   = "0" + actualSetting.hours };
if(actualSetting.minutes < 10 ){ actualSetting.minutes = "0" + actualSetting.minutes };
if(actualSetting.seconds < 10 ){ actualSetting.seconds = "0" + actualSetting.seconds };


hours = actualSetting.hours ;
minutes = actualSetting.minutes ;
seconds = actualSetting.seconds ;



}
postMessage(display);
}, 1000);
}

function stopTimer() {
clearInterval(timerId);

hours = hours;
minutes = minutes;
seconds = seconds;

condition = "paused";

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
    
    
    worker.postMessage({ type: 'start', data: time }); 

    if( startButton.textContent == "Start") {
    startButton.textContent = "Pause";
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

display.textContent = timeLeft ;

if(timeLeft == "00:00:00"){let newTab = window.open();newTab.alert(taskChoosen);
display.textContent = hours + ":" + minutes + ":" + seconds ;

if(taskChoosen == ""){taskChoosen = "time is over"};


    

if(hours == "" ){ hours = 0 };
if(minutes  == "" ){ minutes = 0 };
if(seconds  == "" ){ seconds =  0 };


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

time.hours = hou.value;
time.minutes = min.value;
time.seconds = sec.value;
taskChoosen = task.value;

hours = time.hours
minutes = time.minutes;
seconds = time.seconds;
taskChoosen = task.value;

if(hou.value  == "" ){ hours = 0 };
if(min.value  == "" ){ minutes = 0 };
if(sec.value  == "" ){seconds =  0 };

if(hours < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };



display.textContent = hours + ":" + minutes + ":" + seconds ;

hou.remove();
min.remove();
sec.remove();
task.remove();
subButton.remove();

};

}






