import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, Text } from 'react-native-paper';


const LeftContent = props => <Avatar.Icon {...props} icon="account" />

const CommentComponent = ({ name, email, body, id }) => {

    const navigation = useNavigation();
    const onPress = () => navigation.navigate('Edit Comment', { commentId: id})

    return (
        <Card>
            <Card.Title title={name} subtitle={email} left={LeftContent} />
            <Card.Content>
                <Text variant="bodyMedium">{body}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode='contained' onPress={onPress}>Edit</Button>
            </Card.Actions>
        </Card>
    )
};

export default CommentComponent;
