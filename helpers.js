// lokalden parametre olarak gelen elemanı alır

export const getStorage = () => {
    // lokalden key ile eşleşen veriyi alma
    const strData = localStorage.getItem("notes");

    // gelen string veriyi js verisine çevirir ve döndürür

    return JSON.parse(strData);

}
// lokale parametre olarak gelen elemanı kaydededer

export const setStorage = (data) => {
    // stringe çevirir
    const strData = JSON.stringify(data);
    // veriyi lokale kaydeder
    localStorage.setItem("notes", strData);
};

// İKONLAR
export var userIcon = L.icon({
    iconUrl: '/images/Person.png',
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var homeIcon = L.icon({
    iconUrl: '/images/Home_8.png',
    iconSize: [70, 75],
    iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var jobIcon = L.icon({
    iconUrl: '/images/Briefcase_8.png',
    iconSize: [70, 75],
    iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var gotoIcon = L.icon({
    iconUrl: '/images/Aeroplane_8.png',
    iconSize: [70, 75],
    iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

var parkIcon = L.icon({
    iconUrl: '/images/Parking_8.png',
    iconSize: [70, 75],
    iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

//
export const icons = {
    goto: gotoIcon,
    home: homeIcon,
    job: jobIcon,
    park: parkIcon,
};

