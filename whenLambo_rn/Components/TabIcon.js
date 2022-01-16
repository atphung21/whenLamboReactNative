import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS, FONTS } from '../Constants/theme';

const TabIcon = ({ isMiddle, label, focused, iconStyle, icon }) => {
  if (isMiddle) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: COLORS.white,
            ...iconStyle
          }}

        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
