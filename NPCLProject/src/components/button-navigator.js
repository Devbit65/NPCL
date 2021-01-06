import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon} from 'react-native-elements'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class BottomNavigator extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#134571'

            }}>
                <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#134571', width: 70, height: 70, borderRadius: 70,}}>
                    <Icon
                        name='add'
                        type='material'
                        color={ kThemeRedColor }
                        containerStyle={{ alignSelf: 'center' }}
                        reverse
                        size={28}
                        onPress={() => {}}
                    />
                </View>

            </View>
        );
    }
}

export default BottomNavigator;