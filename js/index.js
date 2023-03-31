import data from './database.js';

let cartProducts = [];

const loadData = () => {
  renderProducts(data);
  renderCart(cartProducts);
  categoryFilter();
  searchProduct();
};

const renderProducts = (products) => {
  const productList = document.querySelector('.products-list');

  productList.innerHTML = '';

  products.map((product) => productList.appendChild(card(product)));

  listenAddBtn();
  return;
};

const renderCart = (products) => {
  const cart = document.querySelector('.cart');
  cart.innerHTML = '';

  const title = document.createElement('h2');
  title.innerHTML = 'Carrinho de compras';

  cart.appendChild(title);

  if (products.length === 0) {
    const empty = document.createElement('div');
    empty.classList.add('empty');
    const text1 = document.createElement('h3');
    text1.innerHTML = 'Carrinho vazio';
    const text2 = document.createElement('p');
    text2.innerHTML = 'Adicione itens';

    empty.append(text1, text2);
    cart.appendChild(empty);
  } else {
    const cartList = document.createElement('ul');
    cartList.classList.add('cart-list');

    products.map((product) => cartList.appendChild(cartItem(product)));
    cart.appendChild(cartList);
    cart.appendChild(totalContainer(products));
    listenRemoveBtn();
  }
};

const cartItem = (product) => {
  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-item');

  const img = document.createElement('img');
  img.src = product.img;
  const container = document.createElement('div');
  const name = document.createElement('h3');
  name.innerHTML = product.nameItem;
  const price = document.createElement('span');
  price.innerHTML = product.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  removeBtn.id = product.id;
  removeBtn.innerHTML = 'Remover produto';

  container.append(name, price, removeBtn);
  cartItem.append(img, container);

  return cartItem;
};

const card = (product) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = product.id;

  const img = document.createElement('img');
  img.src = product.img;
  const category = document.createElement('span');
  category.innerHTML = product.tag[0];

  const name = document.createElement('h3');
  name.innerHTML = product.nameItem;

  const description = document.createElement('p');
  description.innerHTML = product.description;

  const price = document.createElement('span');
  price.innerHTML = product.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const addBtn = document.createElement('button');
  addBtn.classList.add('addBtn');
  addBtn.id = product.id;
  addBtn.innerHTML = product.addCart;

  card.append(img, category, name, description, price, addBtn);

  return card;
};

const listenAddBtn = () => {
  const addBtns = document.querySelectorAll('.addBtn');

  addBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = data.filter((product) => product.id == btn.id);

      if (cartProducts.includes(product[0])) {
        return;
      } else {
        cartProducts.push(product[0]);

        renderCart(cartProducts);
      }
    });
  });
};

const listenRemoveBtn = () => {
  const removeBtns = document.querySelectorAll('.removeBtn');

  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const remove = cartProducts.filter((product) => product.id != btn.id);
      cartProducts = remove;

      renderCart(remove);
    });
  });
};

const totalContainer = (products) => {
  const container = document.createElement('div');
  container.classList.add('total-container');

  const quantityContainer = document.createElement('div');
  const quantityText = document.createElement('p');
  quantityText.innerHTML = 'Quantidade:';
  const quantity = document.createElement('p');
  quantity.innerHTML = products.length;
  quantityContainer.append(quantityText, quantity);

  const totalContainer = document.createElement('div');
  const totalText = document.createElement('p');
  totalText.innerHTML = 'Total:';
  const total = document.createElement('p');
  total.innerHTML = products
    .reduce((acc, cur) => acc + cur.value, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  totalContainer.append(totalText, total);

  container.append(quantityContainer, totalContainer);

  return container;
};

const categoryFilter = () => {
  const navList = document.querySelectorAll('.category');

  navList.forEach((listItem) => {
    listItem.addEventListener('click', () => {
      if (listItem.innerHTML === 'Todos') {
        return renderProducts(data);
      } else {
        const filter = data.filter(
          (product) => product.tag[0] === listItem.innerHTML,
        );

        return renderProducts(filter);
      }
    });
  });
};

const searchProduct = () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const filter = data.filter((product) =>
      product.nameItem.toLowerCase().includes(input.value.toLowerCase()),
    );

    return renderProducts(filter);
  });
};

loadData();
