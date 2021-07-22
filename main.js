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
    process.env.user=localStorage.getItem('user');
    process.env.password=localStorage.getItem('password');
    process.env.database=localStorage.getItem('database');
    process.env.port=localStorage.getItem('port');

    if(user=='admin' && password=='123'){
        alert(process.env.host);
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
    // localStorage.setItem('con', con);
}
function addData(){
    // con = localStorage.getItem('con');
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
    // con.end();
    // Input data conection database
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
        let html='';
        // html="<tr><td>"+rows[rows.length-1].id+"</td> <td>"+rows[rows.length-1].nombre+"</td> <td>"+rows[rows.length-1].ap_pat+"</td> <td>"+rows[rows.length-1].ap_mat+"</td> <td>"+rows[rows.length-1].edad+"</td></tr>"; 
        rows.forEach(function(element){
            html+="<tr><td>"+element.id+"</td> <td>"+element.nombre+"</td> <td>"+element.ap_pat+"</td> <td>"+element.ap_mat+"</td> <td>"+element.edad+"</td></tr>"; 
        });
        document.getElementById('table').innerHTML=html;
    });
}