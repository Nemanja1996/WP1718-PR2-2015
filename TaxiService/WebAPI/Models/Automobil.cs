﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Automobil
    {
        private string vozacAutomobila;
        private string godiste;
        private string registracija;
        private string brojTaksiVozila;
        private string tip;

        public string VozacAutomobila { get => vozacAutomobila; set => vozacAutomobila = value; }
        public string Godiste { get => godiste; set => godiste = value; }
        public string Registracija { get => registracija; set => registracija = value; }
        public string BrojTaksiVozila { get => brojTaksiVozila; set => brojTaksiVozila = value; }
        public string Tip { get => tip; set => tip = value; }
    }
}