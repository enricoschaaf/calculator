const $ = document.querySelector.bind(document)
const eq = $("#equation")
const special = ["+", "-", "×", "÷", "."]

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
}

getEquation() === null ? reset() : (eq.textContent = getEquation())

document
  .querySelectorAll("button[data-value]")
  .forEach((e) => e.addEventListener("click", () => input(e.dataset.value)))

$("#equals").addEventListener("click", equals)
$("#reset").addEventListener("click", reset)

addEventListener("keydown", ({ key }) => {
  if (
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "+",
      "-",
      "/",
      "*",
    ].includes(key)
  ) {
    return input(key.replace("/", "÷").replace("*", "×"))
  }

  if (["=", "Enter"].includes(key)) {
    return equals()
  }

  if (key === "Backspace") {
    return backspace()
  }
})

function equals() {
  setEquation(eval(eq.textContent.replace("÷", "/").replace("×", "*")))
}

function input(value) {
  if (eq.textContent === "0" && !special.includes(value)) {
    eq.textContent = value
  } else if (
    special.includes(eq.textContent.split("").pop()) &&
    special.includes(value)
  ) {
    eq.textContent = eq.textContent.substr(0, eq.textContent.length - 1) + value
  } else {
    eq.textContent += value
  }
  eq.scrollLeft = eq.scrollWidth
  localStorage.setItem("equation", eq.textContent)
}

function setEquation(value) {
  eq.textContent = value
  localStorage.setItem("equation", value)
}

function backspace() {
  eq.textContent =
    eq.textContent.length === 1
      ? 0
      : eq.textContent.substr(0, eq.textContent.length - 1)
}

function reset() {
  setEquation(0)
}
function getEquation() {
  return localStorage.getItem("equation")
}
