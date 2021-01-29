import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchInput, ProductCard } from '../../../components';
import { deleteProduct, getProducts } from '../../../services';
import { admin, text } from '../../../styles';

interface ProductsProps {
    setScreen: Function;
}

const Products: React.FC<ProductsProps> = (props) => {

    const { setScreen } = props;
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteProduct(id);
        fillProducts();
    }

    async function fillProducts() {

        setLoading(true);

        const res = await getProducts();

        setProducts(res.data.content);
        setLoading(false);

    }

    useEffect(() => {

        fillProducts();

    }, []);

    const data = search.length > 0 ?
        products.filter(
            product => product.name.toLowerCase().includes(search.toLowerCase()))
        : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity style={admin.addButton} onPress={() => setScreen("newProduct")}>
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput
                placeholder="Nome do produto"
                search={search}
                setSearch={setSearch} />
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                        data.map((product) => {
                            const { id } = product;
                            return (
                                <ProductCard
                                    {...product}
                                    key={id}
                                    role="admin"
                                    handleDelete={handleDelete}
                                />)
                        }
                        )

                    )}
        </ScrollView>
    );
};


export default Products;