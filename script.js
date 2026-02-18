// ── Hoş geldin mesajı ──────────────────────────────────────────
window.addEventListener('load', function () {
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg) {
        setTimeout(function () {
            welcomeMsg.style.opacity = '0';
            setTimeout(function () {
                welcomeMsg.style.display = 'none';
            }, 500);
        }, 3000);
    }
});

// ── Yukarı çık butonu ──────────────────────────────────────────
const scrollButton = document.getElementById('scroll-to-top');
if (scrollButton) {
    window.addEventListener('scroll', function () {
        scrollButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    scrollButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Canlı saat ─────────────────────────────────────────────────
function updateClock() {
    const el = document.getElementById('live-clock');
    if (!el) return;
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    el.textContent = '🕐 ' + new Date().toLocaleDateString('tr-TR', options);
}
updateClock();
setInterval(updateClock, 1000);

// ── Ziyaretçi sayacı ───────────────────────────────────────────
(function () {
    let count = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
    localStorage.setItem('visitorCount', count);
    const el = document.getElementById('visitor-count');
    if (el) el.textContent = `👁️ Bu sayfa ${count} kez ziyaret edildi`;
})();

// ── EMAIL → Direkt Gmail Compose ───────────────────────────────
// Linke tıklayınca Gmail'de yeni mail ekranı açılır.
const emailLink = document.getElementById('email-link');
if (emailLink) {
    const TO      = 'nrtndmr4549@gmail.com';
    const SUBJECT = encodeURIComponent('Merhaba Nurten!');
    const BODY    = encodeURIComponent('Merhaba Nurten,\n\n');

    // Gmail compose URL (web tarayıcıda açar)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${TO}&su=${SUBJECT}&body=${BODY}`;

    emailLink.setAttribute('href', gmailUrl);
    emailLink.setAttribute('target', '_blank');
    emailLink.setAttribute('rel', 'noopener noreferrer');
    emailLink.setAttribute('title', "Gmail'de yeni mail aç");
}

// ── Karanlık mod ───────────────────────────────────────────────
const darkBtn = document.getElementById('dark-mode-btn');
if (darkBtn) {
    // Sayfa açılışında kayıtlı tercihi yükle
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkBtn.textContent = '☀️ Aydınlık Mod';
    }

    darkBtn.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-mode');
        darkBtn.textContent   = isDark ? '☀️ Aydınlık Mod' : '🌙 Karanlık Mod';
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
}

// ── Yumuşak kaydırma menüsü ────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Proje filtreleme ───────────────────────────────────────────
const filterButtons = document.querySelectorAll('.filter-btn');
const miniProjects  = document.querySelectorAll('.mini-project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        miniProjects.forEach(project => {
            const show = filterValue === 'all' ||
                         project.getAttribute('data-category') === filterValue;
            project.style.display = show ? 'block' : 'none';
        });
    });
});

// ── Devamını oku butonları ─────────────────────────────────────
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function () {
        const details = this.closest('.project-item').querySelector('.project-details');
        if (!details) return;
        const open = details.style.display !== 'none';
        details.style.display   = open ? 'none'  : 'block';
        this.textContent         = open ? '📖 Devamını Oku' : '📕 Daha Az Göster';
    });
});

// ── AI chat popup ──────────────────────────────────────────────
const aiBtn      = document.getElementById('ai-chat-btn');
const aiPopup    = document.getElementById('ai-popup');
const closeAiBtn = document.getElementById('close-ai-popup');

if (aiBtn && aiPopup && closeAiBtn) {
    aiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        aiPopup.style.display = aiPopup.style.display === 'none' ? 'block' : 'none';
    });
    closeAiBtn.addEventListener('click', () => { aiPopup.style.display = 'none'; });
    document.addEventListener('click', (e) => {
        if (!aiBtn.contains(e.target) && !aiPopup.contains(e.target)) {
            aiPopup.style.display = 'none';
        }
    });
}