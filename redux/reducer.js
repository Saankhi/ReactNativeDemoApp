const initialState = {
    postsData: []
}

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_POSTS_DATA':
            return { ...state, postsData: action.payload }

        default:
            return state;
    }

}