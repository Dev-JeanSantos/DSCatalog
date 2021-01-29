import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { LongPressGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import menu from "../assets/menu.png";
import { nav, text } from '../styles';
import { doLogout, isAuthenticated } from '../services/Auth';


const Navbar: React.FC = () => {

    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    function navigate(path: any) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    async function logged() {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    function logout() {
        doLogout();
        navigation.navigate("Login");
    }

    useEffect(() => {
        logged();
    }, [])

    return (
        <>
            { authenticated ? (
                <TouchableOpacity style={nav.logoutBtn} onPress={() => logout()}>
                    <Text style={text.logoutText}>Sair</Text>
                </TouchableOpacity>
            ) : (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={nav.drawer}
                        onPress={() => setShow(!show)}
                    >
                        <Image source={menu} />
                        {
                            show ? (<View style={nav.options}>

                                <TouchableOpacity style={nav.option} onPress={() => navigate("Home")}>
                                    <Text style={[nav.textOption, route.name === "Home" ? nav.textActive : null,]}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={nav.option} onPress={() => navigate("Catalog")}>
                                    <Text style={[nav.textOption, route.name === "Catalog" ? nav.textActive : null,]}>Catalog</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={nav.option} onPress={() => navigate("Login")}>
                                    <Text style={[nav.textOption, route.name === "Login" ? nav.textActive : null,]}>Login</Text>
                                </TouchableOpacity>
                            </View>) : null
                        }
                    </TouchableOpacity>
                )

            }
        </>
    )
}

export default Navbar;