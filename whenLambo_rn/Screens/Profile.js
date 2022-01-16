import React from 'react';
import {View, Text} from 'react-native';
import {MainLayout} from './index';
import {FONTS, COLORS, SIZES} from '../Constants/index';

const Profile = () => {
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        <Text
          style={{
            marginTop: 60,
            marginLeft: 10,
            ...FONTS.h2,
            color: COLORS.lightGray3,
          }}>
          Profile
        </Text>
      </View>
    </MainLayout>
  );
};

export default Profile;
