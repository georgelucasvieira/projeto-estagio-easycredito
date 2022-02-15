
//-------------------------Support Section Accordion Effect-------------------------------------------//
const accordionButton = document.getElementsByClassName("accordion-button");
for (let i = 0; i < accordionButton.length; i++) {
    accordionButton[i].addEventListener("click", function() {
        let accordionSection = this.nextElementSibling;
        this.classList.toggle("active");
        accordionSection.style.maxHeight = accordionSection.style.maxHeight ? null : `${accordionSection.scrollHeight}px`;
    });
}

//-------------------------Simulator tabs------------------------------------------------------------//
const background = document.getElementById("simulator-background");
const simulatorContainer = document.getElementById("simulator-container");
const simulatorContent = document.getElementsByClassName("simulator-content");
let  currentContent = null;

function openSimulatorTab(contentIndex){

    background.classList.add("simulator-active");
    simulatorContainer.classList.add("simulator-active");

    for(let i = 0; i < simulatorContent.length; i++){
        simulatorContent[i].classList.remove("content-active");
    }

    switch (contentIndex){
        case 1:
            currentContent = document.getElementById("simulator-emprestimo");
            break;
        case 2:
            currentContent = document.getElementById("simulator-cartao");
            break;

        case 3:
            currentContent = document.getElementById("simulator-refinanciamento");
            break;
    }
    currentContent.classList.add("content-active");
}

function closeSimulatorTab(){
    currentContent.classList.remove("content-active");
    background.classList.remove("simulator-active");
    simulatorContainer.classList.remove("simulator-active");
}

//-------------------------Empréstimo Range Slider-------------------------------------------------//
const emprestimoRangeSlider = document.getElementById("emprestimo-slider-range");
const emprestimoTextValue = document.getElementById("emprestimo-slider-value");
const pgtoValue = document.getElementById("pgto-value");

let nper = 12;
let vp = 10000;

emprestimoRange();
//Check the size of the bar once
function emprestimoRange(){
    let scaleSlider = scaleOutput(emprestimoRangeSlider.value, 500, 50000, 0, 100);
    emprestimoRangeSlider.style.backgroundImage = 'linear-gradient(90deg, rgb(51,105,231) '+scaleSlider+'%, rgb(173,171,171) '+scaleSlider+'%)';

    let scaleTextValue = scaleOutput(scaleSlider, 0, 100, -3.7, 90)
    emprestimoTextValue.style.marginLeft = scaleTextValue+'%';
    emprestimoTextValue.textContent = parseInt(emprestimoRangeSlider.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', maximumFractionDigits:0});
    vp = emprestimoRangeSlider.value;
    loanCalc();
}
//----------------------------- Dropdown Menu ------------------------------------------------------//
function updateMenu(){
    const select = document.getElementById('select');
    let option = select.options[select.selectedIndex];
    nper = option.value;
    loanCalc();
}

//-------------------------Cartão Range Slider-------------------------------------------------//
const cartaoRangeSlider = document.getElementById("cartao-slider-range");
const cartaoTextValue = document.getElementById("cartao-slider-value");

cartaoRange();
//Check the size of the bar once
function cartaoRange(){
    let scaleSlider = scaleOutput(cartaoRangeSlider.value, 500, 50000, 0, 100);
    cartaoRangeSlider.style.backgroundImage = 'linear-gradient(90deg, rgb(51,105,231) '+scaleSlider+'%, rgb(173,171,171) '+scaleSlider+'%)';

    let scaleTextValue = scaleOutput(scaleSlider, 0, 100, -3.7, 90)
    cartaoTextValue.style.marginLeft = scaleTextValue+'%';
    cartaoTextValue.textContent = parseInt(cartaoRangeSlider.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', maximumFractionDigits:0});
    vp = cartaoRangeSlider.value;
}

function scaleOutput(input, fromScaleMin, fromScaleMax, toScaleMin, toScaleMax) {
    return (input - fromScaleMin) * (toScaleMax - toScaleMin) / (fromScaleMax - fromScaleMin) + toScaleMin;
}
function loanCalc(){
    let i = 0.0449;
    let pgto = vp*(((1+i)**nper *i)/((1 + i)**nper - 1));
    pgtoValue.textContent = "de "+pgto.toLocaleString('pt-br', {style:'currency', currency: 'BRL', minimumFractionDigits:2,maximumFractionDigits:2})+"*";
}
















