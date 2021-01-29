import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from "react-native";
import { theme, text, admin } from '../styles';
import { TextInputMask } from 'react-native-masked-text';

interface ProductProps {
    id: Number;
    name: string;
    imgUrl: string;
    price: string;
    role?: string;
    handleDelete: Function;
}


const ProductCard: React.FC<ProductProps> = ({
    id,
    name,
    imgUrl,
    price,
    role,
    handleDelete,
}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={theme.productCard}
            onPress={() => role ? "" : navigation.navigate("ProductDetails",
                { id }
            )}>
            <Image source={{ uri: imgUrl }} style={theme.productImage} />
            <View style={theme.description}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask 
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: " ",
                            suffixUnit: ""
                        }}
                        value={price}
                        editable={false}
                        style={text.price}
                    />
                    {/* <Text style={text.price}>{price}</Text> */}
                </View>
                {
                    role === 'admin' && (
                        <View style={admin.buttonContainer}>
                            <TouchableOpacity style={admin.deleteBtn} onPress={() => handleDelete(id)}>
                                <Text style={text.deleteText}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={admin.editBtn}>
                                <Text style={text.editText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;