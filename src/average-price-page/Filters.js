import React, { Component } from 'react';
import Dropdown from '../components/Dropdown';
import dataservice from '../data/dataservice';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: new AveragePriceFilters(),
            categories: dataservice.getCategories(),
            marks: null,
            models: null,
            gears: null
        };
    }

    componentWillReceiveProps({ value }) {
        if (!value)
            return;
        const filters = this.createFilters(value);

        this.setFilters(filters);
        this.maybeLoadMarks(filters.category);
        this.maybeLoadModels(filters.category, filters.mark);
        this.maybeLoadGears(filters.category);
    }

    createFilters = (value) => {
        if (value.constructor !== AveragePriceFilters) {
            const filters = new AveragePriceFilters();
            filters.setCategory(value.category);
            filters.setMark(value.mark);
            filters.setModel(value.model);
            filters.setGear(value.gear);
            return filters;
        } else
            return value;
    }

    setFilters = (filters) => {
        this.setState({ filters: filters });
    }

    maybeLoadMarks = (category) => {
        if (this.state.filters.category !== category)
            this.loadMarks(category);
    }
    loadMarks = (category) => {
        const marks = dataservice.getMarks({ category: category });
        this.setState({ marks: marks });
    }

    maybeLoadModels = (category, mark) => {
        if (!category || !mark) {
            this.setState({ models: null });
            return;
        }

        if (this.state.filters.category !== category || this.state.filters.mark !== mark)
            this.loadModels(category, mark);
    }
    loadModels = (category ,mark) => {
        const models = dataservice.getModels({ category: category, mark: mark });
        this.setState({ models: models });
    }

    maybeLoadGears = (category) => {
        if (this.state.filters.category !== category)
            this.loadGears(category);
    }
    loadGears = (category) => {
        const gears = dataservice.getGears({ category: category });
        this.setState({ gears: gears });
    }

    onCategoryChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setCategory(value)
        });
        this.props.onChange(filters);
    }

    onMarkChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setMark(value)
        });
        this.props.onChange(filters);
    }

    onModelChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setModel(value)
        });
        this.props.onChange(filters);
    }

    onGearChange = (value) => {
        const filters = this.state.filters.copy();
        this.setState({
            filters: filters.setGear(value)
        });
        this.props.onChange(filters);
    }

    render() {
        const { categories, marks, models, gears, filters } = this.state;

        return (
            <div>
                <div style={{ float: 'left' }}>
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
                <div style={{ clear: 'both' }}></div>
            </div>
        );
    }
}

export default Filters;
///////////////////////////

class AveragePriceFilters {
    constructor() {
        this.category = null;
        this.mark = null;
        this.model = null;
        this.gear = null;
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