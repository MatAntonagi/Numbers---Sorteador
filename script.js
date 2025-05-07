// Seleciona os elementos do formulário
const form = document.querySelector("form")
const quantityInput = document.getElementById("number")
const minInput = document.getElementById("of")
const maxInput = document.getElementById("to")
const repeatCheckbox = document.getElementById("repeat")

// Seleciona containers de exibição
const formContainer = document.querySelector(".form-container")
const resultContainer = document.querySelector(".result-container")
const resultList = document.querySelector(".content-number")

// Botão de sortear novamente
const restartButton = document.querySelector(".animated-button-restart")

// Evento principal: Submissão do formulário
form.onsubmit = (event) => {
  event.preventDefault()

  // Captura e valida os valores
  const quantity = Number(quantityInput.value)
  const min = Number(minInput.value)
  const max = Number(maxInput.value)
  const allowRepeat = !repeatCheckbox.checked

  if (!validateInputs(quantity, min, max, allowRepeat)) return

  // Gera os números sorteados
  const numbers = generateRandomNumbers(quantity, min, max, allowRepeat)

  // Atualiza interface
  showResults(numbers)
}

// Validação dos valores inseridos
function validateInputs(quantity, min, max, allowRepeat) {
  if (min >= max) {
    alert("O valor mínimo deve ser menor que o máximo.")
    return false
  }

  if (quantity <= 0) {
    alert("A quantidade de números deve ser maior que zero.")
    return false
  }

  const range = max - min + 1

  if (!allowRepeat && quantity > range) {
    alert(`Não é possível sortear ${quantity} números únicos nesse intervalo.`)
    return false
  }

  return true
}

// Gera números aleatórios com ou sem repetição
function generateRandomNumbers(quantity, min, max, allowRepeat) {
  const result = []
  const usedNumbers = new Set()

  while (result.length < quantity) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min

    if (allowRepeat || !usedNumbers.has(random)) {
      result.push(random)
      usedNumbers.add(random)
    }
  }

  return result
}

// Exibe os resultados com animação
function showResults(numbers) {
  // Esconde formulário e mostra resultados
  formContainer.style.display = "none"
  resultContainer.style.display = "block"
  resultList.innerHTML = ""

  // Cria os cards com intervalo entre animações
  numbers.forEach((number, index) => {
    setTimeout(() => {
      const card = createCard(number)
      resultList.appendChild(card)
    }, index * 4500) // 6.5s de intervalo entre cada número
  })
}

// Cria o elemento visual do número sorteado
function createCard(number) {
  const cardWrapper = document.createElement("div")
  cardWrapper.classList.add("card-wrapper")

  const retangle = document.createElement("div")
  retangle.classList.add("retangle")

  const cardNumber = document.createElement("div")
  cardNumber.classList.add("card-number")

  const numberSpan = document.createElement("span")
  numberSpan.classList.add("number-result")
  numberSpan.textContent = number

  cardNumber.appendChild(numberSpan)
  retangle.appendChild(cardNumber)
  cardWrapper.appendChild(retangle)

  return cardWrapper
}

// Botão "Sortear novamente"
restartButton.onclick = () => {
  resultContainer.style.display = "none"
  formContainer.style.display = "block"
  resultList.innerHTML = ""
  form.reset()
  quantityInput.focus()
}