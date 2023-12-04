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
    eventTitle: faker.lorem.words(),
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
    // img: faker.image.urlLoremFlickr({
    //   category: "abstract",
    //   height: randomHeight,
    //   width: randomWidth,
    // }),
    img: generateImageData(),
    description: faker.lorem.words(300),
    homepage: faker.internet.url(),
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
    venueName: faker.lorem.words(),
    venueType: faker.helpers.arrayElement([
      "Museum",
      "Galerie",
      "Messe",
      "Auktionshaus",
      "Akademie",
    ]),
    city: faker.location.city(),
    street: faker.location.streetAddress({ useFullAddress: false }),
    houseNumber: faker.number.int({ min: 1, max: 100 }).toString(),
    zipCode: faker.location.zipCode("#####"),
    additionalAddressInfo: faker.lorem.words(),
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
