import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronsaga from 'reactotron-redux-saga';

if(__DEV__){
  const tron = Reactotron
  .configure({host: '192.168.1.106'})
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronsaga())
  .connect();

  tron.clear();

  console.tron = tron;
}
