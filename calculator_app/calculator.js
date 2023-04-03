//Select All Elements
const inputElement = document.querySelector(".input");
const operationValueElement = document.querySelector(".operation .value");
const resultValueElement = document.querySelector(".result .value");

//Created Object Property which is inside Array
let calculatorButtons = [
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];

function createCalculatorButton() {
  const btnPerRow = 4;
  let addedBtn = 0;

  calculatorButtons.forEach((button, index) => {
    //0/4, 1/4, 2/4, 3/4, 4/4, 5/4--18/4.
    if (addedBtn % btnPerRow == 0) {
      inputElement.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;

    addedBtn++;
  });
}
createCalculatorButton();

//ClickEvent (inputElement)
inputElement.addEventListener("click", (event) => {
  const targetElement = event.target;
  //match targetID and ArrayList name(calculatorButtons)
  calculatorButtons.forEach((button) => {
    if (targetElement.id === button.name) {
      calculator(button);
    }
  });
});

//
//Creating empty array inside object
let data = {
  operation: [],
  result: [],
};

//
//calculator Function
function calculator(button) {
  if (button.type === "number") {
    data.operation.push(button.symbol);
    data.result.push(button.formula);
  } else if (button.type === "operator") {
    data.operation.push(button.symbol);
    data.result.push(button.formula);
  } else if (button.type === "key") {
    if (button.name === "clear") {
      data.operation = [];
      data.result = [];
      updateOutputResult(0);
    } else if (button.name === "delete") {
      data.operation.pop();
      data.result.pop();
    }
  } else if (button.type === "calculate") {
    //join method join multiple indexNumber into single
    //and join value is inside string.
    let joinResult = data.result.join("");
    //consider addition but value is in integer inside string("20+30")
    //eval method evaluates string values & executes it.
    let result;
    try {
      result = eval(joinResult);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }

    //if number is greater then 10 digit
    //then execute formatResult function
    result = formatResult(result);

    updateOutputResult(result);

    data.operation = [];
    data.result = [];

    //For further calculation so need to push
    data.operation.push(result);
    data.result.push(result);

    return;
    //if i don't use return then updateOutputOperation function is executed.It display operationValue to the user Interface.
  }
  updateOutputOperation(data.operation.join(""));
}

//
//Joining Array value & then value is in string
//Each array index value join in string
function updateOutputOperation(operation) {
  operationValueElement.innerHTML = operation;
}
function updateOutputResult(result) {
  resultValueElement.innerHTML = result;
}

//formatResult Function
function formatResult(result) {
  const maxOutputNumberLength = 10;
  //if number is greater than 10 (2.1245+e7);
  //toPrecision doesn't count (.)
  const outputPrecision = 5;

  if (digitCounter(result) > maxOutputNumberLength) {
    //check result is float or not
    if (isFloat(result)) {
      //number is inside string convert into integer
      //doesn't count after decimal number
      const resultInt = parseInt(result);
      const resultIntLength = digitCounter(resultInt);
      if (resultIntLength > maxOutputNumberLength) {
        return result.toPrecision(outputPrecision);
      } else {
        let num_of_digits_after_point = maxOutputNumberLength - resultIntLength;
        return result.toFixed(num_of_digits_after_point);
      }
    } else {
      //if number is integer
      return result.toPrecision(outputPrecision);
    }
  } else {
    //if number is less than 10 digit then return result
    return result;
  }
}

function digitCounter(number) {
  return number.toString().length;
}
function isFloat(number) {
  return number % 1 != 0;
}
