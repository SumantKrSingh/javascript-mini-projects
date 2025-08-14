let qrText = document.getElementById("qr-text");
let sizes = document.getElementById("size");
let genBtn = document.getElementById("gen-btn");
let dwnBtn = document.getElementById("dwn-btn");
let qrBody = document.querySelector(".qr-body");

let size = sizes.value;


// creating qr-code generator function
function generateQRCode() {
    qrBody.innerHTML = "";
    new QRCode(qrBody, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",

    })
}

// if input is empty then doesn't work
function isEmptyInput() {

    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or url!");
}

// working on size
sizes.addEventListener("change", (e) => {
    size = e.target.value;
    isEmptyInput();
})

// generating qr code
genBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isEmptyInput();
});

// for downloading qr_code image
dwnBtn.addEventListener("click", () => {
    let img = document.querySelector(".qr-body img");

    if (img !== null) {
        let imgAttri = img.getAttribute('src');
        dwnBtn.setAttribute("href", imgAttri);
    } else {
        dwnBtn.setAttribute("href", `${document.querySelector("canvas").toDataURL}`)
    }

});