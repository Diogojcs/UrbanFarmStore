// Alterna a visibilidade da senha

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  // Alterna entre os tipos de senha e texto
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Alterna o ícone entre eye e eye-slash (ICONE BOOTSTRAP)
  this.classList.toggle("bi-eye");
  this.classList.toggle("bi-eye-slash");
});

// Validação de Formulário
const form = document.getElementById("loginForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  let isValid = true;

  // Validação de email
  if (!email.value || !email.value.includes("@")) {
    email.classList.add("is-invalid");
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
  }

  // Validação de senha
  if (!password.value) {
    password.classList.add("is-invalid");
    isValid = false;
  } else {
    password.classList.remove("is-invalid");
  }

  if (isValid) {
    // Simular o processo de login com um carregador
    const button = e.target.querySelector("button");
    button.classList.add("loading");

    // Simulando um atraso para login (por exemplo, envio para o servidor)
    setTimeout(() => {
      button.classList.remove("loading");
      alert("Login successful!");
      //  Redirecionar ou manipular ainda mais a lógica de login
    }, 2000);
  }
});
