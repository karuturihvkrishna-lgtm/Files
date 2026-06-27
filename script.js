/**
 * CINEMATIC BIRTHDAY WEBSITE — script.js
 * Premium animations, typewriter, fireworks, and scene orchestration
 */

/* ═══════════════════════════════════════════════════════════
   CONFIGURATION
═══════════════════════════════════════════════════════════ */
const LETTER_TEXT = `Happy Birthday, Hanvitha! ❤️🎂

First of all... Wishing you the happiest birthday! 🥳❤️

Nee birthday ki simple ga "Happy Birthday" ani cheppadam kanna, mana memories gurinchi rayali anipinchindi.

7th class Telugu period gurthundha? 😄 Sir nannu nee pakkana kurchopettaru Telugu cheppamani. Book kinda petti iddaram questions chusi rastu unte, sir chusi adigithe nuvvu kuda "Krishna ne chusi rastunnadu sir" ani cheppav. 😂 Appudu sir nannu kottina aa incident ippatiki gurthosthe navvosthundhi.

7th tarvatha evari journey valladhi ayipoyindhi. Chala years kalavaledhu... matladukoledu. Kani B.Tech lo malli matladadam start ayyaka, konni friendships enni years gap vachina alane untayi ani ardham ayindhi.

Naa birthday roju nuvvu pampina wishes chadivina tarvatha nijanga chala happy anipinchindi. "Hope this friendship lasts forever" ani annav kadha... nenu kuda ade korukuntunna.

Nee life lo nuvvu anukunna prati dream nijam kavali. Happiness, peace, success, and good health eppudu nee ventane undali.

Eppudu ila happy ga navvuthu undali. Nee smile ni eppudu lose avvakudadhu.

Life lo chala mandhi vastharu, veltharu. Kani kontha mandi matram memories ga kakunda life lo permanent place create cheskuntaru. Naa life lo alanti friendship lo nuvvu okaru.

Once again...
Happy Birthday Hanvitha ❤️🎉
Wishing you a very Happy Birthday! I know these wishes are a little late, but they're truly from the heart. 😊

I'm really grateful to have a friend like you. Thank you for always being kind, supportive, and for staying in touch even after all these years. Some friendships never fade, and I'm happy ours is one of them.

Stay happy.
Stay blessed.
Never stop being the wonderful person you are.

Here's to many more memories and a friendship that lasts forever.

Forever Friends ❤️
— Krishna`;

/* ═══════════════════════════════════════════════════════════
   COSMOS CANVAS — Stars, Aurora, Hearts, Petals, Shooting Stars
═══════════════════════════════════════════════════════════ */
const CosmosCanvas = (() => {
  const canvas = document.getElementById('cosmos-canvas');
  const ctx = canvas.getContext('2d');

  let W, H;
  const stars   = [];
  const petals  = [];
  const floaters = [];
  const shooters = [];

  /* ── resize ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── star pool ── */
  function initStars() {
    stars.length = 0;
    const count = Math.min(Math.floor(W * H / 3200), 340);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        da: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        hue: Math.random() < 0.2 ? 270 : (Math.random() < 0.5 ? 220 : 60)
      });
    }
  }

  /* ── floating hearts ── */
  function spawnFloater() {
    const emojis = ['❤️','💖','✨','🌸','💫','🌟','💝','🎀'];
    floaters.push({
      x: Math.random() * W,
      y: H + 30,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 0.9 + 0.4),
      size: Math.random() * 18 + 12,
      a: 0.7 + Math.random() * 0.3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rot: (Math.random() - 0.5) * 0.02
    });
  }

  /* ── rose petals ── */
  function spawnPetal() {
    petals.push({
      x: Math.random() * W,
      y: -20,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 0.8 + 0.4,
      size: Math.random() * 10 + 5,
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.04,
      hue: Math.random() < 0.6 ? 330 : 0,
      a: 0.5 + Math.random() * 0.5
    });
  }

  /* ── shooting star ── */
  function spawnShooter() {
    shooters.push({
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.4,
      vx: 6 + Math.random() * 6,
      vy: 2 + Math.random() * 3,
      life: 1,
      tail: 140 + Math.random() * 60
    });
  }

  /* ── aurora ── */
  let auroraT = 0;
  function drawAurora() {
    auroraT += 0.004;
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    grad.addColorStop(0,   `hsla(260, 80%, 25%, ${0.09 + 0.05 * Math.sin(auroraT)})`);
    grad.addColorStop(0.4, `hsla(200, 90%, 30%, ${0.06 + 0.04 * Math.sin(auroraT + 1)})`);
    grad.addColorStop(0.7, `hsla(320, 70%, 22%, ${0.05 + 0.04 * Math.sin(auroraT + 2)})`);
    grad.addColorStop(1,   'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H * 0.65);
  }

  /* ── draw frame ── */
  let frameCount = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Background gradient */
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.8);
    bg.addColorStop(0,   '#0d0520');
    bg.addColorStop(0.5, '#07031a');
    bg.addColorStop(1,   '#04020f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawAurora();

    /* Stars */
    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 70%, 85%, ${s.a})`;
      ctx.fill();
    });

    /* Shooting stars */
    if (frameCount % 280 === 0) spawnShooter();
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += s.vx; s.y += s.vy; s.life -= 0.012;
      if (s.life <= 0) { shooters.splice(i, 1); continue; }
      const grad = ctx.createLinearGradient(s.x - s.vx*8, s.y - s.vy*8, s.x, s.y);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(255,240,200,${s.life * 0.9})`);
      ctx.beginPath();
      ctx.moveTo(s.x - s.vx * 10, s.y - s.vy * 10);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    /* Floating hearts / emojis */
    if (frameCount % 90 === 0) spawnFloater();
    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      f.x += f.vx; f.y += f.vy;
      if (f.y < -60) { floaters.splice(i, 1); continue; }
      ctx.globalAlpha = f.a * Math.min(1, (H - f.y) / 80);
      ctx.font = `${f.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(f.emoji, f.x, f.y);
      ctx.globalAlpha = 1;
    }

    /* Petals */
    if (frameCount % 40 === 0) spawnPetal();
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.x += p.vx + 0.3 * Math.sin(frameCount * 0.02 + i);
      p.y += p.vy;
      p.rot += p.drot;
      if (p.y > H + 30) { petals.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.a;
      ctx.fillStyle = `hsl(${p.hue}, 85%, 70%)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    frameCount++;
    requestAnimationFrame(draw);
  }

  return {
    init() {
      resize();
      window.addEventListener('resize', () => { resize(); initStars(); });
      initStars();
      draw();
    }
  };
})();

/* ═══════════════════════════════════════════════════════════
   FIREWORKS & CONFETTI
═══════════════════════════════════════════════════════════ */
const Fireworks = (() => {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], active = false, rafId = null;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function burst(x, y) {
    const colors = [
      '#d4af37','#f0d060','#e8739a','#f7a8c4',
      '#ffffff','#c084fc','#67e8f9','#a3e635'
    ];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const angle  = (Math.PI * 2 / count) * i;
      const speed  = 2 + Math.random() * 5;
      const color  = colors[Math.floor(Math.random() * colors.length)];
      const isConf = Math.random() < 0.3;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color,
        r: isConf ? 0 : Math.random() * 3 + 1,
        w: isConf ? 6 : 0,
        h: isConf ? 10 : 0,
        rot: isConf ? Math.random() * Math.PI : 0,
        drot: isConf ? (Math.random() - 0.5) * 0.2 : 0,
        gravity: 0.08 + Math.random() * 0.06,
        isConf
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.life -= 0.014;
      p.rot += p.drot;
      if (p.life <= 0 || p.y > H + 20) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      if (p.isConf) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        /* Glow */
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
      ctx.globalAlpha = 1;
    }
    if (particles.length > 0) rafId = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  }

  function launch() {
    if (!active) return;
    /* Multiple bursts */
    const spots = [
      [W*0.2, H*0.3], [W*0.8, H*0.25],
      [W*0.5, H*0.2], [W*0.35, H*0.45], [W*0.65, H*0.35]
    ];
    spots.forEach(([x, y], idx) => {
      setTimeout(() => burst(x, y), idx * 240);
    });
    setTimeout(() => {
      if (active) { particles = []; launch(); }
    }, 4000);
    if (!rafId || particles.length < 5) frame();
  }

  return {
    init() { resize(); window.addEventListener('resize', resize); },
    start() {
      active = true;
      canvas.classList.add('active');
      launch();
    },
    stop() {
      active = false;
      canvas.classList.remove('active');
      particles = [];
      ctx.clearRect(0, 0, W, H);
    }
  };
})();

/* ═══════════════════════════════════════════════════════════
   SCENE MANAGER
═══════════════════════════════════════════════════════════ */
const Scenes = (() => {
  const scenes = {
    loading:   document.getElementById('scene-loading'),
    heartbeat: document.getElementById('scene-heartbeat'),
    envelope:  document.getElementById('scene-envelope'),
    letter:    document.getElementById('scene-letter'),
    final:     document.getElementById('scene-final')
  };

  function show(id) {
    Object.values(scenes).forEach(s => s.classList.remove('active'));
    if (id && scenes[id]) scenes[id].classList.add('active');
  }

  return { show };
})();

/* ═══════════════════════════════════════════════════════════
   TYPEWRITER ENGINE
═══════════════════════════════════════════════════════════ */
function typeWriter(element, text, speed = 28, onDone) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);

  function tick() {
    if (i < text.length) {
      const ch = text[i++];
      cursor.before(document.createTextNode(ch));
      /* Auto-scroll */
      const scroll = document.querySelector('.letter-scroll');
      if (scroll) scroll.scrollTop = scroll.scrollHeight;
      /* Realistic timing */
      let delay = speed;
      if (ch === '.' || ch === '!' || ch === '?') delay = 360;
      else if (ch === ',') delay = 180;
      else if (ch === '\n') delay = 240;
      setTimeout(tick, delay);
    } else {
      cursor.remove();
      if (onDone) onDone();
    }
  }
  tick();
}

/* ═══════════════════════════════════════════════════════════
   SCENE SEQUENCES
═══════════════════════════════════════════════════════════ */

/* ─── Scene 1: Loading ─── */
function runLoading() {
  Scenes.show('loading');
  const countdown = document.getElementById('countdown');

  setTimeout(() => {
    countdown.style.display = 'block';
    ['3','2','1'].forEach((n, i) => {
      setTimeout(() => {
        countdown.textContent = n;
        countdown.style.opacity = '0';
        countdown.style.transform = 'scale(1.6)';
        countdown.style.transition = 'none';
        void countdown.offsetHeight; // reflow
        countdown.style.transition = 'opacity 0.35s ease, transform 0.6s ease';
        requestAnimationFrame(() => {
          countdown.style.opacity = '1';
          countdown.style.transform = 'scale(1)';
        });
      }, i * 1100);
    });

    /* Fade out loading → heartbeat */
    setTimeout(() => {
      document.getElementById('scene-loading').style.transition = 'opacity 0.7s ease';
      document.getElementById('scene-loading').style.opacity = '0';
      setTimeout(runHeartbeat, 750);
    }, 3 * 1100 + 700);
  }, 2200);
}

/* ─── Scene 2: Heartbeat ─── */
function runHeartbeat() {
  Scenes.show('heartbeat');
  /* ECG animation plays via CSS; wait then move on */
  setTimeout(runEnvelope, 2600);
}

/* ─── Scene 3: Envelope ─── */
function runEnvelope() {
  Scenes.show('envelope');

  const wrapper = document.querySelector('.envelope-wrapper');
  const flap    = document.querySelector('.envelope-flap');
  const seal    = document.querySelector('.seal');

  function openEnvelope() {
    wrapper.style.cursor = 'default';
    wrapper.removeEventListener('click', openEnvelope);
    /* Open flap */
    flap.classList.add('open');
    seal.style.opacity = '0';
    setTimeout(() => runLetter(), 1100);
  }

  wrapper.addEventListener('click', openEnvelope);
}

/* ─── Scene 4: Letter ─── */
function runLetter() {
  Scenes.show('letter');

  const paper      = document.querySelector('.letter-paper');
  const letterBody = document.getElementById('letter-body');
  const photoFrame = document.getElementById('photo-frame');

  /* First highlighted line */
  const highlight = document.createElement('span');
  highlight.className = 'letter-highlight';
  highlight.textContent = 'Sorry for the late wishes ❤️';
  paper.insertBefore(highlight, letterBody);

  /* Wait for paper rise animation, then type */
  setTimeout(() => {
    /* Insert photo after first paragraph of the letter text */
    const firstBreak = LETTER_TEXT.indexOf('\n\n');
    const part1 = LETTER_TEXT.slice(0, firstBreak);
    const part2 = LETTER_TEXT.slice(firstBreak);

    typeWriter(letterBody, part1, 28, () => {
      /* Show photo */
      setTimeout(() => {
        photoFrame.classList.add('visible');
        const scroll = document.querySelector('.letter-scroll');
        if (scroll) scroll.scrollTop = scroll.scrollHeight;

        /* Continue typing after photo */
        setTimeout(() => {
          typeWriter(letterBody, part2, 28, () => {
            /* Letter done — celebrate! */
            setTimeout(startCelebration, 800);
          });
        }, 1200);
      }, 400);
    });
  }, 600);
}

/* ─── Celebration ─── */
function startCelebration() {
  Fireworks.start();
  setTimeout(runFinal, 6000);
}

/* ─── Scene 5: Final ─── */
function runFinal() {
  Fireworks.stop();
  Scenes.show('final');
}

/* ═══════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  CosmosCanvas.init();
  Fireworks.init();
  runLoading();
});
