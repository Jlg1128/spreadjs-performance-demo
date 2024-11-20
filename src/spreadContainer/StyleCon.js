import React from 'react';
import GC from '@grapecity-software/spread-sheets'
import {SpreadSheets, Worksheet, Column} from '@grapecity-software/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

function StyleCon(props) {
    const hostStyle = {
        top: '90px',
        bottom: '0px'
    };
    const checkBoxCellType = new GC.Spread.Sheets.CellTypes.CheckBox();
    const hyperLinkCellType = new GC.Spread.Sheets.CellTypes.HyperLink();
    const comboBoxCellType = new GC.Spread.Sheets.CellTypes.ComboBox();
    const style = new GC.Spread.Sheets.Style();
    style.backColor = 'lightgray';
    comboBoxCellType.items([
        {text: 'US', value: 'US'},
        {text: 'UK', value: 'UK'},
        {text: 'Germany', value: 'Germany'},
        {text: 'Maxico', value: 'Maxico'}]);
    const autoGenerateColumns = false;
    const data = dataService.getEmployeesData();

    return (
        <div className="componentContainer" style={props.style}>
            <h3>样式</h3>
            <div>
                <p>以下示例展示如何使用样式。</p>
            </div>
            <div className="spreadContainer" style={hostStyle}>
                <SpreadSheets>
                    <Worksheet dataSource = {data} autoGenerateColumns={autoGenerateColumns}>
                        <Column dataField="name" width={150} style={style}/>
                        <Column dataField="phone" width={150}/>
                        <Column dataField="country" width={100} cellType = {comboBoxCellType}/>
                        <Column dataField="email" width={240} cellType = {hyperLinkCellType}/>
                        <Column dataField="onJob" width={100} cellType = {checkBoxCellType}/>
                    </Worksheet>
                </SpreadSheets>
            </div>
        </div>

    );
}

export default StyleCon