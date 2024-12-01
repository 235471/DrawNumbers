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

    // Checking if the inputs are not empty/numbers
    if (isNaN(drawQuantity) || isNaN(fromNumber) || isNaN(untilNumber)) {
        alert('Insira apenas números validos');    
        return;
    }
    // Checking if the value from is not greater than until
    if(fromNumber >= untilNumber) {
        alert('Valor do campo "Do número" não pode ser maior ou igual ao campo ""Até o número"');
        return;
    }
    // Checking if the interval is large to avoid infinite loop
    if(drawQuantity > (untilNumber - fromNumber +1)) {
        alert('O intervalo entre o valor escolhido para o campo "Do número" e campo "Até o número" não comporta a quantida escolhida para sorteio');
        return;        
    }

    const uniqueNumbers = new Set();
    // I want all draw numbers to be unique so instead of using an Array i used a Set
    if (drawQuantity >= 1) {        
        while(uniqueNumbers.size < drawQuantity) {
            uniqueNumbers.add(randomNumber(fromNumber, untilNumber));
         }
    }
 

    // Get the relevant HTML tag to show the drawn numbers
    const changeTag = '#resultado label';
    // Converts the set into an array and use the function join to separate the numbers with a comma and space. If no space wanted .join is redundant
    const changeText = "Números sorteados: " + Array.from(uniqueNumbers).join(", ");

    modifyHtml(changeTag, changeText); 
    enableDisableButton('btn-reiniciar', 'container__botao');

}

function reset() {
    modifyHtml('#resultado label', "Números sorteados:  nenhum até agora");
    enableDisableButton('btn-reiniciar', 'container__botao-desabilitado');
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

function enableDisableButton(id, css) {
    if(document.getElementById(id).classList.contains('container__botao-desabilitado')) {
        // Disabling new game button on the page by changing it's CSS class
        document.getElementById(id).classList.remove('container__botao-desabilitado');
        document.getElementById(id).classList.add(css);  
    }
    else {
        // Enabling new game button on the page by changing it's CSS class
        document.getElementById(id).classList.remove('container__botao');
        document.getElementById(id).classList.add(css);
    }
}