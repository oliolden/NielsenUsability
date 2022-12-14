let navItems = [];
const navList = document.querySelector(".nav-list");
const content = document.querySelector(".content");
const title = document.querySelector(".content > h1");
const text = document.querySelector(".content > p");
const consoleElement = document.querySelector(".console");
const menuButton = document.querySelector(".menu-button");
let active;
const ac = new AbortController();

import data from './data.json' assert { type: 'json' };

async function SlowWrite(text, dest, { signal } = {}) {
    try {
        for (let i = 0; i < text.length; i++) {
            dest.innerHTML += text[i];
            await new Promise(r => setTimeout(r, 5));
        }
    } catch (error) {
        console.log("No");
    }
}

async function Print(out) {
    // for (let i = 0; i < out.length; i++) {
    //     consoleElement.innerHTML += out[i];
    //     await new Promise(r => setTimeout(r, 10));
    // }
    // consoleElement.innerHTML += "<br>";
    consoleElement.innerHTML += out + "<br>";
}

async function Load(id, { signal } = {}) {
    if (active == id) return;
    
    
    // Page logic
    Print("Loading new page...");
    if (active != null) navItems[active].classList.remove("active");
    active = id;
    navItems[active].classList.add("active");
    ac.abort();
    
    try {
    // Animate content
    content.animate([
        { transform: "scaleY(1)" },
        { transform: "scaleY(0)" },
        { transform: "scaleY(0)" },
        { transform: "scaleY(1)" }
    ], { duration: 200, iterations: 1 });
    
    // Clear text
    title.innerHTML = "";
    text.innerHTML = "";
    // Slow write new text
        await SlowWrite(("00" + (id + 1)).slice(-2) + " : " + data[active].title, title);
        await SlowWrite(data[active].text, text);
        Print("Loading complete.");
    } catch (error) {
        console.log("plz");
    }
}

Print("Connecting...");
Print("Loading pages...");
for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // Create nav-item element
    let element = document.createElement("li");
    element.classList.add("nav-item")

    // Create and append id    
    let id = document.createElement("span");
    id.classList.add("id");
    id.appendChild(document.createTextNode(("00" + (i + 1)).slice(-2)));
    element.appendChild(id);

    // Create and append title
    let title = document.createElement("span");
    title.classList.add("name");
    title.appendChild(document.createTextNode(item.title));
    element.appendChild(title);

    // Append to list
    navList.appendChild(element);
    navItems.push(element);
}
Print("Loaded");
Print("Welcome!");

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => { Load(i, { signal: ac.signal }); });
}

Load(0);

menuButton.addEventListener("click", () => {
    if (document.body.ariaExpanded == "true") {
        document.body.ariaExpanded = "false"
    } else {
        document.body.ariaExpanded = "true"
    }
})