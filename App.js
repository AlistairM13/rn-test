import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet } from 'react-native';
import ImagePickerPage from './screen/ImagePickerPage';
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='ImagePicker' component={ImagePickerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
      <Button title='Unity' />
      <Button title='Screen' onPress={() => navigation.navigate('ImagePicker')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})