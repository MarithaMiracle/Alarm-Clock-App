// Clock Functionality (remains the same)
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('clock2');

function updateClock() {
    if (clockElement && dateElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString(undefined, options);

        clockElement.textContent = timeString;
        dateElement.textContent = dateString;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Alarm Setup
const alarmInput = document.getElementById('alarm');
const alarmSetBtn = document.getElementById('alarmsubmit');
const alarmStopBtn = document.getElementById('alarmstop');
const alarmAlert = document.querySelector('.alarmAlert');
const alarmEmoji = document.getElementById('alarm-clock-emoji');
const alarmAudio = document.getElementById('my-audio');
const ringingClockContainer = document.getElementById('ringing-clock-container'); // Get the container
const calendarSection = document.getElementById('calendar-section'); // Get the calendar section
const alarmSection = document.querySelector('.alarm'); // Get the alarm section

let alarmTimeout;

function startAlarm() {
    if (alarmAudio) {
        alarmAudio.play();
    }
    if (ringingClockContainer) {
        ringingClockContainer.style.display = 'flex'; // Show the GIF container
    }
    if (calendarSection) {
        calendarSection.style.display = 'none'; // Hide the calendar
    }
    if (alarmEmoji) {
        alarmEmoji.style.display = 'none';
    }
    if (alarmAlert) {
        alarmAlert.textContent = '⏰ Alarm ringing!';
    }
    if (alarmSection) {
        alarmSection.style.justifyContent = 'center'; // Center the content horizontally
        alarmSection.style.alignItems = 'center'; // Center the content vertically
        alarmSection.style.flexDirection = 'column'; // Ensure items are stacked
    }
}

function stopAlarm() {
    if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }
    if (ringingClockContainer) {
        ringingClockContainer.style.display = 'none'; // Hide the GIF container
    }
    if (calendarSection) {
        calendarSection.style.display = 'block'; // Show the calendar again
    }
    if (alarmEmoji) {
        alarmEmoji.style.display = 'block';
    }
    if (alarmAlert) {
        alarmAlert.textContent = 'Alarm stopped.';
    }
    if (alarmSection) {
        alarmSection.style.justifyContent = ''; // Reset to default
        alarmSection.style.alignItems = ''; // Reset to default
        alarmSection.style.flexDirection = ''; // Reset to default
    }
    clearTimeout(alarmTimeout);
}

if (alarmSetBtn) {
    alarmSetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!alarmInput || !alarmInput.value) {
            alert('Please set a valid alarm time.');
            return;
        }

        const alarmTime = new Date(alarmInput.value).getTime();
        const now = Date.now();

        if (alarmTime <= now) {
            alert('Please set a future time.');
            return;
        }

        const timeToAlarm = alarmTime - now;

        if (alarmAlert) {
            alarmAlert.textContent = `Alarm set for ${new Date(alarmTime).toLocaleString()}`;
        }

        clearTimeout(alarmTimeout);
        alarmTimeout = setTimeout(startAlarm, timeToAlarm);
    });
}

if (alarmStopBtn) {
    alarmStopBtn.addEventListener('click', stopAlarm);
}

// Calendar Setup (remains the same)
const monthPicker = document.getElementById('month-picker');
const yearDisplay = document.getElementById('year');
const prevYearBtn = document.getElementById('prev-year');
const nextYearBtn = document.getElementById('next-year');
const monthList = document.querySelector('.month-list');
const calendarDays = document.querySelector('.calendar-days');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    if (calendarDays) {
        calendarDays.style.animation = 'pageTurn 0.6s ease-in-out';

        calendarDays.addEventListener('animationend', () => {
            calendarDays.style.animation = '';
        }, { once: true });

        calendarDays.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        if (monthPicker) {
            monthPicker.textContent = months[month];
        }
        if (yearDisplay) {
            yearDisplay.textContent = year;
        }

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            const today = new Date();
            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayDiv.classList.add('curr-date');
            }

            calendarDays.appendChild(dayDiv);
        }
    }
}

if (monthPicker && monthList) {
    monthPicker.addEventListener('click', () => {
        monthList.classList.toggle('show');
    });
}

if (monthList) {
    monthList.querySelectorAll('div > div').forEach((monthDiv, idx) => {
        monthDiv.addEventListener('click', () => {
            currentMonth = idx;
            if (monthList) {
                monthList.classList.remove('show');
            }
            renderCalendar(currentMonth, currentYear);
        });
    });
}

if (prevYearBtn) {
    prevYearBtn.addEventListener('click', () => {
        currentYear--;
        renderCalendar(currentMonth, currentYear);
    });
}

if (nextYearBtn) {
    nextYearBtn.addEventListener('click', () => {
        currentYear++;
        renderCalendar(currentMonth, currentYear);
    });
}

renderCalendar(currentMonth, currentYear);