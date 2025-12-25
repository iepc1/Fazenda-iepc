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