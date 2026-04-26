let array = [];
let steps = [];
let currentStep = 0;
let isPlaying = false;

let comparisons = 0;
let swaps = 0;

function generateArray() {
    array = [];
    steps = [];
    currentStep = 0;
    comparisons = 0;
    swaps = 0;

    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }

    renderArray(array);
    generateSteps();
    updateStats();
}

function renderArray(arr, highlight = {}) {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";

        if (highlight.compare && highlight.compare.includes(index)) {
            bar.classList.add("compare");
        }

        if (highlight.swap && highlight.swap.includes(index)) {
            bar.classList.add("swap");
        }

        container.appendChild(bar);
    });
}

function saveStep(arr, compare = [], swap = []) {
    steps.push({
        array: [...arr],
        compare,
        swap
    });
}

// Bubble Sort
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
    }
}

// Selection Sort
function selectionSort() {
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            comparisons++;
            saveStep(arr, [min, j]);

            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        swaps++;
        [arr[i], arr[min]] = [arr[min], arr[i]];
        saveStep(arr, [], [i, min]);
    }
}

// Insertion Sort
function insertionSort() {
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            comparisons++;
            arr[j + 1] = arr[j];
            saveStep(arr, [j, j + 1]);
            j--;
        }

        arr[j + 1] = key;
        swaps++;
        saveStep(arr, [], [j + 1, i]);
    }
}

// Generate steps
function generateSteps() {
    let algo = document.getElementById("algorithm").value;

    if (algo === "bubble") bubbleSort();
    if (algo === "selection") selectionSort();
    if (algo === "insertion") insertionSort();
}

// Controls
function nextStep() {
    if (currentStep < steps.length) {
        let step = steps[currentStep];
        renderArray(step.array, step);
        currentStep++;
        updateStats();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        let step = steps[currentStep];
        renderArray(step.array, step);
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

function updateStats() {
    document.getElementById("stats").innerText =
        `Comparisons: ${comparisons} | Swaps: ${swaps}`;
}

// Init
generateArray();