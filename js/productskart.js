// Array para armazenar os produtos no carrinho
let cart = [];

// Função para adicionar produto ao carrinho
function addToCart(name, price, image) {
  const product = cart.find(item => item.name === name);

  if (product) {
    // Se o produto já está no carrinho, aumente a quantidade
    product.quantity++;
  } else {
    // Caso contrário, adicione um novo produto ao carrinho
    cart.push({ name, price, image, quantity: 1 });
  }

  // Salvar o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Função para remover produto do carrinho
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';  // Limpar a lista do carrinho

  let total = 0;

  // Mostrar cada item no carrinho
  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" class="img-fluid" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        <span>${item.name} - $${item.price} x ${item.quantity}</span>
      </div>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">&times;</button>
    `;
    cartItems.appendChild(li);

    total += item.price * item.quantity; // Calcular o total
  });

  cartTotal.textContent = total.toFixed(2); // Atualizar o total no HTML
}

// Função para limpar o carrinho
function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  updateCartDisplay();
}

// Função para abrir e fechar o carrinho
function toggleCart() {
  const cartContainer = document.getElementById('cart-container');
  if (cartContainer.style.transform === 'translateX(100%)') {
    cartContainer.style.transform = 'translateX(0)';
  } else {
    cartContainer.style.transform = 'translateX(100%)';
  }
}

// Recuperar o carrinho do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  if (storedCart) {
    cart = storedCart;
    updateCartDisplay();
  }

  // Adicionar evento ao botão de adicionar ao carrinho
  document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      const image = this.getAttribute('data-image'); // Captura a imagem do produto
      addToCart(name, price, image); // Passa a imagem para a função addToCart
    });
  });

  // Adicionar evento ao botão de limpar carrinho
  document.getElementById('clear-cart').addEventListener('click', clearCart);

  // Botão de abrir e fechar carrinho
  document.getElementById('cart-toggle').addEventListener('click', toggleCart);
  document.getElementById('close-cart').addEventListener('click', toggleCart);
});
