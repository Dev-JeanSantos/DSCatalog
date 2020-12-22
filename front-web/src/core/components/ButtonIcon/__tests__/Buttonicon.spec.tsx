import React from 'react';
import { render, screen} from '@testing-library/react';
import ButtonIcon from '..';

test('should render ButtonIcon', () => {

    const text = 'Logar';
    const icon = 'arrow-icon';
    render(
        <ButtonIcon text={text}/>
    );

    const textElement = screen.getByText(text);
    const iconElement = screen.getByTestId(icon);
    
    expect(textElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
});