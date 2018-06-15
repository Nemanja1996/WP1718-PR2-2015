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

            string korisnikUpis = korisnik.Ime + ";" + korisnik.Prezime + ";" + korisnik.Pol.ToString() + ";" + korisnik.Jmbg + ";" + korisnik.KorisnickoIme + ";" + korisnik.Lozinka + ";" + korisnik.Telefon + ";" + korisnik.Email + ";" + "Korisnik;" + "[]";
            System.IO.File.AppendAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), korisnikUpis);

            return true;
        }
    }
}
