import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-top: 10px;
  background: #fff;
  border-radius: 4px;
  height: 150px;
  padding: 20px;
  border: 1px solid #ddd;
`;

export const TitleRow = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
`;

export const AnswerRow = styled.View`
  flex-direction: row;
`;

export const AnswerText = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
`;

export const TimeRow = styled.Text`
  color: #666666;
  font-size: 14px;
`;

export const Content = styled.View`
  flex: 1;
  height: 78px;
  margin-top: 15px;
`;

export const TextRow = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666666;
  font-size: 14px;
  line-height: 26px;
`;
