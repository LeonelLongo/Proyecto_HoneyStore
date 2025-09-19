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

const form = document.getElementById("formContacto");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Por favor, completá todos los campos obligatorios.");
    return;
  }

  if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("Por favor, ingresá un correo electrónico válido.");
    return;
  }

  alert("✅ ¡Gracias por contactarnos! Te responderemos pronto.");
  form.reset();
});
