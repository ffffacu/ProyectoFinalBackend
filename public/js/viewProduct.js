
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.viewProduct');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const url = `/products/${productId}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    window.location.href = `/products/${productId}`;
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud fetch:', error);
                });
        });
        
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.addProductCart');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const url = `/products/${productId}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    window.location.href = `/products/${productId}`;
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud fetch:', error);
                });
        });
        
    });
});