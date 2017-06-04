import React from 'react';
import { Chart } from 'react-google-charts';

const TotalChart = (props) => {
    if (!props.data.length)
        return <div>Нет данных</div>;
        
    const rows = props.data.map(x => [
        x.year.toString(), x.data.total
    ]);
    const columns = [
        { type: 'string', label: 'Год' },
        { type: 'number', label: 'Объявления' },
    ];
    const options = {
        legend: 'none',
        hAxis: { title: 'Год' },
        vAxis: { title: 'Объявления' },
        seriesType: 'bars'
    };

    return (
        <Chart
            chartType='ComboChart'
            rows={rows}
            columns={columns}
            options={options}
            width='100%'
            height='300px'
            legend_toggle />
    );
}

export default TotalChart;