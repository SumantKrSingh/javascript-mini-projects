let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let resetBtn= document.getElementById("resetBtn");
let timerDisplay = document.querySelector(".timerDisplay")


let miliSec  =  0;
let sec      =  0;
let minu     =  0;


let timerId = null ;


function startTimer(){
   miliSec ++;

   if(miliSec == 100){
    miliSec = 0 ;
    sec ++;
   }

   if(sec == 60){
    sec = 0 ;
    minu ++ ;
   }

   let milisecStri = miliSec < 10 ? `0${miliSec}` : miliSec;
   let secStri = sec < 10 ?     `0${sec}` : sec;
   let minuStri = minu < 10 ?    `0${minu}` : minu;

 timerDisplay.innerHTML = `${minuStri} : ${secStri} : ${milisecStri}`;
};


startBtn.addEventListener("click", ()=>{

    if(timerId !== null){
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener("click", ()=>{

    clearInterval(timerId);
});


resetBtn.addEventListener("click", ()=>{

    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
})