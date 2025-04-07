function LanguageFlag({ language }) {

    const flags = {
        en: "🇬🇧",
        it: "🇮🇹",
        fr: "🇫🇷",
        es: "🇪🇸",
        de: "🇩🇪",
        ru: "🇷🇺",
        ja: "🇯🇵",
        ko: "🇰🇷",
        zh: "🇨🇳",
        ar: "🇸🇦",
    };
    const flag = flags[language] || "🏳️"; 

    return <span className="flag">{flag}</span>;
}

export default LanguageFlag;
