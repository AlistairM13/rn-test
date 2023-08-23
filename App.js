import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
import ImagePickerPage from './screen/ImagePickerPage';
import UnityViewPage from './screen/UnityViewPage';
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='ImagePicker' component={ImagePickerPage} />
        <Stack.Screen name='UnityView' component={UnityViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
      <Button title='Unity' color="black" onPress={()=>navigation.navigate('UnityView')}/>
      <Button title='Screen' color="black"  onPress={() => navigation.navigate('ImagePicker')} />
    </View>
  )
}
