import type { PartialTranslation } from "../types";

const sv: PartialTranslation = {
  nav: {
    howItWorks: "Så fungerar det",
    methodology: "Metod",
    pricing: "Priser",
    about: "Om oss",
    faq: "FAQ",
    casinos: "Casinon",
    verify: "Verifiera",
    apply: "Ansök",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    primaryLabel: "Primär",
  },
  footer: {
    verifySeal: "Verifiera ett sigill",
    apply: "Ansök",
    faq: "FAQ",
  },
  stickyCta: {
  },
  seal: {
    certified: "Certifierad",
  },
  common: {
    certifiedSince: "Certifierad sedan",
    viewSealRecord: "Visa sigillposten",
    youProvide: "Du lämnar:",
  },
  home: {
    title: "Swift Secure",
    ctaVerify: "Verifiera ett sigill",
    howEyebrow: "Så fungerar det",
  },
  process: {
  },
  pricing: {
    title: "Priser",
  },
  methodology: {
    title: "Verifieringsmetod",
    description:
      "Exakt vad Swift Secure kontrollerar innan ett märke utfärdas, hur ofta det kontrolleras om och vad vi medvetet inte påstår oss verifiera.",
    eyebrow: "Metod",
    h1: "Vad märket faktiskt betyder",
    sub: "Ett förtroendemärke är bara värt det som står bakom det. Detta är hela metoden — inklusive kontrollerna vi inte gör, så att ingen behöver gissa.",
    checksTitle: "Det vi verifierar",
    limitsTitle: "Det vi inte verifierar",
    limitsSub:
      "Publicerat med avsikt. Ett sigill som antyder mer än det kontrollerar är sämre än inget sigill, och det är den linjen vi håller när något går fel hos en operatör som bär vårt märke.",
    suspensionTitle: "Så stängs ett märke av",
    suspensionBody:
      "Om ett klagomål kommer in eller crawlern ser något avvikande får operatören 48 timmar att svara privat innan något ändras offentligt — det skyddar mot falska anmälningar från konkurrenter. Är problemet verkligt tas märket ned och verifieringssidan uppdateras med fakta. Vi tar inte bort sidor mot betalning, och det finns ingen avgift som får ett fynd att försvinna.",
    ctaHeading: "Vill du få din plattform kontrollerad?",
    ctaButton: "Beställ en skanning",
  },
  directory: {
    scanned: {
      label: "Skannad",
      desc: "Kontrollerad automatiskt av vår crawler. Ingen affärsrelation och inget märke utfärdat.",
    },
    listed: {
      label: "Listad",
      desc: "Med i vårt index utifrån offentliga källor. Ingen kontroll har körts ännu och inget här är rekommenderat.",
    },
    flagged: {
      label: "Behöver granskas",
      desc: "Den automatiska kontrollen hittade något som kräver en mänsklig blick innan någon slutsats dras.",
    },
    statusFilterAll: "Alla",
    lastScanned: "Senast kontrollerad",
    viewReport: "Visa rapport",
  },
  casinos: {
    title: "Casinokatalog",
    description: "Katalog över nya onlinecasinon som Swift Secure följer, var och en med sin aktuella verifieringsstatus.",
    eyebrow: "Katalog",
    h1: "Casinokatalog",
    sub: "Varje nytt casino vi indexerar, med dess aktuella status. De flesta är listade från offentliga källor och har ännu inte kontrollerats — statusen på varje kort visar vilka.",
    searchPlaceholder: "Sök på casinonamn eller jurisdiktion",
    searchLabel: "Sök bland certifierade casinon",
    empty: "Inga casinon matchar den sökningen.",
  },
  verify: {
    title: "Verifiera ett sigill",
    description: "Ange sigill-ID:t som visas på ett casinos webbplats för att bekräfta att det är äkta och för närvarande certifierat av Swift Secure.",
    h1: "Verifiera ett sigill",
    sub: "Ange sigill-ID:t som visas på casinots webbplats för att bekräfta att det är äkta och aktuellt.",
    inputPlaceholder: "t.ex. CS-2026-0042",
    inputLabel: "Sigill-ID",
    button: "Verifiera",
    validStatus: "Giltigt och aktivt sigill",
    operator: "Operatör:",
    jurisdiction: "Jurisdiktion:",
    invalidStatus: "Inget matchande sigill hittades",
    contactUs: "kontakta oss",
  },
  apply: {
    title: "Ansök om certifiering",
    description: "Få ditt Swift Secure-sigill på så lite som 10 dagar. Berätta om din plattform — vårt compliance-team svarar inom 48 timmar.",
    eyebrow: "Ansök om certifiering",
    h1: "Få ditt sigill på så lite som 10 dagar",
    sub: "Berätta om din plattform. Vårt compliance-team svarar inom 48 timmar.",
    fieldName: "Casinots namn",
    fieldNamePlaceholder: "Northgate Interactive",
    fieldWebsite: "Webbplatsens URL",
    fieldJurisdiction: "Licensjurisdiktion",
    fieldJurisdictionPlaceholder: "t.ex. Malta, Curacao",
    fieldEmail: "Kontakt-e-post",
    fieldMessage: "Något annat vi bör veta?",
    fieldMessagePlaceholder: "Lanseringsdatum, målmarknader, pågående granskningar...",
    submit: "Skicka ansökan",
    successTitle: "Ansökan mottagen",
    successBody: "Vårt team kontaktar {email} inom 48 timmar för att starta granskningen.",
  },
  about: {
  },
  faqPage: {
    title: "FAQ",
    eyebrow: "FAQ",
    h1: "Vanliga frågor",
    ctaHeading: "Har du fler frågor?",
    ctaButton: "Kontakta oss",
  },
  badge: {
    title: "Swift Secure-sigillet",
    description: "Varumärkesreferens för Swift Secure-certifieringssigillet: primär badge, kompakt lockup och variant för mörk bakgrund.",
    eyebrow: "Sigillet",
    h1: "Swift Secure",
    sub: "En badge, tre former. Enkel nog att stå bredvid en logotyp i sidfoten, tydlig nog att betyda något vid en snabb blick.",
    primaryTitle: "Primärt sigill",
    primaryBody:
      "Den fullständiga badgen, för en startsidas hero eller sidfot. En linjetjocklek, en accentfärg, inga gradienter eller extra utsmyckning — den måste vara tydlig i alla storlekar, även nedskalad till 60 px.",
    compactTitle: "Kompakt lockup",
    compactBody: "För en kassasida, en sidfotsrad eller där det horisontella utrymmet är begränsat. Samma ikon, samma ordmärke, en rad.",
    darkTitle: "Variant för mörk bakgrund",
    darkBody:
      "För casinosajter med mörka teman: ringen byts till en konturikon och vit text så att den förblir läsbar utan en vit platta bakom sig.",
    ctaHeading: "Vill du visa Swift Secure på din webbplats?",
    ctaButton: "Ansök om certifiering",
  },
};

export default sv;
