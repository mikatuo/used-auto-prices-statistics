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
            gears: null,
            filters: new AveragePriceFilters(),
            priceStatisticsByYears: null
        };
    }

    onCategoryChange = (value) => {
        const filters = this.state.filters.copy();
        let marks, gears;
        this.setState({
            filters: filters.setCategory(value),
            marks: marks = dataservice.getMarks({ category: filters.category }),
            gears: gears = dataservice.getGears({ category: filters.category }),
            models: null
        });
        return Promise.all([marks, gears]);
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
        this.maybeFetchData(filters);
    }

    onGearChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setGear(value)
        });
        this.maybeFetchData(filters);
    }

    maybeFetchData = (filters) => {
        if (filters.isValid())
            this.setState({
                priceStatisticsByYears: dataservice.getPriceStatisticsByYears(filters)
            });
    }

    setModel = (specification) => {
        this.onCategoryChange(specification.category)
            .then(() => this.onMarkChange(specification.mark))
            .then(() => this.onModelChange(specification.model))
            .then(() => this.onGearChange(specification.gear));
    }

    render() {
        const { categories, marks, models, gears, filters, priceStatisticsByYears } = this.state;

        return (
            <div>
                {/* TODO: Move this into a new FavoriteFilters component */}
                <div style={{float: 'left'}}>
                    <button onClick={() => this.setModel({ category: '1', mark: '29', model: '1258', gear: '2' })}>Hyundai Accent</button>
                    <button onClick={() => this.setModel({ category: '1', mark: '24', model: '239', gear: '2' })}>Ford Fiesta</button>
                    <button onClick={() => this.setModel({ category: '1', mark: '24', model: '240', gear: '2' })}>Ford Focus</button>
                    <button onClick={() => this.setModel({ category: '1', mark: '28', model: '265', gear: '2' })}>Honda Civic</button>
                </div>

                {/* TODO: Move this into a new Filters component */}
                <div style={{float: 'left'}}>
                    <Dropdown label='Тип транспорта'
                        source={categories} onChange={this.onCategoryChange} value={filters.category} />
                    {marks && <Dropdown label='Марка'
                        source={marks} onChange={this.onMarkChange} value={filters.mark} />}
                    {models && <Dropdown label='Модель'
                        source={models} onChange={this.onModelChange} value={filters.model} />}
                    <br />
                    {gears && <Dropdown label='Коробка передач'
                        source={gears} onChange={this.onGearChange} value={filters.gear} />}
                </div>
                <div style={{clear: 'both'}}></div>
                
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
        this.gear = null;
    }

    isValid() {
        return this.category && this.mark && this.model && this.gear;
    }

    setCategory(id) {
        this.category = id;
        this.setMark(null);
        this.setGear(null);
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

    setGear(id) {
        this.gear = id;
        return this;
    }

    copy() {
        const filters = Object.assign(new AveragePriceFilters(), this);
        return filters;
    }
}