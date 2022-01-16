import React from 'react';
import { View, Text, Image } from 'react-native';
import { SIZES, COLORS, FONTS, icons } from '../Constants/index';

const BalanceInfo = ({ title, changePer, displayAmount, containerStyle }) => {
  return (
    <View
      title={title}
      changePer={changePer}
      displayAmount={displayAmount}
      style={{
        ...containerStyle,
      }}
    >
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.lightGray3,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.lightGray3,
            marginRight: 2,
          }}
        >
          $
        </Text>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.white,
          }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray3,
          }}
        >
          {' '}
          USD
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {changePer != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePer >= 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePer > 0 ? [{ rotate: '45deg' }] : [{ rotate: '145deg' }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignItems: 'flex-end',
            ...FONTS.h4,
            color: changePer > 0 ? COLORS.lightGreen : COLORS.red,
          }}
        >
          {changePer.toLocaleString()}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            ...FONTS.h5,
            color: COLORS.lightGray3,
          }}
        >
          7d Change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
