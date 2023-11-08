// Import des User-Models
import User from "../model/user.model.js";

// Import von bcrypt für das Hashen von Passwörtern und das Vergleichen von gehashten Passwörtern
import bcrypt from 'bcrypt';

// Import des Userrollen ENUMs
import { USER_ROLES } from "../model/user.model.js";



export async function getAll(req, res) {
    // TODO implement pagination!
    // Hole alle Usereinträge und lasse dabei die Passwortfelder weg
    const entries = await User.find().select('-password');
    res.send(entries);
}


export async function getById(req, res) {
    // Extrahiere user ID aus URL Parametern
    const id = req.params.id;

    // Hole gesuchten Usereintrag per ID und lasse Passwortfeld weg
    const entry = await User.findById(id).select('-password');

    // Wenn Ergebnis leer
    if (!entry) {
        // Sende Fehler
        res.status(404).send({
            message: `Entry with ID ${id} not found!`
        });
        return;
    }

    // Sende gefundenen Eintrag zurück
    res.send(entry);
}


export async function updateById(req, res) {
    // Extrahiere zu veraendernde Felder aus dem Body
    const { username, password, role } = req.body;

    // Extrahiere user ID aus URL Parametern
    const id = req.params.id;

    // Hole gesuchten Usereintrag per ID mit Passwortfeld, weil dieses evtl. geaendert werden soll
    const entry = await User.findById(id);

    // Wenn Ergebnis leer
    if (!entry) {
        // Sende Fehler
        res.status(404).send({
            message: `Entry with ID ${id} not found!`
        });
        return;
    }

    // Pruefe, ob entsprechender User zugreift per ID
    const tokenPayload = req.tokenPayload;

    // Pruefe, ob User-ID des zugreifenden Users der User-ID des zu veraenderden Eintrags entspricht
    // User duerfen nur ihre eigenen Eintraege veraendern!
    if ((tokenPayload.role !== USER_ROLES.admin) && (tokenPayload.id !== id)) {
        // FORBIDDEN
        res.status(403).send({
            message: 'User is not allowed to access this endpoint.'
        });

        return;
    }

    // Pruefe, ob Admin versucht Daten eines anderen Admins zu veraendern
    if (
        (tokenPayload.role === USER_ROLES.admin) // Aufrufender User ist ein Admin
        && (tokenPayload.id !== id) // Zu bearbeitender User ist nicht der aufrufende User
        && (entry.role === USER_ROLES.admin) // Zu bearbeitender User ist auch Admin
    ) {
        // FORBIDDEN
        res.status(403).send({
            message: 'User is not allowed to access this endpoint.'
        });

        return;
    }

    // Erstelle Passwort-Hash (Verschlüsseltes Passwort)
    const pwHash = await bcrypt.hash(password, 10);

    // Ueberschreibe die Daten des Eintrags mit denen aus dem Request Body
    entry.username = username;
    entry.password = pwHash;
    entry.role = role;
    
    try {
        const updatedEntry = await entry.save();

        res.send({
            id: updatedEntry._id,
            username: updatedEntry.username,
            role: updatedEntry.role
        });

    } catch (error) {
        console.error(error);

        // Wenn Duplicate Error vorliegt (doppelte Einträge)
        if (error.code === 11000) {
            // Sende entsprechen Fehler zurück und brich ab
            res.status(409).send({
                error: `Username '${req.body.username}' already exists!`
            });
            return;
        }

        // Andere Validierungsfehler
        res.status(400).send({
            error: error.message
        });
    }
}