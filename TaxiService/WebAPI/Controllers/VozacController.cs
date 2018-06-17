using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class VozacController : ApiController
    {
        [HttpPut, ActionName("PreuzmiLokaciju")]
        public Lokacija PutPreuzmiLokaciju(string id, [FromBody]Korisnik korisnik2)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));
            Lokacija retLokacija = null;
            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string temp = lines[i].Split(';')[10].Substring(1);
                    int duzina = temp.Length;
                    string temp1 = temp.Substring(0, duzina - 1);
                    retLokacija = new Lokacija()
                    {
                        X = temp1.Split(',')[0],
                        Y = temp1.Split(',')[1],
                        Adresa = new Adresa()
                        {
                            UlicaBroj = temp1.Split(',')[2],
                            NaseljenoMestoBroj = temp1.Split(',')[3]
                        }
                    };
                    break;
                }
            }
            return retLokacija;
        }

        [HttpPut, ActionName("LokacijaIzmena")]
        public bool PutLokacijaIzmena(string id, [FromBody]Lokacija lokacija)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string temp = lokacija.X + "," + lokacija.Y + "," + lokacija.Adresa.UlicaBroj + "," + lokacija.Adresa.NaseljenoMestoBroj;
                    string line = lines[i].Split(';')[0] + ";" + lines[i].Split(';')[1] + ";" + lines[i].Split(';')[2] + ";" + lines[i].Split(';')[3] + ";" + lines[i].Split(';')[4] + ";" + lines[i].Split(';')[5] + ";" + lines[i].Split(';')[6] + ";" + lines[i].Split(';')[7] + ";" + lines[i].Split(';')[8] + ";" + lines[i].Split(';')[9] + ";" + temp + ";" + lines[i].Split(';')[11];
                    lines[i] = line;
                    break;
                }
            }

            System.IO.File.WriteAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), lines);
            return true;
        }
    }
}
