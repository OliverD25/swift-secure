import type { PartialTranslation } from "../types";

/**
 * da. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const da: PartialTranslation = {
  nav: {
    howItWorks: "Sådan virker det",
    methodology: "Hvad vi kontrollerer",
    pricing: "For casinoer",
    about: "Om os",
    faq: "FAQ",
    casinos: "Casinoindeks",
    verify: "Tjek et badge",
    apply: "Bliv certificeret",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    primaryLabel: "Primær",
  },
  footer: {
    verifySeal: "Verificer et segl",
    apply: "Ansøg om segl",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Driver du et onlinecasino? Styrk spillernes tillid og de første indbetalinger med en uafhængig audit.",
    button: "Bliv certificeret gratis",
  },
  seal: {
    certified: "Licens og slots verificeret",
  },
  stats: [
    {
      count: "listed",
      label: "Casinoer vi følger",
    },
    {
      count: "topJurisdiction",
      label: "Licenseret under {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licenser fundet i registret",
    },
    {
      count: "badged",
      label: "Viser verificeret segl i dag",
    },
  ],
  common: {
    certifiedSince: "Registrering dateret",
    viewSealRecord: "Åbn auditregistreringen",
    youProvide: "Hvad der kræves:",
  },
  home: {
    title: "Swift Secured — uafhængig verifikation af casinoer og spilservere",
    description:
      "Kontrollér casinolicenser mod myndighedernes officielle registre, og opdag scriptede slots, før du indbetaler. Uafhængig teknisk audit med offentlige tidsstempler.",
    badge: "Uafhængig audittjeneste. 100 % upartisk.",
    h1: "Stop med at indbetale i blinde: verificer licens og ægte spilservere",
    sub: "Vi auditerer onlinecasinoer i realtid. Vi sporer de aktive spilservere for at bekræfte, at slots er 100 % originale, kontrollerer at licensen er aktivt registreret, og markerer svindelkopier, før du risikerer dine penge.",
    ctaApply: "Hvad vi kontrollerer",
    ctaVerify: "Tjek et badge",
    howEyebrow: "Sådan virker det",
    howTitle:
      "Fra registeropslag i realtid til en dateret audit, der ikke kan ændres",
    criteriaEyebrow: "Sikkerhedsstandarder",
    criteriaTitle: "Hvad vores audit verificerer — og de strenge regler bag",
    operatorsEyebrow: "Offentlig oversigt",
    operatorsTitle:
      "Casinoer i vores indeks — verificeret, ubekræftet eller markeret",
    viewAllCasinos: "Udforsk casinoindekset",
    ctaHeading: "Gennemsigtig teknisk metode",
    ctaSub:
      "Læs præcis hvordan vi sporer forespørgsler til spilservere, krydstjekker myndighedernes registre og opdager manipuleret RTP — uden at tage imod betaling fra operatører for positive omtaler.",
    ctaButton: "Læs metoden",
  },
  criteria: [
    {
      title: "Direkte verifikation i myndighedens register",
      desc: "Hundredvis af svindelsider viser falske licenslogoer i sidefoden. Vi kontrollerer licensnumre og aktive webdomæner direkte i myndighedernes officielle databaser.",
    },
    {
      title: "Fuld identitet på myndigheden og reglerne i jurisdiktionen",
      desc: "Licensmyndigheder giver meget forskellige niveauer af beskyttelse. Hver registrering fremhæver det præcise navn på myndigheden og licens-id'et, så du selv kan vurdere den juridiske styrke bag.",
    },
    {
      title: "Præcis verifikationsdato og tidsstempel",
      desc: "Licenser udløber, suspenderes eller skifter domæne fra den ene dag til den anden. Statiske påstande betyder intet — hver registrering viser den præcise UTC-dato, hvor systemet foretog opslaget.",
    },
    {
      title: "Auditregistreringer, der ikke kan købes eller manipuleres",
      desc: "Intet casino kan betale for at ændre fund, skjule dårlige auditresultater eller slette logfiler. Verifikationsstatus ændrer sig kun, når registerdata eller serversporinger ændrer sig.",
    },
    {
      title: "Audit af ægte spilservere (mod scriptede slots)",
      desc: "Falske casinoer kopierer spillenes grafik, men lader spinnets matematik køre gennem private servere med manipuleret RTP. Vi undersøger de faktiske netværksforespørgsler for at sikre, at hvert spin går direkte til udbyderens officielle servere.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Udtræk af licens- og domænedata",
      desc: "Vi læser det oplyste licensnummer, selskabet bag og den præcise spil-URL direkte fra casinoets offentlige frontend.",
    },
    {
      n: "2",
      title: "Krydstjek i registret og sporing af servere",
      desc: "Vi søger i den udstedende myndigheds officielle, aktive database efter godkendelser af domænet og analyserer udgående websocket-/HTTP-trafik, når spillene starter.",
    },
    {
      n: "3",
      title: "Offentliggørelse af dateret auditcertifikat",
      desc: "Uanset om resultatet er bekræftet, manglende eller uverificeret, offentliggøres hele auditregistreringen med et uforanderligt tidsstempel, der beskriver hvert enkelt tjek, vi har udført.",
    },
    {
      n: "4",
      title: "Uafhængig verifikation med ét klik",
      desc: "Hver registrering indeholder rå links til registret og dokumentation for netværkssporingen, så spillere selv kan efterprøve resultaterne.",
    },
  ],
  process: {
    title: "Sådan virker det — verifikationsprocessen",
    description:
      "Sådan auditerer Swift Secured casinoernes licensdata, sporer de originale spilserveres endpoints og offentliggør auditregistreringer, der ikke kan manipuleres.",
    eyebrow: "Verifikationsproces",
    h1: "Sådan bliver casinoer auditeret, verificeret og indekseret",
    sub: "Vores tekniske procedure er fuldt automatiseret og offentliggjort, så den kan gentages fuldt ud. Vi udtrækker offentliggjorte licens-id'er, krydstjekker myndighedernes officielle lister og sporer live spilforespørgsler uden adgang hos casinoet og uden at spilleren skal oprette en konto.",
    ctaHeading: "Driver du et licenseret onlinecasino?",
    ctaButton: "Ansøg om verificeret segl",
  },
  stages: [
    {
      n: "1",
      title: "Udtræk af offentlige data og endpoints",
      duration: "Scanning af frontend",
      desc: "Vi læser licenspåstande, selskabsoplysninger om operatøren og sidens domæne-URL'er direkte fra sidefoden på de sider, vi undersøger. Poster, der endnu ikke er verificeret, markeres udtrykkeligt som ikke-kontrolleret, indtil et fuldt live-udtræk er gennemført.",
      provide: "Der kræves intet af spillere eller operatører.",
    },
    {
      n: "2",
      title: "Myndighedens register og sporing af servere",
      duration: "Kun offentlige registre",
      desc: "Vi søger i myndighedernes officielle databaser efter lister over godkendte domæner. Samtidig starter vi testspil for at bekræfte, at spillets matematik hentes direkte fra udbyderens CDN'er (f.eks. Pragmatic, Evolution).",
      provide: "Hverken registrering eller betaling er nødvendig.",
    },
    {
      n: "3",
      title: "Offentliggørelse af uafhængig status og tidsstempel",
      duration: "Gratis at læse",
      desc: 'Resultaterne dannes med det samme og med den præcise verifikationsdato. Kan en licens ikke findes, eller fejler valideringen af domænet, angiver registreringen åbent "ubekræftet" i stedet for at skjule fundet.',
      provide: "Åben offentlig adgang for alle brugere.",
    },
    {
      n: "4",
      title: "Løbende overvågning og gentagne tjek",
      duration: "Ved hvert nyt tjek",
      desc: "Registre og spildomæner ændrer sig over tid. Når et nyt tjek gennemføres, opdateres status og dato automatisk. Tidligere logfiler over tjek forbliver arkiveret, så ændringer ikke kan ske i det skjulte.",
      provide: "Kontrollér altid auditdatoen på badget.",
    },
  ],
  methodology: {
    title: "Teknisk auditmetode",
    description:
      "Fuld specifikation af verifikationen: hvordan vi tjekker myndighedernes registre, auditerer de originale slotservere, registrerer datoer og inddrager badges, når licenser udløber.",
    eyebrow: "Metode og omfang",
    h1: "Teknisk verifikationsmetode og operationelle grænser",
    sub: "Audits gennemføres udefra, fra en almindelig spillers synsvinkel, uden særlig adgang og uden hjælp fra operatøren. Vi afprøver offentliggjorte licensnumre, tjekker godkendelser af aktive domæner i de officielle registre og sporer live forespørgsler til slotservere. Hvert fund dateres og offentliggøres.",
    checksTitle: "Verificerede tekniske parametre",
    limitsTitle: "Auditens grænser og begrænsninger",
    limitsSub:
      "Enhver teknisk audit har klare grænser. Vi siger tydeligt, hvad vi verificerer (licensens gyldighed, officielle slotservere), og hvad der ikke kan auditeres udefra (intern bogføring, enkeltafgørelser om udbetalinger).",
    monitoringTitle: "Obligatorisk datostempling og overvågning",
    monitoringBody:
      "Myndighedernes databaser opdateres hele tiden: licenser udløber, domæner udskiftes, og certifikater inddrages. Et tjek er kun korrekt for det øjeblik, det blev udført. Vi viser tjekdatoen tydeligt. Ældre datoer udløser en ny automatisk audit. Arkiverede fund bliver aldrig overskrevet i stilhed.",
    suspensionTitle: "Regler for automatisk inddragelse af badget",
    suspensionBody:
      "Forsvinder en licens fra et register, eller skifter en side til scriptede spilservere, opdateres badgets status med det samme. Klager eller anmeldelser fra konkurrenter ændrer ikke status direkte — de udløser et automatisk nyt tjek. Ingen betaling eller sponsorat kan give et badge tilbage, når licensen er ugyldig.",
    ctaHeading: "Verificer altid et casino, før du indbetaler.",
    ctaButton: "Søg i casinoindekset",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Match mellem licens og register",
      summary:
        "Bekræfter den officielle licensregistrering og verificerer det aktive spildomæne i myndighedens register.",
      checks: [
        "Licens-id udtrukket direkte fra operatørens frontend",
        "Kontrolleret mod den udstedende myndigheds officielle database",
        "Aktivt webdomæne krydstjekket mod listen over godkendte domæner",
        "Fuld gennemsigtighed om jurisdiktionens parametre",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audit af ægte spilservere",
      summary:
        "Sikrer, at slots kører på udbyderens ægte CDN'er, så forfalskede spil med manipuleret RTP forhindres.",
      checks: [
        "Undersøgelse af netværksforespørgsler, når spillet starter",
        "Verifikation af endpoints til spillets matematik (Pragmatic, Play'n GO, Hacksaw m.fl.)",
        "Opdagelse af proxyservere og falske slotkopier",
        "Bekræftelse af, at udbyderens konfiguration er uændret",
      ],
    },
    {
      id: "dated-records",
      name: "Dokumentation for dato og klokkeslæt",
      summary:
        "Hvert fund bærer et uforanderligt UTC-tidsstempel, der viser præcis hvornår systemet auditerede siden.",
      checks: [
        "Tjekdatoen står tydeligt ved siden af verifikationsstatus",
        "Poster uden tjek er udtrykkeligt markeret",
        "Synlige logfiler over tidligere registreringer",
        "Status opdateres straks ved en ny audit",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantier for uafhængighed",
      summary:
        "Ingen affiliate-bias, ingen betalte statusændringer og ingen reklamebaserede placeringer.",
      checks: [
        "Ingen affiliate-links eller pay-per-click-henvisninger til casinoer",
        "Ingen betalte opgraderinger af vurderinger eller sponsorerede badgeplaceringer",
        "Objektive tekniske fund frem for redaktionelle holdninger",
        "Åben procedure, så spillere selv kan efterprøve",
      ],
    },
  ],
  limits: [
    {
      title: "Spillenes RTP og tilfældighedsgeneratorer (RNG)",
      desc: "At vurdere statistisk RTP over lang tid eller RNG'ens tilfældighed kræver adgang til de interne servere og millioner af loggede spin over millioner af runder. Vi bekræfter, at slots forbinder direkte til udbyderens officielle servere (som bruger akkrediterede testlaboratorier som iTech Labs eller eCOGRA), men vi udfører ikke selv uafhængige RNG-laboratorietests.",
    },
    {
      title: "Interne konto- og betalingsprocedurer",
      desc: "Audits udføres fra en besøgendes synsvinkel. Identitetskontrol af spillere (KYC), lukning af konti, omsætningskrav på bonusser og køer i betalingsbehandlingen forbliver interne i casinoets software og ligger uden for eksterne tekniske tjek.",
    },
    {
      title: "Garanteret sikkerhed for udbetalinger",
      desc: "En ekstern audit kan ikke se ind i operatørens private bankkonti eller likviditetsreserver. En gyldig licens og originale slots bekræfter, at reglerne overholdes, og at spillene er ægte, men kan ikke garantere driftsmæssig solvens eller hurtige udbetalinger.",
    },
    {
      title: 'Subjektive anbefalinger som "sikkert casino"',
      desc: "En licens er en myndighedstilladelse med vilkår. Kravene varierer markant mellem jurisdiktioner (f.eks. MGA, Curacao, Anjouan). Pr. 4. august 2026 har 215 af 223 indekserede casinoer papirer fra Anjouan. Vi leverer rå fakta og dokumentation fra serverne, så du kan træffe et oplyst valg — vi udsteder aldrig generelle sikkerhedsgarantier.",
    },
  ],
  directory: {
    certified: {
      label: "Licens og slots verificeret",
      desc: "Licensnummeret er bekræftet som match i myndighedens register, OG spilserverne er verificeret som udbyderens ægte endpoints på auditdatoen.",
    },
    scanned: {
      label: "Ubekræftet / ikke i registret",
      desc: "Søgningen gav ingen officiel registertræffer for domænet på auditdatoen. Operatøren bruger måske et domæne, der ikke står på listen, en licens der ikke er indekseret, eller driver uden offentlig tilladelse.",
    },
    listed: {
      label: "Post uden tjek",
      desc: "Indekseret fra offentlige kilder på nettet. Automatisk scanning i backend og sporing af slotservere er endnu ikke udført for denne side.",
    },
    flagged: {
      label: "Markeret / uoverensstemmelse fundet",
      desc: "Auditen fandt uoverensstemmelser: f.eks. domæner der ikke matcher, defekte licenssegl eller omdirigering via proxyservere, når en slot starter.",
    },
    statusFilterAll: "Alle statusser",
    lastScanned: "Auditdato",
    viewReport: "Se hele rapporten",
  },
  casinos: {
    title: "Oversigt over verificerede casinoer",
    description:
      "Oversigt over de onlinecasinoer, Swift Secured følger. Se aktuel licensstatus, officielle registeropslag og resultater af audits af spilserverne.",
    eyebrow: "Casinooversigt",
    h1: "Auditoversigt over onlinecasinoer",
    sub: "Søg blandt de casinoer, vi følger, og se licensstatus i registret, udstedende jurisdiktion og logfiler fra verifikationen af spilserverne. At et casino står på listen, er ikke en anbefaling.",
    searchPlaceholder: "Søg på casinonavn, domæne eller jurisdiktion ...",
    searchLabel: "Søg i auditerede casinoer",
    empty: "Ingen casinoer matcher din søgning.",
  },
  verify: {
    title: "Verificer et segls ægthed",
    description:
      "Indtast et Swift Secured segl-id for at bekræfte en operatørs aktuelle verifikationsstatus og undgå falske badges.",
    h1: "Verificer et Swift Secured-segl",
    sub: "Indtast det unikke segl-id, der vises på casinoets side, for at bekræfte, at auditen er gyldig, og for at se de bagvedliggende verifikationsspor.",
    inputPlaceholder: "f.eks. CS-2026-0042",
    inputLabel: "Segl-id",
    button: "Verificer segl",
    validStatus: "Gyldigt og aktivt verificeret segl",
    operator: "Casinobrand/operatør:",
    jurisdiction: "Myndighedens jurisdiktion:",
    lastChecked: "Seneste auditdato:",
    invalidStatus: "Ikke registreret / ugyldigt segl-id",
    invalidBody:
      "Der findes ingen aktiv verifikationsregistrering for dette id. Siden, der viser mærket, bruger måske et ikke-godkendt eller forfalsket badgebillede. Hvis du har mistanke om svindel,",
    contactUs: "så kontakt vores team",
  },
  apply: {
    title: "Ansøgning om casinocertificering",
    description:
      "Indsend dit onlinecasino til en uafhængig audit af licens og spilservere. Opbyg tillid hos spillerne, og øg antallet af første indbetalinger (FTD).",
    eyebrow: "Løsninger for operatører",
    h1: "Få dit casino auditeret og verificeret",
    sub: "Formular til casinooperatører og platformsejere. Et verificeret Swift Secured-segl på siden dokumenterer, at din licens er gyldig, og at dine slotservere er ægte, så spillerne tøver mindre ved indbetalingen. Audits er gratis de første 6 måneder.",
    fieldName: "Casinoets brandnavn",
    fieldNamePlaceholder: "Det primære brandnavn, spillerne ser",
    fieldWebsite: "Aktivt webdomæne",
    fieldJurisdiction: "Licensudstedende myndighed",
    fieldJurisdictionPlaceholder: "f.eks. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Firmaets kontakt-e-mail",
    fieldMessage: "Yderligere tekniske oplysninger",
    fieldMessagePlaceholder:
      "Licensnummer, direkte valideringslink eller teknisk kontaktinfo",
    submit: "Send til audit",
    successTitle: "Ansøgningen er sendt",
    successBody:
      "Vores system og compliance-team gennemgår dit domæne og udfører sporingstest af spilserverne. Du modtager en opdatering om auditstatus på {email} inden for 24–48 timer.",
  },
  pricing: {
    title: "Vilkår og priser for det verificerede segl",
    description:
      "Gratis verifikationssegl i 6 måneder til onlinecasinoer. Ingen oprettelsesgebyrer, intet betalingskort og ingen andel i omsætningen. Lav spillernes tvivl om til indbetalinger.",
    eyebrow: "Løsninger for operatører",
    h1: "Lav spillernes skepsis om til første indbetalinger",
    sub: "Nye casinobrands mister op til 70 % af de mulige indbetalere på grund af manglende tillid. Et uafhængigt verifikationssegl, der ikke kan manipuleres, bekræfter med det samme din aktive licens og dine originale spilservere. Det løfter konverteringen uden besværlig opsætning.",
    billingTitle: "Detaljer om verifikationsprogrammet",
  },
  billingNotes: [
    {
      title: "Gratis audit og segl i 6 måneder",
      desc: "Få en fuld audit, og vis det verificerede segl gratis i 6 måneder fra integrationsdatoen. Ingen oprettelsesgebyrer, intet betalingskort og ingen skjulte kontrakter.",
    },
    {
      title: "Ét enkelt krav: et gensidigt link",
      desc: "Vi kræver blot, at badget i sidefoden linker til dit eget auditcertifikat på vores side. Så kan spillerne efterprøve de tekniske spor i realtid. Ingen andel i omsætningen og ingen henvisningsgebyrer.",
    },
    {
      title: "Gennemsigtige valgmuligheder efter prøveperioden",
      desc: "Før din prøveperiode på 6 måneder slutter, giver vi dig gennemsigtige priser for fornyelse. Der er ingen automatiske betalinger og ingen tvungne abonnementer — du bestemmer selv hele vejen.",
    },
    {
      title: "Fjern det med det samme, hvis du vil",
      desc: "Fjern blot badgets kodestump fra sidefoden på din side, når du vil, så er integrationen slut. Dine tidligere tjek forbliver arkiveret i vores oversigt med fulde audittidsstempler.",
    },
  ],
  badge: {
    title: "Formater og integration af det verificerede segl",
    description:
      "Se Swift Secureds segldesign, visuelle badgeformater og de tekniske retningslinjer for, hvordan spillere kontrollerer, at auditlinket er ægte.",
    eyebrow: "Visuelle seglfiler",
    h1: "Integration af Swift Secured-badget, og hvordan verifikationen opfører sig",
    sub: "Fås i tre responsive formater, lavet til sidefodsbjælker og registreringsformularer. Ethvert ægte badge fungerer som et direkte kryptografisk link til den aktuelle auditrapport. Statiske billeder uden aktivt link består ikke verifikationen.",
    primaryTitle: "Standardbadge",
    primaryBody:
      "Lavet til sidefoden ved siden af licenssegl. Enkelt og troværdigt. Et klik åbner casinoets aktuelle verifikationsrapport med dokumentation for sporingen af spilserverne og tidsstempler for registertjekket.",
    compactTitle: "Kompakt variant på én linje",
    compactBody:
      "Vandret format, tilpasset rækker med betalingsikoner eller mobile navigationsbjælker. Beholder hele verifikationssporingen og fører til nøjagtig samme auditcertifikat.",
    darkTitle: "Variant med kontur til mørkt tema",
    darkBody:
      "Version med høj kontrast og kontur, lavet til mørke casinogrænseflader. Bevarer maksimal læsbarhed uden at gå på kompromis med brandets visuelle udtryk.",
    ctaHeading: "Klar til at vise det verificerede segl på din side?",
    ctaButton: "Bliv certificeret",
  },
  faqPage: {
    title: "Ofte stillede spørgsmål",
    description:
      "Svar om tjek af licensregistre, opdagelse af scriptede slots, uafhængighed af operatørerne og kriterierne for verifikation.",
    eyebrow: "FAQ og gennemsigtighed",
    h1: "Ofte stillede spørgsmål fra spillere og operatører",
    ctaHeading: "Driver du et casino? Ansøg om en audit på under 2 minutter.",
    ctaButton: "Bliv certificeret gratis",
  },
  faqs: [
    {
      q: "Hvad garanterer Swift Secured-badget en spiller?",
      a: "Badget dokumenterer, at casinoets domæne på den angivne auditdato var aktivt registreret i myndighedens officielle register, OG at forespørgslerne ved spin gik direkte til certificerede udbyderservere (hvilket bekræfter originale slots med ægte RTP og uden scripts).",
    },
    {
      q: "Hvordan opdager I scriptede eller forfalskede slots?",
      a: "Under testen undersøger vi den udgående netværkstrafik, når en slot starter. Officielle spil henter matematik og filer direkte fra certificerede udbyderdomæner (f.eks. Pragmatic, Evolution). Sender en side spin-forespørgsler gennem ukendte mellemliggende proxyservere for at forfalske spillets udfald, markeres den som scriptet.",
    },
    {
      q: "Kan et casino betale for at blive verificeret eller for at ændre auditfund?",
      a: "Betaling har absolut ingen indflydelse. Verifikationsstatus afgøres automatisk af opslag i registre og tekniske sporinger af servere. Operatører må vise auditbadges, men kan ikke købe en ændret status eller slette tidligere logfiler.",
    },
    {
      q: 'Hvad betyder status "ubekræftet" for et casino?',
      a: "Ubekræftet betyder, at vores system ikke fandt nogen matchende domæneregistrering i myndighedens officielle database på auditdatoen. Det kan ske, hvis registre er offline, hvis godkendelsen af domænet afventer, eller hvis operatøren bruger uregistrerede spejlsider. Det er en faktuel iagttagelse, ikke en juridisk erklæring.",
    },
    {
      q: "Kan Swift Secured løse min tvist med et casino om en udbetaling?",
      a: "Vi administrerer ikke spillerkonti og håndterer ikke betalinger. Til gengæld indeholder vores auditcertifikat direkte links til den officielle licensmyndighed, der er nævnt i registreringen, hvor du kan indgive en officiel klage til myndigheden.",
    },
    {
      q: "Hvorfor skal spillere og operatører stole på Swift Secured?",
      a: "Fordi enhver påstand kan efterprøves med ét klik. Vi offentliggør de rå destinationer for registersøgningerne og sporingerne af slottenes netværks-endpoints, så spillere ikke behøver at stole på løfter eller affiliate-anmeldelser.",
    },
  ],
  about: {
    title: "Om Swift Secured",
    description:
      "Læs om Swift Secureds mission: gennemsigtige, automatiserede og uafhængige audits af casinolicenser og spilservere.",
    eyebrow: "Om os",
    h1: "Uafhængig verifikation bygget på tekniske fakta",
    sub: "Swift Secured leverer automatiserede tekniske audits af onlinecasinoer. Vi verificerer opslag i myndighedernes registre og auditerer forbindelserne til slotservere, og vi offentliggør fundene med præcise tidsstempler. Ingen betalt placering, ingen affiliate-links og ingen manipulerede resultater.",
    card1Title: "Ingen kommerciel bias",
    card1Body:
      "Intet casino kan købe et verificeret segl uden at bestå de tekniske tjek. Vi siger nej til affiliate-omsætningsdeling, pay-per-click-henvisninger og sponsorerede placeringer i vurderinger. Fundene er udelukkende objektive.",
    card2Title: "En klart afgrænset teknisk ramme",
    card2Body:
      "Vi oplyser åbent, hvad auditen kan: vi bekræfter officielle licensregistreringer og slot-endpoints uden scripts, og vi angiver tydeligt grænserne, når det gælder operatørens interne økonomi eller reglerne for spillernes omsætningskrav.",
  },
};

export default da;
