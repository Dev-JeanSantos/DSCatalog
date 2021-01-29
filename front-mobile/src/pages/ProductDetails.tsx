import React, {useState, useEffect} from "react";
import { View, Text, ActivityIndicator,TouchableOpacity, Image, ScrollView} from "react-native";
import { useNavigation } from '@react-navigation/native'
import { api} from '../services';
import { theme, text} from "../styles";

import arrow from '../assets/Seta.png'
const ProductsDetails = ({
    route: {
        params: { id },
    },
}) => {

    const navigation = useNavigation();
    
    const [product, setProduct] = useState({
        id:null,
        name:null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: [],
    });

    const [loading, setLoading] = useState(false);

    async function loadProductData() {
        setLoading(true);
        const res = await api.get(`products/${id}`);
        setProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadProductData();
    }, [])
    return (
        <View style={theme.containerDetails}>
            {
                loading ? (<ActivityIndicator size="large" color="#0000ff" style={theme.loader}/>):
                (<View style={theme.detailsCard}>
                    <TouchableOpacity style={theme.goBackContainer} 
                    onPress={() => navigation.goBack()}>
                                <Image source={arrow}/>
                                <Text style={text.goBackText}>Voltar</Text>
                    </TouchableOpacity>
                    <View style={theme.productImageContainer}>
                        <Image source={{uri: product.imgUrl}} style={theme.productImageDetails}/>
                    </View>
                    <Text style={text.productDetailsName}>{product.name}</Text>
                    <View style={theme.priceContainer}>
                        <Text style={text.currency}>R$</Text>
                        <Text style={text.price}>{product.price}</Text>
                    </View>
                    <ScrollView style={text.scrollTextContainer}>
                        <Text style={text.productDescription}>
                            {product.description}
                        </Text>
                    </ScrollView>
                </View>  ) 
                
            }
        </View>
    );
};

export default ProductsDetails;