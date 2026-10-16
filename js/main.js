// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = [
  {
    category: "UX & Experience Design",
    items: ["Användarcentrerad design", "UX-design", "Interaktionsdesign"],
  },
  {
    category: "User Research & User Testing",
    items: ["Användarundersökningar", "Användarinsikter", "Användartester"],
  },
  {
    category: "UX & Game Thinking",
    items: ["Spelbaserad design", "Spelmekanik"],
  },
  {
    category: "Design & Prototyping",
    items: ["Figma", "Adobe", "Canva", "Miro", "Wireframing", "Interaktiva prototyper"],
  },
  {
    category: "Programmering & Teknisk utveckling",
    items: ["Visual Studio Code", "HTML", "CSS", "Java", "Git", "GitHub", "Vibe coding"],
  },
  {
    category: "Data, AI & Analys",
    items: ["Artificiell intelligens (AI)", "Analytics", "Statistik", "Datadriven design"],
  },
  {
    category: "Agil metodik & Projektledning",
    items: ["Agila metoder", "Projektledning", "Way of Working", "Iterativ utveckling"],
  },
  {
    category: "Service Design & Affärsutveckling",
    items: ["Tjänstedesign", "Affärsutveckling", "Användarbehov", "Digital tjänsteutveckling"],
  },
  {
    category: "Speldesign",
    items: ["Spelmekanik", "Interaktionsdesign", "Digitala spelupplevelser"],
  },
]

const experience = [
  {
    role: "Butiksmedarbetare",
    company: "Clas Ohlson",
    period: "2022 – nu",
    points: [
      "Arbetat med kundbemötande, försäljning och rådgivning med fokus på att identifiera kundbehov och erbjuda anpassade lösningar.",
      "Utvecklat en stark kommunikativ förmåga och förståelse för kundbeteenden genom daglig kontakt med människor.",
      "Arbetat självständigt och i team i en tempofylld butiksmiljö, med fokus på problemlösning, samarbete och hög servicekvalitet.",
      "Utvecklat förmågan att prioritera, fatta beslut och hantera utmanande situationer med ett lösningsorienterat förhållningssätt.",
    ],
  },
  {
    role: "Butiksmedarbetare",
    company: "Beijer Byggmaterial",
    period: "2021 – 2022",
    points: [
      "Arbetade med varierande arbetsuppgifter inom försäljning, kundservice, varuhantering och daglig butiksdrift.",
      "Utvecklade förmågan att arbeta självständigt och i team med fokus på flexibilitet, problemlösning och effektiv service.",
    ],
  },
]

// ─── RENDER ──────────────────────────────────────────────────────────────────

function renderSkills() {
  const container = document.getElementById("skills-container")
  if (!container) return

  skills.forEach(group => {
    const el = document.createElement("div")
    el.className = "skill-group reveal"
    el.innerHTML = `
      <h4>${group.category}</h4>
      <div class="tags">${group.items.map(s => `<span class="tag">${s}</span>`).join("")}</div>
    `
    container.appendChild(el)
  })
}

function renderExperience() {
  const container = document.getElementById("experience-container")
  if (!container) return

  experience.forEach(job => {
    const el = document.createElement("article")
    el.className = "job reveal"
    el.innerHTML = `
      <p class="period">${job.period}</p>
      <div>
        <h3>${job.role}</h3>
        <p class="company">${job.company}</p>
        <ul>${job.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    `
    container.appendChild(el)
  })
}

// ─── THEME ───────────────────────────────────────────────────────────────────

function toggleTheme() {
  const root = document.documentElement
  const dark = root.dataset.theme !== "dark"
  if (dark) root.dataset.theme = "dark"
  else delete root.dataset.theme
  try { localStorage.setItem("theme", dark ? "dark" : "light") } catch (e) {}
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────

function initMobileMenu() {
  const btn = document.getElementById("menu-btn")
  const menu = document.getElementById("mobile-menu")
  if (!btn || !menu) return

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open")
    btn.setAttribute("aria-expanded", open)
  })

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open")
      btn.setAttribute("aria-expanded", "false")
    })
  })
}

// ─── LIGHTBOX (portfolio) ────────────────────────────────────────────────────

function initLightbox() {
  const box = document.getElementById("lightbox")
  if (!box) return
  const img = box.querySelector("img")

  document.querySelectorAll(".shot").forEach(shot => {
    shot.addEventListener("click", () => {
      const src = shot.querySelector("img")
      img.src = src.src
      img.alt = src.alt
      box.classList.add("open")
      document.body.style.overflow = "hidden"
    })
  })

  const close = () => {
    box.classList.remove("open")
    document.body.style.overflow = ""
  }
  box.addEventListener("click", close)
  document.addEventListener("keydown", e => { if (e.key === "Escape") close() })
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

function initReveal() {
  const targets = document.querySelectorAll(".reveal")
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("visible"))
    return
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  targets.forEach(el => observer.observe(el))
}

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderSkills()
  renderExperience()
  initMobileMenu()
  initLightbox()
  initReveal()

  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme)
  const year = document.getElementById("year")
  if (year) year.textContent = new Date().getFullYear()
})
