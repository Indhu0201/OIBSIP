const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const operators = ["%", "*", "/", "-", "+", "="];

let expression = "";

// Function to process button input using if-else
function processInput(key) {
  // Prevent starting with operator except minus
  if (expression === "" && operators.indexOf(key) !== -1 && key !== "-") {
    return; // Ignore invalid start
  }

  if (key === "AC") {
    expression = "";
  } else if (key === "DEL") {
    expression = expression.slice(0, -1);
  } else if (key === "=") {
    try {
      // Replace all '%' with '/100'
      let sanitizedExpression = "";
      for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "%") {
          sanitizedExpression += "/100";
        } else {
          sanitizedExpression += expression[i];
        }
      }
      // Use eval to calculate result
      expression = eval(sanitizedExpression).toString();
    } catch (error) {
      expression = "Error";
    }
  } else {
    // Append the key pressed
    expression += key;
  }

  screen.value = expression;
}

// Add event listeners using a loop
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let keyValue = buttons[i].getAttribute("data-key");
    processInput(keyValue);
  });
}
