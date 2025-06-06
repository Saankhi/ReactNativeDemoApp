import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import CommentComponent from '../components/CommentComponent';
import ErrorComponent from "../components/ErrorComponent";


function Comments({ route }) {

    const [commentsData, setCommentsData] = useState([]);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const { postId } = route.params;

    useEffect(() => {
        setShowIndicator(true);
        fetchCommentsData(postId);
    }, [])

    const fetchCommentsData = async (postId) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if (!res.ok) {
                setShowSnackbar(true);
                console.log('Status code', res.status);
            }

            const data = await res.json();
            setCommentsData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log('Error fetching comments', error, error.status);
            setShowSnackbar(true);
        }
        finally {
            setShowIndicator(false);
        }

    }

    return (
        <View>
            {commentsData.map((comm) => {
                return (
                    <View style={styles.commentsContainer} key={comm.id}>
                        <CommentComponent name={comm.name} email={comm.email} body={comm.body} id={comm.id} />
                    </View>
                )
            })}
            <ActivityIndicator animating={showIndicator} />
            <ErrorComponent showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar} type='comments' />
        </View>
    )
}

export default Comments;

const styles = StyleSheet.create({
    commentsContainer: {
        margin: 10,
        marginBottom: 30
    }
})