




let startButton = document.querySelector("#start-button");
startButton.onclick  = () => start();


let editButton = document.querySelector("#edit-button").onclick = () => Edit();

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

function start() {   
    
 initialTime = new  Date().getTime() + 1000 + hours * 3600000 + minutes * 60000 + seconds * 1000; 
 

loop = setInterval(function() {


interTime = new  Date().getTime() ;

remainingTime = Math.floor((initialTime - interTime) / 1000)  ;

hours = Math.floor(remainingTime / 3600 )
minutes = Math.floor((remainingTime % 3600) / 60 );
seconds = Math.floor(remainingTime % 60 );

if(hours   < 10 ){ hours   = "0" + hours };
if(minutes < 10 ){ minutes = "0" + minutes };
if(seconds < 10 ){ seconds = "0" + seconds };

display.textContent = hours + ":" + minutes + ":" + seconds ;






if(remainingTime == 0 ){ 
    
    clearInterval(loop)  ; 
    loop = null;
    let newTab = window.open();
    newTab.alert(taskChoosen);


    hours = ac.h;
    minutes = ac.m;
    seconds = ac.s;
    taskChoosen = taskChoosen;
}

update(remainingTime);

},1000)


startButton.textContent = "pause";
startButton.onclick = () => pause();
};




function update(remainingTime){


};


function pause(){

 if(startButton.textContent == "pause" ){  clearInterval(loop) ; startButton.textContent = "Start";   }  else {   start() ;   } 


};

function Edit() {

let hou = document.createElement("input");   hou.setAttribute("placeholder","horas");
let min = document.createElement("input"); min.setAttribute("placeholder","minutos");
let sec = document.createElement("input"); sec.setAttribute("placeholder","segundos");
let task = document.createElement("input"); task.setAttribute("placeholder","mensagem(opcional)");
let subButton = document.createElement("button"); subButton.textContent = "ok" ;

let body = document.querySelector("body");
body.append(hou,min,sec,task,subButton);

subButton.onclick = function(){       

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






