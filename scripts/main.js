const menuToggle = document.querySelector(".menutoggle");
const navMenu = document.querySelector("nav");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");

  if (menuToggle.classList.contains("active")) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

const wrapper = document.querySelector(".projects"),
  carousel = document.querySelector(".carousel"),
  arrows = document.querySelectorAll(".projects i"),
  firstCardWidth = carousel.querySelector(".card").offsetWidth,
  carouselCards = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeOutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1000);
};

autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.scrollLeft = carousel.classList.add("no-transition");
    carousel.scrollWidth - (2 * carousel.scrollWidth - carousel.offsetWidth);
    carousel.scrollLeft = carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.scrollLeft = carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.scrollLeft = carousel.classList.remove("no-transition");
  }

  clearTimeout(timeOutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

arrows.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseup", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeOutId));
wrapper.addEventListener("mouseleave", autoPlay);
