const toggleDarkBtn = document.getElementById("toggleDark");
const body = document.body;

toggleDarkBtn.addEventListener("click", () => {
body.classList.toggle("dark-mode");

// Guardamos preferencia en localStorage
if (body.classList.contains("dark-mode")) {
    localStorage.setItem("modo", "oscuro");
} else {
    localStorage.setItem("modo", "claro");
    }
});


window.addEventListener("load", () => {
    const modoGuardado = localStorage.getItem("modo");
    if (modoGuardado === "oscuro") {
        body.classList.add("dark-mode");
        }
});
