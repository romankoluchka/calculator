const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType
		const firstValue = calculator.dataset.firstValue
		const operator = calculator.dataset.operator
		const secondValue = displayedNum
		const clearButton = calculator.querySelector('[data-action=clear]')
		const calculate = (n1, operator, n2) => {
			const firstNum = parseFloat(n1)
			const secondNum = parseFloat(n2)
			if (operator === 'add') return firstNum + secondNum
			if (operator === 'subtract') return firstNum - secondNum
			if (operator === 'multiply') return firstNum * secondNum
			if (operator === 'divide') return firstNum / secondNum
		}

		Array.from(key.parentNode.children)
			.forEach(k => k.classList.remove('is-depressed'))
		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
				display.textContent = keyContent
			} else {
				display.textContent = displayedNum + keyContent
			}
			calculator.dataset.previousKeyType = 'number'
		}
		if (action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide') {
			if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
				const calcValue = calculate(firstValue, operator, secondValue)
				display.textContent = calcValue
				calculator.dataset.firstValue = calcValue
			} else {
				calculator.dataset.firstValue = displayedNum
			}
			key.classList.add('is-depressed')
			calculator.dataset.previousKeyType = 'operator'
			calculator.dataset.operator = action
		}
		if (action === 'decimal') {
			if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
				display.textContent = displayedNum + '.'
			} else {
				display.textContent = '0.'
			}
			calculator.dataset.previousKeyType = 'decimal'
		}
		if (action === 'clear') {
			if (clearButton.textContent === 'AC') {
				calculator.dataset.previousKeyType = ''
				calculator.dataset.firstValue = ''
				calculator.dataset.operator = ''
				calculator.dataset.modValue = ''
			}
			display.textContent = '0'
			clearButton.textContent = 'AC'
			calculator.dataset.previousKeyType = 'clear'
		}
		if (action !== 'clear') {
			clearButton.textContent = 'CE'
		}
		if (action === 'calculate') {
			let firstValue = calculator.dataset.firstValue
			let secondValue = displayedNum
			if (firstValue) {
				if (previousKeyType === 'calculate') {
					firstValue = displayedNum
					secondValue = calculator.dataset.modValue
				}
				display.textContent = calculate(firstValue, operator, secondValue)
			}
			calculator.dataset.modValue = secondValue
			calculator.dataset.previousKeyType = 'calculate'
		}
	}
});


