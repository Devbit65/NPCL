

import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PieChart extends Component {

    render(){
        const localPath = Platform.OS === 'ios' ? `${RNFS.MainBundlePath}`:"file:///android_asset"
        const baseUrl = Platform.OS === 'ios' ? "/highcharts":"file:///android_asset/"
        var PieChartHtml =    `<!DOCTYPE HTML>
                                    <html>
                                        <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
                                                <style type="text/css">
                                                    .highcharts-tooltip span {
                                                        height:100px !important;
                                                    }

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
                                                                shared: true,
                                                                useHTML: true,
                                                                headerFormat: '<span style="font-size: 40px;">{point.key}</span><br/>',
                                                                pointFormat: '<span style="font-size: 40px">{series.name}:  <b>{point.y:.1f} ${this.props.data.load_unit}</b></span>',
                                                            },
                                                            plotOptions: {
                                                                pie: {
                                                                    colors: [
                                                                        '${kThemeRedColor}',
                                                                        '${kThemeBlueColor}',
                                                                      ],
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
                                                                shadow: true,
                                                                symbolHeight: 40,
                                                                symbolWidth: 40,
                                                                itemStyle: {
                                                                    fontSize:'40px',
                                                                 },

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
                                                        
                                            <div id="container" style="height: 100vh; margin: 0 auto"></div>
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

