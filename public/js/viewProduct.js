

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.viewProduct');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const url = `/products/${productId}`;
            window.location.href = `/products/${productId}`
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
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
         button.addEventListener('click',async (e) => {
            const productId = e.target.getAttribute('data-id');
            const url = `/products/${productId}`;
            await fetch (url, {
                method:"POST",
                headers:{
                  "content-type":"application/json",
                },
                body:JSON.stringify({productId})
            })
            window.location.href = '/products';
        });
    });
});