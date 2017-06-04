import React, { Component } from 'react';
import PriceChart from './PriceChart';
import TotalChart from './TotalChart';

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

        return (
            <div>
                <PriceChart data={this.state.statisticsByYears} />
                <TotalChart data={this.state.statisticsByYears} />
            </div>
        );
    }
}

export default PriceStatisticsByYears;