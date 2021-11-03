function TraerReportsStatus() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.125.160:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaStatus) {
            console.log(respuestaStatus);
            
            pintarRespuesta(respuestaStatus);

            
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        }
    });
}

function pintarRespuesta(respuestaStatus) {
    let myTableStatus = "<table>";
    myTableStatus += "<tr>";
    myTableStatus += "<th colspan= 2 , bgcolor = lightblue> Reservas completas </th>";
    myTableStatus += "<th colspan= 2 , bgcolor = lightblue > Reservas canceladas </th>";
    myTableStatus += "<tr>";

    myTableStatus += "<tr>";
    myTableStatus += "<th > Completed:</th>" + "<td >" + respuestaStatus.completed + "</td>";
    myTableStatus += "<th  > Cancelled:</th>";
    myTableStatus += "<td >" + respuestaStatus.cancelled + "</td>";
    myTableStatus += "</tr>";
    myTableStatus += "</table>";
    $("#resultadoStatus").html(myTableStatus);

}
////////Reporte Clientes y Cantidad de reservas por cliente

function TraerReporteClientes() {
    $.ajax({
        url: "http://129.151.125.160:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaCliente) {
            console.log(respuestaCliente);
            pintarRespuestaClientes(respuestaCliente);
        }
    });
}

function pintarRespuestaClientes(respuestaCliente) {

    let myTableCliente = "<table>";
    myTableCliente += "<tr>";
    myTableCliente += "<th bgcolor = lightcyan > Total </th>";
    myTableCliente += "<th bgcolor = lightcyan > Nombre </th>";
    myTableCliente += "<th bgcolor = lightcyan > Correo </th>";
    myTableCliente += "<th bgcolor = lightcyan > Edad </th>";
    myTableCliente += "<tr>";

    for (i = 0; i < respuestaCliente.length; i++) {
        
        myTableCliente += "<th>" +"Total: " + respuestaCliente[i].total + "</th>";
        myTableCliente += "<td>" + respuestaCliente[i].client.name + "</td>";
        myTableCliente += "<td>" + respuestaCliente[i].client.email + "</td>";
        myTableCliente += "<td>" + respuestaCliente[i].client.age + "</td>";
        myTableCliente += "</tr>";
    }
    myTableCliente += "</table>";
    $("#resultadoReportes").html(myTableCliente);
}

/////////////Generar Reporte en un tiempo determinado

function TraerReporteDate() {



    var fechaInicio = document.getElementById("DstarDate").value;
    var fechaCierre = document.getElementById("DdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url: "http://129.151.125.160:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuestaDate) {
            console.log(respuestaDate);
            pintarRespuestaDate(respuestaDate);
        }
    });
}
function pintarRespuestaDate(respuestaDate) {

    let myTableDate = "<table>";
    myTableDate += "<tr>";
    myTableDate += "<th bgcolor = lightblue > Total </th>";
    myTableDate += "<th bgcolor = lightblue > Fecha de Devolución </th>";
    myTableDate += "<th bgcolor = lightblue > Fecha de Inicio </th>";
    myTableDate += "<th bgcolor = lightblue > Estado Date </th>";
    myTableDate += "<tr>";

    for (i = 0; i < respuestaDate.length; i++) {
        myTableDate += "<th>total</th>";
        myTableDate += "<td>" + respuestaDate[i].devolutionDate + "</td>";
        myTableDate += "<td>" + respuestaDate[i].startDate + "</td>";
        myTableDate += "<td>" + respuestaDate[i].status + "</td>";
        myTableDate += "</tr>";
    }
    myTableDate += "</table>";
    $("#resultadoDate").html(myTableDate);
}

$(function(){
    $('.submit').on('submit', function(event){
        event.preventDefault();
    });
});