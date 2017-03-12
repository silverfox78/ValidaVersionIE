var Evaluacion = {
    EsAntiguIE: function() {
        try {
            if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
                return true;
            }

            return false;
        } catch (e) {
            var mensajeError = "Error al evaluar la version del IE, comuniquese con el administrador del sitio.";
            var mensajeInterno = "Error al evaluar la version del IE, comuniquese con el administrador del sitio. [" + e.name + "] :" + e.message;
            Error.Alerta(mensajeError, mensajeInterno, false);
        }
    }
}