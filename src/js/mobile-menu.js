const navToggle = document.querySelector('.nav-toggle');
const closeButton = document.querySelector('.close-button');
const navOptions = document.querySelector('.nav-options');

function toggleMobileMenu(e) {
    navOptions.classList.toggle('is-open');
}

function init() {
    navToggle.addEventListener('click', toggleMobileMenu);
    closeButton.addEventListener('click', toggleMobileMenu);
}

export default {
    init
};
