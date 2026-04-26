let array = [];
let steps = [];
let currentStep = 0;
let isPlaying = false;

let comparisons = 0;
let swaps = 0;

// 🔥 USER INPUT
function useUserInput() {
    let input = document.getElementById("userInput").value;
    array = input.split(",").map(Number);

    steps = [];
    currentStep = 0;
    comparisons = 0;
    swaps = 0;

    renderArray(array);
    generateSteps();
}

// RANDOM ARRAY
function generateArray() {
    array = [];
    steps = [];
    currentStep = 0;
    comparisons = 0;
    swaps = 0;

    for (let i = 0; i < 15; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }

    renderArray(array);
    generateSteps();
}

// RENDER
function renderArray(arr, highlight = {}) {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";

        // show value
        const label = document.createElement("span");
        label.innerText = value;
        bar.appendChild(label);

        if (highlight.compare?.includes(index)) {
            bar.classList.add("compare");
        }

        if (highlight.swap?.includes(index)) {
            bar.classList.add("swap");
        }

        if (highlight.sorted?.includes(index)) {
            bar.classList.add("sorted");
        }

        container.appendChild(bar);
    });
}

// SAVE STEP
function saveStep(arr, compare = [], swap = [], sorted = []) {
    steps.push({
        array: [...arr],
        compare,
        swap,
        sorted
    });
}

// BUBBLE SORT
function bubbleSort() {
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {

            comparisons++;
            saveStep(arr, [j, j + 1]);

            if (arr[j] > arr[j + 1]) {
                swaps++;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                saveStep(arr, [], [j, j + 1]);
            }
        }

        saveStep(arr, [], [], [arr.length - i - 1]);
    }
}

// GENERATE STEPS
function generateSteps() {
    let algo = document.getElementById("algorithm").value;

    if (algo === "bubble") bubbleSort();
}

// CONTROLS
function nextStep() {
    if (currentStep < steps.length) {
        renderArray(steps[currentStep].array, steps[currentStep]);
        currentStep++;
        updateStats();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderArray(steps[currentStep].array, steps[currentStep]);
        updateStats();
    }
}

function playPause() {
    isPlaying = !isPlaying;
    if (isPlaying) autoPlay();
}

function autoPlay() {
    if (!isPlaying) return;

    let speed = document.getElementById("speed").value;

    setTimeout(() => {
        nextStep();
        autoPlay();
    }, speed);
}

function reset() {
    generateArray();
}

// STATS
function updateStats() {
    document.getElementById("stats").innerText =
        `Comparisons: ${comparisons} | Swaps: ${swaps}`;
}

// INIT
generateArray();
