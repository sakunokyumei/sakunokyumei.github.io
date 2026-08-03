const btn = document.querySelector('.btn-menu');
const menuList = document.querySelector('.main-nav');

btn.addEventListener('click', () => {
    const isOpen = menuList.classList.toggle('open-menu');
    btn.innerHTML = isOpen ? 'Close' : 'Menu';
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// メニュー内のリンクをクリックしたら自動で閉じる（モバイル用）
menuList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menuList.classList.remove('open-menu');
        btn.innerHTML = 'Menu';
        btn.setAttribute('aria-expanded', 'false');
    });
});
