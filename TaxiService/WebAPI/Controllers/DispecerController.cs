using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class DispecerController : ApiController
    {
        [HttpPost]
        public bool Post([FromBody]Vozac vozac)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            foreach (var item in lines)
            {
                if (String.Equals(item.Split(';')[4], vozac.KorisnickoIme))
                {
                    return false;
                }
            }

            string korisnikUpis = "\n" + vozac.Ime + ";" + vozac.Prezime + ";" + vozac.Pol.ToString() + ";" + vozac.Jmbg + ";" + vozac.KorisnickoIme + ";" + vozac.Lozinka + ";" + vozac.Telefon + ";" + vozac.Email + ";" + vozac.Uloga + ";[];["+ vozac.Lokacija1.X + "," + vozac.Lokacija1.Y + "," + vozac.Lokacija1.Adresa.UlicaBroj + "," + vozac.Lokacija1.Adresa.NaseljenoMestoBroj+"];["+vozac.Automobil.VozacAutomobila+ "," + vozac.Automobil.Godiste + "," + vozac.Automobil.Registracija + "," + vozac.Automobil.BrojTaksiVozila + "," + vozac.Automobil.Tip +"];0";
            System.IO.File.AppendAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), korisnikUpis);

            return true;
        }

        [HttpPut]
        public bool Put(string id, [FromBody]Voznja voznja)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    if (String.Equals(lines[i].Split(';')[12], "0")) {
                        string temp = "{" + DateTime.Now.ToString() + "," + voznja.Lokacija1.X + "," + voznja.Lokacija1.Y + "," + voznja.Lokacija1.Adresa.UlicaBroj + "," + voznja.Lokacija1.Adresa.NaseljenoMestoBroj + "," + voznja.TipAuta + "," + voznja.Pozivaoc + "," + voznja.Odrediste.X + "," + voznja.Odrediste.Y + "," + voznja.Odrediste.Adresa.UlicaBroj + "," + voznja.Odrediste.Adresa.NaseljenoMestoBroj + "," + voznja.KreatorVoznje + "," + voznja.VozacMusterije + "," + voznja.Iznos.ToString() + "," + "{+++}" + "," + voznja.Status + "}|";
                        int index = lines[i].IndexOf('[');
                        string line1 = lines[i].Substring(0, index + 1);
                        string line2 = line1 + temp + lines[i].Substring(index + 1);
                        int duzina = line2.Length;
                        line2 = line2.Substring(0, duzina - 1) + "1";
                        lines[i] = line2;

                        break;
                    }
                    else
                    {
                        return false;
                    }
                }
            }

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

        [HttpGet]
        public List<string> Get(string id)
        {
            List<string> retList = new List<string>();
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[8], "Vozac"))
                {
                    int duzina = lines[i].Split(';')[11].Length;
                    string automobil = lines[i].Split(';')[11].Substring(1, duzina - 2);
                    string tipAutomobila = automobil.Split(',')[4];
                    if (String.Equals(lines[i].Split(';')[12], "0"))
                    {
                        if (String.Equals(id, tipAutomobila))
                        {
                            retList.Add(lines[i].Split(';')[4]);
                        }
                    }
                }
            }

            return retList;
        }

        [HttpGet]
        public List<Voznja> Get()
        {
            List<Voznja> retList = new List<Voznja>();
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[8], "Korisnik"))
                {
                    string voznje = lines[i].Split(';')[9];
                    int duzina = voznje.Length;
                    if (duzina > 2) {
                        string voznje1 = voznje.Substring(1, duzina - 3);

                        string[] voznje2 = voznje1.Split('|');
                        for (int j = 0; j < voznje2.Count(); j++)
                        {
                            int duzina1 = voznje2[j].Length;
                            string voznje3 = voznje2[j].Substring(1, duzina1 - 2);

                            if (String.Equals(voznje3.Split(',')[15], "KreiranaNaCekanju")) {
                                Lokacija lokTemp = new Lokacija();
                                lokTemp.X = voznje3.Split(',')[1];
                                lokTemp.Y = voznje3.Split(',')[2];

                                Adresa adresaTemp = new Adresa()
                                {
                                    UlicaBroj = voznje3.Split(',')[3],
                                    NaseljenoMestoBroj = voznje3.Split(',')[4]
                                };
                                lokTemp.Adresa = adresaTemp;

                                Lokacija lokacija2 = new Lokacija();
                                lokacija2.X = voznje3.Split(',')[7];
                                lokacija2.Y = voznje3.Split(',')[8];
                                Adresa adresaTemp2 = new Adresa()
                                {
                                    UlicaBroj = voznje3.Split(',')[9],
                                    NaseljenoMestoBroj = voznje3.Split(',')[10]
                                };
                                lokacija2.Adresa = adresaTemp2;
                                Komentar koment = new Komentar();

                                int komentDuzina = voznje3.Split(',')[14].Length;
                                string komentarString = voznje3.Split(',')[14].Substring(1, komentDuzina - 2);

                                koment.Opis = ((komentarString).Split('+')[1]);
                                if (!String.Equals((komentarString).Split('+')[1], ""))
                                {
                                    koment.DatumObjave = Convert.ToDateTime((komentarString).Split('+')[0]);
                                }
                                koment.KreatorKomentara = (komentarString).Split('+')[2];
                                if (!String.Equals((komentarString).Split('+')[3], ""))
                                {
                                    koment.Ocena = Int32.Parse(((komentarString).Split('+')[3]));
                                }
                                else
                                {
                                    koment.Ocena = 0;
                                }

                                int statusLen = voznje3.Split(',')[15].Length;
                                string status = (voznje3.Split(',')[15]).Substring(0, statusLen);

                                Voznja voznjaRet = new Voznja()
                                {
                                    DatumIVreme = Convert.ToDateTime(voznje3.Split(',')[0]),
                                    Lokacija1 = lokTemp,
                                    TipAuta = voznje3.Split(',')[5],
                                    Pozivaoc = voznje3.Split(',')[6],
                                    Odrediste = lokacija2,
                                    KreatorVoznje = voznje3.Split(',')[11],
                                    VozacMusterije = voznje3.Split(',')[12],
                                    Iznos = Int32.Parse(voznje3.Split(',')[13]),
                                    KomentarVoznje = koment,
                                    Status = status
                                };
                                retList.Add(voznjaRet);


                            }
                        }
                    }
                }
            }

            return retList;
        }
    }
}
