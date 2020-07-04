
const URL_Pacientes = 'http://40.118.242.96:12600';

urlsPacientes = {
    URL_ConfirmarRecepcion: URL_Pacientes+'/api/FormularioParaAnalisis/SetRecibido',
    URL_ConsultasNuevas: URL_Pacientes+'/api/FormularioParaAnalisis/GetFormulariosIdByEstado/0',
}

module.exports = urlsPacientes;