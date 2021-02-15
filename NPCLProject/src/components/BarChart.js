

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { WebView } from 'react-native-webview';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class BarChart extends Component {

    render(){
        var BarChartHtml =  `<!DOCTYPE HTML>
                                <html>
                                    <head>
                                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1">
                                        <title>Xenius Charts</title>

                                        <style type="text/css">
                                            #container {
                                                height: 100vh; 
                                                margin: 0 auto;
                                            }

                                        </style>
                                    </head>
                                    
                                    <body bgcolor='#EFEFF4'>
                                        <script src="https://code.highcharts.com/highcharts.js"></script>
                                        <script src="https://code.highcharts.com/highcharts-3d.js"></script>
                                        
                                        <div id="container" style="height: 100vh; margin: 0 auto"></div>
                                        
                                        <script type="text/javascript">
                                            Highcharts.chart('container', {
                                                colors: [
                                                    '${kThemeBlueColor}',
                                                    '${kThemeRedColor}',
                                                ],
                                                chart: {
                                                    type: 'column',
                                                    backgroundColor:'#EFEFF4'
                                                },
                                                title: {
                                                    text: null
                                                },
                                                credits: {
                                                    enabled: false
                                                },
                                                accessibility: {
                                                    point: {
                                                        valueSuffix: '%'
                                                    }
                                                },
                                                tooltip: {
                                                    pointFormat: '{series.name}: <b>{point.y:.1f} ${this.props.load_unit}</b>'
                                                },
                                                plotOptions: {
                                                    bar: {
                                                        dataLabels: {
                                                            enabled: true
                                                        }
                                                    }
                                                },
                                                xAxis: {
                                                    categories: ${JSON.stringify(this.props.chartData.Month)},
                                                    title: {
                                                        text: null,
                                                    },
                                                    labels: {
                                                    },
                                                },
                                                yAxis: {
                                                    title: {
                                                        text: '(${this.props.load_unit})',
                                                    },
                                                    labels: {
                                                        formatter: function () {
                                                            return this.value;
                                                        },
                                                    },
                                                    min: 0
                                                },
                                                legend: {
                                                    shadow: true,
                                                    borderWidth: 1,
                                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#EFEFF4'
                                                },
                                                series: [
                                                    {name: 'GRID',data: [${this.props.chartData.GRID}]},
                                                    {name: 'DG',data: [${this.props.chartData.DG}]},
                                                ]
                                            });
                                        </script>
                                    </body>
                                </html>`
        return  <View style={{width:this.props.chartWidth, height:this.props.chartHeight}}>
                    <WebView 
                        style={{flex:1, backgroundColor:'#EFEFF4'}}
                        originWhitelist={["*"]} 
                        source={{html:BarChartHtml}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    /> 
                </View>
    }
}

export default BarChart

