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
let menuItems = document.querySelectorAll('.sectionHeader_secondLine-navItem').length - 1;

allSlides.textContent = itemsCount;
items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});



let NavWidth = document.querySelector('.sectionHeader_secondLine-nav').clientWidth;

// console.log(NavWidth / 7 > 125 ? document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount-2]: 1);

let x = document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount - 2].outerHTML;
// console.log(document.querySelectorAll('.sectionHeader_secondLine-navItem').length);

while (NavWidth / menuItems < 125) {

    if (NavWidth / menuItems < 125) {

        document.querySelector('.sectionHeader_secondLine-navItemList').innerHTML += `<li>${x}</li>`;
        document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount - 2].outerHTML = [];
        console.log(menuItems);
        menuItems -= 1;
    }
}



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

    let NavWidth = document.querySelector('.sectionHeader_secondLine-nav').clientWidth;

    // console.log(NavWidth / 7 > 125 ? document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount-2]: 1);

    let x = document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount - 2].outerHTML;
    // console.log(document.querySelectorAll('.sectionHeader_secondLine-navItem').length);
    if (NavWidth / menuItems < 125) {

        document.querySelector('.sectionHeader_secondLine-navItemList').innerHTML += `<li>${x}</li>`;
        document.querySelector('.sectionHeader_secondLine-nav').children[document.querySelector('.sectionHeader_secondLine-nav').childElementCount - 2].outerHTML = [];
        console.log(menuItems);
        menuItems -= 1;
    }
    if (NavWidth / menuItems > 150) {
        let y = document.querySelector('.sectionHeader_secondLine-navItemList').children[document.querySelector('.sectionHeader_secondLine-navItemList').childElementCount - 1];
        let z = document.querySelector('.sectionHeader_secondLine-nav');
        z.innerHTML += y.innerHTML;
        document.querySelector('.sectionHeader_secondLine-navItemList').children[document.querySelector('.sectionHeader_secondLine-navItemList').childElementCount - 1].remove();
        let tmp = z.children[z.childElementCount - 1].outerHTML;

        z.children[z.childElementCount - 1].outerHTML = z.children[z.childElementCount - 2].outerHTML;
        z.children[z.childElementCount - 2].outerHTML = tmp;
        menuItems += 1;
    }
});