import React from 'react';
import { Chart } from 'react-google-charts';

const PriceChart = (props) => {
    if (!props.data.length)
        return <div>Нет данных</div>;

    const rows = props.data.map(toChartRow);
    const columns = [
        { type: 'string', label: 'Год' },
        { type: 'number', label: 'Среднее арифметическое' },
        { type: 'number', label: 'Второй-третий квартиль' }
    ];
    const options = {
        legend: true,
        hAxis: { title: 'Год' },
        vAxis: { title: 'Стоимость, $' },
        seriesType: 'line'
    };

    return (
        <div>
            <Chart
                chartType='ComboChart'
                rows={rows}
                columns={columns}
                options={options}
                width='100%'
                height='300px'
                legend_toggle />
        </div>
    );
}

export default PriceChart;
///////////////////////////

function toChartRow(stats) {
    return [
        stats.year.toString(),
        stats.data.arithmeticMean,
        stats.data.interQuartileMean || stats.data.arithmeticMean
    ];
}