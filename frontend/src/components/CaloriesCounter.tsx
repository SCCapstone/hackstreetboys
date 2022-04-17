/*
    This file contains part of the functionality for the calorie tracker.
    All this file does is hold the functionality to take in and display the total calories for the tracker
*/

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