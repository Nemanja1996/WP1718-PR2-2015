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
    public class LogInController : ApiController
    {
        Korisnik k = null;

        public Korisnik Get()
        {
            return k;
        }

        //Izmeniti povratnu vrednost staviti da je akcija tipa void i ispitati tako......
        public void Post([FromBody]Korisnik korisnik)
        {
            
            Dictionary<string, Korisnik> korisnici = new Dictionary<string, Korisnik>();
            string path = Directory.GetCurrentDirectory();
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            
            foreach (var item in lines)
            {
                if (String.Equals(item.Split(' ')[4], korisnik.KorisnickoIme) && String.Equals(item.Split(' ')[5], korisnik.Lozinka))
                {
                    k = new Korisnik()
                    {
                        Ime = item.Split(' ')[0],
                        Prezime = item.Split(' ')[1],
                        Pol = item.Split(' ')[2],
                        Jmbg = item.Split(' ')[3],
                        KorisnickoIme = item.Split(' ')[4],
                        Lozinka = item.Split(' ')[5],
                        Telefon = item.Split(' ')[6],
                        Email = item.Split(' ')[7],
                        Uloga = item.Split(' ')[8]
                    };
                    break;
                }

            }

            
        }
    }
}
