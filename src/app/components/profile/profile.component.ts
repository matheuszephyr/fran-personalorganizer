import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  inputSearchCityId = "search-city-input";
  googleMapURLTemplate = "https://maps.google.com/maps?q={{CITY}}&t=&z=13&ie=UTF8&iwloc=&output=embed"

  linkTree: {[index: string]:any} = {
    "instagram" : "https://www.instagram.com/fran_organizer2",
    "facebook" : "https://www.facebook.com/ffran.organizer",
    "whatsapp" : "https://api.whatsapp.com/send?phone=5516992961888&text=Ol%C3%A1%20Francisca,%20gostaria%20de%20falar%20sobre%20seus%20servi%C3%A7os!",
    "email" : "mailto: ffranorganizer@gmail.com"
  }

  cityList: string[] = ["Orlandia", "Sao Paulo", "Texas"]
  cityListString: string = "Barretos, Batatais, Bragança Paulista, Catanduva, Franca, Garça, Guaíra, Guará, Igarapava, Ipuã, Ituverava, Jardinópolis, Miguelópolis, Morro Agudo, Nuporanga, Orlândia, Patrocínio Paulista, Pindorama, Ribeirão Preto, Sales Oliveira, Santos, São Carlos, São Joaquim da Barra, São José da Bela Vista, São Paulo, Serrana, Sertãozinho";
  
  constructor() { }

  ngOnInit(): void {

    var listConvert = this.cityListString.split(",");    

    listConvert.map((city) => {
      city = city.trim();
    });

    this.cityList = listConvert;
  }

  socialMediaRedirect(key: string){
    window.open(this.linkTree[key], '_blank');
  }

  searchCity(name?: string){
    var input = <HTMLInputElement>document.getElementById(this.inputSearchCityId);
    var googleMapElement = document.getElementById("gmap_canvas");

    var inputValue = name != null && name != "" ? name : input.value;    

    if (inputValue == null || inputValue == ""){
      alert("Cidade inválida!");
      return;
    }

    if (this.validCity(inputValue) == false){
      alert("Cidade indisponivel para atendimento!");
      return;
    }

    var newLocationUrl = this.googleMapURLTemplate.replace("{{CITY}}", inputValue);
    googleMapElement?.setAttribute("src", newLocationUrl);

    input.value = inputValue;
  }

  validCity(name: string): boolean{
    var result = false;

    this.cityList.map((city) => {
      var cityName = city.toLowerCase().trim();
      var cityParsed = cityName.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z])/g, '');
      var nameParsed = name.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z])/g, '').toLowerCase().trim();

      console.log("2",cityParsed);
      console.log(nameParsed);
      if(cityParsed == nameParsed)
        result = true;        

    });

    return result;
  }

}
