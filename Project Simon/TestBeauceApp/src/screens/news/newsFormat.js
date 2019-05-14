
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../res/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 5,
    },
    title: {
        fontSize: 18,
        color: Colors.text,
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    photo: {
        height: 70,
        width: 70,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentOrange,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    }
});

const NewsFormat = ({ title, description, image_url, externalLink }) => (
    <View style={styles.container}>
        <Image source={{ uri: image_url !== "" ? image_url : ""}} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(externalLink)}>
            <Text style={styles.buttonText}>En savoir plus</Text>
        </TouchableOpacity>

    </View>
);

export default NewsFormat;