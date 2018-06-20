using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Lokacija
    {
        private string x;
        private string y;
        private Adresa adresa;

        public Lokacija()
        {
            X = "";
            Y = "";
            Adresa = new Adresa();
        }

        public string X { get => x; set => x = value; }
        public string Y { get => y; set => y = value; }
        public Adresa Adresa { get => adresa; set => adresa = value; }
    }
}