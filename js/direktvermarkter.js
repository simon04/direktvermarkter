//Karte

var map = L.map('map',{
    center: [48.99,8.4242],
    zoom: 11,
    minZoom:2,
    maxZoom: 18
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; &#124; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <a href="https://github.com/CodeforKarlsruhe/direktvermarkter">Github</a>'
}).addTo(map);

//Daten
function popupcontent (feature, layer) {
  var street = "test";
  var plz = "";
  var housenr = "";
  var city = "";
  var country = "";
  var suburb = "";

    var popupcontent = [];
    for (var prop in feature.properties) {


      if (prop == "@id" || prop == "shop" || prop == "name"|| prop == "addr:city"|| prop == "addr:country"|| prop == "addr:housenumber"|| prop == "addr:postcode" || prop == "addr:suburb" || prop == "addr:street"){
        console.log(prop +" "+feature.properties[prop] +" in Tabelle unsichtbar");
        //do nothing
        }
      else if (prop == "addr:street"){
          street = "feature.properties[prop]";
          }
      else if (prop == "website" || prop == "contact:website"){
          popupcontent.unshift("<tr><td><strong>"
          +prop.replace("website","Internetseite").replace("contact:","") + ":</strong> </td><td>" + "<a link href='"
          + feature.properties[prop] + "' target='_blank'>"
          + feature.properties[prop] +"</a></td></tr>");
        }
        else if (prop == "fixme"){
            popupcontent.push("<tr><td><strong>"
            +prop.replace("fixme","Unklare Daten") + ":</strong> </td><td>"
            + feature.properties[prop].replace("position estimated","Position geschätzt")
            +" <a href='http://openstreetmap.org/" +feature.id  +"'> Daten Verbessern</a>");
            }

        else {
          popupcontent.push("<tr><td><strong>"
          + prop
          .replace(":", " ")
          .replace("addr ", "")
          .replace("name", "Name")
          .replace("opening_hours", "Öffnungszeiten")
          .replace("city", "Stadt")
          .replace("housenumber", "Hausnummer")
          .replace("phone", "Telefon")
          .replace("operator", "Betreiber")
          .replace("postcode", "Postleitzahl")
          .replace("street", "Straße")
          .replace("organic", "Biologisch")
          .replace("produce","Produzieren")
          .replace("product","Produkt(e)")
          .replace("contact","")
          .replace("suburb","Bezirk")
          .replace("description","Beschreibung")
          .replace("building","Gebäude")
          .replace("wheelchair","Rollstuhlgerecht")
          .replace("payment coins","Nimmt Münzen")
          .replace("payment notes","Nimmt Scheine")
          .replace("payment cash","Nimmt Bargeld")
          .replace("vending","Verkauft")
          .replace("amenity","Einrichtung ")
          .replace("country","Land")
          .replace("houseName","Hausname")
          .replace("milk", "Milch")
          .replace("covered", "Überdacht")
          .replace("lastcheck", "Letze Überprüfung")
          .replace("source", "Quelle")

          + ":</strong> </td><td>"
          + feature.properties[prop]
          .replace(";", ", ")
          .replace("yes", "ja")
          .replace("only", "nur")
          .replace("vending_machine","Verkaufsautomat")
          .replace("raw_milk", "Rohmilch")
          + "</td></tr>");
        }


    }
    popupcontent.unshift("<tr><td><strong>Adresse </td><td>" +feature.properties.name +"</td></tr>");

    var innereTabelle = popupcontent.join("");
    var htmlInhalt = "<h1>" +feature.properties.name +"</h1>"
        +"<table>"
        +innereTabelle
        + "</table>"
        +"<p class='popupText'>Fehlende oder falsche Angaben? Trage Daten für diesen Ort <a href='http://openstreetmap.org/" +feature.id  +"'> auf Opentreetmap</a> ein! <br>Die Daten werden regelmäßig abgeglichen.</p>";



    return htmlInhalt
};

//Darstellung

var geojson1 = L.geoJson(karlsruhe,{
    onEachFeature: function(feature,layer){
        if (feature.geometry.type === 'Polygon') {
            console.log('Polygon detected');
            var centroid = turf.centroid(feature);
            var lon = centroid.geometry.coordinates[0];
            var lat = centroid.geometry.coordinates[1];
            L.marker([lat,lon]).addTo(map).bindPopup(popupcontent(feature,layer));
        }
        else if (feature.geometry.type === 'Point') {
            console.log("Point detected");
            layer.bindPopup(popupcontent(feature,layer));

}
}});

geojson1.addTo(map);



L.control.scale().addTo(map);
