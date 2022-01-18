import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {FONTS, SIZES, COLORS} from '../Constants/index';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// const Form = () => {
//   return (
//     <View>
//       <Text
//         style={{
//           color: 'white',
//         }}>Form</Text>
//     </View>
//   )
// }


const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];

class Form extends Component {

  state = {
    selectedItems : []
  };


  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={{
        marginTop: 50,
        flex: 1,
        padding: 20,
        }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Search Cryptos..."
          searchInputPlaceholderText="Search Cryptos..."
          onChangeInput={ (text)=> console.log(text)}
          itemFontFamily= 'Arial'
          altFontFamily="Arial"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          single='True'
          styleTextDropdown={{
            fontFamily: 'Arial',
            fontSize: SIZES.h2,
            paddingLeft: 15
          }}
          searchInputStyle={{
            marginTop: 5,
            fontFamily: 'Arial',
            fontSize: SIZES.h2,
            height: 50
          }}
          styleDropdownMenu={{
            height: 50,
            marginTop: 5,
          }}
          styleDropdownMenuSubsection={{
            fontFamily: 'Arial',
            fontSize: SIZES.h2
          }}
          styleTextDropdownSelected={{
            fontFamily: 'Arial',
            fontSize: SIZES.h2
          }}
        />
        <View>

        </View>
      </View>
    );
  }
}


export default Form;