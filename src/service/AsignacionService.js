const mapper = require("automapper-js");
const axios = require('axios')

class AsignacionService{
    constructor({MedicoService, ConsultaService}){
        this._medicoService = MedicoService;
        this._consultaService = ConsultaService;
    }

    async asignarConsulta(consultaId, dniPaciente){

        const medicoParaAsignarDni = await this._medicoService.getMedicoLibre();

        const consultaAsignada = {
            id: consultaId,
            MedicoDni: medicoParaAsignarDni,
            dni: dniPaciente
        }

        // const consulta = this._consultaService.mapear(consultaGenerica);
        // consulta.asignarMedico(medicoParaAsignarDni);
        // const consultaGenericaAsignada = consulta.toObject(); // Mirar esto

        await this._consultaService.create(consultaAsignada).catch(e => {return false;});

        return true;
    }

}

module.exports = AsignacionService;