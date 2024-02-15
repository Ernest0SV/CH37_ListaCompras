// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");//lista de compras
//se puso esta instruccion para especificar que tiene que insertar en tbody linea 142 index de la tabla lista compras
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);


let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let precio = 0;
let isValid = true;//variable de bandera para saber si pasó por las validaciones del boton agregar
let contador = 0;
let costoTotal=0;
let totalEnProductos=0;


let datos = new Array ();



//Boton limpiar todo
//limpiar los campos de nombre y cantidad con el boton limpiar todo
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    //reset variables
    contador = 0;
    costoTotal=0;
    totalEnProductos=0;
    //asignar a las primeras variables el valor de cero de las de arriba
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;//el primer $ es texto, el segundo es para la variable
    //para limpiar el storage del navegador
    //primero va la llave entre comillas y el segundo es el valor
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    //reset cuerpo de la tabla
    cuerpoTabla.innerHTML="";
    //limpiar el storage de la tabla
    localStorage.removeItem("datos");
    datos = new Array();



    txtNombre.focus();
});


//funcion de validar cantidad
    function validarCantidad(){
        if(txtNumber.value.length==0){
            return false;
        }// if length, que la longitud sea mayor a cero (que exista un dato)

        if (isNaN(txtNumber.value)) {
            return false;
        }//isNaN funcion para saber si es un numero

        if (Number(txtNumber.value)<=0) {//valida que la cantidad sea mayor a cero
            return false            
        }//if >0

        return true;
    }//validarCantidad


//funcion de inventar un precio aleatorio
//el 75 es para limitar a ese numero max
//entre cero y 1 hay infinito
//el tofix no sirve porque me cambia a tipo string mi dato
    function getPrecio(){
        //esta multiplicacion y division nos ayuda a ajustar el random
        //a dos enteros, dos decimales, para 3 deciamles seria mil 1000 
        return parseInt((Math.random() * 75) * 100)/100
    }//getPrecio





//funciones al boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //esto limpia los campos, atributos
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;



    //alertValidaciones: es donde se le cambia la propiedad de display:none --> display:block
    //alertValidacionesTexto: Es el texto propiamente que se va a mostrar
    txtNombre.value = txtNombre.value.trim();//de esta forma le quita los espacios si se agregan al campo
    txtNumber.value = txtNumber.value.trim();
    


    if(txtNombre.value.length<3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        El <strong> Nombre </strong> no es correcto<br/>`)
        alertValidaciones.style.display="block";//con block se manda a llamar la alerta, linea 107 html
        txtNombre.style.border="solid red thin";
        isValid=false;
    }//if length <3


    if(! validarCantidad()){//si es diferente a la funcion validarCantidad
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        La <strong> cantidad </strong> no es correcta<br/>`)
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red thin";//para añadir el borde rojo al campo faltante
        isValid=false;
    }//if ! validarCantidad

    if (isValid) {
        contador++;
        precio = getPrecio();  //le asignamos el precio creado de manera random    
        row = `<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>
        
        `;



        //JSON arreglo de objetos
        //a txt nombre se le ponene comillas por que es una cadena string
        let elemento = `{"id" : ${contador},
                        "nombre" : "${txtNombre.value}",
                        "cantidad" : ${txtNumber.value},
                        "precio" : ${precio}
        }`;

        //Se le hace push 
        //se agrega el objeto "elemento" al arreglo
        //parse convierte una cadena en un objeto
        datos.push(JSON.parse(elemento));
        console.log(datos);
        //stringify conviene a cadena de caracteres el objeto que le estamos pasando
        //en este caso un arreglo de objetos
        localStorage.setItem("datos", JSON.stringify(datos));


        //instrucciones para los contadores y sumas de los totales de productos
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;//boton rojo
        totalEnProductos += parseFloat(txtNumber.value);//total en productos
        productosTotal.innerText=totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);//total en costo total
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        
        //para guardar en el navegador los datos
        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);
        //para borrar los valores de los campos, una vez insertados
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    
    }//if isValid




});//btnAgregar


//para  cargar toda la informacion guardada en local storage al abrir nueva ventana de navegador 
window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") != null){
        contador = Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
        
        //datos de los numeros de la derecha
        contadorProductos.innerText = contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

    }//if != null

       //tabla de productos
    if (this.localStorage.getItem("datos") != null){
        //JSON.parse para convertir la cadena a un objeto, en nuestro caso, el arreglo
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
        let  row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
        </tr>`;

        cuerpoTabla.insertAdjacentHTML("beforeend",row);

        });//foreach
       }//datos !null
       

});


  

/*"clear" en el navegador borra todo el local storage
"remove" solo quita un elemento en especifico


*/
