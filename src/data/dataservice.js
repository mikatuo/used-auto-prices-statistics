import axios from 'axios';

const service = {
    getCategories: getCategories,
    getMarks: getMarks,
    getModels: getModels,
    getGears: getGears,
    getPriceStatisticsByYears: getPriceStatisticsByYears
};

export default service;
/////////////////////////

function getCategories() {
    return [
        { id: 1, name: 'Легковые' },
        { id: 2, name: 'Мото' },
        { id: 3, name: 'Водный транспорт' },
        { id: 4, name: 'Спецтехника' },
        { id: 5, name: 'Прицеп' },
        { id: 6, name: 'Грузовик' },
        { id: 7, name: 'Автобус' },
        { id: 8, name: 'Автодом' },
        { id: 9, name: 'Воздушный транспорт' }
    ];
}

function getMarks({ category }) {
    const url = `http://api.auto.ria.com/categories/${category}/marks`;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(getJson)
            .then(mapAndResolve(resolve))
            .catch(reject);
    });
}

function getModels({ category, mark }) {
    const url = `http://api.auto.ria.com/categories/${category}/marks/${mark}/models`;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(getJson)
            .then(mapAndResolve(resolve))
            .catch(reject);
    });
}

function getGears({ category }) {
    const url = `http://api.auto.ria.com/categories/${category}/gearboxes`;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(getJson)
            .then(mapAndResolve(resolve))
            .catch(reject);
    });
}

function getPriceStatisticsByYears(filters) {
    const result = [];
    // TODO: accept years and gear(s) from filters.
    const years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];

    return new Promise((resolve, reject) => {
        Promise.all(years.map(year => {
            const url = `http://api.auto.ria.com/average`;
            const urlParams = {
                model_id: filters.model,
                yers: year
            };
            if (filters.gear)
                urlParams.gear_id = filters.gear;
            return new Promise((resolve, reject) => {
                axios.get(url, { params: urlParams })
                    .then(getJson)
                    .then((data) => {
                        if (data.total)
                            result.push({ year: year, data: data });
                    })
                    .then(resolve)
                    .catch(reject);
            });
        }))
            .then(() => resolve(result.sort(byYearsDescending)))
            .catch(reject);
    });
}

function getJson(response) {
    return response.data;
}

function mapAndResolve(resolve) {
    return (data) => {
        const result = data.map((m) => { return { id: m.value, name: m.name }; });
        return resolve(result);
    };
}

function byYearsDescending(a, b) {
    if (a.year > b.year)
        return -1;
    if (a.year < b.year)
        return 1;
    return 0;
}