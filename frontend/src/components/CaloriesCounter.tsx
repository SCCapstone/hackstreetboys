import React from 'react';

const CaloriesCounter = ({total}: any) => {
    return (
        <div>
            <h2>
                Total Calories: <span>{total}</span>
            </h2>
        </div>
    );
}
export default CaloriesCounter;