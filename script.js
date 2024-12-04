// Frequenzen für die Flughäfen und Positionen
const airportFrequencies = {
    'MDPC': { // Punta Cana
        'APP': '119.850 MHz',
        'TWR': '118.800 MHz',
        'GND': '121.900 MHz',
        'DEL': '121.650 MHz'
    },
    'EGKK': { // London Gatwick
        'APP': '126.825 MHz',
        'TWR': '124.230 MHz',
        'GND': '121.805 MHz',
        'DEL': '121.955 MHz'
    },
    'MDST': { // Cibao
        'TWR': '118.300 MHz'
    },
    'MDAB': { // Arroyo Barril
        'TWR': '118.450 MHz'
    },
    'LEMH': { // Menorca
        'APP': '120.700 MHz',
        'TWR': '118.205 MHz',
        'GND': '121.755 MHz'
    },
    'GCLP': { // Gran Canaria
        'APP': '124.300 MHz',
        'TWR': '118.300 MHz',
        'GND': '121.700 MHz'
    },
    'EGHI': { // Southampton
        'TWR': '118.205 MHz'
    },
    'EFKT': { // Kittila
        'TWR': '118.950 MHz'
    },
    'LYTV': { // Tivat
        'TWR': '118.000 MHz'
    }
};

// Funktion zum Generieren eines zufälligen Squawk Codes, der mit der Zahl 3 beginnt
function generateSquawkCode() {
    return '3' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Startet immer mit '3' und fügt 3 Zufallszahlen hinzu
}

// Pop-up anzeigen
function openPopup(squawkCode) {
    const popup = document.getElementById('popup');
    const squawkCodeElement = document.getElementById('squawk-code');
    squawkCodeElement.textContent = squawkCode;
    popup.style.display = 'flex'; // Pop-up sichtbar machen
}

// Pop-up schließen
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Pop-up verstecken
}

// Ereignis für den Button "SQUAWK GENERATOR"
document.querySelector('.squawk').addEventListener('click', function() {
    const squawkCode = generateSquawkCode();
    openPopup(squawkCode); // Pop-up mit Squawk Code öffnen
});

// Ereignis für den Button "Generate New" im Popup
document.getElementById('generate-btn').addEventListener('click', function() {
    const squawkCode = generateSquawkCode();
    openPopup(squawkCode); // Neues Pop-up mit Squawk Code öffnen
});

// Ereignis für den "Close" Button im Popup
document.getElementById('close-popup-btn').addEventListener('click', closePopup);

// Variablen für den Cooldown und die Benachrichtigung
let lastNotificationTime = 0;
const notification = document.getElementById('notification');

// Funktion, um den Sound abzuspielen
function playNotificationSound() {
    const audio = new Audio('notify.mp3');
    audio.play();
}

// Funktion, um die Benachrichtigung anzuzeigen
function showNotification(squawkCode) {
    // Überprüfen, ob genug Zeit (3 Sekunden) seit der letzten Benachrichtigung vergangen ist
    const currentTime = Date.now();
    if (currentTime - lastNotificationTime > 3000) {
        lastNotificationTime = currentTime;

        // Den Squawk Code in der Benachrichtigung setzen
        notification.textContent = `Squawk Code copied to clipboard: ${squawkCode}`;

        // Benachrichtigung anzeigen
        notification.style.display = 'block';

        // Nach 3 Sekunden Benachrichtigung ausblenden
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);

        // Sound abspielen
        playNotificationSound();
    }
}

// Ereignis für den "Copy To Clipboard"-Button
document.getElementById('copy-btn').addEventListener('click', function () {
    const squawkCode = document.getElementById('squawk-code').textContent;

    // Verwende die Clipboard API, um den Text zu kopieren
    navigator.clipboard.writeText(squawkCode)
        .then(() => {
            closePopup(); // Pop-up mit dem Squawk Code schließen
            showNotification(squawkCode); // Benachrichtigung auf der Seite zeigen
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});

// Flughafen Dropdown 1
document.getElementById('airport-select').addEventListener('change', function () {
    const selectedValue = this.value; 
    const icaoCodeElement = document.getElementById('icao-code');
    const iataCodeElement = document.getElementById('iata-code');
    const dropdown2 = document.getElementById('airport-select2'); // Zweite Dropdown-Liste
    const options = dropdown2.options; // Alle Optionen in der zweiten Dropdown-Liste

    // Setze ICAO und IATA Standardwerte
    icaoCodeElement.textContent = 'N/A';
    iataCodeElement.textContent = 'N/A';

    // Setze alle Optionen in der zweiten Dropdown-Liste auf aktiv
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = false;
    }

    // Deaktiviere bestimmte Optionen und ändere ICAO/IATA Codes basierend auf der Auswahl
    switch (selectedValue) {
        case 'MDPC': // Punta Cana
            icaoCodeElement.textContent = 'MDPC';
            iataCodeElement.textContent = 'PUJ';
            break;
        case 'GCLP': // Gran Canaria
            icaoCodeElement.textContent = 'GCLP';
            iataCodeElement.textContent = 'LPA';
            break;
        case 'EGKK': // London Gatwick
            icaoCodeElement.textContent = 'EGKK';
            iataCodeElement.textContent = 'LHR';
            break;
        case 'MDAB': // Arroyo Barril
            icaoCodeElement.textContent = 'MDAB';
            iataCodeElement.textContent = 'BRX';
            break;
        case 'MDST': // Cibao
            icaoCodeElement.textContent = 'MDST';
            iataCodeElement.textContent = 'STI';
            break;
        case 'EFKT': // Kittila
            icaoCodeElement.textContent = 'EFKT';
            iataCodeElement.textContent = 'KTT';
            break;
        case 'LYTV': // Tivat
            icaoCodeElement.textContent = 'LYTV';
            iataCodeElement.textContent = 'TIV';
            break;
        case 'LEMH': // Menorca
            icaoCodeElement.textContent = 'LEMH';
            iataCodeElement.textContent = 'MAH';
            break;
        case 'EGHI': // Southampton
            icaoCodeElement.textContent = 'EGHI';
            iataCodeElement.textContent = 'SOU';
            break;
        default:
            icaoCodeElement.textContent = 'N/A';
            iataCodeElement.textContent = 'N/A';
    }

    // Deaktiviere bestimmte Optionen in der zweiten Dropdown-Liste basierend auf der Auswahl
    switch (selectedValue) {
        case 'MDPC': // Punta Cana
        case 'EGKK': // London Gatwick
            // Keine Einschränkungen, alle Optionen bleiben aktiviert
            break;

        case 'MDST': // Cibao
        case 'MDAB': // Arroyo Barril
        case 'EGHI': // Southampton
        case 'EFKT': // Kittila
        case 'LYTV': // Tivat
            // Nur TWR aktiv, alle anderen deaktivieren
            for (let i = 0; i < options.length; i++) {
                if (options[i].value !== 'TWR') {
                    options[i].disabled = true;
                }
            }
            break;

        case 'LEMH': // Menorca
        case 'GCLP': // Gran Canaria
            // Alle außer DEL aktiv
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === 'DEL') {
                    options[i].disabled = true;
                }
            }
            break;

        default:
            // Fallback: Alle Optionen aktivieren
            for (let i = 0; i < options.length; i++) {
                options[i].disabled = false;
            }
    }
});

// Flughafen Dropdown 2
document.getElementById('airport-select2').addEventListener('change', function () {
    const selectedValue = this.value;
    const posCode = document.getElementById('pos-code');
    const freqCode = document.getElementById('freq-code'); // Frequenz anzeigen

    // Frequenz basierend auf der Auswahl ändern
    const selectedAirport = document.getElementById('airport-select').value;
    const freq = airportFrequencies[selectedAirport][selectedValue];

    if (freq) {
        freqCode.textContent = freq;
    } else {
        freqCode.textContent = 'N/A';
    }

    // Position Code
    switch (selectedValue) {
        case 'APP':
            posCode.textContent = 'APP';
            break;
        case 'TWR':
            posCode.textContent = 'TWR';
            break;
        case 'GND':
            posCode.textContent = 'GND';
            break;
        case 'DEL':
            posCode.textContent = 'DEL';
            break;
        default:
            posCode.textContent = 'N/A';
    }
});


// Aktualisiert das Bild basierend auf dem ausgewählten Flughafen
function updateAirportChart(airportCode) {
    const imageElement = document.getElementById('zoomImage');
    
    // Erstellen des Bildpfads basierend auf dem Flughafen ICAO-Code
    const imagePath = `charts/${airportCode}GROUND.png`;
    
    // Aktualisieren des Bildes
    imageElement.src = imagePath;
}

// Flughafen Dropdown 1
document.getElementById('airport-select').addEventListener('change', function () {
    const selectedValue = this.value;
    const icaoCodeElement = document.getElementById('icao-code');
    const iataCodeElement = document.getElementById('iata-code');
    const dropdown2 = document.getElementById('airport-select2'); // Zweite Dropdown-Liste
    const options = dropdown2.options; // Alle Optionen in der zweiten Dropdown-Liste

    // Setze ICAO und IATA Standardwerte
    icaoCodeElement.textContent = 'N/A';
    iataCodeElement.textContent = 'N/A';

    // Setze alle Optionen in der zweiten Dropdown-Liste auf aktiv
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = false;
    }

    // Deaktiviere bestimmte Optionen und ändere ICAO/IATA Codes basierend auf der Auswahl
    switch (selectedValue) {
        case 'MDPC': // Punta Cana
            icaoCodeElement.textContent = 'MDPC';
            iataCodeElement.textContent = 'PUJ';
            updateAirportChart('MDPC'); // Bild aktualisieren
            break;
        case 'GCLP': // Gran Canaria
            icaoCodeElement.textContent = 'GCLP';
            iataCodeElement.textContent = 'LPA';
            updateAirportChart('GCLP');
            break;
        case 'EGKK': // London Gatwick
            icaoCodeElement.textContent = 'EGKK';
            iataCodeElement.textContent = 'LHR';
            updateAirportChart('EGKK');
            break;
        case 'MDAB': // Arroyo Barril
            icaoCodeElement.textContent = 'MDAB';
            iataCodeElement.textContent = 'BRX';
            updateAirportChart('MDAB');
            break;
        case 'MDST': // Cibao
            icaoCodeElement.textContent = 'MDST';
            iataCodeElement.textContent = 'STI';
            updateAirportChart('MDST');
            break;
        case 'EFKT': // Kittila
            icaoCodeElement.textContent = 'EFKT';
            iataCodeElement.textContent = 'KTT';
            updateAirportChart('EFKT');
            break;
        case 'LYTV': // Tivat
            icaoCodeElement.textContent = 'LYTV';
            iataCodeElement.textContent = 'TIV';
            updateAirportChart('LYTV');
            break;
        case 'LEMH': // Menorca
            icaoCodeElement.textContent = 'LEMH';
            iataCodeElement.textContent = 'MAH';
            updateAirportChart('LEMH');
            break;
        case 'EGHI': // Southampton
            icaoCodeElement.textContent = 'EGHI';
            iataCodeElement.textContent = 'SOU';
            updateAirportChart('EGHI');
            break;
        default:
            icaoCodeElement.textContent = 'N/A';
            iataCodeElement.textContent = 'N/A';
            break;
    }

    // Deaktiviere bestimmte Optionen in der zweiten Dropdown-Liste basierend auf der Auswahl
    switch (selectedValue) {
        case 'MDPC': // Punta Cana
        case 'EGKK': // London Gatwick
            // Keine Einschränkungen, alle Optionen bleiben aktiviert
            break;

        case 'MDST': // Cibao
        case 'MDAB': // Arroyo Barril
        case 'EGHI': // Southampton
        case 'EFKT': // Kittila
        case 'LYTV': // Tivat
            // Nur TWR aktiv, alle anderen deaktivieren
            for (let i = 0; i < options.length; i++) {
                if (options[i].value !== 'TWR') {
                    options[i].disabled = true;
                }
            }
            break;

        case 'LEMH': // Menorca
        case 'GCLP': // Gran Canaria
            // Alle außer DEL aktiv
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === 'DEL') {
                    options[i].disabled = true;
                }
            }
            break;

        default:
            // Fallback: Alle Optionen aktivieren
            for (let i = 0; i < options.length; i++) {
                options[i].disabled = false;
            }
    }
});

// Open the zoomed image
function openZoom() {
    document.getElementById('zoomPopup').style.display = 'flex';
}

// Close the zoomed image
function closeZoom() {
    document.getElementById('zoomPopup').style.display = 'none';
}


// Funktion zum Öffnen des Zoom-Popups
function openZoom() {
    const zoomPopup = document.getElementById('zoomPopup');
    const zoomImage = document.getElementById('zoomImage');
    const zoomedImage = document.getElementById('zoomedImage');
    
    // Kopiere die Quelle des Bildes in das vergrößerte Bild
    zoomedImage.src = zoomImage.src;
    
    // Zeige das Popup an, indem die "show" Klasse hinzugefügt wird
    zoomPopup.classList.add('show');
}

// Funktion zum Schließen des Zoom-Popups
function closeZoom() {
    const zoomPopup = document.getElementById('zoomPopup');
    
    // Entferne die "show" Klasse, um das Popup zu verstecken
    zoomPopup.classList.remove('show');
}

// Füge Event Listener hinzu, um das Popup zu schließen, wenn das Overlay geklickt wird
document.getElementById('zoomPopup').addEventListener('click', function (event) {
    // Verhindert, dass das Popup geschlossen wird, wenn auf das Bild selbst geklickt wird
    if (event.target === this) {
        closeZoom();
    }
});

const addStripBtn = document.getElementById("addStripBtn");
const deleteStripBtn = document.getElementById("deleteStripBtn");

// Funktion zum Hinzufügen eines neuen Strips
addStripBtn.addEventListener("click", () => {
  const newStrip = createStrip();
  document.getElementById("delivery-zone").appendChild(newStrip);
});

// Funktion zum Erstellen eines neuen Strips
function createStrip() {
  const newStrip = document.createElement("div");
  newStrip.classList.add("strip");

  // Die Reihenfolge und Struktur der Zellen gemäß dem Screenshot
  const labels = [
    ["C/S", "TEMP ALT", "DEP AIR", ""], // Erste Zeile
    ["A/C", "", "ARR AIR", "DEP SID"], // Zweite Zeile
    ["SQUAWK", "CRZ ALT", "ALT AIR", "RWY"], // Dritte Zeile
    ["ROUTE", "", "", ""] // Vierte Zeile (nur Route, ohne Ränder)
  ];

  // Erstelle Zellen mit Texten wie im Screenshot und füge sie zum Strip hinzu
  labels.forEach((row, rowIndex) => {
    row.forEach((label, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Wenn es sich um die Zellen TEMP ALT, SQUAWK oder CRZ ALT handelt,
      // dann nur Zahlen erlauben
      if (label === "TEMP ALT" || label === "SQUAWK" || label === "CRZ ALT") {
        cell.setAttribute("contenteditable", "true");
        cell.addEventListener("input", restrictToNumbers); // Nur Zahlen zulassen
      }

      // Wenn es die Route-Zelle ist, soll sie die ganze Zeile einnehmen
      if (rowIndex === 3) {
        cell.classList.add("route-cell"); // Füge eine spezielle Klasse hinzu
        cell.setAttribute("contenteditable", "true"); // Ermöglicht die Bearbeitung der Route-Zelle
        cell.style.gridColumn = "span 4"; // Route soll die ganze Zeile einnehmen
      }

      cell.textContent = label; // Text in die Zelle einfügen
      newStrip.appendChild(cell);

      // Doppelklick-Event für editierbare Zellen
      cell.addEventListener("dblclick", () => {
        cell.setAttribute("contenteditable", "true");
        cell.focus();
      });
    });
  });

  newStrip.setAttribute("draggable", "true");

  // Drag-and-Drop Event-Listener hinzufügen
  newStrip.addEventListener("dragstart", dragStart);
  newStrip.addEventListener("dragend", dragEnd);

  return newStrip; // Rückgabe des neuen Strips
}

// Funktion zum Löschen des neuesten Strips
deleteStripBtn.addEventListener("click", () => {
    const deliveryZone = document.getElementById("delivery-zone");
    const strips = deliveryZone.getElementsByClassName("strip");
    if (strips.length > 0) {
      deliveryZone.removeChild(strips[strips.length - 1]); // Letztes Element entfernen
    }
  });
  


// Nur Zahlen zulassen
function restrictToNumbers(event) {
  const value = event.target.textContent;
  if (!/^\d*$/.test(value)) {
    event.target.textContent = value.replace(/[^\d]/g, ''); // Nur Zahlen erlauben
  }
}

// Drag-and-Drop-Funktionalität
const zones = document.querySelectorAll(".strip-zone");
zones.forEach(zone => {
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("drop", dropStrip);
});

let draggedStrip = null;

function dragStart(event) {
  draggedStrip = this;
  this.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
}

function dragEnd() {
  this.classList.remove("dragging");
  draggedStrip = null;
}

function dragOver(event) {
  event.preventDefault(); // Standardverhalten verhindern
  event.dataTransfer.dropEffect = "move";
}

function dropStrip(event) {
  event.preventDefault(); // Standardverhalten verhindern
  if (draggedStrip) {
    this.appendChild(draggedStrip);
  }
}

