using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Automobil
    {
        Vozac vozacAutomobila;
        string godiste;
        string registracija;
        string brojTaksiVozila;
        TipAutomobila tip;

        public Vozac VozacAutomobila { get => vozacAutomobila; set => vozacAutomobila = value; }
        public string Godiste { get => godiste; set => godiste = value; }
        public string Registracija { get => registracija; set => registracija = value; }
        public string BrojTaksiVozila { get => brojTaksiVozila; set => brojTaksiVozila = value; }
        public TipAutomobila Tip { get => tip; set => tip = value; }
    }
}