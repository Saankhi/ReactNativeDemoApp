import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../redux/actions";
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Card from "../components/CardComponent";
import ErrorComponent from "../components/ErrorComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Posts() {

    const dispatch = useDispatch();
    const postsDataArr = useSelector((state) => state.postsData);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [postsNewData,setPostsNewData] = useState([]);

    useEffect(() => {
        // if (postsDataArr.length === 0) {
        //     setShowIndicator(true);
        //     fetchPostsData();
        // }
        fetchPostsData();             
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPostsData();
            setPostsNewData(data);
        };

        fetchPosts();
    }, [])

    const fetchPostsData = async () => {
        try {
            /*
                By providing an incorrect URL, I was able to simulate network failure and 
                load the POSTS from local storage.
            */
            const res = await fetch('https://jsonplaceholder.typicode.com/postssss')

            if (!res.ok) {
                setShowSnackbar(true);
                console.log('Status code', res.status);
            }
            const json = await res.json();
            dispatch(setPostsData(json));

            const jsonValue = JSON.stringify(json);
            await AsyncStorage.setItem('postsData', jsonValue);
        }
        catch (error) {
            console.log('Error fetching data', error, error.status);
            setShowSnackbar(true);
        }
        finally {
            setShowIndicator(false);
        }

    }

    const getPostsData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('postsData');
            console.log('json value', jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('error reading value', e)
        }
    };

    return (
        <View>
            <FlatList
                data={postsNewData}
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