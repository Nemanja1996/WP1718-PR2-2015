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
        let uspesno = true;
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

        if (korisnikReg.korisnickoIme === "" || korisnikReg.lozinka === "" || korisnikReg.ime === "" || korisnikReg.prezime === "" || korisnikReg.jmbg === "" || korisnikReg.telefon === "" || korisnikReg.email === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
        } else {

            if (korisnikReg.korisnickoIme.length < 3 || korisnikReg.korisnickoIme.length > 15) {
                uspesno = false;
                $('#korisnickoImeReg').css('background-color', '#ff7556');
                $('#korisnickoImeReg').val("");
                $('#korisnickoImeReg').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#korisnickoImeReg').css('background-color', 'white');
                $('#korisnickoImeReg').attr('placeholder', '');
            }

            if (korisnikReg.lozinka.length < 4 || korisnikReg.lozinka.length > 15) {
                uspesno = false;
                $('#lozinkaReg').css('background-color', '#ff7556');
                $('#lozinkaReg').val("");
                $('#lozinkaReg').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#lozinkaReg').css('background-color', 'white');
                $('#lozinkaReg').attr('placeholder', '');
            }

            if (korisnikReg.ime.length < 2 || korisnikReg.ime.length > 15) {
                uspesno = false;
                $('#imeReg').css('background-color', '#ff7556');
                $('#imeReg').val("");
                $('#imeReg').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#imeReg').css('background-color', 'white');
                $('#imeReg').attr('placeholder', '');
            }

            if (korisnikReg.prezime.length < 3 || korisnikReg.prezime.length > 15) {
                uspesno = false;
                $('#prezimeReg').css('background-color', '#ff7556');
                $('#prezimeReg').val("");
                $('#prezimeReg').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#prezimeReg').css('background-color', 'white');
                $('#prezimeReg').attr('placeholder', '');
            }

            if (korisnikReg.jmbg.length !== 13) {
                uspesno = false;
                $('#jmbgReg').css('background-color', '#ff7556');
                $('#jmbgReg').val("");
                $('#jmbgReg').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                $('#jmbgReg').css('background-color', 'white');
                $('#jmbgReg').attr('placeholder', '');

            }

            if (korisnikReg.telefon.length < 6 || korisnikReg.telefon.length > 7) {
                uspesno = false;
                $('#telefonReg').css('background-color', '#ff7556');
                $('#telefonReg').val("");
                $('#telefonReg').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                $('#telefonReg').css('background-color', 'white');
                $('#telefonReg').attr('placeholder', '');
            }

            if (korisnikReg.email.length < 6) {
                uspesno = false;
                $('#mailReg').css('background-color', '#ff7556');
                $('#mailReg').val("");
                $('#mailReg').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#mailReg").val())) {
                    $('#mailReg').css('background-color', 'white');
                    $('#mailReg').attr('placeholder', '');
                } else {
                    uspesno = false;
                    $('#mailReg').css('background-color', '#ff7556');
                    $('#mailReg').val("");
                    $('#mailReg').attr('placeholder', 'Nevalidna email adresa!');
                }
            }

            if (uspesno) {
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
            }
        }
    });
});