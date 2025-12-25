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

// Versículo do Dia (365 versículos – exemplo com 30, adicione mais se quiser)
const verses = [
    {text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", ref: "João 3:16"},
    {text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1"},
    {text: "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.", ref: "Jeremias 29:11"},
    {text: "E tudo quanto pedirdes em meu nome, isso farei, a fim de que o Pai seja glorificado no Filho.", ref: "João 14:13"},
    {text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.", ref: "Isaías 41:10"},
    // Adicione mais até 365 (posso mandar mais se quiser)
    {text: "Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", ref: "Mateus 6:33"},
    {text: "O amor é paciente, é bondoso. O amor não arde em ciúmes, não se ufana, não se ensoberbece.", ref: "1 Coríntios 13:4"},
    // ... complete com mais versículos
];

function showVerse() {
    if (document.getElementById('verse-text')) {
        const day = new Date().getDate() - 1; // Dia do mês (0-30)
        const verse = verses[day % verses.length];
        document.getElementById('verse-text').textContent = verse.text;
        document.getElementById('verse-ref').textContent = verse.ref;
    }
}

function shareVerse() {
    const verse = document.getElementById('verse-text').textContent + " " + document.getElementById('verse-ref').textContent + " - I.E.P.C";
    if (navigator.share) {
        navigator.share({text: verse});
    } else {
        alert("Versículo copiado: " + verse);
    }
}

// Notificações (permissão e alertas)
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

function notify(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {body: body, icon: 'images/icon-192.png'});
    }
}

// Alertas específicos
function checkReminders() {
    const today = new Date().getDay(); // 0 = domingo, 5 = sexta
    const hour = new Date().getHours();

    if (today === 0) { // Domingo
        notify("Lembrete de Culto", "Hoje tem culto às 15h! Venha adorar com a família I.E.P.C 🙏");
    }

    if (today === 5) { // Sexta (ajuste se ceia for outro dia)
        notify("Lembrete de Ceia", "Hoje tem Santa Ceia! Prepare seu coração.");
    }

    if (hour === 7) { // 7h da manhã (acordar cedo)
        notify("Bom dia!", "Levante e ore! Deus tem uma bênção pra você hoje.");
    }
}

// Executa ao carregar
showVerse();
checkReminders();