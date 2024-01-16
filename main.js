import { setStorage, getStorage, icons, userIcon } from "./helpers.js";

const form = document.querySelector('form');
const noteList = document.querySelector('ul');
const toggle = document.querySelector(".toggle")
const asideForm = document.querySelector('#aside-form');
const wrapper = document.querySelector('.wrapper')

var map;
var coords;
var notes = getStorage() || [];
var markerLayer = null;


// haritayı ekrana yükleyen bir fonksiyon
function loadMap(coords) {

    map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    console.log(map);

    // imleçleri tutacağımız ayrı bir katman oluşturma
    markerLayer = L.layerGroup().addTo(map);

    // kullanıcının konumuna imleç basar
    L.marker(coords, { icon: userIcon }).addTo(map);

    // lokalden gelen verileri ekrana bas
    renderNoteList(notes);


    // haritadaıki tıklanma olaylarını izle
    map.on('click', onMapClick);
}
toggle.addEventListener('click', (e) => {
    asideForm.classList.toggle("aside-form-close")
})
// haritadaki tıklanma olaylarında çalışan fonksiyon

form[3].addEventListener("click", () => {
    form.reset();
    form.style.display = "none";

})

// form gönderilirse yeni bir not oluştur ve localstorage'a ekle
form.addEventListener('submit', (e) => {

    e.preventDefault();

    // inputlardaki verilerden bir note objesi oluştur
    const newNote = {
        id: new Date().getTime(),
        title: form[0].value,
        date: form[1].value,
        status: form[2].value,
        coords: coords,
    };

    // dizinin başına yeni notu ekle
    notes.unshift(newNote);

    // notları ekrana bas
    renderNoteList(notes);
    console.log(notes);

    // local storage ı güncelle

    setStorage(notes);

    // formu kapat

    form.style.display = 'none';
    form.reset();
});

// her bir not için imleç katmanına yeni bir imleç ekler
function renderMarker(note) {
    // imleç oluştur
    L.marker(note.coords)
        // imleci katmana ekle
        .addTo(markerLayer)
        .bindPopup(`<div class="info">
        <p>${note.title}</p>
        <p>${note.date}</p>
        <p>${note.status}</p>`);
}

// ekrana notları basan fonksiyon
function renderNoteList(items) {
    // her bir obje için note kartı bas

    noteList.innerHTML = '';
    markerLayer.clearLayers();
    // dizideki herbir obje için note kartı bas
    items.forEach((note) => {
        // liste elemanı oluştur
        const listEle = document.createElement('li');

        // data-id ekle
        listEle.dataset.id = note.id;

        // içeriğini belirle
        listEle.innerHTML = ` <div class="info">
    <p>${note.title}</p>
    <p>
        <span>Tarih:</span>
        <span>${note.date}</span>
    </p>
    <p>
        <span>Durum:</span>
        <span>${note.status}</span>
    </p>
    </div>
    <div class="icons">
    <i id="fly" class="bi bi-airplane-fill"></i>
    <i id="delete" class="bi bi-trash3-fill"></i>
    </div>`

        // elemanı listeye ekle
        noteList.appendChild(listEle);
        // elemanı haritaya ekle
        renderMarker(note);
    });
}

// kullanıcının konumunu almaya yarar
navigator.geolocation.getCurrentPosition(
    // konum alınırsa çalışacak fonksiyon
    (e) => {
        loadMap([e.coords.latitude, e.coords.longitude])
    },


    // konum alınamazsa çalışacak fonksiyon
    () => { loadMap([39.932643419410944, 32.859367312005624]) });


function onMapClick(e) {

    coords = [e.latlng.lat, e.latlng.lng];

    form.style.display = 'flex';

    form[0].focus();
}

// silme ve uçuş fonksiyonu
noteList.addEventListener("click", (e) => {

    // tıklanılan elemanın id'sine erişme
    const found_id = e.target.closest("li").dataset.id;

    if (e.target.id === "delete" && confirm("Silmek istediğinizden emin misiniz?")) {
        // id'sini bildiğimiz elementi listeden çıkarma
        notes = notes.filter((note) => note.id != found_id);

        // lokal'i güncelle
        setStorage(notes);

        // ekranı güncelle
        renderNoteList(notes);
    }
    if (e.target.id === "fly") {
        // id'sini bildiğimiz elemanı diziden bulma

        const note = notes.find((note => note.id == found_id));

        // note'un koordinatlarına git
        map.flyTo(note.coords);
    }

})



