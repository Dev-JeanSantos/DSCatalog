import React, { useState, useEffect} from "react";
import { View, Text, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { text, theme } from "../styles";

import eyesOpen  from "../assets/eyesOpen.png";
import eyesClosed  from "../assets/eyesClosed.png";
import arrow from "../assets/arrow.png";
import { isAuthenticated, login } from "../services/Auth";

const Login: React.FC = () => {

    const navigation = useNavigation();
    const [userFetchData, setUserFetchData] = useState({});
    const [hidePassword, setHidePassword] = useState(true);
    const [userInfo, setUserInfo] = useState ({username:"", password:""});

    async function handleLogin() {
        const data = await login(userInfo)
        setUserFetchData(data);
        navigation.navigate("Dashboard");
    }
    return (
        <View style={theme.container}>
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>Login</Text>
                <View style={theme.form}>
                    <TextInput
                    style={text.textInput}
                    placeholder="Email" 
                    autoCapitalize="none" 
                    keyboardType="email-address"
                    value={userInfo.username}
                    onChangeText={
                        (e) => {
                            const newUserInfo = { ...userInfo};
                            newUserInfo.username = e;
                            setUserInfo(newUserInfo);
                        }
                    }
                    />
                    <View style={theme.passwordContainer}>
                        <TextInput 
                        style={text.textInput}
                        placeholder="Senha" 
                        autoCapitalize="none" 
                        value={userInfo.password}
                        secureTextEntry={hidePassword}
                        
                        onChangeText={
                            (e) => {
                                const newUserInfo = { ...userInfo};
                                newUserInfo.password = e;
                                setUserInfo(newUserInfo);
                            }
                        }
                        />
                        <TouchableOpacity style={theme.toogle}onPress={() => setHidePassword(!hidePassword)}>
                            <Image style={theme.eyes }source={hidePassword ? eyesOpen : eyesClosed} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity 
                    style={theme.primaryButton} 
                    activeOpacity={0.8}
                    onPress={() => handleLogin()}
                    >
                        <View style={theme.buttonTextContainer}>
                            <Text style={text.primaryTextLogin}>Fazer Login</Text>
                        </View>
                        <View style={theme.arrowContainer}>
                            <Image source={arrow}/>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Login;