/* ==================== GENERAL VARIABLES && FUNCTIONS ==================== */
const overlayDark = document.querySelector('.overlayDark');
let isHideAside = true; //identifies if the element is visual 

// shows or hide the aside (main - detail)
function asideShow(item) {
    const aside = document.querySelector('.aside'),
        sectionHide = aside.querySelector('section:not(.inactive)'),
        isAside = item?.parentNode?.classList?.contains('aside');

    if (sectionHide) {
        itemHide(sectionHide);
    }

    isHideAside = !isAside;
    aside.classList.toggle('show', isAside);
}

//Shows the element that is hidden according to the option that is in the nav.
function toggleItem(item, token, isLight) {
    asideShow(item);
    item.classList.toggle(token);
    item.tabIndex = 0;
    item.style.outline = 'none';
    item.focus();
    overlayDark.classList.toggle('inactive', isLight);

    if (isHideAside && item.EventType === undefined) { // Do not allow more than one event
        item.addEventListener("blur", (event) => itemBlur(event, token));
    }
}

function itemBlur(event, token) {
    const item = event.target;
    item.EventType = event.type;

    setTimeout(() => {
        if (item.classList.contains(token) && !item.matches(":focus")) {
            item.classList.remove(token);
        } else if (!item.classList.contains(token) && !item.matches(":focus")) {
            item.classList.add(token);
        }
    }, 300);
}

function itemHide(item) {
    item.classList.add('inactive');
    overlayDark.classList.add('inactive');
}

/*==================== SHOW SCROLL UP ====================*/
function scrollUps() {
    const scrollUp = document.querySelector('.scrollup');
    if (this.pageYOffset > 100) {
        scrollUp.classList.add('show');
    }
    else {
        scrollUp.classList.remove('show')
    };
}
window.addEventListener('scroll', scrollUps)

/* ==================== header ==================== */

/* nav - desk && mobil */
const navMenuEmail = document.querySelector('.nav__menu-email');
const navAccount = document.querySelector('.nav__account');
const navMenuShoppingCart = document.querySelector('.nav__menu-shopping-cart');
const iconMenu = document.querySelector('.icon-menu');
const navMobile = document.querySelector('.nav__mobile');
const shoppingCart = document.querySelector('.shoppingCart');
const items = document.getElementById('items');
const accountSections = document.querySelectorAll('.account-section');
const loginSections = document.querySelectorAll('.login-section');
const logos = document.querySelectorAll('.logo');


/* Dark Light Theme */
const changedTheme = (element) => {

    const changeTheme = document.querySelector(element);
    const darkTheme = 'dark-theme';
    const iconTheme = '☀';

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => changeTheme.innerHTML === iconTheme ? '☾' : '☀';

    // We validate if the user previously chose a topic
    if (selectedTheme) {
        // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        changeTheme.innerHTML = selectedIcon === '☾' ? iconTheme : '☾';
    }

    // Activate / deactivate the theme manually with the button
    changeTheme.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme);
        changeTheme.innerHTML = changeTheme.innerHTML === iconTheme ? '☾' : iconTheme;
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    })
}

changedTheme('.nav__right .change-theme');
changedTheme('.nav__mobile .change-theme');

function showSectionMain(element) {
    const main = document.querySelector('main');
    const sectionHide = main.querySelector('section:not(.inactive)');
    const idClass = element?.classList?.value?.split("-")[0] || element;
    const sectionShow = main.querySelector('.' + idClass);
    sectionHide.classList.add('inactive');
    sectionShow.classList.toggle('inactive');
}

function hideNav() {
    const nav = document.querySelector('.nav');
    if (nav.classList.contains('inactive')) {
        nav.classList.toggle('inactive');
    } else {
        nav.classList.add('inactive');
    }
}

/* events */
navMenuEmail.addEventListener('click', () => {
    toggleItem(navAccount, 'inactive', true);
});

iconMenu.addEventListener('click', () => {
    toggleItem(navMobile, 'show', true);
});

navMenuShoppingCart.addEventListener('click', () => {
    toggleItem(shoppingCart, 'inactive');
});

accountSections.forEach(account => {
    account.addEventListener('click', () => {
        showSectionMain(account);
    });
});

loginSections.forEach(login => {
    login.addEventListener('click', () => {
        showSectionMain(login);
        hideNav();
    });
})

logos.forEach(logo => {
    logo.addEventListener('click', () => {
        showSectionMain('cards');
        document.querySelector('nav').classList.remove('inactive');
    });
});

/* ==================== overlayDark ==================== */
overlayDark.addEventListener('click', () => {
    asideShow();
});

/* ==================== Main  ==================== */

/* shoppingCart Product-detail - ShoppingCar */
const cardContainer = document.querySelector('.cards-container');
const productDetail = document.querySelector('.product-detail');
const productDetailClose = document.querySelector('.product-detail__close');
const titleContainer = document.querySelector('.title-container');
const productDetailImg = document.querySelector('.product-detail__img');
const addCartButton = document.querySelector('.add-to-cart-button');
const myOrderContent = document.querySelector('.my-order-content');
const filterItems = document.querySelectorAll('.filters');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const filterCards = cardContainer.children;
const addCardShopping = {};

/*Shoping car (Create Product list)*/
import products from './products.js';
products.forEach((product) => {
    const htmlCards = `<div class="product-card ${product.type}">
<div class="product-img">
<img src=${product.src} alt="" class="product-card__img">
</div>
<div class="product-info">
<div>
    <p>${product.price}</p>
    <p>${product.title}</p>
    <p class="inactive">${product.description}</p>
</div>
<figure>
    <img src="./images/icons/bt_add_to_cart.svg" alt="add" class="add-cart-img">
</figure>
</div>
</div>`,
        range = document.createRange(),
        fragment = range.createContextualFragment(htmlCards),
        productCardImg = fragment.querySelector('.product-card__img'),
        productInfo = fragment.querySelector('.product-info'),
        addCartImg = fragment.querySelector('.add-cart-img');


    productCardImg.addEventListener('click', e => {
        if (productDetail.classList.contains('inactive')) {
            toggleItem(productDetail, 'inactive');
        }
        showProductCard(e.target.src, productInfo, product.id);
    });

    addCartImg.setAttribute('value', product.id);
    addCartImg.addEventListener('click', e => addProductCar(e, '.product-card', 'card'));

    cardContainer.appendChild(fragment);
});

addCartButton.addEventListener('click', e => {
    addProductCar(e, '.product-detail', 'detail');
});

function showProductCard(src, productInfo, id) {
    productDetailImg.style.opacity = 0.6;
    setTimeout(() => {
        productDetailImg.setAttribute('src', src);
        productDetailImg.style.opacity = 1;
    }, 100);
    const pElementsProductI = productInfo.getElementsByTagName('p'),
        pElementsProductD = productDetail.getElementsByTagName('p');
    for (let i = 0; i < pElementsProductI.length; i++) {
        pElementsProductD[i].textContent = pElementsProductI[i].textContent;
    }
    addCartButton.setAttribute('value', id);
};

function parentNodeHide() {
    const parentNode = productDetailClose.parentNode;
    parentNode.parentNode.classList.remove('show');
    itemHide(parentNode);
}

/* select next dot */

const dotsItems = document.querySelectorAll('.dot');;
const dotsArray = [...dotsItems];

const updateDots = () => {

    dotsArray.forEach(el => {
        el.classList.remove('dot-item-1');
        el.classList.remove('dot-item-2');
        el.classList.remove('dot-item-3');
        el.classList.remove('dot-item-4');
        el.classList.remove('dot-item-5');
    });

    dotsArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`dot-item-${i + 1}`);
    });
}

const setCurrentState = (direction) => {
    if (direction == 'prev') {
        dotsArray.unshift(dotsArray.pop())
    } else {
        dotsArray.push(dotsArray.shift())
    }
    updateDots();
}

/* Select the next card */
function navCard(direction) {
    const productCards = cardContainer.querySelectorAll('.product-card:not(.hidden)');
    const maxId = parseInt(productCards[productCards.length - 1].querySelector('.add-cart-img').getAttribute('value'));
    let id = parseInt(productDetail.querySelector('.primary-button').value);
    let found = false;
    id = updateId(direction, id, maxId);
    while (!found) {
        const addCartImg = cardContainer.querySelector(`.product-card:not(.hidden) .add-cart-img[value="${id}"]`);
        const productCard = addCartImg ? addCartImg.closest('.product-card') : null;
        if (productCard) {
            const src = productCard.querySelector('.product-card__img').src;
            const productInfo = productCard.querySelector('.product-info');
            showProductCard(src, productInfo, id);
            setCurrentState(direction);
            found = true;
        }
        id = updateId(direction, id, maxId);
    }
}

function updateId(direction, id, maxId) {
    direction === 'next' ? id++ : id--;
    id = (id > maxId) && direction === 'next' ? 1 : id;
    id = id <= 0 ? maxId : id;
    return id;
}

productDetailClose.addEventListener('click', () => {
    parentNodeHide();
});

titleContainer.addEventListener('click', () => {
    parentNodeHide();
});

next.addEventListener('click', () => {
    navCard('next');
});

prev.addEventListener('click', () => {
    navCard('prev');
});

let startX;
const threshold = 68;

const dragStart = (e) => {
    startX = e.clientX || e.touches[0].clientX;
}

const dragging = (e) => {
    if (startX !== undefined) {

        const currentX = e.clientX || e.touches[0].clientX;
        const deltaX = currentX - startX;
        e.preventDefault();
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                navCard('prev');
            } else if (deltaX < 0) {
                navCard('next');
            }
            startX = currentX;
        }
    }
}

const dragEnd = () => {
    startX = undefined;
}

productDetailImg.addEventListener('mousedown', dragStart);
productDetailImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        dragStart(e);
    }
});

productDetailImg.addEventListener('mousemove', dragging);
productDetailImg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        dragging(e);
    }
});

productDetailImg.addEventListener('touchend', dragEnd);
document.addEventListener('mouseup', dragEnd);

function addProductCar(e, idClass, type) {
    const id = e.target.getAttribute('value'),
        product = e.target.closest(idClass),
        pElementsProductI = product.getElementsByTagName('p'),
        buy = {
            id: id,
            img: product.querySelector('.product-' + type + '__img').getAttribute('src'),
            price: pElementsProductI[0].textContent,
            title: pElementsProductI[1].textContent,
            quantity: 1,
        };

    if (addCardShopping.hasOwnProperty(buy.id)) {
        buy.quantity = addCardShopping[buy.id].quantity + 1;
    }
    addCountShopping();

    addCardShopping[buy.id] = { ...buy };
    showShopping();
}

/* Create list car */
function showShopping() {
    const fragmentoShopping = document.createDocumentFragment();
    const childrenLength = myOrderContent.children.length - 1;
    const primaryButton = myOrderContent.children[childrenLength];
    myOrderContent.innerHTML = '';

    Object.values(addCardShopping).forEach(product => {

        const buy = document.createElement('div');
        const figure = document.createElement('figure');
        const imgShop = document.createElement('img');
        const quantity = document.createElement('p');
        const title = document.createElement('p');
        const price = document.createElement('p');
        const close = document.createElement('img');

        buy.classList.add('shopping-cart');
        imgShop.setAttribute('src', product.img);
        figure.appendChild(imgShop);
        quantity.textContent = product.quantity;
        title.textContent = product.title;
        price.textContent = product.price * product.quantity;
        close.setAttribute('src', './images/icons/icon_close.png');
        close.classList.add('deleteBuy');
        close.setAttribute('id', product.id);
        close.addEventListener('click', e => deleteBuy(e));
        buy.append(figure, title, price, close);
        fragmentoShopping.append(buy);

    });
    totalShopping();
    myOrderContent.append(fragmentoShopping, myOrderContent.children[0], primaryButton);
}

function deleteBuy(e) {
    const deleteItem = addCardShopping[e.target.getAttribute('id')];
    deleteItem.quantity--;

    removeCountShopping();

    if (deleteItem.quantity === 0) {
        delete addCardShopping[e.target.getAttribute('id')];
    }
    showShopping();

    e.stopPropagation();
}

function removeCountShopping() {
    items.textContent = `${items.textContent - 1}`;
}

function addCountShopping() {
    const countItems = Object.values(addCardShopping).reduce((accumulator, { quantity }) => accumulator + quantity, 1);
    items.textContent = countItems;
}


function totalShopping() {
    const payment = Object.values(addCardShopping).reduce((accumulator, { quantity, price }) => accumulator + (quantity * price), 0);
    myOrderContent.innerHTML += `<div class="order">
                            <p class="order__title">
                                <span class="order__title-desc">Total</span>
                            </p>
                            <p class="order__total">$ ${payment}</p>
                        </div>`;
}


/*filter*/
function setFilter(filterItem, index, selectItems) {
    filterItem[index].addEventListener('click', function () {
        for (let j = 0; j < selectItems.length; j++) {
            selectItems[j].firstElementChild.classList.remove('selectItem');
        }

        selectItems[index].firstElementChild.classList.add('selectItem');

        const filterValue = this.firstElementChild.getAttribute('data-filter');

        for (let k = 0; k < filterCards.length; k++) {
            filterCards[k].classList.remove('show');
            filterCards[k].classList.add('hidden');

            if (filterCards[k].classList.contains(filterValue) || filterValue == "all") {
                filterCards[k].classList.remove('hidden');
                filterCards[k].classList.add('show');
            }
        }
    });
}

let childrenLeft = ''; //Catch only once
filterItems.forEach(filterItem => {
    const children = filterItem.children;
    if (childrenLeft.length === 0) {
        childrenLeft = children;
    }

    for (let i = 0; i < children.length; i++) {
        setFilter(children, i, childrenLeft);
    }
});

/* ==================== Account ==================== */

const loginButton = document.querySelector('.login-button');
const div = document.querySelector('.form div');
const email = document.querySelector('.input-email');
const createEditForm = (elementsHide, ElementsShow, type) => {
    const account = [];

    for (let i = 0; i < elementsHide.length; i++) {
        elementsHide[i].classList.add('inactive');
        account[i] = type === true ? elementsHide[i].textContent : elementsHide[i].value;
    }

    for (let i = 0; i < ElementsShow.length; i++) {
        ElementsShow[i].classList.toggle('inactive');
        if (!type) {
            ElementsShow[i].textContent = account[i];
        }
        else {
            ElementsShow[i].value = account[i];
        }
    }

    loginButton.classList.remove(type === true ? 'secondary-button' : 'primary-button');
    loginButton.classList.add(type === true ? 'primary-button' : 'secondary-button');
    loginButton.value = type === true ? 'Create' : 'Edit';
    if (!type) navMenuEmail.textContent = email.value;
};

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const pElements = div.getElementsByTagName('p');
    const inputElements = div.getElementsByTagName('input');

    if (e.target.classList.contains('secondary-button')) {
        createEditForm(pElements, inputElements, true);
    } else {
        createEditForm(inputElements, pElements, false);
    }
})
