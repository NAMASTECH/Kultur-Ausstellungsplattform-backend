// Import von jwt für unsere Token-Operationen (Signieren, Verifizieren)
import jwt from "jsonwebtoken";

export async function validateToken(req, res, next) {
    // Extrahiere Token aus Cookie
    const token = req.cookies.access_token

    try {
        // Versuche gelieferten Token zu verifizieren
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Speichere die aufgelöste Token-Payload im Requestobjekt für weitere Nutzung im Controller
        req.tokenPayload = payload;

        // Schalte Requestverarbeitungskette weiter
        next();

    } catch (error) {
        // Nur für debug-Zwecke
        console.error(error);

        // Token ist ungültig oder abgelaufen
        // Brich Request ab und sende entsprechenden Fehler zurück
        res.sendStatus(401);
    }
}

export async function validateAdmin(req, res, next) {
    // Extrahiere Token aus Cookie
    const token = req.cookies.access_token

    try {
        // Versuche gelieferten Token zu verifizieren
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Speichere die aufgelöste Token-Payload im Requestobjekt für weitere Nutzung im Controller
        req.tokenPayload = payload;

        // Prüfe ob der Nutzer ein Admin ist
        if (payload.role !== "admin") {
            // Brich Request ab und sende entsprechenden Fehler zurück
            res.sendStatus(401);
        }

        // Schalte Requestverarbeitungskette weiter
        next();

    } catch (error) {
        // Nur für debug-Zwecke
        console.error(error);

        // Token ist ungültig oder abgelaufen
        // Brich Request ab und sende entsprechenden Fehler zurück
        res.sendStatus(401);
    }
}

export async function validateOrganizerAndAdmin(req, res, next) {
    // Extrahiere Token aus Cookie
    const token = req.cookies.access_token

    try {
        // Versuche gelieferten Token zu verifizieren
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Speichere die aufgelöste Token-Payload im Requestobjekt für weitere Nutzung im Controller
        req.tokenPayload = payload;

        // Prüfe ob der Nutzer ein Organizer ist
        if (payload.role !== "organizer" && payload.role !== "admin") {
            // Brich Request ab und sende entsprechenden Fehler zurück
            res.sendStatus(401);
        }

        // Schalte Requestverarbeitungskette weiter
        next();

    } catch (error) {
        // Nur für debug-Zwecke
        console.error(error);

        // Token ist ungültig oder abgelaufen
        // Brich Request ab und sende entsprechenden Fehler zurück
        res.sendStatus(401);
    }
}