const socket = io.connect();

// socket.on('productos', function(productos) { 
//     //console.log(productos);
//     document.getElementById('datos').innerHTML = data2TableHBS(productos)
//     /* data2TableHBS(productos, html => {
//         document.getElementById('datos').innerHTML = html
//     }) */
// });

const form = document.querySelector('form');
 form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const data =  {nombre: document.getElementById('nombre').value,
                           precio: document.getElementById('precio').value,
                           foto: document.getElementById('foto').value}
                          
            
            
            socket.emit('update', data)
            return false
            
            
       

   
    
    
    // .then(res => res.json())
    // .then( res => {
    //     console.log(res)
    //     //document.getElementById('datos').innerHTML = data2Table(productos)
    //      // socket.emit('res', res)
    // })
    // .catch(error => console.error(error))

})



socket.on('productos',function (productos) {
    
    fetch('main.hbs')
    .then(respuesta => respuesta.text())
    .then( plantilla => {
        
        const template = Handlebars.compile(plantilla);
        const html = template({ productos: productos })
        document.getElementById("datos").innerHTML = html
        
    })
})


function addMessage (e) {
    const message = {
        author: document.getElementById("username").value,
        message: document.getElementById("text").value
    }
    console.log(message);
     socket.emit('new-message', message);
     return false

}

function render(data){
    const html = data.map((elem, index) =>{
        return(
            `<div><strong>${elem.author}</strong>
             <em>${elem.message}</em>   
             </div>`)
    }).join(" ")

    document.getElementById("messages").innerHTML = html
}
    socket.on('messages', function (data) {render(data)})