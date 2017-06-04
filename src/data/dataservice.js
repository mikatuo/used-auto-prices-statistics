import axios from 'axios';

const service = {
    getCategories: getCategories,
    getMarks: getMarks,
    getModels: getModels,
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
    })
}

function getPriceStatisticsByYears(filters) {
    const result = {};
    // TODO: accept years and gear(s) from filters.
    const years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const gear = 2; // automatic

    return new Promise((resolve, reject) => {
        Promise.all(years.map(year => {
            const url = `http://api.auto.ria.com/average?model_id=${filters.model}&gear_id=${gear}&yers=${year}`;
            return new Promise((resolve, reject) => {
                axios.get(url)
                    .then(getJson)
                    .then((data) => result[year] = data)
                    .then(resolve)
                    .catch(reject);
            });
        }))
            .then(() => resolve(result))
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
    }
}