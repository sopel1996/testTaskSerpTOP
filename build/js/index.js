let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const container = document.querySelector('.sectionSlider_container');
const track = document.querySelector('.sectionSlider_track');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');
const items = document.querySelectorAll('.sectionSlider_track-item');
const itemsCount = items.length;
const allSlides = document.querySelector('.allSlides');
const curSlide = document.querySelector('.currendSlide');
let itemWidth = container.clientWidth / slidesToShow;
let movePosition = slidesToScroll * itemWidth;
let current = 1;

allSlides.textContent = itemsCount;
items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});


btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    current -= slidesToScroll;
    curSlide.textContent = current <= 1 ? 1 : current;
    setPosition();
    checkBtns();
});
btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    current += slidesToScroll;
    curSlide.textContent = current >= itemsCount ? itemsCount : current;
    setPosition();
    checkBtns();
});

const setPosition = () => {
    track.style.transform = 'translateX(' + position + 'px)';
};

const checkBtns = () => {
    if (position === 0) {
        btnPrev.classList.add('disable');
    } else {
        btnPrev.classList.remove('disable');
    }
    if (position <= -(itemsCount - slidesToShow) * itemWidth) {
        btnNext.classList.add('disable');
    } else {
        btnNext.classList.remove('disable');
    }
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};
checkBtns();



//for adaptive
window.addEventListener("resize", function () {
    itemWidth = container.clientWidth / slidesToShow;
    movePosition = slidesToScroll * itemWidth;
    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`;
    });
});