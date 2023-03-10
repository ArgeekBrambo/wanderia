import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { database } from "../../config/firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    const createChat = async () => {
        await database.collection("chats").add({
            chatName: input,
        });
        navigation.goBack();
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }
            />
            <Button onPress={createChat} title="Create new Chat" />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        backgroundColor: "white",
        height: "100%",
    },
});
