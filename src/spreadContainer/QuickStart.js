import React from 'react';
import { SpreadSheets, Worksheet, Column } from '@grapecity-software/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

function QuickStart(props) {
    const spreadBackColor = 'aliceblue';
    const sheetName = 'Person Address';
    const hostStyle = {
        top: '240px',
        bottom: '10px'
    };
    const autoGenerateColumns = false;
    const data = dataService.getPersonAddressData();

    return (
        <div className="componentContainer" style={props.style}>
            <h3>快速入门指南</h3>
            <div>
                按照以下步骤快速将 SpreadJS 应用到 React 的应用程序中：
                <div>
                    <p>1. 添加 SpreadJS 产品引用到 React 的应用程序中</p>
                    <p>2. 添加一个组件来提供数据和业务实现。</p>
                    <p>3. 绑定数据，并设置其他 SpreadJS 属性。</p>
                    <p>4. 添加一些 css 属性来定制外观。</p>
                </div>
            </div>
            <div className="spreadContainer" style={hostStyle}>
                <SpreadSheets backColor={spreadBackColor}>
                    <Worksheet name={sheetName} dataSource={data}
                        autoGenerateColumns={autoGenerateColumns}>
                        <Column width={150} dataField="Name" />
                        <Column width={150} dataField="CountryRegionCode" />
                        <Column width={100} dataField="City" />
                        <Column width={200} dataField="AddressLine" />
                        <Column width={100} dataField="PostalCode" />
                    </Worksheet>
                </SpreadSheets>
            </div>
        </div>

    );
}

export default QuickStart