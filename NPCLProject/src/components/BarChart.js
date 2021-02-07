

import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class BarChart extends Component {

    render(){
        const localPath = Platform.OS === 'ios' ? `${RNFS.MainBundlePath}`:"file:///android_asset"
        const baseUrl = Platform.OS === 'ios' ? "/highcharts":"file:///android_asset/"

        console.log("load_unit ",this.props.load_unit)
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
                                                            colors: [
                                                                '${kThemeBlueColor}',
                                                                '${kThemeRedColor}',
                                                                
                                                              ],
                                                            chart: {
                                                                type: 'column'
                                                            },
                                                            xAxis: {
                                                                categories: [${this.props.chartData.Month}],
                                                                title: {
                                                                    text: null
                                                                }
                                                            },
                                                            yAxis: {
                                                                min: 0,
                                                                title: {
                                                                    text: '(${this.props.load_unit})',
                                                                    align: 'high'
                                                                },
                                                                labels: {
                                                                    overflow: 'justify'
                                                                }
                                                            },
                                                            tooltip: {
                                                                valueSuffix: ' ${this.props.load_unit}'
                                                            },
                                                            plotOptions: {
                                                                bar: {
                                                                    dataLabels: {
                                                                        enabled: true
                                                                    }
                                                                }
                                                            },
                                                            legend: {
                                                                layout: 'vertical',
                                                                align: 'right',
                                                                verticalAlign: 'top',
                                                                x: -40,
                                                                y: 100,
                                                                floating: true,
                                                                borderWidth: 1,
                                                                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#EFEFF4'),
                                                                shadow: true
                                                            },
                                                            credits: {
                                                                enabled: false
                                                            },
                                                            series: [{name: 'GRID',data: [${this.props.chartData.GRID}]},
                                                                    {name: 'DG',data: [${this.props.chartData.DG}]},
                                                            ]
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

export default BarChart

