// PRODUCTOS

const items = [
	{
		id: 1,
		name: 'Polo',
		price: 20.0,
		image: './assets/img/polo1.jpg',
		category: 'polo',
		quantity: 10,
		cantidad: 1,
	},
	{
		id: 2,
		name: 'Polo',
		price: 20.0,
		image: './assets/img/polo2.jpg',
		category: 'polo',
		quantity: 15,
		cantidad: 1,
	},
	{
		id: 3,
		name: 'Polo',
		price: 20.0,
		image: './assets/img/polo3.jpg',
		category: 'polo',
		quantity: 20,
		cantidad: 1,
	},
	{
		id: 4,
		name: 'Camiseta',
		price: 15.0,
		image: './assets/img/camiseta1.jpg',
		category: 'camiseta',
		quantity: 20,
		cantidad: 1,
	},
	{
		id: 5,
		name: 'Camiseta',
		price: 15.0,
		image: './assets/img/camiseta2.jpg',
		category: 'camiseta',
		quantity: 20,
		cantidad: 1,
	},
	{
		id: 6,
		name: 'Sudadera',
		price: 30.0,
		image: './assets/img/sudadera1.jpg',
		category: 'sudadera',
		quantity: 20,
		cantidad: 1,
	},
	{
		id: 7,
		name: 'Sudadera',
		price: 30.0,
		image: './assets/img/sudadera2.jpg',
		category: 'sudadera',
		quantity: 20,
		cantidad: 1,
	},
	{
		id: 8,
		name: 'Sudadera',
		price: 30.0,
		image: './assets/img/sudadera3.jpg',
		category: 'sudadera',
		quantity: 20,
		cantidad: 1,
	},
];

const disable = document.querySelector('body');
const navToogle = document.querySelector('.nav__button');
const navMenu = document.querySelector('.ul');
const hideLinks = document.querySelectorAll('.ul a[href^="#"]');
const closeMenu = document.querySelector('.ul__button');
const cartOpen = document.querySelector('.cart-button');
const cartClose = document.querySelector('.cart-close');
const cartContenedor = document.querySelector('.cart-contenedor');
const listaProductos = document.querySelector('.container');
const cartProducts = document.querySelector('.cart-items');
const deleteCart = document.querySelector('.cart-clean');
const cartCount = document.querySelector('.cart-span');
const totalPrice = document.querySelector('.cart-totalPrice');
const precioRepetido = document.querySelector(".cart-p")

let cart = [];
document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
		actualizarCarrito();
	}
});

deleteCart.addEventListener('click', () => {
	cart.length = 0;
	actualizarCarrito();
});


navToogle.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	disable.classList.toggle('scroll');
});

hideLinks.forEach((menuLink) => {
	menuLink.addEventListener('click', function () {
		navMenu.classList.remove('active');
		disable.classList.remove('scroll');
	});
});

closeMenu.addEventListener('click', () => {
	navMenu.classList.remove('active');
	disable.classList.remove('scroll');
});

cartOpen.addEventListener('click', () => {
	cartContenedor.classList.toggle('open');
	disable.classList.toggle('scroll');
});

cartClose.addEventListener('click', () => {
	cartContenedor.classList.remove('open');
	disable.classList.remove('scroll');
});




items.forEach((elemento) => {
	const div = document.createElement('div');
	div.classList.add('div-info');
	div.innerHTML = `
	<img src=${elemento.image} alt="item" class="div__img" />
	<div class="div-product">
   		<h3 class="div__h3">${elemento.name}</h3>
   		<p>$${elemento.price}.00</p>
   		<button id="agregar${elemento.id}" class="div__button">Agregar</button>
   		<p class="div__p">Existencias: <span class="div__span">${elemento.quantity}</span></p>
   </div>
	`;
	listaProductos.appendChild(div);

	const button = document.getElementById(`agregar${elemento.id}`);

	button.addEventListener('click', () => {
		agregarAlCarrito(elemento.id);
	});
});

const agregarAlCarrito = (prodId) => {
	const existe = cart.some((prod) => prod.id === prodId);
	if (existe) {
		const prod = cart.map((prod) => {
			if (prod.id === prodId) {
				prod.cantidad++;
			}
		});
	} else {
		const item = items.find((prod) => prod.id === prodId);
		cart.push(item);
	}

	actualizarCarrito();

};


const deleteItem = (itemId) => {
	const item = cart.find((elemento) => elemento.id === itemId);
	const index = cart.indexOf(item);
	cart.splice(index, 1);
	actualizarCarrito();
};

const actualizarCarrito = () => {
	cartProducts.innerHTML = '';
	let suma = 0
	// let cantidadTotal = 0


	cart.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('cart-info');
		div.innerHTML = `
    			<img src=${item.image} alt="" class="cart-img" />
				<h3 class="cart-h3">${item.name}</h3>
				<div class="cart-unidades">
					<h2 class="cantidad">${item.cantidad}</h2>
				</div>
				<p class="cart-p">$${item.price}</p>
				<button onclick="deleteItem(${item.id})" class="buttonDelete">
					<i class="bx bx-trash"></i>
				</button>
    
    `;
		let totalProducto = item.cantidad * item.price
		suma += totalProducto


		cartProducts.appendChild(div);
		localStorage.setItem('cart', JSON.stringify(cart));
	});
	cartCount.textContent = cart.length;

	totalPrice.textContent = `$${suma}`


};




