export const productDto = (product) => {
    return {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
    };
};