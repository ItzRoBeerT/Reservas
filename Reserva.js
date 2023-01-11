const fs = require('fs');

const addReserva = (nombre) => {
    const reservas = loadReservas();
    reservas.push({
        nombre: nombre
    })
    saveReservas(reservas)
    console.log('se añadió una nueva reserva');
}

const removeReserva = (nombre) => {
    const reservas = loadReservas();
    const reservasFiltradas = reservas.filter(res=> res.nombre !== nombre);
    if (reservas.length == reservasFiltradas.length) {
        console.log('No se encontro la reserva especificada');
    }else{
        console.log('Reservas eliminadas exitosamentes');
    }
    saveReservas(reservasFiltradas);
}

const listarReservas = () => {
    const reservas = loadReservas();
    console.log('tus reservas: ');

    reservas.forEach(reserva => {
        console.log(reserva.nombre);
    });
}

const saveReservas = (reservas) =>{
    const dataJSON = JSON.stringify(reservas)
    fs.writeFileSync('reservas.json',dataJSON);
}

const loadReservas = ()=>{
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