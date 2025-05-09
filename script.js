// Captura os elementos do formulario.
const formContainer = document.querySelector(".form-container")
const form = document.querySelector("form")
const inputAmount = document.getElementById("number")
const inputMinimum = document.getElementById("of")
const inputMaximum = document.getElementById("to")
const repeatBtn = document.getElementById("repeat")

// Elementos da exibição de Resultado.
const resultContainer = document.querySelector(".result-container")
const resultArea = document.querySelector(".content-number")
const btnRestart = document.getElementById("btn-restart")

form.onsubmit = (event) => {
    event.preventDefault() // Impede a pag de recarregar.

    // Pega os valores dos inputs e converte para número.
    const amount = Number(inputAmount.value)
    const minimum = Number(inputMinimum.value)
    const maximum = Number(inputMaximum.value)
    const noRepeat = !repeatBtn.checked 

    // VALIDAÇÃO
    // CASO DIGITE ALGO QUE NÃO SEJA NUMERO.
    if (isNaN(amount) || isNaN(minimum) || isNaN(maximum)){
        return alert("Preencha todos os campos com nùmeros validos!")
    }

    // CASO O MINIMO FOR MAIOR QUE O MAXIMO.
    if (minimum > maximum) {
        return alert('O valor "de" não pode ser maior que o "até".')
    }

    // Caso NÃO queira repetir e a quantidade for maior que o intervalo.
    if (!noRepeat && amount > (maximum - minimum + 1)){
        return alert("Quantidade excede o intervalo disponivel sem repetição.")
    }

    // Chama a funcão que faz o sorteio.
    const results = startDraw(amount, minimum, maximum, noRepeat)
    
    // Exibe os resultados.
    showResults(results)
}

// Função do sorteio.
function startDraw(amount, minimum, maximum, noRepeat){
    // Guarda números sorteados.
    const results = []

    // while é um loop que so termina quando o rsultado for igual a quantidade.
    while (results.length < amount) {
        // Gera um número dentro do intervalo.
        const random = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
        // Se não permitir repetição, gera um numero que ainda nao saiu.
        if (noRepeat || !results.includes(random)){
            results.push(random)
        }
    }
    return results // Retorna os numeros sorteados.
}

// Função para exibir o resultado.
function showResults(results) {
    // Desabilita o layout do form.
    form.style.display = "none"    
    // habilita o resultado.
    resultContainer.style.display = "block"

    resultArea.innerHTML = "" // ← limpa os resultados anteriores

    //Cria os cards com intervalo entre animações.
    results.forEach((number, index) => {
        setTimeout(() => {
            const card = createCard(number)
            resultArea.appendChild(card)
        }, index * 2200); // Atraso de 2.2s entre cada numero.
    })
}

btnRestart.addEventListener("click", (event) => {
    event.preventDefault()

    // Esconde os Resultados.
    resultContainer.style.display = "none"

    // Mostra o Formulario Novamente.
    form.style.display = "block"

    // Limpa os campos do formulário
    document.getElementById("number").value = ""
    document.getElementById("of").value = ""
    document.getElementById("to").value = ""
    document.getElementById("repeat").checked = false

    // Foca no primeiro campo
    document.getElementById("number").focus()
})

function createCard(number){
    const cardWrapper = document.createElement("div")
    cardWrapper.classList.add("card-wrapper")

    const retangle = document.createElement("div")
    retangle.classList.add("retangle")

    const cardNumber = document.createElement("div")
    cardNumber.classList.add("card-number")

    const span = document.createElement("span")
    span.classList.add("number-result")
    span.textContent = number

    //Monta o card.
    cardNumber.appendChild(span)
    retangle.appendChild(cardNumber)
    cardWrapper.appendChild(retangle)

    return cardWrapper
}