import React from 'react';
import './NavBar.css'

function NavBar(props) {
    const itemsDesc = ['快速入门指南','GC-Spread-Sheets','GC-Worksheet','GC-Column','数据绑定','样式','分组'];
    const items = itemsDesc.map((data, index) => {
        return (
            <li key={index}>
                <div className="navItem"
                    style={{ color: props.activeIndex === index ? '#039be5' : '#607D8B' }}
                    onClick={() => { props.changeActiveIndex(index) }}>
                    {data}
                </div>
            </li>
        );
    });

    return (
        <div className="navigationBar">
            <h2>SpreadJS</h2>
            <nav>
                <ul>
                    {items}
                </ul>
            </nav>
        </div>
    );
}

export default NavBar