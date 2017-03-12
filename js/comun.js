var Pagina = {
    Redirigir: function(pagina) {
        var url = $(location).attr('protocol') + '\\\\' + $(location).attr('host') + '\\' + pagina;

        if (url.indexOf('?') <= -1) {
            url = url + "?v=" + Math.random();
        } else {
            url = url + "&v=" + Math.random();
        }

        window.console && console.log('Redirige: ' + url);
        window.location.href = url;
    },

    BotonLimpio: function(nombre) {
        $('#' + nombre).attr('onclick', '').unbind('click');
        $('#' + nombre).prop('onclick', null).off('click');
        $('#' + nombre).off('click');
        $('#' + nombre).unbind('click');
    }
}

var Error = {
    Alerta: function(mensajePublico, mensajePrivado, informacionLocal) {
        window.console && console.log('Mensaje privado: ' + mensajePrivado);
        Mensajeria.CargardoFin();

        if (informacionLocal) {
            var htmlAlert = "<div class='alert alert-danger alert-dismissable'>";
            htmlAlert = htmlAlert + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>";
            htmlAlert = htmlAlert + "<span class='pficon pficon-close'></span></button>";
            htmlAlert = htmlAlert + "<span class='pficon pficon-error-circle-o'></span>";
            htmlAlert = htmlAlert + "<strong>Error</strong>, " + mensajePublico;
            htmlAlert = htmlAlert + "</div>";

            $("#mensajes").append(htmlAlert);
            $("#mensajes").focus();
        } else {
            window.console && console.log('Mensaje publico: ' + mensajePublico);
            var mensajeEncrip = Base64.encode(mensajePublico);
            Pagina.Redirigir('accessdenied.html?mensaje=' + mensajeEncrip);
        }
    }
};

var Mensajeria = {
    Exito: function(mensaje) {
        var htmlAlert = "<div class='alert alert-success alert-dismissable'>";
        htmlAlert = htmlAlert + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>";
        htmlAlert = htmlAlert + "<span class='pficon pficon-close'></span></button>";
        htmlAlert = htmlAlert + "<span class='pficon pficon-ok'></span>";
        htmlAlert = htmlAlert + "<strong>Exito</strong>, " + mensaje;
        htmlAlert = htmlAlert + "</div>";

        $("#mensajes").append(htmlAlert);
        $("#mensajes").focus();
    },

    Advertencia: function(mensaje) {
        var htmlAlert = "<div class='alert alert-warning alert-dismissable'>";
        htmlAlert = htmlAlert + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>";
        htmlAlert = htmlAlert + "<span class='pficon pficon-close'></span></button>";
        htmlAlert = htmlAlert + "<span class='pficon pficon-warning-triangle-o'></span>";
        htmlAlert = htmlAlert + "<strong>Advertencia</strong>, " + mensaje;
        htmlAlert = htmlAlert + "</div>";

        $("#mensajes").append(htmlAlert);
        $("#mensajes").focus();
    },

    CargardoInicio: function() {
        var htmlload = "<div class='modal fade' id='ModalLoading' role='dialog'><div class='modal-dialog'>";
        htmlload = htmlload + "<div class='modal-content'><div class='modal-body' style='padding:40px 50px; text-align: center; clear: left;'>";
        htmlload = htmlload + "<div class='panel panel-default'>";
        htmlload = htmlload + "<div class='panel-heading'><h3 class='panel-title'>Espera unos momentos</h3></div>";
        htmlload = htmlload + "<div class='panel-body'>";
        htmlload = htmlload + "<h1><div class='spinner spinner-lg spinner-inline'></div> Procesando informacion...</h1>";
        htmlload = htmlload + "</div></div></div></div>";
        htmlload = htmlload + "</div></div>";

        $("#cargando").html(htmlload);
        $("#ModalLoading").modal({ backdrop: 'static', keyboard: false });
        return false;
    },

    CargardoFin: function() {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $("#ModalLoading").modal("hide");
        $("#ModalLoading").remove();

        $(".modal").each(function() {
            $(this).modal("hide");
            $(this).removeClass('in')
            $(this).attr('aria-hidden', true)
            $(this).off('click.dismiss.modal');
            $(this).hide();
            $(this).remove();
        });

        $("#cargando").html("");
        return false;
    },

    ConfirmacionEliminacion: function(titulo, cuerpo, funcion) {
        var htmlload = "<div class='modal fade' id='ModalLoading' role='dialog'><div class='modal-dialog'>";
        htmlload = htmlload + "<div class='modal-content'><div class='modal-body' style='padding:40px 50px; text-align: center; clear: left;'>";
        htmlload = htmlload + "<div class='panel panel-default'>";
        htmlload = htmlload + "<div class='panel-heading'><h3 class='panel-title'>" + titulo + "</h3></div>";
        htmlload = htmlload + "<div class='panel-body'>";
        htmlload = htmlload + cuerpo;
        htmlload = htmlload + "</div>";
        htmlload = htmlload + "<div class='modal-footer'>";
        htmlload = htmlload + "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='return Mensajeria.CargardoFin();'>Cancelar</button>";
        htmlload = htmlload + "<button type='button' class='btn btn-danger btn-ok' onclick='" + funcion + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span>&nbsp;&nbsp;Eliminar</button>";
        htmlload = htmlload + "</div>";
        htmlload = htmlload + "</div></div></div>";
        htmlload = htmlload + "</div></div>";

        $("#cargando").html(htmlload);
        $("#ModalLoading").modal({ backdrop: 'static', keyboard: false });
        return false;
    }
};

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
};