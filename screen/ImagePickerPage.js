import React, { useState, useReducer } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ImagePickerPage() {
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
  const deleteImage = () => {
    const newImages = images.filter((image, index) => index !== state.currentImgIdx)
    dispatch({ type: "prev" })
    setImages(newImages)
  }

  const changeImage = (state, action) => {
    if (action.type === "next") {
      if (state.currentImgIdx === images.length - 1) {
        return { currentImgIdx: 0 }
      }
      return { currentImgIdx: state.currentImgIdx + 1 }
    }
    else if (action.type === "prev") {
      if (images.length == 0) {
        // Crashes when deleting items and end up with no items
        return { currentImgIdx: 0 }
      }
      if (state.currentImgIdx === 0) {
        return { currentImgIdx: images.length - 1 }
      }
      return { currentImgIdx: state.currentImgIdx - 1 }
    } else if (action.type === "select") {
      return { currentImgIdx: action.idx }
    }
  }

  const [state, dispatch] = useReducer(changeImage, { currentImgIdx: 0 });

  const renderItem = ({ item, drag, isActive, getIndex }) => {
    const idx = getIndex()
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          onPress={() => dispatch({ type: "select", idx: idx })}
          style={[styles.listItemContainer, { marginRight: 4, backgroundColor: isActive ? "gray" : "white" }]}
        >
          <Image style={{ flex: 1 }} source={{ uri: item.uri }} />
          <Text style={styles.listItemText}>{idx + 1}</Text>
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
        {images.length > 0 &&
          <View style={{ flex: 3, padding: 4, backgroundColor: "black" }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name='add-circle-outline' size={42} color={"white"} onPress={pickImage} />
              <Text style={styles.textContainer}>{`Image${state.currentImgIdx + 1}`}</Text>
              <Ionicons name='trash-outline' size={42} color={"white"} onPress={deleteImage} />
            </View>
            <DraggableFlatList
              data={images}
              horizontal={true}
              onDragEnd={({ data }) => setImages(data)}
              keyExtractor={(item) => item.uri}
              renderItem={renderItem}
            />
          </View>
        }
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
    height: 120,
    width: 100,
  },
  listItemText: {
    fontSize: 22,
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 6,
    alignSelf: 'center',
    marginHorizontal: 8
  }
})