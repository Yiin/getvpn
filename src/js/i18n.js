const i18nEl = document.querySelector('.i18n');
const i18nMobileEl = document.querySelector('#language');

function toggleDropdown() {
	i18nEl.classList.toggle('i18n--open');
}

function closeDropdown(e) {
	if (i18nEl === e.target || i18nEl.contains(e.target)) {
		return;
	}
	i18nEl.classList.remove('i18n--open');
}

function changeLanguage(e) {
	document.location = `/${e.target.value}/getvpn`;
}

function init() {
	i18nEl.addEventListener('click', toggleDropdown);
	window.addEventListener('click', closeDropdown);
	i18nMobileEl.addEventListener('change', changeLanguage);
}

export default {
	init
};
