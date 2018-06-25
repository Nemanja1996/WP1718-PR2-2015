using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Vozac : Korisnik
    {
        Lokacija lokacija1;
        Automobil automobil;

        public Vozac()
        {
            Lokacija1 = new Lokacija();
            Automobil = new Automobil();
        }

        public Lokacija Lokacija1 { get => lokacija1; set => lokacija1 = value; }
        public Automobil Automobil { get => automobil; set => automobil = value; }
    }
}