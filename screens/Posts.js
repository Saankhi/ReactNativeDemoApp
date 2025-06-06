import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../redux/actions";
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Card from "../components/CardComponent";
import ErrorComponent from "../components/ErrorComponent";


function Posts() {

    const dispatch = useDispatch();
    const postsDataArr = useSelector((state) => state.postsData);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        if (postsDataArr.length === 0) {
            setShowIndicator(true);
            fetchPostsData();             
        }
        // fetchPostsData();              -----> When checking for error handling, uncomment this and comment the above function.
    }, [])

    const fetchPostsData = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')

            if (!res.ok) {
                setShowSnackbar(true);
                console.log('Status code', res.status);
            }
            const json = await res.json();
            dispatch(setPostsData(json));
        }
        catch (error) {
            console.log('Error fetching data', error, error.status);
            setShowSnackbar(true);
        }
        finally {
            setShowIndicator(false);
        }

    }

    return (
        <View>
            <FlatList
                data={postsDataArr}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[
                            styles.postsContainer,
                            index === 0 && { marginTop: 30 }
                        ]}>
                            <Card title={item.title} body={item.body} id={item.id} />
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
            <ActivityIndicator animating={showIndicator} size={50} />
            <ErrorComponent showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar} type='posts' />
        </View>
    )

}


export default Posts;


const styles = StyleSheet.create({

    postsContainer: {
        margin: 10
    }
})