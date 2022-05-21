const socket = io.connect();

socket.on('productos', function(productos) { 
    //console.log(productos);
    document.getElementById('datos').innerHTML = data2TableHBS(productos)
    /* data2TableHBS(productos, html => {
        document.getElementById('datos').innerHTML = html
    }) */
});

const form = ()=> {document.getElementById('form')
form.addEventListener('submit', e => {
    e.preventDefault()

    const data = {nombre: form[0].value, precio: form[1].value, foto: form[2].value}
    //console.log(data)

    fetch('https://localhost:8080/productos', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

})
}
function data2TableHBS(productos) {
    
    fetch('/views/partials/tabla.hbs')
    .then(respuesta => respuesta.text())
    .then( plantilla => {
        
        const template = Handlebars.compile(plantilla);
        let html = template({ productos })
        console.log(html)
    })
}