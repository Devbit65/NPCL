

import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class AreaChart extends Component {

    render(){
        const localPath = Platform.OS === 'ios' ? `${RNFS.MainBundlePath}`:"file:///android_asset"
        const baseUrl = Platform.OS === 'ios' ? "/highcharts":"file:///android_asset/"

        var BarChartHtml =    `<!DOCTYPE HTML>
                                    <html>
                                        <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                            <title>Highcharts Example</title>
                                    
                                            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
                                            <style type="text/css">
                                            </style>
                                            <script type="text/javascript">
                                                $(function () {
                                                    $('#container').highcharts({
                                                        colors: [
                                                            '${kThemeRedColor}',
                                                            '${kThemeBlueColor}',
                                                            
                                                          ],
                                                        chart: {
                                                            type: 'area',
                                                        },
                                                        subtitle: {
                                                            style: {
                                                                position: 'absolute',
                                                                right: '0px',
                                                                bottom: '10px'
                                                            }
                                                        },
                                                        legend: {
                                                            layout: 'vertical',
                                                            align: 'right',
                                                            verticalAlign: 'top',
                                                            x: 0,
                                                            y: 10,
                                                            floating: true,
                                                            borderWidth: 1,
                                                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                                                        },
                                                        xAxis: {
                                                            categories: ${JSON.stringify(this.props.chartData.Month)}
                                                        },
                                                        yAxis: {
                                                            title: {
                                                                text: '(${this.props.load_unit})'
                                                            },
                                                            labels: {
                                                                formatter: function () {
                                                                    return this.value;
                                                                }
                                                            },
                                                            min: 0
                                                        },
                                                        plotOptions: {
                                                            area: {
                                                                fillOpacity: 0.5
                                                            }
                                                        },
                                                        series: [   
                                                                    {name: 'DG',data: ${JSON.stringify(this.props.chartData.DG)}}, 
                                                                    {name: 'GRID',data: ${JSON.stringify(this.props.chartData.GRID)}},
                                                                ]
                                                    });
                                                });
                                            </script>
                                        </head>
                                        <body bgcolor='#EFEFF4'>

                                            <script  src="${localPath}/highcharts/highcharts.js"></script>
                                            <script  src="${localPath}/highcharts/highcharts-3d.js"></script>
                                            <script  src="${localPath}/highcharts/exporting.js"></script>
                                                        
                                            <div id="container" style="height:97%;width:97%;position:absolute;"></div>
                                        </body>
                                    </html>`
        return  <View style={{width:this.props.chartWidth, height:this.props.chartHeight}}>
                    <WebView 
                        style={{flex:1, backgroundColor:'#EFEFF4'}}
                        originWhitelist={["*"]} 
                        source={{html:BarChartHtml, baseUrl:baseUrl}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scrollEnabled={false}
                    /> 
                </View>
    }
}

export default AreaChart

