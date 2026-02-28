/* ====================================================
   DHAKSHAN A — PORTFOLIO INTERACTIVITY
   Premium dark-tech design · Blue/Cyan accents
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Cursor must init before boot so it is ready to track immediately
  initCursorSpotlight();

  runBootSequence().then(() => {
    initNeuralBackground();
    initStatusRotator();
    initTypingAnimation();
    initNavigation();
    initScrollSpy();
    initFadeInObserver();
    initMobileNav();
    fetchGitHubProjects();
    initAboutInteractions();
    initCardTilt();
    initAchievements();
    initKonamiCode();
    initMagneticButtons();
    initRandomGlitch();
    initConsoleEasterEgg();
    initTextScramble();
    initContactSection();
    initSysmon();
    initGitLog();
    initExploitDB();
    // New Easter Eggs
    initSecretWords();
    initTripleClickBurst();
    initIdleEasterEgg();
    initLogoClickEgg();


    // Init Hex Graph
    setTimeout(() => {
      new HexSkillGraph('hex-radar-container');
    }, 200);
    try { initRadarChart(); } catch (e) { console.error('Init Radar Failed', e); }

    window.terminalSystem = new TerminalSystem();
    window.terminalSystem.init();
  });
});

/* ==========================
   INTERACTIVE TERMINAL
   ========================== */
class TerminalSystem {
  constructor() {
    this.input = null;
    this.outputContainer = null;
    this.history = [];
    this.historyIndex = -1;
    this.commands = {
      'help': 'Available commands: about, projects, contact, skills, clear, date, whoami',
      'whoami': 'guest@portfolio:~/visitor (Access Level: READ_ONLY)',
      'date': new Date().toString(),
      'clear': 'CLEAR_TERMINAL',
      'about': 'Navigating to [About] section...',
      'projects': 'Navigating to [Projects] section...',
      'contact': 'Navigating to [Contact] section...',
      'skills': 'Scanning skills... Network Security: 85%, Pentesting: 80%, Linux: 90%'
    };
  }

  init() {
    this.outputContainer = document.getElementById('terminal-output');
    if (!this.outputContainer) return;

    // Auto-run initial sequence if needed, but no user input bindings
    this.addLine('Terminal initialized...', 'system');
    this.addLine('Typewriter module active.', 'system');
  }

  processCommand(cmd) {
    // Clear but keep initial content or just clear all? Let's just clear user added lines for now or refresh
    // Actually simpler to just remove all previous lines and show prompt.
    // But preserving the "story" is nice. Let's implementing a soft clear.
    const userLines = this.outputContainer.querySelectorAll('.user-line');
    userLines.forEach(l => l.remove());
    return;
  }


  addLine(text, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line user-line ${type}`;
    line.innerHTML = type === 'command' ? text : `<span class="terminal-output">→ ${text}</span>`;
    line.style.opacity = '1'; // Immediately visible
    this.outputContainer.insertBefore(line, this.input.parentElement.parentElement);
    // Wait, the input is inside a line. We should insert before the active input line.
    const inputLine = this.outputContainer.querySelector('.active-input-line');
    this.outputContainer.insertBefore(line, inputLine);
  }

  typeWriterResponse(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line user-line';
    line.innerHTML = '<span class="terminal-output">→ </span>';
    line.style.opacity = '1';

    const inputLine = this.outputContainer.querySelector('.active-input-line');
    this.outputContainer.insertBefore(line, inputLine);

    let i = 0;
    const speed = 20;

    const type = () => {
      if (i < text.length) {
        line.lastElementChild.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
        // Scroll to bottom
        this.outputContainer.scrollTop = this.outputContainer.scrollHeight;
      }
    };

    type();
  }

  executeAction(cmd) {
    if (cmd === 'about' || cmd === 'projects' || cmd === 'contact') {
      setTimeout(() => {
        const el = document.getElementById(cmd);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    }
  }
}

/* ==========================
   AUDIO SYSTEM (REMOVED)
   ========================== */

/* ==========================
   BOOT SCREEN ANIMATION
   ========================== */
async function runBootSequence() {
  const screen = document.getElementById('boot-screen');
  const textEl = document.getElementById('boot-text');
  const bar = document.getElementById('boot-bar');
  if (!screen || !textEl || !bar) return;

  const lines = [
    '> Initializing secure environment...',
    '> Loading cryptographic modules...',
    '> Establishing neural interface...',
    '> Verifying access credentials...',
    '> Clearance: GRANTED',
    '> System online.'
  ];

  for (let i = 0; i < lines.length; i++) {
    textEl.textContent += lines[i] + '\n';
    bar.style.width = ((i + 1) / lines.length * 100) + '%';
    await new Promise(r => setTimeout(r, 200 + Math.random() * 150));
  }

  await new Promise(r => setTimeout(r, 400));
  screen.classList.add('hidden');
  await new Promise(r => setTimeout(r, 900));
}

/* ==========================
   STATUS ROTATOR (hero)
   ========================== */
function initStatusRotator() {
  const statusLine = document.getElementById('status-line');
  if (!statusLine) return;
  const lines = [
    'scanning targets...',
    'nmap -sV 192.168.1.0/24',
    'payload deployed · waiting for callback',
    'hashcat --attack-mode 3 · running',
    'reverse shell established',
    'wireshark: 1,337 packets captured',
    'CVE-2024-XXXX: exploit ready',
    'gobuster: 42 directories found',
    'hydra: credentials cracked',
    'msfconsole> sessions -l',
    'status: caffeinated & hacking'
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % lines.length;
    statusLine.style.animation = 'none';
    statusLine.offsetHeight;
    statusLine.textContent = lines[i];
    statusLine.style.animation = 'statusFade 0.5s ease';
  }, 3500);
}

/* ==========================
   NEURAL NETWORK BACKGROUND
   ========================== */
function initNeuralBackground() {
  const canvas = document.getElementById('neural-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: null, y: null };
  const BASE_PARTICLE_COUNT = 70;
  const MAX_PARTICLES = 140;
  const CONNECTION_DISTANCE = 130;
  const MOUSE_RADIUS = 180;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function makeParticle(x, y, fast) {
    const speed = fast ? 2.2 : 0.6;
    const rand = Math.random();
    let color;
    if (rand > 0.85) color = 'rgba(6, 182, 212, 0.8)';       // cyan
    else if (rand > 0.7) color = 'rgba(139, 92, 246, 0.6)';   // violet
    else color = 'rgba(59, 130, 246, 0.7)';                     // blue

    return {
      x: x != null ? x : Math.random() * width,
      y: y != null ? y : Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 1.6 + 0.5,
      color,
      life: fast ? 80 + Math.random() * 60 : Infinity
    };
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < BASE_PARTICLE_COUNT; i++) {
      particles.push(makeParticle(null, null, false));
    }
  }

  function burstAt(x, y) {
    const count = 6;
    for (let i = 0; i < count; i++) {
      if (particles.length < MAX_PARTICLES) {
        particles.push(makeParticle(x, y, true));
      }
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.radius > 1.8) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = dist < CONNECTION_DISTANCE * 0.4
            ? `rgba(59, 130, 246, ${alpha * 0.5})`
            : `rgba(139, 92, 246, ${alpha * 0.25})`;
          ctx.lineWidth = alpha * 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseConnections() {
    if (mouse.x === null) return;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.fill();

    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const alpha = 1 - dist / MOUSE_RADIUS;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.6})`;
        ctx.lineWidth = alpha * 1.2;
        ctx.stroke();
      }
    }
  }

  function updateParticles() {
    particles = particles.filter(p => {
      if (p.life !== Infinity) {
        p.life--;
        if (p.life <= 0) return false;
        p.radius *= 0.997;
      }
      return true;
    });

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Mouse repulsion
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 5) {
          const force = 0.025 * (1 - dist / MOUSE_RADIUS);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.995;
      p.vy *= 0.995;

      const maxV = p.life === Infinity ? 0.7 : 2.2;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxV) {
        p.vx = (p.vx / speed) * maxV;
        p.vy = (p.vy / speed) * maxV;
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    updateParticles();
    drawConnections();
    drawMouseConnections();
    for (const p of particles) drawParticle(p);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  canvas.addEventListener('click', (e) => {
    burstAt(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resize();
  createParticles();
  animate();
}

/* ==========================
   HACK REVEAL NAME ANIMATION
   ========================== */
function initTypingAnimation() {
  const el = document.getElementById('hero-name');
  if (!el) return;

  const fullText = 'Dhakshan A';
  const GLITCH_CHARS = 'アイウエオカキクケコ#@$%&█▓▒░01<>/\\!?*^~';
  const SCRAMBLE_FRAMES = 9;    // how many frames each char scrambles
  const CHAR_DELAY = 95;        // ms between starting each character
  const SCRAMBLE_SPEED = 38;    // ms per scramble frame

  // Build spans for each character
  el.innerHTML = '';
  const spans = [];

  for (const ch of fullText) {
    const span = document.createElement('span');
    if (ch === ' ') {
      span.className = 'name-char space';
      span.textContent = ' ';
    } else {
      span.className = 'name-char';
      span.textContent = ch;
    }
    el.appendChild(span);
    spans.push({ span, char: ch });
  }

  // Add blinking cursor
  const cursor = document.createElement('span');
  cursor.className = 'name-cursor';
  el.appendChild(cursor);

  // Animate each char with a staggered scramble reveal
  spans.forEach(({ span, char }, index) => {
    if (char === ' ') {
      setTimeout(() => span.classList.add('revealed'), index * CHAR_DELAY + 600);
      return;
    }

    setTimeout(() => {
      let frame = 0;

      // Scramble phase
      const scrambler = setInterval(() => {
        if (frame >= SCRAMBLE_FRAMES) {
          clearInterval(scrambler);
          // Lock to real character with glow
          span.textContent = char;
          span.classList.remove('scrambling');
          span.classList.add('locked');
          // Show cursor after last char
          if (index === spans.length - 1) {
            setTimeout(() => cursor.classList.add('visible'), 120);
          }
          return;
        }
        span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        span.classList.add('scrambling');
        frame++;
      }, SCRAMBLE_SPEED);

    }, 600 + index * CHAR_DELAY);
  });
}

/* ==========================
   NAVIGATION
   ========================== */
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile nav
      const navList = document.querySelector('.nav-links');
      if (navList) navList.classList.remove('active');
      const toggle = document.querySelector('.nav-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================
   SCROLL SPY
   ========================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}

/* ==========================
   FADE-IN ON SCROLL
   ========================== */
function initFadeInObserver() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================
   MOBILE NAV TOGGLE
   ========================== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }
}

/* ==========================
   TERMINAL REPO EXPLORER
   ========================== */
const LANG_COLORS = {
  python: '#3572A5', javascript: '#f1e05a', typescript: '#2b7489',
  html: '#e34c26', css: '#563d7c', shell: '#89e051',
  go: '#00ADD8', rust: '#dea584', java: '#b07219',
  c: '#555555', 'c++': '#f34b7d', 'c#': '#178600',
  ruby: '#701516', php: '#4F5D95', swift: '#ffac45',
  kotlin: '#F18E33', dart: '#00B4AB', r: '#198CE7',
  lua: '#000080', vim: '#199f4b', dockerfile: '#384d54',
  default: '#6e7681'
};

const UNIX_PERMS = [
  '-rw-r--r--', '-rwxr-xr-x', '-rw-rw-r--',
  '-rw-------', '-rwxrwxr-x', '-r--r--r--'
];

async function fetchGitHubProjects() {
  const list = document.getElementById('repo-list');
  const loading = document.getElementById('projects-loading');
  const statEl = document.getElementById('repo-stat-line');
  const cmdText = document.getElementById('repo-cmd-text');
  const search = document.getElementById('repo-search');
  if (!list) return;

  // Typewriter for command text
  if (cmdText) {
    const target = 'ls -la --color=auto';
    cmdText.textContent = '';
    let i = 0;
    const tw = setInterval(() => {
      cmdText.textContent += target[i++];
      if (i >= target.length) clearInterval(tw);
    }, 55);
  }

  try {
    const res = await fetch('https://api.github.com/users/dhakshan0819/repos?sort=updated&per_page=100');
    if (!res.ok) throw new Error(`API ${res.status}`);
    let repos = (await res.json()).filter(r => !r.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (loading) loading.remove();
    if (repos.length === 0) {
      list.innerHTML = '<div style="padding:32px;color:var(--text-tertiary);text-align:center;">No public repositories found.</div>';
      return;
    }

    if (statEl) statEl.textContent = `${repos.length} repositories`;

    // Build rows
    repos.forEach((repo, idx) => {
      const lang = (repo.language || '').toLowerCase();
      const color = LANG_COLORS[lang] || LANG_COLORS.default;
      const perms = UNIX_PERMS[idx % UNIX_PERMS.length];
      const updated = new Date(repo.updated_at)
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
      const desc = repo.description || 'No description.';
      const langTag = repo.language || '—';

      // Row
      const row = document.createElement('div');
      row.className = 'repo-row';
      row.dataset.name = repo.name.toLowerCase();
      row.dataset.lang = lang;
      row.style.setProperty('--d', `${idx * 40}ms`);

      row.innerHTML = `
        <span class="rr-perms">${perms}</span>
        <span class="rr-lang">
          <span class="rr-lang-dot" style="background:${color}"></span>
          <span class="rr-lang-name" style="color:${color}">${escapeHTML(langTag)}</span>
        </span>
        <span class="rr-name">${escapeHTML(repo.name)}</span>
        <span class="rr-desc">${escapeHTML(desc.length > 60 ? desc.slice(0, 60) + '…' : desc)}</span>
        <span class="rr-date">${updated}</span>
        <span class="rr-arrow">›</span>
      `;

      // Expandable detail panel
      const detail = document.createElement('div');
      detail.className = 'repo-detail';
      detail.innerHTML = `
        <div class="rd-inner">
          <div class="rd-cmd"><span class="rd-prompt">$</span> cat ${escapeHTML(repo.name)}/README.md</div>
          <div class="rd-body">
            <div class="rd-field"><span class="rd-key">name</span><span class="rd-val rr-name-accent">${escapeHTML(repo.name)}</span></div>
            <div class="rd-field"><span class="rd-key">language</span><span class="rd-val" style="color:${color}">${escapeHTML(langTag)}</span></div>
            <div class="rd-field"><span class="rd-key">description</span><span class="rd-val">${escapeHTML(repo.description || 'No description provided.')}</span></div>
            <div class="rd-field"><span class="rd-key">updated</span><span class="rd-val">${new Date(repo.updated_at).toLocaleDateString('en-US', { dateStyle: 'long' })}</span></div>
            <div class="rd-field"><span class="rd-key">url</span><a class="rd-link" href="${repo.html_url}" target="_blank" rel="noopener">${repo.html_url}</a></div>
            ${repo.homepage ? `<div class="rd-field"><span class="rd-key">demo</span><a class="rd-link" href="${escapeHTML(repo.homepage)}" target="_blank" rel="noopener">${escapeHTML(repo.homepage)}</a></div>` : ''}
          </div>
          <a class="rd-open-btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            Open on GitHub <span>↗</span>
          </a>
        </div>
      `;

      // Toggle expand
      row.addEventListener('click', () => {
        const isOpen = row.classList.contains('expanded');
        // Close all others
        list.querySelectorAll('.repo-row.expanded').forEach(r => {
          r.classList.remove('expanded');
          r.classList.add('collapsing');
          const d = r.nextElementSibling;
          if (d?.classList.contains('repo-detail')) {
            d.style.maxHeight = '0';
            setTimeout(() => r.classList.remove('collapsing'), 300);
          }
        });
        list.querySelectorAll('.repo-detail').forEach(d => { d.style.maxHeight = '0'; });

        if (!isOpen) {
          row.classList.add('expanded');
          detail.style.maxHeight = detail.scrollHeight + 'px';
          // After layout, scroll row into view softly
          setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        }
      });

      list.appendChild(row);
      list.appendChild(detail);
    });

    // Live search
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.toLowerCase().trim();
        let visible = 0;
        list.querySelectorAll('.repo-row').forEach((row, i) => {
          const name = row.dataset.name || '';
          const show = !q || name.includes(q);
          row.style.display = show ? '' : 'none';
          const det = row.nextElementSibling;
          if (det?.classList.contains('repo-detail')) {
            det.style.display = show ? '' : 'none';
            if (!show) { det.style.maxHeight = '0'; row.classList.remove('expanded'); }
          }
          if (show) visible++;
        });
        if (statEl) statEl.textContent = `${visible} of ${repos.length} repos`;
        // Update command text to show grep
        if (cmdText) cmdText.textContent = q ? `grep --name="${q}" ./repos` : 'ls -la --color=auto';
      });
    }

  } catch (err) {
    console.error('Failed to fetch repos:', err);
    if (loading) loading.remove();
    list.innerHTML = `
      <div style="padding:40px;text-align:center;color:var(--danger)">
        <div style="font-family:var(--font-mono);font-size:0.85rem;margin-bottom:12px;">
          Error: failed to connect to GitHub API
        </div>
        <a href="https://github.com/dhakshan0819" target="_blank" class="btn btn-outline" style="font-size:0.75rem;">
          View on GitHub ↗
        </a>
      </div>`;
  }
}


/* ==========================
   UTILITY: Escape HTML
   ========================== */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================
   ABOUT SECTION INTERACTIONS
   ========================== */
function initAboutInteractions() {
  // Animated Skill Bars
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = fill.dataset.width + '%';
              fill.classList.add('animated');
            }, i * 150);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    const container = document.getElementById('skill-bars');
    if (container) barObserver.observe(container);
  }

  // Animated Stat Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 35);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statObserver.observe(el));
  }

  // Terminal Line-by-Line Reveal
  const terminalBody = document.getElementById('terminal-about');
  if (terminalBody) {
    const lines = terminalBody.querySelectorAll('.terminal-line');
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lines.forEach((line) => {
            const delay = parseInt(line.dataset.delay) || 0;
            setTimeout(() => line.classList.add('visible'), delay);
          });
          termObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    termObserver.observe(terminalBody);
  }

  // Clickable Hacker Facts
  const facts = [
    'The first computer virus, "Creeper", was created in 1971 and simply displayed: "I\'m the Creeper, catch me if you can!"',
    'There are over 2,200 cyberattacks per day — roughly one every 39 seconds.',
    'The biggest DDoS attack peaked at 3.47 Tbps, targeting an Azure customer in 2021.',
    'Kevin Mitnick, once the FBI\'s most wanted hacker, later became a cybersecurity consultant.',
    '95% of cybersecurity breaches are caused by human error, not software vulnerabilities.',
    'The password "123456" has been found in over 23 million breached accounts.',
    'Stuxnet destroyed 1,000 Iranian nuclear centrifuges — one of the first known cyber weapons.',
    'The dark web makes up only about 5% of the total internet.',
    'The average cost of a data breach in 2024 was $4.88 million.',
    'Quantum computers could break RSA encryption in seconds — post-quantum crypto is the next frontier.',
    'The Morris Worm (1988) was the first worm distributed via the internet, crashing ~6,000 machines.'
  ];

  const factText = document.getElementById('hacker-fact-text');
  const factBox = document.getElementById('hacker-fact');
  let lastFactIndex = -1;

  function showRandomFact() {
    let idx;
    do { idx = Math.floor(Math.random() * facts.length); } while (idx === lastFactIndex);
    lastFactIndex = idx;
    if (factText) factText.textContent = facts[idx];
  }

  if (factBox) {
    showRandomFact();
    factBox.addEventListener('click', showRandomFact);
  }
}

/* ==========================
   CONTACT EXTRAS
   ========================== */
function initContactExtras() {
  const cipher = document.getElementById('decrypt-cipher');
  const btn = document.getElementById('decrypt-btn');
  if (!cipher || !btn) return;

  const secretMessages = [
    "Let's build something epic together.",
    "I break systems so you don't have to.",
    "Looking for a pentester? You found one.",
    "Hack the planet... responsibly.",
    "Your next security expert is one click away."
  ];

  let decrypting = false;

  function scramble(finalText, el) {
    if (decrypting) return;
    decrypting = true;
    const chars = '█▓▒░@#$%^&*()_+-={}[]|;:<>?';
    let iterations = 0;
    const maxIterations = 30;
    el.classList.remove('decoded');

    const interval = setInterval(() => {
      let display = '';
      for (let i = 0; i < finalText.length; i++) {
        if (i < iterations * (finalText.length / maxIterations)) {
          display += finalText[i];
        } else {
          display += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = display;
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        el.textContent = finalText;
        el.classList.add('decoded');
        decrypting = false;
      }
    }, 40);
  }

  btn.addEventListener('click', () => {
    const msg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    scramble(msg, cipher);
  });
}

/* ==========================
   TRON CURSOR
   ========================== */
function initCursorSpotlight() {
  const ring = document.getElementById('tron-ring');
  const dot = document.getElementById('tron-dot');
  const cross = document.getElementById('tron-cross');
  const trailCanvas = document.getElementById('tron-trail-canvas');
  if (!ring || !dot || !trailCanvas) return;

  // Inject a global style to suppress the native cursor on ALL elements
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = '* { cursor: none !important; }';
  document.head.appendChild(cursorStyle);

  // ── Trail canvas setup ──────────────────────────────────────
  const ctx = trailCanvas.getContext('2d');
  let W = trailCanvas.width = window.innerWidth;
  let H = trailCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = trailCanvas.width = window.innerWidth;
    H = trailCanvas.height = window.innerHeight;
  });

  // Trail history: [{ x, y, age }]
  const trail = [];
  const TRAIL_MAX = 12;

  // ── State ───────────────────────────────────────────────────
  let mx = -200, my = -200;          // actual mouse pos
  let rx = -200, ry = -200;          // ring (lagged)
  let active = false;
  let isHover = false;

  // ── Move listener ───────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!active) {
      active = true;
      [ring, dot, cross].forEach(el => el && el.classList.add('tron-active'));
    }
  });

  document.addEventListener('mouseleave', () => {
    active = false;
    [ring, dot, cross].forEach(el => el && el.classList.remove('tron-active'));
  });

  // ── Hover on interactive elements ──────────────────────────
  const hoverSel = 'a, button, .btn, .repo-row, .edb-row, .card, .ssh-card, .hacker-fact, .nav-link, [role="menuitem"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSel)) {
      isHover = true;
      ring.classList.add('tron-hover');
      dot.classList.add('tron-hover');
      cross.classList.add('tron-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSel)) {
      isHover = false;
      ring.classList.remove('tron-hover');
      dot.classList.remove('tron-hover');
      cross.classList.remove('tron-hover');
    }
  });

  // ── Click flash ────────────────────────────────────────────
  document.addEventListener('mousedown', () => {
    ring.classList.add('tron-click');
    setTimeout(() => ring.classList.remove('tron-click'), 200);
  });

  // ── Animation loop ──────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    if (!active) { ctx.clearRect(0, 0, W, H); return; }

    // Dot follows mouse exactly
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    if (cross) { cross.style.left = mx + 'px'; cross.style.top = my + 'px'; }

    // Ring lags behind for a fluid feel, made slightly faster
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    // Push new trail point
    trail.push({ x: mx, y: my, age: 0 });
    if (trail.length > TRAIL_MAX) trail.shift();
    trail.forEach(p => p.age++);

    // Draw trail
    ctx.clearRect(0, 0, W, H);

    // Draw outer glow trail
    ctx.beginPath();
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = isHover ? 'rgba(251,146,60,0.1)' : 'rgba(6,182,212,0.1)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Draw sharp inner trail
    ctx.beginPath();
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1];
      const b = trail[i];
      const t = i / trail.length;           // 0→1 along trail
      const alpha = Math.pow(t, 2);         // non-linear fade for electric look

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = isHover
        ? `rgba(251,146,60,${alpha * 0.9})`
        : `rgba(6,182,212,${alpha * 0.9})`;
      ctx.lineWidth = t * 1.5;
      ctx.lineCap = 'round';
      ctx.shadowColor = isHover ? '#fb923c' : '#0ef';
      ctx.shadowBlur = 6;
      ctx.stroke();
    }
  }

  tick();
}

/* ==========================
   3D CARD TILT
   ========================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.card, .project-card, .writeup-card, .social-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================
   ACHIEVEMENT TOASTS
   ========================== */
function initAchievements() {
  const achievements = [
    { id: 'home', icon: '⚠️', title: 'SYSTEM ALERT', text: 'Unauthorized access detected on main node.' },
    { id: 'about', icon: '👁️', title: 'AUDIT LOG: RECON', text: 'Target profile enumeration in progress.' },
    { id: 'experience', icon: '⏱️', title: 'TIMELINE EXFIL', text: 'Historical working memory extracted.' },
    { id: 'projects', icon: '📂', title: 'SRC_DUMP_INIT', text: 'Deploying payloads to target repositories...' },
    { id: 'writeups', icon: '🔓', title: '0-DAY FOUND', text: 'Vulnerability methodologies successfully scraped.' },
    { id: 'contact', icon: '📡', title: 'C2 ESTABLISHED', text: 'Encrypted communication channel active.' },
  ];

  const shown = new Set();
  let toastQueue = [];
  let showing = false;

  function showToast(achievement) {
    if (shown.has(achievement.id)) return;
    shown.add(achievement.id);
    toastQueue.push(achievement);
    processQueue();
  }

  function processQueue() {
    if (showing || toastQueue.length === 0) return;
    showing = true;
    const a = toastQueue.shift();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span class="achievement-icon">${a.icon}</span>
      <div class="achievement-text">
        <h4>${a.title}</h4>
        <p>${a.text}</p>
      </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => {
        toast.remove();
        showing = false;
        processQueue();
      }, 400);
    }, 2800);
  }

  // Observe each section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const achievement = achievements.find(a => a.id === id);
        if (achievement) showToast(achievement);
      }
    });
  }, { threshold: 0.3 });

  achievements.forEach(a => {
    const el = document.getElementById(a.id);
    if (el) observer.observe(el);
  });
}

/* ==========================
   TEXT SCRAMBLE EFFECT
   ========================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output; // Use innerHTML to allow span styling
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScramble() {
  const headers = document.querySelectorAll('.section-title, .hero-name, .glitch-hover');
  headers.forEach(el => {
    // Skip the hero name — it has its own per-letter animation
    if (el.id === 'hero-name') return;

    const fx = new TextScramble(el);
    let isHovering = false;

    el.addEventListener('mouseenter', () => {
      if (isHovering) return;
      isHovering = true;

      fx.setText(el.textContent).then(() => {
        isHovering = false;
      });
    });
  });
}

/* ==========================
   KONAMI CODE EASTER EGG
   ========================== */
function initKonamiCode() {
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  let pos = 0;
  let matrixActive = false;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        if (!matrixActive) triggerMatrixRain();
      }
    } else {
      pos = 0;
    }
  });

  function triggerMatrixRain() {
    matrixActive = true;

    // Show breach badge
    const badge = document.createElement('div');
    badge.className = 'egg-badge';
    badge.style.background = 'rgba(239, 68, 68, 0.9)';
    badge.style.color = '#fff';
    badge.style.textShadow = '0 0 10px #ff0000';
    badge.innerHTML = '⚠️ CRITICAL: SYSTEM BREACH DETECTED ⚠️';
    document.body.appendChild(badge);
    requestAnimationFrame(() => badge.classList.add('show'));
    setTimeout(() => {
      badge.classList.remove('show');
      setTimeout(() => badge.remove(), 600);
    }, 4000);

    // Matrix rain
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) { matrixActive = false; return; }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('active');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(6, 6, 10, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#3b82f6';
      ctx.font = fontSize + 'px JetBrains Mono';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Scary red color variation
        if (Math.random() > 0.95) ctx.fillStyle = '#f87171'; // light red
        else if (Math.random() > 0.9) ctx.fillStyle = '#991b1b'; // dark red
        else ctx.fillStyle = '#ef4444'; // base red

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(draw, 40);

    // Stop after 6 seconds
    setTimeout(() => {
      clearInterval(matrixInterval);
      canvas.classList.remove('active');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      matrixActive = false;
    }, 6000);

    // Click to dismiss
    canvas.addEventListener('click', function dismiss() {
      clearInterval(matrixInterval);
      canvas.classList.remove('active');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      matrixActive = false;
      canvas.removeEventListener('click', dismiss);
    });
  }
}

/* ==========================
   MAGNETIC BUTTONS
   ========================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ==========================
   RANDOM GLITCH ON HERO NAME
   ========================== */
function initRandomGlitch() {
  const heroName = document.getElementById('hero-name');
  if (!heroName) return;

  setInterval(() => {
    if (Math.random() > 0.7) {
      heroName.classList.add('glitch-active');
      setTimeout(() => heroName.classList.remove('glitch-active'), 150);
    }
  }, 4000);
}

/* ==========================
   CONSOLE ASCII ART EASTER EGG
   ========================== */
function initConsoleEasterEgg() {
  const art = `
%c██████████████████████████████████████████████████████████████████
██                                                              ██
██   SYSTEM COMPROMISED. UNAUTHORIZED ACCESS DETECTED.          ██
██                                                              ██
██   Target: DHAKSHAN A // Security Architect                   ██
██   Threat Level: CRITICAL                                     ██
██                                                              ██
██   Try: [↑] [↑] [↓] [↓] [←] [→] [←] [→] [B] [A]               ██
██   or enter system bypass words to continue.                  ██
██                                                              ██
██████████████████████████████████████████████████████████████████`;

  console.log(art, 'color: #ef4444; font-family: monospace; font-size: 11px; font-weight: bold;');
  console.log('%c[!] ALL ACTIONS ARE BEING LOGGED. PROCEED WITH CAUTION.', 'color: #f59e0b; font-size: 13px; font-weight: bold; background: #222; padding: 4px;');
}

/* ==========================
   TEXT SCRAMBLE ON SECTION TITLE HOVER
   ========================== */
function initTextScramble() {
  const titles = document.querySelectorAll('.section-title');
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:<>?/~`';

  titles.forEach(title => {
    const original = title.textContent;
    let isScrambling = false;

    title.style.cursor = 'crosshair';

    title.addEventListener('mouseenter', () => {
      if (isScrambling) return;
      isScrambling = true;

      let iteration = 0;
      const maxIter = 12;
      const interval = setInterval(() => {
        title.textContent = original.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration * (original.length / maxIter)) return original[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');

        iteration++;
        if (iteration > maxIter) {
          clearInterval(interval);
          title.textContent = original;
          isScrambling = false;
        }
      }, 40);
    });
  });
}

/* ==========================
   HEX SKILL GRAPH (V2)
   ========================== */
class HexSkillGraph {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`HexSkillGraph: Container #${containerId} not found.`);
      return;
    }

    // Create canvas manually to ensure it exists
    this.container.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.skills = [
      { label: 'Network', value: 0.9, color: '#3b82f6' },
      { label: 'Security', value: 0.95, color: '#ef4444' },
      { label: 'Crypto', value: 0.8, color: '#10b981' },
      { label: 'Hardware', value: 0.85, color: '#f59e0b' },
      { label: 'Web', value: 0.75, color: '#8b5cf6' },
      { label: 'Linux', value: 0.9, color: '#06b6d4' }
    ];

    // Resize handling
    this.resize();
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => this.resize());
    });

    // Start loop
    this.tick = 0;
    this.loop();
  }

  resize() {
    const parent = this.container;
    const size = Math.min(parent.clientWidth, 400); // Max size constraint
    this.width = size;
    this.height = size;

    // Hi-DPI
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.radius = Math.min(this.cx, this.cy) * 0.7; // Padding for labels
  }

  loop() {
    this.tick++;
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  draw() {
    const { ctx, cx, cy, radius } = this;

    ctx.clearRect(0, 0, this.width, this.height);

    // Draw Grid (Hexagons)
    this.drawHexGrid(4);

    // Draw Data Point with slight pulse
    this.drawData();

    // Draw Labels
    this.drawLabels();
  }

  drawHexGrid(levels) {
    const { ctx, cx, cy, radius } = this;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i;
      this.drawHexPath(cx, cy, r);
      ctx.stroke();
    }

    // Spokes
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    }
    ctx.stroke();
  }

  drawHexPath(x, y, r) {
    const { ctx } = this;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  drawData() {
    const { ctx, cx, cy, radius } = this;
    const pulse = Math.sin(this.tick * 0.05) * 0.02 + 1; // Subtle breathing

    ctx.beginPath();
    this.skills.forEach((skill, i) => {
      const val = skill.value * pulse;
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = cx + Math.cos(angle) * (radius * val);
      const py = cy + Math.sin(angle) * (radius * val);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();

    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#3b82f6';
    ctx.stroke();

    // Points
    this.skills.forEach((skill, i) => {
      const val = skill.value * pulse;
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = cx + Math.cos(angle) * (radius * val);
      const py = cy + Math.sin(angle) * (radius * val);

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
  }

  drawLabels() {
    const { ctx, cx, cy, radius } = this;
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#94a3b8';

    const offset = 20;

    this.skills.forEach((skill, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const px = cx + Math.cos(angle) * (radius + offset);
      const py = cy + Math.sin(angle) * (radius + offset);
      ctx.fillText(skill.label, px, py);
    });
  }
}

/* ==========================
   CONTACT SECTION — WAVEFORM & PING
   ========================== */
function initContactSection() {
  // ── Waveform bars ──────────────────────────────
  const barsContainer = document.getElementById('rwf-bars');
  if (barsContainer) {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('div');
      bar.className = 'rwf-bar';
      // Random speed and initial scale-Y so bars feel organic
      const spd = (0.6 + Math.random() * 1.4).toFixed(2);
      const dly = (Math.random() * 1.2).toFixed(2);
      bar.style.setProperty('--spd', `${spd}s`);
      bar.style.animationDelay = `${dly}s`;
      // Vary height potential naturally
      bar.style.maxHeight = `${Math.round(40 + Math.random() * 12)}px`;
      // Subtle colour accent for every ~5th bar
      if (i % 7 === 0) bar.style.background = 'linear-gradient(to top, #8b5cf6, #06b6d4)';
      barsContainer.appendChild(bar);
    }
  }

  // ── Ping terminal: replay animation on scroll-in ──
  const pingTerminal = document.querySelector('.ping-terminal');
  if (pingTerminal) {
    const lines = pingTerminal.querySelectorAll('.ping-line');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Restart animations by toggling the class
          lines.forEach(line => {
            line.style.animation = 'none';
            line.offsetHeight; // force reflow
            line.style.animation = '';
          });
        }
      });
    }, { threshold: 0.4 });

    observer.observe(pingTerminal);
  }
}

/* ==========================
   ABOUT — SYSMON (htop)
   ========================== */
function initSysmon() {
  // ── Neofetch fields typewriter ──────────────────────
  const nfFields = document.getElementById('nf-fields');
  if (nfFields) {
    const fields = [
      ['OS', 'Kali Linux x86_64'],
      ['Kernel', '6.1.0-kali9-amd64'],
      ['Uptime', '6 years'],
      ['Shell', 'zsh + fish'],
      ['Terminal', 'kitty'],
      ['CPU', 'Offensive Security Cores'],
      ['Memory', '100+ Vulns / 50+ Pentests'],
      ['Focus', 'Malware · Cloud · Exploitation'],
      ['Mode', '⚡ OFFENSIVE'],
    ];
    let idx = 0;
    const sep = document.createElement('span');
    sep.className = 'nf-sep';
    sep.textContent = '─────────────────────────────';
    nfFields.appendChild(sep);

    const reveal = () => {
      if (idx >= fields.length) return;
      const [key, val] = fields[idx++];
      const row = document.createElement('div');
      row.className = 'nf-field';
      row.innerHTML = `<span class="nf-key">${key}</span><span class="nf-val">${val}</span>`;
      nfFields.appendChild(row);
      setTimeout(reveal, 120);
    };

    // Trigger on scroll into view
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          nfFields.innerHTML = '';
          nfFields.appendChild(sep.cloneNode(true));
          idx = 0;
          reveal();
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(nfFields);
  }

  // ── Skill meter bars animate on scroll ──────────────
  const smFills = document.querySelectorAll('.sm-fill');
  if (smFills.length) {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          smFills.forEach((fill, i) => {
            const pct = fill.style.getPropertyValue('--pct') || '0';
            fill.style.width = '0%';
            setTimeout(() => { fill.style.width = pct + '%'; }, i * 80);
          });
          obs2.disconnect();
        }
      });
    }, { threshold: 0.2 });
    const sm = document.getElementById('skill-meters');
    if (sm) obs2.observe(sm);
  }

  // ── ps aux: populate process table ──────────────────
  const psBody = document.getElementById('ps-body');
  if (psBody) {
    const processes = [
      { pid: '1337', cpu: '12.4', mem: '8.1', cmd: 'kali-linux', status: 'running' },
      { pid: '1338', cpu: '9.8', mem: '5.2', cmd: 'burpsuite', status: 'running' },
      { pid: '1339', cpu: '7.3', mem: '4.0', cmd: 'metasploit', status: 'running' },
      { pid: '1340', cpu: '6.1', mem: '3.8', cmd: 'wireshark', status: 'running' },
      { pid: '1341', cpu: '5.0', mem: '2.9', cmd: 'nmap', status: 'running' },
      { pid: '1342', cpu: '4.2', mem: '2.1', cmd: 'ghidra', status: 'sleep' },
      { pid: '1343', cpu: '3.9', mem: '1.8', cmd: 'python3', status: 'running' },
      { pid: '1344', cpu: '3.1', mem: '1.5', cmd: 'docker', status: 'running' },
      { pid: '1345', cpu: '2.8', mem: '1.2', cmd: 'hashcat', status: 'sleep' },
      { pid: '1346', cpu: '2.2', mem: '0.9', cmd: 'aircrack-ng', status: 'sleep' },
      { pid: '1347', cpu: '1.8', mem: '0.7', cmd: 'gobuster', status: 'sleep' },
      { pid: '1348', cpu: '1.2', mem: '0.5', cmd: 'sqlmap', status: 'sleep' },
    ];
    processes.forEach((p, i) => {
      const row = document.createElement('div');
      row.className = 'ps-row';
      row.style.setProperty('--d', `${i * 60}ms`);
      const statusClass = p.status === 'running' ? 'ps-status-running' : 'ps-status-sleep';
      row.innerHTML = `
        <span class="ps-pid">${p.pid}</span>
        <span class="ps-user">dhakshan</span>
        <span class="ps-cpu">${p.cpu}</span>
        <span class="ps-mem">${p.mem}</span>
        <span class="ps-cmd">${p.cmd}</span>
        <span class="${statusClass}">${p.status.toUpperCase()}</span>
      `;
      psBody.appendChild(row);
    });
  }
}

/* ==========================
   EXPERIENCE — GIT LOG
   ========================== */
function initGitLog() {
  document.querySelectorAll('.git-commit').forEach(commit => {
    const row = commit.querySelector('.gc-row');
    const detail = commit.querySelector('.gc-detail');
    if (!row || !detail) return;

    row.addEventListener('click', () => {
      const isOpen = commit.classList.contains('expanded');
      // Collapse all
      document.querySelectorAll('.git-commit.expanded').forEach(c => {
        c.classList.remove('expanded');
        const d = c.querySelector('.gc-detail');
        if (d) d.style.maxHeight = '0';
      });
      if (!isOpen) {
        commit.classList.add('expanded');
        detail.style.maxHeight = detail.scrollHeight + 'px';
        setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      }
    });
  });

  // Staggered row reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.git-commit').forEach((c, i) => {
          c.style.opacity = '0';
          c.style.transform = 'translateX(-10px)';
          c.style.transition = `opacity 0.3s ${i * 100}ms, transform 0.3s ${i * 100}ms`;
          setTimeout(() => {
            c.style.opacity = '1';
            c.style.transform = 'translateX(0)';
          }, i * 100 + 50);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.15 });
  const gt = document.querySelector('.git-terminal');
  if (gt) obs.observe(gt);
}

/* ==========================
   WRITEUPS — EXPLOIT-DB
   ========================== */
function initExploitDB() {
  // Expand/collapse rows
  document.querySelectorAll('.edb-row').forEach(row => {
    const main = row.querySelector('.er-main');
    const detail = row.querySelector('.er-detail');
    if (!main || !detail) return;

    main.addEventListener('click', () => {
      const isOpen = row.classList.contains('expanded');
      document.querySelectorAll('.edb-row.expanded').forEach(r => {
        r.classList.remove('expanded');
        const d = r.querySelector('.er-detail');
        if (d) d.style.maxHeight = '0';
      });
      if (!isOpen) {
        row.classList.add('expanded');
        detail.style.maxHeight = detail.scrollHeight + 'px';
        setTimeout(() => main.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      }
    });
  });

  // Severity filter
  document.querySelectorAll('.edb-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.edb-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sev = btn.dataset.sev;
      document.querySelectorAll('.edb-row').forEach(row => {
        const show = sev === 'all' || row.dataset.sev === sev;
        row.style.display = show ? '' : 'none';
        if (!show) {
          row.classList.remove('expanded');
          const d = row.querySelector('.er-detail');
          if (d) d.style.maxHeight = '0';
        }
      });
      // Update count
      const count = document.querySelector('.edb-count');
      if (count) {
        const visible = [...document.querySelectorAll('.edb-row')].filter(r => r.style.display !== 'none').length;
        count.textContent = `${visible} result${visible !== 1 ? 's' : ''}`;
      }
    });
  });
}

/* ============================================================
   EASTER EGG: SECRET KEYWORD TRIGGERS
   Type "hack", "sudo", "coffee", "nmap", "pwned" anywhere
   ============================================================ */
function initSecretWords() {
  const triggers = {
    hack: eggHack,
    sudo: eggSudo,
    coffee: eggCoffee,
    nmap: eggNmap,
    pwned: eggPwned,
  };

  let buffer = '';
  const maxLen = Math.max(...Object.keys(triggers).map(k => k.length)) + 1;

  window.addEventListener('keydown', (e) => {
    // Skip if typing in an actual input or textarea
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable) return;

    // Only process single printable characters — ignore specials (Shift, ArrowKeys, etc.)
    if (e.key.length !== 1) return;

    // Skip ctrl/meta combos (copy, paste, etc.)
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    buffer = (buffer + e.key.toLowerCase()).slice(-maxLen);

    for (const [word, fn] of Object.entries(triggers)) {
      if (buffer.endsWith(word)) {
        buffer = '';
        fn();
        return;
      }
    }
  }, true); // useCapture=true so it fires before any child handlers
}

/* ----------------------------------------------------------
   HACK — Extended chromatic glitch + scanlines + screen tear
   ---------------------------------------------------------- */
function eggHack() {
  // Inject CSS once
  if (!document.getElementById('egg-hack-style')) {
    const s = document.createElement('style');
    s.id = 'egg-hack-style';
    s.textContent = `
      @keyframes hackShake {
        0%,100%{transform:translate(0,0)}
        10%{transform:translate(-6px,3px) skewX(-2deg)}
        20%{transform:translate(8px,-4px) skewX(3deg)}
        30%{transform:translate(-4px,7px)}
        40%{transform:translate(9px,-2px) skewX(-1deg)}
        50%{transform:translate(-7px,5px) skewX(4deg)}
        60%{transform:translate(5px,-6px)}
        70%{transform:translate(-9px,2px) skewX(-3deg)}
        80%{transform:translate(4px,8px) skewX(2deg)}
        90%{transform:translate(-3px,-5px)}
      }
      @keyframes hackScan {
        0%{top:-100%} 100%{top:200%}
      }
      @keyframes hackFlicker {
        0%,100%{opacity:1}20%{opacity:.6}40%{opacity:.85}60%{opacity:.4}80%{opacity:.9}
      }
      .hack-overlay {
        position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden;
      }
      .hack-scanline {
        position:absolute;left:0;width:100%;height:3px;
        background:rgba(59,130,246,0.35);
        animation:hackScan 0.6s linear infinite;
        box-shadow:0 0 10px rgba(59,130,246,0.8);
        filter:blur(1px);
      }
      .hack-rgb-r {
        position:absolute;inset:0;
        background:rgba(239,68,68,0.06);
        transform:translateX(-4px);
        mix-blend-mode:screen;
      }
      .hack-rgb-b {
        position:absolute;inset:0;
        background:rgba(59,130,246,0.06);
        transform:translateX(4px);
        mix-blend-mode:screen;
      }
      .hack-noise {
        position:absolute;inset:0;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
        opacity:0.12;
        animation:hackFlicker 0.1s linear infinite;
      }
      .hack-active { animation:hackShake 0.12s linear infinite; }
      .hack-tear {
        position:absolute;left:0;width:100%;pointer-events:none;
        background:rgba(6,6,10,0.9);
        box-shadow:0 0 0 1px #3b82f6;
      }
    `;
    document.head.appendChild(s);
  }

  const overlay = document.createElement('div');
  overlay.className = 'hack-overlay';
  overlay.innerHTML = `<div class="hack-rgb-r"></div><div class="hack-rgb-b"></div>
    <div class="hack-scanline"></div><div class="hack-noise"></div>`;
  document.body.appendChild(overlay);
  document.body.classList.add('hack-active');

  // Random screen tears
  const tearCount = 8;
  const tears = [];
  for (let i = 0; i < tearCount; i++) {
    const tear = document.createElement('div');
    tear.className = 'hack-tear';
    const topPct = 10 + Math.random() * 80;
    const h = 2 + Math.random() * 18;
    Object.assign(tear.style, { top: topPct + '%', height: h + 'px' });
    overlay.appendChild(tear);
    tears.push(tear);
  }

  // Animate tears
  const tearInterval = setInterval(() => {
    tears.forEach(t => {
      t.style.top = (5 + Math.random() * 90) + '%';
      t.style.height = (1 + Math.random() * 22) + 'px';
      t.style.opacity = Math.random() > 0.4 ? '1' : '0';
      t.style.transform = `translateX(${(Math.random() - 0.5) * 30}px)`;
    });
  }, 80);

  // Flicker body filter
  const filters = [
    'hue-rotate(180deg) saturate(3)',
    'invert(0.08) hue-rotate(240deg)',
    'saturate(5) brightness(1.3)',
    'hue-rotate(90deg)',
    '',
    'contrast(2) brightness(0.8)',
    '',
    'invert(0.12)',
    '',
  ];
  let fi = 0;
  const filterInterval = setInterval(() => {
    document.body.style.filter = filters[fi++ % filters.length];
  }, 90);

  // Glitch text floaters
  const glitchChars = '██▓▒░01アカ#@$//\\\\><{}';
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      const chars = Array.from({ length: 4 + Math.floor(Math.random() * 8) },
        () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join('');
      Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 95 + '%',
        top: Math.random() * 90 + '%',
        fontFamily: 'monospace',
        fontSize: (10 + Math.random() * 22) + 'px',
        fontWeight: '900',
        color: ['#3b82f6', '#06b6d4', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 4)],
        textShadow: '0 0 10px currentColor',
        pointerEvents: 'none',
        zIndex: '99999',
        opacity: '0',
        transition: 'opacity 0.05s',
        letterSpacing: '2px',
      });
      el.textContent = chars;
      document.body.appendChild(el);
      requestAnimationFrame(() => { el.style.opacity = (0.6 + Math.random() * 0.4).toString(); });
      setTimeout(() => el.remove(), 300 + Math.random() * 800);
    }, i * 130);
  }

  // Clean up after 3.5 seconds
  setTimeout(() => {
    clearInterval(tearInterval);
    clearInterval(filterInterval);
    document.body.style.filter = '';
    document.body.classList.remove('hack-active');
    overlay.style.transition = 'opacity 0.4s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 400);
  }, 3500);
}

/* ----------------------------------------------------------
   SUDO — Severe Security Violation Alert
   ---------------------------------------------------------- */
function eggSudo() {
  const lines = [
    'USER: anonymous',
    'TTY: unknown',
    'PWD: /',
    'COMMAND: /usr/bin/sudo *',
    '',
    '-------------------------------------------------------',
    '[!] SECURITY ALERT: UNAUTHORIZED PRIVILEGE ESCALATION',
    '-------------------------------------------------------',
    '',
    '>> This incident has been logged.',
    '>> Administrator dhakshan.dev has been notified.',
    '>> Your IP has been flagged for analysis.',
    '',
    'Disconnecting session...',
  ];

  const terminal = document.createElement('div');
  Object.assign(terminal.style, {
    position: 'fixed', bottom: '24px', left: '24px',
    background: 'rgba(20,0,0,0.95)',
    border: '1px solid #ef4444',
    borderRadius: '4px',
    padding: '16px 20px',
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#ef4444',
    maxWidth: '500px',
    zIndex: '99999',
    boxShadow: '0 0 20px rgba(239,68,68,0.3), inset 0 0 10px rgba(239,68,68,0.1)',
    pointerEvents: 'none',
    lineHeight: '1.6',
    whiteSpace: 'pre',
  });

  // Terminal header
  const header = document.createElement('div');
  Object.assign(header.style, {
    background: '#ef4444', color: '#000', padding: '2px 8px',
    marginBottom: '12px', fontWeight: 'bold', display: 'inline-block'
  });
  header.textContent = 'SYSTEM_SEC_DAEMON';
  terminal.appendChild(header);

  const body = document.createElement('div');
  terminal.appendChild(body);
  document.body.appendChild(terminal);

  let text = '';
  let li = 0;
  let ci = 0;

  function typeNext() {
    if (li >= lines.length) {
      setTimeout(() => {
        terminal.style.transition = 'opacity 0.5s';
        terminal.style.opacity = '0';
        setTimeout(() => terminal.remove(), 500);
      }, 3000);
      return;
    }
    const line = lines[li];
    if (ci < line.length) {
      text += line[ci++];
      body.textContent = text;
      setTimeout(typeNext, 15 + Math.random() * 20);
    } else {
      text += '\n';
      body.textContent = text;
      li++; ci = 0;
      setTimeout(typeNext, 200);
    }
  }
  typeNext();
}

/* ----------------------------------------------------------
   COFFEE (OVERCLOCK) — Thermal heat bloom + system strain
   ---------------------------------------------------------- */
function eggCoffee() {
  // Thermal tint overlay
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', inset: '0',
    background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.2) 100%)',
    pointerEvents: 'none', zIndex: '99997',
    opacity: '0', transition: 'opacity 0.6s',
    mixBlendMode: 'color-burn',
  });
  document.body.appendChild(glow);
  requestAnimationFrame(() => { glow.style.opacity = '1'; });

  // Apply thermal distortion filter to body
  document.body.style.transition = 'filter 1s ease-in-out';
  document.body.style.filter = 'sepia(0.5) saturate(2) hue-rotate(-15deg) contrast(1.2)';

  // System Strain text
  const alert = document.createElement('div');
  Object.assign(alert.style, {
    position: 'fixed', top: '10%', left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold',
    color: '#ef4444', letterSpacing: '2px',
    padding: '8px 16px', border: '1px solid #ef4444',
    backgroundColor: 'rgba(20,0,0,0.8)',
    textShadow: '0 0 10px #ef4444',
    boxShadow: '0 0 20px rgba(239,68,68,0.4)',
    pointerEvents: 'none', zIndex: '99999',
    opacity: '0', transition: 'opacity 0.3s',
  });
  alert.innerHTML = '⚠️ THERMAL THRESHOLD EXCEEDED // OVERCLOCK ACTIVE';
  document.body.appendChild(alert);
  requestAnimationFrame(() => { alert.style.opacity = '1'; });

  // Heat waves (distortion layers)
  const tears = [];
  for (let i = 0; i < 5; i++) {
    const layer = document.createElement('div');
    Object.assign(layer.style, {
      position: 'fixed', left: '0', width: '100%', height: (10 + Math.random() * 30) + 'px',
      top: (Math.random() * 100) + '%',
      background: 'rgba(239,68,68,0.05)', backdropFilter: 'blur(2px)',
      pointerEvents: 'none', zIndex: '99998', opacity: '0.4',
      transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
    });
    document.body.appendChild(layer);
    tears.push(layer);
  }

  const waveInt = setInterval(() => {
    tears.forEach(t => {
      t.style.top = (Math.random() * 100) + '%';
      t.style.transform = `translateX(${(Math.random() - 0.5) * 30}px)`;
    });
  }, 100);

  // Clean up
  setTimeout(() => {
    document.body.style.filter = '';
    glow.style.opacity = '0';
    alert.style.opacity = '0';
    tears.forEach(t => t.style.opacity = '0');
    clearInterval(waveInt);
    setTimeout(() => {
      glow.remove();
      alert.remove();
      tears.forEach(t => t.remove());
    }, 1000);
  }, 4000);
}

/* ----------------------------------------------------------
   NMAP — Full-screen "scanning" animation with port readout
   ---------------------------------------------------------- */
function eggNmap() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(6,6,10,0.93)',
    zIndex: '999999',
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#06b6d4',
    padding: 'clamp(20px,5vw,60px)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  });

  const target = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const ports = [
    { port: 22, state: 'open', service: 'ssh', version: 'OpenSSH 9.3' },
    { port: 80, state: 'open', service: 'http', version: 'nginx 1.24.0' },
    { port: 443, state: 'open', service: 'https', version: 'TLSv1.3' },
    { port: 3306, state: 'filtered', service: 'mysql', version: '' },
    { port: 8080, state: 'open', service: 'http-alt', version: 'Apache Tomcat' },
    { port: 9200, state: 'open', service: 'wap-wsp', version: 'Elasticsearch 8.9' },
    { port: 6379, state: 'filtered', service: 'redis', version: '' },
    { port: 1337, state: 'open', service: '???', version: 'dhakshan.portfolio' },
  ];

  const pre = document.createElement('pre');
  Object.assign(pre.style, { margin: '0', lineHeight: '1.7', color: '#06b6d4', maxWidth: '680px' });
  overlay.appendChild(pre);

  const hint = document.createElement('div');
  Object.assign(hint.style, { position: 'absolute', bottom: '20px', right: '24px', color: 'rgba(6,182,212,0.4)', fontSize: '11px' });
  hint.textContent = '[ click to dismiss ]';
  overlay.appendChild(hint);

  document.body.appendChild(overlay);

  const dismiss = () => {
    overlay.style.transition = 'opacity 0.4s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 400);
  };
  overlay.addEventListener('click', dismiss);

  const header = [
    `Starting Nmap 7.94 ( https://nmap.org )`,
    `Nmap scan report for target (${target})`,
    `Host is up (0.00${Math.floor(Math.random() * 9) + 1}2s latency).`,
    ``,
    `PORT      STATE     SERVICE     VERSION`,
  ];

  let output = '';
  const allLines = [...header,
  ...ports.map(p => {
    const ps = String(p.port + '/tcp').padEnd(10);
    const st = p.state.padEnd(10);
    const sv = p.service.padEnd(12);
    return ps + st + sv + p.version;
  }),
    ``,
    `Service detection performed. Please report any incorrect results.`,
  `Nmap done: 1 IP address (1 host up) scanned in ${(0.5 + Math.random() * 3).toFixed(2)}s`,
    ``,
    `>> VULNERABILITY DETECTED: CVE-2024-XXXX on port 1337`,
    `>> PAYLOAD DEPLOYED. AWAITING CALLBACK...`,
    `>> SHELL ESTABLISHED. WELCOME, ROOT.`,
  ];

  let li = 0;
  function addLine() {
    if (li >= allLines.length) return;
    const line = allLines[li++];
    // Color coding
    let colored = line
      .replace(/open/g, `\x1b[0mopen\x1b[0m`)
      .replace(/filtered/g, 'filtered');
    output += line + '\n';
    // Simple color via innerHTML spans
    const lineEl = document.createElement('div');
    if (line.includes('open')) lineEl.style.color = '#10b981';
    else if (line.includes('filtered')) lineEl.style.color = '#f59e0b';
    else if (line.includes('VULNERABILITY') || line.includes('PAYLOAD') || line.includes('SHELL')) {
      lineEl.style.color = '#ef4444';
      lineEl.style.fontWeight = '900';
      lineEl.style.textShadow = '0 0 10px rgba(239,68,68,0.7)';
    } else if (line.startsWith('PORT')) {
      lineEl.style.color = '#8b5cf6';
      lineEl.style.fontWeight = 'bold';
    }
    lineEl.textContent = line;
    pre.appendChild(lineEl);
    setTimeout(addLine, 90 + Math.random() * 60);
  }
  addLine();

  setTimeout(dismiss, 8000);
}

/* ----------------------------------------------------------
   PWNED — Red skull takeover with matrix-red rain
   ---------------------------------------------------------- */
function eggPwned() {
  if (!document.getElementById('egg-pwned-style')) {
    const s = document.createElement('style');
    s.id = 'egg-pwned-style';
    s.textContent = `
      @keyframes pwnedPulse {
        0%,100%{text-shadow:0 0 20px #ef4444,0 0 60px #ef4444}
        50%{text-shadow:0 0 60px #ef4444,0 0 120px #ef4444,0 0 180px #ef4444}
      }
      @keyframes pwnedShake {
        0%,100%{transform:translate(-50%,-50%) scale(1)}
        25%{transform:translate(calc(-50% - 6px),calc(-50% + 3px)) scale(1.02)}
        75%{transform:translate(calc(-50% + 6px),calc(-50% - 3px)) scale(0.98)}
      }
    `;
    document.head.appendChild(s);
  }

  // Red matrix rain canvas
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', zIndex: '999997', pointerEvents: 'none',
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const cols = Math.floor(canvas.width / 14);
  const drops = Array(cols).fill(0);
  const chars = '01アカタナハ#@!%&PWNED';
  const rain = setInterval(() => {
    ctx.fillStyle = 'rgba(6,6,10,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px monospace';
    for (let i = 0; i < drops.length; i++) {
      ctx.fillStyle = Math.random() > 0.95 ? '#fff' : (Math.random() > 0.7 ? '#ef4444' : 'rgba(239,68,68,0.6)');
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14);
      if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 33);

  // Dark overlay
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(6,6,10,0.6)',
    zIndex: '999998', cursor: 'pointer',
  });
  document.body.appendChild(overlay);

  // Skull + message
  const skull = document.createElement('div');
  Object.assign(skull.style, {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center', zIndex: '999999',
    pointerEvents: 'none',
    animation: 'pwnedPulse 1.5s ease infinite, pwnedShake 0.12s linear infinite',
  });
  skull.innerHTML = `
    <div style="font-size:clamp(60px,15vw,120px);line-height:1;filter:drop-shadow(0 0 30px #ef4444)">💀</div>
    <div style="font-family:monospace;font-size:clamp(1.2rem,4vw,2.5rem);font-weight:900;
      color:#ef4444;letter-spacing:0.2em;margin-top:16px;
      text-shadow:0 0 20px #ef4444,0 0 40px #ef4444;">
      P W N E D
    </div>
    <div style="font-family:monospace;font-size:clamp(0.7rem,2vw,1rem);color:#f87171;
      margin-top:12px;letter-spacing:3px;opacity:0.9;">
      ROOT SHELL ESTABLISHED · SESSION ACTIVE
    </div>
    <div style="font-family:monospace;font-size:0.75rem;color:rgba(248,113,113,0.5);
      margin-top:8px;letter-spacing:1px;">
      click anywhere to exit
    </div>
  `;
  document.body.appendChild(skull);

  const dismiss = () => {
    clearInterval(rain);
    [canvas, overlay, skull].forEach(el => {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    });
  };

  overlay.addEventListener('click', dismiss);
  setTimeout(dismiss, 6000);
}

/* ============================================================
   TRIPLE-CLICK: AUTHORIZATION FAILURE
   Triple-click triggers a violent red glitch strobe
   ============================================================ */
function initTripleClickBurst() {
  let clickCount = 0;
  let clickTimer = null;

  document.addEventListener('click', (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return;
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 500);
    if (clickCount >= 3) { clickCount = 0; triggerSecurityGlitch(); }
  });

  function triggerSecurityGlitch() {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '999999',
      background: 'rgba(239, 68, 68, 0.2)', pointerEvents: 'none',
      mixBlendMode: 'difference',
    });

    // Add warning text
    const text = document.createElement('div');
    Object.assign(text.style, {
      position: 'fixed', top: '10%', right: '5%', zIndex: '999999',
      color: '#ef4444', fontFamily: 'monospace', fontSize: '24px', fontWeight: 'bold',
      textShadow: '0 0 10px #ef4444', pointerEvents: 'none',
    });
    text.textContent = 'ACCESS_DENIED // BRUTE_FORCE_DETECTED';

    document.body.appendChild(overlay);
    document.body.appendChild(text);

    let flashes = 0;
    const interval = setInterval(() => {
      overlay.style.opacity = flashes % 2 === 0 ? '1' : '0';
      text.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
      document.body.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`;
      flashes++;

      if (flashes > 12) {
        clearInterval(interval);
        overlay.remove();
        text.remove();
        document.body.style.transform = '';
      }
    }, 40);
  }
}


/* ============================================================
   EASTER EGG: IDLE / INACTIVITY
   After 40s of no interaction — automated terminal lockout sequence
   ============================================================ */
function initIdleEasterEgg() {
  let idleTimer = null;
  let active = false;

  function resetTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(fireIdle, 40000);
  }

  function fireIdle() {
    if (active) return;
    active = true;
    idleLockoutWarning(() => { active = false; resetTimer(); });
  }

  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt =>
    document.addEventListener(evt, resetTimer, { passive: true })
  );
  resetTimer();
}

function idleLockoutWarning(done) {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'monospace', fontSize: 'clamp(1.5rem,3vw,2.5rem)',
    color: 'rgba(239,68,68,0)', letterSpacing: '0.2em',
    pointerEvents: 'none', zIndex: '99999',
    transition: 'color 0.5s',
    textTransform: 'uppercase', textAlign: 'center',
    fontWeight: 'bold', textShadow: '0 0 10px #ef4444',
  });
  el.innerHTML = `SESSION_TIMEOUT_PENDING<br><span style="font-size:0.5em;opacity:0.7">TERMINAL CONNECTION LOST IN 3...</span>`;
  document.body.appendChild(el);

  // Add a faint red tint
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(239,68,68,0.05)',
    pointerEvents: 'none', zIndex: '99998', opacity: '0', transition: 'opacity 0.5s'
  });
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    el.style.color = 'rgba(239,68,68,0.8)';
    overlay.style.opacity = '1';
  });

  setTimeout(() => {
    el.style.color = 'rgba(239,68,68,0)';
    overlay.style.opacity = '0';
    setTimeout(() => { el.remove(); overlay.remove(); done(); }, 500);
  }, 3500);
}

/* ============================================================
   EASTER EGG: LOGO CLICK SEQUENCE
   Click the nav logo 5× quickly → ACCESS GRANTED takeover
   ============================================================ */
function initLogoClickEgg() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;

  let clicks = 0;
  let timer = null;

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 2000);

    // Shake logo on each click
    logo.style.transition = 'transform 0.05s';
    logo.style.transform = `scale(1.3) rotate(${(Math.random() - 0.5) * 20}deg)`;
    setTimeout(() => { logo.style.transform = ''; logo.style.transition = ''; }, 150);

    if (clicks >= 5) {
      clicks = 0;
      eggAccessFailed();
    }
  });
}

function eggAccessFailed() {
  if (!document.getElementById('egg-fail-style')) {
    const s = document.createElement('style');
    s.id = 'egg-fail-style';
    s.textContent = `
      @keyframes failScan { 0%{top:-5%} 100%{top:110%} }
      @keyframes failPulse {
        0%,100%{text-shadow:0 0 20px #ef4444,0 0 60px #ef4444}
        50%{text-shadow:0 0 60px #ef4444,0 0 120px #ef4444,0 0 200px #ef4444}
      }
      @keyframes failFadeIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.9)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
      .fail-scanline {
        position:absolute;left:0;width:100%;height:4px;
        background:rgba(239,68,68,0.5);
        box-shadow:0 0 20px rgba(239,68,68,0.9);
        animation:failScan 1.4s linear infinite;
        pointer-events:none;
      }
    `;
    document.head.appendChild(s);
  }

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(20,0,0,0.97)',
    zIndex: '999999', cursor: 'pointer',
    overflow: 'hidden',
  });
  overlay.innerHTML = `<div class="fail-scanline"></div>`;
  document.body.appendChild(overlay);

  const content = document.createElement('div');
  Object.assign(content.style, {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center', zIndex: '9999999',
    pointerEvents: 'none',
    animation: 'failFadeIn 0.5s ease forwards',
  });
  content.innerHTML = `
    <div style="font-family:monospace;font-size:clamp(0.8rem,2vw,1rem);color:rgba(239,68,68,0.6);
      letter-spacing:4px;margin-bottom:20px;">BIOMETRIC SCAN: UNRECOGNIZED</div>
    <div style="font-family:monospace;font-size:clamp(2rem,8vw,5rem);font-weight:900;
      color:#ef4444;letter-spacing:0.12em;
      animation:failPulse 0.5s ease infinite;">
      ACCESS DENIED
    </div>
    <div style="font-family:monospace;font-size:clamp(0.7rem,1.5vw,0.95rem);
      color:#ef4444;margin-top:20px;letter-spacing:3px;opacity:0.9;">
      THREAT NEUTRALIZATION PROTOCOLS ENGAGED.
    </div>
    <div style="font-family:monospace;font-size:0.7rem;color:rgba(239,68,68,0.4);
      margin-top:30px;letter-spacing:2px;">[ CLICK TO ABORT SEQUENCE ]</div>
  `;
  document.body.appendChild(content);

  const dismiss = () => {
    [overlay, content].forEach(el => {
      el.style.transition = 'opacity 0.2s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 200);
    });
  };
  overlay.addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

