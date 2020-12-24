import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const categoriesResponse = {
    "content": [
        {
            "id": 3,
            "name": "Computadores"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        },

        {
            "id": 1,
            "name": "Livros"
        }
    ]
}

export const productResponse = {
    "id": 3,
    "name": "Macbook Pro",
    "description": ";)",
    "price": 1250.0,
    "imgUrl": "img.jpg",
    "date": "2020-07-14T10:00:00Z",
    "categories": [
        {
            "id": 1,
            "name": "Computadores"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        }
    ]
};


export const fillFormData = () => {
    const descriptionInput = screen.getByTestId('description');
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');

    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'melhor pc do mundo');
}