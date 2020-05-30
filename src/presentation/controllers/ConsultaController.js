class ConsultaController {
    constructor({ConsultaService, AsignacionService, DiagnosticoService}){
        this._consultaService = ConsultaService;
        this._asignacionService = AsignacionService;
        this._diagnosticoService = DiagnosticoService;
    }

    async getConsultas(req,res){
        await this._consultaService.getAll()
            .then(consultas => res.status(200).json(consultas))
            .catch(error => {
                res.status(404).json({msg: error.message});  
            });
    }

    async getConsultaSinResponder(req,res){
        const { medicodni } = req.params;
        await this._consultaService.getSinResponder(medicodni)
            .then(consultas => res.status(200).json(consultas))
            .catch(error => {
                res.status(404).json({msg: error.message});  
            });
    }

    async createConsulta(req, res) {
        await this._consultaService.create(req.body)
            .then(consultaCreated => res.status(201).json(consultaCreated))
            .catch(error => {
                res.status(412).json({msg: error.message});  
        });
    }

    async recibirConsulta(req, res) {
        await this._asignacionService.asignarConsulta(req.body.Consulta, res);
    }

    async diagnosticar(req, res) {
        await this._diagnosticoService.diagnosticar(req.body, res);
    }

    async guardarConsulta(req, res) {
        const consulta = {
            "dni": 3000000,
            "nombre": "Jorge",
            "apellido": "Gomez",
            "fechaNacimiento": "2000",
            "email": "juangomez@yahoo.com",
            "telefono": "42",
            "sexo": "Masculino"
        };
        var options = {
            method: 'POST',
            uri: 'http://api.posttestserver.com/post',
            body: consulta,
            json: true // Automatically stringifies the body to JSON
        }
        this._diagnosticoService.guardarConsulta(options,res);  //debo encotrar la forma de mandar ta una consuta de aca
        }


}

module.exports = ConsultaController;
