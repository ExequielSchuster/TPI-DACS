const request = require('request-promise')
const urlPacientes = require('../../config/environments/urls')
const axios = require('axios')

class ConsultaController {
    constructor({ ConsultaService, AsignacionService, DiagnosticoService }) {
        this._consultaService = ConsultaService;
        this._asignacionService = AsignacionService;
        this._diagnosticoService = DiagnosticoService;
    }

    async getConsultas(req, res) {
        await this._consultaService.getAll()
            .then(consultas => res.status(200).json(consultas))
            .catch(error => {
                res.status(400).json({ msg: error.message });
            });
    }

    async getConsultaSinResponder(req, res) {
        const { medicodni } = req.params;
        await this._consultaService.getSinResponder(medicodni)
            .then(consultas => res.status(200).json(consultas))
            .catch(error => {
                res.status(400).json({ msg: error.message });
            });
    }

    async getConsultaRespondidas(req, res) {
        const { medicodni } = req.params;
        await this._consultaService.getRespondidas(medicodni)
            .then(consultas => res.status(200).json(consultas))
            .catch(error => {
                res.status(400).json({ msg: error.message });
            });
    }

    async createConsulta(req, res) {
        await this._consultaService.create(req.body)
            .then(consultaCreated => res.status(201).json(consultaCreated))
            .catch(error => {
                res.status(400).json({ msg: error.message });
            });
    }

    async diagnosticar(req, res) {
        //await this._diagnosticoService.diagnosticar(req.body, res);
        let consultaDiagnosticada = req.body;

        if (consultaDiagnosticada.diagnostico == null) {
            res.status(400).json({ msg: "Diagnostico nulo no permitido" });
        } else {
            // Guardo la consulta diagnosticada en mi API
            this._consultaService.update(consultaDiagnosticada.id, consultaDiagnosticada)
                .then(consultaDiagnosticada => res.status(201).json({ msg: "Diagnosticacion Correcta" }))
                .catch(error => {
                    res.status(400).json({ msg: error.message });
                });
        }
    }

    async obtenerConsultas() {
        //AQUI SE HACE UN GET AL GRUPO DE PACIENTES
        let config = {
            headers: {
                'accept': 'text/plain',
            },
            responseType: 'text'
        }

        let consultasNew;

        await axios.get(urlPacientes.URL_ConsultasNuevas)
            .then((async function (consultasNuevas) {
                consultasNew = consultasNuevas.data;
            }))

            .catch(e => {
                console.log(e.message);
                return false;
            });

        let dniPaciente;
        consultasNew.forEach(async (consultaId) => {
            /* await axios.get(consultaId)
                .then(datosConsulta => 
                    dniPaciente = datosConsulta.PacienteDni)
                .catch(e => {
                    dniPaciente = 0}); */
            dniPaciente = 0; // sacar

            const okey = await this._asignacionService.asignarConsulta(consultaId, dniPaciente)
                .catch(e => {
                    console.log(e.message);
                });
            if (okey) {
                await axios.post(urlPacientes.URL_ConfirmarRecepcion, consultaId); // Le decimos que si
            }
        })

        return true;
    }


}

module.exports = ConsultaController;
