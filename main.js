if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
require('dotenv').config();
var con;
function validarLogin(){
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    process.env.host=localStorage.getItem('host');
    if(user=='admin' && password=='123'){
        if (process.env.host != 'null'){
            location.href='./vista3.html';
        } else{
            location.href='./vista2.html';
        }
    }
    else{
        alert('Datos erroneos');
    }
}
function sendParams(){
    con = require('./conect');
}
function addData(){
    con = require('./conect');
    // Crear query para INSERT, SELECT, UPDATE O DELETE
    const nombre =  document.getElementById('nombre').value;
    const ap_pat = document.getElementById('ap_pat').value;
    const ap_mat = document.getElementById('ap_mat').value;
    const edad = document.getElementById('edad').value;

    $query = `INSERT INTO persona (nombre,ap_pat,ap_mat,edad) VALUES ("${nombre}","${ap_pat}","${ap_mat}","${edad}")`;

    con.query($query, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        console.log("Query exitoso", rows.length);
    });
    selectData();
}
function selectData(){
    $query = `select * from persona`;
    con.query($query, function (err, rows, fields) {
        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        let html='',fila1="<tr><td>id</td> <td>Nombre</td> <td>Apellido Paterno</td> <td>Apellido Materno</td> <td>Edad</td></tr>";
        rows.forEach(function(element){
            html+="<tr><td>"+element.id+"</td> <td>"+element.nombre+"</td> <td>"+element.ap_pat+"</td> <td>"+element.ap_mat+"</td> <td>"+element.edad+"</td></tr>"; 
        });
        document.getElementById('table').innerHTML = fila1;
        document.getElementById('table').innerHTML+=html;
    });
}
function borrarCon(opcion){
    localStorage.removeItem('host');
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('database');
    localStorage.removeItem('port');
    if(opcion==1)
        location.href='./vista2.html';
    else
        location.href='./index.html';
}
                