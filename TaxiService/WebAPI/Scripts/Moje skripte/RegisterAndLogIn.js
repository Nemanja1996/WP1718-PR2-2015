$(document).ready(function () {
    $("#div2").hide();

    $("#action1").click(function () {
        $("#div1").hide();
        $("#div2").show();
    });


    $("#action2").click(function () {
        $("#div2").hide();
        $("#div1").show();
    });

    $("#logovanje").click(function () {
        let korisnikLog = {
            korisnickoIme: `${$('#korisnickoImeLogin').val()}`,
            lozinka: `${$('#lozinkaLogin').val()}`
        }

        $.ajax({
            type: 'POST',
            url: '/api/LogIn',
            data: JSON.stringify(korisnikLog),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data == null) {
                    alert("Korisnicko ime ili lozinka je nevalidna!");
                } else {
                    //redirektuj na glavnu
                    localStorage.setItem("Ulogovan", JSON.stringify(data));
                    $(location).attr('href', 'service.html');
                }
            }
        })
    });

    $("#registracija").click(function () {
        let pol1;
        if ($('#Pol1').prop('checked')) {
            pol1 = 'M';
        } else if ($('#Pol2').prop('checked')) {
            pol1 = 'Z';
        }

        let korisnikReg = {
            ime: `${$('#imeReg').val()}`,
            prezime: `${$('#prezimeReg').val()}`,
            pol: pol1,
            jmbg: `${$('#jmbgReg').val()}`,
            korisnickoIme: `${$('#korisnickoImeReg').val()}`,
            lozinka: `${$('#lozinkaReg').val()}`,
            telefon: `${$('#telefonReg').val()}`,
            email: `${$('#mailReg').val()}`,
            uloga: "Korisnik"
        }

        $.ajax({
            type: 'POST',
            url: '/api/Registration',
            data: JSON.stringify(korisnikReg),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Korisnicko ime vec postoji!");
                } else {
                    alert("Uspesno ste se registrovali!");
                }
            }

        })

    });
});