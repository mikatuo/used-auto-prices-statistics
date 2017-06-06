import React, { Component } from 'react';
import Filters from './Filters';
import FavoriteFilters from './FavoriteFilters';
import PriceStatisticsByYears from './PriceStatisticsByYears';
import dataservice from '../data/dataservice';

class AveragePricePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null,
            priceStatisticsByYears: null
        };
    }

    onFiltersChange = (filters) => {
        this.setState({ filters: filters });
        this.maybeFetchData(filters);
    }

    maybeFetchData = (filters) => {
        if (isValid(filters))
            this.setState({
                priceStatisticsByYears: dataservice.getPriceStatisticsByYears(filters)
            });
    }

    render() {
        const { priceStatisticsByYears } = this.state;

        return (
            <div>
                <FavoriteFilters onChange={this.onFiltersChange} />

                <Filters onChange={this.onFiltersChange} value={this.state.filters} />
                
                <br />
                <br />
                {priceStatisticsByYears && <PriceStatisticsByYears data={priceStatisticsByYears} />}
            </div>
        );
    }
}

export default AveragePricePage;
//////////////////////////////////

function isValid(filters) {
    return filters.category && filters.mark && filters.model
        && (filters.gear || hasNoGear(filters.category));
}

function hasNoGear(category) {
    return ['3', '5', '8', '9'].indexOf(category) !== -1;
}