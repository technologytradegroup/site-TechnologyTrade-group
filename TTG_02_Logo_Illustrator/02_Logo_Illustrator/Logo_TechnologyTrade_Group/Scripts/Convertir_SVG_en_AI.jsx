// ============================================================================
// Convertir_SVG_en_AI.jsx — TechnologyTrade Group
// À exécuter dans Adobe Illustrator : Fichier > Scripts > Autre script… (Ctrl/Cmd + F12)
// Rôle : ouvre chaque fichier ../SVG/*.svg et l'enregistre au format Illustrator natif (.ai)
//        dans le dossier ../AI_genere/ . Le dossier SVG doit rester à côté du dossier Scripts.
// STATUT : script fourni NON EXÉCUTÉ ici (Adobe Illustrator n'est pas disponible dans l'environnement
//          de production). Vérifié uniquement pour la syntaxe.
// ============================================================================
#target illustrator
(function () {
    var scriptFile = new File($.fileName);
    var root = scriptFile.parent.parent;                 // Logo_TechnologyTrade_Group/
    var svgFolder = new Folder(root.fsName + "/SVG");
    var outFolder = new Folder(root.fsName + "/AI_genere");
    if (!svgFolder.exists) { alert("Dossier SVG introuvable : " + svgFolder.fsName); return; }
    if (!outFolder.exists) { outFolder.create(); }

    var previousInteraction = app.userInteractionLevel;
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;   // évite l'alerte « police Montserrat manquante »

    var files = svgFolder.getFiles("*.svg");
    var ok = 0, failed = [];
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var name = decodeURI(files[i].name).replace(/\.svg$/i, "");
            var opts = new IllustratorSaveOptions();
            try { opts.compatibility = Compatibility.ILLUSTRATOR17; } catch (e1) {}
            opts.pdfCompatible = true;
            opts.embedICCProfile = false;
            doc.saveAs(new File(outFolder.fsName + "/" + name + ".ai"), opts);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            ok++;
        } catch (e) {
            failed.push(decodeURI(files[i].name) + " : " + e);
        }
    }
    app.userInteractionLevel = previousInteraction;
    var msg = ok + " fichier(s) .ai généré(s) dans :\n" + outFolder.fsName;
    if (failed.length) { msg += "\n\nÉchecs (" + failed.length + ") :\n" + failed.join("\n"); }
    alert(msg);
})();
