// app.js
const tg = window.Telegram.WebApp;
tg.expand();

// Установка таймера на 1 минуту
const startTime = new Date().getTime();
const targetDate = startTime + 60000; // 60 секунд

function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(interval);
        document.getElementById('button-container').style.display = 'block';
        document.querySelector('.timer').style.display = 'none';
        return;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

const interval = setInterval(updateTimer, 1000);
updateTimer();

// Обработка ссылки через Telegram API
document.querySelector('.tg-button').addEventListener('click', (e) => {
    e.preventDefault();
    tg.openLink(e.target.href);
});