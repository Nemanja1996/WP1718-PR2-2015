using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Voznja
    {
        DateTime datumIVreme;
        Lokacija lokacija;
        TipAutomobila tipAuta;
        Musterija pozivaoc;
        Lokacija odrediste;
        Dispecer kreatorVoznje;
        Vozac vozacMusterije;
        int inzos;
        Komentar komentarVoznje;
        StatusVoznje status;

        public Voznja()
        {

        }

        public DateTime DatumIVreme { get => datumIVreme; set => datumIVreme = value; }
        public Lokacija Lokacija { get => lokacija; set => lokacija = value; }
        public TipAutomobila TipAuta { get => tipAuta; set => tipAuta = value; }
        public Musterija Pozivaoc { get => pozivaoc; set => pozivaoc = value; }
        public Lokacija Odrediste { get => odrediste; set => odrediste = value; }
        public Dispecer KreatorVoznje { get => kreatorVoznje; set => kreatorVoznje = value; }
        public Vozac VozacMusterije { get => vozacMusterije; set => vozacMusterije = value; }
        public int Inzos { get => inzos; set => inzos = value; }
        public Komentar KomentarVoznje { get => komentarVoznje; set => komentarVoznje = value; }
        public StatusVoznje Status { get => status; set => status = value; }
    }
}