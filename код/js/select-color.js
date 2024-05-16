function toggleBorder(svgId) {
    // Находим все SVG элементы внутри .productColor
    const svgs = document.querySelectorAll('.productColor svg');
    // const main = document.querySelectorAll('main');

    // Перебираем все SVG элементы
    svgs.forEach(svg => {
        const ellipse = svg.querySelector('ellipse');
        if (ellipse) {
            // Проверяем, совпадает ли текущий SVG с svgId
            if (svg.id === svgId) {
                // Если текущий SVG был нажат, добавляем границу к эллипсу
                ellipse.style.stroke = '#39C33F'; // Цвет границы
                ellipse.style.strokeWidth = '7px'; // Толщина границы

                // Определяем цвет SVG из атрибута fill
                const color = ellipse.getAttribute('fill');

                // Находим родительский элемент .product для текущего SVG
                const product = svg.closest('.selectionOfCharacteristics');

                // Находим изображение внутри .product
                const img = product.querySelector('.product img');

                // Изменяем src изображения в зависимости от цвета SVG
                if (color === 'black') {
                    img.src = 'images/xiaomi-13T-black.jpg';
                } else if (color === '#0500FF') {
                    img.src = 'images/xiaomy 13T.webp';
                }    
            } else {
                // Если это не текущий SVG, убираем границу у эллипса
                ellipse.style.stroke = 'none';
            }
        }
    });
}
