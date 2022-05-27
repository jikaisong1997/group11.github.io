const covid_regioni = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json";
const covid_province = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json";

/* Layers */
const layer_basico = new L.TileLayer('https://api.mapbox.com/styles/v1/sbibbof/ckhjt37bw4p1a19kzdtzhnr3e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2JpYmJvZiIsImEiOiJja2dyMHBqaGswOWR2MnpvN3E4OWFpbGNuIn0.qAXx979h5T2-NOhIv3sCRg', {noWrap: true});
const layer_rilievi = new L.TileLayer('https://api.mapbox.com/styles/v1/sbibbof/ckgr0u13m0xj619opait0jcv1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2JpYmJvZiIsImEiOiJja2dyMHBqaGswOWR2MnpvN3E4OWFpbGNuIn0.qAXx979h5T2-NOhIv3sCRg', {noWrap: true});
const layer_strade = new L.TileLayer('https://api.mapbox.com/styles/v1/sbibbof/ckhjstoc84omt19qctz0ev1en/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2JpYmJvZiIsImEiOiJja2dyMHBqaGswOWR2MnpvN3E4OWFpbGNuIn0.qAXx979h5T2-NOhIv3sCRg', {noWrap: true});
const layer_scuro = new L.TileLayer('https://api.mapbox.com/styles/v1/sbibbof/ckhjt6ik14p1h19np4fcgdzg1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2JpYmJvZiIsImEiOiJja2dyMHBqaGswOWR2MnpvN3E4OWFpbGNuIn0.qAXx979h5T2-NOhIv3sCRg', {noWrap: true});
const layer_group = [layer_rilievi, layer_strade, layer_scuro, layer_basico];

const capitali = "https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json";
const covid_mondo = "https://api.covid19api.com/summary";
let stati = new Array(), regioni, province;
let dic = new Array()
let dicp = new Array()

let overlays = []; //salvo qui tutti gli overlay creati
let posRoma = {
    lat: 51.5072,
    long: 0.1276
};

let pos = {
    lat: posRoma.lat,
    long: posRoma.long
};

let modalità = 'regioni';

let stato_mappa = {
    container: 'map',
    center: new L.LatLng(posRoma.lat, posRoma.long),
    zoom: 6, 
    minZoom: 2,
    maxBounds: [
        [85, -177.4],
        [-85, 177.4]
    ],
    layers: layer_group
}


function setZoom() {
    /* mobile friendly zoom */
    let isMediumMobile = window.matchMedia("only screen and (max-width: 420px)").matches;
    let isMobile = window.matchMedia("only screen and (max-width: 575px)").matches;
    if (isMediumMobile) stato_mappa.zoom = 4;
    else if (isMobile) stato_mappa.zoom = 5;
}

let mappa = new L.Map('mappa', stato_mappa);

async function main() {
    try{
        await getDataFromFiles();
        await setDati();
    } catch (ex) {
        console.error('Fetch dei dati non conclusa');
    };
    /* imposto lo zoom in base al dispositivo utilizzato */
    setZoom();
    /* imposto la mappa in modo da poter cambiare modalità */
    zoomControl(mappa);
    timebar()
    drawNations3(infected_by_countries_and_dates)

    const baseMaps = {
        "1": layer_rilievi,
        "2": layer_strade,
        "3": layer_scuro,
        "4": layer_basico
    };
    L.control.layers(baseMaps).addTo(mappa); 
    var legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function (mappa) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 30, 40, 50, 60, 70],
            labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML = "⚪ area ≒ Cum cases<br>Cases rate % <br> "
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        
        return div;
    };
    
    legend.addTo(mappa);

}
function getColor(d) {
    return d > 70 ? '#800026' :
    d > 50  ? '#BD0026' :
    d > 40  ? '#E31A1C' :
    d > 30  ? '#FC4E2A' :
    d > 20   ? '#FD8D3C' :
    d > 10   ? '#FEB24C' :
    d > 5   ? '#FED976' :
               '#FFEDA0';
}
this.main();

async function setDati() {


    //adjust slider
    var slider = document.getElementById('timeline');
    slider.min = 0;
    slider.max = dates.length - 1;
    slider.value = dates.length - 1;
    //perpare country name - code dic
    for (var i = 0; i < countryCodes.length; i++) {
        dic[countryCodes[i].name] = countryCodes[i].code
    }
    dic['US'] = 'US'
    dic['China'] = 'CN'
    //perpare country name - pop dic
    for (var i = 0; i < countryPop.length; i++) {
        dicp[countryPop[i].country] = countryPop[i].population
    }
    // regioni = await fetch(covid_regioni).then(r => r.json());
    // province = await fetch(covid_province).then(r => r.json());
    await fetch(covid_mondo)
        .then(r => r.json())
        .then(file => {
            file.Countries.forEach(element => {
                stati[element.CountryCode] = element
            });
        });
    fetch(capitali)
        .then(r => r.json())
        .then(file => {
            let i = 0;
            file.forEach(element => {
                stati[element.country_code] = { ...stati[element.country_code], lat: element.latlng[0], long: element.latlng[1] }
                stati[i++] = stati[element.country_code]
        });
    });
}

function success(position) {
    pos.lat = position.coords.latitude;
    pos.long = position.coords.longitude;
}

function error() {
    pos.lat = 41.879156;
    pos.long = 12.457727;
}

function zoomControl(map) {
    let titolo = document.getElementById('titolo');
    map.on('zoomend', function (event) {
        drawNations3(infected_by_countries_and_dates);
        // else if (mappa.getZoom() <= 7) {
        //     // drawItaly(regioni);
        //     titolo.innerText = 'Regioni italiane';
        // }
        // else {
        //     // drawItaly(province);
        //     titolo.innerText = 'Province italiane';
        // }
    });
}

// function drawItaly(data) {
//     let modRegioni = data[0].denominazione_provincia == null;

//     removeOverlays(mappa, overlays);

//     //per ogni dato (provincia o regione), creo un cerchio
//     //con dimensioni e colori variabili
//     for (const i in data) {
//         if (data[i].lat != null && data[i].long != null) {
//             const luogo = data[i];
//             let diametro = 0;
//             let bordo, fill;
//             if (luogo.totale_casi >= 20000) {
//                 if (modRegioni) diametro = 5;
//                 else diametro = 4;
//                 fill = 'red';
//             } else if (luogo.totale_casi >= 15000) {
//                 if (modRegioni) diametro = 4;
//                 else diametro = 3.5;
//                 fill = 'orange';
//             } else if (luogo.totale_casi >= 10000) {
//                 diametro = 3;
//                 fill = 'coral';
//             } else {
//                 diametro = 1.5;
//                 fill = 'yellow';
//             }
//             if (modRegioni) diametro *= 10000;
//             else diametro *= 6000;

//             //creo il cerchio e lo aggiungo nella mappa
//             const cerchio = L.circle([luogo.lat, luogo.long], diametro, {
//                 color: fill,
//                 fillOpacity: 0.4
//             }).addTo(mappa);

//             overlays.push(cerchio);

//             //se premo un cerchio creo (e riempio con dei dati) una tabella
//             //nella card a sinistra e faccio comparire un popup nella mappa
//             cerchio.on("click", function() {
//                 let nome = luogo.denominazione_regione;
//                 if (!modRegioni)
//                     nome += ' - ' + luogo.denominazione_provincia;

//                 //creo il popup e lo aggiungo alla mappa
//                 let stemma = "https://www.su-misura.biz/wp-content/uploads/2018/04/bandiera-della-regione-"
//                 if (luogo.denominazione_regione.toLowerCase() == 'valle d\'aosta') stemma += 'valle-dAosta';
//                 else if (luogo.denominazione_regione.toLowerCase() == 'p.a. trento' || luogo.denominazione_regione.toLowerCase() == 'p.a. bolzano')
//                     stemma += 'trentino-alto-adige';
//                 else stemma += luogo.denominazione_regione.toLowerCase().replace(/\s/g, '-');
                
//                 const popup = L.popup()
//                     .setLatLng(L.latLng(luogo.lat, luogo.long))
//                     .setContent('<p><b>' +
//                         '<img class="bandiera" src= ' + stemma + '.png">' +
//                         nome + '</b><br>' + luogo.totale_casi.toLocaleString() + ' casi totali</p>')
//                     .openOn(mappa);
                
//                 if (modRegioni) {    
//                 popup.setContent('<p><b>' +
//                         '<img class="bandiera" src= ' + stemma + '.png">' +
//                         nome + '</b><br> Casi: ' + luogo.totale_casi.toLocaleString() + ' <span style="color: green"> ( +' + luogo.nuovi_positivi.toLocaleString() + ') </span></p>')
//                 }

//                 let tabella_body = createTable(nome, luogo.note, luogo.data);
//                 if (!modRegioni) {
//                   [
//                     ['Codice provincia', luogo.codice_provincia],
//                     ['Casi totali', luogo.totale_casi],
//                   ].forEach(coppia => {
//                     try {
//                     tabella_body.appendChild(getRiga(coppia[0], coppia[1].toLocaleString()));
//                     } catch (err) {};
//                   });
//                 } else {
//                   [
//                     ['Casi totali', luogo.totale_casi],
//                     ['Totale positivi', luogo.totale_positivi],
//                     ['Dimessi guariti', luogo.dimessi_guariti],
//                     ['Deceduti', luogo.deceduti],
//                     ['Terapia intensiva', luogo.terapia_intensiva],
//                     ['Totale ospedalizzati', luogo.totale_ospedalizzati],
//                     ['Isolamento domiciliare', luogo.isolamento_domiciliare],
//                     ['Ricoverati con sintomi', luogo.ricoverati_con_sintomi],
//                     ['Tamponi', luogo.tamponi],
//                     ['Casi testati', luogo.casi_testati],
//                     ['Nuovi positivi', luogo.nuovi_positivi],
//                     ['Variazione totale positivi', luogo.variazione_totale_positivi],
//                     ['Casi da sospetto diagnostico', luogo.casi_da_sospetto_diagnostico],
//                     ['Casi da screening', luogo.casi_da_screening]
//                   ].forEach(coppia => {
//                     try {
//                     tabella_body.appendChild(getRiga(coppia[0], coppia[1].toLocaleString()));
//                     } catch (err) {};
//                   });
//                 }
//             });
//         }
//     };

//     //se non ho ancora aggiornato la posizione attuale, lo faccio
//     if (pos.lat == posRoma.lat && pos.long == posRoma.long) {
//         navigator.geolocation.getCurrentPosition(success, error);
//     } else L.marker([pos.lat, pos.long]).addTo(mappa);
// }

function getRiga(testo_colonna_prima, testo_colonna_seconda) {
    const riga = document.createElement("tr");
    const colonna_prima = document.createElement("th");
    colonna_prima.scope = 'row';
    colonna_prima.innerText = testo_colonna_prima;

    const colonna_seconda = document.createElement("td");
    colonna_seconda.innerText = testo_colonna_seconda;

    riga.appendChild(colonna_prima);
    riga.appendChild(colonna_seconda);
    return riga;
}

function getData(data) {
    let anno = data.slice(0, 4);
    let mese = data.slice(5, 7);
    let nomeMese;
    switch (mese) {
        case '01':
            nomeMese = 'gennaio';
            break;
        case '02':
            nomeMese = 'febbraio';
            break;
        case '03':
            nomeMese = 'marzo';
            break;
        case '04':
            nomeMese = 'aprile';
            break;
        case '05':
            nomeMese = 'maggio';
            break;
        case '06':
            nomeMese = 'giugno';
            break;
        case '07':
            nomeMese = 'luglio';
            break;
        case '08':
            nomeMese = 'agosto';
            break;
        case '09':
            nomeMese = 'settembre';
            break;
        case '10':
            nomeMese = 'ottobre';
            break;
        case '11':
            nomeMese = 'novembre';
            break;
        case '12':
            nomeMese = 'dicembre';
            break;
        default:
            nomeMese = '';
            break;
    }
    let giorno = data.slice(8, 10);
    let ora = data.slice(11, 16);
    return 'Dati aggiornati il ' + giorno + ' ' + nomeMese + ' ' + anno + ' alle ' + ora;
}

function removeOverlays(map, overlays) {
    overlays.forEach(overlay => {
        map.removeLayer(overlay);
    });
    overlays = [];
}
function timebar(){
    var slider = document.getElementById('timeline');
    document.getElementById('date').innerHTML = 'Date:  '+dates[slider.value].split('/')[0].slice(-2)+" / "+dates[slider.value].split('/')[1]+" / "+dates[slider.value].split('/')[2];
}
document.getElementById('timeline').addEventListener('input', function(e) {
    timebar()
    drawNations3(infected_by_countries_and_dates);
    });

function drawNations3(data) {
    removeOverlays(mappa, overlays);  
    data[0].forEach(point => {
        var slider = document.getElementById('timeline');
        name = point[1]
        lat = point[2]
        lng = point[3]
        confirmed = point[slider.value]
        confirmed_rate = confirmed/dicp[point[1]]
        point[0] = confirmed_rate
        // console.log(confirmed_rate)
        if(!lat|!lng|!confirmed) return;
        if(confirmed_rate < 0.01) return;
        let dati_cerchio = { radius: Math.sqrt(6000*confirmed), color: '#FFEDA0' };
        if (confirmed_rate >= 0.6) dati_cerchio = { radius: dati_cerchio.radius, color: '#800026' }
        else if (confirmed_rate >= 0.5) dati_cerchio = { radius: dati_cerchio.radius, color: '#BD0026' }
        else if (confirmed_rate >= 0.4) dati_cerchio = { radius: dati_cerchio.radius, color: '#E31A1C' }
        else if (confirmed_rate >= 0.3) dati_cerchio = { radius: dati_cerchio.radius, color: '#FC4E2A' }
        else if (confirmed_rate >= 0.2) dati_cerchio = { radius: dati_cerchio.radius, color: '#FD8D3C' }
        else if (confirmed_rate >= 0.1) dati_cerchio = { radius: dati_cerchio.radius, color: '#FEB24C' }
        else if (confirmed_rate >= 0.05) dati_cerchio = { radius: dati_cerchio.radius, color: '#FED976' }
        else dati_cerchio = { radius: 30000, color: '#FFEDA0' }

        const punto = L.circle([point[2], point[3]], dati_cerchio.radius, {
            color: dati_cerchio.color,
            fillOpacity: 0.4
        });
        punto.addTo(mappa);
        overlays.push(punto);
        var code
        for (var i = 0; i < countryCodes; i++) {
            if(countryCodes[i].name==point[1]){
                code = countryCodes[i].code
                break
            } 
        }
        
        punto.on("click", function () {
            // console.log(countryCodes[i])
            //creo il popup e lo aggiungo alla mappa
            
            const popup = L.popup()
                .setLatLng(L.latLng(point[2], point[3]))
                .setContent('<p><b>' +
                    '<img class="bandiera" src="https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/' + dic[point[1]].toLowerCase() + '.png">' +
                    point[1] + '</b><br> Cum cases: ' + point[slider.value] + ' <span style="color: green"> <br>( New daily cases +'  +(point[slider.value]-point[slider.value-1])+')</span> '+                   
                    // '</b><br> Population: ' + dicp[point[1]] +
                    '</b><br> Infected Per 1M: ' + (point[0]*1000000).toFixed(0)+' </p>')

                .openOn(mappa);
    
        });
    });
}


function createTable(nome, note, data) {
    /*----------------------------------- creo e compilo la tabella -----------------------------------*/

    document.getElementById('titoloCard').innerHTML = nome;
    const card_body = document.getElementById("bodyCard");
    card_body.innerHTML = '';

    /*--------------------------- Aggiungo le note ---------------------------*/
    if (note != null && note != '') {
        const elNote = document.createElement("p");
        elNote.innerText = note;
        card_body.appendChild(elNote);
    }

    //Pubblicazione
    let pubblicazione = document.createElement("p");
    pubblicazione.className = "card-text";
    card_body.appendChild(pubblicazione);
    let pubblicazioneSmall = document.createElement("small");
    pubblicazioneSmall.innerHTML = getData(data);
    pubblicazione.appendChild(pubblicazioneSmall);

    /*--------------------------- Creo la tabella ---------------------------*/
    const tabella = document.createElement("table");
    card_body.appendChild(tabella);
    tabella.className = 'table table-striped table-hover';

    /*--------------------- Intestazione della tabella ---------------------*/
    const tabella_head = document.createElement("thead");
    tabella_head.className = 'thead-dark';
    tabella.appendChild(tabella_head);

    const head_colonna_prima = document.createElement("th");
    tabella_head.appendChild(head_colonna_prima);
    head_colonna_prima.scope = 'col';
    head_colonna_prima.innerText = '#';

    const head_colonna_seconda = document.createElement("th");
    tabella_head.appendChild(head_colonna_seconda);
    head_colonna_seconda.scope = 'col';
    head_colonna_seconda.innerText = 'numero';

    /*------------------------- Corpo della tabella -------------------------*/
    const tabella_body = document.createElement("tbody");
    tabella.appendChild(tabella_body);

    return tabella_body;

}
