import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    borderBottomWidth: 2.5,
    borderBottomColor: 'red',
    fontSize : 25,
    fontWeight : 'bold'
  },
  item: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});
