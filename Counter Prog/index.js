const counterValue=document.querySelector("#counter");

const decrement=()=>{
    let value=parseInt(counterValue.innerText);   // get the value
    value--;                                // update the value
    counterValue.innerText=value;                 // set the value onto ui
}

const increment=()=>{
    let value=parseInt(counterValue.innerText);
    value++;
    counterValue.innerText=value
}


/*---------------------------------------------  Using event listener -------------------------------------- */

// const counterValues=document.querySelector("#decre");

// counterValue.addEventListener('click', function(){
//     const numberElement=document.querySelector("#counter")
//     let currentValue=parseInt(numberElement.textContent);
//     numberElement.textContent=currentValue-1;
// })


// const countervalue=document.querySelector("#incre");

// countervalue.addEventListener('click', function(){
//     const numberElement=document.querySelector("#counter")
//     let currentValue=parseInt(numberElement.textContent);
//     numberElement.textContent=currentValue+1;
// })

