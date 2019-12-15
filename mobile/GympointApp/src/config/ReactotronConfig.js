import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronsaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';


if(__DEV__){
  const tron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({host: '192.168.1.106'})
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronsaga())
  .connect();

  tron.clear();

  console.tron = tron;
}
