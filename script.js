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

// 60 Versículos do Dia (loop)
const verses = [
    {text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", ref: "João 3:16"},
    {text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1"},
    {text: "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal.", ref: "Jeremias 29:11"},
    {text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", ref: "Isaías 41:10"},
    {text: "Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", ref: "Mateus 6:33"},
    {text: "O amor é paciente, é bondoso. O amor não arde em ciúmes.", ref: "1 Coríntios 13:4"},
    {text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", ref: "1 Tessalonicenses 5:18"},
    {text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27:1"},
    {text: "Confiai no Senhor de todo o vosso coração e não vos estribeis no vosso entendimento.", ref: "Provérbios 3:5"},
    {text: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13"},
    {text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", ref: "Salmos 46:1"},
    {text: "O justo viverá pela fé.", ref: "Habacuque 2:4"},
    {text: "Bem-aventurados os limpos de coração, porque eles verão a Deus.", ref: "Mateus 5:8"},
    {text: "O Senhor é bom, uma fortaleza no dia da angústia.", ref: "Naum 1:7"},
    {text: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.", ref: "Romanos 12:12"},
    {text: "O temor do Senhor é o princípio da sabedoria.", ref: "Provérbios 9:10"},
    {text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", ref: "Mateus 11:28"},
    {text: "O Senhor é misericordioso e piedoso, tardio em irar-se e grande em benignidade.", ref: "Salmos 103:8"},
    {text: "Porque para Deus nada é impossível.", ref: "Lucas 1:37"},
    {text: "O Senhor te abençoe e te guarde.", ref: "Números 6:24"},
    {text: "A palavra de Deus é viva e eficaz.", ref: "Hebreus 4:12"},
    {text: "Deus é amor.", ref: "1 João 4:8"},
    {text: "O Senhor é o meu rochedo, a minha fortaleza e o meu libertador.", ref: "Salmos 18:2"},
    {text: "Aquele que começou a boa obra em vós há de completá-la.", ref: "Filipenses 1:6"},
    {text: "Bem-aventurado o homem que suporta a tentação.", ref: "Tiago 1:12"},
    {text: "O Senhor é bom para todos, e as suas misericórdias são sobre todas as suas obras.", ref: "Salmos 145:9"},
    {text: "O Senhor é o meu alto refúgio.", ref: "Salmos 9:9"},
    {text: "O Senhor é bom para os que esperam por ele.", ref: "Lamentações 3:25"},
    {text: "O Senhor é a minha força e o meu cântico; ele me foi por salvação.", ref: "Êxodo 15:2"},
    {text: "Confia no Senhor e faze o bem; habitarás na terra e te alimentarás da verdade.", ref: "Salmos 37:3"},
    {text: "O Senhor é bom, a sua misericórdia dura para sempre.", ref: "Salmos 100:5"},
    {text: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.", ref: "Salmos 119:105"},
    {text: "Deus é fiel.", ref: "1 Coríntios 1:9"},
    {text: "O Senhor é o meu ajudador; não temerei o que me possa fazer o homem.", ref: "Hebreus 13:6"},
    {text: "O Senhor é o meu refúgio.", ref: "Salmos 91:2"},
    {text: "A paz de Deus guardará os vossos corações.", ref: "Filipenses 4:7"},
    {text: "O Senhor é grande e digno de ser louvado.", ref: "Salmos 145:3"},
    {text: "O Senhor é o meu Deus de geração em geração.", ref: "Salmos 90:1"},
    {text: "O Senhor é justo em todos os seus caminhos.", ref: "Salmos 145:17"},
    {text: "O Senhor é compassivo e misericordioso.", ref: "Tiago 5:11"},
    {text: "O Senhor é o meu alto refúgio.", ref: "Salmos 9:9"},
    {text: "O Senhor é bom para os que esperam por ele.", ref: "Lamentações 3:25"},
    {text: "O Senhor é a minha rocha.", ref: "Salmos 18:2"},
    {text: "O Senhor é o meu libertador.", ref: "2 Samuel 22:2"},
    {text: "O Senhor é o meu escudo.", ref: "Salmos 28:7"},
    {text: "O Senhor é a minha força.", ref: "Êxodo 15:2"},
    {text: "O Senhor é o meu cântico.", ref: "Isaías 12:2"},
    {text: "O Senhor é a minha salvação.", ref: "Isaías 12:2"},
    {text: "O Senhor é o meu Deus.", ref: "Êxodo 15:2"},
    {text: "O Senhor é o meu rei.", ref: "Salmos 44:4"},
    {text: "O Senhor é o meu juiz.", ref: "Isaías 33:22"},
    {text: "O Senhor é o meu legislador.", ref: "Isaías 33:22"},
    {text: "O Senhor supre todas as minhas necessidades.", ref: "Filipenses 4:19"},
    {text: "Jesus Cristo é o mesmo ontem, hoje e eternamente.", ref: "Hebreus 13:8"},
    {text: "A salvação é pela graça, mediante a fé.", ref: "Efésios 2:8"},
    {text: "O Espírito Santo vos guiará a toda a verdade.", ref: "João 16:13"},
    {text: "A alegria do Senhor é a vossa força.", ref: "Neemias 8:10"},
    {text: "Bem-aventurados os que choram, porque eles serão consolados.", ref: "Mateus 5:4"},
    {text: "O Senhor é o meu refúgio e a minha fortaleza.", ref: "Salmos 91:2"},
    {text: "O Senhor é bom, uma fortaleza no dia da angústia.", ref: "Naum 1:7"},
    {text: "O Senhor é o meu alto refúgio.", ref: "Salmos 9:9"},
    {text: "O Senhor é o meu escudo e a minha glória.", ref: "Salmos 3:3"}
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
        new Notification(title, {body: body, icon: 'android-launchericon-192-192.png'});
    }
}

// Lembretes espirituais diários
function checkReminders() {
    const hour = new Date().getHours();

    if (hour === 7) {
        notify("Bom dia!", "Levante e ore! Deus tem uma bênção pra você hoje.");
    }

    if (hour === 10) {
        notify("10h - Hora de buscar!", "Já orou hoje? Pare um momento e fale com o Pai.");
    }

    if (hour === 12) {
        notify("12h - Meio-dia!", "Já estudou a Bíblia hoje? Abra a Palavra e se alimente.");
    }

    if (hour === 14) {
        notify("14h - Tarde!", "Já fez seu devocional? O Senhor tem uma palavra pra você agora.");
    }

    if (hour === 16) {
        notify("16h - Renovação!", "Já agradeceu a Deus hoje? Ele é fiel!");
    }

    if (hour === 18) {
        notify("18h - Fim de tarde!", "Já meditou na Palavra? Prepare seu coração pra noite.");
    }

    if (hour === 20) {
        notify("20h - Noite!", "Já orou pela família? Cubra todos com oração.");
    }

    if (hour === 22) {
        notify("22h - Hora de descansar!", "Já fez sua oração da noite? Entregue o dia ao Senhor.");
    }
}

// Executa ao carregar
showVerse();
checkReminders();
setInterval(checkReminders, 60000); // Verifica a cada minuto

window.addEventListener('load', showVerse);