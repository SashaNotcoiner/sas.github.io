// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Таймер обратного отсчета
function updateTimer() {
    const targetDate = new Date('2025-04-03T12:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div class="timer-block">${days}<span>дней</span></div>
        <div class="timer-block">${hours}<span>часов</span></div>
        <div class="timer-block">${minutes}<span>минут</span></div>
        <div class="timer-block">${seconds}<span>секунд</span></div>
    `;
}

// Навигация
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');
}

// Реферальная система
function initReferrals() {
    const userId = tg.initDataUnsafe.user?.id;
const referrerId = tg.initDataUnsafe.start_param;
    
    // Обновляем счетчик реферера
    if(referrerId && referrerId !== userId) {
        db.collection('users').doc(referrerId).update({
            referrals: firebase.firestore.FieldValue.increment(1)
        });
    }

    // Генерация ссылки
    const referralLink = `https://t.me/${tg.initDataUnsafe.user?.username}?start=${userId}`;
    document.getElementById('referral-link').value = referralLink;

    // Слушатель изменений
    db.collection('users').doc(userId).onSnapshot(doc => {
        document.getElementById('referral-count').textContent = doc.data()?.referrals || 0;
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Запускаем таймер
    setInterval(updateTimer, 1000);
    
    // Инициализируем реферальную систему
    if(tg.initDataUnsafe.user) {
        db.collection('users').doc(tg.initDataUnsafe.user.id).set({
            referrals: 0,
            created: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        initReferrals();
    }
});
