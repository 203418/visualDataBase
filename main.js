if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  require('dotenv').config();
var con;
function validarLogin(){
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    if(user=='admin' && password=='123'){
        if (process.env.host != null || process.env.host != ''){
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
        alert(rows);
    });
    selectData();
    con.end(function(){
        con.destroy();
    });

    // Input data conection database
}
function selectData(){
    document.getElementById('table').style="overflow:visible;";
    $query = `select * from persona`;
    con.query($query, function (err, rows, fields) {
        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        let html='';
        html="<tr><td>"+rows[rows.length-1].id+"</td> <td>"+rows[rows.length-1].nombre+"</td> <td>"+rows[rows.length-1].ap_pat+"</td> <td>"+rows[rows.length-1].ap_mat+"</td> <td>"+rows[rows.length-1].edad+"</td></tr>"; 
        // rows.forEach(function(element){
        //     html+="<tr><td>"+rows[0].id+"</td> <td>Nombre</td> <td>Apellido Paterno</td> <td>Apellido Materno</td> <td>Edad</td></tr>"; 
        // });
        document.getElementById('table').innerHTML+=html;
    });
}