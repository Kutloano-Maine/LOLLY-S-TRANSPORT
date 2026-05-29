//menu display 
const navigation = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    if (navigation) {
        navigation.classList.remove('show-menu')
    }
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
if (header) {
    window.scrollY >= 50 ? header.classList.add('blur-header'): header.classList.remove('blur-header')
}
closeMenu()

}
window.addEventListener('scroll' , blurHeader)

window.addEventListener('resize', closeMenu)

//scroll progress, reveal, parallax, and text motion
const scrollProgressBar = document.getElementById('scroll-progress-bar')
const scrollProgressValue = document.getElementById('scroll-progress-value')
const parallaxItems = document.querySelectorAll('[data-parallax-speed]')
const revealItems = document.querySelectorAll('.reveal')
const scrambleItems = document.querySelectorAll('.scramble-text')
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const updateScrollProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0

    if (scrollProgressBar) {
        scrollProgressBar.style.setProperty('--scroll-progress', `${progress}%`)
    }

    if (scrollProgressValue) {
        scrollProgressValue.textContent = `${progress}%`
    }
}

const updateParallax = () => {
    if (prefersReducedMotion) {
        return
    }

    parallaxItems.forEach(item => {
        const speed = Number(item.dataset.parallaxSpeed || 0)
        const rect = item.getBoundingClientRect()
        const offset = (rect.top - window.innerHeight / 2) * speed

        item.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
    })
}

const scrambleText = element => {
    if (element.dataset.scrambled === 'true' || prefersReducedMotion) {
        return
    }

    const finalText = element.dataset.text || element.textContent
    let frame = 0
    const totalFrames = 24

    element.dataset.scrambled = 'true'
    element.classList.add('is-scrambling')

    const run = () => {
        const revealed = Math.floor((frame / totalFrames) * finalText.length)
        const scrambled = finalText
            .split('')
            .map((char, index) => {
                if (char === ' ' || index < revealed) {
                    return char
                }

                return letters[Math.floor(Math.random() * letters.length)]
            })
            .join('')

        element.textContent = scrambled

        if (frame < totalFrames) {
            frame += 1
            window.setTimeout(run, 32)
        } else {
            element.textContent = finalText
            element.classList.remove('is-scrambling')
        }
    }

    run()
}

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }

            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
        })
    }, {
        threshold: .16,
        rootMargin: '0px 0px -8% 0px',
    })

    revealItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * .04, .24)}s`)
        revealObserver.observe(item)
    })

    const scrambleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrambleText(entry.target)
                scrambleObserver.unobserve(entry.target)
            }
        })
    }, {
        threshold: .58,
    })

    scrambleItems.forEach(item => scrambleObserver.observe(item))
} else {
    revealItems.forEach(item => item.classList.add('is-visible'))
    scrambleItems.forEach(item => scrambleText(item))
}

let ticking = false
const handleMotionFrame = () => {
    updateScrollProgress()
    updateParallax()
    ticking = false
}

const requestMotionFrame = () => {
    if (!ticking) {
        window.requestAnimationFrame(handleMotionFrame)
        ticking = true
    }
}

window.addEventListener('scroll', requestMotionFrame, { passive: true })
window.addEventListener('resize', requestMotionFrame)
requestMotionFrame()

//swiper
if (document.querySelector('.favorite__swiper') && typeof Swiper !== 'undefined') {
    let swiperAbout = new Swiper('.favorite__swiper', {
     loop: true,
     slidesPerView: 'auto',
     centeredSlides: true,
     grabCursor: true,
     speed: prefersReducedMotion ? 350 : 5200,
     autoplay: prefersReducedMotion ? false : {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
     },
     freeMode: {
        enabled: true,
        momentum: false,
     },
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
