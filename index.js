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
window.addEventListener('scroll', () => {
  const startAnimation = className => {
    return getNode(className).getBoundingClientRect().y <= window.innerHeight && getNode(className).getBoundingClientRect().y > 0
  }
  const addActiveClass = className => getNode(className).classList.add('active')
  const containsActiveClass = className => getNode(className).classList.contains('active')

  if (startAnimation('.cryptocurrencies__list')) {
    getNode('.cryptocurrencies__list').classList.add('active')
  }

  if (startAnimation('.start-crypto-bot__create-btn')) {
    setTimeout(() => {
      addActiveClass('.start-crypto-bot__arrow-btn')
      addActiveClass('.start-crypto-bot__create-btn')
      setTimeout(() => getNode('.start-crypto-bot__arrow-btn').classList.add('stop'), 1250)
      setTimeout(() => getNode('.start-crypto-bot__create-btn').classList.add('pause'), 3500)
    }, 4000)
  }

  if (startAnimation('.exchange-rates') && !containsActiveClass('.exchange-rates__cryptocurrencies')) {
    getNode('.exchange-rates__cryptocurrencies').classList.add('active')

    setTimeout(() => {
      setTimeout(() => {
        getArrayOfNodes('.exchange-rates__cryptocurrency')
          .forEach(item => item.classList.add('step-1'))
      }, 4000)

      setTimeout(() => {
        getArrayOfNodes('.exchange-rates__cryptocurrency').forEach(item => {
          item.classList.remove('step-1')
          item.classList.add('step-2')
        })
      }, 5000)

      setTimeout(() => {
        getArrayOfNodes('.exchange-rates__cryptocurrency').forEach(item => {
          item.classList.remove('step-2')
          item.classList.add('step-3')
        })
      }, 6000)
    }, 2500)
  }

  if (startAnimation('.payment-statistics') && !containsActiveClass('.payment-statistics')) {
    const paymentStatistics = {
      date: 'all time',
      volume: '$204,920',
      invoices: '16,256',
      payments: '9,353',
      users: '5,606',
      conversion: '57%',
    }
    const copyPaymentStatistics = { ...paymentStatistics }

    getNode('.payment-statistics').classList.add('active')
    // setTimeout(() => {
      const animateButton = id => {
        removeClassForActiveSliderNode(getArrayOfNodes('.telegram-button'))
        getNode(id).classList.add('active')
      }
      const animateMessageValues = () => {
        for (const key in paymentStatistics) {
          getNode(`#paymentStatistics-${key}`).innerText = paymentStatistics[key]
        }
      }
      const changeMessageValues = ({ date, volume, invoices, payments, users, conversion }) => {
        paymentStatistics.date = date
        paymentStatistics.volume = volume
        paymentStatistics.invoices = invoices
        paymentStatistics.payments = payments
        paymentStatistics.users = users
        paymentStatistics.conversion = conversion
        animateMessageValues()
      }

      setTimeout(() => {
        animateButton('#tg-btn-today')
        getNode('.payment-statistics .message').classList.add('active')
        changeMessageValues({
          date: 'today',
          volume: '$6,530',
          invoices: '2,569',
          payments: '1,253',
          users: '1,606',
          conversion: '48%'
        })
      }, 2000)
      setTimeout(() => {
        animateButton('#tg-btn-yesterday')
        changeMessageValues({
          date: 'yesterday',
          volume: '$8,216',
          invoices: '4,980',
          payments: '3,012',
          users: '3,606',
          conversion: '60%'
        })
      }, 3000)
      setTimeout(() => {
        animateButton('#tg-btn-all-time')
        changeMessageValues(copyPaymentStatistics)
        console.log(copyPaymentStatistics)
      }, 4000)
    // }, 9000)
  }
})


const animateSendCoinsMessage = (class1, class2, time, showBg) => {
  setTimeout(() => {
    if (class2) getNode(class2).classList.remove('active')
    if (showBg) getNode('.send-coins__message-bg').classList.add('active')
    getNode(class1).classList.add('active')
  }, time)
}
animateSendCoinsMessage('.send-coins__message_first', '', 0)
animateSendCoinsMessage('.send-coins__message_second', '.send-coins__message_first', 1500, true)
animateSendCoinsMessage('.send-coins__message_third', '.send-coins__message_second', 3000)
animateSendCoinsMessage('.send-coins__message_first', '.send-coins__message_third', 4500)

// const sendCoinsToUsers = getArrayOfNodes('.send-coins__message')
// let canScroll = true;
// window.addEventListener('scroll', event => {
//   event.preventDefault()
//   if (canScroll) {
//     // document.body.style.overflow = 'hidden'
//     if (getNode('.slider').getBoundingClientRect().y < 0 && blockScroll) {
//       const slides = getArrayOfNodes('.slider__content');
//
//       switch (getNode('#active-slide-number').innerText) {
//         case '01':
//           removeClassForActiveSliderNode(slides);
//           getNode('#active-slide-number').innerText = '02';
//           getNode(`.slider__content.second`).classList.add('active');
//           break;
//         case '02':
//           removeClassForActiveSliderNode(slides);
//           getNode('#active-slide-number').innerText = '03';
//           getNode(`.slider__content.third`).classList.add('active');
//           blockScroll = false
//           break;
//       }
//     }
//     canScroll = false
//     setTimeout(() => {
//       canScroll = true
//       document.body.style.overflow = ''
//     }, 1000)
//   }
//   // getNode('.slider').scrollIntoView({ block: "center" });
// });

///////////SWITCH-SLIDES-WITH-SCROLL