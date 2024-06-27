const buttonTxt = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "x",
    "1",
    "2",
    "3",
    "+",
    "=",
    "0",
    "C",
    "-",
];
const container = document.querySelector(".container");
const screen = document.createElement("input");
screen.setAttribute("class", "screen-txt");
screen.placeholder = "0";
container.appendChild(screen);

const buttonz = document.createElement("div");
buttonz.setAttribute("class", "btn-div");
container.appendChild(buttonz);
buttonTxt.forEach((element) => {
    const button = document.createElement("button");
    button.innerText = element;
    button.classList.add("btn");
    button.addEventListener("click", buttonClick);
    buttonz.appendChild(button);
});

let currentInput = "";

let result = false;
function buttonClick(event) {
    handleInput(event.target.innerText);
}
function handleInput(value) {
    if (value === "=") {
        result = true;
        try {
            currentInput = eval(currentInput.replace(/x/g, "*"));

            if (!Number.isInteger(currentInput)) {
                currentInput = currentInput.toFixed(2);
            }
        } catch {
            currentInput = "Error";
        }
    } else if (value === "C") {
        currentInput = " ";
        result = false;
    } else {
        if (result) {
            // currentInput = value;
            // result = false;
            if (["+", "-", "/", "*", "x"].includes(value)) {
                currentInput += value;
            } else {
                currentInput = value;
            }
            result = false;
        } else {
            currentInput += value;
        }
    }

    screen.value = currentInput;
}
document.addEventListener("keydown", (e) => {
    const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "/",
        "*",
        "x",
        "=",
    ];

    if (allowedKeys.includes(e.key)) {
        e.preventDefault();
        handleInput(e.key);
    } else if (e.key === "Enter") {
        e.preventDefault();
        handleInput("=");
    } else if (e.key === "Backspace") {
        e.preventDefault();
        currentInput = currentInput.slice(0, -1);
        screen.value = currentInput;
    }
});
