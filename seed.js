import dotenv from "dotenv";
import { connectToDb } from "./src/service/db.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import Venue from "./src/model/venue.model.js";
import Artist from "./src/model/artist.model.js";
import Event from "./src/model/event.model.js";
import Organizer from "./src/model/organizer.model.js";
import User from "./src/model/user.model.js";
import { USER_ROLES } from "./src/model/user.model.js";

dotenv.config();

// Function to generate random data for the events
function generateData() {
  const Start = faker.date
    .future({ years: 2, refDate: new Date() })
    .toISOString()
    .split("T")[0];
  const usedStart = new Date(Start);
  const refStart = new Date(Start);
  const numberRandom = faker.number.int({ min: 0, max: 7 });
  const End = new Date(refStart.setDate(refStart.getDate() + numberRandom));

  function generateImageData() {
    // Define a set of acceptable aspect ratios
    const aspectRatios = [
      { width: 4, height: 3 },
      { width: 16, height: 9 },
      // { width: 1, height: 1 },
      // ... you can add more ratios here
    ];

    // Randomly select an aspect ratio
    const selectedRatio = faker.helpers.arrayElement(aspectRatios);

    // Generate one dimension (e.g., width) and calculate the other (e.g., height)
    const randomWidth = faker.datatype.number({ min: 800, max: 1400 }); // Random width between 100 and 1000
    const randomHeight = Math.round(
      randomWidth * (selectedRatio.height / selectedRatio.width)
    );

    const imageUrl = `https://picsum.photos/${randomWidth}/${randomHeight}`;

    return imageUrl;
  }

  const data = {
    // info about event
    eventTitle: faker.helpers.arrayElement([
      "Abbild 2002-2005",
      "BAU KUNST I",
      "BAU KUNST II",
      "Malerei",
      "Monotypien und Fotokunst",
      "Herausragend! Das Relief",
      "Works",
      "Gegenwart",
      "Dark Shining Bright",
      "Kunst mit Salz und Wasser",
      "Positionen der Papierkunst",
      "Meister und Meisterschüler",
      "Paper Work",
      "Masquage",
      "Spur",
      "Allesinallem",
      "Blick der Imagination",
      "Bankett",
      "Computerbilder",
      "Photographs",
    ]),
    eventCategory: faker.helpers.arrayElement([
      "Kunst",
      "Musik",
      "Clubs",
      "Sport",
      "Bildung",
      "Politik",
    ]),
    eventType: faker.helpers.arrayElement([
      "Ausstellung",
      "Auktion",
      "Messe",
      "Vortrag",
      "Festival",
    ]),
    img: faker.image.urlLoremFlickr({
      category: "abstract",
      // height: randomHeight,
      // width: randomWidth,
    }),
    // img: generateImageData(),
    description: faker.helpers.arrayElement([
      `In der Ausstellung werfen wir einen Blick auf Künstler, die in ihrer Arbeit auf architektonische Versatzstücke zurückgreifen und sie bis zur Irritation hin verfremden, mit hintergründiger Leichtigkeit und gelegentlichem Augenzwinkern.`,

      `Liebe Freunde der Galerie,
        wir möchten Sie auf unsere kommende Einzelausstellung aufmerksam machen. Hierzu sagt der Künstler:
        „An dieser Grenze ist ein Abbild ohne Ähnlichkeit ein Bild ohne Sprachlichkeit. Ein nichtsprachliches Bild. Ein Bild, mit der Möglichkeit einer gemeinsamen Betrachtung ohne sprachliche Notwendigkeit, einer Stille, durch das Nichtvorhandensein der Notwendigkeit nach Beschreibung…“,
        Über den Künstler: 1955 geboren in Salzburg. 1976, Diplom für Szenografie, anschließend Studium Theater- Filmregie an der Universität «Mozarteum». Ab 1980, neben der Tätigkeit für Theater und Film im In- und Ausland, kontinuierliche Befassung mit Malerei. 1991, Malerei wird Haupttätigkeit. 1996, stimmt er erstmals einer Präsentation seiner malerischen Arbeit zu. Seit 2009, lebt und arbeitet er in Berlin.`,

      `Die Künstlerin sieht in den Strukturen und Farben von Objekten ästhetische Motive, die oft übersehene Schönheit, die den Dingen innewohnt. Ihre Bilder scheinen abstrakt zu sein, wirken etwa wie Gemälde oder Grafiken, sie bilden aber immer unveränderte, konkrete Situationen oder Gegenstände ab, geben Ausschnitte der Wirklichkeit wider. Die Künstlerin löst durch ihre Ausschnittwahl die Motive aus ihrem gegenständlichen Zusammenhang und macht daraus ein flächiges Farbenspiel. Durch Augmented Reality entsteht eine weitere Dimension, wird das Bild lebendig.
        Seit Jahren beschäftigt sich die Hamburger Künstlerin mit Druckgraphik.
        Knapp sechs Jahrhunderte nach der Erfindung der Textvervielfältigung mit beweglichen Lettern wurden die künstlerischen Druckverfahren 2018 ins immaterielle Kulturerbe der Unesco aufgenommen. Die Arbeit mit künstlerischen Druckformen ist sehr faszinierend, zum Teil unvorhersehbar, vielschichtig.`,

      `Dieses Jahr kehrt die Affordable Art Fair mit einer Reihe lokaler, nationaler und internationaler Galerien nach Hamburg zurück. Entdecken Sie zeitgenössische Kunst, alles zum Preis zwischen 100 und 10.000 €. Seit 2012 hilft Ihnen die Affordable Art Fair Hamburg dabei, Kunst für Ihr Zuhause zu finden!`,

      `Das Relief ist eine Mischform: Zwischen Malerei und Skulptur angesiedelt ist es zwar an die Wandfläche gebunden, ragt aber oft weit in den Raum hinein. Gerade seine Unbestimmtheit ließ dieses Medium zu einem wichtigen Feld für Experimente und Innovation werden. In ihm konnten sich Kunstschaffende über Gattungsgrenzen hinwegsetzen und eigenständige Positionen beziehen.
        Mit rund 130 Exponaten – Reliefs, Skulpturen, Plastiken und Gemälden – von über 100 Künstler*innen aus Europa und den USA nimmt die Ausstellung die Ausprägungen des Reliefs von 1800 bis in die 1960er-Jahre in den Blick.`,

      `Die faszinierenden Arbeiten fluktuieren zwischen Kunst und Wissenschaft. Die großformatigen Werke enthüllen unsichtbare Welten aus der Botanik, die dem bloßen Auge verborgen bleiben und nur über das Medium Fotografie sichtbar werden. Die Deichtorhallen Hamburg richten der Künstlerin eine Einzelausstellung im PHOXXI ein, dem temporären Haus der Photographie aus. Es werden neben den bekannten Werken aus den Fairies-Serien auch die beiden neuen Werkserien Microverse I und Microverse II erstmalig zu sehen sein.`,

      `Präsentiert wird eine große Ausstellung des Künstlers und seinen Einfluss auf die Kunst bis in die Gegenwart. Erstmalig werden darin auch die Werke aus der Zeit der NS-Diktatur umfassend vorgestellt, einer Zeit, in der einige dieser Werke als „entartet“ galten. Dabei stehen die künstlerischen Auswirkungen von politischer Zensur, Anpassung und politischer Ikonographie mit Verweis auf die Kunst der Gegenwart im Fokus.`,

      `Die erste Einzelausstellung der französischen Künstlerin in der Galerie versammelt Wandskulpturen aus verschiedenen Materialien im Zusammenspiel mit Bleistiftzeichnungen. Alles dreht sich hier um die Linie: Als Zeichnung auf Papier, als Wandrelief, als Naht, Fuge oder Schattenwurf. Ausgehend von einfachen Werkstoffen, die u.a. auch im Hoch- und Tiefbau eingesetzt werden, entstehen Werke durch sich wiederholende Gesten und in Schichten. Dabei werden die Möglichkeiten des Materials befragt und ausgelotet, sei es durch Biegen, Falten, Spachteln oder Schleifen. Ihre auch physisch fordernde Arbeitsweise bezieht den „Zufall im Material“ mit ein und geschieht stets aus einem minimalistischen Formenverständnisses heraus.`,

      `Die lebenswichtigen Elemente Salz und Wasser sind seit jeher bis heute bestimmende Faktoren in der gesamten Region. Die zentrale Hauptausstellung widmet sich daher diesen Themenbereichen mit Objekten, Film- und Fotoarbeiten sowie Installationen in Zusammenhang mit Salz und Wasser; auch metaphorisch gesehen als „Salz des Lebens“ und mit Bezug auf das Motto der Kulturhauptstadt „Kultur ist das neue Salz“. Die Kunstprojekte rund um das Thema Wasser beschäftigen sich mit den brennenden Problemen der verschwindenden Gletscher und der weltweit zunehmenden Wasserknappheit. Inhaltlich begleitet wird die Ausstellung mit der Konferenz „Wasser ist das Gold der Zukunft – die etwas andere Klimakonferenz“ mit internationalen Expertinnen und Experten. Ohne das im Salzkammergut reichlich vorhandene Holz wäre die Gewinnung von Salz nicht möglich gewesen. Also werden die Themenbereiche Salz und Wasser mit (historischen) Beiträgen um Holz ergänzt.`,

      `Seit Papier existiert, sind wir von diesem Werkstoff fasziniert. Papier verkörpert Zartheit und Stärke, Fragilität und Festigkeit, es wirkt gleichermaßen unberührbar wie haptisch anziehend. Die Gruppenausstellung vereint die Arbeiten von 8 künstlerischen Positionen, in denen das Papier in vielen Fällen aus seiner traditionellen Flächigkeit in eine dreidimensionale Form gebracht wird und somit eine erstaunliche Präsenz erlangt. Die hier ausstellenden Künstler*innen widmen sich dem Papier als Werkstoff und erschaffen durch unterschiedliche Herangehensweisen Werke mit handwerklichem Geschick im Umgang mit dem Material und zeigen, wie unendlich wandelbar, facettenreich und einfach schön Papier ist.`,

      `Der Leiter der Akademie Leonardo zeigt neue Bilder. Er erhielt eine humanistische Prägung durch seinen Vater. Recht früh kam er in Berührung mit den klassischen Epen. Von Kindheit an liebte er es, Bilder zu betrachten und in ihnen zu leben. Mit 8 Jahren erhielt er seine „Initiation“. In den letzten Jahren faszinierten ihn Frauenportraits und diese gerade wegen ihrer oft nicht entfalteten Schönheit ganz besonders. 
        Seine Schülerin ist Gewinnerin des Publikumspreises 2022. Ihre Vorliebe gilt der Beobachtung und Gefühle und Eindrücke aufzuspüren, sie zu mir einzuladen. Innezuhalten, mit ihnen in Kontakt zu treten. All dies hilft ihr dabei, die Welt ein wenig besser zu verstehen.`,

      `Die Ausstellung zeigt großformatige abstrakte Arbeiten des Künstlers. In einem neo-expressionistischen Stil, der von dem abstrakten Expressionisten Cy Twombly inspiriert ist, untersucht der Künstler menschliche Dynamiken und innere Zustände. Seine neue Werkserie zeugt von einem noch größeren Verlust der wahren Identität der Gesellschaft angesichts der zunehmenden Abstraktion.`,

      `Zeichnung auf Papier. Ja, das ist millionenfach die Basis der Kunst. Doch wo genau beginnt die Bedeutung eines Strichs oder Prägung eines leeren Kulis und sind wir bereit, einer präzise gesetzten Falte im leeren Blatt eine Information abzulauschen? Der Künstler betreibt mit großem Aufwand oft stundenlang mühsam gesetzter Striche einen Minimalismus, der an die reduzierten Formen eines sauber ausgezirkelten Zen-Gartens erinnert oder an die klaren Setzungen total reduzierter Proportionskalkulationen. Gleich ob äußerst wenig oder dicht akkumuliert, diese Blätter sind Meditationsfolien. Nicht nur verschwindet gelegentlich sogar die Tinte aus den Schreibmitteln, mitunter sind die Linien nur noch Schattenrisse der Kanten von darübergelegten Glasplatten. Seine Kunst ist eine Erforschung der Grundlagen und der Grenzen des überhaupt Darstellbaren.`,

      `INSTALLATIONEN UND OBJEKTE
        Aus Bruch von Ziegel, Marmor, Kreide, Glas oder Beton schafft der Künstler Skulpturen und Objekte, die er stets in Bezug zum Raum setzt. Durch Stapelung und Neuordnung entstehen organische Formen, dreidimensionale Körper und wirkungsstarke Plastiken.`,

      `Als der Künstler mit seiner Kunst des nachempfindenden Porträts begann, waren es zuerst Freunde und Bekannte, die er in kräftigen Ölfarben konterfeite. Er kannte sie und sie kannten ihn. Man wusste voneinander, ob Kinder, Familie oder Freunde. Nun hat sich das Blatt gewendet. Statt mit Öl zu malen, zeichnet er mit feinem Stift und in hellen Pastelltönen, mit stummen Farben - "muted colors". Doch wichtiger noch: Er nähert sich nun dem Unbekannten, dem Haus der Körper, in dem die für ihn unbekannte Person mit ihrem individuellen Inventar wohnt. Denn auch dies ist eine seiner Einsichten: "The body", schreibt er, "is only a house of words and memories". Diesem Haus gilt nun seine Annäherung an das Unbekannte.`,

      `Mit der Ausstellung präsentiert die Kunsthalle die erste museale Präsentation der US-amerikanischen Künstlerin. Eine Auswahl von rund dreißig Werken zeichnet die Entwicklung ihrer künstlerischen Praxis von 2014 bis heute nach. Dafür werden neben bereits bestehenden auch einige neue, speziell für die Ausstellung produzierte Arbeiten gezeigt.`,

      `Die ersten »Computerbilder« des Künstlers entstanden Anfang der 90er Jahre, eine zweite Serie in den frühen 2000er Jahren. Grundlage war ein 1990 gekauftes Notebook, auf dem die ersten Zeichnungen entstanden, die der Maler dann auf Leinwand übertrug. Die von der Technik diktierte Ästhetik mit ihren Treppen- und Klötzcheneffekten wurde zu einem folgenreichen Ausgangspunkt für einen Werkkomplex, der zwischen kühler Kargheit und phantasievoll wuchernder Formenvielfalt oszilliert.`,

      `Mit der Ausstellung präsentiert die Kunsthalle das raumgreifende, mehrteilige Werk des österreichischen Malers. Seine Leinwände entstehen in einem langwierigen Prozess vielfacher Übermalung, deren verschiedene Ebenen durch die übereinanderliegenden Farbflächen durchscheinen. Die Bilder erlangen dadurch eine Qualität der Durchsichtigkeit, die metaphorisch als durchschimmernde Zeit angesehen werden kann. In ihrer Farbsprache und ihrer seriellen Monumentaliät verändern die großflächigen Gemälde des Künstlers den Raum: Ihre Präsentation im Kuppelsaal der Kunsthalle greift die große Geschichte dieses Saales als Ausstellungsort auf und lässt räumliche Malereierlebnisse wie etwa im Musée de l'Orangerie in Paris anklingen.`,
    ]),
    homepage: faker.helpers.arrayElement(
      [
        "https://galerie-borchardt.de/", 
        "https://veramunro.com/",
        "https://www.steenart.de/",
        "https://affordableartfair.com/",
        "https://www.hamburger-kunsthalle.de/", 
        "https://www.deichtorhallen.de/",
        "https://www.mathiasguentner.com/",
        "http://www.mikikosatogallery.com/de/",
        "https://www.nannapreussners.de/",
        "https://www.melbye-konan.com/",
        "https://www.hamburger-kunsthalle.de/",
        "https://www.kulturforum-witten.de/de/kulturforum/",
      ]
    ),
    dateStart: usedStart,
    dateEnd: End,
    timeStart: faker.date
      .future()
      .toISOString()
      .split("T")[1]
      .split(".")[0]
      .split(":")
      .slice(0, 2)
      .join(":"),
    timeEnd: faker.date
      .future()
      .toISOString()
      .split("T")[1]
      .split(".")[0]
      .split(":")
      .slice(0, 2)
      .join(":"),
    // info about venue
    venueName: faker.helpers.arrayElement([
      "Kunsthalle",
      "Galerie Borchardt",
      "Galerie Vera Munro",
      "Galerie Pure Photography",
      "Affordable Art Fair Ltd.",
      "Deichtorhallen",
      "Galerie Mathias Güntner",
      "Mikiko Sato Gallery",
      "Galerie Nanna Preußners",
      "Nissis Kunstkantine",
      "Galerie Renate Kammer",
      "Galerie Melbye-Konan",
      "Galerie Holthoff",
      "VisuleX Gallery for Photography",
      "Galerie Renate Kramer",
      "OZM Art Space Gallery",
    ]),
    venueType: faker.helpers.arrayElement([
      "Museum",
      "Galerie",
      "Messe",
      "Auktionshaus",
      "Akademie",
    ]),
    city: faker.helpers.arrayElement([
      "Hamburg",
      "Leipzig",
      "Witten",
      "Berlin",
      "München",
      "Köln",
      "Düsseldorf",
      "Rostock",
      "Dortmund",
    ]),
    street: faker.helpers.arrayElement([
      "Hopfensack",
      "Heilwigstrasse",
      "Glashüttenstraße",
      "Ziegelstraße",
      "Hauptstraße",
      "Glockengiesserwall",
      "Deichtorstraße",
      "Admiralitätstraße",
      "Klosterwall",
      "Am Dalmannkai",
      "Münzplatz",
      "Bergstrasse",
      "Baumwall",
      "Havesterhuderweg",
      "Hartwicusstrasse",
      "Papenhuderstrasse",
    ]),
    houseNumber: faker.number.int({ min: 1, max: 100 }).toString(),
    zipCode: faker.location.zipCode("#####"),
    additionalAddressInfo: faker.helpers.arrayElement([
      "Halle 1",
      "",
      "",
      "",
      "",
      "",
      "",
      "Halle 2",
      "",
      "",
      "",
      "Hinterhof",
    ]),
    // info about artist
    artistName: faker.helpers.arrayElement([
      "Pablo Picasso",
      "Gustav Klimt",
      "Salvador Dalí",
      "René Magritte",
      "Frida Kahlo",
      "Joan Miró",
      "Claude Monet",
      "Wassily Kandinsky",
      "Robert Delaunay",
      "Alfred Gockel",
      "Piet Mondrian",
      "Morris Louis",
      "Frank Stella",
      "Otto Freundlich",
      "Vincent van Gogh",
      "Otto Dix",
    ]),
    artistType: faker.lorem.words(),
    artistDescription: faker.lorem.words(200),
    artistHomepage: faker.internet.url(),
    // artistImg: faker.image.urlLoremFlickr({
    //   keywords: "music",
    //   height: randomHeight,
    //   width: randomWidth,
    // }),
    artistImg: generateImageData(),
  };
  return data;
}

async function createOrginazer() {
  const data = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    organization: faker.company.name(),
    email: faker.internet.email(),
    password: await bcrypt.hash("test1234", 10),
  };
  return data;
}
// function to create an organizer with a user and return the organizerID
async function createData() {
  const user = await createOrginazer();
  const result = await User.create({
    username: user.firstname + " " + user.lastname,
    email: user.email,
    password: user.password,
    role: USER_ROLES.organizer,
  });

  const organizer = await Organizer.create({
    firstname: user.firstname,
    lastname: user.lastname,
    organization: user.organization,
    userId: result._id,
  });

  return organizer._id;
}

// Function to create an event with a venue and an artist and an  organizerID as a parameter
async function createEvent(userid) {
  const data = generateData();

  const venue = await Venue.create({
    venueName: data.venueName,
    venueType: data.venueType,
    city: data.city,
    street: data.street,
    houseNumber: data.houseNumber,
    zipCode: data.zipCode,
    additionalAddressInfo: data.additionalAddressInfo,
  });
  const artist = await Artist.create({
    artistName: data.artistName,
    artistType: data.artistType,
    artistDescription: data.artistDescription,
    artistHomepage: data.artistHomepage,
    artistImg: data.artistImg,
  });
  const event = await Event.create({
    eventTitle: data.eventTitle,
    eventCategory: data.eventCategory,
    eventType: data.eventType,
    img: data.img,
    description: data.description,
    homepage: data.homepage,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    isActive: true,
    venues: venue._id,
    artists: artist._id,
    organizerId: userid,
  });
  return event._id;
}
// connect to the DB
connectToDb();

const deletaAllDataFromDB = async () => {
  await Event.deleteMany({});
  await Organizer.deleteMany({});
  await User.deleteMany({});
  await Venue.deleteMany({});
  await Artist.deleteMany({});
};

deletaAllDataFromDB(); // comment this line if you want to keep the data in the DB
// create 10 users with 100 events each please change the number of users and events here
try {
  for (let i = 0; i < 10; i++) {
    // change the number of users here
    const userid = await createData();
    console.log(`User ${i} created ` + userid);
    for (let i = 0; i < 10; i++) {
      // change the number of events here
      const event = await createEvent(userid);
      console.log(`Event ${i} created  ` + event + " " + userid);
    }
  }
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
