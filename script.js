/* const users = {
    name: "Вася",
    surname: "Васильев",
    get fullname() {
        return `${this.name} ${this.surname}`
    },
    set fullname(value) {
        let arr = value.split(" ");
        this.name = arr[0]
        this.surname = arr[1]
    }
}
console.log(users.fullname);
users.fullname = "Петя Петров"
console.log(users); */


/* ДЗ
При помощи рекурсии сделать анимированный логотип. Цифры от 0 до 100. При этом когда цифра больше 50 скороть изменения становится меньше  */
const spanLogo = document.querySelector('.header__timer-extra');
timer()


function timer() {

    spanLogo.innerHTML++
    if (spanLogo.innerHTML < 50) {
        setTimeout(() => { timer() }, 50)
    } else if (spanLogo.innerHTML < 60) {
        setTimeout(() => { timer() }, 80)
    }
    else if (spanLogo.innerHTML < 90) {
        setTimeout(() => { timer() }, 100)
    }
    else if (spanLogo.innerHTML < 100) {
        setTimeout(() => { timer() }, 200)
    }
    else if (spanLogo.innerHTML == 100) {
        spanLogo.innerHTML == 100
    }

}
/* ДЗ
        При двойном нажатие (dblclick) на .main__product-info появляется блок блок .view при помощи добавление класса .active
        У .main__product-info img берутся данные из атрибута src и вставляются в картинку в блоке .view при помощи функции setAttribute(название атрибута, что в него вставить)
        И при нажатие на Х блок .view закрывается */
//--- просмотр гамбургеров
const productInfo = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewClose = document.querySelector('.view__close');
for (let i = 0; i < productInfo.length; i++) {
    productInfo[i].addEventListener("dblclick", function () {
        viewImg(this)

    })
}
function viewImg(element) {
    view.classList.add("active")
    const productImg = element.querySelector('.main__product-img');
    const link = productImg.getAttribute("src")
    const viewLink = view.querySelector('img');
    viewLink.setAttribute("src", link)
}
viewClose.addEventListener("click", function () {
    view.classList.remove("active")
})

// создан объект с продукцией
const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

// создаем объект ингридиентов

const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}

//--------------подключаемся кнопкам + и -


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
// console.log(btnPlusOrMinus);
//перебираем кнопки и навешиваем события функцию
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        plusOrMinus(this)
    })

}

function plusOrMinus(element) {
    // элемент.closest("selector") - возвращает одного родителя по указанному селектору;
    const parent = element.closest(".main__product");// подключаемся к секции
    // element.hasAttribute("name") - возвращает true, если атрибут есть;
    // element.setAttribute("name", "value") - добавляет атрибут со значением, также меняет значение у имеющегося атрибута 
    // element.removeAttribute("name") - удаляет атрибут сщ значением;
    // element.getAttribute("name") - возвращает значение атрибута;
    const parentId = parent.getAttribute("id");// получаем значение атрибута id
    const elementData = element.getAttribute("data-symbol")// получаем знак кнопки + или -
    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    const out = parent.querySelector(".main__product-num")
    const price = parent.querySelector(".main__product-price span")
    const kcall = parent.querySelector(".main__product-kcall span")
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

//------------подключаемся к чекбоксам ингредиентов
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
//перебираем массив чекбоксов
for (let i = 0; i < checkExtraProduct.length; i++) {
    // для каждого чекбокса создаем событие
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProduct(this)
    })

}
// функцмя работы чекбокса
function addExtraProduct(element) {
    const parent = element.closest(".main__product");// подключаемся к секции
    const parentId = parent.getAttribute("id");// получаем значение атрибута id
    const elAtr = element.getAttribute("data-extra")// получаем значение атрибута чекбокса;
    product[parentId][elAtr] = element.checked; // добавляем ключ к определенному продукту со значением ture or false
    if (product[parentId][elAtr] == true) {
        product[parentId].price += extraProduct[elAtr].price
        product[parentId].kcall += extraProduct[elAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elAtr].price
        product[parentId].kcall -= extraProduct[elAtr].kcall
    }
    const price = parent.querySelector(".main__product-price span");
    const kcall = parent.querySelector(".main__product-kcall span");
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;

}

// --- вывод общей стоимости товаров
// подключение к кнопке заказать
const addCart = document.querySelector('.addCart');
// подключение к модальному окну
const receipt = document.querySelector('.receipt');
// подключение к чеку
const receiptWindow = document.querySelector('.receipt__window'); // подключаемся к описанию чека
const receiptOut = document.querySelector('.receipt__window-out');// подключение к кнопке чека
const receiptBtn = document.querySelector('.receipt__window-btn');
// вывод общей стоимости
let totalName = " ";
let totalPrice = 0;
let totalKcall = 0;
let arrayProduct = [];


/*// ссылка на объект
 let a = {name: "Вася"};
let b = a;
console.log(a);
console.log(b);
b.name = "Петя"
console.log(a);
console.log(b); */


addCart.addEventListener("click", function () {
    for (const key in product) {
        // po - один объект продукта 
        const po = product[key]
        // проверяем количество выбранного продукта
        if (po.amount > 0) {
            // в массив добавляем выбранный продукт
            arrayProduct.push(po)
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    // \n - перенос на следующую строку
                    // добавляем название ингредиента
                    po.name += "\n" + extraProduct[infoKey].name
                }
            }
        }
        po.price = po.Summ
        po.kcall = po.Kcall
    }

    // перебираем выбранный товар
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += `\n ${el.name} \n`

    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \nКаллорийность: ${totalKcall} \nСтоимость покупки ${totalPrice} сум`
    receipt.style.display = "flex";
    setTimeout(() => {
        receipt.style.opacity = "1";
        receiptWindow.style.top = "0"
    }, 100);
    document.body.style.overflow = "hidden"

    const out = document.querySelectorAll(".main__product-num")
    const price = document.querySelectorAll(".main__product-price span")
    const kcall = document.querySelectorAll(".main__product-kcall span")
    for (let i = 0; i < out.length; i++) {
        out[i].innerHTML = 0;
        price[i].innerHTML = 0;
        kcall[i].innerHTML = 0;
    }
})
receiptBtn.addEventListener("click", function () {
    location.reload()
})
/* console.log(document); // объектная модель документа
console.log(window); // браузерная модель документа */





