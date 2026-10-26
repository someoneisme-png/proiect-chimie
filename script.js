const bg = document.getElementById("bg");
const hero = document.getElementById("hero");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

const textComplet = quoteText.textContent.trim()
const cuvinte = textComplet.split(" ");


quoteText.setAtttribute("aria-label", textComplet);
quoteText.textContent = "";

const intarziereStart=1;
const pauzaIntreCuvinte=0.35;

cuvinte.forEach((cuvant, index) => {
  const span = document.createElement("span");
  span.className = "cuvant";
  span.textContent = cuvant;
  span.style.animationDelay = `${intarziereStart + index * pauzaIntreCuvinte}s`;
  quoteText.appendChild(span);

  if (index < cuvinte.lenght -1) {
    quoteText.appendChild(document.createTextNode(" "));
  }
});

const timpTotal = (intarziereStart + cuvinte.length * pauzaIntreCuvinte + 0.9) * 1000;
setTimeout(() => quoteAuthor.classList.add("vizibil"), timpTotal);


let asteapta=false;
function actualizeaza() {
    const scroll=window.scrollY;
    const progres = Math.min(scroll / (window.innerHeight * 0.9), 1);
    bg.style.opacity= 1 - progres;
    hero.style.opacity = 1 - progres * 1.3;
  hero.style.transform = `translateY(${scroll * 0.25}px)`;

  asteapta = false;
}
window.addEventListener("scroll", () => {
  if (!asteapta) {
    requestAnimationFrame(actualizeaza);
    asteapta = true;
  }
});
actualizeaza();

const observer = new IntersectionObserver(
  (intrari) => {
    intrari.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("activ");
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  