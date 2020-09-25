import './siema.min.js';

function init() {
    if (window.matchMedia('(max-width: 1100px)').matches) {
        const reviewsCarousel = new Siema({
            selector: '.reviews',
            loop: true,
        });
        document.querySelector('.is-review-container .prev')
            .addEventListener('click', () => reviewsCarousel.prev());
        document.querySelector('.is-review-container .next')
            .addEventListener('click', () => reviewsCarousel.next());

        window.addEventListener('pricing.updated', () => {
            const plansCarousel = new Siema({
                selector: '.plans',
                loop: true,
                startIndex: 1
            });

            const prev = () => plansCarousel.prev();
            const next = () => plansCarousel.next();

            document.querySelector('.is-pricing-section .prev')
                .addEventListener('click', prev);
            document.querySelector('.is-pricing-section .next')
                .addEventListener('click', next);

            const cleanup = () => {
                document.querySelector('.is-pricing-section .prev')
                    .removeEventListener('click', prev);
                document.querySelector('.is-pricing-section .next')
                    .removeEventListener('click', next);

                plansCarousel.destroy(true);
                window.removeEventListener('pricing.updating', cleanup);
            }

            window.addEventListener('pricing.updating', cleanup);
        });
    }
}

export default {
    init
};
