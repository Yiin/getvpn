const CONSTANTS = {
    API_HOST: 'https://api.protonmail.ch'
};

let selectedCurrency = 'EUR';

async function fetchPlans() {
    const response = await fetch(`${CONSTANTS.API_HOST}/payments/plans`, {
        headers: {
            "x-pm-apiversion": 3,
            "x-pm-appversion": "Other"
        }
    });
    const { Plans } = await response.json();

    return Plans;
}

function updatePricing({ Amount, Pricing }) {
    for (const cycle in Pricing) {
        const price = Pricing[cycle];

        const planEl = document.querySelector(`.plan[data-cycle="${cycle}"]`);

        // price per month
        planEl.querySelector('.price').innerHTML = formatPrice(price / cycle);

        // actual price
        planEl.querySelector('.actual-price').innerHTML = formatPrice(price);

        // full price
        if (planEl.querySelector('.full-price')) {
            planEl.querySelector('.full-price').innerHTML = formatPrice(Amount * cycle);
        }

        // cta
        planEl.querySelector('.is-pricing-button').href =
            'https://account.protonvpn.com/signup?' +
            [
                'plan=vpnplus',
                'from=pricing',
                `billing=${cycle}`,
                `currency=${selectedCurrency}`,
            ].join('&')
    }
}

function formatPrice(price) {
    const symbol = ({
        EUR: '€',
        USD: '$',
        CHF: 'CHF'
    })[selectedCurrency];

    return symbol + (price / 100).toFixed(2);
}

async function updatePlans() {
    const plans = await fetchPlans();

    const plusPlan = plans.find(({ Name }) => Name === 'vpnplus');

    window.dispatchEvent(new CustomEvent('pricing.updating'));

    updatePricing(plusPlan);

    window.dispatchEvent(new CustomEvent('pricing.updated'));
}

async function init() {
    document.querySelectorAll('.currency').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelector('.currency.is-selected').classList.remove('is-selected');
            el.classList.add('is-selected');

            selectedCurrency = el.dataset.currency;
            updatePlans();
        });
    });

    updatePlans();
}

export default {
    init
};
