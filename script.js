document.addEventListener('DOMContentLoaded', function() {
    const resultField = document.getElementById('result');
    const buttons = document.querySelectorAll('.keys button');
    let lastClickedButton = null; // Variable to track the last clicked button

    // Initialize calculator display to '0'
    resultField.value = '0';

    // Loop through each button and attach click event listener
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            const buttonText = buttons[i].textContent;

            // Handle number buttons and decimal point
            if ((buttonText >= '0' && buttonText <= '9') || buttonText === '.') {
                if (resultField.value === '0' || resultField.value === 'Error') {
                    resultField.value = ''; // Clear initial '0' or 'Error' message
                }
                resultField.value += buttonText; // Append number or decimal point

            // Handle operator buttons (+, -, *, /)
            } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
                if (lastClickedButton === null || !isOperator(lastClickedButton.textContent)) {
                    resultField.value += buttonText; // Append operator if last click wasn't an operator
                }
            // Handle clear button
            } else if (buttonText === 'C') {
                resultField.value = '0'; // Reset to '0'

            // Handle equal button
            } else if (buttonText === '=') {
                try {
                    const expression = resultField.value;
                    const result = eval(expression);
                    if (isNaN(result) || !isFinite(result)) {
                        resultField.value = 'Error'; // Display 'Error' for invalid calculation
                    } else {
                        resultField.value = result; // Display calculated result
                    }
                } catch (error) {
                    resultField.value = 'Error'; // Display 'Error' for other exceptions
                }
            }

            // Update last clicked button
            lastClickedButton = buttons[i];
        });
    }

    // Function to check if a button is an operator
    function isOperator(buttonText) {
        return buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/';
    }
});
