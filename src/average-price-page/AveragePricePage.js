import React, { Component } from 'react';
import Dropdown from '../components/Dropdown';
import PriceStatisticsByYears from './PriceStatisticsByYears';
import dataservice from '../data/dataservice';

class AveragePricePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: dataservice.getCategories(),
            marks: null,
            models: null,
            filters: new AveragePriceFilters(),
            priceStatisticsByYears: null
        };
    }

    onCategoryChange = (value) => {
        const filters = this.state.filters.copy();
        let marks;
        this.setState({
            filters: filters.setCategory(value),
            marks: marks = dataservice.getMarks({ category: filters.category }),
            models: null
        });
        return marks;
    }

    onMarkChange = (value) => {
        const filters = this.state.filters.copy();
        let models;
        this.setState({
            filters: filters.setMark(value),
            models: models = dataservice.getModels({ category: filters.category, mark: filters.mark }),
            priceStatisticsByYears: null
        });
        return models;
    }

    onModelChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setModel(value)
        });
        if (filters.isValid())
            this.setState({
                priceStatisticsByYears: dataservice.getPriceStatisticsByYears(filters)
            })
    }

    setModel = (specification) => {
        this.onCategoryChange(specification.category)
            .then(() => this.onMarkChange(specification.mark))
            .then(() => this.onModelChange(specification.model));
    }

    render() {
        const { categories, marks, models, filters, priceStatisticsByYears } = this.state;

        return (
            <div>
                <h1>Hello from the page!</h1>

                <button onClick={() => this.setModel({ category: '1', mark: '29', model: '1258' })}>Hyundai Accent</button>
                <button onClick={() => this.setModel({ category: '1', mark: '24', model: '239' })}>Ford Fiesta</button>
                <button onClick={() => this.setModel({ category: '1', mark: '24', model: '240' })}>Ford Focus</button>
                <button onClick={() => this.setModel({ category: '1', mark: '28', model: '265' })}>Honda Civic</button>
                <br />
                <br />

                <Dropdown label='Тип транспорта'
                    source={categories} onChange={this.onCategoryChange} value={filters.category} />
                {marks && <Dropdown label='Марка'
                    source={marks} onChange={this.onMarkChange} value={filters.mark} />}
                {models && <Dropdown label='Модель'
                    source={models} onChange={this.onModelChange} value={filters.model} />}
                
                <br />
                <br />
                Filters: {JSON.stringify(filters)}
                
                <br />
                <br />
                {priceStatisticsByYears && <PriceStatisticsByYears data={priceStatisticsByYears} />}
            </div>
        );
    }
}

export default AveragePricePage;
/////////////////////////////////

class AveragePriceFilters {
    constructor() {
        this.category = null;
        this.mark = null;
        this.model = null;
    }

    isValid() {
        return this.category && this.mark && this.model;
    }

    setCategory(id) {
        this.category = id;
        this.setMark(null);
        return this;
    }

    setMark(id) {
        this.mark = id;
        this.setModel(null);
        return this;
    }

    setModel(id) {
        this.model = id;
        return this;
    }

    copy() {
        const filters = Object.assign(new AveragePriceFilters(), this);
        return filters;
    }
}