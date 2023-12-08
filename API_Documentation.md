# **Rregistrierung (Authentication) und Anmeldung (Authorization)**

## **Registrierung (Sign Up) Organizer**

- zunächst erstmal User vom Typ “organizer”.
- später soll es auch User vom Typ “user” oder “admin” geben

**Route für Organizer-Registrierung**

```jsx
post('/api/auth/register/organizer', ...)
```

**Request Body (`Organizer`) —> eigenes Mongoose Schema “Organizer”**

```JSON
{
	"firstname": "",
	"lastname": "",
    "organization": "",
	"email": "" ,
    "password":  ""
}
```

- Wenn ein Organizer angelegt wird, wird zunächst ein Document in der `User` Collection eingetragen und anschließend ein Document in der `Organizer` Collection.
- Man erstellt `user` mit `username`, `email`, `password`, `role`, etc. und bekommt `Id` zurück und mit der Info legt man ein Organizer an.

## **Registrierung (Sign Up) User** (später einbauen)

**Route für User-Registrierung**

```jsx
post('/api/auth/register/user', ...)
```

**Request Body (`User`) —> eigenes Mongoose Schema “User”**

```JSON
{
    "username": "",
    "email": "",
    "password": ""
}
```

## **Anmeldung (Login) User** (später einbauen)

```jsx
router.post("/login", authController.loginUser);
```

Die Anmeldung soll ENTWEDER über username ODER über email möglich sein

```jsx
{
    "username": "test",
    "email": "test@gmail.com",
    "password": "test"
}
```

## **Anmeldung (Login) Organization**

**Route**

```jsx
router.post("/login", authController.loginUser);
```

Hinweis:

- Sowohl die User mit `role="user"`, als auch die User `role="organizer"` machen bei der Anmeldung eine Anfrage an diese Route.
- die `loginUser` Funktion unterscheidet dann anhand der `role`, ob es sich um ein Organizer oder einen End-User handelt.

**Request Body**

```jsx
{
    "firstname": "",
    "lastname": "",
    "organization": "",
    "email": "",
    "password": "",
}
```

# Events

## Event erstellen (AddEventForm.jsx)

**Route**

```jsx
router.post("/event", validateOrganizerAndAdmin, eventController.createEvent);
```

<details>
<summary>
<h3 style="display: inline;">Request Body</h3>
</summary>

```jsx
{
// Eckdaten
    "eventTitle": "Reggaejam Festival",
    "eventType": "Concert",
    "eventCategory": "Music",
    "img": "https://picsum.photos/200/304",
    "homepage": "https://reggaejam.de/de/",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam quo nobis quaerat molestiae exercitationem quae molestias aut eaque ipsam ex consequatur dicta ab accusamus fuga, impedit alias debitis quis consectetur nam, laudantium quia ducimus porro soluta! Molestias delectus aliquid, nulla a ea dolorem totam, minus quaerat dolores quae, beatae sunt."
// Wann?
    "dateStart": "2024-05-26",
    "dateEnd": "2024-05-28",
    "timeStart": "12:00",
    "timeEnd": "00:00",
// Wo?
// -> später als array von venue-Objects, für Events mit mehreren Veranstaltungsorte
    "venueName": "Klosterpark Bersenbrück",
    "venueType": "Festivalgelände",
    "city": "Bersenbrück",
    "street": "asdasd",
    "houseNumber": "asdasdasd",
    "additionalAddressInfo": "",        // Zusatzinfos
    "zipCode": "49593",                 // Postleitzahl
// Künstler-Daten (mehrere Künstler sollen möglich sein)
  "artists": [
    {
        "artistName": "Rene Magritte",
        "artistType": "",                   //genre
        "artistDescription": "",
        "artistHomepage": "",
        "artistImg": "",
    },
    {
        "artistName": "Otto Dix",
        "artistType": "",                   //genre
        "artistDescription": "",
        "artistHomepage": "",
        "artistImg": "",
    }
  ]
}
```

</details>

<br>

## **Eventsübersicht (EventOverview.jsx)**

- wird als **Startseite** angezeigt
- wird bezeichnet als **Master-Ansicht (Alle Kunstveranstaltungen)**

## **Alle Veranstaltungen abrufen**

- Ruft eine Liste von Veranstaltungen mit optionalen Filtern ab.

**Route, um alle Events zu holen (get All)**

```jsx
router.get("/events", eventsController.getAllEvents);
```

<br>

<details>
<summary style="font-size: 1.0rem; ">
<h3 style="display: inline;">
Response Body - Ein Array von `events`-Objekten
</h3>
</summary>

```json
{
  "events": [
    // event Objekt 1
    {
      "_id": "656a70cb98f49c9630c6fb37",
      "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
      "eventCategory": "Kunst",
      "eventType": "Ausstellung",
      "img": "https://picsum.photos/1100/701",
      "description": "description\": \"Heike Baltruweit sieht in den Strukturen und...",
      "homepage": "https://www.steenart.de/",
      "dateStart": "2023-10-07T00:00:00.000Z",
      "dateEnd": "2024-01-06T00:00:00.000Z",
      "timeStart": "12:00",
      "timeEnd": "00:00",
      "isActive": true,
      "organizerId": "656a6eb598f49c9630c6fb1b",
      "artists": [
        {
          "_id": "656a70cb98f49c9630c6fb32",
          "artistName": "Heike Baltruweit",
          "artistType": "",
          "artistDescription": "",
          "artistHomepage": "",
          "artistImg": ""
        },
        {
          "_id": "656a70cb98f49c9630c6fb35",
          "artistName": "Hanna Malzahn",
          "artistType": "",
          "artistDescription": "",
          "artistHomepage": "",
          "artistImg": ""
        }
      ],
      "createdAt": "2023-12-01T23:48:27.330Z",
      "updatedAt": "2023-12-02T00:39:17.657Z",
      "venues": [
        {
          "_id": "656a70cb98f49c9630c6fb2f",
          "venueName": "Galerie Pure Photography",
          "venueType": "Galerie",
          "city": "Hamburg",
          "street": "Glashüttenstraße",
          "houseNumber": "108",
          "zipCode": "20357",
          "additionalAddressInfo": ""
        }
      ],
      "organizer": [
        {
          "_id": "656a6eb598f49c9630c6fb1b",
          "firstname": "peter",
          "lastname": "pan",
          "organization": "panda-events",
          "isValid": false,
          "userId": "656a6eb498f49c9630c6fb19",
          "isActive": true,
          "createdAt": "2023-12-01T23:39:33.523Z",
          "updatedAt": "2023-12-01T23:39:33.523Z"
        }
      ]
    },
    // event Objekt 2
    {
      "_id": "656a70fa98f49c9630c6fb3d",
      "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
      "eventCategory": "Kunst",
      "eventType": "Ausstellung",
      "img": "https://picsum.photos/1200/600",
      "description": "description\": \"Heike Baltruweit sieht in den Strukturen und...",
      "homepage": "https://www.steenart.de/",
      "dateStart": "2023-10-07T00:00:00.000Z",
      "dateEnd": "2024-01-06T00:00:00.000Z",
      "timeStart": "12:00",
      "timeEnd": "00:00",
      "isActive": true,
      "organizerId": "656a6eb598f49c9630c6fb1b",
      "artists": [
        {
          "_id": "656a70cb98f49c9630c6fb32",
          "artistName": "Heike Baltruweit",
          "artistType": "",
          "artistDescription": "",
          "artistHomepage": "",
          "artistImg": ""
        },
        {
          "_id": "656a70cb98f49c9630c6fb35",
          "artistName": "Hanna Malzahn",
          "artistType": "",
          "artistDescription": "",
          "artistHomepage": "",
          "artistImg": ""
        },
        {
          "_id": "656a73d398f49c9630c6fba9",
          "artistName": "Kathrin Linkersdorff",
          "artistType": "",
          "artistDescription": "",
          "artistHomepage": "",
          "artistImg": ""
        }
      ],
      "createdAt": "2023-12-01T23:49:14.853Z",
      "updatedAt": "2023-12-04T23:01:40.021Z",
      "venues": [
        {
          "_id": "656a70cb98f49c9630c6fb2f",
          "venueName": "Galerie Pure Photography",
          "venueType": "Galerie",
          "city": "Hamburg",
          "street": "Glashüttenstraße",
          "houseNumber": "108",
          "zipCode": "20357",
          "additionalAddressInfo": ""
        }
      ],
      "organizer": [
        {
          "_id": "656a6eb598f49c9630c6fb1b",
          "firstname": "peter",
          "lastname": "pan",
          "organization": "panda-events",
          "isValid": false,
          "userId": "656a6eb498f49c9630c6fb19",
          "isActive": true,
          "createdAt": "2023-12-01T23:39:33.523Z",
          "updatedAt": "2023-12-01T23:39:33.523Z"
        }
      ]
    }
  ]
}
```

</details>

<br>

## **Suchfunktion** für die EventOverview

- über optionale Query Parameter

**_Optionale_ query Parameter**

- **`dateStart`**: Startdatum-Filter (Format: YYYY-MM-dd).
- **`dateEnd`**: Enddatum-Filter (Format: YYYY-MM-dd).
- **`venueType`**: Filter für den Veranstaltungsort.
- **`eventType`**: Filter für den Veranstaltungstyp.
- **`page`**: Seitennummer für die Paginierung (Standard: 1).
- **`limit`**: Anzahl der Elemente pro Seite (Standard: 10).

**Hinweise**

- Die Paginierung wird mit den Parametern `page` und `limit` durchgeführt.
- Datumsparameter (`dateStart` und `dateEnd`) sollten im Format YYYY-MM-dd vorliegen.

z.B. könnte eine Anfrage folgendermaßen aussehen:

```http
http://127.0.0.1:5173/api/events?page=1&limit=9&dateStart=&dateEnd=&eventType=Ausstellung&venueType=Galerie&page=1&limit=9
```

- Hier wird nur nach `eventType=Ausstellung` und `enueType=Galerie` gefiltert.
- `page=1` und `limit=9` sind der Default-Wert:

Dann geht die Anfrage erstmal an

**Route für Events-Übersicht (get All)**

```jsx
router.get("/events", eventsController.getAllEvents);
```

Und in der Controller function `getAllEvents` werden die optionalen query Parameter, falls vorhanden, für das Einschränken (Filtrieren) der suche verwendet.

Falls (noch) keine Filter-Optionen angegeben wurden, beispielsweise, wenn man von einer anderen Seite (z.B. Event hinzufügen) zur Events-Übersicht wechselt, dann sieht die Anfrage so aus:

```
http://127.0.0.1:5173/api/events?page=1&limit=9&dateStart=&dateEnd=&eventType=All&venueType=All&page=1&limit=9
```

- nur die Parameter mit einem Default Wert werden verwendet

## **Eventdetails (EventDetails.jsx)**

**Route**

```jsx
router.get("/event/:id", eventController.getEventById);
```

**Beispiel-Anfrage**, (bei Klick auf einer Event-Card)

```
http://127.0.0.1:5173/api/event/656a70cb98f49c9630c6fb37
```

<br>

<details>
<summary style="font-size: 1.0rem; ">
<h3 style="display: inline;">
Response body - 1 <code>event</code> Objekt
</h3>
</summary>

```jsx
{
    "_id": "656a70cb98f49c9630c6fb37",
    "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
    "eventCategory": "Kunst",
    "eventType": "Ausstellung",
    "img": "https://picsum.photos/1100/701",
    "description": "description\": \"Heike Baltruweit sieht in den Strukturen und ...",
    "homepage": "https://www.steenart.de/",
    "dateStart": "2023-10-07T00:00:00.000Z",
    "dateEnd": "2024-01-06T00:00:00.000Z",
    "timeStart": "12:00",
    "timeEnd": "00:00",
    "isActive": true,
    "organizerId": "656a6eb598f49c9630c6fb1b",
    "venues": [
        {
            "_id": "656a70cb98f49c9630c6fb2f",
            "venueName": "Galerie Pure Photography",
            "venueType": "Galerie",
            "city": "Hamburg",
            "street": "Glashüttenstraße",
            "houseNumber": "108",
            "zipCode": "20357",
            "additionalAddressInfo": ""
        }
    ],
    "artists": [
        {
            "_id": "656a70cb98f49c9630c6fb32",
            "artistName": "Heike Baltruweit",
            "artistType": "",
            "artistDescription": "",
            "artistHomepage": "",
            "artistImg": ""
        },
        {
            "_id": "656a70cb98f49c9630c6fb35",
            "artistName": "Hanna Malzahn",
            "artistType": "",
            "artistDescription": "",
            "artistHomepage": "",
            "artistImg": ""
        }
    ],
    "createdAt": "2023-12-01T23:48:27.330Z",
    "updatedAt": "2023-12-02T00:39:17.657Z"
}
```

</details>

<br>

## Navigation zur EditEvent.jsx Ansicht von der UsersTable.jsx aus

(TO DO: UsersTable.jsx später umbenennen auf MyEvents.jsx )

**Beispiel-Anfrage** - bei Klick auf "Bearbeiten"-Button in der `UsersTable.jsx` Ansicht (später umbenennen auf `MyEvents.jsx`)

```
http://127.0.0.1:5173/api/event/656a70cb98f49c9630c6fb37
```

Als erstes wird mit `useNavigate` zur `EditEvent.jsx` navigiert,...

```jsx
const navigate = useNavigate();

const handleEditClick = (eventId) => {
  navigate(`/event/edit/${eventId}`);
};
```

Und die `EditEvent.jsx` holt sich in einem `useEffect()` die Daten für das entsprechende Event mit der entsprechenden Id.

```jsx
useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}`);

                // Setter Funktionen aufrufen
                ...
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [eventId]);
```

**Respose Body** - genau wie bei EventDetails

```json
{
  "_id": "656a70cb98f49c9630c6fb37",
  "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
  "eventCategory": "Kunst",
  "eventType": "Ausstellung",
  "img": "https://picsum.photos/1100/701",
  "description": "description\": \"Heike Baltruweit sieht in den Strukturen und...",
  "homepage": "https://www.steenart.de/",
  "dateStart": "2023-10-07T00:00:00.000Z",
  "dateEnd": "2024-01-06T00:00:00.000Z",
  "timeStart": "12:00",
  "timeEnd": "00:00",
  "isActive": true,
  "organizerId": "656a6eb598f49c9630c6fb1b",
  "venues": [
    {
      "_id": "656a70cb98f49c9630c6fb2f",
      "venueName": "Galerie Pure Photography",
      "venueType": "Galerie",
      "city": "Hamburg",
      "street": "Glashüttenstraße",
      "houseNumber": "108",
      "zipCode": "20357",
      "additionalAddressInfo": ""
    }
  ],
  "artists": [
    {
      "_id": "656a70cb98f49c9630c6fb32",
      "artistName": "Heike Baltruweit",
      "artistType": "",
      "artistDescription": "",
      "artistHomepage": "",
      "artistImg": ""
    },
    {
      "_id": "656a70cb98f49c9630c6fb35",
      "artistName": "Hanna Malzahn",
      "artistType": "",
      "artistDescription": "",
      "artistHomepage": "",
      "artistImg": ""
    }
  ],
  "createdAt": "2023-12-01T23:48:27.330Z",
  "updatedAt": "2023-12-02T00:39:17.657Z"
}
```

## **Event bearbeiten** (bei klick auf "Speichern"-Button in der `EditEvent.jsx`)

In der EditEvent.jsx wird bei Klick auf das "Speichern"Button eine PATCH Anfrage gesendet, inklusive `inputValues`

```jsx
const handleSaveChanges = async (e) => {
  e.preventDefault();

  const inputValues = {
    organizerName,
    eventTitle: event.eventTitle,
    // artistName,
    eventType: eventType || event.eventType || eventTypes[0],
    img: event.img,
    // eventCategory: eevent.eventCategory || eventCategories[0],
    description: event.description,
    homepage: event.homepage,
    dateStart: event.dateStart,
    dateEnd: event.dateEnd,
    timeStart: event.timeStart,
    timeEnd: event.timeEnd,
    venueName: event.venues[0].venueName,
    venueType: venueType || event.venues[0].venueType || venueTypes[0],
    city: event.venues[0].city,
    street: event.venues[0].street,
    houseNumber: event.venues[0].houseNumber,
    additionalAddressInfo: event.venues[0].additionalAddressInfo,
    zipCode: event.venues[0].zipCode,
    artists,
  };

  try {
    console.log("Request Body before sending: ", inputValues);
    const response = await axios.patch(`/api/event/${eventId}`, inputValues, {
      withCredentials: true,
    });
    navigate(`/mydata`);
  } catch (error) {
    console.error(error);
  }
};
```

**Beispiel**

PATCH-Anfrage an:

```
http://127.0.0.1:5173/api/event/656a70cb98f49c9630c6fb37
```

Request Body

```json
{
  "organizerName": "peter pan",
  "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
  "eventType": "Ausstellung",
  "img": "https://picsum.photos/1100/701",
  "description": "description\": \"Heike Baltruweit sieht in den Strukturen und Farben von Objekten\nästhetische Motive, die oft übersehene Schönheit, die den Dingen innewohnt. Ihre\nBilder scheinen abstrakt zu sein, wirken etwa wie Gemälde oder Grafiken, sie \nbilden aber immer unveränderte, konkrete Situationen oder Gegenstände ab, geben \nAusschnitte der Wirklichkeit wider. Heike Baltruweit löst durch ihre \nAusschnittwahl die Motive aus ihrem gegenständlichen Zusammenhang und macht \ndaraus ein flächiges Farbenspiel. Durch Augmented Reality entsteht eine weitere \nDimension, wird das Bild lebendig.\nSeit Jahren beschäftigt sich die Hamburger Künstlerin Hanna Malzahn mit \nDruckgraphik.\nKnapp sechs Jahrhunderte nach der Erfindung der Textvervielfältigung mit \nbeweglichen Lettern wurden die künstlerischen Druckverfahren 2018 ins \nimmaterielle Kulturerbe der Unesco aufgenommen. Die Arbeit mit künstlerischen \nDruckformen ist sehr faszinierend, zum Teil unvorhersehbar, vielschichtig.",
  "homepage": "https://www.steenart.de/",
  "dateStart": "2023-10-07T00:00:00.000Z",
  "dateEnd": "2024-01-06T00:00:00.000Z",
  "timeStart": "12:00",
  "timeEnd": "00:00",
  "venueName": "Galerie Pure Photography",
  "venueType": "Galerie",
  "city": "Hamburg",
  "street": "Glashüttenstraße",
  "houseNumber": "108",
  "additionalAddressInfo": "",
  "zipCode": "20357",
  "artists": [
    {
      "_id": "656a70cb98f49c9630c6fb32",
      "artistName": "Heike Baltruweit",
      "artistType": "",
      "artistDescription": "",
      "artistHomepage": "",
      "artistImg": ""
    },
    {
      "_id": "656a70cb98f49c9630c6fb35",
      "artistName": "Hanna Malzahn",
      "artistType": "",
      "artistDescription": "",
      "artistHomepage": "",
      "artistImg": ""
    }
  ]
}
```

**Route**

```jsx
router.patch(
  "/event/:id",
  validateOrganizerAndAdmin,
  validateEvent,
  eventController.updateEvent
);
```

**Response Body**

- Wenn ein Event aktualisiert wurde, kommt dann folgendes zurück:

```json
{
  "message": "Event aktualisiert",
  "updatedEvent": {
    "_id": "656a70fa98f49c9630c6fb3d",
    "eventTitle": "Ästhetik des Authentischen: Monotypien und Fotokunst",
    "eventCategory": "Kunst",
    "eventType": "Ausstellung",
    "img": "https://picsum.photos/1200/600",
    "description": "description\": \"Heike Baltruweit sieht in den Strukturen und Farben von Objekten\nästhetische Motive, die oft übersehene Schönheit, die den Dingen innewohnt. Ihre\nBilder scheinen abstrakt zu sein, wirken etwa wie Gemälde oder Grafiken, sie \nbilden aber immer unveränderte, konkrete Situationen oder Gegenstände ab, geben \nAusschnitte der Wirklichkeit wider. Heike Baltruweit löst durch ihre \nAusschnittwahl die Motive aus ihrem gegenständlichen Zusammenhang und macht \ndaraus ein flächiges Farbenspiel. Durch Augmented Reality entsteht eine weitere \nDimension, wird das Bild lebendig.\nSeit Jahren beschäftigt sich die Hamburger Künstlerin Hanna Malzahn mit \nDruckgraphik.\nKnapp sechs Jahrhunderte nach der Erfindung der Textvervielfältigung mit \nbeweglichen Lettern wurden die künstlerischen Druckverfahren 2018 ins \nimmaterielle Kulturerbe der Unesco aufgenommen. Die Arbeit mit künstlerischen \nDruckformen ist sehr faszinierend, zum Teil unvorhersehbar, vielschichtig.",
    "homepage": "https://www.steenart.de/",
    "dateStart": "2023-10-07T00:00:00.000Z",
    "dateEnd": "2024-01-06T00:00:00.000Z",
    "timeStart": "12:00",
    "timeEnd": "00:00",
    "isActive": true,
    "organizerId": "656a6eb598f49c9630c6fb1b",
    "venues": ["656a70cb98f49c9630c6fb2f"],
    "artists": [
      "656a70cb98f49c9630c6fb32",
      "656a70cb98f49c9630c6fb35",
      "656a73d398f49c9630c6fba9"
    ],
    "createdAt": "2023-12-01T23:49:14.853Z",
    "updatedAt": "2023-12-08T14:00:56.740Z"
  }
}
```

<br>

Und der User wird weitergeleitet nach `/myData`, also die `UsersTable.jsx`

TO DO:

- `/myData` umbenennen auf `myEvents`
- `UsersTable.jsx` umbenennen auf `MyEvents.jsx`
- Dokumentation aller weiteren Endpoints, die ab jetzt dazu kommen.
