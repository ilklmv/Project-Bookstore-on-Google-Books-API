const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const slideWidth = slides[0].clientWidth;
let currentSlide = 0;

const sliderDots = document.querySelectorAll(".slider-dot");

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

// eslint-disable-next-line no-unused-vars
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

function updateSlider() {
    const translateX = -currentSlide * slideWidth;
    slider.style.transform = `translateX(${translateX}px)`;

    // Обновление активного круга
    sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToSlide(index);
    });
});

// Automatically advance to the next slide every 3 seconds
setInterval(nextSlide, 5000);

updateSlider();
