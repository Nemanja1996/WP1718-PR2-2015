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
        [HttpPut]
        public Lokacija Put(string id, [FromBody]Korisnik korisnik2)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));
            Lokacija retLokacija = null;
            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string temp = lines[i].Split(';')[10].Substring(1);
                    retLokacija = new Lokacija()
                    {
                        X = temp.Split(',')[0],
                        Y = temp.Split(',')[1],
                        Adresa = new Adresa()
                        {
                            UlicaBroj = temp.Split(',')[2],
                            NaseljenoMestoBroj = temp.Split(',')[3]
                        }
                    };
                    break;
                }
            }
            return retLokacija;
        }
    }
}
