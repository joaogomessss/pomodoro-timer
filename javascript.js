

let requestId;


let startButton = document.querySelector("#start-btn").onclick  = () => Start(); ;
let editButton = document.querySelector("#edit-btn").onclick = () => Edit();

let display = document.querySelector("#display")

let loop;
let remainingTime;

let hours;
let minutes;
let seconds;
let taskChoosen;

let ac = { h:"" , m:"" , s:""  };

function consolo(){ console.log(remainingTime)};

function Start() {   

   
let initialTime = new  Date().getTime()+ 1000 + hours * 3600000 + minutes * 60000 + seconds * 1000; 
 

loop = setInterval(function() {

let interTime = new  Date().getTime() ;

remainingTime = Math.floor((initialTime - interTime) / 1000)  ;


hours = Math.floor(remainingTime / 3600 )
minutes = Math.floor((remainingTime % 3600) / 60 );
seconds = Math.floor(remainingTime % 60 );

display.textContent = hours + ":" + minutes + ":" + seconds ;

if(remainingTime == 0 ){ clearInterval(loop) ; let newTab = window.open() ; 
    
    newTab.alert(taskChoosen)

    display.textContent = ac.h + ":" + ac.m + ":" + ac.s }; 
    hours = ac.h ;
    minutes = ac.m ;
    seconds = ac.s ;


},1000);




};


document.addEventListener("visibilitychange" , traidor)

function traidor() {


setInterval(function (){ /*console.log(remainingTime) */}, 1000);



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

hours = hou.value;
minutes = min.value;
seconds = sec.value;
taskChoosen = task.value;

ac.h = hou.value;
ac.m = min.value;
ac.s = sec.value;
taskChoosen = task.value;

display.textContent = hours + ":" + minutes + ":" + seconds ;

hou.remove();
min.remove();
sec.remove();
task.remove();
subButton.remove();

};

};