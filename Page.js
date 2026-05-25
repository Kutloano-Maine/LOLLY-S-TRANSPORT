//menu display 
const navigation = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

//validation checks for menu existance 
if(navToggle){
    navToggle.addEventListener('click', ()=>{

        navigation.classList.toggle('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click' , ()=>{
       navigation.classList.remove('show-menu')

    })
}

//menu remove for responsive design 
const navLink = document.querySelectorAll('.nav__link')
const linkAction= ()=>{
    const navigation = document.getElementById('nav-menu')
    navigation.classList.remove('show-menu')
}
navLink.forEach(item=> item.addEventListener('click', linkAction))

const closeMenu = () => {
    if (navigation) {
        navigation.classList.remove('show-menu')
    }
}

//send enquiry email
const quoteForms = document.querySelectorAll('.quote__form')
quoteForms.forEach(form => {
    form.addEventListener('submit', () => {
        const submitButton = form.querySelector('.quote__button')
        const status = form.querySelector('.quote__status')

        if (status) {
            status.textContent = 'Sending enquiry...'
            status.classList.remove('quote__status--error', 'quote__status--success')
        }

        if (submitButton) {
            submitButton.disabled = true
            submitButton.textContent = 'Sending...'
        }

        setTimeout(() => {
            if (status) {
                status.textContent = 'Enquiry submitted. Please check the email inbox to confirm FormSubmit if this is the first enquiry.'
                status.classList.add('quote__status--success')
            }

            if (submitButton) {
                submitButton.disabled = false
                submitButton.textContent = 'Send Enquiry'
            }
            form.reset()
        }, 1800)
    })
})

//background header blur
const blurHeader = ()=> {
    const header = document.getElementById('header')
window.scrollY >= 50 ? header.classList.add('blur-header'): header.classList.remove('blur-header')
closeMenu()

}
window.addEventListener('scroll' , blurHeader)

window.addEventListener('resize', closeMenu)

//swiper
if (document.querySelector('.favorite__swiper') && typeof Swiper !== 'undefined') {
    let swiperAbout = new Swiper('.favorite__swiper', {
     loop: true,
     slidesPerView: 'auto',
     centeredSlides: true,
     grabCursor: true,
     pagination: {
        el: '.swiper-pagination',
        clickable: true,
     },
     
     breakpoints:{
        768:{
            slidesPerView:3,
            centeredSlides: true,
        }
     }
    })
}
