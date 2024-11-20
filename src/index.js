import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Sample';
import '@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import GC from '@grapecity-software/spread-sheets';
import '@grapecity-software/spread-sheets-resources-zh';

GC.Spread.Common.CultureManager.culture("zh-cn");

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);
root.render(<App />);
