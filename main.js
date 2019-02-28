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

		Array.from(key.parentNode.children)
			.forEach(k => k.classList.remove('is-depressed'))
		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator') {
				display.textContent = keyContent
			} else {
				display.textContent = displayedNum + keyContent
			}
		}
		if (action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide') {
			key.classList.add('is-depressed')
			calculator.dataset.previousKeyType = 'operator'
			calculator.dataset.firstValue = displayedNum
			calculator.dataset.operator = action
		}
		if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent = displayedNum + '.'
			} else if (previousKeyType === 'operator') {
				display.textContent = '0.'
			}
			calculator.dataset.previousKeyType = 'decimal'
		}
		if (action === 'clear') {

		}
		if (action === 'calculate') {
			const calculate = (n1, operator, n2) => {
				let result = ''
				if (operator === 'add') {
					result = parseFloat(n1) + parseFloat(n2)
				} else if (operator === 'subtract') {
					result = parseFloat(n1) - parseFloat(n2)
				} else if (operator === 'multiply') {
					result = parseFloat(n1) * parseFloat(n2)
				} else if (operator === 'divide') {
					result = parseFloat(n1) / parseFloat(n2)
				}
				return result
			}
			const secondValue = displayedNum
			const firstValue = calculator.dataset.firstValue
			const operator = calculator.dataset.operator
			display.textContent = calculate(firstValue, operator, secondValue)
		}
	}
});


