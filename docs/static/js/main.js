// NaturalGrowth categories (31)
const CATEGORIES = [
  "almonds", "banana", "broccoli", "carrot", "cashew", "cherry radish", "chestnut kernel",
  "chili", "clementine", "fava bean", "green bean", "hawthorn", "sweet potato", "jujube",
  "kiwifruit", "loquat", "lychee", "mandarin", "mango", "mangosteen", "mushroom", "onion",
  "orange", "peanut", "peanut kernel", "persimmon", "potato", "snow pea", "strawberry",
  "walnut", "yam bean"
];

const chips = document.getElementById("category-chips");
if (chips) {
  CATEGORIES.forEach((name) => {
    const el = document.createElement("span");
    el.className = "chip";
    el.textContent = name;
    chips.appendChild(el);
  });
}

// Nav background after scrolling past the top
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Count-up animation for the stats
function countUp(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Reveal-on-scroll (also triggers bars and counters)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    const num = entry.target.querySelector(".stat-num");
    if (num && !reduceMotion) countUp(num);
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Copy BibTeX
const copyBtn = document.getElementById("copy-bib");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const text = document.getElementById("bib-text").textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
    } catch (e) {
      copyBtn.textContent = "Select and copy manually";
    }
    setTimeout(() => { copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy'; }, 1800);
  });
}
