# The Dev Store

**The Dev** Store es una aplicación web de e-commerce desarrollada con React JS, orientada a la venta de productos electrónicos. La plataforma cuenta con tres categorías principales: Hardware, Accesorios de Oficina y Personalización y Decoración. Cada categoría incluye subcategorías específicas que facilitan la navegación y organización de los productos.

El objetivo principal de la aplicación es permitir a los usuarios explorar los productos disponibles en stock, consultar una breve descripción de cada artículo y seleccionar la cantidad deseada para su compra. Los usuarios pueden interactuar con un carrito de compras totalmente funcional, típico de todo sistema de comercio electrónico.

Entre las funcionalidades principales se incluyen:

* Visualización detallada de productos por categoría y subcategoría.
* Selección de cantidad de productos y agregado al carrito.
* Gestión del carrito: sumar, eliminar o vaciar productos.
* Formulario de finalización de compra, donde el cliente ingresa sus datos personales.
* Generación automática de una orden de compra con código de transacción único, que se almacena en la base de datos.

Esta aplicación simula una experiencia de compra real y completa, aplicando buenas prácticas de desarrollo web y arquitectura de software.

## Tecnologías utilizadas

### 🧠 Frontend
- **React JS** – Librería principal para construir la interfaz.
- **React Router DOM** – Para navegación entre rutas.
- **Context API** – Manejo de estado global (carrito de compras).
- **CSS puro** – Estilos personalizados sin frameworks externos.

### 🔗 Base de datos
- **Firebase Firestore** – Base de datos NoSQL en tiempo real para almacenar órdenes de compra.

### 🛠️ Herramientas y entorno
- **Vite** – Bundler y entorno de desarrollo rápido.
- **Git & GitHub** – Control de versiones y repositorio.
- **VS Code** – Editor de código.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/ImanolPeralta/Segunda-PreEntrega-React-Coder.git
```

Instala las dependencias del frontend:

```bash
cd the-dev-store
npm install
```

Ejecuta la aplicación:

```bash
npm run dev
```

## Estructura del proyecto

```bash

THE-DEV-STORE/
├── dist/
│   ├── assets/
│   │   ├── ajax-loader-BcnMEykj.gif
│   │   ├── Anta-Regular-DzzVeyfu.ttf
│   │   ├── devstorelogo-DNcwKKHD.jpg
│   │   ├── index-C1dmQ2My.js
│   │   ├── index-KrmjHUF2.css
│   │   ├── SairaCondensed-Regular-BXW8vl_s.ttf
│   │   ├── slick-BlzDm7g2.svg
│   │   └── thedevstorefavicon-ffOd46TS.ico
│   ├── index.html
│   ├── the dev store 1.png
│   ├── the dev store 2.png
│   ├── the dev store 3.png
│   └── thedevstorefavicon.ico
├── public/
│   ├── the-dev-store1.png
│   ├── the-dev-store2.png
│   ├── the-dev-store3.png
│   └── thedevstorefavicon.ico
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── Anta-Regular.ttf
│   │   │   └── SairaCondensed-Regular.ttf
│   │   └── images/
│   │       └── devstorelogo.jpg
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── Cart.css
│   │   │   └── Cart.jsx
│   │   ├── CartItem/
│   │   │   ├── CartItem.css
│   │   │   └── CartItem.jsx
│   │   ├── CartWidget/
│   │   │   ├── CartWidget.css
│   │   │   └── CartWidget.jsx
│   │   ├── Checkout/
│   │   │   ├── Checkout.css
│   │   │   └── Checkout.jsx
│   │   ├── CheckoutForm/
│   │   │   ├── CheckoutForm.css
│   │   │   └── CheckoutForm.jsx
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── Item/
│   │   │   ├── Item.css
│   │   │   └── Item.jsx
│   │   ├── ItemCount/
│   │   │   ├── ItemCount.css
│   │   │   └── ItemCount.jsx
│   │   ├── ItemDetail/
│   │   │   ├── ItemDetail.css
│   │   │   └── ItemDetail.jsx
│   │   ├── ItemDetailContainer/
│   │   │   ├── ItemDetailContainer.css
│   │   │   └── ItemDetailContainer.jsx
│   │   ├── ItemList/
│   │   │   └── ItemList.jsx
│   │   ├── ItemListContainer/
│   │   │   ├── ItemListContainer.css
│   │   │   └── ItemListContainer.jsx
│   │   ├── NavBar/
│   │   │   └── NavBar.jsx
│   │   ├── ProductSlider/
│   │   │   ├── ProductSlider.css
│   │   │   └── ProductSlider.jsx
│   │   ├── SearchResults/
│   │   │   └── SearchResults.jsx
│   │   └── services/
│   │       └── firebase/
│   │           └── productService.js
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── eslint.config.js
├── estructura.txt
├── index.html
├── package.json
├── README.md
└── vite.config.js

```

## Autor

Desarrollado por **Imanol Peralta**
Diplomatura Full Stack - Coderhouse
[LinkedIn](https://www.linkedin.com/in/imanol-augusto-peralta/) | [GitHub](https://github.com/ImanolPeralta)