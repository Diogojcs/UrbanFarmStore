// Função para alternar entre os campos de pessoa física e jurídica
function togglePessoaFields() {
  const isPessoaFisica = document.getElementById("pessoaFisica").checked;
  const dadosFisica = document.getElementById("dadosPessoaFisica");
  const dadosJuridica = document.getElementById("dadosPessoaJuridica");

  if (isPessoaFisica) {
    dadosFisica.style.display = "block";
    dadosJuridica.style.display = "none";
  } else {
    dadosFisica.style.display = "none";
    dadosJuridica.style.display = "block";
  }
}

// Máscara e limitação de entrada para CPF e CNPJ
function aplicarMascara() {
  const cpfInput = document.getElementById("txtCPF");
  const cnpjInput = document.getElementById("txtCNPJ");
  const telefoneInput = document.getElementById("txtTelefone");

  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      let cpf = cpfInput.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
      if (cpf.length > 11) cpf = cpf.substring(0, 11); // Limita o CPF a 11 dígitos
      cpfInput.value = cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });
  }

  if (cnpjInput) {
    cnpjInput.addEventListener("input", function () {
      let cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
      if (cnpj.length > 14) cnpj = cnpj.substring(0, 14); // Limita o CNPJ a 14 dígitos
      cnpjInput.value = cnpj
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{4})(\d{2})/, "$1/$2-$3");
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener("input", function () {
      let telefone = telefoneInput.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico

      if (telefone.length > 11) telefone = telefone.substring(0, 11); // Limita a 11 dígitos

      telefoneInput.value = telefone
        .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses ao DDD
        .replace(/(\d{5})(\d{4})$/, "$1-$2"); // Formata o número com hífen
    });
  }
}

// Função para validar o formulário
function validarFormulario() {
  const nome = document.getElementById("txtNome").value;
  const cpf = document.getElementById("txtCPF").value;
  const cnpj = document.getElementById("txtCNPJ").value;
  const email = document.getElementById("txtEmail").value;
  const telefone = document.getElementById("txtTelefone").value;
  const senha = document.getElementById("txtSenha").value;
  const confirmacaoSenha = document.getElementById("txtConfirmacaoSenha").value;

  // Verifica o tipo de pessoa
  const isPessoaFisica = document.getElementById("pessoaFisica").checked;

  // Validação para Pessoa Física
  if (isPessoaFisica) {
    if (!nome) {
      alert("The Name field is mandatory.");
      return false;
    }

    if (cpf.length !== 14) {
      // O CPF formatado tem 14 caracteres (incluindo pontos e traço)
      alert("Please enter a valid CPF.");
      return false;
    }
  }
  // Validação para Pessoa Jurídica
  else {
    if (cnpj.length !== 18) {
      // O CNPJ formatado tem 18 caracteres (incluindo pontos, barra e traço)
      alert("Please enter a valid CNPJ.");
      return false;
    }
  }

  if (!email || !validarEmail(email)) {
    alert("Please enter a valid email.");
    return false;
  }

  if (!telefone) {
    alert("The Telephone field is mandatory.");
    return false;
  }

  if (!senha || senha.length < 6) {
    alert("The password must be at least 6 characters long.");
    return false;
  }

  if (senha !== confirmacaoSenha) {
    alert("Passwords do not match.");
    return false;
  }

  return true; // Se tudo estiver correto, o formulário é enviado
}

// Validação de formato de e-mail
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Aplicar as máscaras de CPF e CNPJ ao carregar o formulário
document.addEventListener("DOMContentLoaded", function () {
  aplicarMascara();
  togglePessoaFields(); // Configura a visibilidade inicial
});
