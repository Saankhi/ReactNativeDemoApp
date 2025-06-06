import { View, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { useState } from 'react';


function EditComment({ route }) {

    const [text, setText] = useState('');
    const [success, setSuccess] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const { commentId } = route.params;


    const updateComment = async (updatedData) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            console.log('Comment update successful');
            setSuccess(true);
        } catch (error) {
            console.log('Error while updating the comment', error)
            setSuccess(false);
        } finally {
            setShowIndicator(false);
            setShowSnackbar(true)
            setText('');
        }

    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                label="Add your comment"
                value={text}
                onChangeText={text => setText(text)}
                multiline
            />
            <Button mode='contained' disabled={text ? false : true} onPress={() => { updateComment(text); Keyboard.dismiss(); setShowIndicator(true) }}>Submit</Button>
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                action={{
                    label: 'Undo',
                    onPress: () => setShowSnackbar(false),
                }}
                duration={5000}
                style={{ backgroundColor: success ? 'green' : 'red', position: 'absolute', top: 350 }}
            >
                {success ? 'Comment update successful' : 'Comment update not successful'}
            </Snackbar>
            <ActivityIndicator animating={showIndicator} size={50} />
        </View >
    )
}


export default EditComment;


const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    inputContainer: {
        padding: 5,
        marginBottom: 50,
        textAlignVertical: 'top',
        height: 150,
    }
})