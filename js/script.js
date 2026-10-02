// ハンバーガーメニュー制御
const btn = document.querySelector('.btn-menu');
const menuList = document.querySelector('.main-nav');

if (btn && menuList) {
    const closeMenu = () => {
        menuList.classList.remove('open-menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'メニューを開く');
    };

    btn.addEventListener('click', () => {
        const isOpen = menuList.classList.toggle('open-menu');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    // メニュー内のリンクをクリックしたら自動で閉じる（モバイル用）
    menuList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            btn.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !menuList.contains(e.target)) closeMenu();
    });
}

// スクロールリビール演出（IntersectionObserverで要素をふわっと表示）
const revealTargets = document.querySelectorAll('[data-reveal]');

if (revealTargets.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
} else {
    // IntersectionObserver非対応環境ではすべて即表示
    revealTargets.forEach((target) => target.classList.add('is-visible'));
}

// ページ読み込み後、ローダーをDOMから除去（アニメーション終了後のクリーンアップ）
const inkLoader = document.querySelector('.ink-loader');
if (inkLoader) {
    inkLoader.addEventListener('animationend', () => {
        inkLoader.remove();
    });
}
