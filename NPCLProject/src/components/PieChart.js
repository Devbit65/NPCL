

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { WebView } from 'react-native-webview';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PieChart extends Component {

    render(){
        var PieChartHtml = `<!DOCTYPE HTML>
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
                                                chart: {
                                                    type: 'pie',
                                                    margin: 0,
                                                    // options3d: {
                                                    //     enabled: true,
                                                    //     alpha: 45,
                                                    //     beta: 0
                                                    // },
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
                                                    pointFormat: '{series.name}: <b>{point.y:.2f} ${this.props.data.load_unit}</b>'
                                                },
                                                plotOptions: {
                                                    pie: {
                                                        colors: [
                                                            '${kThemeRedColor}',
                                                            '${kThemeBlueColor}',
                                                        ],
                                                        allowPointSelect: true,
                                                        cursor: 'pointer',
                                                        depth: 20,
                                                        dataLabels: {
                                                            enabled: false,
                                                        },
                                                        innerSize: '${this.props.chartWidth*1/3}',
                                                        showInLegend: true,
                                                    }
                                                },
                                                legend: {
                                                    shadow: true,
                                                    layout: 'vertical',
                                                    align: 'right',
                                                    verticalAlign: 'top',
                                                    floating: true,
                                                    borderWidth: 1,
                                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#EFEFF4'
                                                },
                                                series: [{
                                                    type: 'pie',
                                                    name: 'Power Usage',
                                                    data: [
                                                        ['DG',${this.props.data.daily_dg_unit}],
                                                        ['GRID', ${this.props.data.daily_grid_unit}]
                                                    ]
                                                }]
                                            });
                                        </script>
                                    </body>
                                </html>`
        return  <View style={{width:this.props.chartWidth, height:this.props.chartHeight}}>
                    <WebView 
                        style={{flex:1, backgroundColor:'#EFEFF4'}}
                        originWhitelist={["*"]} 
                        source={{html:PieChartHtml}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    /> 
                </View>
    }
}

export default PieChart

