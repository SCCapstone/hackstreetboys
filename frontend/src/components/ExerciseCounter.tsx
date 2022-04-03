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