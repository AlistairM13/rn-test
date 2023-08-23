import React, { useRef } from 'react';

import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';

const UnityViewPage = () => {
    const unityRef = useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <UnityView
                ref={unityRef}
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    top: 1,
                    bottom: 1
                }}
            />
        </View>
    );
};

export default UnityViewPage;