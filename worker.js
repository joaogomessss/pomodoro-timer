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