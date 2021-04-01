
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    doOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const firstInput = parseFloat(this.previousOperand)
        const secondInput = parseFloat(this.currentOperand)
        
        switch (this.operation) {
            case '+':
                computation = firstInput + secondInput
                break
            case '-':
                computation = firstInput - secondInput 
                break
            case 'x':
                computation = firstInput * secondInput
                break
            case '÷':
                computation = firstInput / secondInput
                break
            case '+/-':
                if (firstInput > 0 || firstInpute < 0) {
                    computation = -1 * firstInput
                } else {
                    computation = undefined
                }
                break
            case '%':
                computation = firstInput / 100
                break
            default: 
                return
        }

        this.currentOperand = computation 
        this.operation = undefined
        this.previousOperand = ''
    }

    displayNumber(number) {
        const stringNumber = number.toString()
        const integer = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1]

        let integerNumber 
        if (isNaN(integer)) {
            integerNumber = ''
        } else {
            integerNumber = integer.toLocaleString('en')
        }
        if (decimal != null) {
            return `${integerNumber}.${decimal}`
        } else {
            return integerNumber
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.displayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = 
            `${this.displayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }

}

const previousOperandText = document.querySelector('.previous-operand')
const currentOperandText = document.querySelector('.current-operand')
const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const clearButton = document.querySelector('.clear')
const signChangeButton = document.querySelector('.sign-change')
const percentButton = document.querySelector('.percent')
const equalButton = document.querySelector('.equal')




const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.doOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})


