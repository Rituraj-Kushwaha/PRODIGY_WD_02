let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Function to update the display with the current time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Function to format time in mm:ss:ms format
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Start or pause the timer
startStopButton.addEventListener('click', () => {
    if (!running) {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
        startStopButton.style.backgroundColor = '#2575fc';
        running = true;
    } else {
        // Pause the timer
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = '#ffffff';
        running = false;
    }
});

// Reset the timer
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    startTime = 0;
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#ffffff';
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
});

// Record a lap time
lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
});
