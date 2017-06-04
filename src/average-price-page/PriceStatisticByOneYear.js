import React from 'react';

function PriceStatisticByOneYear({ year, data }) {
    return (
        <div>
            <h3>{year}</h3>
            <span>
                <span>Всего авто:</span> {data.total}
                <br />
                <span>Среднее арифметическое:</span> ${(data.arithmeticMean || 0).toFixed(0)}
                <br />
                <span>Второй-третий квартиль:</span> ${(data.interQuartileMean || 0).toFixed(0)}
            </span>
        </div>
    );
}

export default PriceStatisticByOneYear;