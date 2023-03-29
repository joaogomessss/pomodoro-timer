
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        
      }, function(err) {
  
      });
  });
}


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

let time = {hours:"" , minutes:"" , seconds:"" , };



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

let actualSetting = { hours:"" , minutes:"" , seconds:""};

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


timerId = setInterval(() => {

interTime = new Date().getTime() ;

timeLeft = Math.floor((initialTime - interTime) / 1000)  ;

hours   = Math.floor(timeLeft / 3600 )
minutes = Math.floor((timeLeft % 3600) / 60 );
seconds = Math.floor(timeLeft % 60 );

if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display = hours + ":" + minutes + ":" + seconds ;

if (timeLeft == 0) {

  let bruna = new Notification("pameiras");

clearInterval(timerId);

/*hours   = actualSetting.hours ;
minutes = actualSetting.minutes ;
seconds = actualSetting.seconds ; */

/*if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };*/

display = hours + ":" + minutes + ":" + seconds ;

console.log(display);

}
postMessage(display);
}, 1000);
}



function stopTimer() { // This function will pause the timer when the user click on the button 
clearInterval(timerId);

hours   = hours;
minutes = minutes;
seconds = seconds;

condition = "paused";

postMessage(display);

};




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

let startButton = document.querySelector("#start-button");
startButton.onclick  = () => Start();

function Start(){ // this function will send a message to the webworker start the pomodor
    
    worker.postMessage({ type: 'start', data: time }); 
    startButton.textContent = "Pause";
    startButton.onclick  = () => pause();
        
};

function pause() {// This function will send a message  to the webworker pause the pomodoro

    worker.postMessage({ type: 'stop', data: time }); 
    startButton.textContent = "Start";
    startButton.onclick  = () => Start(); 
};






worker.onmessage = (event) => { 

  display.textContent = event.data;

  if(event.data == "00:00:00"){
    
    startButton.textContent = "goku";
  };




};



function Edit() { // this function will create four inputs for the user choose the amount of time 

editButton.onclick = console.log();

let hou  = document.createElement("input");   hou.setAttribute("placeholder","horas");
let min  = document.createElement("input");   min.setAttribute("placeholder","minutos");
let sec  = document.createElement("input");   sec.setAttribute("placeholder","segundos");
let task = document.createElement("input");   task.setAttribute("placeholder","mensagem(opcional)");
let subButton = document.createElement("button"); subButton.textContent = "ok" ;

let inputContatiner = document.querySelector("#edit-container");
inputContatiner.append(hou,min,sec,task,subButton);



if(hours   == undefined){ }else{hou.value = time.hours} 
if(minutes == undefined){ }else{min.value = time.minutes} 
if(seconds == undefined){ }else{sec.value = time.seconds} 
if(taskChoosen == undefined){ }else{task.value = taskChoosen} 



subButton.onclick = function(){       

   
editButton.onclick = () => Edit();



hours = hou.value
minutes = min.value
seconds = sec.value;
taskChoosen = task.value;

/* when the signals (   == << become sicronized with the below become much more beautiufl
=   <
=   <
=   <
=   <
*/
if(hours   == 0 ){ hours   = 0 };
if(minutes == 0 ){ minutes = 0 };
if(seconds == 0 ){ seconds = 0 }; 

if(hours   < 10 ){ hours     = "0" + hours };
if(minutes < 10 ){ minutes   = "0" + minutes };
if(seconds < 10 ){ seconds   = "0" + seconds }; 

time.hours   = hou.value;
time.minutes = min.value;
time.seconds = sec.value;
taskChoosen  = task.value;

if(time.hours   == 0 ){ time.hours   = 0 };
if(time.minutes == 0 ){ time.minutes = 0 };
if(time.seconds == 0 ){ time.seconds = 0 }; 

display.textContent = hours + ":" + minutes +  ":" + seconds ;

hou.remove();
min.remove();
sec.remove();
task.remove();
subButton.remove();

};

}






