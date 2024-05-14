import React, { useState } from 'react';
import { Alert, View, Text, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { loginUser } from '../api/auth-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMyContextProvider } from '../store';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useMyContextProvider();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (username === "") {
            Alert.alert('Thất bại !!!', 'Vui lòng nhập EMAIL');
            return;
        } else if (!username.includes('@')) {
            Alert.alert('Thất bại !!!', 'EMAIL không hợp lệ');
            return;
        } else if (password === "") {
            Alert.alert('Thất bại !!!', 'Vui lòng nhập PASSWORD');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await loginUser({ email: username, password: password });
            const user = userCredential.user;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'USER_LOGIN', value: user });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                })
            );
        } catch (error) {
            Alert.alert('Thất bại !!!', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    onChangeText={text => setUsername(text)}
                    value={username}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="PASSWORD"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={!showPassword}
                    />
                    
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: loading ? 'gray' : 'blue' }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? "Login in progress" : "Login"}</Text>
                </TouchableOpacity>

                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={[styles.registerText, { fontWeight: 'bold' }]}>Đăng ký tại đây</Text>
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
    inputContainer: {
        position: 'relative',
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
    showPasswordButton: {
        position: 'absolute',
        top: 0,
        right: 10,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    showPasswordButtonText: {
        color: 'blue',
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
