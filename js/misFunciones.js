/// Category
/// GET
function TraerCategoria() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.125.160:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaCategoria) {
            pintarRespuestaCategoria(respuestaCategoria);
            console.log(respuestaCategoria);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },

    });
}

function pintarRespuestaCategoria(respuestaCategoria) {
    let myTableCategory = "<table border = 1 >";
    myTableCategory += "<tr>";
    myTableCategory += "<th bgcolor = lightcoral> Nombre </th>";
    myTableCategory += "<th bgcolor = lightcoral> Descripción </th>";
    myTableCategory += "<th bgcolor = lightcoral> Cabaña </th>";
    "</tr>";

    for (i = 0; i < respuestaCategoria.length; i++) {
        myTableCategory += "<tr>";
        myTableCategory += "<td>" + respuestaCategoria[i].name + "</td>";
        myTableCategory += "<td>" + respuestaCategoria[i].description + "</td>";
        myTableCategory += "<td>" + respuestaCategoria[i].cabins + "" + "</td>";
        myTableCategory += "<td> <button onclick ='editarCategory (" + respuestaCategoria[i].id + ")'>Editar Categoria!</button>";
        myTableCategory += "<td> <button onclick='eliminarCategory(" + respuestaCategoria[i].id + ")'>Eliminar Categoria!</button>";
        myTableCategory += "<td> <button onclick='actualizarCategory(" + respuestaCategoria[i].id + ")'>Actualizar Categoria!</button>";
        myTableCategory += "</tr>";
    }
    myTableCategory += "</table>";

    $("#resultadoCategory").append(myTableCategory);
}

///// POST

function guardarCategoria() {
    let myDataCategory = {
        name: $("#name1").val(),
        description: $("#description1").val(),
    };
    let dataToSend = JSON.stringify(myDataCategory);
    if (!validarCampo($("#name1, #description1"))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;

    }
    if (!validarCampo($("#name1"))) {
        alert("Debe ingresar el nombre de la categoria");
        return;
    }
    if (!validarCampo($("#description1"))) {
        alert("Debe ingresar la description de la categoria");
        return;
    }

    console.log(dataToSend)
    $.ajax({
        url: "http://129.151.125.160:8080/api/Category/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuestaCategoria) {
            $("#resultadoCategory").empty();

            $("#name1").val("");
            $("#description1").val("")

            alert("Se ha guardado la categoria.")
            limpiarFormularioCategoria();
            TraerCategoria();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente" + textStatus);
        },
    });
}

function limpiarFormularioCategoria() {
    $("#name1").val("");
    $("#description1").val("")
}

/*function mostrarUnaCategoriaEspecifica(idCategory) {
    $.ajax({
        datatype: "JSON",
        url: "http://129.151.125.160:8080/api/Category/all" + idCategory,
        type: "GET",
        success: function (respuestaCategoria) {
            console.log(respuestaCategoria);
            var item = respuestaCategoria.items[0];

            $("#resultadoCategory").empty();
            $("#id1").val("item.id");
            $("#name1").val("item.name");
            $("#description1").val("item.description");

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}*/

//// PUT

function actualizarCategory(idCategory) {
    if ($("#name1").val().length == 0 || $("#description1").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {

        let myDataCategory = {
            id: idCategory,
            name: $("#name1").val(),
            description: $("#description1").val()
        };
        console.log(myDataCategory);
        let dataToSend = JSON.stringify(myDataCategory);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaCategoria) {
                $("#resultadoCategory").empty();
                $("#id1").val("");
                $("#name1").val("");
                $("#description1").val("");
                TraerCategoria();
                alert("Se ha Actualizado correctamente la categoria.")
            }
        });
    }

}

//// DELETE

function eliminarCategory(idCategory) {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Category/" + idCategory,
        type: "DELETE",
        success: function (respuestaCategoria) {
            $("#resultadoCategory").empty();

            TraerCategoria();
            alert("Se ha Eliminado la categoria.")
        }
    });

}
function editarCategory(id) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Category/" + id,
        type: 'GET',

        success: function (respuestaCategoria) {
            console.log(respuestaCategoria);
            var item = respuestaCategoria;

            $("#id1").val(item.id);
            $("#name1").val(item.name);
            $("#description1").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}




///CABAÑA/////////////////////////////////////////////////////////////////////////////////////
function autoInicioCategory() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.125.160:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaCategoria) {
            console.log(respuestaCategoria);
            let $select = $("#select-category");
            $.each(respuestaCategoria, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}

//// GET//

function TraerCabana() {
    $.ajax({
        url: "http://129.151.125.160:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaCabana) {
            console.log(respuestaCabana);
            pintarRespuestaCabana(respuestaCabana);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },

    });
}

function pintarRespuestaCabana(respuestaCabana) {
    let myTableCabana = "<table>";
    myTableCabana += "<tr>";
    myTableCabana += "<th bgcolor = steelblue> Nombre </th>";
    myTableCabana += "<th bgcolor = steelblue> Marca </th>";
    myTableCabana += "<th bgcolor = steelblue> Habitaciones</th>";
    myTableCabana += "<th bgcolor = steelblue>Descripción</th>";
    myTableCabana += "<th bgcolor = steelblue>Categoria</th>";
    myTableCabana += "<th bgcolor = steelblue>Mensaje</th>";
    myTableCabana += "<th bgcolor = steelblue>Reservacion</th>";

    "</tr>";

    for (i = 0; i < respuestaCabana.length; i++) {
        myTableCabana += "<tr>";
        myTableCabana += "<td>" + respuestaCabana[i].name + "</td>";
        myTableCabana += "<td>" + respuestaCabana[i].brand + "</td>";
        myTableCabana += "<td>" + respuestaCabana[i].rooms + "</td>";
        myTableCabana += "<td>" + respuestaCabana[i].description + "</td>";
        myTableCabana += "<td>" + "NOMBRE: " + respuestaCabana[i].category.name + " - DESCRIPCIÓN: " + respuestaCabana[i].category.description + "</td>";
        myTableCabana += "<td>" + respuestaCabana[i].messages + " []" + "</td>";
        myTableCabana += "<td>" + respuestaCabana[i].reservations + "[] " + "</td>";
        myTableCabana += "<td> <button bgcolor = springgreen onclick='editarCabana(" + respuestaCabana[i].id + ")'>Editar Cabana!!</button>";
        myTableCabana += "<td> <button style=background-color: rgb(57, 110, 93) onclick='eliminarCabana(" + respuestaCabana[i].id + ")'>Eliminar Cabana!!</button>";
        myTableCabana += "<td> <button onclick='actualizarCabana(" + respuestaCabana[i].id + ")'>Actualizar Cabana !!</button>";
        myTableCabana += "</tr>";
    }
    myTableCabana += "</table>";
    $("#resultadoCabana").append(myTableCabana);
}

//// POST

function guardarCabana() {
    let myDataCabana = {
        brand: $("#brand").val(),
        rooms: $("#rooms").val(),
        category: { id: +$("#select-category").val() },
        name: $("#name").val(),
        description: $("#description").val(),
    };
    let dataToSend = JSON.stringify(myDataCabana);
    if (!validarCampo($("#brand, #rooms, #category, #name, #description"))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;

    }
    if (!validarCampo($("#brand"))) {
        alert("Debe ingresar la marca");
        return;
    }
    if (!validarCampo($("#rooms"))) {
        alert("Debe ingresar el numero de cuartos");
        return;
    }
    if (!validarCampo($("#category"))) {
        alert("Debe ingresar la categoria");
        return;
    }
    if (!validarCampo($("#name"))) {
        alert("Debe ingresar el nombre de la cabaña");
        return;
    }
    if (!validarCampo($("#description"))) {
        alert("Debe ingresar la description de la cabana");
        return;
    }

    console.log(myDataCabana)
    $.ajax({
        url: "http://129.151.125.160:8080/api/Cabin/save",
        type: "POST",
        contentType: "application/json",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuestaCabana) {
            console.log(respuestaCabana);
            $("#resultadoCabana").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#category").val("");
            $("#name").val("");
            $("#description").val("");


            alert("Se ha guardado la cabana.")
            limpiarFormularioCabana();
            TraerCabana();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente -  " + textStatus);

        },
    });
}

/*function mostrarUnaCabanaEspecifica(idCabin) {
    $.ajax({
        datatype: "JSON",
        url: "http://129.151.125.160:8080/api/Cabin/all" + idCabin,
        type: "GET",
        success: function (respuestaCabana) {
            console.log(response);
            var item = response.items[0];

            $("#resultadoCabana").empty();
            $("#id").val("item.id");
            $("#name").val("item.name");
            $("#brand").val("item.brand");
            $("#rooms").val("item.rooms");
            $("#description").val("item.description");
            $("#category").val("item.category");

            alert("Se ha guardado la cabana.")
            limpiarFormularioCabana();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, - ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}*/

/// PUT

function actualizarCabana(idCabin) {

    if ($("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#name").val().length == 0 || $("#description").val().length == 0 || $("#select-category").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {

        let myDataCabana = {
            id: idCabin,
            brand: $("#brand").val(),
            rooms: $("#rooms").val(),
            name: $("#name").val(),
            description: $("#description").val(),
            category: { id: +$("#select-category").val() },

        };
        console.log(myDataCabana);
        let dataToSend = JSON.stringify(myDataCabana);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Cabin/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaCabana) {
                $("#resultadoCabana").empty();
                $("#brand").val("");
                $("#rooms").val("");
                $("#category").val("");
                $("#name").val("");
                $("#description").val("");
                TraerCabana();
                alert("Se ha Actualizado correctamente la cabana.")
            }
        });
    }

}
/// DELETE

function eliminarCabana(idCabin) {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Cabin/" + idCabin,
        type: "DELETE",
        success: function (respuestaCabana) {
            $("#resultadoCabana").empty();

            TraerCabana();
            alert("Se ha Eliminado la cabana.")
        }
    });

}


function limpiarFormularioCabana() {
    $("#brand").val("");
    $("#rooms").val("");
    $("#category").val("");
    $("#name").val("");
    $("#description").val("");
}


function editarCabana(id) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Cabin/" + id,
        type: 'GET',

        success: function (respuestaCabana) {
            console.log(respuestaCabana);
            var item = respuestaCabana;

            $("#brand").val(item.name);
            $("#rooms").val(item.rooms);
            $("#category").val(item.category);
            $("#name").val(item.name);
            $("#description").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}


///CLIENTES ////////////////////////////////////////////////////////////////////////////////////////
/// GET
function TraerCliente() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.125.160:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaClient) {
            console.log(respuestaClient);
            pintarRespuestaClient(respuestaClient);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function pintarRespuestaClient(respuestaClient) {
    let myTableClient = "<table  >";
    myTableClient += "<tr border: 1>";
    myTableClient += "<th bgcolor = steelblue> Id Cliente </th>";
    myTableClient += "<th bgcolor = steelblue>  Correo </th>";
    myTableClient += "<th bgcolor = steelblue> Contraseña </th>";
    myTableClient += "<th bgcolor = steelblue> Nombre </th>";
    myTableClient += "<th bgcolor = steelblue> Edad </th>";
    myTableClient += "<th bgcolor = steelblue> Mensaje </th>";
    myTableClient += "</tr>";
    for (i = 0; i < respuestaClient.length; i++) {
        myTableClient += "<tr>";
        myTableClient += "<td>" + respuestaClient[i].idClient + "</td>";
        myTableClient += "<td>" + respuestaClient[i].email + "</td>";
        myTableClient += "<td>" + respuestaClient[i].password + "</td>";
        myTableClient += "<td>" + respuestaClient[i].name + "</td>";
        myTableClient += "<td>" + respuestaClient[i].age + "</td>";
        myTableClient += "<td>" + respuestaClient[i].messages.messageText + "</td>";
        //myTableClient += "<td>" + respuestaClient[i].reservation.startDate + "" + respuestaClient[i].reservation.devolutionDate + "" +"</td>";
        myTableClient += "<td> <button onclick='editarCliente(" + respuestaClient[i].idClient + ")'>Editar Cliente!!</button>";
        myTableClient += "<td> <button onclick='eliminarCliente(" + respuestaClient[i].idClient + ")'>Eliminar Cliente!!</button>";
        myTableClient += "<td> <button onclick='actualizarCliente(" + respuestaClient[i].idClient + ")'>Actualizar Cliente!!</button>";
        myTableClient += "</tr>";
    }
    myTableClient += "</table>";
    $("#resultadoClient").append(myTableClient);

}

////POST 

function guardarCliente() {
    let myDataClient = {
        name: $("#name2").val(),
        email: $("#email1").val(),
        password: $("#password1").val(),
        age: $("#age").val(),

    };

    if (!validarCampo($("#name2, #email1, #password1, #age"))) {
        alert("Los campos estan vacios, debe llenar los datos");
        return;
    }
    if (!validarCampo($("#name2"))) {
        alert("Debe ingresar el nombre del cliente");
        return;
    }
    if (!validarCampo($("#email1"))) {
        alert("Debe ingresar el correo del cliente");
        return;
    }
    if (!validarCampo($("#password1"))) {
        alert("Debe ingresar la contraseña del cliente");
        return;
    }
    if (!validarCampo($("#age"))) {
        alert("Debe ingresar la edad del  cliente");
        return;
    }

    console.log(myDataClient);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myDataClient),

        url: "http://129.151.125.160:8080/api/Client/save",
        success: function (respuestaClient) {
            $("#resultadoClient").empty();
            $("#name2").val("");
            $("#email1").val("");
            $("#password1").val("");
            $("#age").val("");
            console.log(respuestaClient);
            TraerCliente();
            alert("Se guardo correctamente el Cliente.");


            limpiarFormulario();

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });

}

/// PUT

function actualizarCliente(idCliente) {
    if ($("#name2").val().length == 0 || $("#email1").val().length == 0 || $("#password1").val().length == 0 || $("#age").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myDataClient = {
            idClient: idCliente,
            name: $("#name2").val(),
            email: $("#email1").val(),
            password: $("#password1").val(),
            age: $("#age").val(),


        };
        console.log(myDataClient);
        let dataToSend = JSON.stringify(myDataClient);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaClient) {
                $("#resultadoClient").empty();
                $("#idClient").val("");
                $("#name2").val("");
                $("#email1").val("");
                $("#password1").val("");
                $("#age").val("");
                TraerCliente();
                alert("Se ha Actualizado correctamente Cliente")
            }
        });
    }
}

/// DELETE

function eliminarCliente(idClient) {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Client/" + idClient,
        type: "DELETE",
        success: function (respuestaClient) {
            $("#resultadoClient").empty();

            TraerCliente();
            alert("Se ha Eliminado el cliente.")
        }
    });

}

function limpiarFormulario() {
    $("#name2").val("");
    $("#email1").val("");
    $("#password1").val("");
    $("#age").val("");
}

function editarCliente(id) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Client/" + id,
        type: 'GET',

        success: function (respuestaClient) {
            console.log(respuestaClient);
            var item = respuestaClient;

            $("#name2").val(item.name);
            $("#email1").val(item.email);
            $("#password1").val(item.password);
            $("#age").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}

/// MENSAJES///////////////////////////////////////////////////////////////////////////////////////////

function autoInicioRelacionClient() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.125.160:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaClient) {

            let $select = $("#select-client");
            $.each(respuestaClient, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');

            });
        }

    })
}
function autoInicioRelacionCabana() {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaCabana) {

            let $select = $("#select-cabin");
            $.each(respuestaCabana, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');

            });
        }

    })
}

/// GET
function TraerMensaje() {
    $.ajax({
        url: "http://129.151.125.160:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaMensaje) {
            console.log(respuestaMensaje);
            pintarRespuestaMensaje(respuestaMensaje);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

function pintarRespuestaMensaje(respuestaMensaje) {
    let myTableMensaje = "<table>";
    myTableMensaje += "<tr >";
    myTableMensaje += "<th bgcolor = steelblue>  Mensaje </th>";
    myTableMensaje += "<th bgcolor = steelblue> Cabaña </th>";
    myTableMensaje += "<th bgcolor = steelblue> Cliente </th>";
    myTableMensaje += "</tr>";

    for (i = 0; i < respuestaMensaje.length; i++) {
        myTableMensaje += "<tr>";
        myTableMensaje += "<td>" + respuestaMensaje[i].messageText + "</td>";
        myTableMensaje += "<td>" + " NOMBRE: " + respuestaMensaje[i].cabin.name + " - MARCA: " + respuestaMensaje[i].cabin.brand + " - HABITACIONES: " + respuestaMensaje[i].cabin.rooms + " - DESCRIPCIÓN: " + respuestaMensaje[i].cabin.description + " - CATEGORIA - ID: " + respuestaMensaje[i].cabin.category.id + " - CATEGORIA - NAME: " + respuestaMensaje[i].cabin.category.name + " - CATEGORIA - DESRIPCIÓN: " + respuestaMensaje[i].cabin.category.description + "</td>";
        myTableMensaje += "<td>" + " CORREO: " + respuestaMensaje[i].client.email + " - NOMBRE: " + respuestaMensaje[i].client.name + "  - EDAD: " + respuestaMensaje[i].client.age + "</td>";
        myTableMensaje += "<td> <button onclick='editarMensaje(" + respuestaMensaje[i].idMessage + ")'>Editar Mensaje </button>";
        myTableMensaje += "<td> <button onclick='eliminarMensaje(" + respuestaMensaje[i].idMessage + ")'>Eliminar Mensaje </button>";
        myTableMensaje += "<td> <button onclick='actualizarMensaje(" + respuestaMensaje[i].idMessage + ")'>Actualizar Mensaje </button>";

        myTableMensaje += "</tr>";
    }
    myTableMensaje += "</table>";
    $("#resultadoMensaje").append(myTableMensaje);

}

///POST 
function guardarMensaje() {
    if ($("#messagetext").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {

        let myDataMensaje = {
            messageText: $("#messagetext").val(),
            cabin: { id: +$("#select-cabin").val() },
            client: { idClient: +$("#select-client").val() },
        };

        console.log(myDataMensaje);
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(myDataMensaje),
            url: "http://129.151.125.160:8080/api/Message/save",

            success: function (respuestaMensaje) {
                $("#resultadoMensaje").empty();
                $("#messagetext").val("");
                TraerMensaje();
                alert("Se ha guardado el mensaje.")
                limpiarFormularioMensaje();
                console.log(respuestaMensaje);

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }
}

//// PUT

function actualizarMensaje(idMensaje) {
    if ($("#messagetext").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myDataMensaje = {
            idMessage: idMensaje,
            messageText: $("#messagetext").val(),
            cabin: { id: +$("#select-cabin").val() },
            client: { idClient: +$("#select-client").val() },
        };
        console.log(myDataMensaje);
        let dataToSend = JSON.stringify(myDataMensaje);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Message/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaMensaje) {
                $("#resultadoMensaje").empty();
                $("#messagetext").val("");
                limpiarFormularioMensaje();
                alert("Se ha Actualizado correctamente el Mensaje")
                TraerMensaje();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema, ' + xhr.status);
                limpiarFormularioMensaje();
            },
        });
    }
}

//// DELETE

function eliminarMensaje(idMensaje) {
    let myDataMensaje = {
        id: idMensaje
    };
    let dataToSend = JSON.stringify(myDataMensaje);
    $.ajax({
        url: "http://129.151.125.160:8080/api/Message/" + idMensaje,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaMensaje) {
            $("#resultadoMensaje").empty();
            TraerMensaje();
            limpiarFormularioMensaje();
            alert("Se ha Eliminado el Mensaje.")
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
            limpiarFormularioMensaje();
        },
    });
}

function limpiarFormularioMensaje() {
    $("#id3").val("");
    $("#messagetext").val("");

}

function validarCampo(campo) {
    if (campo.val() != "")
        return true
    else
        return false;
}

/// EDITAR

function editarMensaje(idMessage) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Message/" + idMessage,
        type: 'GET',

        success: function (respuestaMensaje) {
            console.log(respuestaMensaje);
            var item = respuestaMensaje;

            $("#messagetext").val(item.messageText);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}

/// RESERVATION////////////////////////////////////////////////////////////////////////////////////

function autoInicioClient() {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaClient) {

            let $select = $("#select-client");
            $.each(respuestaClient, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');

            });
        }

    })
}
function autoInicioCabin() {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaCabana) {

            let $select = $("#select-cabin");
            $.each(respuestaCabana, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');

            });
        }

    })
}

/// GET
function TraerReservation() {
    $.ajax({

        url: "http://129.151.125.160:8080/api/Reservation/all",
        type: "GET",
        async: false,
        datatype: "JSON",
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaReservation) {
            pintarRespuestaReservation(respuestaReservation);
            console.log(respuestaReservation);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },

    });
}

function pintarRespuestaReservation(respuestaReservation) {
    let myTableReservation = "<table>";
    myTableReservation += "<tr >";
    myTableReservation += "<th bgcolor = gold > Id Reservación </th>";
    myTableReservation += "<th bgcolor = gold > Fecha de Inicio </th>";
    myTableReservation += "<th bgcolor = gold > Fecha de Devolución </th>";
    myTableReservation += "<th bgcolor = gold > Estado de la Reserva </th>";
    myTableReservation += "<th bgcolor = gold > Cabaña </th>";
    myTableReservation += "<th bgcolor = gold > Cliente </th>";
    myTableReservation += "<th bgcolor = gold > Calificación </th>";
    myTableReservation += "</tr>";

    for (i = 0; i < respuestaReservation.length; i++) {
        myTableReservation += "<tr>";
        myTableReservation += "<td>" + respuestaReservation[i].idReservation + "</td>";
        myTableReservation += "<td>" + respuestaReservation[i].startDate + "</td>";
        myTableReservation += "<td>" + respuestaReservation[i].devolutionDate + "</td>";
        myTableReservation += "<td>" + respuestaReservation[i].status + "</td>";
        myTableReservation += "<td>" + " NOMBRE: " + respuestaReservation[i].cabin.name + " - MARCA: " + respuestaReservation[i].cabin.brand + " - HABITACIONES: " + respuestaReservation[i].cabin.rooms + " - DESCRIPCIÓN: " + respuestaReservation[i].cabin.description + " - CATEGORIA - ID: " + respuestaReservation[i].cabin.category.id + " - CATEGORIA - NAME: " + respuestaReservation[i].cabin.category.name + " - CATEGORIA - DESRIPCIÓN: " + respuestaReservation[i].cabin.category.description + "</td>";
        myTableReservation += "<td>" + " ID CLIENTE: " + respuestaReservation[i].client.idClient + " - NOMBRE: " + respuestaReservation[i].client.name + " - CORREO: " + respuestaReservation[i].client.email + "</td>";
        myTableReservation += "<td>" + respuestaReservation[i].score + "</td>";
        myTableReservation += "<td> <button onclick='editarReservation(" + respuestaReservation[i].idReservation + ")'>Editar Reservación !!</button>";
        myTableReservation += "<td> <button onclick='eliminarReservation(" + respuestaReservation[i].idReservation + ")'>Eliminar Reservación !!</button>";
        myTableReservation += "<td> <button onclick='actualizarReservation(" + respuestaReservation[i].idReservation + ")'>Actualizar Reservación !!</button>";
        myTableReservation += "</tr>";
    }
    myTableReservation += "</table>";
    $("#resultadoReservation").append(myTableReservation);
}

//// POST 

function guardarReservation() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
        alert("Todos los campos son Obligatorios")
    } else {
        let myDataReservation = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            cabin: { id: +$("#select-cabin").val() },
            client: { idClient: +$("#select-client").val() },

        }
        let dataToSend = JSON.stringify(myDataReservation);
        console.log(dataToSend)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://129.151.125.160:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "JSON",

            success: function (myDataReservation) {
                console.log(myDataReservation);
                $("#resultadoReservation").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                TraerReservation();
                alert("Se ha guardado correctamente la reservación.")
                limpiarFormularioReservation();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente - " + textStatus);
            },
        });
    }
}

function limpiarFormularioReservation() {
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#select-cabin").val("Seleccionar Cabaña");
    $("#select-client").val("Seleccionar Cliente");
}

function mostrarUnaCategoriaEspecifica(idCategory) {
    $.ajax({
        datatype: "JSON",
        url: "http://129.151.125.160:8080/api/Category/all" + idCategory,
        type: "GET",
        success: function (respuestaCategoria) {
            console.log(respuestaCategoria);
            var item = respuestaCategoria.items[0];

            $("#resultadoCategory").empty();
            $("#id1").val("item.id");
            $("#name1").val("item.name");
            $("#description1").val("item.description");

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

///PUT 

function actualizarReservation(idReservacion) {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let myDataReservation = {
            idReservation: idReservacion,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),

        };
        console.log(myDataReservation);
        let dataToSend = JSON.stringify(myDataReservation);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Reservation/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaReservation) {
                $("#resultadoReservation").empty();
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                TraerReservation();
                alert("Se ha Actualizado correctamente la reservación.")
            }
        });
    }

}

/// DELETE

function eliminarReservation(idReservation) {
    let myDataReservation = {
        id: idReservation
    };
    let dataToSend = JSON.stringify(myDataReservation);
    $.ajax({
        url: "http://129.151.125.160:8080/api/Reservation/" + idReservation,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaReservation) {
            $("#resultadoReservation").empty();

            TraerReservation();
            alert("Se ha Eliminado la reservacion.")
        }
    });

}

/// EDITAR

function editarReservation(idReservation) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Reservation/" + idReservation,
        type: 'GET',

        success: function (respuestaReservation) {
            console.log(respuestaReservation);
            var item = respuestaReservation;

            $("#messagetext").val(item.messageText);
            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}

//// CALIFICACIONES ////////////////////////////////////////////////////////////////////////////////////////

function autoInicioRelacionReservation() {

    $.ajax({
        url: "http://129.151.125.160:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaReservation) {

            let $select = $("#select-reservation");
            $.each(respuestaReservation, function (id, name) {
                $select.append('<option value=' + name.idReservation + '>' + name.idReservation + '</option>');

            });
        }

    })
}

/// GET
function TraerScore() {
    $.ajax({

        url: "http://129.151.125.160:8080/api/Score/all",
        type: "GET",
        async: false,
        datatype: "JSON",
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        success: function (respuestaScore) {
            pintarRespuestaReservation(respuestaScore);
            console.log(respuestaScore);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },

    });
}

function pintarRespuestaScore(respuestaScore) {
    let myTableScore = "<table>";
    myTableScore += "<tr >";
    myTableScore += "<th bgcolor = lightblue > Id Calificación </th>";
    myTableScore += "<th bgcolor = lightblue > Calificación </th>";
    myTableScore += "<th bgcolor = lightblue > Mensaje </th>";
    myTableScore += "<th bgcolor = lightblue > Reservación </th>";
    myTableSocore += "</tr>";

    for (i = 0; i < respuestaScore.length; i++) {
        myTableScore += "<tr>";
        myTableScore += "<td>" + respuestaScore[i].idScore + "</td>";
        myTableScore += "<td>" + respuestaScore[i].score + "</td>";
        myTableScore += "<td>" + respuestaScore[i].message + "</td>";
        myTableScore += "<td>" + respuestaScore[i].reservation + "</td>";
        myTableScore += "<td> <button onclick='editarScore(" + respuestaScore[i].id + ")'>Editar calificación !!</button>";
        myTableScore += "<td> <button onclick='eliminarScore(" + respuestaScore[i].id + ")'>Eliminar Calificación !!</button>";
        myTableScore += "<td> <button onclick='actualizarScore(" + respuestaScore[i].id + ")'>Actualizar Calificación !!</button>";
        myTableScore += "</tr>";
    }
    myTableScore += "</table>";
    $("#resultadoScore").append(myTableScore);
}

//// POST 

function guardarScore() {
    if ($("#Score").val().length == 0 || $("#Message").val().length == 0) {
        alert("Todos los campos son Obligatorios")
    } else {
        let myDataScore = {
            score: $("#Score").val(),
            message: $("#Message").val(),
            reservation: { idClient: +$("#select-reservation").val() },

        }
        let dataToSend = JSON.stringify(myDataScore);
        console.log(dataToSend)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://129.151.125.160:8080/api/Score/save",
            data: dataToSend,
            datatype: "JSON",

            success: function (myDataScore) {
                console.log(myDataScore);
                $("#resultadoScore").empty();
                $("#Score").val("");
                $("#Message").val("");
                TraerScore();
                alert("Se ha guardado correctamente la calificación.")
                limpiarFormularioScore();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente - " + textStatus);
            },
        });
    }
}

function limpiarFormularioScore() {
    $("#Score").val("");
    $("#Message").val("");
    $("#select-reservation").val("Seleccionar Reservacion");
}

function mostrarUnaCategoriaEspecifica(idCategory) {
    $.ajax({
        datatype: "JSON",
        url: "http://129.151.125.160:8080/api/Category/all" + idCategory,
        type: "GET",
        success: function (respuestaCategoria) {
            console.log(respuestaCategoria);
            var item = respuestaCategoria.items[0];

            $("#resultadoCategory").empty();
            $("#id1").val("item.id");
            $("#name1").val("item.name");
            $("#description1").val("item.description");

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
    });
}

///PUT 

function actualizarScore (idScore) {
    if ($("#Score").val().length == 0 || $("#Message").val().length == 0) {
        alert("Todos los campos son Obligatorios")
    } else {
        let myDataScore = {
            id: idScore,
            score: $("#Score").val(),
            message:$("#Message").val(),
            

        };
        console.log(myDataScore);
        let dataToSend = JSON.stringify(myDataScore);
        $.ajax({
            url: "http://129.151.125.160:8080/api/Score/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuestaScore) {
                $("#resultadoScore").empty();
                $("#id").val("");
                $("#Score").val("");
                $("#Message").val("");
               
                TraerScore();
                alert("Se ha Actualizado correctamente la calificación.")
            }
        });
    }

}

/// DELETE

function eliminarReservation(idScore) {
    let myDataScore = {
        id: idScore
    };
    let dataToSend = JSON.stringify(myDataScore);
    $.ajax({
        url: "http://129.151.125.160:8080/api/Score/" + idScore,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaScore) {
            $("#resultadoScore").empty();

            TraerScore();
            alert("Se ha Eliminado la calificación.")
        }
    });

}

/// EDITAR

function editarScore(idScore) {
    $.ajax({
        dataType: 'JSON',
        url: "http://129.151.125.160:8080/api/Reservation/" + idScore,
        type: 'GET',

        success: function (respuestaScore) {
            console.log(respuestaScore);
            var item = respuestaScore;

            $("#Score").val(item.score);
            $("#Message").val(item.message);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("solicitud realizada");
        }
    });
}

