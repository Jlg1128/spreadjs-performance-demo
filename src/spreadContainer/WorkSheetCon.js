import React, { useState, useMemo, useRef, useEffect } from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity-software/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

function getRandomChinese(len = 8) {
    let result = '';
    for (let i = 0; i < len; i++) {
        // 随机生成一个汉字的 Unicode 编码范围
        const code = Math.floor(Math.random() * (0x9FA5 - 0x4E00 + 1)) + 0x4E00;
        result += String.fromCharCode(code);
    }
    return result;
}

function WorkSheetCon(props) {
    const hostStyle = {
        top: '90px',
        bottom: '0'
    };
    const autoGenerateColumns = false;
    const data = dataService.getPersonAddressData();
    const [allowCellOverflow, setAllowCellOverflow] = useState(false);

    const [_spread, setSpread] = useState({});
    const ref = useRef();

    function workbookInit(spread) {
        setSpread(spread)
        const sheet = spread.getActiveSheet();
        sheet.defaults.rowHeight = 40;
        sheet.defaults.colWidth = 100;
        sheet.options.allowCellOverflow = allowCellOverflow;
        window.workbook = _spread;
        window.sheet = sheet;
        addData(sheet);
    }

    const [workSheetSetting, setWorkSheetSetting] = useState({
        rowHeaderVisible: true,
        columnHeaderVisible: true,
        frozenRowCount: 3,
        frozenColumnCount: 2,
        frozenTrailingRowCount: 0,
        frozenTrailingColumnCount: 0,
        sheetTabColor: '#61E6E6',
        frozenlineColor: '#000000',
        selectionBackColor: '#D0D0D0',
        selectionBorderColor: '#217346',
    });

    const propChangeHandler = (prop, value) => {
        setWorkSheetSetting({
            ...workSheetSetting,
            [prop]: value,
        });
    }

    // let a = useMemo(() => {
    //     return Array.from({length: 1000}).map(() => <Column width={100}/>)
    // }, [])
    let a = [];


    const addData = (sheet) => {

        sheet.addColumns(0, 10000);
        sheet.addRows(0, 100);
        const data = [
        ]
        // setTimeout(() => {
        //     sheet.tables.add("Table1", 1, 1, 100, 10000);
        // }, 1000);
        setTimeout(() => {
            Array.from({length: 1000}).forEach((item, index) => {
                data[index] = Array.from({length: 1000}).map((item, index) => getRandomChinese());
            })
            sheet.setArray(1, 1, data);
        }, 1000);
        // console.log(_spread);
    }
    useEffect(() => {
        let last = Date.now();
        let ticks = 0;
        //循环调用 requestAnimationFrame
        function rafLoop(timestamp) {
            ticks += 1;
            //每30帧统计一次帧率
            if (ticks >= 30) {
                const now = Date.now();
                const diff = now - last
                const fps = Math.round(1000 / (diff / ticks));
                last = now
                ticks = 0
                renderFps(fps);// 刷新帧率数值
            }
            requestAnimationFrame(rafLoop);
        }
         
        let fpsEl = ref.current;
        //显示帧率数值到界面上
        function renderFps(fps) {
            fpsEl.textContent = fps;
        }
         
        //开始执行
        rafLoop();
    }, []);

    useEffect(() => {
        if (_spread && _spread.getActiveSheet) {
            _spread.getActiveSheet().options.allowCellOverflow = allowCellOverflow;
        }
    }, [allowCellOverflow]);

    return (
        <div className="componentContainer" style={props.style}>
            {/* <button onClick={() => addData()}>点击添加数据</button> */}
            <button onClick={() => setAllowCellOverflow(!allowCellOverflow)}>点击切换allow overflow</button>
            <span>当前是否允许allowCellOverflow：{allowCellOverflow.toString()}</span>
            <h3>帧率：<span ref={ref}></span></h3>
            <div>
                <p>以下示例展示如何使用表单上的属性。</p>
            </div>
            <div className="spreadContainer" style={hostStyle}>
                <SpreadSheets workbookInitialized={workbookInit}>
                    <Worksheet rowCount={workSheetSetting.rowCount} colCount={workSheetSetting.colCount}
                                frozenRowCount={workSheetSetting.frozenRowCount}
                                frozenColumnCount={workSheetSetting.frozenColumnCount}
                                rowHeaderVisible={workSheetSetting.rowHeaderVisible}
                                columnHeaderVisible={workSheetSetting.columnHeaderVisible}
                                frozenTrailingRowCount={workSheetSetting.frozenTrailingRowCount}
                                frozenTrailingColumnCount={workSheetSetting.frozenTrailingColumnCount}
                                sheetTabColor={workSheetSetting.sheetTabColor} frozenlineColor={workSheetSetting.frozenlineColor}
                                selectionBackColor={workSheetSetting.selectionBackColor}
                                selectionBorderColor={workSheetSetting.selectionBorderColor}
                                dataSource={data} autoGenerateColumns={autoGenerateColumns}>
                        <Column width={150} dataField="Name"/>
                        <Column width={150} dataField="CountryRegionCode"/>
                        <Column width={100} dataField="City"/>
                        <Column width={200} dataField="AddressLine"/>
                        <Column width={100} dataField="PostalCode"/>
                        {a}
                    </Worksheet>
                </SpreadSheets>
            </div>
            <div className="settingContainer">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label><input type="checkbox" checked={workSheetSetting.rowHeaderVisible} onChange={(e) => {propChangeHandler('rowHeaderVisible', e.target.checked)}}/>显示行头</label>
                        </td>
                        <td>
                            <label><input type="checkbox" checked={workSheetSetting.columnHeaderVisible} onChange={(e) => {propChangeHandler('columnHeaderVisible', e.target.checked)}}/>显示列头</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="text" value={workSheetSetting.frozenRowCount} onChange={(e) => {propChangeHandler('frozenRowCount', e.target.value)}}/>行数</label>
                        </td>
                        <td>
                            <label><input type="text" value={workSheetSetting.frozenColumnCount} onChange={(e) => {propChangeHandler('frozenColumnCount', e.target.value)}}/>列数</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label><input type="text" value={workSheetSetting.frozenTrailingRowCount} onChange={(e) => {propChangeHandler('frozenTrailingRowCount', e.target.value)}}/>冻结行数</label>
                        </td>
                        <td>
                            <label><input type="text" value={workSheetSetting.frozenTrailingColumnCount} onChange={(e) => {propChangeHandler('frozenTrailingColumnCount', e.target.value)}}/>冻结列数</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input value={workSheetSetting.sheetTabColor} type="color" onChange={(e) => {propChangeHandler('sheetTabColor', e.target.value)}}/> 标签色
                        </td>
                        <td>
                            <input value={workSheetSetting.frozenlineColor} type="color" onChange={(e) => {propChangeHandler('frozenlineColor', e.target.value)}}/> 冻结线色
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input value={workSheetSetting.selectionBackColor} type="color" onChange={(e) => {propChangeHandler('selectionBackColor', e.target.value)}}/> 选择背景色
                        </td>
                        <td>
                            <input value={workSheetSetting.selectionBorderColor} type="color" onChange={(e) => {propChangeHandler('selectionBorderColor', e.target.value)}}/> 选择边框色
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default WorkSheetCon