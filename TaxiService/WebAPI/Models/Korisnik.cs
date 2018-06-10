using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Korisnik
    {
        private string ime;
        private string prezime;
        private string pol;
        private string jmbg;
        private string korisnickoIme;
        private string lozinka;
        private string telefon;
        private string email;
        private string uloga;
        private List<Voznja> voznje;

        public Korisnik()
        {
            Ime = "";
            Prezime = "";
            Pol = "";
            Jmbg= "";
            KorisnickoIme = "";
            Lozinka = "";
            Telefon = "";
            Email = "";
            Uloga = "";
            Voznje = new List<Voznja>();
        }

        public string Ime { get => ime; set => ime = value; }
        public string Prezime { get => prezime; set => prezime = value; }
        public string Pol { get => pol; set => pol = value; }
        public string Jmbg { get => jmbg; set => jmbg = value; }
        public string KorisnickoIme { get => korisnickoIme; set => korisnickoIme = value; }
        public string Lozinka { get => lozinka; set => lozinka = value; }
        public string Telefon { get => telefon; set => telefon = value; }
        public string Email { get => email; set => email = value; }
        public string Uloga { get => uloga; set => uloga = value; }
        public List<Voznja> Voznje { get => voznje; set => voznje = value; }
    }
}