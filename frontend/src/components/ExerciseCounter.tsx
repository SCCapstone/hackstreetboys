/*
    This file contains part of the functionality for the exercise tracker.
    All this file does is hold the functionality to take in and display the total exercise for the tracker
*/

import React from 'react';

const ExerciseCounter = ({total}: any) => {
    return (
        <div>
            <h2>
                Total Exercise Time: <span>{total} minutes</span>
            </h2>
        </div>
    );
}
export default ExerciseCounter;