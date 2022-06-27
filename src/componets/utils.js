const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-type': 'application/json; charset=utf-8',
        Cookie: 'mb-client-type=mb-web-ui'
    }

};

export const getEntities = async entity => {

    let url = '';

    switch (entity) {
        case 'currencies':
            url = '/bpapi/rest/lookups/currencies';
            break
        case 'countries':
            url = '/bpapi/rest/lookups/countries';
            break
        case 'location':
            url = '/edge/rest/locale';
            break
        case 'navigation':
            url= '/edge/rest/navigation';
            break
        default:
            url = '';
            break
    }


    return fetch(url, options)
        .then(response => response.json())
        .catch(err => console.error(err));
};

export const getEvents = async props => {

    let eventFilter = Object.keys(props).filter(key => key !== 'currency' && props[key] !== '').reduce(
        (prev, current, index) =>
            index > 0 ?
                `${prev},${props[current]}`
            :
                prev + props[current]
        , '');
    if (eventFilter !== '') {
        eventFilter = '&tag-url-names=' + eventFilter;
    }

    const url = `/edge/rest/events?offset=0&per-page=5000&states=open&odds-type=DECIMAL&include-prices=true&price-depth=1&price-mode=expanded&include-event-participants=true&exclude-mirrored-prices=false&currency=${props['currency']}${eventFilter}`;

    return fetch(url, options)
        .then(response => response.json())
        .catch(err => console.error(err));
};

export const solveCurrencySymbol = (currencyShortName) => {

    switch (currencyShortName) {
        case 'AUD':
            return '$'
        case 'CAD':
            return '$'
        case 'CNY':
            return '¥'
        case 'EUR':
            return '€'
        case 'GBP':
            return '£'
        case 'HKD':
            return '$'
        case 'IDR':
            return 'Rp'
        case 'JPY':
            return '¥'
        case 'KRW':
            return '₩'
        case 'TWD':
            return 'NT$'
        case 'USD':
            return '$'

    }


};




