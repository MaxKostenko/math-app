// Simple Calculator App with Vanilla JavaScript

class Calculator {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const value = e.target.dataset.value;
                this.handleInput(value);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.handleInput(e.key);
            } else if (e.key === '.') {
                this.handleInput('.');
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.handleInput(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                this.handleInput('=');
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                this.handleInput('C');
            }
        });
    }

    handleInput(value) {
        if (value >= '0' && value <= '9') {
            this.inputNumber(value);
        } else if (value === '.') {
            this.inputDecimal();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            this.inputOperator(value);
        } else if (value === '=') {
            this.calculate();
        } else if (value === 'C') {
            this.clear();
        }
    }

    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentValue = num;
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operator) {
            const result = this.performCalculation(this.operator, this.previousValue, inputValue);
            this.currentValue = String(result);
            this.previousValue = result;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }

    calculate() {
        const inputValue = parseFloat(this.currentValue);

        if (this.operator && this.previousValue !== '') {
            const result = this.performCalculation(this.operator, this.previousValue, inputValue);
            this.currentValue = String(result);
            this.previousValue = '';
            this.operator = null;
            this.waitingForOperand = true;
            this.updateDisplay();
        }
    }

    performCalculation(operator, leftOperand, rightOperand) {
        switch (operator) {
            case '+':
                return leftOperand + rightOperand;
            case '-':
                return leftOperand - rightOperand;
            case '*':
                return leftOperand * rightOperand;
            case '/':
                return rightOperand !== 0 ? leftOperand / rightOperand : 0;
            default:
                return rightOperand;
        }
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent = this.currentValue;
    }
}

// Initialize the calculator when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
