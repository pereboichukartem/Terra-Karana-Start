const W = 1672, H = 941, st = document.getElementById('st'), cv = document.getElementById('cv');
// [x,y,size,color,period,delay,alpha]
const L = [[430, 315, 520, '#ffb23c', 6, 0, .5], [430, 315, 200, '#fff0a0', 4.5, .4, .55],
[1110, 120, 560, '#7fb0ff', 9, 0, .28], [983, 57, 120, '#dfe8ff', 5, .5, .4],
[65, 300, 260, '#19e0ff', 2.8, 0, .7], [305, 420, 230, '#c04aff', 3.4, .5, .7], [110, 600, 380, '#4a6bff', 3.1, .2, .75], [190, 770, 230, '#19e0ff', 2.6, .9, .65],
[620, 795, 170, '#b04aff', 3.0, .3, .7], [1620, 420, 400, '#4a8bff', 3.3, .7, .7], [1470, 510, 170, '#19e0ff', 2.7, .1, .6], [1590, 500, 150, '#6aa8ff', 3.6, 1, .5],
[430, 700, 300, '#ff4a1c', 2.8, 0, .55], [750, 690, 200, '#ff5a1c', 3.2, .8, .55], [905, 700, 110, '#ff4a1c', 2.5, .4, .5], [1470, 700, 300, '#ff3a1c', 3.0, .6, .55], [1205, 730, 200, '#ff4a1c', 3.4, .2, .55],
[1225, 160, 90, '#ffa02c', 2.9, .3, .7], [1290, 300, 90, '#ffa02c', 3.5, .9, .6], [1255, 250, 80, '#ffa02c', 3.1, .6, .5],
[1020, 690, 200, '#6ae0ff', 4, 0, .35]];
L.forEach(([x, y, s, c, d, dl, a]) => {
    const e = document.createElement('div'); e.className = 'g';
    e.style.cssText = `left:${x / W * 100}%;top:${y / H * 100}%;width:${s / W * 100}%;--c:${c};--d:${d}s;--dl:${dl}s;--a:${a}`;
    st.insertBefore(e, cv)
});
const x = cv.getContext('2d'), k = .5, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
// spores: [x,y,colors]
const src = [[65, 300, ['#19e0ff', '#aef6ff']], [305, 420, ['#c04aff', '#f0b0ff']], [110, 600, ['#4a6bff', '#19e0ff', '#d0b0ff']], [190, 770, ['#19e0ff']],
[620, 795, ['#b04aff']], [1620, 420, ['#4a8bff', '#19e0ff']], [1470, 510, ['#19e0ff']], [430, 700, ['#ffb04a', '#ff5a1c']], [1470, 700, ['#ffb04a', '#ff5a1c']], [750, 690, ['#ffb04a']], [1205, 730, ['#ffb04a']]];
const mk = i => {
    const s = src[i % src.length], c = s[2]; return {
        x: s[0] * k + (Math.random() - .5) * 40, y: s[1] * k + (Math.random() - .5) * 20, vy: .12 + Math.random() * .3, ph: Math.random() * 6,
        life: 0, max: 140 + Math.random() * 180, c: c[Math.random() * c.length | 0], z: Math.random() < .2 ? 3 : 2
    }
};
const P = Array.from({ length: 90 }, (_, i) => { const p = mk(i); p.life = Math.random() * p.max; return p });
// pixel flyers
const A = ["1.......1", ".1.....1.", ".11...11.", "..11111..", "....1...."], B = ["....1....", "..11111..", ".11...11.", "11.....11", "1.......1"];
const F = [{ y: 110, a: 30, s: .5, x: -20, sc: 3 }, { y: 150, a: 20, s: .33, x: 300, sc: 2 }, { y: 95, a: 14, s: .25, x: 600, sc: 2 }];
function fly(t) {
    F.forEach((b, i) => {
        b.x += b.s; if (b.x > cv.width + 20) b.x = -30;
        const yy = b.y + Math.sin(t / 900 + i * 2) * b.a, fr = ((t / (260 + i * 40)) | 0) % 2 ? A : B;
        x.globalAlpha = .9; x.fillStyle = '#10163a';
        fr.forEach((r, j) => [...r].forEach((c, m) => { if (c === '1') x.fillRect((b.x + m * b.sc) | 0, (yy + j * b.sc) | 0, b.sc, b.sc) }))
    })
}
function f(t) {
    x.clearRect(0, 0, cv.width, cv.height);
    P.forEach((p, i) => {
        p.life++; p.y -= p.vy; p.x += Math.sin(p.life / 25 + p.ph) * .3; if (p.life > p.max) Object.assign(p, mk(i));
        const u = p.life / p.max; x.globalAlpha = Math.sin(Math.PI * u) * .9; x.fillStyle = p.c; x.fillRect(p.x | 0, p.y | 0, p.z, p.z)
    });
    fly(t || 0); x.globalAlpha = 1; if (!still) requestAnimationFrame(f)
}
requestAnimationFrame(f);


document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const continueBtn = document.getElementById('continueBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const modalAbout = document.getElementById('modal-about');
    const modalSettings = document.getElementById('modal-settings');
    const closeAboutModal = document.getElementById('close-about-modal');
    const closeSettingsModal = document.getElementById('close-settings-modal');
    const menu = document.getElementById('menu');
    const volume = document.getElementById('volume');
    const volumetxt = document.getElementById('volumetxt');
    const music = document.getElementById('music');
    const musictxt = document.getElementById('musictxt');
    const difficultySelect = document.getElementById('difficulty');
    const hintsToggle = document.getElementById('hintsToggle');
    const autosaveToggle = document.getElementById('autosaveToggle');
    const applySettingsBtn = document.getElementById('applySettingsBtn');
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    const storageKey = 'terra-karana-settings';
    const defaultSettings = {
        volume: 70,
        music: 60,
        difficulty: 'Звичайна',
        hints: true,
        autosave: true
    };

    const readSettings = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
            return { ...defaultSettings, ...saved };
        } catch {
            return { ...defaultSettings };
        }
    };

    const saveSettings = (settings = getCurrentSettings()) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(settings));
        } catch {
            console.warn('Не вдалося зберегти налаштування');
        }
    };

    const getCurrentSettings = () => ({
        volume: Number(volume.value),
        music: Number(music.value),
        difficulty: difficultySelect.value,
        hints: hintsToggle.checked,
        autosave: autosaveToggle.checked
    });

    const applySettingsToForm = (settings) => {
        volume.value = settings.volume;
        volumetxt.textContent = `${settings.volume}%`;

        music.value = settings.music;
        musictxt.textContent = `${settings.music}%`;

        difficultySelect.value = settings.difficulty;
        hintsToggle.checked = Boolean(settings.hints);
        autosaveToggle.checked = Boolean(settings.autosave);
    };

    const closeAllModals = () => {
        modalAbout.style.display = 'none';
        modalSettings.style.display = 'none';
        menu.style.display = 'flex';
    };

    applySettingsToForm(readSettings());

    function syncSettingValue(input, label) {
        label.textContent = `${input.value}%`;
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());
        }
    }

    volume.addEventListener('input', () => syncSettingValue(volume, volumetxt));
    music.addEventListener('input', () => syncSettingValue(music, musictxt));

    difficultySelect.addEventListener('change', () => {
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());
        }
    });

    hintsToggle.addEventListener('change', () => {
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());
        }
    });

    autosaveToggle.addEventListener('change', () => {
        saveSettings(getCurrentSettings());
    });

    applySettingsBtn.addEventListener('click', () => {
        saveSettings(getCurrentSettings());
    });

    resetSettingsBtn.addEventListener('click', () => {
        applySettingsToForm(defaultSettings);
        saveSettings(defaultSettings);
    });

    aboutBtn.addEventListener('click', () => {
        closeAllModals();
        modalAbout.style.display = 'block';
        menu.style.display = 'none';
    });

    settingsBtn.addEventListener('click', () => {
        closeAllModals();
        modalSettings.style.display = 'block';
        menu.style.display = 'none';
    });

    closeAboutModal.addEventListener('click', closeAllModals);
    closeSettingsModal.addEventListener('click', closeAllModals);

    modalAbout.addEventListener('click', (event) => {
        if (event.target === modalAbout) closeAllModals();
    });

    modalSettings.addEventListener('click', (event) => {
        if (event.target === modalSettings) closeAllModals();
    });
});
