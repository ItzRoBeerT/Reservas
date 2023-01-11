const yargs = require('yargs');
const reservas = require('./Reserva.js');

yargs.command({
    command: 'addReserva',
    describe: 'Add la reserva',
    builder:{
        nombre:{
            describe: 'nombre del lugar de la reserva',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        reservas.addReserva(argv.nombre);
    }
})

yargs.command({
    command: 'borrarReserva',
    describe: 'Borra la reserva',
    builder:{
        nombre:{
            describe: 'nombre del lugar de la reserva',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        reservas.removeReserva(argv.nombre);
    }
})

yargs.command({
    command: 'listarReservas',
    describe: 'Lista las reservas',
    handler(argv){
        reservas.listarReservas();
    }
})

yargs.parse()