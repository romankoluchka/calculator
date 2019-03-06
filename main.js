const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

const calculate = (n1, operator, n2) => {
	const firstNum = parseFloat(n1)
	const secondNum = parseFloat(n2)
	if (operator === 'add') return firstNum + secondNum
	if (operator === 'subtract') return firstNum - secondNum
	if (operator === 'multiply') return firstNum * secondNum
	if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = (key) => {
	const { action } = key.dataset
	if (!action) return 'number'
	if (action === 'decimal') return 'decimal'
	if (action === 'add' ||
		action === 'subtract' ||
		action === 'multiply' ||
		action === 'divide')
		return 'operator'
	if (action === 'clear') return 'clear'
	if (action === 'calculate') return 'calculate'
	return action
}

const createResultString = (key, displayedNum, state) => {
	const keyType = getKeyType(key)
	const keyContent = key.textContent
	const action = key.dataset.action
	const firstValue = state.firstValue
	const modValue = state.modValue
	const operator = state.operator
	const previousKeyType = state.previousKeyType

	if (keyType === 'number') {
		if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
			return keyContent
		} else {
			return displayedNum + keyContent
		}
	}

	if (keyType === 'decimal') {
		if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate')
			return displayedNum + '.'
		if (previousKeyType === 'operator' || previousKeyType === 'calculate')
			return '0.'
		return displayedNum
	}

	if (keyType === 'operator') {
		if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
			return calculate(firstValue, operator, secondValue)
		} else {
			return displayedNum
		}
	}
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
	const keyType = getKeyType(key)
	calculator.dataset.previousKeyType = keyType
	const firstValue = calculator.dataset.firstValue

	Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

	if (keyType === 'operator') {
		key.classList.add('is-depressed')
		calculator.dataset.operator = key.dataset.action
		if (firstValue &&
			operator &&
			previousKeyType !== 'operator' &&
			previousKeyType !== 'calculate'
		) {
			calculator.dataset.firstValue = calculatedValue
		} else {
			calculator.dataset.firstValue = displayedNum
		}
	}

}

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const displayedNum = display.textContent;
		const clearButton = calculator.querySelector('[data-action=clear]')


		const resultString = createResultString(e.target, displayedNum, calculator.dataset)
		display.textContent = resultString

		updateCalculatorState(key, calculator, resultString, displayedNum)
	}
})