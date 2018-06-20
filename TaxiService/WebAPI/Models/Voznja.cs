using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Voznja
    {
        DateTime datumIVreme;
        Lokacija lokacija1;
        string tipAuta;
        string pozivaoc;
        Lokacija odrediste;
        string kreatorVoznje;
        string vozacMusterije;
        int iznos;
        Komentar komentarVoznje;
        string status;

        public Voznja()
        {
            komentarVoznje = new Komentar();
            odrediste = new Lokacija();
        }

        public DateTime DatumIVreme { get => datumIVreme; set => datumIVreme = value; }
        public Lokacija Lokacija1 { get => lokacija1; set => lokacija1 = value; }
        public string TipAuta { get => tipAuta; set => tipAuta = value; }
        public string Pozivaoc { get => pozivaoc; set => pozivaoc = value; }
        public Lokacija Odrediste { get => odrediste; set => odrediste = value; }
        public string KreatorVoznje { get => kreatorVoznje; set => kreatorVoznje = value; }
        public string VozacMusterije { get => vozacMusterije; set => vozacMusterije = value; }
        public int Iznos { get => iznos; set => iznos = value; }
        public Komentar KomentarVoznje { get => komentarVoznje; set => komentarVoznje = value; }
        public string Status { get => status; set => status = value; }
    }
}