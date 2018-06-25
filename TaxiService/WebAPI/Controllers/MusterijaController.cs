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
        public bool Put(string id, [FromBody]Voznja voznja)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));
            string korisnik = id.Split('|')[1];
            string idVoznje = id.Split('|')[0];
            string temp = "{" + voznja.DatumIVreme + "," + voznja.Lokacija1.X + "," + voznja.Lokacija1.Y + "," + voznja.Lokacija1.Adresa.UlicaBroj + "," + voznja.Lokacija1.Adresa.NaseljenoMestoBroj + "," + voznja.TipAuta + "," + voznja.Pozivaoc + "," + voznja.Odrediste.X + "," + voznja.Odrediste.Y + "," + voznja.Odrediste.Adresa.UlicaBroj + "," + voznja.Odrediste.Adresa.NaseljenoMestoBroj + "," + voznja.KreatorVoznje + "," + voznja.VozacMusterije + "," + voznja.Iznos.ToString() + "," + "{"+ DateTime.Now.ToString() +"+"+ voznja.KomentarVoznje.Opis +"+"+ voznja.KomentarVoznje.KreatorKomentara +"+"+ voznja.KomentarVoznje.Ocena +"}" + "," + voznja.Status + "}";

            for (int i = 0; i<lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], korisnik))
                {
                    string line = lines[i];
                    int duzina = line.Split(';')[9].Length;
                    string voznje = line.Split(';')[9].Substring(1, duzina - 2);

                    string[] voznje1 = voznje.Split('|');

                    voznje1[Convert.ToInt32(idVoznje)] = temp;

                    string voznjeUpis = "[";
                    for (int j = 0; j < voznje1.Length; j++)
                    {
                        voznjeUpis += voznje1[j] + "|";
                    }
                    int duzinaUpis = voznjeUpis.Length;
                    voznjeUpis = voznjeUpis.Substring(0, duzinaUpis-1);
                    voznjeUpis += "]";

                    int index = line.IndexOf('[');
                    int index1 = line.IndexOf(']');
                    int duzina1 = line.Length - index1 - 1;

                    string line1 = line.Substring(0, index) + voznjeUpis + line.Substring(index1 + 1, duzina1);
                    lines[i] = line1;
                }
            }
            System.IO.File.WriteAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), lines);
            return true;
        }

        [HttpPost]
        public bool Post([FromBody]Voznja voznja)
        {
            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], voznja.Pozivaoc))
                {
                    string temp = "{" + DateTime.Now.ToString() + "," + voznja.Lokacija1.X + "," + voznja.Lokacija1.Y + "," + voznja.Lokacija1.Adresa.UlicaBroj + "," + voznja.Lokacija1.Adresa.NaseljenoMestoBroj + "," + voznja.TipAuta + "," + voznja.Pozivaoc + "," + voznja.Odrediste.X + "," + voznja.Odrediste.Y + "," + voznja.Odrediste.Adresa.UlicaBroj + "," + voznja.Odrediste.Adresa.NaseljenoMestoBroj + "," + voznja.KreatorVoznje + "," + voznja.VozacMusterije + "," + voznja.Iznos.ToString() + "," + "{+++}" + "," + voznja.Status + "}|";
                    int index = lines[i].IndexOf('[');
                    string line1 = lines[i].Substring(0, index + 1);
                    string line2 = line1 + temp + lines[i].Substring(index + 1);

                    lines[i] = line2;
                    break;
                }
            }

            System.IO.File.WriteAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"), lines);

            return true;
        }

        [HttpGet]
        public List<Voznja> Get(string id)
        {
            List<Voznja> retLista = new List<Voznja>();

            string[] lines = System.IO.File.ReadAllLines(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/UserDataBase.txt"));

            for (int i = 0; i < lines.Length; i++)
            {
                if (String.Equals(lines[i].Split(';')[4], id))
                {
                    string voznje = lines[i].Split(';')[9];
                    int duzina = voznje.Length;
                    string voznje1 = voznje.Substring(1, duzina - 2);

                    string[] voznje2 = voznje1.Split('|');
                    for (int j = 0; j < voznje2.Count(); j++)
                    {
                        int duzina1 = voznje2[j].Length;
                        string voznje3 = voznje2[j].Substring(1, duzina1 - 2);

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
                        if (!String.Equals((komentarString).Split('+')[1], "")) {
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
                        retLista.Add(voznjaRet);
                    }

                    break;
                }
            }

            return retLista;
        }
    }
}
