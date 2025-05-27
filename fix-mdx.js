const fs = require("fs");
const path = require("path");

// Vérifier si un répertoire existe
function directoryExists(dirPath) {
	try {
		return fs.statSync(dirPath).isDirectory();
	} catch (err) {
		return false;
	}
}

// Fonction pour parcourir récursivement un répertoire
function walkDir(dir, callback) {
	console.log(`Exploration du répertoire: ${dir}`);

	if (!directoryExists(dir)) {
		console.error(`Le répertoire ${dir} n'existe pas!`);
		return;
	}

	const files = fs.readdirSync(dir);
	console.log(`Nombre de fichiers/dossiers trouvés: ${files.length}`);

	files.forEach((f) => {
		const fullPath = path.join(dir, f);
		console.log(`Examen de: ${fullPath}`);

		const isDirectory = fs.statSync(fullPath).isDirectory();
		if (isDirectory) {
			console.log(`${fullPath} est un répertoire, exploration récursive...`);
			walkDir(fullPath, callback);
		} else {
			console.log(`${fullPath} est un fichier, traitement...`);
			callback(fullPath);
		}
	});
}

// Fonction pour corriger les fins de ligne dans un fichier MDX
function fixMdxFile(filePath) {
	if (!filePath.endsWith(".mdx")) {
		console.log(`Ignoré: ${filePath} (pas un fichier MDX)`);
		return;
	}

	console.log(`Traitement du fichier MDX: ${filePath}`);

	try {
		// Lire le contenu du fichier
		let content = fs.readFileSync(filePath, "utf8");
		console.log(`Contenu lu: ${content.length} caractères`);

		// Afficher les premiers caractères pour débogage
		console.log(
			`Début du contenu: ${content
				.substring(0, 100)
				.replace(/\r/g, "\\r")
				.replace(/\n/g, "\\n")}...`,
		);

		// Vérifier si le fichier contient des fins de ligne Windows
		const hasWindowsLineEndings = content.includes("\r\n");
		const hasPublishedTrueR = content.includes("published: true\r");

		console.log(`Fins de ligne Windows: ${hasWindowsLineEndings}`);
		console.log(`Problème "published: true\\r": ${hasPublishedTrueR}`);

		if (hasWindowsLineEndings || hasPublishedTrueR) {
			console.log(`Fichier nécessitant des corrections: ${filePath}`);

			// Remplacer les fins de ligne Windows par des fins de ligne Unix
			if (hasWindowsLineEndings) {
				content = content.replace(/\r\n/g, "\n");
				console.log("Fins de ligne Windows corrigées");
			}

			// Corriger spécifiquement le problème "published: true\r"
			if (hasPublishedTrueR) {
				content = content.replace(/published: true\r/g, "published: true");
				console.log(`Problème "published: true\\r" corrigé`);
			}

			// Écrire le contenu corrigé dans le fichier
			fs.writeFileSync(filePath, content, "utf8");

			console.log("Fichier sauvegardé avec succès");
		} else {
			console.log(`Aucune correction nécessaire pour ${filePath}`);
		}
	} catch (error) {
		console.error(`Erreur lors du traitement du fichier ${filePath}:`, error);
	}
}

// Parcourir le répertoire content et corriger tous les fichiers MDX
console.log("Début de la correction des fichiers MDX...");

const contentDir = "./content";
if (directoryExists(contentDir)) {
	console.log(`Le répertoire ${contentDir} existe, début du traitement...`);
	walkDir(contentDir, fixMdxFile);
} else {
	console.error(`ERREUR: Le répertoire ${contentDir} n'existe pas!`);
}

console.log("Correction des fichiers MDX terminée.");
