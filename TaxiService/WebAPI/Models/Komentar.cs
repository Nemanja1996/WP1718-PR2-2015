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
        private string kreatorKomentara;
        private int ocena;

        public Komentar()
        {
            Opis = "";
            datumObjave = new DateTime();
            KreatorKomentara = "";
        }

        public string Opis { get => opis; set => opis = value; }
        public DateTime DatumObjave { get => datumObjave; set => datumObjave = value; }
        public string KreatorKomentara { get => kreatorKomentara; set => kreatorKomentara = value; }
        public int Ocena { get => ocena; set => ocena = value; }
    }
}