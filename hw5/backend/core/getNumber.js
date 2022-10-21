let number = undefined;

export const genNumber = () => { number = Math.ceil(Math.random() * 100) };

export const getNumber = () => number;