let total =document.querySelector("#total")
let appetiz =document.querySelector("#appetiz")
let depensesOurson =document.querySelector("#depensesOurson")
let depensesFee =document.querySelector("#depensesFee")
let depensesFeeText =document.querySelector("#depensesFeeText")
let calculer =document.querySelector("#calculer")
let reset =document.querySelector("#reset")
let messageFinal =document.querySelector("#messageFinal")
let messageGlobal =document.querySelector("#messageGlobal")

let totalValue=0.0
let appetizValue=0.0
let depensesOursonValue=0.0
let depensesFeeValue=0.0
let apportsOurson=0.0
let apportsFee=0.0
let difference=0.0
let messageFinalString="" 
let dette=parseFloat(localStorage.getItem("dette")) //la dette correspond à ce que Jérôme doit

messageGlobal.textContent=localStorage.getItem("messageGlobal")
console.log(messageGlobal)
function saveValue(event,element){

    return parseFloat(element.value)
}

function calculerDesResultats(){
    depensesFeeValue=totalValue-depensesOursonValue

    apportsFee= (totalValue-appetizValue)/2
    apportsOurson=appetizValue+ apportsFee
    
    difference=depensesOursonValue-apportsOurson
    depensesFee.placeholder=depensesFeeValue
    
    console.log(
        "apportours",apportsOurson,
        "apportsFee",apportsFee,
        "difference est", difference
    )
    messageFinalString= difference<0 
        ? `Pour les courses d'aujourd'hui, Laure doit ${Math.abs(difference)} euros `
        : `Pour les courses d'aujourd'hui, Jérôme doit ${Math.abs(difference)} euros `
        messageFinal.textContent=messageFinalString

    dette=dette+difference
    localStorage.setItem("dette",dette)
    messageGlobal.textContent= dette<0 
    ? `En tout, Laure doit ${Math.abs(dette)} euros `
    : `En tout, Jérôme doit ${Math.abs(dette)} euros `

    localStorage.setItem("messageGlobal",messageGlobal.textContent)
}

total.addEventListener("input",
()=>{totalValue=saveValue(event,total) ; console.log(totalValue)}
)
appetiz.addEventListener("input",
()=>{appetizValue=saveValue(event,appetiz) ; console.log(appetizValue)}
)
depensesOurson.addEventListener("input",
()=>{depensesOursonValue=saveValue(event,depensesOurson) ; console.log(depensesOursonValue)}
)
calculer.addEventListener("click",calculerDesResultats)

resetAll.addEventListener("click",resetLocalStorage)

function resetLocalStorage(){
    dette=0
    localStorage.setItem("dette",dette)
    localStorage.setItem("messageGlobal","Pas de dette en cours")
    messageGlobal.textContent="Pas de dette en cours"
}

function resetLastChanges(){
    dette=dette-difference
    localStorage.setItem("dette",dette)
    messageGlobal.textContent= dette<0 
    ? `En tout, Laure doit ${Math.abs(dette)} euros `
    : `En tout, Jérôme doit ${Math.abs(dette)} euros `
    localStorage.setItem("messageGlobal",messageGlobal.textContent)
}
