import React from 'react';

function App(): JSX.Element {
    const ss = 'text';
    return (
        <div>
            <h1>Sample text for header</h1>
            <p>Ugly paragraph</p>
            <p>{ss}</p>
        </div>
    );
}

export default App;
