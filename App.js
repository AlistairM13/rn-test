import React, { useState, useReducer } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      selectionLimit: 30,
      allowsMultipleSelection: true,
      quality: 1,
    })
    if (!result.canceled) {
      setImages(result.assets)
    }
  };

  const changeImage = (state, action) => {
    if (action.type === "next") {
      if (state.currentImgIdx === images.length - 1) {
        return { currentImgIdx: 0 }
      }
      return { currentImgIdx: state.currentImgIdx + 1 }
    }
    else if (action.type === "prev") {
      if (state.currentImgIdx === 0) {
        return { currentImgIdx: images.length - 1 }
      }
      return { currentImgIdx: state.currentImgIdx - 1 }
    }
  }
  const [state, dispatch] = useReducer(changeImage, { currentImgIdx: 0 });

  const renderItem = ({ item, drag, isActive, getIndex }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          style={[styles.listItemContainer, { backgroundColor: isActive ? "gray" : "white" }]}
        >
          <Image style={{ flex: 1 }} source={{ uri: item.uri }} />
          <Text style={styles.listItemText}>{getIndex() + 1}</Text>
        </TouchableOpacity>
      </ScaleDecorator >
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {images.length > 0 && <Image source={{ uri: images[state.currentImgIdx].uri }} style={styles.image} />}

          {images.length > 0 && (<View style={styles.buttonContainer}>
            <Button onPress={() => dispatch({ type: "prev" })} title='Prev' />
            <Button onPress={() => dispatch({ type: "next" })} title='Next' />
          </View>)}
          {!(images.length > 0) && (
            <View style={{ alignSelf: "center" }}>
              <Button onPress={pickImage} title='Get images' />
            </View>
          )}
        </View>
        {images.length > 0 && <DraggableFlatList
          data={images}
          horizontal={true}
          onDragEnd={({ data }) => setImages(data)}
          keyExtractor={(item) => item.uri}
          renderItem={renderItem}
        />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray"
  },
  imageContainer: {
    flex: 10,
    justifyContent: 'center'
  },
  image: {
    resizeMode: "cover",
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    paddingHorizontal: 4,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between'
  },
  listItemContainer: {
    position: 'relative',
    flex: 1,
    height: 100,
    width: 100,
  },
  listItemText: {
    fontSize: 22,
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontWeight: "bold",
  }
})