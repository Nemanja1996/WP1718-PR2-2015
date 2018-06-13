using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Komentar
    {
        private string opis;
        private DateTime datumObjave;
        private Korisnik kreatorKomentara;
        private Voznja komentarisanaVoznja;
        private int ocena;

        public string Opis { get => opis; set => opis = value; }
        public DateTime DatumObjave { get => datumObjave; set => datumObjave = value; }
        public Korisnik KreatorKomentara { get => kreatorKomentara; set => kreatorKomentara = value; }
        public Voznja KomentarisanaVoznja { get => komentarisanaVoznja; set => komentarisanaVoznja = value; }
        public int Ocena { get => ocena; set => ocena = value; }
    }
}