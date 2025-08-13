let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

function getDisplayTime(){
    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hrRotation = 30*hh + mm/2;
    let minRotation = 6*mm;
    let secRotation = 6*ss;

    hours.style.transform = `rotate( ${hrRotation}deg )`;
    minutes.style.transform = `rotate( ${minRotation}deg )`;
    seconds.style.transform = `rotate( ${secRotation}deg )`;

}

setInterval(getDisplayTime, 1000);