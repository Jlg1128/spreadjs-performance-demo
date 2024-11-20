import React, {useState} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity-software/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

function SpreadSheetsCon(props) {
    const [spreadSheetSetting, setSpreadSheetSetting] = useState({
        newTabVisible: true,
        tabStripVisible: true,
        tabStripRatio: true,
        tabNavigationVisible: true,
        scrollbarShowMax: true,
        scrollbarMaxAlign: true,
        showHorizontalScrollbar: true,
        showVerticalScrollbar:true,
        allowUserZoom : true,
        allowUserResize : true,
        spreadBackColor: '#FFFFFF',
        grayAreaBackColor: '#E4E4E4',
    });
    const hostStyle = {
        top: '90px',
        bottom: '180px'
    };
    const autoGenerateColumns = false;
    const data = dataService.getPersonAddressData();

    const propChangeHandler = (prop, value) => {
        setSpreadSheetSetting({
            ...spreadSheetSetting,
            [prop]: value,
        });
    };

    return (
        <div className="componentContainer" style={props.style}>
            <h3>GC-Spread-Sheets</h3>
            <div>
                <p>以下示例展示如何绑定 Workbook 上的属性。</p>
            </div>
            <div className="spreadContainer" style={hostStyle}>
                <SpreadSheets newTabVisible={spreadSheetSetting.newTabVisible}
                                tabStripVisible={spreadSheetSetting.tabStripVisible}
                                tabStripRatio={spreadSheetSetting.tabStripRatio}
                                tabNavigationVisible={spreadSheetSetting.tabNavigationVisible}
                                scrollbarMaxAlign={spreadSheetSetting.scrollbarMaxAlign}
                                scrollbarShowMax={spreadSheetSetting.scrollbarShowMax}
                                showHorizontalScrollbar={spreadSheetSetting.showHorizontalScrollbar}
                                showVerticalScrollbar={spreadSheetSetting.showVerticalScrollbar}
                                backColor={spreadSheetSetting.spreadBackColor} grayAreaBackColor={spreadSheetSetting.grayAreaBackColor}
                                allowUserZoom={spreadSheetSetting.allowUserZoom} allowUserResize={spreadSheetSetting.allowUserResize}>
                    <Worksheet dataSource={data}
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
                            <label><input type="checkbox" checked={spreadSheetSetting.newTabVisible} onChange={(e)=>{propChangeHandler('newTabVisible',e.target.checked)}}/>显示 new 标签页</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.tabStripVisible} onChange={(e)=>{propChangeHandler('tabStripVisible',e.target.checked)}}/>显示标签页</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.tabStripRatio} onChange={e => {propChangeHandler('tabStripRatio', e.target.checked)}}/>水平滚动条宽度比率</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.tabNavigationVisible} onChange={e => {propChangeHandler('tabNavigationVisible', e.target.checked)}}/>显示或隐藏表单标签导航项</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.scrollbarShowMax} onChange={e => {propChangeHandler('scrollbarShowMax', e.target.checked)}}/>基于表单全部的行列总数显示滚动条</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.scrollbarMaxAlign} onChange={e => {propChangeHandler('scrollbarMaxAlign', e.target.checked)}}/>滚动条对齐视图中表单的最后一行或一列</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.showHorizontalScrollbar} onChange={(e)=>{propChangeHandler('showHorizontalScrollbar',e.target.checked)}}/>显示横向滚动条</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.showVerticalScrollbar} onChange={(e)=>{propChangeHandler('showVerticalScrollbar',e.target.checked)}}/>显示竖向滚动条</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.allowUserZoom} onChange={(e)=>{propChangeHandler('allowUserZoom',e.target.checked)}}/>允许用户缩放</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={spreadSheetSetting.allowUserResize} onChange={(e)=>{propChangeHandler('allowUserResize',e.target.checked)}}/>允许用户改变行列宽高</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input value={spreadSheetSetting.grayAreaBackColor} type="color" onChange={(e)=>{propChangeHandler('grayAreaBackColor',e.target.value)}}/> 灰色区域背景色
                        </td>
                        <td>
                            <input value={spreadSheetSetting.spreadBackColor} type="color" onChange={(e)=>{propChangeHandler('spreadBackColor',e.target.value)}}/> 背景色
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default SpreadSheetsCon