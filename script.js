// Dark Mode
const darkToggle = document.getElementById('dark-toggle');
const body = document.body;

if (localStorage.getItem('dark-mode') === 'light') {
    body.classList.add('light');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        localStorage.setItem('dark-mode', 'light');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('dark-mode', 'dark');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Voltar ao topo
const topoBtn = document.getElementById('topo');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) topoBtn.style.display = 'block';
    else topoBtn.style.display = 'none';
});
topoBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Versículo do Dia (60 versículos com loop – mantenha a lista que eu mandei antes)
const verses = [
    // (cole os 60 versículos aqui)
];

function showVerse() {
    if (document.getElementById('verse-text')) {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const index = (dayOfYear - 1) % verses.length;
        const verse = verses[index];
        document.getElementById('verse-text').textContent = verse.text;
        document.getElementById('verse-ref').textContent = verse.ref;
    }
}

function shareVerse() {
    const verse = document.getElementById('verse-text').textContent + " (" + document.getElementById('verse-ref').textContent + ") - I.E.P.C";
    if (navigator.share) {
        navigator.share({text: verse});
    } else {
        alert("Versículo copiado: " + verse);
    }
}

// Notificações (permissão)
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

function notify(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {body: body, icon: 'images/icon-192.png'});
    }
}

// Lembretes espirituais ao longo do dia (10h, 12h, 14h, 16h, 18h, 20h, 22h)
function checkSpiritualReminders() {
    const hour = new Date().getHours();

    const reminders = {
        10: "Bom dia! Já orou hoje? Comece o dia na presença do Senhor 🙏",
        12: "Meio-dia! Já estudou a Bíblia hoje? Abra a Palavra e se alimente da verdade.",
        14: "Já fez seu devocional da tarde? Pare um momento e busque a Deus.",
        16: "Hora de renovar as forças! Já agradeceu a Deus hoje?",
        18: "Fim de tarde! Já meditou na Palavra? O Senhor tem uma mensagem pra você.",
        20: "Noite chegando! Já preparou seu coração pra orar antes de dormir?",
        22: "Hora de descansar na presença Dele! Já fez sua oração da noite?"
    };

    if (reminders[hour]) {
        notify("Lembrete Espiritual", reminders[hour]);
    }
}

// Executa ao carregar e a cada hora
showVerse();
checkSpiritualReminders();
setInterval(checkSpiritualReminders, 3600000); // Verifica a cada hora