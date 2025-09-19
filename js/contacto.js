const toggleDarkBtn = document.getElementById("toggleDark");
const body = document.body;

toggleDarkBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const motivo = document.getElementById("motivo");
  const mensaje = document.getElementById("mensaje");
  const fecha = document.getElementById("fecha");
  const btn = form.querySelector(".btn-enviar");

  const errNombre = document.getElementById("errorNombre");
  const errEmail = document.getElementById("errorEmail");
  const errTelefono = document.getElementById("errorTelefono");
  const errMotivo = document.getElementById("errorMotivo");
  const errMensaje = document.getElementById("errorMensaje");
  const errFecha = document.getElementById("errorFecha");
  const contador = document.getElementById("contador");

  const setError = (inputEl, errEl, msg) => {
    inputEl.setCustomValidity(msg || "");
    inputEl.setAttribute("aria-invalid", msg ? "true" : "false");
    if (errEl) errEl.textContent = msg || "";
  };

  const validarNombre = () => {
    const val = nombre.value.trim();
    if (val.length < 3) {
      setError(nombre, errNombre, "Ingresá tu nombre (mínimo 3 caracteres).");
      return false;
    }
    setError(nombre, errNombre, "");
    return true;
  };

  const validarEmail = () => {
    const val = email.value.trim();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(val);
    if (!ok) {
      setError(email, errEmail, "Ingresá un correo válido (ej: tu@correo.com).");
      return false;
    }
    setError(email, errEmail, "");
    return true;
  };

  const validarTelefono = () => {
    const val = telefono.value.trim();
    if (val === "") {
      setError(telefono, errTelefono, "");
      return true; 
    }
    const ok = /^[+()\-.\s\d]{7,20}$/.test(val);
    if (!ok) {
      setError(telefono, errTelefono, "Formato no válido. Usá solo números y + ( ) - . espacios (7–20).");
      return false;
    }
    setError(telefono, errTelefono, "");
    return true;
  };

  const validarMotivo = () => {
    if (!motivo.value) {
      setError(motivo, errMotivo, "Seleccioná un motivo.");
      return false;
    }
    setError(motivo, errMotivo, "");
    return true;
  };

  const validarMensaje = () => {
    const val = mensaje.value.trim();
    contador.textContent = `${val.length}/500`;
    if (val.length < 10 || val.length > 500) {
      setError(mensaje, errMensaje, "El mensaje debe tener entre 10 y 500 caracteres.");
      return false;
    }
    setError(mensaje, errMensaje, "");
    return true;
  };

  const validarFecha = () => {
    if (!fecha.value) {
      setError(fecha, errFecha, "");
      return true;
    }
    if (fecha.min && fecha.value < fecha.min) {
      setError(fecha, errFecha, "Elegí una fecha desde hoy en adelante.");
      return false;
    }
    setError(fecha, errFecha, "");
    return true;
  };

  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  telefono.addEventListener("input", validarTelefono);
  motivo.addEventListener("change", validarMotivo);
  mensaje.addEventListener("input", validarMensaje);
  fecha.addEventListener("input", validarFecha);

  form.addEventListener("submit", (e) => {
    const ok =
      validarNombre() &
      validarEmail() &
      validarTelefono() &
      validarMotivo() &
      validarMensaje() &
      validarFecha();

    if (!ok || !form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      const primeroInvalido = form.querySelector("[aria-invalid='true'], :invalid");
      if (primeroInvalido) primeroInvalido.focus();
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando…";
  });

  validarMensaje();
});
