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

interTime = new  Date().getTime() ;

timeLeft = Math.floor((time - interTime) / 1000)  ;

hours = Math.floor(timeLeft / 3600 )
minutes = Math.floor((timeLeft % 3600) / 60 );
seconds = Math.floor(timeLeft % 60 );

if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display = hours + ":" + minutes + ":" + seconds ;

if (timeLeft <= 0) {
clearInterval(timerId);

}
postMessage(display);
}, 1000);
}

function stopTimer() {
clearInterval(timerId);
postMessage(0);
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