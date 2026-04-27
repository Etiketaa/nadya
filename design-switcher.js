/**
 * design-switcher.js
 * Auto-injects a "Choose Your Experience" section before the footer.
 */
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const currentPage = window.location.pathname.split('/').pop();

    const designs = [
        { href: 'landing3.html', name: 'Master', gradient: 'linear-gradient(135deg, #084d38, #c9a84c)' },
        { href: 'master_rose.html', name: 'Elegance', gradient: 'linear-gradient(135deg, #8c5e58, #d4a373)' },
        { href: 'master_navy.html', name: 'Professional', gradient: 'linear-gradient(135deg, #1d3557, #a8dadc)' },
        { href: 'master_earth.html', name: 'Natural', gradient: 'linear-gradient(135deg, #606c38, #dda15e)' },
        { href: 'master_plum.html', name: 'Creative', gradient: 'linear-gradient(135deg, #4a2c40, #c9b1d0)' },
    ];

    const section = document.createElement('section');
    section.id = 'design-switcher';
    section.style.cssText = 'background:#0a1a14; padding:60px 20px;';

    let cardsHTML = '';
    designs.forEach((d, i) => {
        const isActive = currentPage === d.href || (currentPage === '' && d.href === 'landing3.html');
        const border = isActive ? 'border:2px solid rgba(201,164,76,0.8);background:rgba(255,255,255,0.1);' : 'border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);';
        const delay = i > 0 ? ` delay-${Math.min(i, 3)}` : '';
        cardsHTML += `
            <a href="${d.href}" class="reveal${delay}" style="width:110px; padding:20px 10px; ${border} border-radius:16px; text-decoration:none; text-align:center; transition:all 0.3s; display:block;">
                <div style="width:40px; height:40px; border-radius:50%; background:${d.gradient}; margin:0 auto 10px;"></div>
                <span style="color:#fff; font-size:0.75rem; font-weight:600;">${d.name}</span>
                ${isActive ? '<div style="width:20px;height:3px;background:#c9a84c;margin:8px auto 0;border-radius:2px;"></div>' : ''}
            </a>`;
    });

    section.innerHTML = `
        <div style="max-width:1200px; margin:0 auto; text-align:center;">
            <p class="reveal" style="color:#c9a84c; font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:10px;">Explora otros estilos</p>
            <h2 class="reveal" style="color:#fff; margin-bottom:40px; font-family:'Poppins',sans-serif; font-size:clamp(1.8rem,4vw,2.8rem);">Elegí tu Experiencia</h2>
            <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
                ${cardsHTML}
            </div>
        </div>`;

    footer.parentNode.insertBefore(section, footer);

    // Re-observe new .reveal elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    section.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
