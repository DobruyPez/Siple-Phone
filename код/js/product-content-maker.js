function createMainHTML(data) {
    let mainElement = document.querySelector('main');

    const selectionOfCharacteristics = document.createElement('div');
    selectionOfCharacteristics.classList.add('selectionOfCharacteristics');

    const productElement = document.createElement('div');
    productElement.classList.add('product');

    const productImage = document.createElement('img');
    productImage.src = data.color.Blue.imgSRC; // Используем изображение для цвета "Blue"
    productImage.alt = 'товар';
    productElement.appendChild(productImage);

    const buyButton = document.createElement('div');
    buyButton.id = 'buyButton';
    buyButton.textContent = 'Купить сейчас';
    productElement.appendChild(buyButton);

    selectionOfCharacteristics.appendChild(productElement);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.id = 'popup';

    const h2 = document.createElement('h2');
    h2.textContent = 'Позвоните нам';
    popup.appendChild(h2);

    const mts = document.createElement('p');
    mts.textContent = 'МТС: +375 29 837-00-40';
    popup.appendChild(mts);

    const life = document.createElement('p');
    life.textContent = 'life: +375 25 654-32-10';
    popup.appendChild(life);

    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'Закрыть';
    popup.appendChild(closeButton);

    overlay.appendChild(popup);

    selectionOfCharacteristics.appendChild(overlay);

    const characteristicsSelection = document.createElement('div');
    characteristicsSelection.classList.add('characteristicsSelection');

    const productName = document.createElement('div');
    productName.classList.add('productName');
    productName.textContent = `Смартфон ${data.brand} ${data.model}`; // Используем бренд и модель из JSON
    characteristicsSelection.appendChild(productName);

    const price = document.createElement('div');
    price.textContent = `Цена: ${data.price} p`; // Используем цену из JSON
    characteristicsSelection.appendChild(price);

    const charNameColor = document.createElement('div');
    charNameColor.classList.add('charName');
    charNameColor.textContent = 'Выберите цвет';
    characteristicsSelection.appendChild(charNameColor);

    const productColor = document.createElement('div');
    productColor.classList.add('productColor');

    // Создаем SVG элементы на основе данных из JSON и добавляем их непосредственно в productColor
    productColor.appendChild(createSVG(data.color.Blue.svg));
    productColor.appendChild(createSVG(data.color.blue.svg));

    characteristicsSelection.appendChild(productColor);

    const charNameRAM = document.createElement('div');
    charNameRAM.classList.add('charName');
    charNameRAM.textContent = 'Доступная RAM';
    characteristicsSelection.appendChild(charNameRAM);

    const productRAM = document.createElement('div');
    productRAM.classList.add('productRAM');
    data.ram.forEach(ram => {
        const ramElement = document.createElement('div');
        ramElement.textContent = ram;
        productRAM.appendChild(ramElement);
    });
    characteristicsSelection.appendChild(productRAM);

    const charNameROM = document.createElement('div');
    charNameROM.classList.add('charName');
    charNameROM.textContent = 'Доступная ROM';
    characteristicsSelection.appendChild(charNameROM);

    const productROM = document.createElement('div');
    productROM.classList.add('productROM');
    data.storage.forEach(rom => {
        const romElement = document.createElement('div');
        romElement.textContent = rom;
        productROM.appendChild(romElement);
    });
    characteristicsSelection.appendChild(productROM);

    selectionOfCharacteristics.appendChild(characteristicsSelection);

    mainElement.appendChild(selectionOfCharacteristics);

    const tableElement = createTable();
    mainElement.appendChild(tableElement);

    return mainElement;
}

function createSVG(svgData) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = svgData.id;
    svg.setAttribute('width', svgData.width);
    svg.setAttribute('height', svgData.height);
    svg.setAttribute('viewBox', svgData.viewBox);
    svg.setAttribute('fill', svgData.fill);
    svg.onclick = () => toggleBorder(svgData.id);
    svg.setAttribute('data-img-src', svgData.imgSRC);

    const shape = document.createElementNS('http://www.w3.org/2000/svg', svgData.shape);
    Object.keys(svgData.attributes).forEach(key => {
        shape.setAttribute(key, svgData.attributes[key]);
    });

    svg.appendChild(shape);

    return svg;
}

// Пример использования:
const mainContainer = document.querySelector('main');
const jsonData = {
    "id": 0,
    "brand": "Xiaomi",
    "model": "13T",
    "price": 129.99,
    "cpu": "Mediatek Dimensity 8200 Ultra",
    "ram": ["12 GB"],
    "storage": ["256 GB"],
    "color": [
        {
            "imgSRC": "images/xiaomi-13T-black.jpg",
            "svg": {
                "id": "svg1",
                "width": "50",
                "height": "50",
                "viewBox": "0 0 50 50",
                "fill": "none",
                "xmlns": "http://www.w3.org/2000/svg",
                "shape": "ellipse",
                "attributes": {
                    "cx": "25",
                    "cy": "25",
                    "rx": "25",
                    "ry": "25",
                    "fill": "black",
                    "fill-opacity": "0.82"
                }
            }
        },
        {
            "imgSRC": "images/xiaomy 13T.webp",
            "svg": {
                "id": "svg2",
                "width": "50",
                "height": "50",
                "viewBox": "0 0 50 50",
                "fill": "none",
                "xmlns": "http://www.w3.org/2000/svg",
                "shape": "ellipse",
                "attributes": {
                    "cx": "25",
                    "cy": "25",
                    "rx": "25",
                    "ry": "25",
                    "fill": "#0500FF",
                    "fill-opacity": "0.82"
                }
            }
        }
    ],
    "photo": "images/xiaomy 13T.webp",
    "characteristics": {
        "Basic": {
            "Operating System Version at Release": "Android 13 (MIUI 14)",
            "Screen Size": "6.67 inches",
            "Screen Resolution": "1220x2712",
            "Screen Technology": "AMOLED",
            "Screen Refresh Rate": "144 Hz",
            "RAM": "12 GB (LPDDR5)",
            "Internal Storage": "256 GB (UFS 3.1)",
            "Matrix Points": "50 MP",
            "Max Video Resolution": "40x2160 (30 fps)",
            "SIM Cards": "2 (nano SIM + nano SIM or nano SIM + eSIM)"
        },
        "Processor": {
            "Platform": "Mediatek",
            "Processor": "Mediatek Dimensity 8200 Ultra",
            "Processor Clock Speed": "3.1 GHz",
            "Number of Cores": "8 (1+3+4)",
            "Processor Architecture": "64-bit"
        },
        "Design": {
            "Body Material": "Metal",
            "Dust and Water Resistance": "IP68",
            "Fingerprint Sensor Location": "In-display",
            "SIM Card Format": "Nano-SIM, eSIM"
        },
        "Dimensions and Weight": {
            "Length": "16.2 mm",
            "Width": "75.7 mm",
            "Thickness": "8.62 mm",
            "Weight": "193 g"
        }
    }    
};

const mainHTML = createMainHTML(jsonData);
mainContainer.appendChild(mainHTML);

