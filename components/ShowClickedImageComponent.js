import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

class ShowClickedImageComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <Text>ShowClickedImageComponent</Text> */}
                <Image
                    style={{width: "100%", height: "80%"}}
                    source={{uri: this.props.sourceUri}}
                />
 
            </View>
        );
    }
}
export default ShowClickedImageComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});