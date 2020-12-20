import { generateList } from "../list";

test('should generate a list', () => {

    //PADRÃO 3A

    //Entrada: 5
    //ARRANGE
    const amount = 5

    //ACT
    const result = generateList(amount);

    //saida: [0, 1 , 2 ,3 , 4]
    //ASSERT
    expect(result).toEqual([0, 1, 2, 3, 4]);

});

test('should generate an empty list when amount is zero', () => {

    const amount = 0

    const result = generateList(amount);

    expect(result).toEqual([]);

});