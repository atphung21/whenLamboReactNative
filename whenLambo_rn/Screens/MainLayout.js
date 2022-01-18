import React from 'react';
import {View, Text, Animated} from 'react-native';
import {COLORS, SIZES, icons} from '../Constants/index';
import {IconTextButton, Form} from '../Components/index';
import {connect} from 'react-redux';

const MainLayout = ({children, isTradeModalVisible}) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [715, SIZES.height - 305],
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Form/>
      {children}
      {/* Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}

      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          top: modalY,
          left: 0,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          label="Purchase"
          icon={icons.send}
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          label="Sell"
          icon={icons.withdraw}
          onPress={() => console.log('Withdraw')}
          containerStyle={{
            marginTop: 15,
          }}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
