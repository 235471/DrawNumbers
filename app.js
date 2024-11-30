// Adding eventlistener to the buttons ensuring the HTML has been fully loaded and parsed DOmContentLoaded is redudant because my script is by the end of the body with defer. Testing only.
document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('btn-sortear');
    drawButton.addEventListener('click', draw);
    const drawbuttonReset = document.getElementById("btn-reiniciar");
    drawbuttonReset.addEventListener("click", reset);
  });

function draw() {

    // Get the values of the screen input fields, parseInt is uncessary since the field is declared as number in HTML
    let drawQuantity = parseInt(document.getElementById('quantidade').value);
    let fromNumber = parseInt(document.getElementById('de').value);
    let untilNumber = parseInt(document.getElementById('ate').value);
    const uniqueNumbers = new Set();
    // I want all draw numbers to be unique so instead of using an Array i used a Set
    if (fromNumber >= 1) {        
        while(uniqueNumbers.size < drawQuantity) {
            uniqueNumbers.add(randomNumber(fromNumber, untilNumber));
         }
    }
    else {
        console.log("número invalido");
    }

    // Get the relevant HTML tag to show the drawn numbers
    const changeTag = '#resultado label';
    // Converts the set into an array and use the function join to separate the numbers with a comma
    const changeText = "Números sorteados: " + Array.from(uniqueNumbers).join(", ");

    modifyHtml(changeTag, changeText); 
    // Enabling new game button on the page by changing it's CSS class
    document.getElementById('btn-reiniciar').classList.remove('container__botao-desabilitado');
    document.getElementById('btn-reiniciar').classList.add('container__botao');
}

function reset() {
    modifyHtml('#resultado label', "Números sorteados:  nenhum até agora");
    // Disabling new game button on the page by changing it's CSS class
    document.getElementById('btn-reiniciar').classList.remove('container__botao');
    document.getElementById('btn-reiniciar').classList.add('container__botao-desabilitado');  
    // Could have hardcoded but preferred to use a function to clear values.
    modifyHtmlById('quantidade', '');
    modifyHtmlById('de', '');
    modifyHtmlById('ate', '');  
}
// Function that generates the desired numbers
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Modifying some HTML elements that can be manipulated via innerHTML
function modifyHtml(tag, value) {
    let campo = document.querySelector(tag);
    campo.innerHTML = value;
}
// Function to modify fields that need to be changed using value instead of innerHTML
function modifyHtmlById(tag, value) {
    let campo = document.getElementById(tag);
    campo.value = value;
}