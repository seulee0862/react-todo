import React from 'react';


const Template = ({children}) => {
    return (
        <div className= "Template">
            <div className="title">오늘 할 일 (0)</div>
            <div>{children}</div>
        </div>
    );
};

export default Template;