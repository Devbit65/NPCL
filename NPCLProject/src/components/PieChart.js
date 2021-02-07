

import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

class PieChart extends Component {

    render(){
        const localPath = Platform.OS === 'ios' ? `${RNFS.MainBundlePath}`:"file:///android_asset"
        const baseUrl = Platform.OS === 'ios' ? "/highcharts":"file:///android_asset/"
        console.log("Chart height : ", this.props.chartHeight)
        var PieChartHtml =    `<!DOCTYPE HTML>
                                    <html>
                                        <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
                                                <style type="text/css">
                                                </style>
                                                <script type="text/javascript">
                                                    $(function () {
                                                        $('#container').highcharts({
                                                            chart: {
                                                                type: 'pie',
                                                                margin: 0,
                                                                options3d: {
                                                                    enabled: true,
                                                                    alpha: 45,
                                                                    beta: 0
                                                                }
                                                            },
                                                            tooltip: {
                                                                pointFormat: '{series.name}: <b>{point.y:.2f} ${this.props.data.load_unit}</b>'
                                                            },
                                                            plotOptions: {
                                                                pie: {
                                                                    size:'100%',
                                                                    allowPointSelect: true,
                                                                    cursor: 'pointer',
                                                                    depth: 50,
                                                                    dataLabels: {
                                                                        enabled: false,
                                                                    },
                                                                    showInLegend: true,
                                                                }
                                                            },
                                                            legend: {
                                                                layout: 'vertical',
                                                                align: 'right',
                                                                verticalAlign: 'bottom',
                                                                itemMarginTop: 10,
                                                                itemMarginBottom: 10,
                                                            },
                                                            series: [{
                                                                type: 'pie',
                                                                name: 'Power Usage',
                                                                data:  [
                                                                    ['DG',${this.props.data.daily_dg_unit}],
                                                                    ['GRID', ${this.props.data.daily_grid_unit}],
                                                                ]
                                                            }]
                                                        });
                                                    });
                                                </script>
                                        </head>
                                        <body bgcolor='#EFEFF4'>

                                            <script  src="${localPath}/highcharts/highcharts.js"></script>
                                            <script  src="${localPath}/highcharts/highcharts-3d.js"></script>
                                            <script  src="${localPath}/highcharts/exporting.js"></script>
                                                        
                                            <div id="container" style="height:100%;width:100%;position:absolute;"></div>
                                        </body>
                                    </html>`
        return  <View style={{width:this.props.chartWidth, height:this.props.chartHeight}}>
                    <WebView 
                        style={{flex:1, backgroundColor:'#EFEFF4'}}
                        originWhitelist={["*"]} 
                        source={{html:PieChartHtml, baseUrl:baseUrl}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scrollEnabled={false}
                    /> 
                </View>
    }
}

export default PieChart

