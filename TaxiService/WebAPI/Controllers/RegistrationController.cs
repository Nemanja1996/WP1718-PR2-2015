using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class RegistrationController : ApiController
    {
        [HttpPost]
        public bool Post([FromBody]Korisnik korisnik)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            foreach (var item in lines)
            {
               if( String.Equals(item.Split(';')[4], korisnik.KorisnickoIme))
               {
                    return false;
               }
            }

            string korisnikUpis = "\n" + korisnik.Ime + ";" + korisnik.Prezime + ";" + korisnik.Pol.ToString() + ";" + korisnik.Jmbg + ";" + korisnik.KorisnickoIme + ";" + korisnik.Lozinka + ";" + korisnik.Telefon + ";" + korisnik.Email + ";" + korisnik.Uloga + ";[];[];[];#";
            System.IO.File.AppendAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), korisnikUpis);

            return true;
        }

        [HttpPut]
        public bool Put(string id, [FromBody]Korisnik korisnik2)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string korisnikUpis = korisnik2.Ime + ";" + korisnik2.Prezime + ";" + korisnik2.Pol.ToString() + ";" + korisnik2.Jmbg + ";" + korisnik2.KorisnickoIme + ";" + korisnik2.Lozinka + ";" + korisnik2.Telefon + ";" + korisnik2.Email + ";" + lines[i].Split(';')[8] + ";" + lines[i].Split(';')[9] + ";" + lines[i].Split(';')[10] + ";" + lines[i].Split(';')[11] + ";" + lines[i].Split(';')[12] ;
                    for (int j = i + 1; j < lines.Length; j++)
                    {
                        string item = lines[j];
                        if (String.Equals(item.Split(';')[4], korisnik2.KorisnickoIme))
                        {
                            return false;
                        }
                    }
                    lines[i] = korisnikUpis;
                    string text = "";
                    for (int k = 0; k < lines.Length; k++)
                    {
                        text += lines[k];
                        if (k != lines.Length - 1)
                        {
                            text += "\n";
                        }
                    }
                    System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), text);
                    return true;
                }
            }
            return true;
        }
    }
}
