import React from 'react';

const FavoriteFilters = ({ onChange }) => {
    return (
        <div style={{float: 'left'}}>
            <button onClick={() => onChange({ category: '1', mark: '29', model: '1258', gear: '2' })}>Hyundai Accent</button>
            <button onClick={() => onChange({ category: '1', mark: '24', model: '239', gear: '2' })}>Ford Fiesta</button>
            <button onClick={() => onChange({ category: '1', mark: '24', model: '240', gear: '2' })}>Ford Focus</button>
            <button onClick={() => onChange({ category: '1', mark: '28', model: '265', gear: '2' })}>Honda Civic</button>
        </div>
    );
};

export default FavoriteFilters;