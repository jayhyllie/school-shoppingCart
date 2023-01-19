//Variables to use and it's a mix of global and local variables
let shoppingCart = [];
let products = document.getElementsByTagName('button');
let cartProducts = '';

function articles() {
    for (let i = 0; i < products.length; i++) {
        products[i].addEventListener('click', function (event) {
            let product = event.target.parentNode.getAttribute('data-product');

            if (!isExist(shoppingCart, product)) {
                shoppingCart.push(product);
            } else {
                articleWarning(products[i].parentNode);
                addedTip(products[i], product);
            }

            updateCart();
        });
    }
}

articles();

function updateCart() {
    listProductsInCart();
    document.getElementById('products').innerHTML = cartProducts;
    document.getElementById('productsInCart').innerHTML = shoppingCart.length;
    removeProducts();
}

function listProductsInCart() {
    cartProducts = '';
    for (let i = 0; i < shoppingCart.length; i++) {
        cartProducts += '<li><p data-items = "' + shoppingCart[i] + '"> &#128465; </p><span class="product-title">Titel: </span>' + shoppingCart[i] + '</li>';
    }
}

document.getElementById('open-cart').addEventListener('click', function () {
    document.getElementById('cart').classList.toggle('hide');
});

function removeProducts() {
    let cartItems = document.querySelectorAll('#products > li');
    if (cartItems !== undefined && cartItems !== null) {
        cartItems.forEach((element) => {
            let bin = element.childNodes[0];
            let itemText = element.childNodes[0].getAttribute('data-items');

            bin.addEventListener('click', () => {
                let items = document.querySelectorAll('.cards > .card');
                deleteItem(shoppingCart, itemText);

                items.forEach(item => {
                    if (item.getAttribute('data-items') === itemText && shoppingCart.includes(itemText) == false) {
                        deleteWarning(item);
                        item.querySelector('.button').classList.remove('addedTip');
                        item.querySelector('.button').innerHTML = ' Add to cart ';
                    }
                })
                listProductsInCart();
                updateCart();
            })
        })
    }
}

function deleteItem(arr, item) {
    if (arr.includes(item)) {
        let itemsIndex = arr.indexOf(item);
        arr.splice(itemsIndex, 1);
    }
}

function isExist(arr, object) {
    let obj = arr.includes(object) ? true : false;
    return obj;
}

function articleWarning(article) {
    let exist = article.querySelector('.already_exist');
    let insertText = document.createElement('p');

    if (exist == null) {
        insertText.textContent = 'You have already added this item!';
        insertText.classList.add('already_exist');
        article.appendChild(insertText);
    }
}

function addedTip(button, title) {
    if (!button.classList.contains('addedTip')) {
        let span = document.createElement('span');
        span.classList.add('addedTip--text');
        span.textContent = `'${title}' is already added!`
        button.classList.add('addedTip');
        button.appendChild(span);
    }
}

function deleteWarning(item) {
    if (item.querySelector('.already_exist') !== null) {
        item.querySelector('.already_exist').remove();
    }
}