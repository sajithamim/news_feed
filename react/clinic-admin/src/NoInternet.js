import React from 'react';
import { Result, Button } from 'antd';

function NoInternet() {
    return(
        <Result
            status="warning"
            title="There are some problems with your Network Connection."
            
        />
    );
}

export default NoInternet;
