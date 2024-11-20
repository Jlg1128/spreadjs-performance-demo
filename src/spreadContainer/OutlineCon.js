import React, {useState} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity-software/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

function OutlineCon(props) {
    const [outlineOption, setOutlineOption] = useState({
        showRowOutline: true,
        showColumnOutline: true
    });
    const hostStyle = {
        top: '90px',
        bottom: '35px'
    };
    const rowOutlineInfo = [{index: 1, count: 4}, {index: 6, count: 4}];
    const columnOutlineInfo = [{index: 0, count: 4}];
    const autoGenerateColumns = false;
    const data = dataService.getPersonAddressData();

    const propChangeHandler = (prop, value) => {
        setOutlineOption({
            ...outlineOption,
            [prop]: value,
        });
    };

    return (
        <div className="componentContainer" style={props.style}>
            <h3>分组</h3>
            <div>
                <p>以下示例展示如何使用分组。</p>
            </div>
            <div className="spreadContainer" style={hostStyle}>
                <SpreadSheets>
                    <Worksheet
                        showRowOutline = {outlineOption.showRowOutline}
                        showColumnOutline = {outlineOption.showColumnOutline}
                        rowOutlineInfo = {rowOutlineInfo}
                        columnOutlineInfo = {columnOutlineInfo}
                        dataSource={data}
                        autoGenerateColumns={autoGenerateColumns}>
                        <Column width={150} dataField="Name"/>
                        <Column width={150} dataField="CountryRegionCode"/>
                        <Column width={100} dataField="City"/>
                        <Column width={200} dataField="AddressLine"/>
                        <Column width={100} dataField="PostalCode"/>
                    </Worksheet>
                </SpreadSheets>
            </div>
            <div className="settingContainer">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={outlineOption.showRowOutline} onChange={(e) => {propChangeHandler('showRowOutline', e.target.checked)}}/>显示行分组</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={outlineOption.showColumnOutline} onChange={(e) => {propChangeHandler('showColumnOutline', e.target.checked)}}/>显示列分组</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default OutlineCon