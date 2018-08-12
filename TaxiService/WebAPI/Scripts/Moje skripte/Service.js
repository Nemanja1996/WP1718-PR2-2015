$(document).ready(function () {
    var tip = "";
    var voznje;
    if (localStorage.Ulogovan != "null") {
        if (JSON.parse(localStorage.Ulogovan).Uloga == "Dispecer") {
            $("#musterija").hide();
            $("#vozac").hide();
            tip = "#printDispecerData"
        }
        else if (JSON.parse(localStorage.Ulogovan).Uloga == "Korisnik") {
            $("#dispecer").hide();
            $("#vozac").hide();
            tip = "#printMusterijaData"
        }
        else if (JSON.parse(localStorage.Ulogovan).Uloga == "Vozac") {
            $("#musterija").hide();
            $("#dispecer").hide();

            var korisnikReg = JSON.parse(localStorage.Ulogovan);

            $.ajax({
                type: 'GET',
                url: 'api/Vozac/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var korisnik = JSON.parse(localStorage.Ulogovan);
                    korisnik.Lokacija = data;
                    localStorage.Ulogovan = JSON.stringify(korisnik);
                }

            });
            tip = "#printVozacData"
        }
    }
    else {
        $(location).attr('href', 'index.html');
        alert("Niste ulogovani");
    }

    $("div").on("click", "#userData", function () {
        let korisnikLog = JSON.parse(localStorage.Ulogovan);
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Podaci o korisniku</th></tr>"
        txt += "<tr><th>Ime:</th><td>" + korisnikLog.Ime + "</td></tr>"
        txt += "<tr><th>Prezime:</th><td>" + korisnikLog.Prezime + "</td></tr>";
        txt += "<tr><th>Pol:</th><td>" + korisnikLog.Pol + "</td></tr>";
        txt += "<tr><th>Jmbg:</th><td>" + korisnikLog.Jmbg + "</td></tr>";
        txt += "<tr><th>Korisnicko ime:</th><td>" + korisnikLog.KorisnickoIme + "</td></tr>";
        txt += "<tr><th>Lozinka:</th><td>" + korisnikLog.Lozinka + "</td></tr>";
        txt += "<tr><th>Telefon:</th><td>" + korisnikLog.Telefon + "</td></tr>";
        txt += "<tr><th>Email:</th><td>" + korisnikLog.Email + "</td></tr>";
        txt += "<tr><td><button type='button' id='izmenaPolja' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-pencil' ></span> Izmena</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);

    });


    $("div").on("click", "#izmenaPolja", function () {

        let korisnikLog = JSON.parse(localStorage.Ulogovan);
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Podaci o korisniku</th></tr>"
        txt += "<tr><th>Ime:</th><td><input type='text' id='imeIzmena' value='" + korisnikLog.Ime + "'/></td></tr>";
        txt += "<tr><th>Prezime:</th><td><input type='text' id='prezimeIzmena' value='" + korisnikLog.Prezime + "'/></td></tr>";
        if (korisnikLog.Pol == "M") {
            txt += "<tr><th> Pol:</th><td><input checked='true' type='radio' name='pol' value='M' id='Pol1' />M<input type='radio' name='pol' value='Z' id='Pol2'/>Z</td></tr>";
        }
        else {
            txt += "<tr><th> Pol:</th><td><input type='radio' name='pol' value='M' id='Pol1' />M<input checked='true' type='radio' name='pol' value='Z' id='Pol2'/>Z</td></tr>";
        }
        txt += "<tr><th>Jmbg:</th><td><input type='text' id='jmbgIzmena' value='" + korisnikLog.Jmbg + "'/></td></tr>";
        txt += "<tr><th>Korisnicko ime:</th><td><input type='text' id='korisnickoImeIzmena' value='" + korisnikLog.KorisnickoIme + "'/></td></tr>";
        txt += "<tr><th>Lozinka:</th><td><input type='text' id='lozinkaIzmena' value='" + korisnikLog.Lozinka + "'/></td></tr>";
        txt += "<tr><th>Telefon:</th><td><input type='text' id='telefonIzmena' value='" + korisnikLog.Telefon + "'/></td></tr>";
        txt += "<tr><th>Email:</th><td><input type='text' id='emailIzmena' value='" + korisnikLog.Email + "'/></td></tr>";
        txt += "<tr><td><button type='button' id='userData' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Izadji</button ></td><td><button type='button' id='posaljiPromene' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-disk' ></span> Sacuvaj</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#logOut", function () {
        localStorage.Ulogovan = null;
        $(location).attr('href', 'index.html');
    });

    $("div").on("click", "#posaljiPromene", function () {
        let pol1;
        if ($('#Pol1').prop('checked', true)) {
            pol1 = 'M';
        } else if ($('#Pol2').prop('checked', true)) {
            pol1 = 'Z';
        }

        let korisnikReg = {
            ime: $('#imeIzmena').val(),
            prezime: $('#prezimeIzmena').val(),
            pol: pol1,
            jmbg: $('#jmbgIzmena').val(),
            korisnickoIme: $('#korisnickoImeIzmena').val(),
            lozinka: $('#lozinkaIzmena').val(),
            telefon: $('#telefonIzmena').val(),
            email: $('#emailIzmena').val()
        }

        $.ajax({
            type: 'PUT',
            url: '/api/Registration/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            data: JSON.stringify(korisnikReg),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Korisnicko ime vec postoji, neuspesna promena!");
                } else {
                    var korisnik = JSON.parse(localStorage.Ulogovan);
                    korisnik.KorisnickoIme = korisnikReg.korisnickoIme;
                    localStorage.Ulogovan = JSON.stringify(korisnik);
                    alert("Uspesno ste izmenili korisnicke informacije!");
                }
            }

        });

    });

    $("div").on("click", "#izmenaLokacije", function () {

        let korisnikLog = JSON.parse(localStorage.Ulogovan);
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Trenutna lokacija</th></tr>";

        txt += "<tr><th>Koordinate:</th><td><input type='text' id='xIzmena' value='" + korisnikLog.Lokacija.X + "'/></td><td><input type='text' id='yIzmena' value='" + korisnikLog.Lokacija.Y + "'/></td></tr>";
        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaIzmena' value='" + korisnikLog.Lokacija.Adresa.UlicaBroj + "'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradIzmena' value='" + korisnikLog.Lokacija.Adresa.NaseljenoMestoBroj + "'/></td></tr>";
        txt += "<tr><td><button type='button' id='location' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Izadji</button ></td><td><button type='button' id='posaljiPromeneLokacije' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-disk' ></span> Sacuvaj</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#location", function () {

        let korisnikLog = JSON.parse(localStorage.Ulogovan);
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Trenutna lokacija</th></tr>";
        txt += "<tr><th>Koordinate:  </th><td> x: " + korisnikLog.Lokacija.X + " Y: " + korisnikLog.Lokacija.Y + "</td></tr>";
        txt += "<tr><th>Ulica:</th><td>" + korisnikLog.Lokacija.Adresa.UlicaBroj + "</td></tr>";
        txt += "<tr><th>Grad:</th><td>" + korisnikLog.Lokacija.Adresa.NaseljenoMestoBroj + "</td></tr>"
        txt += "<tr><td><button type='button' id='izmenaLokacije' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-pencil' ></span> Izmena</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#posaljiPromeneLokacije", function () {
        let adresa = {
            NaseljenoMestoBroj: $("#gradIzmena").val(),
            UlicaBroj: $("#ulicaIzmena").val()
        }

        let Lokacija = {
            Adresa: adresa,
            X: $("#xIzmena").val(),
            Y: $("#yIzmena").val()
        }

        $.ajax({
            type: 'PUT',
            url: '/api/Vozac/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            data: JSON.stringify(Lokacija),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Greska pri promeni lokacije!");
                } else {
                    var korisnik = JSON.parse(localStorage.Ulogovan);
                    korisnik.Lokacija = Lokacija;
                    localStorage.Ulogovan = JSON.stringify(korisnik);
                    alert("Uspesno ste izmenili lokaciju!");
                }
            }

        });

    });

    $("div").on("click", "#dodajVoznju", function () {

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje voznje</th></tr>";

        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVoznja'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradVoznja'/></td></tr>";
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobila' value='Putnicko vozilo'><option value='Putnicko vozilo'>Putnicko vozilo</option><option value='TeretnoVozilo'>Teretno vozilo</option></select></td></tr>"
        txt += "<tr><td><button type='button' id='rezervisiVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Dodaj voznju</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#rezervisiVoznju", function () {
        let adresa = {
            NaseljenoMestoBroj: $("#gradVoznja").val(),
            UlicaBroj: $("#ulicaVoznja").val()
        }

        let Lokacija3 = {
            Adresa: adresa,
            X: "#",
            Y: "#"
        }

        let adresa1 = {
            NaseljenoMestoBroj: "",
            UlicaBroj: ""
        }

        let Lokacija2 = {
            Adresa: adresa1,
            X: "",
            Y: ""
        }

        let Voznja = {
            DatumIVreme: "",
            Lokacija1: Lokacija3,
            TipAuta: $("#tipAutomobila").val(),
            Pozivaoc: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Odrediste: Lokacija2,
            KreatorVoznje: "",
            VozacMusterije: "",
            Iznos: "",
            Komentar: "",
            Status: "Kreirana"
        }


        $.ajax({
            type: 'POST',
            url: '/api/Musterija',
            data: JSON.stringify(Voznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Greska pri kreiranju voznje");
                } else {
                    alert("Uspesno ste Kreirali voznju");
                }
            }
        });
    });

    $("div").on("click", "#listaVoznji", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th> <th>Status voznje:</th><th>Opcija:</th></tr>"
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Status == "Kreirana") {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td><td><button type='button' name='" + i + "' id='otkaziVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Otkazi</button ></td></tr>"
                        }
                        else {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20' readonly='true'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });

    $("div").on("click", "#otkaziVoznju", function () {
        let index = $(this).prop("name");
        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                txt += "<div class='absolute'>"
                txt += "<table border = '1'>"
                txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th> <th>Status voznje:</th><th>Opcija:</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    if (i.toString() == index) {
                        txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje" + i + "' rows='1' cols='20' ></textarea></td> <td>" + data[i].Status + "</td><td><button type='button' name='" + i + "' id='sacuvajKomentar' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Sacuvaj</button ></td></tr>"
                    }
                    else {
                        txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje" + i + "' rows='1' cols='20' readonly='true'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td></tr>"
                    }
                }
                txt += "</table>"
                txt += "</div>"
                $(tip).html(txt);
            }

        });
    });

    $("div").on("click", "#sacuvajKomentar", function () {
        let index = parseInt($(this).prop("name"));
        let voznja = voznje[index];

        let komentar = {
            Opis: $("#komentarVoznje" + index).val(),
            DatumObjave: "",
            KreatorKomentara: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Ocena: "0"
        }

        let adresa1 = {
            NaseljenoMestoBroj: "",
            UlicaBroj: ""
        }

        let Lokacija2 = {
            Adresa: adresa1,
            X: "",
            Y: ""
        }

        let Voznja = {
            DatumIVreme: voznja.DatumIVreme,
            Lokacija1: voznja.Lokacija1,
            TipAuta: voznja.TipAuta,
            Pozivaoc: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Odrediste: Lokacija2,
            KreatorVoznje: voznja.KreatorVoznje,
            VozacMusterije: voznja.VozacMusterije,
            Iznos: voznja.Iznos,
            KomentarVoznje: komentar,
            Status: voznja.Status
        }


        $.ajax({
            type: 'PUT',
            url: 'api/Musterija/' + index + "|" + (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            data: JSON.stringify(Voznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data == true) {
                    alert("Voznja uspesno otkazana!");

                }
            }

        });
    });

    $("div").on("click", "#addDriver", function () {

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje vozaca</th></tr>"
        txt += "<tr><th>Ime:</th><td><input type='text' id='imeVozac'/></td></tr>";
        txt += "<tr><th>Prezime:</th><td><input type='text' id='imeVozac''/></td></tr>";
        txt += "<tr><th> Pol:</th><td><input checked='true' type='radio' name='pol' value='M' id='Pol1Vozac' />M<input type='radio' name='pol' value='Z' id='Pol2Vozac'/>Z</td></tr>";
        txt += "<tr><th>Jmbg:</th><td><input type='text' id='jmbgVozac'/></td></tr>";
        txt += "<tr><th>Korisnicko ime:</th><td><input type='text' id='korisnickoImeVozac'/></td></tr>";
        txt += "<tr><th>Lozinka:</th><td><input type='text' id='lozinkaVozac'/></td></tr>";
        txt += "<tr><th>Telefon:</th><td><input type='text' id='telefonVozac'/></td></tr>";
        txt += "<tr><th>Email:</th><td><input type='text' id='emailVozac'/></td></tr>";
        txt += "<tr><th>Koordinate:</th><td><input type='text' id='xVozac''/></td><td><input type='text' id='yVozac'/></td></tr>";
        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVozac'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradVozac'/></td></tr>";
        txt += "<tr><th>Registracija:</th><td><input type='text' id='registracijaVozac'/></td></tr>";
        txt += "<tr><th>Broj vozila:</th><td><input type='text' id='brojVozilaVozac'/></td></tr>";
        txt += "<tr><th>Godiste:</th><td><input type='text' id='godisteAutaVozac'/></td></tr>";
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobilaVozac' value='Putnicko vozilo'><option value='Putnicko vozilo'>Putnicko vozilo</option><option value='teretnoVozilo'>Teretno vozilo</option></select></td></tr>";


        txt += "<tr><td><button type='button' id='addDriverButton' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-plus' ></span> Dodaj vozaca</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#addDriverButton", function () {
        let pol1;
        if ($('#Pol1Vozac').prop('checked', true)) {
            pol1 = 'M';
        } else if ($('#Pol2Vozac').prop('checked', true)) {
            pol1 = 'Z';
        }

        let adresa1 = {
            NaseljenoMestoBroj: `${$('#gradVozac').val()}`,
            UlicaBroj: `${$('#ulicaVozac').val()}`,
        }

        let Lokacija2 = {
            Adresa: adresa1,
            X: `${$('#xVozac').val()}`,
            Y: `${$('#yVozac').val()}`,
        }

        let Automobil1 = {
            VozacAutomobila: `${$('#korisnickoImeVozac').val()}`,
            Godiste: `${$('#godisteAutaVozac').val()}`,
            Registracija: `${$('#registracijaVozac').val()}`,
            BrojTaksiVozila: `${$('#brojVozilaVozac').val()}`,
            Tip: `${$('#tipAutomobilaVozac').val()}`,

        }

        let korisnikReg = {
            ime: `${$('#imeVozac').val()}`,
            prezime: `${$('#imeVozac').val()}`,
            pol: pol1,
            jmbg: `${$('#jmbgVozac').val()}`,
            korisnickoIme: `${$('#korisnickoImeVozac').val()}`,
            lozinka: `${$('#lozinkaVozac').val()}`,
            telefon: `${$('#telefonVozac').val()}`,
            email: `${$('#emailVozac').val()}`,
            uloga: "Vozac",
            lokacija1: Lokacija2,
            Automobil: Automobil1
        }

        $.ajax({
            type: 'POST',
            url: '/api/Dispecer',
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


    $("div").on("click", "#dobaviVozaca", function () {
        let ulica = $('#ulicaVoznja1').val();
        let grad = $('#gradVoznja1').val();
        let tipAuta = $('#tipAutomobila1').val();

        $.ajax({
            type: 'GET',
            url: '/api/Dispecer/' + $('#tipAutomobila1').val(),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    let txt = "";
                    txt += "<div class='absolute'>"
                    txt += "<table>"
                    txt += "<tr><th colspan='2'>Dodavanje voznje</th></tr>";

                    txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVoznja1' value='" + ulica + "'/></td></tr>";
                    txt += "<tr><th>Grad:</th><td><input type='text' id='gradVoznja1' value='" + grad + "'/></td></tr>";
                    txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobila1' value='" + tipAuta + "' disabled><option value='PutnickoVozilo'>PutnickoVozilo</option><option value='TeretnoVozilo'>TeretnoVozilo</option></select></td></tr>"
                    txt += "<tr><th>Vozac:</th><td><select id='vozac1'>"
                    for (var i = 0; i < data.length; i++) {
                        txt += "<option value='" + data[i] + "'>" + data[i] + "</option>"
                    }
                    txt += "</select></td></tr>"
                    txt += "<tr><td><button type='button' id='rezervisiVoznju1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Rezervisi voznju</button ></td></tr>";

                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
                else {
                    alert("Nema slobodnih vozaca!");
                }
            }

        });


    });

    $("div").on("click", "#addRide", function () {

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje voznje</th></tr>";

        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVoznja1'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradVoznja1'/></td></tr>";
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobila1' value='PutnickoVozilo'><option value='PutnickoVozilo'>PutnickoVozilo</option><option value='TeretnoVozilo'>TeretnoVozilo</option></select></td></tr>"
        txt += "<tr><th>Vozac:</th><td><select id='vozac'></select></td></tr>"
        txt += "<tr><td><button type='button' id='dobaviVozaca' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Dobavi vozaca</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#rezervisiVoznju1", function () {
        let adresa = {
            NaseljenoMestoBroj: $("#gradVoznja1").val(),
            UlicaBroj: $("#ulicaVoznja1").val()
        }

        let Lokacija3 = {
            Adresa: adresa,
            X: "#",
            Y: "#"
        }

        let adresa1 = {
            NaseljenoMestoBroj: "",
            UlicaBroj: ""
        }

        let Lokacija2 = {
            Adresa: adresa1,
            X: "",
            Y: ""
        }

        let Voznja = {
            DatumIVreme: "",
            Lokacija1: Lokacija3,
            TipAuta: $("#tipAutomobila1").val(),
            Pozivaoc: "",
            Odrediste: Lokacija2,
            KreatorVoznje: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            VozacMusterije: $("#vozac1").val(),
            Iznos: "",
            Komentar: "",
            Status: "Kreirana"
        }


        $.ajax({
            type: 'PUT',
            url: '/api/Dispecer/' + $("#vozac1").val(),
            data: JSON.stringify(Voznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Greska pri kreiranju voznje");
                } else {
                    alert("Uspesno ste Kreirali voznju");
                }
            }
        });
    });


    $("div").on("click", "#listaVoznjiDispecer", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Dispecer',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                let txt = "";
                txt += "<div class='absolute'>"
                txt += "<table border='2'>"
                txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th><th>Pozivaoc voznje:</th> <th>Tip automobila:</th><th>Vozac:</th><th>Opcija:</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td><td>" + data[i].Pozivaoc + "</td> <td id='tipAutaObrada" + i + "'>" + data[i].TipAuta + "</td> <td><select id='vozacObrada" + i + "'></select></td > <td><button type='button' name='" + i + "' id='obradiVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-download-alt' ></span> Dobavi vozaca</button ></td></tr > ";
                }
                txt += "</table>"
                txt += "</div>"
                $(tip).html(txt);
            }
        });
    });

    $("div").on("click", "#obradiVoznju", function () {
        let index = parseInt($(this).prop("name"));
        $('#obradiVoznju').prop("id", "obradiVoznju1");

        $.ajax({
            type: 'GET',
            url: '/api/Dispecer/' + $('#tipAutaObrada' + index).html(),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                let tekst;
                for (let i = 0; i < data.length; i++) {
                    tekst = "<option value='" + data[i] + "'>" + data[i] + "</option>";

                }
                $('#vozacObrada' + index).html(tekst);
            }
        });
    });
});