window.onload = function() {
    // Проверяем ширину экрана при загрузке страницы
    const isDesktop = window.matchMedia('(min-width: 721px)').matches;

    if (isDesktop) {
        class Slider {
            constructor(obj) {
                this.images = document.querySelectorAll(obj.images);
                this.photoContainer = document.querySelector(obj.photoContainer);
                this.interval = obj.interval || 3000;
                this.currentIndex = 0;
                this.startX = 0;
                this.startY = 0;
                this.threshold = 50; // Порог для определения свайпа

                this.addSwipeListener();
                this.addClickListener();
                this.showImage(this.currentIndex);
                setInterval(this.next.bind(this), this.interval);
            }

            showImage(index) {
                this.images.forEach((img, idx) => {
                    if (idx === index) {
                        img.classList.add('shown');
                    } else {
                        img.classList.remove('shown');
                    }
                });
            }

            next() {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
                this.showImage(this.currentIndex);
            }

            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
                this.showImage(this.currentIndex);
            }

            addSwipeListener() {
                this.photoContainer.addEventListener('touchstart', (e) => {
                    this.startX = e.touches[0].clientX;
                    this.startY = e.touches[0].clientY;
                });

                this.photoContainer.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                });

                this.photoContainer.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const endY = e.changedTouches[0].clientY;
                    const diffX = this.startX - endX;
                    const diffY = this.startY - endY;

                    if (Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX > this.threshold) {
                            this.next();
                        } else if (diffX < -this.threshold) {
                            this.prev();
                        }
                    }
                });
            }

            addClickListener() {
                this.photoContainer.addEventListener('mousedown', (e) => {
                    this.startX = e.clientX;
                });

                this.photoContainer.addEventListener('mousemove', (e) => {
                    e.preventDefault();
                });

                this.photoContainer.addEventListener('mouseup', (e) => {
                    const endX = e.clientX;
                    const diffX = this.startX - endX;

                    if (Math.abs(diffX) > this.threshold) {
                        if (diffX > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });
            }
        }

        new Slider({
            images: 'main img', // Селектор изображений слайдера
            photoContainer: 'main', // Селектор контейнера с изображениями
            interval: 30000, // Интервал автоматического переключения (по умолчанию 3000 мс)
        });
    }
};