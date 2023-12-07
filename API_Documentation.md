## **Benutzerregistrierung und Anmeldung**

**Registrierung (Sign Up)**

- zunächst erstmal User vom Typ “organizer”, nachher User vom Typ “user” oder “admin”

**Request Body (Organizer) —> eigenes Mongoose Schema “Organizer”**

```jsx
POST('/api/auth/register/organizer', ...)
{
	"firstname": "",
	"lastname": "",
  "organization": "",
	"email": "" ,
  "password":  ""
}
```

Wenn ein Organizer angelegt wird, wird zunächst ein Eintrag in User angelegt und anschließend ein Eintrag in Organizer. Man erstellt user mit username, email, password, role, etc. und bekommt Id zurück, mit der Info legt man ein Organizer an

**Request Body (User) —> eigenes Mongoose Schema “User”**

```jsx
POST('/api/auth/register/user', ...)
{
  "username": "",
	"email": "",
  "password": ""
}
```

**Anmeldung (Login) User**

Die Anmeldung soll ENTWEDER über username ODER über email möglich sein

```jsx
{
    "username": "test",
    "email": "test@gmail.com",
    "password": "test"
}
```

**\*\*\*\***\*\***\*\*\*\***Anmeldung (Login) Organization**\*\*\*\***\*\***\*\*\*\***

```jsx
POST('/api/auth/login',... )
{
 "firstname": "",
 "lastname": "",
 "organization": "",
 "email": "",
 "password": "",
}
```

## Veranstaltungserstellung

```jsx
POST('/api/event', ...)
{
   "eventTitle": "Reggaejam Festival",
    "artist": "Damian Marley, 311, The Movement, Slightly Stoopid",
    "eventType": "Concert",
    "eventCategory": "Music",
    "img": "https://picsum.photos/200/304",
    "homepage": "https://reggaejam.de/de/",
    "dateStart": "2024-05-26",
    "dateEnd": "2024-05-28",
    "timeStart": "12:00",
    "timeEnd": "00:00",
    "venueName": "Klosterpark Bersenbrück",
    "venueType": "Festivalgelände",
    "city": "Bersenbrück",
    "street": "asdasd",
    "houseNumber": "asdasdasd",
    "additionalAddressInfo": "",
     "zipCode": "49593",
     "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam quo nobis quaerat molestiae exercitationem quae molestias aut eaque ipsam ex consequatur dicta ab accusamus fuga, impedit alias debitis quis consectetur nam, laudantium quia ducimus porro soluta! Molestias delectus aliquid, nulla a ea dolorem totam, minus quaerat dolores quae, beatae sunt."
}
```

**Request Body**

```jsx
{
// Eckdaten
 "eventTitle": "",
 "artist": "",
 "eventType": "",
 "eventCategory": "",
 "img": "", // for futur type arry
 “description“: "",
 "homepage": "",
// Wann?
 “dateStart“: "",
 “dateEnd“: "",
 “timeStart“: "",
 “timeEnd“: "",
// Wo?
 "venueName": "",                       // Name vom Veranstaltungsort
 "venueType": "",
 "city": "",
 "street": "",
 "houseNumber": "",
 "additionalAddressInfo": "",          // Zusatzinfos
 "zipCode": "",                         // Postleitzahl
}, {timestamps: true, versionKey: false}
```

## **Veranstaltungsanzeige und -suche**

**Master-Ansicht (Alle Kunstveranstaltungen)**

```jsx
GET('/api/events', ...)
```

Response Body

```jsx
{
    "_id": "655385b829ea2d760abf6a4a",
    "eventTitle": "10 Years Tour",
		"artists": [
			{
        "artistName": "Max Mustermann"
        "artistType": ""
        "artistDescription": ""
        "artistHomepage": ""
        "artistImg": "",
    },
		{
        "artistName": "Otto Müller",
        "artistType": "",
        "artistDescription": "",
        "artistHomepage": "",
        "artistImg": "",
    },
		]
    // ODER (wie vorher)
    // "artists": ["Rolling Stones", "Artist2", "Artist3" ]
    "eventCategory": "Music",
    "eventType": "Concert",
    "img": "https://picsum.photos/200/301",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia animi aspernatur, illo quo quibusdam perferendis repudiandae omnis voluptate maxime. Obcaecati quas minus, quia id optio deleniti at omnis natus sapiente mollitia ipsum quos quaerat doloribus similique necessitatibus fugit dolorem quod laboriosam? Perspiciatis magnam, assumenda beatae tenetur dolore sequi qui reiciendis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. In aut ipsam iusto corporis eligendi ex. Voluptatibus, magni, quaerat dolor aspernatur deserunt similique blanditiis exercitationem sapiente reiciendis deleniti placeat voluptas enim, quo molestias in perspiciatis laudantium atque ea. Natus illo, quod dolorem doloribus tempore nam nisi, voluptates necessitatibus possimus alias accusamus quas pariatur voluptatibus, quisquam minima? Quis eligendi aspernatur quas labore, quam recusandae distinctio rem iusto nesciunt quia illo dolor soluta harum voluptatum inventore ex, id perspiciatis. Quam veritatis tempore id iusto modi cupiditate vel alias magni tenetur, atque officiis velit dolore. Eaque labore ipsam aliquid iusto nisi suscipit laudantium quo?",
    "homepage": "https://rollingstones.com/tour/",
    "dateStart": "2023-12-28",
    "dateEnd": "2023-12-29",
    "timeStart": "16:00",
    "timeEnd": "00:00",
    "organizerId": "654a536cd72a93ef7b4036f9",
    "venues": [
        {
            "_id": "655385b829ea2d760abf6a48",
            "venueName": "Parkbühne Geyserhaus",
            "venueType": "Open Air Bühne",
            "city": "Leipzig",
            "street": "Kleiststraße",
            "houseNumber": "52",
            "zipCode": "04129",
            "additionalAddressInfo": "In der Nähe der Haltestelle Mosenthinstraße",
            "createdAt": "2023-11-14T14:35:36.708Z",
            "updatedAt": "2023-11-14T14:35:36.708Z"
        },
        {
            "_id": "6553875e29ea2d760abf6a5e",
            "venueName": "Tempodrom",
            "venueType": "Konzerthalle",
            "city": "Berlin",
            "street": "Möckernstrasse",
            "houseNumber": "10",
            "zipCode": "10963",
            "additionalAddressInfo": "",
            "createdAt": "2023-11-14T14:42:38.257Z",
            "updatedAt": "2023-11-14T14:42:38.257Z",
        },
    ],
    "createdAt": "2023-11-14T14:35:36.818Z",
    "updatedAt": "2023-11-14T14:35:36.818Z"
}
```

## Veranstaltungsdetails

### Response

**Suchfunktion**

- über Query Parameter

```js
get('/api/events/:eventId', ...)
```
