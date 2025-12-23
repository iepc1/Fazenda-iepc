const darkToggle = document.getElementById('dark-toggle');
if (localStorage.getItem('dark-mode') === 'light') {
    document.body.style.background = '#f8f9fa';
    document.body.style.color = '#333';
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
darkToggle.addEventListener('click', () => {
    if (document.body.style.background === '#f8f9fa') {
        document.body.style.background = '#000814';
        document.body.style.color = '#ffffff';
        localStorage.setItem('dark-mode', 'dark');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.style.background = '#f8f9fa';
        document.body.style.color = '#333';
        localStorage.setItem('dark-mode', 'light');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

const topoBtn = document.getElementById('topo');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) topoBtn.style.display = 'block';
    else topoBtn.style.display = 'none';
});
topoBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));