import React, { Component } from 'react';
import PriceStatisticByOneYear from './PriceStatisticByOneYear';

class PriceStatisticsByYears extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.maybeFetchStatistics(this.props.data);
    }

    componentWillReceiveProps(props) {
        this.maybeFetchStatistics(props.data);
    }

    maybeFetchStatistics(statistics) {
        if (statistics && statistics.then) {
            statistics.then(statisticsByYears => {
                this.setState({
                    statisticsByYears: statisticsByYears
                });
            });
        }
    }
    
    render() {
        if (!this.state.statisticsByYears)
            return <div>Loading...</div>;

        const years = [];
        for (const year in this.state.statisticsByYears) {
            if (!this.state.statisticsByYears.hasOwnProperty(year))
                continue;
            const stats = this.state.statisticsByYears[year];
            years.push(
                <PriceStatisticByOneYear key={year}
                    year={year} data={stats} />
            );
        }

        return (
            <div>
                {years}
            </div>
        );
    }
}

export default PriceStatisticsByYears;