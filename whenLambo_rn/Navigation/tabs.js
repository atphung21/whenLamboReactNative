import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Portfolio, Market, Profile } from '../Screens/index';
import { COLORS, icons } from '../Constants/index';
import { TabIcon, TabBarCustomButton } from '../Components/index';
import { connect } from 'react-redux';
import { setTradeModalVisibility } from '../Stores/Tabs/tabActions';

const Tab = createBottomTabNavigator();

const Tabs = ({ setTradeModalVisibility, isTradeModalVisible }) => {
  function tradeButtonClickHandler() {
    setTradeModalVisibility(!isTradeModalVisible);
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: 'transparent',
          height: 140,
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} label="Home" icon={icons.home} />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  label="Portfolio"
                  icon={icons.briefcase}
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                label="Trade"
                isMiddle={true}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={ isTradeModalVisible ? {
                  width: 15,
                  height: 15
                } : null }
              />
            );
          },
          tabBarButton: (props) => {
            return (
              <TabBarCustomButton
                {...props}
                onPress={() => tradeButtonClickHandler()}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} label="Market" icon={icons.market} />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  label="Profile"
                  icon={icons.profile}
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          }
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTradeModalVisibility: (isVisible) => {
      return dispatch(setTradeModalVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
