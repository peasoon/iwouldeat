import enquire from "enquire.js";
import { gsap, TimelineMax } from "gsap";

import { boundTabs } from "./project/modules/tabs/tabs.js";
import "./project/modules/tabs/_tabs.scss";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

//import 'simplebar'; 
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

import IMask from 'imask';
import ymaps from "ymaps";

import { bindAccordeon } from "./project/modules/accordeon/acordeon.js";
import "./project/modules/accordeon/_accordeon.scss";

import AOS from 'aos';
import 'aos/dist/aos.css';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const menuList = document.querySelector(".header-nav__list");
const header = document.querySelector(".header");
const burgerBtn = document.querySelector(".header-nav__burger");

enquire.register("screen and (max-width:950px)", {
  match: function () {
    menuList.classList.add("menu-mobile");
    const menuListMobile = document.querySelector(".menu-mobile");
    (menuListMobile);
    menuListMobile.style.top = header.offsetHeight + "px";
    menuListMobile.style.height = screen.height - header.offsetHeight + "px";
  },

  unmatch() {
    menuList.classList.remove("menu-mobile");
    menuList.removeAttribute("style");
  },
});

burgerBtn.addEventListener("click", () => {
  menuList.classList.toggle("active");
  burgerBtn.classList.toggle("close");
});

//animation
{
  const arrows = document.querySelector(".ready__arrows");
  gsap.fromTo(
    arrows,
    {
      y: -5,
    },
    {
      duration: 0.5,
      y: 5,
      repeat: -1,
      yoyo: true,
      ease: "Circ".easeIn,
    }
  );

	const firstScreenTitle = document.querySelector('#firstScreenTitle')
	gsap.from(firstScreenTitle, {
		x: -300,
		opacity: 0,
		duration: 0.8,
		delay: 1,
		yoyo: true,
		ease: 'none'
	})

	const tryBaner = document.querySelector('.gc-price__try')
	const tl = new TimelineMax({repeat:-1, repeatDelay:2});
	tl.fromTo(tryBaner, {
		scale: 0.92,
		duration: 0.4
	}, 
	{
		scale: 1.11,
		repeat: 2,
		yoyo: true,
		ease: 'none',
	}
	)
	tl.to(tryBaner, {scale: 1})
}

//section calc
{
  const outerTabs = document.querySelector(".gc-tabs__tabs");
  boundTabs(outerTabs);
  const innerTabs = document.querySelectorAll(".gctce-tabs__tabs");
  innerTabs.forEach((innerTab) => {
    boundTabs(innerTab);
  });
}

//innertabs slider

const innerSliders = document.querySelectorAll(".gctcetc-slider__slider");
const innerSwiper = (sliderSelector) => {
  return new Swiper(sliderSelector, {
    direction: "horizontal",
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 20
  });
};

const slidersArray = []

innerSliders.forEach(slider => {
	const swiper = innerSwiper(slider);
	slidersArray.push(swiper);
})



//menu days changing
{
  const dayContainers = document.querySelectorAll(".dayContainer");

  const daysArray = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  let dayNum = 0;
  const innerTabsHeadings = document.querySelectorAll(".innerTabsHeadings");

  dayContainers.forEach((dayContainer, index) => {
    const day = dayContainer.querySelector(".menuDay");
    let dayNum = 0;

    dayContainer.addEventListener("mousemove", (e) => {
      if (e.offsetX < day.offsetLeft) {
        document.documentElement.style.setProperty(
          "--day-hover-before",
          "#f29e60"
        );
      }
      if (e.offsetX > day.offsetLeft) {
        document.documentElement.style.setProperty(
          "--day-hover-before",
          "transparent"
        );
      }
      if (e.offsetX > day.offsetLeft + day.offsetWidth) {
        document.documentElement.style.setProperty(
          "--day-hover-after",
          "#f29e60"
        );
      }
      if (e.offsetX < day.offsetLeft + day.offsetWidth) {
        document.documentElement.style.setProperty(
          "--day-hover-after",
          "transparent"
        );
      }
    });

    dayContainer.addEventListener("mouseleave", (e) => {
      document.documentElement.style.setProperty(
        "--day-hover-before",
        "transparent"
      );
      document.documentElement.style.setProperty(
        "--day-hover-after",
        "transparent"
      );
    });

    dayContainer.addEventListener("click", (e) => {
      if (e.offsetX < day.offsetLeft) {
        dayNum--;
        if (dayNum < 0) dayNum = 6;
        day.textContent = daysArray[dayNum];
        innerTabsHeadings[index].children[dayNum].click();
      }
      if (e.offsetX > day.offsetLeft + day.offsetWidth) {
        dayNum++;
        if (dayNum > 6) dayNum = 0;
        day.textContent = daysArray[dayNum];
        innerTabsHeadings[index].children[dayNum].click();
      }
    });
  });
}

//tabs color
{
	const tabsMain = document.querySelector('.gc-tabs__tabs').children[0];
	const tabsMainHedings = [...tabsMain.children];

	const changeTabsTextColor = (color) => {
		const tabs = document.querySelector('.gc-tabs__tabs');
		const content = tabs.querySelector('.tabs-content');
		let contentShow = null;
		[...content.children].forEach(child => {
			if (child.classList.contains('show') ) contentShow = child
		})
		const contentTitle = contentShow.querySelector('.gct-content__title')
		contentTitle.style.color = color;
		const addItems = contentShow.querySelectorAll('.gctc-add__item')
		addItems.forEach(item => {
			item.style.color = color
			item.style.borderColor = color
		})
		const bju = contentShow.querySelector('.gctc-example__bju')
		bju.style.backgroundColor = color
		const countItems = contentShow.querySelectorAll('.gctc-count__item')
		countItems.forEach(item => {
			item.style.color = color
			item.style.borderColor = color
		})
	}
	const attrObserver = new MutationObserver((mutations) => {
		mutations.forEach((mu, index) => {
			if (mu.type === "attributes" && mu.attributeName === "class") {
				if (mu.target.classList.contains('selected') && index < tabsMainHedings.length) {
					const bgc = getComputedStyle(document.documentElement).getPropertyValue(`--tab-bg-${index+1}`)
					document.querySelector('.gc-tabs__tabs').lastElementChild.style.backgroundColor = bgc
					const tabsColor = getComputedStyle(document.documentElement).getPropertyValue(`--tab-text-${index+1}`)
					changeTabsTextColor(tabsColor)
				}
			}
		});
	});
	tabsMainHedings.forEach(heading => {
		attrObserver.observe(heading, {attributes: true})
	})
	
}

//change dishes count
{
	const borderReset = (container) => {
		[...container.children].forEach(child => {
			child.style.borderWidth = '1px';
			child.classList.remove('selected')
		})
	}

	const renderSlide = () => {
		return `
		<div class="swiper-slide gctcetc-slider__slide gctcetcs-slide">
			<div class="gctcetcs-slide__image">
				<img src="https://placeimg.com/200/150/any?id=${Math.floor(Math.random()*100)}" alt="">
			</div>
		</div>`
	}

	const setSlidesCount = (tabNum, slidesCount) => {
		const startFrom = tabNum*7;
		const curentSlidersContainer = document.querySelector('.content.show .gct-content')
		const curentSliders = curentSlidersContainer.querySelectorAll('.swiper .swiper-wrapper')
		curentSliders.forEach((slider, index) => {
			let currentSlidesCount = slider.children.length;
			const sliderNum = tabNum*7 + index;
			if (currentSlidesCount < slidesCount) {
				while (currentSlidesCount < slidesCount) {
					slidersArray[sliderNum].appendSlide(renderSlide());
					currentSlidesCount++;
				} 
				currentSlidesCount = slider.children.length;
			}
			if (currentSlidesCount > slidesCount) {
				while (currentSlidesCount > slidesCount) {
					slider.children[slider.children.length-1].remove();
					currentSlidesCount--;
				} 
				currentSlidesCount = slider.children.length;
				slidersArray[sliderNum].update();
			}
		})
	}

	const randomNumFrom = (num) => {
		return Math.floor(Math.random()*num)
	} 

	const countBju = (tab) => {
		tab.querySelector('.gctce-bju__cal').textContent = randomNumFrom(4000)
		tab.querySelector('.gctce-bju__b').textContent = randomNumFrom(200)
		tab.querySelector('.gctce-bju__j').textContent = randomNumFrom(200)
		tab.querySelector('.gctce-bju__u').textContent = randomNumFrom(200)
	}

	const dishesContainers = document.querySelectorAll('.gctc-count')
	dishesContainers.forEach(container => {
		[...container.children].forEach((child, index) => {
			child.addEventListener('click', () => {
				borderReset(container)
				child.style.borderWidth = '7px';
				child.classList.add('selected')
				const dishesCount = index + 3;
				const activeMainMenuElement = child.closest('.content')
				const menuIndex = [...activeMainMenuElement.parentNode.children].indexOf(activeMainMenuElement)
				(`${menuIndex} --- ${dishesCount}`)
				setSlidesCount(menuIndex, dishesCount)
				countBju(activeMainMenuElement)
			})
		})
	})

}


//add ration
{
	const addRationBtn = document.querySelector('#addRation');
	const mainTabs = document.querySelector('.goal-calc__tabs');
	const mainTabsHeadings = mainTabs.querySelector('.tabs-headings')
	const mainTabContents = mainTabs.querySelector('.tabs-content')
	
	const getRation = () => {
		let rationName = '';
		let rationDishes;
		let rationDays;
		[...mainTabsHeadings.children].forEach(item => {
			if (item.classList.contains('selected')) rationName = item.textContent;
		});
		[...mainTabContents.children].forEach(item => {
			if (item.classList.contains('show')) {
				[...item.querySelector('.gctc-count').children].forEach(child => {
					if (child.classList.contains('selected')) rationDishes = child.textContent
				})
			}
		});
		rationDays = document.querySelector('input[name="gcp-item__checkbox-2"]:checked').value
		return [rationName, rationDishes, rationDays]
	}

	const renderRationItem = ([rationName, dishesCount, rationDays]) => {
		return `
		<div class="gc-price__ration gcp-ration">
			<div class="gcp-ration__name">"${rationName}":</div>
			<div class="gcp-ration__count">${dishesCount},</div>
			<div class="gcp-ration__days">${rationDays} дней</div>
			<div class="gcp-ration__delete">☓</div>
		</div>
		`
	}

	const countPrice = () => {
		document.querySelector('.gc-price__total span').textContent = 
			document.querySelector('.gc-price__ration-container .simplebar-content').children.length === 0 ? 
		'0 р.' : Math.floor(Math.random()*20000) + 'р.'
	}
	addRationBtn.addEventListener('click', () => {
		const rationItem = renderRationItem( getRation() );
		const rationContainer = document.querySelector('.gc-price__ration-container .simplebar-content')
		rationContainer.insertAdjacentHTML('beforeend',rationItem);
		[...rationContainer.children].forEach(child => {
			child.querySelector('.gcp-ration__delete').addEventListener('click', function() {
				this.closest('.gcp-ration').remove();
				countPrice();
			})
		});
		countPrice()
	})
}

//simplebar with
{
	const simpleBarRation = new SimpleBar(document.querySelector('.gc-price__ration-container'), {autoHide: false});
	(document.querySelector('.gc-price__ration-container .simplebar-content'))
}

//imask 
{
	const phoneInput = document.querySelector('#phoneForMask')
	const maskOptions = {
		mask: '+{7}(000)000-00-00',
		//lazy: false,
	};
	const maskedPhone = IMask(phoneInput, maskOptions);
	const orderBtn = document.querySelector('#orderBtn')
	maskedPhone.on("accept", () => {
		(maskedPhone.unmaskedValue)
		if (maskedPhone.unmaskedValue.length === 11) {
			orderBtn.disabled = false
		} else {
			orderBtn.disabled = true
		}
	});

	const overlayPhone = document.querySelector('#overlayPhone');
	const overlayPhoneMasked = IMask(overlayPhone,maskOptions);
	overlayPhoneMasked.updateOptions({
		lazy: false
	})
}

//vk widgets
{
	function VK_Widget_Init(){
		document.getElementById('vk_groups').innerHTML = "";
		let vk_width = document.getElementById('vk_wrapper').clientWidth*0.6
		if (document.documentElement.clientWidth < 350) {
			document.getElementById('vk_groups').style.transform = "scaleX(0.8)"
			document.getElementById('vk_groups').style.marginLeft = "auto"
			document.getElementById('vk_groups').style.marginRight = "auto"
		}
		let vk_height = 700;
		if (document.documentElement.clientWidth < 650) {
			vk_height= 300;
		}
		(vk_width)
		VK.Widgets.Group("vk_groups", {mode: 4, wide: 1, width: vk_width, height: vk_height, color1: "FFFFFF", color2: "000000", color3: "5181B8"}, 174033755);
};
window.addEventListener('load', VK_Widget_Init, false);
window.addEventListener('resize', VK_Widget_Init, false);

	
}

//ymaps
{

	(async () => {
		try {
			let maps = await ymaps.load("https://api-maps.yandex.ru/2.1/?apikey=4e77e846-043d-47be-8481-1120f66a5db1&lang=ru_RU");
			let map = await new maps.Map("map", {
				center: [59.89084561685924, 30.345543243839316],
				zoom: 11,
				controls: [],
			});
			('map-->',map)
			map.controls.add("zoomControl", {
				position: { right: "40px", top: "5px" },
			});
			map.behaviors.disable("scrollZoom");
			var myGeoObject = new maps.GeoObject({
        // Описываем геометрию геообъекта.
        geometry: {
            // Тип геометрии - "Многоугольник".
            type: "Polygon",
            // Указываем координаты вершин многоугольника.
            coordinates: [
                // Координаты вершин внешнего контура.
								[[59.872841998122006,30.298265179997802],[59.88164411179918,30.279039105779056],[59.88578547382302,30.260156354314205],[59.917346336506924,30.27079935968532],[59.931133983294814,30.286592206365007],[59.93423541165393,30.34667368829859],[59.92648129516408,30.37963267267359],[59.92441322360459,30.391648969060302],[59.93423541165393,30.443147382146257],[59.92079378714318,30.470956525212657],[59.8969209854691,30.490681328426298],[59.88501717752543,30.48896471465678],[59.87638855548232,30.44707933868021],[59.86361406972601,30.408283867488805],[59.85359819240415,30.367428459773965],[59.84720717258157,30.34717241729349],[59.84997100795626,30.331036247859885],[59.85308004748462,30.287090935359906]],
                // Координаты вершин внутреннего контура.
                [

                ]
            ],
            // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
            fillRule: "nonZero"
        },
        // Описываем свойства геообъекта.
        properties:{
            // Содержимое балуна.
            balloonContent: "Многоугольник"
        }
    }, {
        // Описываем опции геообъекта.
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Общая прозрачность (как для заливки, так и для обводки).
        opacity: 0.5,
        // Ширина обводки.
        strokeWidth: 5,
        // Стиль обводки.
        strokeStyle: 'shortdash'
    });

    // Добавляем многоугольник на карту.
    map.geoObjects.add(myGeoObject);
		} catch (error) {
			("Failed to load Yandex Maps", error);
		}
		('map-map')
	})();

}


//accordeon
{
	const faqAccordeon = document.querySelector('.faq__accordeon')
	bindAccordeon(faqAccordeon,20)
}


//modals 
{
	const openCallbackModal = document.querySelector('#callbackModalOpen');
	const overlayModal = document.querySelector('.overlay-modal')
	const callbackModal = document.querySelector('.callback')
	const closeCallbackModal = document.querySelector('#closeCallbackModal')

	openCallbackModal.addEventListener('click', () => {
		overlayModal.classList.add('show')
		gsap.from(callbackModal, {
			opacity: 0,
			duration: 1,
		})
	})

	closeCallbackModal.addEventListener('click', () => {
		overlayModal.classList.remove('show')
	})
}

//scroll animation
{
	AOS.init({
		once: true
	})

	const arrowUp = document.querySelector('#arrowUp');
	arrowUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
	})
	})
	window.addEventListener('scroll', () => {
		if (scrollY > 950) {
			arrowUp.classList.add('show')
		} else {
			arrowUp.classList.remove('show')
		}
	})
}

//messager
{
	const messagerBtn = document.querySelector('#messagerBtn');
	const messagerServices = document.querySelector('#messagerServices');
	let messagerIsOpened = false;

	gsap.fromTo(messagerBtn, {
		scale: 0.8},
		{
		scale: 1.2,
		repeat: -1, 
		duration: 0.9,
		yoyo: true,
	}
	)

	messagerBtn.addEventListener('click', () => {
		messagerIsOpened = !messagerIsOpened;
		messagerBtn.classList.toggle('close');
		if (messagerIsOpened) {
			gsap.to(messagerServices, {
				height: 'auto',
				duration: 0.7
			}) 
		} else {
			gsap.to(messagerServices, {
				height: 0,
				duration: 0.7
			}) 
		}
	})



	const messagrServicesItems = document.querySelectorAll('.messager-services__item');
	const tooltipsArray = ['phone', 'mail', 'vkontakte', 'whatsapp']
	messagrServicesItems.forEach((item, index) => {
		tippy(item, {
			content: tooltipsArray[index],
			placement: 'left'
		})
	})
	
}