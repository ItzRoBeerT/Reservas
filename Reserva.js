const fs = require('fs');
var request = require('request');
const url1 = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=5be80851b90b58e15545aec4ab039100';
const url2 = 'http://api.weatherstack.com/current?access_key=de2d50a87c6d53ad45cef9679c49f16e&query=Jerez';



request({ url: url1 }, (error, response) => {
    let datos = JSON.parse(response.body)
    console.log( "aaaa "+datos.current)
})


const addReserva = (nombre) => {
    const reservas = loadReservas();
    let miTemperatura;
    request({ url: url2 }, (error, response) => {
        const data = JSON.parse(response.body)
        miTemperatura = data.current.temperature
        reservas.push({
            nombre: nombre,
            fechaInicio: new Date(),
            temperatura: miTemperatura
        })
        saveReservas(reservas)
    })
    console.log('se añadió una nueva reserva');
}

const removeReserva = (nombre) => {
    const reservas = loadReservas();
    const reservasFiltradas = reservas.filter(res => res.nombre !== nombre);
    if (reservas.length == reservasFiltradas.length) {
        console.log('No se encontro la reserva especificada');
    } else {
        console.log('Reservas eliminadas exitosamentes');
    }
    saveReservas(reservasFiltradas);
}

const listarReservas = () => {
    const reservas = loadReservas();
    console.log('tus reservas: ');

    reservas.forEach(reserva => {
        console.log(reserva.nombre + "\n" + reserva.fechaInicio+ "\n" + reserva.temperatura+"°");
    });
}

const saveReservas = (reservas) => {
    const dataJSON = JSON.stringify(reservas)
    fs.writeFileSync('reservas.json', dataJSON);
}

const loadReservas = () => {
    try {
        const dataBuffer = fs.readFileSync('./reservas.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

module.exports = {
    addReserva: addReserva,
    removeReserva: removeReserva,
    listarReservas: listarReservas,
}