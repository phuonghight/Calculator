const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const erase = $('.erase')
const clear = $('.clear')
const numbers = $$('.number')
const result = $('.result')
const button = $$('.button')
const signs = $$('.sign')
const equal = $('.equal')
const percent = $('.percent')
const comma = $('.comma')
const negative = $('.negative')

var firstValue = ""
var isFirstValue = false
var secondValue = ""
var isSecondValue = false
var sign = ""
var value = 0

function wh() {
    button.forEach(element => {
        element.style.width = element.offsetHeight + 'px';
    });
}

wh();

numbers.forEach(e => {
    e.addEventListener('click', () => {
        if (isFirstValue == false) {
            getFirstValue(e.value)
        }
        if (isSecondValue == false) {
            getSecondValue(e.value)
        }
    });
});

function getFirstValue(e) {
    result.innerHTML = ""
    firstValue += e
    result.innerHTML = firstValue
    firstValue = +firstValue
}

function getSecondValue(e) {
    if (firstValue != "" && sign != "") {
        result.innerHTML = ""
        secondValue += e
        result.innerHTML = secondValue
        secondValue = +secondValue
    }
}

function getSign() {
    signs.forEach(e => {
        e.addEventListener('click', () => {
            sign = e.value
            isFirstValue = true
        })
    })
}

getSign()

function fix(number) {
    if (number.toString().length > 14) {
        number = Math.floor(number * Math.pow(10, 8)) / Math.pow(10, 8)
    }
    return number
}

equal.addEventListener('click', () => {
    if (sign == "+") {
        value = firstValue + secondValue
    }
    if (sign == "-") {
        value = firstValue - secondValue
    }
    if (sign == "x") {
        value = firstValue * secondValue
    }
    if (sign == "/") {
        value = firstValue / secondValue
    }
    if (!isFirstValue) {
        value = firstValue;
    }
    value = fix(value)
    result.innerHTML = value

    firstValue = value
    secondValue = ""
    isSecondValue = false
});

percent.addEventListener('click', () => {
    if (!isFirstValue) {
        firstValue /= 100
        result.innerHTML = firstValue
        firstValue = +firstValue
    }
    if (isFirstValue) {
        secondValue /= 100
        result.innerHTML = secondValue
        secondValue = +secondValue
    }
});

clear.addEventListener('click', () => {
    result.innerHTML = "0"
    firstValue = ""
    isFirstValue = false
    secondValue = ""
    isSecondValue = false
    sign = ""
    value = 0
});

erase.addEventListener('click', () => {
    result.innerHTML = result.innerHTML.substr(0, result.innerHTML.length - 1)
    console.log(result.innerHTML)
    firstValue = Number(result.innerHTML)
    console.log(firstValue)
    if (result.innerHTML === "" && !isFirstValue) {
        result.innerHTML = "0"
        firstValue = ""
        isFirstValue = false
        secondValue = ""
        isSecondValue = false
        sign = ""
        value = 0
    }
});

comma.addEventListener('click', () => {
    if (!isFirstValue) {
        firstValue += comma.value
        result.innerHTML = firstValue
    } else {
        secondValue += comma.value
        result.innerHTML = secondValue
    }
});

negative.addEventListener('click', () => {
    if (!isFirstValue) {
        firstValue = -firstValue
        result.innerHTML = firstValue
    } else {
        secondValue = -secondValue
        result.innerHTML = secondValue
    }
});