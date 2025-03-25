// utils/options.js
export const topVisitedCities = [
    // France
    { city: "Paris", country: "France" },
    { city: "Nice", country: "France" },
    // Espagne
    { city: "Barcelona", country: "Spain" },
    { city: "Madrid", country: "Spain" },
    // États-Unis
    { city: "New York", country: "United States" },
    { city: "San Francisco", country: "United States" },
    { city: "New Orleans", country: "United States" },
    { city: "Miami", country: "United States" },
    { city: "Los Angeles", country: "United States" },
    // Italie
    { city: "Rome", country: "Italy" },
    { city: "Venice", country: "Italy" },
    { city: "Milan", country: "Italy" },
    // Chine
    { city: "Beijing", country: "China" },
    { city: "Xi'an", country: "China" },
    { city: "Shanghai", country: "China" },
    // Turquie
    { city: "Istanbul", country: "Turkey" },
    { city: "Antalya", country: "Turkey" },
    // Mexique
    { city: "Cancún", country: "Mexico" },
    { city: "Acapulco", country: "Mexico" },
    { city: "Guadalajara", country: "Mexico" },
    // Thaïlande
    { city: "Bangkok", country: "Thailand" },
    { city: "Phuket", country: "Thailand" },
    // Royaume-Uni
    { city: "London", country: "United Kingdom" },
    { city: "Cambridge", country: "United Kingdom" },
    // Allemagne
    { city: "Berlin", country: "Germany" },
    { city: "Munich", country: "Germany" },
    // Japon
    { city: "Tokyo", country: "Japan" },
    { city: "Hokkaido", country: "Japan" },
    { city: "Kyoto", country: "Japan" },
    { city: "Okinawa", country: "Japan" },
    // Autriche
    { city: "Vienna", country: "Austria" },
    { city: "Salzburg", country: "Austria" },
    // Grèce
    { city: "Athens", country: "Greece" },
    { city: "Mykonos", country: "Greece" },
    // Russie
    { city: "Moscow", country: "Russia" },
    { city: "Saint Petersburg", country: "Russia" },
    // Malaisie
    { city: "Kuala Lumpur", country: "Malaysia" },
    // Portugal
    { city: "Lisbon", country: "Portugal" },
    { city: "Porto", country: "Portugal" },
    // Canada
    { city: "Toronto", country: "Canada" },
    { city: "Montreal", country: "Canada" },
    { city: "Vancouver", country: "Canada" },
    { city: "Quebec", country: "Canada" },
    // Pays-Bas
    { city: "Amsterdam", country: "Netherlands" },
    { city: "Rotterdam", country: "Netherlands" },
    // Pologne
    { city: "Warsaw", country: "Poland" },
    { city: "Krakow", country: "Poland" },
    // Hongrie
    { city: "Budapest", country: "Hungary" },
    // Singapour
    { city: "Singapore", country: "Singapore" },
    // Corée du Sud
    { city: "Seoul", country: "South Korea" },
    { city: "Busan", country: "South Korea" },
    // Indonésie
    { city: "Jakarta", country: "Indonesia" },
    { city: "Surabaya", country: "Indonesia" },
    // Inde
    { city: "New Delhi", country: "India" },
    { city: "Jaipur", country: "India" },
    // Croatie
    { city: "Dubrovnik", country: "Croatia" },
    { city: "Zagreb", country: "Croatia" },
    // Suisse
    { city: "Zurich", country: "Switzerland" },
    { city: "Geneva", country: "Switzerland" },
    // Arabie Saoudite
    { city: "Makkah", country: "Saudi Arabia" },
    { city: "Riyadh", country: "Saudi Arabia" },
    // Belgique
    { city: "Brussels", country: "Belgium" },
    { city: "Bruges", country: "Belgium" },
    // Irlande
    { city: "Dublin", country: "Ireland" },
    { city: "Limerick", country: "Ireland" },
    // Vietnam
    { city: "Hanoi", country: "Vietnam" },
    { city: "Ho Chi Minh City", country: "Vietnam" },
    // Maroc
    { city: "Casablanca", country: "Morocco" },
    { city: "Marrakech", country: "Morocco" },
    // Émirats Arabes Unis
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    // Qatar
    { city: "Doha", country: "Qatar" }
];
export const availableLanguages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ru", name: "Русский" },
    { code: "ar", name: "العربية" },
    { code: "pt", name: "Português" },
    { code: "nl", name: "Nederlands" },
    { code: "ko", name: "한국어" },
    { code: "hi", name: "हिन्दी" },
    { code: "tr", name: "Türkçe" },
    { code: "vi", name: "Tiếng Việt" }
];
// Add this to your options.js file

export const pointsOfInterest = [
    // Paris, France
    { id: "eiffel_tower", name: "Eiffel Tower", country: "France", city: "Paris" },
    { id: "louvre", name: "Louvre Museum", country: "France", city: "Paris" },
    { id: "notre_dame", name: "Notre Dame Cathedral", country: "France", city: "Paris" },
    { id: "arc_de_triomphe", name: "Arc de Triomphe", country: "France", city: "Paris" },
    { id: "montmartre", name: "Montmartre", country: "France", city: "Paris" },

    // London, UK
    { id: "big_ben", name: "Big Ben", country: "UK", city: "London" },
    { id: "london_eye", name: "London Eye", country: "UK", city: "London" },
    { id: "tower_bridge", name: "Tower Bridge", country: "UK", city: "London" },
    { id: "british_museum", name: "British Museum", country: "UK", city: "London" },
    { id: "buckingham_palace", name: "Buckingham Palace", country: "UK", city: "London" },

    // New York, USA
    { id: "times_square", name: "Times Square", country: "USA", city: "New York" },
    { id: "central_park", name: "Central Park", country: "USA", city: "New York" },
    { id: "statue_liberty", name: "Statue of Liberty", country: "USA", city: "New York" },
    { id: "empire_state", name: "Empire State Building", country: "USA", city: "New York" },
    { id: "brooklyn_bridge", name: "Brooklyn Bridge", country: "USA", city: "New York" },

    // Rome, Italy
    { id: "colosseum", name: "Colosseum", country: "Italy", city: "Rome" },
    { id: "vatican", name: "Vatican City", country: "Italy", city: "Rome" },
    { id: "trevi_fountain", name: "Trevi Fountain", country: "Italy", city: "Rome" },
    { id: "pantheon", name: "Pantheon", country: "Italy", city: "Rome" },
    { id: "spanish_steps", name: "Spanish Steps", country: "Italy", city: "Rome" },

    // Add more POIs for other cities as needed
];
export const languageOptions = [
    { value: "English", label: "🇬🇧 English" },
    { value: "French", label: "🇫🇷 French" },
    { value: "German", label: "🇩🇪 German" },
    { value: "Italian", label: "🇮🇹 Italian" },
    { value: "Spanish", label: "🇪🇸 Spanish" },
    { value: "Chinese", label: "🇨🇳 Chinese" },
    { value: "Japanese", label: "🇯🇵 Japanese" },
    { value: "Korean", label: "🇰🇷 Korean" },
    { value: "Arabic", label: "🇦🇪 Arabic" },
    { value: "Russian", label: "🇷🇺 Russian" },
    { value: "Portuguese", label: "🇵🇹 Portuguese" },
    { value: "Dutch", label: "🇳🇱 Dutch" },
    { value: "Greek", label: "🇬🇷 Greek" },
    { value: "Hindi", label: "🇮🇳 Hindi" },
    { value: "Urdu", label: "🇵🇰 Urdu" },
    { value: "Turkish", label: "🇹🇷 Turkish" },
    { value: "Swedish", label: "🇸🇪 Swedish" },
    { value: "Norwegian", label: "🇳🇴 Norwegian" },
    { value: "Danish", label: "🇩🇰 Danish" },
    { value: "Finnish", label: "🇫🇮 Finnish" },
    { value: "Polish", label: "🇵🇱 Polish" },
    { value: "Czech", label: "🇨🇿 Czech" },
    { value: "Slovak", label: "🇸🇰 Slovak" },
    { value: "Hungarian", label: "🇭🇺 Hungarian" },
    { value: "Romanian", label: "🇷🇴 Romanian" },
    { value: "Bulgarian", label: "🇧🇬 Bulgarian" },
    { value: "Serbian", label: "🇷🇸 Serbian" },
    { value: "Croatian", label: "🇭🇷 Croatian" },
    { value: "Slovenian", label: "🇸🇮 Slovenian" },
    { value: "Albanian", label: "🇦🇱 Albanian" },
    { value: "Macedonian", label: "🇲🇰 Macedonian" },
    { value: "Bosnian", label: "🇧🇦 Bosnian" },
    { value: "Montenegrin", label: "🇲🇪 Montenegrin" },
    { value: "Kosovar", label: "🇽🇰 Kosovar" },
    { value: "Georgian", label: "🇬🇪 Georgian" },
    { value: "Armenian", label: "🇦🇲 Armenian" },
    { value: "Azerbaijani", label: "🇦🇿 Azerbaijani" },
    { value: "Kazakh", label: "🇰🇿 Kazakh" },
    { value: "Uzbek", label: "🇺🇿 Uzbek" },
    { value: "Turkmen", label: "🇹🇲 Turkmen" },
    { value: "Kyrgyz", label: "🇰🇬 Kyrgyz" },
    { value: "Tajik", label: "🇹🇯 Tajik" },
    { value: "Afghan", label: "🇦🇫 Afghan" },
    { value: "Pakistani", label: "🇵🇰 Pakistani" },
    { value: "Indian", label: "🇮🇳 Indian" },
    { value: "Bangladeshi", label: "🇧🇩 Bangladeshi" },
    { value: "Nepali", label: "🇳🇵 Nepali" },
    { value: "Bhutanese", label: "🇧🇹 Bhutanese" },
    { value: "Sri Lankan", label: "🇱🇰 Sri Lankan" },
    { value: "Maldivian", label: "🇲🇻 Maldivian" },
    { value: "American", label: "🇺🇸 American" },
    { value: "Canadian", label: "🇨🇦 Canadian" },
    { value: "Mexican", label: "🇲🇽 Mexican" },
    { value: "Brazilian", label: "🇧🇷 Brazilian" },
    { value: "Argentinian", label: "🇦🇷 Argentinian" },
    { value: "Chilean", label: "🇨🇱 Chilean" },
    { value: "Peruvian", label: "🇵🇪 Peruvian" },
    { value: "Colombian", label: "🇨🇴 Colombian" },
    { value: "Venezuelan", label: "🇻🇪 Venezuelan" },
    { value: "Ecuadorian", label: "🇪🇨 Ecuadorian" },
  // Ajoutez d'autres langues si nécessaire
];

export const pointsOfInterestOptions = [
//
    { name: "Business", icon: "./img/icons8-b2b-50.png" },
    { name: "Administration", icon: "./img/icons8-administration.png" },

    //businnes


    { name: "Museum", icon: "https://img.icons8.com/ios/50/000000/museum.png" },
    { name: "Beach", icon: "https://img.icons8.com/ios/50/000000/beach.png" },


    {
        name: "Night Club",
        icon: "https://img.icons8.com/?size=100&id=60357&format=png&color=000000",
    },
    {
        name: "Park",
        icon: "https://img.icons8.com/?size=100&id=7XFQqoCVoosj&format=png&color=000000",
    },
    {
        name: "Shopping Mall",
        icon: "https://img.icons8.com/ios/50/000000/shopping-mall.png",
    },
    {
        name: "Theatre",
        icon: "https://img.icons8.com/?size=100&id=zbPYzShUWkkU&format=png&color=000000",
    },
    {
        name: "Amusement Park",
        icon: "https://img.icons8.com/?size=100&id=25053&format=png&color=000000",
    },
    {
        name: "Restaurant",
        icon: "https://img.icons8.com/ios/50/000000/restaurant.png",
    },
    {
        name: "Hiking",
        icon: "https://img.icons8.com/?size=100&id=9844&format=png&color=000000",
    },
];
export const countriesData = [
    { name: "France", flag: "🇫🇷" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "China", flag: "🇨🇳" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Korea", flag: "🇰🇷" },
    { name: "Arab Emirates", flag: "🇦🇪" },
    { name: "Russia", flag: "🇷🇺" },
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Greece", flag: "🇬🇷" },
    { name: "India", flag: "🇮🇳" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Turkey", flag: "🇹🇷" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Denmark", flag: "🇩🇰" },
    { name: "Finland", flag: "🇫🇮" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Austria", flag: "🇦🇹" },
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Poland", flag: "🇵🇱" },
    { name: "Czech Republic", flag: "🇨🇿" },
    { name: "Hungary", flag: "🇭🇺" },
    { name: "Romania", flag: "🇷🇴" },
    { name: "Bulgaria", flag: "🇧🇬" },
    { name: "Croatia", flag: "🇭🇷" },
    { name: "Serbia", flag: "🇷🇸" },
    { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    //go
    { name: "United States", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Chile", flag: "🇨🇱" },
    { name: "Colombia", flag: "🇨🇴" },
    { name: "Peru", flag: "🇵🇪" },
    { name: "Venezuela", flag: "🇻🇪" },
    { name: "Ecuador", flag: "🇪🇨" },
    { name: "Uruguay", flag: "🇺🇾" },
    { name: "Paraguay", flag: "🇵🇾" },
    { name: "Bolivia", flag: "🇧🇴" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "New Zealand", flag: "🇳🇿" },
    { name: "Fiji", flag: "🇫🇯" },
    { name: "Papua New Guinea", flag: "🇵🇬" },
    { name: "Solomon Islands", flag: "🇸🇧" },
    { name: "Vanuatu", flag: "🇻🇺" },
    { name: "Samoa", flag: "🇼🇸" },
    { name: "Tonga", flag: "🇹🇴" },
    { name: "Kiribati", flag: "🇰🇮" },
    { name: "Tuvalu", flag: "🇹🇻" },
    { name: "Nauru", flag: "🇳🇷" },
    { name: "Marshall Islands", flag: "🇲🇭" },
    { name: "Micronesia", flag: "🇫🇲" },
    { name: "Palau", flag: "🇵🇼" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Malaysia", flag: "🇲🇾" },
    { name: "Indonesia", flag: "🇮🇩" },
    { name: "Philippines", flag: "🇵🇭" },
    { name: "Thailand", flag: "🇹🇭" },
    { name: "Vietnam", flag: "🇻🇳" },
    { name: "Cambodia", flag: "🇰🇭" },
    { name: "Laos", flag: "🇱🇦" },
    { name: "Myanmar", flag: "🇲🇲" },
    { name: "Bangladesh", flag: "🇧🇩" },
    { name: "Nepal", flag: "🇳🇵" },
    { name: "Sri Lanka", flag: "🇱🇰" },
    { name: "Afghanistan", flag: "🇦🇫" },
    { name: "Iran", flag: "🇮🇷" },
    { name: "Iraq", flag: "🇮🇶" },
    { name: "Syria", flag: "🇸🇾" },
    { name: "Lebanon", flag: "🇱🇧" },
    //allez
    { name: "South Africa", flag: "🇿🇦" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "Egypt", flag: "🇪🇬" },
    { name: "Algeria", flag: "🇩🇿" },
    { name: "Morocco", flag: "🇲🇦" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Libya", flag: "🇱🇾" },
    { name: "Sudan", flag: "🇸🇩" },
    { name: "Ethiopia", flag: "🇪🇹" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "Uganda", flag: "🇺🇬" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Cameroon", flag: "🇨🇲" },
    { name: "Ivory Coast", flag: "🇨🇮" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Mali", flag: "🇲🇱" },
    { name: "Niger", flag: "🇳🇪" },
    { name: "Chad", flag: "🇹🇩" },
    { name: "Mauritania", flag: "🇲🇷" },
    { name: "Mozambique", flag: "🇲🇿" },
    { name: "Madagascar", flag: "🇲🇬" },
    { name: "Zimbabwe", flag: "🇿🇼" },
    { name: "Zambia", flag: "🇿🇲" },
    { name: "Angola", flag: "🇦🇴" },
    { name: "Namibia", flag: "🇳🇦" },
    { name: "Botswana", flag: "🇧🇼" },
    { name: "Mauritius", flag: "🇲🇺" },
    { name: "Malawi", flag: "🇲🇼" },
    { name: "Lesotho", flag: "🇱🇸" },
    { name: "Swaziland", flag: "🇸🇿" },
    { name: "Burundi", flag: "🇧🇮" },
    { name: "Rwanda", flag: "🇷🇼" },
    //come on for the last time
    { name: "Antarctica", flag: "🇦🇶" },
    { name: "Greenland", flag: "🇬🇱" },
    { name: "Faroe Islands", flag: "🇫🇴" },
    { name: "Iceland", flag: "🇮🇸" },
    { name: "Svalbard and Jan Mayen", flag: "🇸🇯" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Ireland", flag: "🇮🇪" }
].sort((a, b) => a.name.localeCompare(b.name));
