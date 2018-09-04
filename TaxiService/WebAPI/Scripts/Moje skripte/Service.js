$(document).ready(function () {
    var tip = "";
    var voznje;
    var index1;
    var voznja1;

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
        let uspesno = true;
        if ($('#Pol1').prop('checked')) {
            pol1 = 'M';
        } else if ($('#Pol2').prop('checked')) {
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
        if (korisnikReg.korisnickoIme === "" || korisnikReg.lozinka === "" || korisnikReg.ime === "" || korisnikReg.prezime === "" || korisnikReg.jmbg === "" || korisnikReg.telefon === "" || korisnikReg.email === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
        } else {

            if (korisnikReg.korisnickoIme.length < 3 || korisnikReg.korisnickoIme.length > 15) {
                uspesno = false;
                $('#korisnickoImeIzmena').css('background-color', '#ff7556');
                $('#korisnickoImeIzmena').val("");
                $('#korisnickoImeIzmena').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#korisnickoImeIzmena').css('background-color', 'white');
                $('#korisnickoImeIzmena').attr('placeholder', '');
            }

            if (korisnikReg.lozinka.length < 4 || korisnikReg.lozinka.length > 15) {
                uspesno = false;
                $('#lozinkaIzmena').css('background-color', '#ff7556');
                $('#lozinkaIzmena').val("");
                $('#lozinkaIzmena').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#lozinkaIzmena').css('background-color', 'white');
                $('#lozinkaIzmena').attr('placeholder', '');
            }

            if (korisnikReg.ime.length < 2 || korisnikReg.ime.length > 15) {
                uspesno = false;
                $('#imeIzmena').css('background-color', '#ff7556');
                $('#imeIzmena').val("");
                $('#imeIzmena').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#imeIzmena').css('background-color', 'white');
                $('#imeIzmena').attr('placeholder', '');
            }

            if (korisnikReg.prezime.length < 3 || korisnikReg.prezime.length > 15) {
                uspesno = false;
                $('#prezimeIzmena').css('background-color', '#ff7556');
                $('#prezimeIzmena').val("");
                $('#prezimeIzmena').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#prezimeIzmena').css('background-color', 'white');
                $('#prezimeIzmena').attr('placeholder', '');
            }

            if (korisnikReg.jmbg.length !== 13) {
                uspesno = false;
                $('#jmbgIzmena').css('background-color', '#ff7556');
                $('#jmbgIzmena').val("");
                $('#jmbgIzmena').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                $('#jmbgIzmena').css('background-color', 'white');
                $('#jmbgIzmena').attr('placeholder', '');

            }

            if (korisnikReg.telefon.length < 6 || korisnikReg.telefon.length > 7) {
                uspesno = false;
                $('#telefonIzmena').css('background-color', '#ff7556');
                $('#telefonIzmena').val("");
                $('#telefonIzmena').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                $('#telefonIzmena').css('background-color', 'white');
                $('#telefonIzmena').attr('placeholder', '');
            }

            if (korisnikReg.email.length < 6) {
                uspesno = false;
                $('#emailIzmena').css('background-color', '#ff7556');
                $('#emailIzmena').val("");
                $('#emailIzmena').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#emailIzmena").val())) {
                    $('#emailIzmena').css('background-color', 'white');
                    $('#emailIzmena').attr('placeholder', '');
                } else {
                    uspesno = false;
                    $('#emailIzmena').css('background-color', '#ff7556');
                    $('#emailIzmena').val("");
                    $('#emailIzmena').attr('placeholder', 'Nevalidna email adresa!');
                }
            }
        }
            if (uspesno) {
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
            }
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
        let uspesno = true;
        let adresa = {
            NaseljenoMestoBroj: $("#gradIzmena").val(),
            UlicaBroj: $("#ulicaIzmena").val()
        }

        let Lokacija = {
            Adresa: adresa,
            X: $("#xIzmena").val(),
            Y: $("#yIzmena").val()
        }

        if (adresa.NaseljenoMestoBroj === "" || adresa.UlicaBroj === "" || Lokacija.X === "" || Lokacija.Y === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
        }
        if (uspesno) {
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
        }

    });

    $("div").on("click", "#dodajVoznju", function () {

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje voznje</th></tr>";

        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVoznja'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradVoznja'/></td></tr>";
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobila' value='PutnickoVozilo'><option value='PutnickoVozilo'>Putnicko vozilo</option><option value='TeretnoVozilo'>Teretno vozilo</option></select></td></tr>"
        txt += "<tr><td><button type='button' id='rezervisiVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Dodaj voznju</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#rezervisiVoznju", function () {
        let uspesno = true;
        let adresa = {
            NaseljenoMestoBroj: $("#gradVoznja").val(),
            UlicaBroj: $("#ulicaVoznja").val()
        }

        let Lokacija3 = {
            Adresa: adresa,
            X: "#",
            Y: "#"
        }
        if (adresa.NaseljenoMestoBroj === "" || adresa.UlicaBroj === "" || Lokacija3.X === "" || Lokacija3.Y === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
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
            Status: "KreiranaNaCekanju"
        }

        if (uspesno) {
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
        }
    });

    $("div").on("click", "#listaVoznji", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th><th>Ocena</th> <th>Status voznje:</th><th>Opcija:</th></tr>"
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Status == "KreiranaNaCekanju") {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td><td>"+data[i].KomentarVoznje.Ocena+"</td> <td>" + data[i].Status + "</td><td><button type='button' name='" + i + "' id='otkaziVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Otkazi</button ><button type='button' id='izmenaVoznje' name='" + i + "' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-pencil' ></span> Izmena</button ></td></tr>"
                        }
                        else {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20' readonly='true'>" + data[i].KomentarVoznje.Opis + "</textarea></td><td>" + data[i].KomentarVoznje.Ocena +"</td> <td>" + data[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });

    $("div").on("click", "#izmenaVoznje", function () {
        let index = $(this).prop("name");
        index1 = index
        voznja1 = voznje[index]
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje voznje</th></tr>";

        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaVoznjaIzmena' value='" + voznja1.Lokacija1.Adresa.UlicaBroj + "'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradVoznjaIzmena' value='" + voznja1.Lokacija1.Adresa.NaseljenoMestoBroj + "'/></td></tr>";
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobilaIzmena' value='" + voznja1.TipAuta + "'><option value='Putnicko vozilo'>Putnicko vozilo</option><option value='TeretnoVozilo'>Teretno vozilo</option></select></td></tr>"
        txt += "<tr><td><button type='button' id='sacuvajIzmeneVoznje' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Sacuvaj izmene</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#sacuvajIzmeneVoznje", function () {
        let uspesno = true;

        voznja1.Lokacija1.Adresa.NaseljenoMestoBroj = $("#gradVoznjaIzmena").val()
        voznja1.Lokacija1.Adresa.UlicaBroj = $("#ulicaVoznjaIzmena").val()
        voznja1.TipAuta = $("#tipAutomobilaIzmena").val()

        if (voznja1.Lokacija1.Adresa.NaseljenoMestoBroj === "" || voznja1.Lokacija1.Adresa.UlicaBroj === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
        }

        if (uspesno) {
            $.ajax({
                type: 'PUT',
                url: 'api/Musterija/' + index1 + "|" + (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
                data: JSON.stringify(voznja1),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data == true) {
                        alert("Voznja uspesno izmenjena!");

                    }
                }

            });
        }
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
        let uspesno = true

        let komentar = {
            Opis: $("#komentarVoznje" + index).val(),
            DatumObjave: "",
            KreatorKomentara: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Ocena: "0"
        }

        if (komentar.Opis === "") {
            alert("Mora se popuniti polje za komentar");
            uspesno = false;
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
            Status: "Otkazana"
        }

        if (uspesno) {
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
        }
    });

    $("div").on("click", "#addDriver", function () {

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Dodavanje vozaca</th></tr>"
        txt += "<tr><th>Ime:</th><td><input type='text' id='imeVozac'/></td></tr>";
        txt += "<tr><th>Prezime:</th><td><input type='text' id='prezimeVozac''/></td></tr>";
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
        txt += "<tr><th>Tip automobila:</th><td><select id='tipAutomobilaVozac' value='PutnickoVozilo'><option value='PutnickoVozilo'>Putnicko vozilo</option><option value='TeretnoVozilo'>Teretno vozilo</option></select></td></tr>";


        txt += "<tr><td><button type='button' id='addDriverButton' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-plus' ></span> Dodaj vozaca</button ></td></tr>";
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#addDriverButton", function () {
        let pol1;
        let uspesno = true;
        if ($('#Pol1Vozac').prop('checked')) {
            pol1 = 'M';
        } else if ($('#Pol2Vozac').prop('checked')) {
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
            prezime: `${$('#prezimeVozac').val()}`,
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

        if (Automobil1.BrojTaksiVozila === "" || Automobil1.Registracija === "" || Automobil1.Godiste === "" || Lokacija2.Y === "" || Lokacija2.X === "" || adresa1.UlicaBroj === "" || adresa1.NaseljenoMestoBroj === "" || korisnikReg.korisnickoIme === "" || korisnikReg.lozinka === "" || korisnikReg.ime === "" || korisnikReg.prezime === "" || korisnikReg.jmbg === "" || korisnikReg.telefon === "" || korisnikReg.email === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
        } else {

            if (korisnikReg.korisnickoIme.length < 3 || korisnikReg.korisnickoIme.length > 15) {
                uspesno = false;
                $('#korisnickoImeVozac').css('background-color', '#ff7556');
                $('#korisnickoImeVozac').val("");
                $('#korisnickoImeVozac').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#korisnickoImeVozac').css('background-color', 'white');
                $('#korisnickoImeVozac').attr('placeholder', '');
            }

            if (korisnikReg.lozinka.length < 4 || korisnikReg.lozinka.length > 15) {
                uspesno = false;
                $('#lozinkaVozac').css('background-color', '#ff7556');
                $('#lozinkaVozac').val("");
                $('#lozinkaVozac').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#lozinkaVozac').css('background-color', 'white');
                $('#lozinkaVozac').attr('placeholder', '');
            }

            if (korisnikReg.ime.length < 2 || korisnikReg.ime.length > 15) {
                uspesno = false;
                $('#imeVozac').css('background-color', '#ff7556');
                $('#imeVozac').val("");
                $('#imeVozac').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#imeVozac').css('background-color', 'white');
                $('#imeVozac').attr('placeholder', '');
            }

            if (korisnikReg.prezime.length < 3 || korisnikReg.prezime.length > 15) {
                uspesno = false;
                $('#prezimeVozac').css('background-color', '#ff7556');
                $('#prezimeVozac').val("");
                $('#prezimeVozac').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#prezimeVozac').css('background-color', 'white');
                $('#prezimeVozac').attr('placeholder', '');
            }

            if (korisnikReg.jmbg.length !== 13) {
                uspesno = false;
                $('#jmbgVozac').css('background-color', '#ff7556');
                $('#jmbgVozac').val("");
                $('#jmbgVozac').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                $('#jmbgVozac').css('background-color', 'white');
                $('#jmbgVozac').attr('placeholder', '');

            }

            if (korisnikReg.telefon.length < 6 || korisnikReg.telefon.length > 7) {
                uspesno = false;
                $('#telefonVozac').css('background-color', '#ff7556');
                $('#telefonVozac').val("");
                $('#telefonVozac').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                $('#telefonVozac').css('background-color', 'white');
                $('#telefonVozac').attr('placeholder', '');
            }

            if (korisnikReg.email.length < 6) {
                uspesno = false;
                $('#emailVozac').css('background-color', '#ff7556');
                $('#emailVozac').val("");
                $('#emailVozac').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#emailVozac").val())) {
                    $('#emailVozac').css('background-color', 'white');
                    $('#emailVozac').attr('placeholder', '');
                } else {
                    uspesno = false;
                    $('#emailVozac').css('background-color', '#ff7556');
                    $('#emailVozac').val("");
                    $('#emailVozac').attr('placeholder', 'Nevalidna email adresa!');
                }
            }
        }

        if (uspesno) {
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
                        alert("Uspesno ste dodali vozaca!");
                    }
                }

            })
        }

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
        let uspesno = true;
        let adresa = {
            NaseljenoMestoBroj: $("#gradVoznja1").val(),
            UlicaBroj: $("#ulicaVoznja1").val()
        }

        let Lokacija3 = {
            Adresa: adresa,
            X: "#",
            Y: "#"
        }
        if (adresa.NaseljenoMestoBroj === "" || adresa.UlicaBroj === "") {
            alert("Sva polja se moraju popuniti!");
            uspesno = false;
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
            Status: "Formirana"
        }

        if (uspesno) {
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
        }
    });


    $("div").on("click", "#listaVoznjiDispecer", function () {
        $.ajax({
            type: 'GET',
            url: 'api/Dispecer',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                txt += "<div class='absolute'>"
                txt += "<table border='2'>"
                txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th><th>Pozivaoc voznje:</th> <th>Tip automobila:</th><th>Opcija:</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td><td>" + data[i].Pozivaoc + "</td> <td id='tipAutaObrada" + i + "'>" + data[i].TipAuta + "</td> <td><button type='button' name='" + i + "' id='obradiVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-download-alt' ></span> Dobavi vozaca</button ></td></tr > ";
                }
                txt += "</table>"
                txt += "</div>"
                $(tip).html(txt);
            }
        });
    });

    $("div").on("click", "#obradiVoznju", function () {
        let index = parseInt($(this).prop("name"));
        index1 = index;
        let voznja = voznje[index1];

        $.ajax({
            type: 'GET',
            url: '/api/Dispecer/' + voznja.TipAuta,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    let txt = "";
                    txt += "<div class='absolute'>"
                    txt += "<table>"
                    txt += "<tr><th colspan='2'>Odaberite vozaca:</th></tr>";

                    txt += "<tr><th>Vozac:</th><td><select id='vozac2'>"
                    for (var i = 0; i < data.length; i++) {
                        txt += "<option value='" + data[i] + "'>" + data[i] + "</option>"
                    }
                    txt += "</select ></td ></tr > "
                    txt += "<tr><td><button type='button' id='obradaVoznjeGotova' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Obradi voznju</button ></td></tr>";

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

    $("div").on("click", "#obradaVoznjeGotova", function () {
        let Voznja = voznje[index1];
        Voznja.Status = "Obradjena"
        Voznja.KreatorVoznje = JSON.parse(localStorage.Ulogovan).KorisnickoIme;

        $.ajax({
            type: 'PUT',
            url: '/api/Dispecer/' + $("#vozac2").val(),
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

        $.ajax({
            type: 'PUT',
            url: '/api/Musterija/' + '0|' + Voznja.Pozivaoc,
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
        })
    });

    $("div").on("click", "#listaVoznjiVozac", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                let txt = "";
                voznje = data;
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th> <th>Status voznje:</th><th>Opcija:</th></tr>"
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Status == "Formirana" || data[i].Status == "Obradjena" || data[i].Status == "Prihvacena") {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td><td><button type='button' name='" + i + "' id='uspesnaVoznja' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-ok' ></span>Uspesna</button ><button type='button' name='" + i + "' id='neuspesnaVoznja' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Neuspesna</button ></td></tr>"
                        }
                        else {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td><td>/</td><tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });

    $("div").on("click", "#listaZaObradu", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Dispecer',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                txt += "<div class='absolute'>"
                txt += "<table border='2'>"
                txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th><th>Pozivaoc voznje:</th> <th>Tip automobila:</th><th>Opcija:</th></tr>"
                for (var i = 0; i < data.length; i++) {
                        txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td><td>" + data[i].Pozivaoc + "</td> <td id='tipAutaObrada" + i + "'>" + data[i].TipAuta + "</td> <td><button type='button' name='" + i + "' id='prihvatiVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-ok' ></span> Prihvati voznju</button ></td></tr > ";
                }
                txt += "</table>"
                txt += "</div>"
                $(tip).html(txt);
            }
        });
    });

    $("div").on("click", "#prihvatiVoznju", function () {
        let index = parseInt($(this).prop("name"));
        voznja1 = voznje[index];

        let Voznja = voznja1;
        Voznja.Status = "Prihvacena"

        $.ajax({
            type: 'PUT',
            url: '/api/Dispecer/' + (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            data: JSON.stringify(Voznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Greska pri kreiranju voznje");
                } else {
                    $.ajax({
                        type: 'PUT',
                        url: 'api/Musterija/' + "0" + "|" + Voznja.Pozivaoc,
                        data: JSON.stringify(Voznja),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data == true) {
                                alert("Voznja zakljucena (uspesna)!");
                            }
                        }
                    })
                }
            }
        });


    });

    $("div").on("click", "#uspesnaVoznja", function () {
        let index = parseInt($(this).prop("name"));
        voznja1 = voznje[index];
        index1 = index;

        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Trenutna lokacija</th></tr>";

        txt += "<tr><th>Koordinate:</th><td><input type='text' id='xKord' /></td><td><input type='text' id='yKord'/></td></tr>";
        txt += "<tr><th>Ulica:</th><td><input type='text' id='ulicaOdrediste'/></td></tr>";
        txt += "<tr><th>Grad:</th><td><input type='text' id='gradOdrediste'/></td></tr>";
        txt += "<tr><th>Komentar:</th><td> <textarea id='komentarUspesna' rows='10' cols='20'></textarea></td></tr>"
        txt += "<tr><th>Cena:</th><td><input type='text' id='cenaUspesna'/></td></tr>";
        txt += "<tr><th>Ocena:</th><td><select id='ocenaUspesna'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select></td></tr>"

        txt += "<tr><td><button type='button' id='sacuvajUspesna' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Sacuvaj</button ></td></tr>"
        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#neuspesnaVoznja", function () {
        let index = parseInt($(this).prop("name"));
        voznja1 = voznje[index];
        index1 = index;
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th>Uneti komentar</th></tr>"
        txt += "<tr><td> <textarea id='komentarVoznjeNeuspesna' rows='15' cols='75'></textarea></td></tr>"
        txt += "<tr><td><button type='button' id='sacuvajKomentarNeuspesna' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Sacuvaj</button ></td></tr>"
        txt += "</table>";
        txt += "</div>"
        $(tip).html(txt);
    });

    $("div").on("click", "#sacuvajUspesna", function () {
        let uspesno = true;
        let voznja = voznja1;

        let komentar = {
            Opis: $("#komentarUspesna").val(),
            DatumObjave: "",
            KreatorKomentara: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Ocena: $("#ocenaUspesna").val()
        }
        if (komentar.Opis === "") {
            alert("Mora se popuniti polje za komentar");
            uspesno = false;
        }
        let adresa1 = {
            NaseljenoMestoBroj: $("#gradOdrediste").val(),
            UlicaBroj: $("#ulicaOdrediste").val()
        }

        let Lokacija2 = {
            Adresa: adresa1,
            X: $("#xKord").val(),
            Y: $("#yKord").val()
        }

        let Voznja = {
            DatumIVreme: voznja.DatumIVreme,
            Lokacija1: voznja.Lokacija1,
            TipAuta: voznja.TipAuta,
            Pozivaoc: voznja.Pozivaoc,
            Odrediste: Lokacija2,
            KreatorVoznje: voznja.KreatorVoznje,
            VozacMusterije: voznja.VozacMusterije,
            Iznos: $("#cenaUspesna").val(),
            KomentarVoznje: komentar,
            Status: "Uspesna"
        }

        if (uspesno) {
            $.ajax({
                type: 'PUT',
                url: 'api/Musterija/' + index1 + "|" + (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
                data: JSON.stringify(Voznja),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data == true) {
                        if (Voznja.Pozivaoc != "") {
                            $.ajax({
                                type: 'PUT',
                                url: 'api/Musterija/' + 0 + "|" + Voznja.Pozivaoc,
                                data: JSON.stringify(Voznja),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data == true) {
                                        if (Voznja.KreatorVoznje != "") {
                                            $.ajax({
                                                type: 'PUT',
                                                url: '/api/Dispecer/' + Voznja.KreatorVoznje,
                                                data: JSON.stringify(Voznja),
                                                contentType: 'application/json;charset=utf-8',
                                                dataType: 'json',
                                                success: function (data) {
                                                    if (!data) {
                                                        alert("Voznja zakljucena (uspesna)!");
                                                    } else {
                                                        alert("Voznja nije zakljucena (uspesna)!");
                                                    }
                                                }
                                            });
                                        }

                                    }
                                }
                            });
                        }
                        else {
                            if (Voznja.KreatorVoznje != "") {
                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/Dispecer/' + Voznja.KreatorVoznje,
                                    data: JSON.stringify(Voznja),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data) {
                                            alert("Voznja zakljucena (uspesna)!");
                                        } else {
                                            alert("Voznja nije zakljucena (uspesna)!");
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else {
                        alert("Voznja nije zakljucena (uspesna)!");
                    }
                }
            });
        }


    });

    $("div").on("click", "#sacuvajKomentarNeuspesna", function () {
        let uspesno = true;
        let voznja = voznja1;

        let komentar = {
            Opis: $("#komentarVoznjeNeuspesna").val(),
            DatumObjave: "",
            KreatorKomentara: (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
            Ocena: "0"
        }
        if (komentar.Opis === "") {
            alert("Mora se popuniti polje za komentar");
            uspesno = false;
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
            Pozivaoc: voznja.Pozivaoc,
            Odrediste: Lokacija2,
            KreatorVoznje: voznja.KreatorVoznje,
            VozacMusterije: voznja.VozacMusterije,
            Iznos: voznja.Iznos,
            KomentarVoznje: komentar,
            Status: "Neuspesna"
        }

        if (uspesno) {
            $.ajax({
                type: 'PUT',
                url: 'api/Musterija/' + index1 + "|" + (JSON.parse(localStorage.Ulogovan)).KorisnickoIme,
                data: JSON.stringify(Voznja),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data == true) {
                        if (Voznja.Pozivaoc != "") {
                            $.ajax({
                                type: 'PUT',
                                url: 'api/Musterija/' + 0 + "|" + Voznja.Pozivaoc,
                                data: JSON.stringify(Voznja),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data == true) {
                                        alert("Voznja zakljucena (neuspesna)!");
                                    }
                                }
                            });
                        }
                        else {
                            if (Voznja.KreatorVoznje != "") {
                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/Dispecer/' + Voznja.KreatorVoznje,
                                    data: JSON.stringify(Voznja),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data) {
                                            alert("Voznja zakljucena (uspesna)!");
                                        } else {
                                            alert("Voznja nije zakljucena (uspesna)!");
                                        }
                                    }
                                });
                            }

                        }
                    }
                    else {
                        alert("Voznja nije zakljucena (neuspesna)!");
                    }
                }

            });
        }


    });

    $("div").on("click", "#listaMojihVoznjiDispecer", function () {

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th> <th>Status voznje:</th><th>Opcija:</th></tr>"
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Status == "KreiranaNaCekanju") {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td><td><button type='button' name='" + i + "' id='otkaziVoznju' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-remove' ></span> Otkazi</button ><button type='button' id='izmenaVoznje' name='" + i + "' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-pencil' ></span> Izmena</button ></td></tr>"
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

    $("div").on("click", "#filtriraj", function () {
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Odaberite status voznje:</th></tr>";

        txt += "<tr><th>Status:</th><td><select id='status'>"
        txt += "<option value='Uspesna'>Uspesna</option>"
        txt += "<option value='Neuspesna'>Neuspesna</option>"
        txt += "<option value='Otkazana'>Otkazana</option>"
        txt += "<option value='KreiranaNaCekanju'>KreiranaNaCekanju</option>"
        txt += "<option value='Formirana'>Formirana</option>"
        txt += "<option value='Obradjena'>Obradjena</option>"
        txt += "</select ></td ></tr > "
        txt += "<tr><td><button type='button' id='filtriraj1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Filtriraj</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt)
    });

    $("div").on("click", "#filtriraj1", function () {
        var statusVoznje = $("#status").val();
        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th> <th>Status voznje:</th></tr>"
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Status == statusVoznje) {
                            txt += "<tr><td>" + data[i].DatumIVreme + "</td> <td>" + data[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + data[i].TipAuta + "</td> <td>" + data[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + data[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + data[i].KreatorVoznje + "</td> <td>" + data[i].VozacMusterije + "</td> <td>" + data[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + data[i].KomentarVoznje.Opis + "</textarea></td> <td>" + data[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });

    $("div").on("click", "#sortiraj", function () {
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Odaberite kriterijum sortiranja:</th></tr>";

        txt += "<tr><th>Kriterrijum:</th><td><select id='kriterijum'>"
        txt += "<option value='PoDatumu'>PoDatumu</option>"
        txt += "<option value='PoOceni'>PoOceni</option>"
        txt += "</select ></td ></tr > "
        txt += "<tr><td><button type='button' id='sortiraj1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Sortiraj</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt)
    });

    $("div").on("click", "#sortiraj1", function () {
        var kriterijum = $("#kriterijum").val();
        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    if (kriterijum == "PoDatumu") {
                        voznje = data;
                    }
                    else if (kriterijum == "PoOceni") {
                        for (var j = 0; j < voznje.length - 1; j++) {
                            for (var k = j + 1; k < voznje.length; k++) {
                                if (voznje[j].KomentarVoznje.Ocena < voznje[k].KomentarVoznje.Ocena) {
                                    var pomocna = voznje[j];
                                    voznje[j] = voznje[k];
                                    voznje[k] = pomocna;
                                }
                            }
                        }
                    }
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th><th>Ocena</th> <th>Status voznje:</th></tr>"
                    for (var i = 0; i < voznje.length; i++) {
                        txt += "<tr><td>" + voznje[i].DatumIVreme + "</td> <td>" + voznje[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + voznje[i].TipAuta + "</td> <td>" + voznje[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + voznje[i].KreatorVoznje + "</td> <td>" + voznje[i].VozacMusterije + "</td> <td>" + voznje[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + voznje[i].KomentarVoznje.Opis + "</textarea></td><td>" + voznje[i].KomentarVoznje.Ocena + "</td> <td>" + voznje[i].Status + "</td></tr>"
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });

    $("div").on("click", "#poDatumu", function () {
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Pretraga po datumu:</th></tr>";

        txt += "<tr><th>Od:</th><td><input type='date' id='od'></td></tr>"
        txt += "<tr> <th>Do:</th><td><input type='date' id='do'></td></tr></tr > "
        txt += "<tr><td><button type='button' id='poDatumu1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Pretraga</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt)
    });
    $("div").on("click", "#poOceni", function () {
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Pretraga po oceni:</th></tr>";

        txt += "<tr><th>Od:</th><td><input type='text' id='od'></td></tr>"
        txt += "<tr> <th>Do:</th><td><input type='text' id='do'></td></tr></tr > "
        txt += "<tr><td><button type='button' id='poOceni1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Pretraga</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt)
    });
    $("div").on("click", "#poCeni", function () {
        let txt = "";
        txt += "<div class='absolute'>"
        txt += "<table>"
        txt += "<tr><th colspan='2'>Pretraga po ceni</th></tr>";

        txt += "<tr><th>Od:</th><td><input type='text' id='od'></td></tr>"
        txt += "<tr> <th>Do:</th><td><input type='text' id='do'></td></tr></tr > "
        txt += "<tr><td><button type='button' id='poCeni1' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-floppy-saved' ></span> Pretraga</button ></td></tr>";

        txt += "</table>"
        txt += "</div>"
        $(tip).html(txt)
    });


    $("div").on("click", "#poDatumu1", function () {
        let odVrednost = $("#od").val();
        let doVrednost = $("#do").val();

        let odDatum = new Date(odVrednost);
        let doDatum = new Date(doVrednost);

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th><th>Ocena</th> <th>Status voznje:</th></tr>"
                    for (var i = 0; i < voznje.length; i++) {
                        if (new Date(voznje[i].DatumIVreme) > odDatum && new Date(voznje[i].DatumIVreme) < doDatum) {
                            txt += "<tr><td>" + voznje[i].DatumIVreme + "</td> <td>" + voznje[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + voznje[i].TipAuta + "</td> <td>" + voznje[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + voznje[i].KreatorVoznje + "</td> <td>" + voznje[i].VozacMusterije + "</td> <td>" + voznje[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + voznje[i].KomentarVoznje.Opis + "</textarea></td><td>" + voznje[i].KomentarVoznje.Ocena + "</td> <td>" + voznje[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }

        });
    });
    $("div").on("click", "#poOceni1", function () {
        let odVrednost = $("#od").val();
        let doVrednost = $("#do").val();

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th><th>Ocena</th> <th>Status voznje:</th></tr>"
                    for (var i = 0; i < voznje.length; i++) {
                        if (voznje[i].KomentarVoznje.Ocena >= odVrednost && voznje[i].KomentarVoznje.Ocena <= doVrednost) {
                            txt += "<tr><td>" + voznje[i].DatumIVreme + "</td> <td>" + voznje[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + voznje[i].TipAuta + "</td> <td>" + voznje[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + voznje[i].KreatorVoznje + "</td> <td>" + voznje[i].VozacMusterije + "</td> <td>" + voznje[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + voznje[i].KomentarVoznje.Opis + "</textarea></td><td>" + voznje[i].KomentarVoznje.Ocena + "</td> <td>" + voznje[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }
        })
    });
    
    $("div").on("click", "#poCeni1", function () {
            let odVrednost = $("#od").val();
            let doVrednost = $("#do").val();

        $.ajax({
            type: 'GET',
            url: 'api/Musterija/' + JSON.parse(localStorage.Ulogovan).KorisnickoIme,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                voznje = data;
                let txt = "";
                if (data.length == 0) {
                    alert("Lista voznji je prazna, ne postoji nijedna voznja!");
                }
                else {
                    txt += "<div class='absolute'>"
                    txt += "<table border = '1'>"
                    txt += "<tr><th>Datum i vreme:</th> <th>Grad(Polazak): </th> <th>Ulica i broj(Polazak):</th> <th>Tip automobila:</th> <th>Grad(Odrediste): </th> <th>Ulica i broj(Odrediste):</th> <th>Kreator voznje:</th> <th>Vozac:</th> <th>Iznos:</th> <th id='komentar'>Komentar:</th><th>Ocena</th> <th>Status voznje:</th></tr>"
                    for (var i = 0; i < voznje.length; i++) {
                        if (voznje[i].Iznos >= odVrednost && voznje[i].Iznos <= doVrednost) {
                            txt += "<tr><td>" + voznje[i].DatumIVreme + "</td> <td>" + voznje[i].Lokacija1.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Lokacija1.Adresa.UlicaBroj + "</td> <td>" + voznje[i].TipAuta + "</td> <td>" + voznje[i].Odrediste.Adresa.NaseljenoMestoBroj + "</td> <td>" + voznje[i].Odrediste.Adresa.UlicaBroj + "</td> <td>" + voznje[i].KreatorVoznje + "</td> <td>" + voznje[i].VozacMusterije + "</td> <td>" + voznje[i].Iznos + "</td> <td><textarea id='komentarVoznje' rows='1' cols='20'>" + voznje[i].KomentarVoznje.Opis + "</textarea></td><td>" + voznje[i].KomentarVoznje.Ocena + "</td> <td>" + voznje[i].Status + "</td></tr>"
                        }
                    }
                    txt += "</table>"
                    txt += "</div>"
                    $(tip).html(txt);
                }
            }
        })
    });

    if (localStorage.Ulogovan != "null") {
        if (JSON.parse(localStorage.Ulogovan).Uloga == "Dispecer") {
            $("#listaMojihVoznjiDispecer").click();
        }
        else if (JSON.parse(localStorage.Ulogovan).Uloga == "Korisnik") {
            $("#listaVoznji").click();
        }
        else if (JSON.parse(localStorage.Ulogovan).Uloga == "Vozac") {
            $("#listaVoznjiVozac").click();
        }
    }
});