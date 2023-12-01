// Import von jwt für unsere Token-Operationen (Signieren, Verifizieren)
import jwt from "jsonwebtoken";

// Import von bcrypt für das Hashen von Passwörtern und das Vergleichen von gehashten Passwörtern
import bcrypt from "bcrypt";

// Import des User-Models
import User from "../model/user.model.js";
import organizer from "../model/organizer.model.js";
import { USER_ROLES } from "../model/user.model.js";

export async function registerNewUser(req, res) {
  // Destrukturiere den Body in einzelne Bestandteile
  const { username, email, password } = req.body;

  // Erstelle Passwort-Hash (Verschlüsseltes Passwort)
  const pwHash = await bcrypt.hash(password, 10);

  // Erstelle neue User-Instanz standardmaessig mit Userrolle 'user'
  const newUser = new User({
    username,
    email,
    password: pwHash,
    role: USER_ROLES.user,
  });

  // Versuche neue User-Instanz zu speichern
  try {
    // Speichere Model-Instanz
    const entry = await newUser.save();

    // Schicke entsprechenden Statuscode zusammen mit neuem Eintrag an Client zurück
    res.status(201).send({
      id: entry._id,
      username: entry.username,
      role: entry.role,
    });
  } catch (error) {
    console.error(error);

    // Wenn Duplicate Error vorliegt (doppelte Einträge)
    if (error.code === 11000) {
      // Sende entsprechen Fehler zurück und brich ab
      res.status(409).send({
        error: `Username '${req.body.username}' already exists!`,
      });
      return;
    }

    // Andere Validierungsfehler
    res.status(400).send({
      error: error.message,
    });
  }
}

export async function registerNewOrganizer(req, res) {
  const { email, password, firstname, lastname, organization } = req.body;

  const pwHash = await bcrypt.hash(password, 10); // Erstelle Passwort-Hash (Verschlüsseltes Passwort)
  const newUser = new User({
    username: firstname + " " + lastname,
    email,
    password: pwHash,
    role: USER_ROLES.organizer,
  }); // Erstelle neue User-Instanz standardmaessig mit Userrolle 'user'

  try {
    const entryNew = await newUser.save(); // Speichere Model-Instanz
    const userId = entryNew._id; // Hole ID des neuen Users

    const newOrganizer = new organizer({
      firstname,
      lastname,
      organization,
      userId,
    }); // Erstelle neue Organizer-Instanz

    const entry = await newOrganizer.save();
    res
      .status(201)
      .send({
        message: "Organizer created successfully! Please wait for approval",
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "Something went wrong! Please contact Us.",
    });
  }
}

export async function loginUser(req, res) {
  // Extrahiere Logindaten aus Requestbody
  const { password } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  let organizerId = null;

  try {
    // Versuche Usereintrag per Usernamen zu holen
    const userEntry = username
      ? await User.findOne({ username: username })
      : await User.findOne({ email: email });

    // Prüfe, ob Usereintrag per Usernamen gefunden wurde
    if (!userEntry) {
      // Sende Fehler zurück
      res.status(401).send({
        message: "Incorrect username or password",
      });

      return;
    }

    if (userEntry.role === USER_ROLES.organizer) {
       organizerId = await organizer.findOne({ userId: userEntry._id });
    }
    
    // Vergleiche gespeicherten Hash mit dem übergebenen Passwort
    if (!(await bcrypt.compare(password, userEntry.password))) {
      // Sende Fehler zurück
      res.status(401).send({
        message: "Incorrect username or password",
      });

      return;
    }

    const tokenPayload = {
      id: userEntry._id,
      username: userEntry.username,
      role: userEntry.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60, // 1000 ms * 60 sek. * 60 min = Eine Stunde
    });

    // Stelle HttpOnly Cookie für Token aus
    res.cookie("access_token", token, {
      httpOnly: true, // als HTTP-Only Cookie setzen (nicht per JS erreichbar im Browser)
      maxAge: 1000 * 60 * 60, // 1000 ms * 60 sek. * 60 min = Eine Stunde
    });

    // Sende partiellen Usereintrag als Bestätigung zurück
    res.send({
      id: userEntry._id,
      username: userEntry.username,
      role: userEntry.role,
      organizerId: organizerId._id ? organizerId._id : null,
    });

  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
}

export async function logoutUser(req, res) {
  // Entferne httpOnly Cookie, so dass Token nicht mehr verfuegbar ist
  res.clearCookie("access_token").send({
    message: "Logged out successfully!",
  });
}
