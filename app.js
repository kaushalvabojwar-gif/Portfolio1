/* ============================================================
   app.js — Kaushal Abojwar Portfolio
   Pure Vanilla JavaScript — no frameworks, no CDN required
   ============================================================ */

/* ── PROJECTS DATA ── */
const PROJECTS = [
  {
    num: "01",
    title: "IoT Smart Irrigation System",
    subtitle: "Real-time automated crop watering with multi-sensor feedback",
    tags: ["IoT", "ESP32", "Firebase", "Sensors", "Automation", "Blynk"],
    metrics: [
      "Water usage reduced by 30–40%",
      "ESP32 + soil moisture / DHT22 / pH sensors",
      "Real-time Blynk dashboard with remote override",
      "Firebase time-series data logging",
      "Automated pump relay via feedback threshold",
    ],
    desc: "A precision irrigation controller that reads soil moisture, temperature, humidity, and pH in real time. Threshold-based logic activates a relay-controlled pump; the Blynk app provides remote override and live data charts stored in Firebase.",
  },
  {
    num: "02",
    title: "Food Spoilage Detection (AI)",
    subtitle: "Computer vision & gas sensing with on-device ML inference",
    tags: ["OpenCV", "TensorFlow Lite", "CNN", "MQ-135", "Arduino", "Python"],
    metrics: [
      "Visual + gas-sensor dual detection",
      "CNN model accuracy: ~92% on test set",
      "MQ-135 volatile compound sensing",
      "Arduino + Python bridge pipeline",
      "Real-time colour / texture classification",
    ],
    desc: "Dual-modality spoilage detector combining OpenCV colour / texture analysis with MQ-135 gas sensor readings. A CNN model (TensorFlow Lite) runs on-device inference; flagged samples trigger an alert with spoilage probability and suggested disposal guidance.",
  },
  {
    num: "03",
    title: "Railway Track Monitoring (IoT ML)",
    subtitle: "Predictive maintenance with LPWAN telemetry and SVM / RNN models",
    tags: ["IoT", "LPWAN / LoRa", "SVM", "RNN", "Predictive Maintenance", "Python"],
    metrics: [
      "ML accuracy: SVM & RNN ~85–90%",
      "Unplanned downtime reduced by 20–25%",
      "Telemetry: LPWAN (LoRa) + Wi-Fi sensor nodes",
      "Captures vibration, temperature, structural pressure",
      "Edge-alert system for critical anomalies",
    ],
    desc: "Distributed IoT sensor network placed along track segments. LoRa-based LPWAN transmits vibration, temperature, and pressure telemetry to a central hub. SVM and RNN models classify normal vs. fault states; anomalies trigger maintenance alerts before failures occur.",
  },
];

const ROLES = [
  "Instrumentation Engineer",
  "PLC Programmer",
  "IoT Systems Builder",
  "Control Systems Designer",
  "Automation Developer",
];

const TERMINAL_FACTS = [
  "> name: Kaushal Abojwar",
  "> degree: B.E. Instrumentation & Control Engg",
  "> college: DYPCOE, Akurdi, Pune",
  "> cgpa: 8.21 / 10",
  "> year: Third Year (2025–2026)",
  "> internship: ShreeTech Data Ltd — Jan 2026",
  "> role: Google Student Ambassador",
  "> interests: PLC · IoT · ML · Panel Design",
  "> status: Open to opportunities ✓",
];

/* ── SCROLL HELPER ── */
window.scrollTo = function (id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

/* ── MOBILE MENU ── */
window.toggleMenu = function () {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("open");
};

/* ── NAVBAR SCROLL SPY ── */
(function () {
  const sections = ["home", "about", "education", "experience", "projects", "skills", "contact"];
  window.addEventListener("scroll", function () {
    const y = window.scrollY + 80;
    let current = "home";
    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && y >= el.offsetTop) current = id;
    });
    document.querySelectorAll(".navbar-link").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.section === current);
    });
  }, { passive: true });
})();

/* ── TYPEWRITER ── */
(function () {
  const el = document.getElementById("typewriter");
  if (!el) return;
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const role = ROLES[ri];
    if (!deleting) {
      el.textContent = role.slice(0, ci + 1);
      ci++;
      if (ci === role.length) { deleting = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 65);
    } else {
      el.textContent = role.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % ROLES.length; setTimeout(tick, 200); return; }
      setTimeout(tick, 35);
    }
  }
  tick();
})();

/* ── TERMINAL ANIMATION ── */
(function () {
  const body = document.getElementById("terminal-body");
  if (!body) return;
  let li = 0;

  function nextLine() {
    if (li >= TERMINAL_FACTS.length) {
      // Loop after a pause
      setTimeout(function () {
        body.innerHTML = '<div><span class="t-p">$ </span><span class="t-t">cat quick_facts.txt</span></div>';
        li = 0;
        setTimeout(nextLine, 500);
      }, 3000);
      return;
    }
    const fact = TERMINAL_FACTS[li];
    const line = document.createElement("div");
    line.style.overflow = "hidden";
    line.style.whiteSpace = "nowrap";
    body.appendChild(line);

    let c = 0;
    function typeChar() {
      const span = document.createElement("span");
      if (fact.startsWith(">")) {
        span.className = c === 0 ? "t-p" : "t-t";
      } else {
        span.className = "t-t";
      }
      line.innerHTML = '<span class="t-p">' + fact.slice(0, 1) + '</span><span class="t-t">' + fact.slice(1, c + 1) + '</span>';
      c++;
      if (c < fact.length) {
        setTimeout(typeChar, 14);
      } else {
        li++;
        body.scrollTop = body.scrollHeight;
        setTimeout(nextLine, 350);
      }
    }
    typeChar();
  }
  setTimeout(nextLine, 500);
})();

/* ── PROJECT TABS ── */
var currentProject = 0;

function renderProject(idx) {
  const p = PROJECTS[idx];
  const panel = document.getElementById("proj-panel");
  if (!panel) return;

  panel.innerHTML = `
    <div class="card" style="padding:2rem">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:1.05rem">
        <div style="width:38px;height:38px;border-radius:6px;background:var(--accent-dim);border:1px solid rgba(220,38,38,.2);display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:var(--f-mono);font-size:.75rem;font-weight:700;flex-shrink:0">${p.num}</div>
        <div>
          <div class="card-title">${p.title}</div>
          <div style="font-size:.82rem;color:var(--text-muted);margin-top:2px">${p.subtitle}</div>
        </div>
      </div>
      <p style="font-size:.9rem;color:var(--text-muted);line-height:1.75;margin-bottom:1.25rem">${p.desc}</p>
      <div class="proj-metrics">
        ${p.metrics.map(m => `<div class="proj-metric">${m}</div>`).join("")}
      </div>
      <div class="tag-row">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  `;
}

window.switchProject = function (idx) {
  currentProject = idx;
  document.querySelectorAll(".proj-tab").forEach(function (btn, i) {
    btn.classList.toggle("active", i === idx);
  });
  renderProject(idx);
};

// Init first project
document.addEventListener("DOMContentLoaded", function () {
  renderProject(0);

  /* ── STAT COUNTERS ── */
  const stats = document.querySelectorAll(".stat-val[data-target]");
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const dec = parseInt(el.dataset.dec || "0");
      const suffix = el.dataset.suffix || "";
      const dur = 1200;
      const step = 16;
      const steps = dur / step;
      let cur = 0;
      const inc = target / steps;
      const timer = setInterval(function () {
        cur = Math.min(cur + inc, target);
        el.textContent = cur.toFixed(dec) + suffix;
        if (cur >= target) clearInterval(timer);
      }, step);
    });
  }, { threshold: 0.3 });

  stats.forEach(function (el) { observer.observe(el); });
});

/* ── CONTACT FORM ── */
window.sendEmail = function (e) {
  e.preventDefault();
  const name = document.getElementById("cf-name").value;
  const email = document.getElementById("cf-email").value;
  const msg = document.getElementById("cf-msg").value;
  const sub = encodeURIComponent("Portfolio Contact from " + name);
  const body = encodeURIComponent("From: " + name + " <" + email + ">\n\n" + msg);
  window.open("mailto:abojwarkaushal@gmail.com?subject=" + sub + "&body=" + body);
};
