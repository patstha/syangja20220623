import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Syangja!</h1>
  <p class="text-success">my name is pratikchhya</p>
`
const hero = kushal("/biruwa.jpeg", "biruwa,syangja");
app.appendChild(hero);

function kushal(address: string, alt: string): HTMLImageElement {
  const el = new Image();
  el.src = address;
  el.alt = alt;
  el.classList.add("img");
  el.classList.add("img-responsive");
  el.classList.add("img-thumbnail");
  return el;
}