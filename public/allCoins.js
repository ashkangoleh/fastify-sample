/////////////////////////////without any cdn
fetch('http://localhost:5000/api/v1/coins').then(response => response.json()).then(data => {
    data.data.forEach(element => {
        let node = document.createElement("p");       // Create a <p> node
        let node_name = document.createElement("p");       // Create a <p> node
        let id_node = document.createElement('strong')
        let name = document.createElement('strong')
        let break_node = document.createElement('br')
        id_node.innerHTML= `${element._id}`
        name.innerHTML= `${element.name}`
        node_name.appendChild(name);
        node.appendChild(id_node);
        // node.appendChild(document.createElement('hr'));
        document.getElementById('_id').append(node)
        document.getElementById('_name').append(node_name)
    })
})
//////////////////////////with jquery ajax
// $.ajax({
//     method: 'GET',
//     url: 'http://localhost:5000/api/v1/coins'
// }).done(function (data) {
//
//     data.data.forEach(function (element){
//         $('#lists').append(`<p><strong>ID: </strong>${element._id}<br> <p><strong>NAME: </strong>${element.name}</p><hr>`)
//     })
// })
