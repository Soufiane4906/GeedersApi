import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Language } from '../models/language.model.js';

dotenv.config();

const languages = [
    { langue: "Français", flag: "FR" },
    { langue: "Anglais", flag: "GB" },
    { langue: "Espagnol", flag: "ES" },
    { langue: "Allemand", flag: "DE" },
    { langue: "Italien", flag: "IT" },
    { langue: "Portugais", flag: "PT" },
    { langue: "Arabe", flag: "SA" },
    { langue: "Chinois", flag: "CN" },
    { langue: "Japonais", flag: "JP" },
    { langue: "Russe", flag: "RU" },
    { langue: "Néerlandais", flag: "NL" },
    { langue: "Hindi", flag: "IN" },
    { langue: "Turc", flag: "TR" },
    { langue: "Coréen", flag: "KR" },
    { langue: "Suédois", flag: "SE" },
    { langue: "Norvégien", flag: "NO" },
    { langue: "Danois", flag: "DK" },
    { langue: "Grec", flag: "GR" },
    { langue: "Polonais", flag: "PL" },
    { langue: "Thaï", flag: "TH" },
    { langue: "Vietnamien", flag: "VN" }

];

const seedLanguages = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect('mongodb+srv://soufiane:gogo@cluster0.05omqhe.mongodb.net/v7?retryWrites=true&w=majority&appName=Cluster0');
        console.log('✅ Connecté à MongoDB');

        // Suppression des langues existantes
        await Language.collection.drop();
        console.log('🗑️ Collection Language supprimée');

        // Insertion des nouvelles langues
        const result = await Language.insertMany(languages);
        console.log(`✅ ${result.length} langues insérées avec succès !`);

        // Fermeture de la connexion
        await mongoose.connection.close();
        console.log('🔌 Déconnecté de MongoDB');
    } catch (error) {
        console.error('❌ Erreur lors du seed des langues :', error);
        process.exit(1);
    }
};

// Exécuter le script
seedLanguages();
