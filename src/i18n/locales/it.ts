import type { PartialTranslation } from "../types";

const it: PartialTranslation = {
  nav: {
    howItWorks: "Come funziona",
    methodology: "Metodologia",
    pricing: "Prezzi",
    about: "Chi siamo",
    faq: "FAQ",
    casinos: "Casinò",
    verify: "Verifica",
    apply: "Richiedi",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    primaryLabel: "Principale",
  },
  footer: {
    verifySeal: "Verifica un sigillo",
    apply: "Richiedi",
    faq: "FAQ",
  },
  stickyCta: {
  },
  seal: {
    certified: "Certificato",
  },
  common: {
    certifiedSince: "Certificato dal",
    viewSealRecord: "Vedi il registro del sigillo",
    youProvide: "Cosa fornisci:",
  },
  home: {
    title: "Swift Secure",
    ctaVerify: "Verifica un sigillo",
    howEyebrow: "Come funziona",
  },
  process: {
  },
  pricing: {
    title: "Prezzi",
  },
  methodology: {
    title: "Metodologia di verifica",
    description:
      "Esattamente cosa controlla Swift Secure prima di emettere un badge, ogni quanto viene ricontrollato e cosa dichiariamo apertamente di non verificare.",
    eyebrow: "Metodologia",
    h1: "Cosa significa davvero il badge",
    sub: "Un marchio di fiducia vale solo quanto ciò che c'è dietro. Questo è il metodo completo, inclusi i controlli che non facciamo, così nessuno deve tirare a indovinare.",
    checksTitle: "Cosa verifichiamo",
    limitsTitle: "Cosa non verifichiamo",
    limitsSub:
      "Pubblicato di proposito. Un sigillo che lascia intendere più di quanto controlla è peggio di nessun sigillo, ed è la linea che teniamo quando qualcosa va storto da un operatore che porta il nostro badge.",
    suspensionTitle: "Come viene sospeso un badge",
    suspensionBody:
      "Se arriva un reclamo o il crawler rileva qualcosa di anomalo, l'operatore ha 48 ore per rispondere in privato prima che cambi qualcosa pubblicamente: questo protegge dalle segnalazioni false dei concorrenti. Se il problema è reale il badge viene rimosso e la pagina di verifica viene aggiornata con i fatti. Non rimuoviamo pagine dietro pagamento e non esiste una tariffa che faccia sparire una risultanza.",
    ctaHeading: "Vuoi far controllare la tua piattaforma?",
    ctaButton: "Richiedi una scansione",
  },
  directory: {
    scanned: {
      label: "Scansionato",
      desc: "Controllato automaticamente dal nostro crawler. Nessun rapporto commerciale e nessun badge emesso.",
    },
    listed: {
      label: "Elencato",
      desc: "Nel nostro indice da fonti pubbliche. Non è ancora stato eseguito alcun controllo e nulla qui è avallato.",
    },
    flagged: {
      label: "Da esaminare",
      desc: "Il controllo automatico ha rilevato qualcosa che richiede uno sguardo umano prima di qualsiasi conclusione.",
    },
    statusFilterAll: "Tutti",
    lastScanned: "Ultimo controllo",
    viewReport: "Vedi il report",
  },
  casinos: {
    title: "Directory dei casinò",
    description: "Directory dei nuovi casinò online monitorati da Swift Secure, ciascuno con il suo stato di verifica attuale.",
    eyebrow: "Directory",
    h1: "Directory dei casinò",
    sub: "Ogni nuovo casinò che indicizziamo, con il suo stato attuale. La maggior parte è elencata da fonti pubbliche e non è ancora stata controllata — lo stato su ogni scheda lo indica.",
    searchPlaceholder: "Cerca per nome del casinò o giurisdizione",
    searchLabel: "Cerca tra i casinò certificati",
    empty: "Nessun casinò corrisponde alla ricerca.",
  },
  verify: {
    title: "Verifica un sigillo",
    description: "Inserisci l'ID del sigillo mostrato sul sito di un casinò per confermare che sia autentico e attualmente certificato da Swift Secure.",
    h1: "Verifica un sigillo",
    sub: "Inserisci l'ID del sigillo mostrato sul sito del casinò per confermare che sia autentico e valido.",
    inputPlaceholder: "es. CS-2026-0042",
    inputLabel: "ID sigillo",
    button: "Verifica",
    validStatus: "Sigillo valido e attivo",
    operator: "Operatore:",
    jurisdiction: "Giurisdizione:",
    invalidStatus: "Nessun sigillo corrispondente",
    contactUs: "contattaci",
  },
  apply: {
    title: "Richiedi la certificazione",
    description: "Ottieni il sigillo Swift Secure in appena 10 giorni. Raccontaci della tua piattaforma — il nostro team compliance risponde entro 48 ore.",
    eyebrow: "Richiedi la certificazione",
    h1: "Ottieni il sigillo in appena 10 giorni",
    sub: "Raccontaci della tua piattaforma. Il nostro team compliance risponde entro 48 ore.",
    fieldName: "Nome del casinò",
    fieldNamePlaceholder: "Northgate Interactive",
    fieldWebsite: "URL del sito",
    fieldJurisdiction: "Giurisdizione della licenza",
    fieldJurisdictionPlaceholder: "es. Malta, Curacao",
    fieldEmail: "Email di contatto",
    fieldMessage: "Altro che dovremmo sapere?",
    fieldMessagePlaceholder: "Data di lancio, mercati target, audit in corso...",
    submit: "Invia la richiesta",
    successTitle: "Richiesta ricevuta",
    successBody: "Il nostro team contatterà {email} entro 48 ore per avviare l'audit.",
  },
  about: {
  },
  faqPage: {
    title: "FAQ",
    eyebrow: "FAQ",
    h1: "Domande frequenti",
    ctaHeading: "Hai ancora domande?",
    ctaButton: "Contattaci",
  },
  badge: {
    title: "Il sigillo Swift Secure",
    description: "Riferimento di brand per il sigillo di certificazione Swift Secure: badge principale, versione compatta e variante su sfondo scuro.",
    eyebrow: "Il sigillo",
    h1: "Swift Secure",
    sub: "Un badge, tre forme. Abbastanza semplice da stare accanto a un logo nel footer, abbastanza chiaro da dire qualcosa a colpo d'occhio.",
    primaryTitle: "Sigillo principale",
    primaryBody:
      "Il badge completo, per l'hero della homepage o il footer. Un solo spessore di tratto, un solo colore d'accento, niente gradienti o ornamenti — deve restare leggibile a qualsiasi dimensione, anche ridotto a 60px.",
    compactTitle: "Versione compatta",
    compactBody: "Per una pagina di pagamento, una striscia nel footer o dove lo spazio orizzontale è limitato. Stessa icona, stesso wordmark, su una riga.",
    darkTitle: "Variante su sfondo scuro",
    darkBody:
      "Per i siti di casinò con tema scuro: l'anello diventa un'icona in outline e il testo bianco, così resta leggibile senza bisogno di una base bianca.",
    ctaHeading: "Vuoi mostrare Swift Secure sul tuo sito?",
    ctaButton: "Richiedi la certificazione",
  },
};

export default it;
