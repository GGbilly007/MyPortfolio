/* ─── STARS ─── */
const sw = document.getElementById('stars');
for (let i = 0; i < 150; i++) {
  const s = document.createElement('div'); s.className = 'star';
  const sz = (Math.random() * 2.2 + 0.6).toFixed(1);
  s.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 65).toFixed(1)}%;width:${sz}px;height:${sz}px;--d:${(Math.random() * 3 + 2).toFixed(1)}s;--dl:-${(Math.random() * 5).toFixed(1)}s`;
  sw.appendChild(s);
}

/* ─── FIREFLIES ─── */
const fe = document.getElementById('fflies');
for (let i = 0; i < 24; i++) {
  const f = document.createElement('div'); f.className = 'ff';
  f.style.cssText = `left:${(Math.random() * 100).toFixed(1)}vw;top:${(50 + Math.random() * 44).toFixed(1)}vh;--fd:${(Math.random() * 7 + 6).toFixed(1)}s;--fdl:-${(Math.random() * 9).toFixed(1)}s;--fx1:${(Math.random() * 70 - 35).toFixed(0)}px;--fy1:${(-(Math.random() * 50 + 20)).toFixed(0)}px;--fx2:${(Math.random() * 90 - 45).toFixed(0)}px;--fy2:${(-(Math.random() * 80 + 30)).toFixed(0)}px;--fx3:${(Math.random() * 60 - 30).toFixed(0)}px;--fy3:${(-(Math.random() * 40 + 10)).toFixed(0)}px`;
  fe.appendChild(f);
}

/* ─── THEME TOGGLE ─── */
let night = true;
document.getElementById('togBtn').addEventListener('click', () => {
  night = !night;
  document.documentElement.setAttribute('data-theme', night ? 'night' : 'day');
  document.getElementById('togK').textContent = night ? '🌙' : '☀️';
  document.getElementById('togLbl').textContent = night ? 'Nighttime' : 'Daytime';
});

/* ─── PAGE NAVIGATION ─── */
// BUG FIX: ใช้ visibility + opacity แทน display:none/block
// เพื่อให้ CSS transition ทำงานได้ smooth
function goPage(id) {
  // hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  document.querySelectorAll('.nav-pages a').forEach(a => a.classList.remove('active'));

  // show target with smooth transition
  const target = document.getElementById('page-' + id);
  if (!target) return;

  // Use rAF to allow display:block to paint before triggering transition
  requestAnimationFrame(() => {
    target.classList.add('active');
  });

  // nav highlight
  const link = document.querySelector(`.nav-pages a[data-page="${id}"]`);
  if (link) link.classList.add('active');

  // scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav links
document.querySelectorAll('.nav-pages a').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); goPage(a.dataset.page); });
});

/* ─── PROJECT CATEGORY FILTER ─── */
document.getElementById('catTabs').addEventListener('click', e => {
  const tab = e.target.closest('.cat-tab');
  if (!tab) return;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const cat = tab.dataset.cat;
  document.querySelectorAll('.proj-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? '' : 'none';
  });
});