using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MusterijaController : ApiController
    {
        [HttpPut]
        public bool Put(string id, [FromBody]Korisnik korisnik2)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string korisnikUpis = korisnik2.Ime + ";" + korisnik2.Prezime + ";" + korisnik2.Pol.ToString() + ";" + korisnik2.Jmbg + ";" + korisnik2.KorisnickoIme + ";" + korisnik2.Lozinka + ";" + korisnik2.Telefon + ";" + korisnik2.Email + ";" + "Korisnik;" + "[]";
                    foreach (var item in lines)
                    {
                        if (String.Equals(item.Split(';')[4], korisnik2.KorisnickoIme))
                        {
                            return false;
                        }
                    }
                    lines[i] = korisnikUpis;
                    System.IO.File.WriteAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), lines);
                    return true;
                }
            }
            return true;
        }
    }
}
