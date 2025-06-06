import { Snackbar } from "react-native-paper";


function ErrorComponent({ type, showSnackbar, setShowSnackbar }) {


    return (
        <Snackbar
            visible={showSnackbar}
            onDismiss={() => setShowSnackbar(false)}
            action={{
                label: 'Undo',
                onPress: () => setShowSnackbar(false),
            }}
            style={{ backgroundColor: 'red', position: 'absolute', top:350 }}
            theme={{
                colors: {
                    onSurface: 'black',
                }
            }}

        >
            {`Failed to load ${type}. Please try again.`}
        </Snackbar>
    )
}


export default ErrorComponent;