import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator, Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Toast from "react-native-tiny-toast";
import arrow from "../../../assets/Seta.png";
import { createProduct, getCategories, uploadImage } from "../../../services";
import { theme, text, admin } from "../../../styles";
import * as ImagePicker from 'expo-image-picker';


interface FormProductProps {
    setScreen: Function;
}

const FormProducts: React.FC<FormProductProps> = (props) => {

    const { setScreen } = props;
    const [showCtaegories, setShowCtaegories] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [categories, setCategories] = useState([

    ])

    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        categories: [],
    });

    const [image, setImage] = useState("");

    useEffect(() => {

        async() => {
            const{ status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if(status !== 'granted'){
                Alert.alert("É necessário acesso a biblioteca de imagens!");
            }
        }
    }, [])

    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        setImage(result.uri);
    }

    async function handleUpload() {
        uploadImage(image).then(res => {
            const{ uri } = res?.data;
            setProduct({ ...product, imgUrl: uri})
        })

    }

    useEffect(() => {
        image ? handleUpload() : null
    }, [image])


    function handleSave() {
        !edit && newProduct();
    }

    async function newProduct() {

        setLoading(true);

        const cat = replaceCategory();
        const data = {
            ...product,
            price: getRaw(),
            categories: [
                {
                    id: cat,
                },
            ],
        };
        try {
            await createProduct(data);
            Toast.showSuccess("Produto cadastrado com sucesso")
        } catch (res) {
            Toast.show("Erro ao salvar o produto...")
        }
        setLoading(false);
    }

    function replaceCategory() {
        const cat = categories.find(
            (category) => category.name === product.categories
        )
        return cat.id;
    }

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    }

    function getRaw(){
        const str = product.price;
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".")
        return res;
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <View style={theme.formContainer}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                    <View style={theme.formCard}>
                        <ScrollView>
                            <Modal visible={showCtaegories} animationType="fade" transparent={true} presentationStyle="overFullScreen">
                                <View style={theme.modalContainer}>
                                    <ScrollView contentContainerStyle={theme.modalContent}>
                                        {
                                            categories.map(
                                                cat => (
                                                    <TouchableOpacity style={theme.modalItem} key={cat.id} onPress={() => {
                                                        setProduct({ ...product, categories: cat.name })
                                                        setShowCtaegories(!showCtaegories);
                                                    }}>
                                                        <Text>{cat.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            )
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>
                            <TouchableOpacity onPress={() => setScreen("products")} style={theme.goBackContainer} >
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Nome do Produto"
                                style={theme.formInput}
                                value={product.name}
                                onChangeText={(e) => setProduct({ ...product, name: e })}
                            />
                            <TouchableOpacity onPress={() => setShowCtaegories(!showCtaegories)} style={theme.selectInput}>
                                <Text style={{ color: "#9E9E9E" }}>
                                    {
                                        product.categories.length === 0
                                            ? "Escolha uma Categoria"
                                            : product.categories
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TextInputMask
                                type={"money"}
                                placeholder={"Preço"}
                                style={theme.formInput}
                                value={product.price}
                                onChangeText={(e) => setProduct({ ...product, price: e })}
                            />
                            <TouchableOpacity activeOpacity={0.8} style={theme.uploadBtn} onPress={selectImage}>
                                <Text style={text.uploadText}>Carregar Imagem</Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>As Imagens devem ser JPG ou PNG e não devem ultrapasar os 5MB.</Text>
                            {
                                image !== "" && (
                                    <TouchableOpacity 
                                    onPress={selectImage}
                                    activeOpacity={0.9}
                                    style={{
                                        width:100, 
                                        height:100, 
                                        borderRadius: 10,
                                        marginVertical: 10,
                                    }} 
                                    >
                                        <Image source={{uri: image}} style={{width:100, height:100, borderRadius: 10}}  />
                                    </TouchableOpacity>
                                )
                            }
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={theme.textArea}
                                value={product.description}
                                onChangeText={(e) => setProduct({ ...product, description: e })}
                            />
                            <View style={admin.buttonContainer}>
                                <TouchableOpacity style={theme.deleteBtnForm} onPress={() => {
                                    Alert.alert(
                                        "Deseja cancelar?",
                                        "Os dados inseirdos não serão salvos",
                                        [{
                                            text: "Voltar",
                                            style: "cancel",
                                        },
                                        {
                                            "text": "Confirmar",
                                            onPress: () => setScreen("products"),
                                            style: "default",
                                        }]
                                    )
                                }}>
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={theme.saveBtn} onPress={() => handleSave()}>
                                    <Text style={text.salvarTextBtn}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )}
        </View>
    )
}

export default FormProducts;
