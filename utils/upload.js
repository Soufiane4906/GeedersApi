import axios from "axios";

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "guiders"); // Assurez-vous que c'est votre bon preset Cloudinary

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/db6z6r660/image/upload", // Remplacez par votre propre URL Cloudinary
            data
        );

        return res.data.url;
    } catch (err) {
        console.error("Erreur lors de l'upload :", err.response?.data || err.message);
    }
};

export default upload;