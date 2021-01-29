import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { ProductCard, SearchInput } from "../components";
import AnimatedLoader from "react-native-animated-loader";
import { api } from "../services";
import { theme } from "../styles";



const Catalog: React.FC = () => {

    const [search, setSearch] = useState("");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    async function fillProducts() {

        setLoading(true);

        const res = await api.get(
            `/products?page=0&linesPerPage=100&direction=ASC&orderBy=name`
        );
        setProducts(res.data.content);
        setLoading(false);

    }

    useEffect(() => {

        fillProducts();

    }, []);

    const data = search.length > 0 ?
        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        : products;

    return (
        <ScrollView contentContainerStyle={theme.scroolContainer}>
            <SearchInput
                placeholder="Nome do produto"
                search={search}
                setSearch={setSearch} />
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                     )                    
                    : (
                        data.map((product) =>
                            <ProductCard {...product} key={product.id} />)
                    )}
        </ScrollView>

    );
};

export default Catalog;