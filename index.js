'use strict'

///////////SWITCH-SLIDES-WITH-BUTTONS

const getArrayOfNodes = nodeAttributes => {
  return [...document.querySelectorAll(nodeAttributes)];
}
const getNode = nodeAttributes => {
  return document.querySelector(nodeAttributes);
}

let blockScroll = true

const sliderButtons = getArrayOfNodes('.slider__navigation-button');
const removeClassForActiveSliderNode = array => {
  return array.filter(item => item.classList
    .contains('active'))[0].classList
    .remove('active');
};
const setActiveSlideNumber = slideNumber => {
  const slideNumbers = { first: '01', second: '02', third: '03' };
  getNode('#active-slide-number').innerText = slideNumbers[slideNumber];
}
sliderButtons.forEach(button => button.addEventListener('click', event => {
  removeClassForActiveSliderNode(sliderButtons);

  if (!event.target.classList.contains('active')) {
    event.target.classList.add('active');
    const slides = getArrayOfNodes('.slider__content');
    removeClassForActiveSliderNode(slides);
    const slideNumber = event.target.classList[1];
    getNode(`.slider__content.${slideNumber}`).classList.add('active');
    setActiveSlideNumber(slideNumber);
    // if (slideNumber === 'first' || slideNumber === 'third') blockScroll = false;
  }
}));

// window.addEventListener('scroll', event => {
//   let time = 0
//
//   if (time > 1000) clearInterval(time);
//   if (time === 0) {
//     if (getNode('.slider').getBoundingClientRect().y < 0 && blockScroll) {
//       setInterval(() => time += 1, 10)
//       event.preventDefault();
//       getNode('.slider').scrollIntoView({ block: "center" });
//       switch (getNode('#active-slide-number').innerText) {
//         case '01':
//           removeClassForActiveSliderNode();
//           getNode('#active-slide-number').innerText = '02';
//           getNode(`.slider__content.second`).classList.add('active');
//           break;
//         case '02':
//           removeClassForActiveSliderNode();
//           getNode('#active-slide-number').innerText = '03';
//           getNode(`.slider__content.third`).classList.add('active');
//           blockScroll = false
//           break;
//       }
//     }
//   }
// });

///////////SWITCH-SLIDES-WITH-SCROLL