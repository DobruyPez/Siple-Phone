// Функция для загрузки каталога
function loadCatalog() {
    const table = document.querySelector('.table');

    // Очищаем текущие данные в контейнере .table
    table.innerHTML = '';

    let lastProductId = parseInt(getCookie('lastProductId')) || 0;
    let count = 0;

    fetch('http://localhost')
        .then(response => response.json()) // Преобразование ответа в формат JSON 
        .then(data => {
            var row1 = document.createElement('div');
            row1.classList.add('row');
            data.forEach((item, i) => { 
                // Пропускаем продукты с ID меньше последнего сохраненного ID из куки
                if (item.id < lastProductId) {
                    return; // Пропускаем текущую итерацию цикла
                }          

                if (count % 8 == 0 && count != 0) {
                    return; // Завершаем цикл после восьми итераций
                }

                if (count % 4 == 0) {
                    table.appendChild(row1);
                    row1 = document.createElement('div');
                    row1.classList.add('row1');
                }

                const cell = document.createElement('a');
                cell.classList.add('cell');
                cell.href = item.productLink;

                const product = document.createElement('div');
                product.classList.add('product');

                const img = document.createElement('img');
                img.src = item.photo;
                img.alt = item.brand + " " + item.model;

                const caption = document.createElement('div');
                caption.classList.add('caption');

                const title = document.createElement('div');
                title.classList.add('title');
                title.textContent = item.brand + " " + item.model;

                const price = document.createElement('div');
                price.classList.add('price');
                price.textContent = item.price;

                // Добавляем элементы в иерархию DOM
                caption.appendChild(title);
                caption.appendChild(price);
                product.appendChild(img);
                product.appendChild(caption);
                cell.appendChild(product);
                row1.appendChild(cell);

                // Сохраняем ID товара в куки, если больше последнего сохраненного ID
                if (item.id > lastProductId) {
                    lastProductId = item.id + 1;
                }    

                 // Проверяем, если это последний элемент, начинаем цикл заново
                 if (i === data.length - 1) {
                    i = -1; // Сбрасываем индекс, чтобы начать сначала
                    lastProductId = 0;
                }      

                count++;
            });
            setCookie('lastProductId', lastProductId, 30);
            table.appendChild(row1);
        })
        .catch(error => {
            console.error('Произошла ошибка при загрузке данных:', error);
        });
}

// Функция для установки куки
function setCookie(name, value, expires) {
    const d = new Date();
    d.setTime(d.getTime() + (expires * 86400000));
    let expiration = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expiration + ";path=/";
}

// Функция для получения значения куки
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}

// Вызываем функцию loadCatalog при загрузке окна
window.addEventListener('load', loadCatalog);

// Назначаем обработчик события клика на .catalogNavigation
document.addEventListener('DOMContentLoaded', function() {
    const catalogNavigation = document.querySelector('.catalogNavigation');
    catalogNavigation.addEventListener('click', loadCatalog);
});
