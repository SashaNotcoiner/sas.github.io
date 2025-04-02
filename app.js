// Замените содержимое firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyBk...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-bucket.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcde..."
};

// Инициализация Firebase с проверкой
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Функция для обработки рефералов
async function handleReferral(referrerId, userId) {
  try {
    const userRef = db.collection('users').doc(referrerId);
    const doc = await userRef.get();

    if (!doc.exists) {
      await userRef.set({
        referrals: 1,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await userRef.update({
        referrals: firebase.firestore.FieldValue.increment(1)
      });
    }
  } catch (error) {
    console.error('Referral error:', error);
  }
}

// Обновленная функция initReferrals
function initReferrals() {
  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe.user?.id;
  const referrerId = tg.initDataUnsafe.start_param;

  if (userId && referrerId && referrerId !== userId) {
    handleReferral(referrerId, userId);
  }

  // Генерация реферальной ссылки
  const referralLink = `https://t.me/${tg.initDataUnsafe.user?.username}?start=${userId}`;
  document.getElementById('referral-link').value = referralLink;

  // Отслеживание изменений
  db.collection('users').doc(userId).onSnapshot((doc) => {
    const data = doc.data();
    document.getElementById('referral-count').textContent = data?.referrals || 0;
  }, (error) => {
    console.error('Snapshot error:', error);
  });
}

