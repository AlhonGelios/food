window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const   tabs = document.querySelectorAll(".tabheader__item"),
            tabsContent = document.querySelectorAll(".tabcontent"),
            tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show' , 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item , i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2020-08-04T16:00';

    function getTimeRemaining(endtime) {
        const   t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000*60*60*24)),
                hours = Math.floor((t / (1000*60*60)) % 24),
                minutes = Math.floor((t / (1000*60)) % 60),
                seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                endtimeText = document.querySelector('#endtime'),
                timeInterval = setInterval(updateClock, 1000),
                deadlineDate = new Date(endtime),
                months = ['января' , 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября','ноября', 'декабря'];
        
        updateClock();

        endtimeText.textContent = `Акция закончится ${getZero(deadlineDate.getDate())} ${months[deadlineDate.getMonth()]} в
         ${getZero(deadlineDate.getHours())}:${getZero(deadlineDate.getMinutes())}`;

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //modal

    const   modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');
    
    function hideModal(itemModal = modal) {
        itemModal.classList.add('hide');
        itemModal.classList.remove('show');
        document.body.style.overflow = '';
    } 

    function showModal(itemModal = modal) {
        itemModal.classList.add('show');
        itemModal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    } 

    //hideModal(modal);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            showModal(modal);
        });
    });
    
    modalCloseBtn.addEventListener('click', () => {
        hideModal(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            hideModal(modal);
        }
    });

    const modalTimerId = setTimeout(showModal, 3000);
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});
