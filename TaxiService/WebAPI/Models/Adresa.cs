using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Adresa
    {
        private string ulicaBroj;
        private string naseljenoMestoBroj;

        public Adresa()
        {
            UlicaBroj = "";
            NaseljenoMestoBroj = "";
        }

        public string UlicaBroj { get => ulicaBroj; set => ulicaBroj = value; }
        public string NaseljenoMestoBroj { get => naseljenoMestoBroj; set => naseljenoMestoBroj = value; }
    }
}