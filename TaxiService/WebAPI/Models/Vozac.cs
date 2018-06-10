using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Vozac : Korisnik
    {
        Lokacija lokacija;
        Automobil automobil;

        public Vozac()
        {
            Lokacija = new Lokacija();
            Automobil = new Automobil();
        }

        public Lokacija Lokacija { get => lokacija; set => lokacija = value; }
        public Automobil Automobil { get => automobil; set => automobil = value; }
    }
}