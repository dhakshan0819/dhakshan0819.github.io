/* ====================================================
   DHAKSHAN A — PORTFOLIO INTERACTIVITY
   Premium dark-tech design · Blue/Cyan accents
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
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
    initCursorSpotlight();
    initCardTilt();
    initAchievements();
    initKonamiCode();
    initMagneticButtons();
    initRandomGlitch();
    initConsoleEasterEgg();
    initTextScramble();

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
   TYPING ANIMATION
   ========================== */
function initTypingAnimation() {
  const el = document.getElementById('hero-name');
  if (!el) return;

  const fullText = 'Dhakshan A';
  el.textContent = '';

  let i = 0;
  const speed = 120;

  function type() {
    if (i < fullText.length) {
      el.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 600);
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
   FETCH GITHUB PROJECTS
   ========================== */
async function fetchGitHubProjects() {
  const container = document.getElementById('projects-grid');
  const loading = document.getElementById('projects-loading');
  if (!container) return;

  try {
    const response = await fetch('https://api.github.com/users/dhakshan0819/repos?sort=updated&per_page=100');

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    let repos = await response.json();

    repos = repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

    if (loading) loading.remove();

    if (repos.length === 0) {
      container.innerHTML = `
        <div class="projects-error">
          <p>No public repositories found.</p>
        </div>`;
      return;
    }

    repos.forEach((repo, index) => {
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'project-card fade-in';
      card.style.animationDelay = `${index * 0.08}s`;
      if (repo.language) card.dataset.lang = repo.language.toLowerCase();

      const description = repo.description
        ? escapeHTML(repo.description)
        : '<em style="color: var(--text-tertiary);">No description provided.</em>';

      const languageBadge = repo.language
        ? `<span class="project-badge lang-dot">${escapeHTML(repo.language)}</span>`
        : '';

      const starsBadge = repo.stargazers_count > 0
        ? `<span class="project-badge stars">★ ${repo.stargazers_count}</span>`
        : '';

      const forkBadge = repo.forks_count > 0
        ? `<span class="project-badge">⑂ ${repo.forks_count}</span>`
        : '';

      card.innerHTML = `
        <span class="project-link-icon">↗</span>
        <h3 class="project-name">
          <span class="project-name-icon">◆</span>
          ${escapeHTML(repo.name)}
        </h3>
        <p class="project-desc">${description}</p>
        <div class="project-meta">
          ${languageBadge}
          ${starsBadge}
          ${forkBadge}
        </div>
      `;

      container.appendChild(card);
    });

    // Filter buttons
    const langCounts = {};
    repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
    const filterContainer = document.getElementById('projects-filter');
    if (filterContainer && Object.keys(langCounts).length > 1) {
      const langs = Object.keys(langCounts).sort();
      langs.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = lang.toLowerCase();
        btn.textContent = lang;
        filterContainer.appendChild(btn);
      });
      filterContainer.style.display = 'flex';

      filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.lang === filter) ? '' : 'none';
        });
      });
    }

    initFadeInObserver();

  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    if (loading) loading.remove();
    container.innerHTML = `
      <div class="projects-error">
        <h3>Failed to load projects</h3>
        <p>Could not reach GitHub API. Please check your connection.</p>
        <a href="https://github.com/dhakshan0819" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="margin-top: 16px;">
          View on GitHub <span class="btn-arrow">→</span>
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
   CURSOR SPOTLIGHT
   ========================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  let active = false;
  document.addEventListener('mousemove', (e) => {
    if (!active) {
      active = true;
      spotlight.classList.add('active');
    }
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    active = false;
    spotlight.classList.remove('active');
  });
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
    { id: 'home', icon: '🎯', title: 'Welcome', text: 'You found the portfolio!' },
    { id: 'about', icon: '🔍', title: 'Recon Complete', text: 'Intel gathered on the target.' },
    { id: 'experience', icon: '📜', title: 'History Logged', text: 'Timeline accessed successfully.' },
    { id: 'projects', icon: '💻', title: 'Repos Loaded', text: 'GitHub data stream active.' },
    { id: 'writeups', icon: '📝', title: 'Writeups Found', text: 'CTF knowledge unlocked.' },
    { id: 'contact', icon: '📡', title: 'Signal Acquired', text: 'Communication channel open.' },
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

    // Show badge
    const badge = document.createElement('div');
    badge.className = 'egg-badge';
    badge.textContent = '🥚 Easter Egg Unlocked!';
    document.body.appendChild(badge);
    requestAnimationFrame(() => badge.classList.add('show'));
    setTimeout(() => {
      badge.classList.remove('show');
      setTimeout(() => badge.remove(), 600);
    }, 3000);

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

        // Color variation
        if (Math.random() > 0.95) ctx.fillStyle = '#06b6d4';
        else if (Math.random() > 0.9) ctx.fillStyle = '#8b5cf6';
        else ctx.fillStyle = '#3b82f6';

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
%c╔══════════════════════════════════════╗
║                                      ║
║     ██████╗  █████╗                   ║
║     ██╔══██╗██╔══██╗                  ║
║     ██║  ██║███████║                  ║
║     ██║  ██║██╔══██║                  ║
║     ██████╔╝██║  ██║                  ║
║     ╚═════╝ ╚═╝  ╚═╝                 ║
║                                      ║
║  Dhakshan A · Cybersecurity          ║
║  "You found the source code."       ║
║                                      ║
║  Try: ↑↑↓↓←→←→BA for a surprise    ║
║                                      ║
╚══════════════════════════════════════╝`;

  console.log(art, 'color: #3b82f6; font-family: monospace; font-size: 12px;');
  console.log('%c👋 Looking for vulnerabilities? Smart. I like you.', 'color: #06b6d4; font-size: 14px; font-weight: bold;');
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
