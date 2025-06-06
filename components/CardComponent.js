import * as React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LeftContent = props => <Avatar.Icon {...props} icon="account" />

const CardComponent = ({ title, body, id }) => {

  const navigation = useNavigation();
  const onPress = () => navigation.navigate('Comments', { postId: id })

  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Title title={title} left={LeftContent} />
        <Card.Content>
          <Text variant="bodyMedium">{body}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
};

export default CardComponent;