import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { signUpUser } from '../api/auth-api';

export default function RegisterScreen({ navigation }) {
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (firstname === "") {
            Alert.alert('Thất bại !!!', 'Vui lòng nhập FULL NAME');
            return;
        }
        if (username === "" || !username.includes('@')) {
            Alert.alert('Thất bại !!!', 'Vui lòng nhập EMAIL hợp lệ');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Thất bại !!!', 'PASSWORD phải có ít nhất 6 ký tự');
            return;
        }
        if (password !== confirmpassword) {
            Alert.alert('Thất bại !!!', 'CONFIRM PASSWORD phải trùng với PASSWORD');
            return;
        }

        setLoading(true);
        const response = await signUpUser({
            name: firstname,
            email: username,
            password: password,
        });
        setLoading(false);

        if (response.error) {
            Alert.alert('Thất bại !!!', response.error);
        } else {
            navigation.navigate("LoginScreen");
        }
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
        

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="FULL NAME"
                    onChangeText={text => setFirstname(text)}
                    value={firstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="CONFIRM PASSWORD"
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmpassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: loading ? 'gray' : 'blue' }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? "Registration in progress" : "Registration"}</Text>
                </TouchableOpacity>

                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={[styles.registerText, { fontWeight: 'bold' }]}>Đăng nhập tại đây</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    cardIMG: {
        borderRadius: 10,
        padding: 15,
        width: '80%',
        height: '40%',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        width: '80%',
        height: 'auto',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    button: {
        height: 45,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    registerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    registerText: {
        fontStyle: "italic",
        fontSize: 13,
        color: 'black',
    },
});
