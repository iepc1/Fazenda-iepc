// Modo Escuro (inspirado no exemplo)
const darkToggle = document.getElementById('dark-toggle');
const body = document.body;

if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Abas Mídia
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Área ADM
const admBtn = document.getElementById('adm-btn');
const admPanel = document.getElementById('adm-panel');
const admPassword = document.getElementById('adm-password');
const admLogin = document.getElementById('adm-login');
const admContent = document.getElementById('adm-content');

admBtn.addEventListener('click', () => {
    admPanel.style.display = 'block';
    admPassword.value = '';
    admContent.style.display = 'none';
});

admLogin.addEventListener('click', () => {
    if (admPassword.value === 'IEPC') {
        admContent.style.display = 'block';
    } else {
        alert('Senha incorreta!');
    }
});

// Funções ADM (salva no localStorage)
function loadMedia() {
    // Live
    const liveLink = localStorage.getItem('live-link') || '';
    const liveFrame = document.getElementById('live-frame');
    if (liveLink) {
        liveFrame.src = liveLink;
        document.getElementById('no-live').style.display = 'none';
    } else {
        liveFrame.src = '';
        document.getElementById('no-live').style.display = 'block';
    }

    // Fotos
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
    fotos.forEach(f => {
        const img = document.createElement('img');
        img.src = f.url;
        img.alt = f.title;
        gallery.appendChild(img);
    });

    // Vídeos
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    videos.forEach(v => {
        const iframe = document.createElement('iframe');
        iframe.src = v.url;
        iframe.width = '100%';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        const p = document.createElement('p');
        p.textContent = v.title;
        videoList.appendChild(p);
        videoList.appendChild(iframe);
    });
}

document.getElementById('save-live').addEventListener('click', () => {
    const link = document.getElementById('live-link').value;
    localStorage.setItem('live-link', link);
    loadMedia();
});

document.getElementById('add-foto').addEventListener('click', () => {
    const url = document.getElementById('foto-url').value;
    const title = document.getElementById('foto-title').value || 'Foto da I.E.P.C';
    const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
    fotos.push({url, title});
    localStorage.setItem('fotos', JSON.stringify(fotos));
    loadMedia();
});

document.getElementById('add-video').addEventListener('click', () => {
    const url = document.getElementById('video-url').value;
    const title = document.getElementById('video-title').value || 'Sermão';
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    videos.push({url, title});
    localStorage.setItem('videos', JSON.stringify(videos));
    loadMedia();
});

// Botão topo
const topoBtn = document.getElementById('topo');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topoBtn.style.display = 'block';
    } else {
        topoBtn.style.display = 'none';
    }
});
topoBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// Carregar mídia ao iniciar
loadMedia();
