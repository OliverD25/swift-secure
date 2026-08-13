import type { PartialTranslation } from "../types";

/**
 * sv. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const sv: PartialTranslation = {
  nav: {
    howItWorks: "Så fungerar det",
    methodology: "Vad vi kontrollerar",
    pricing: "För casinon",
    about: "Om oss",
    faq: "FAQ",
    casinos: "Casinoindex",
    verify: "Kontrollera ett sigill",
    apply: "Bli certifierad",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    primaryLabel: "Primär",
  },
  footer: {
    verifySeal: "Verifiera ett sigill",
    apply: "Ansök om sigill",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Driver du ett onlinecasino? Stärk spelarnas förtroende och antalet första insättningar med en oberoende granskning.",
    button: "Bli certifierad gratis",
  },
  seal: {
    certified: "Licens och slots verifierade",
  },
  stats: [
    {
      count: "listed",
      label: "Casinon som följs",
    },
    {
      count: "topJurisdiction",
      label: "Licensierade under {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licenser hittade i registret",
    },
    {
      count: "badged",
      label: "Visar verifierat sigill idag",
    },
  ],
  common: {
    certifiedSince: "Protokoll daterat",
    viewSealRecord: "Öppna granskningsprotokoll",
    youProvide: "Detta krävs:",
  },
  home: {
    title: "Swift Secured — Oberoende verifiering av casinon och spelservrar",
    description:
      "Verifiera casinolicenser mot officiella myndighetsregister och upptäck skriptade slots innan du gör en insättning. Oberoende teknisk granskning med offentliga tidsstämplar.",
    badge: "Oberoende granskningstjänst. 100 % opartisk.",
    h1: "Sluta sätta in blint: verifiera licens och äkta spelservrar",
    sub: "Vi granskar onlinecasinon i realtid. Vi spårar spelservrar i drift för att bekräfta att slots är 100 % original, verifierar aktiv licensregistrering och flaggar bedrägliga kopior innan du riskerar dina pengar.",
    ctaApply: "Vad vi kontrollerar",
    ctaVerify: "Kontrollera ett sigill",
    howEyebrow: "Så fungerar det",
    howTitle:
      "Från registersökning i realtid till oföränderligt daterat protokoll",
    criteriaEyebrow: "Säkerhetsstandarder",
    criteriaTitle:
      "Vad vår granskning verifierar — och de strikta reglerna bakom",
    operatorsEyebrow: "Offentlig katalog",
    operatorsTitle:
      "Casinon som följs i vårt index — verifierade, obekräftade eller flaggade",
    viewAllCasinos: "Utforska casinoindexet",
    ctaHeading: "Transparent teknisk metod",
    ctaSub:
      "Läs exakt hur vi spårar spelservrarnas förfrågningar, jämför mot myndigheternas register och upptäcker manipulerad RTP — utan att ta betalt av operatörer för positiva omdömen.",
    ctaButton: "Läs metoden",
  },
  criteria: [
    {
      title: "Direkt verifiering i myndighetens register",
      desc: "Hundratals bedrägliga sajter visar falska licenslogotyper i sidfoten. Vi verifierar licensnummer och aktiva webbdomäner direkt i officiella myndighetsdatabaser.",
    },
    {
      title:
        "Fullständig identitet på tillsynsmyndighet och jurisdiktionens regler",
      desc: "Licensmyndigheter skiljer sig kraftigt åt i skyddsnivå. Varje protokoll anger tillsynsmyndighetens exakta namn och licens-ID, så att du kan bedöma den rättsliga styrkan bakom.",
    },
    {
      title: "Exakt verifieringsdatum och tidsstämpel",
      desc: "Licenser går ut, dras in eller byter domän över en natt. Statiska påståenden betyder ingenting — varje protokoll skriver ut det exakta UTC-datum då systemet gjorde sökningen.",
    },
    {
      title: "Granskningsprotokoll som inte går att köpa eller manipulera",
      desc: "Inget casino kan betala för att ändra resultat, dölja dåliga granskningsresultat eller radera loggar. Verifieringsstatus ändras bara när registerdata eller serverspår ändras.",
    },
    {
      title: "Granskning av äkta spelservrar (mot skriptade slots)",
      desc: "Falska casinon kopierar spelens grafik men kör spinnens matematik på privata servrar med riggad RTP. Vi inspekterar nätverksförfrågningar i realtid för att säkerställa att varje spinn ansluter direkt till leverantörens officiella servrar.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Hämta licens- och domändata",
      desc: "Vi läser av det uppgivna licensnumret, bolaget och den exakta spel-URL:en direkt från casinots publika frontend.",
    },
    {
      n: "2",
      title: "Registermatchning och serverspårning",
      desc: "Vi söker i den utfärdande myndighetens officiella aktiva databas efter matchande domängodkännanden och analyserar utgående websocket- och HTTP-trafik när spelen startas.",
    },
    {
      n: "3",
      title: "Publicera daterat granskningsintyg",
      desc: "Oavsett om resultatet är bekräftat, saknat eller overifierat publiceras hela granskningsprotokollet med en oföränderlig tidsstämpel som beskriver varje utförd kontroll.",
    },
    {
      n: "4",
      title: "Oberoende verifiering med ett klick",
      desc: "Varje protokoll innehåller råa länkar till registerposten och bevis från nätverksspårningen, så att spelare kan verifiera resultaten på egen hand.",
    },
  ],
  process: {
    title: "Så fungerar det — verifieringsprocessen",
    description:
      "Så granskar Swift Secured casinons licensdata, spårar de ursprungliga spelservrarnas endpoints och publicerar offentliga granskningsprotokoll som inte går att manipulera.",
    eyebrow: "Verifieringsprocess",
    h1: "Så granskas, verifieras och indexeras casinon",
    sub: "Vår tekniska procedur är helt automatiserad och publicerad, vilket ger full reproducerbarhet. Vi hämtar publicerade licens-ID:n, jämför mot officiella myndighetslistor och spårar spelförfrågningar i realtid, utan tillgång till casinot och utan att spelaren behöver registrera sig.",
    ctaHeading: "Driver du ett licensierat onlinecasino?",
    ctaButton: "Ansök om verifierat sigill",
  },
  stages: [
    {
      n: "1",
      title: "Insamling av publika data och endpoints",
      duration: "Skanning av frontend",
      desc: "Vi läser av licenspåståenden, operatörens bolagsuppgifter och sajtens domän-URL:er direkt från sidfoten. Poster som ännu inte kontrollerats markeras uttryckligen som ej kontrollerade tills en fullständig insamling i drift är klar.",
      provide: "Inget krävs av spelare eller operatörer.",
    },
    {
      n: "2",
      title: "Myndighetsregister och serverspårning",
      duration: "Endast offentliga register",
      desc: "Vi söker i officiella myndighetsdatabaser efter listor över godkända domäner. Samtidigt startar vi testsessioner i spelen för att bekräfta att spelmatematiken laddas direkt från leverantörernas CDN (t.ex. Pragmatic, Evolution).",
      provide: "Ingen registrering eller avgift krävs.",
    },
    {
      n: "3",
      title: "Publicering av oberoende status och tidsstämpel",
      duration: "Gratis att läsa",
      desc: 'Resultaten skapas direkt med det exakta verifieringsdatumet. Om en licens inte kan hittas eller domänvalideringen misslyckas anger protokollet öppet "obekräftad" i stället för att dölja resultatet.',
      provide: "Öppen tillgång för alla användare.",
    },
    {
      n: "4",
      title: "Löpande övervakning och omkontroller",
      duration: "Vid varje omkontroll",
      desc: "Register och speldomäner förändras över tid. När en omkontroll görs uppdateras status och datum automatiskt. Tidigare kontrollloggar ligger kvar i arkivet för att förhindra tysta ändringar.",
      provide: "Kontrollera alltid granskningsdatumet på sigillet.",
    },
  ],
  methodology: {
    title: "Teknisk granskningsmetod",
    description:
      "Fullständig verifieringsspecifikation: hur vi kontrollerar myndighetsregister, granskar äkta slotservrar, registrerar datum och drar in sigill när licenser går ut.",
    eyebrow: "Metod och omfattning",
    h1: "Teknisk verifieringsmetod och granskningens gränser",
    sub: "Granskningarna görs utifrån, ur en vanlig spelares perspektiv, utan särskild åtkomst och utan medverkan från operatören. Vi testar publicerade licensnummer, kontrollerar godkända aktiva domäner i officiella register och spårar förfrågningar till slotservrar i realtid. Varje resultat dateras och publiceras.",
    checksTitle: "Verifierade tekniska parametrar",
    limitsTitle: "Granskningens gränser och begränsningar",
    limitsSub:
      "Varje teknisk granskning har strikta gränser. Vi anger uttryckligen vad vi verifierar (licensens giltighet, officiella slotservrar) och vad som inte går att granska utifrån (intern bokföring, enskilda uttagsbeslut).",
    monitoringTitle: "Obligatorisk datumstämpling och övervakning",
    monitoringBody:
      "Myndighetsdatabaser uppdateras hela tiden: licenser går ut, domäner byts ut och certifikat dras in. En kontroll är bara korrekt för det exakta ögonblick då den utfördes. Vi visar kontrolldatumet tydligt. Äldre datum utlöser en ny automatisk granskning. Arkiverade resultat skrivs aldrig över i tysthet.",
    suspensionTitle: "Regler för automatisk indragning av sigill",
    suspensionBody:
      "Om en licens försvinner ur ett register eller en sajt byter till skriptade spelservrar uppdateras sigillets status omedelbart. Klagomål eller anmälningar från konkurrenter ändrar inte status direkt — de utlöser en automatisk omkontroll. Ingen avgift och ingen sponsring kan återställa ett sigill för en ogiltig licens.",
    ctaHeading: "Verifiera alltid ett casino innan du sätter in pengar.",
    ctaButton: "Sök i casinoindexet",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Licens- och registermatchning",
      summary:
        "Bekräftar officiell licensregistrering och verifierar den aktiva speldomänen i myndighetens register.",
      checks: [
        "Licens-ID hämtat direkt från operatörens frontend",
        "Verifierat mot den utfärdande myndighetens officiella databas",
        "Aktiv webbdomän matchad mot listan över godkända domäner",
        "Full transparens om jurisdiktionens villkor",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Granskning av äkta spelservrar",
      summary:
        "Säkerställer att slots körs på leverantörernas äkta CDN och förhindrar förfalskade spel med manipulerad RTP.",
      checks: [
        "Inspektion av nätverksförfrågningar när spelet startar",
        "Verifiering av spelmatematikens endpoints (Pragmatic, Play'n GO, Hacksaw m.fl.)",
        "Upptäckt av proxyservrar och falska slotkopior",
        "Bekräftelse på oförändrade leverantörskonfigurationer",
      ],
    },
    {
      id: "dated-records",
      name: "Datum- och tidsbevis",
      summary:
        "Varje resultat bär en oföränderlig UTC-tidsstämpel som visar exakt när systemet granskade sajten.",
      checks: [
        "Kontrolldatum tydligt utskrivet bredvid verifieringsstatusen",
        "Ej kontrollerade poster tydligt markerade",
        "Synliga historiska kontrollloggar",
        "Omedelbara statusuppdateringar vid ny granskning",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantier för oberoende",
      summary:
        "Noll partiskhet från affiliates, noll betalda statusändringar och noll reklamdrivna placeringar.",
      checks: [
        "Inga affiliatelänkar och inga casinohänvisningar med betalning per klick",
        "Inga betalda betygshöjningar och inga sponsrade sigillplaceringar",
        "Objektiva tekniska resultat framför redaktionella åsikter",
        "Öppen procedur så att spelare kan verifiera själva",
      ],
    },
  ],
  limits: [
    {
      title: "Spelens RTP och slumptalsgeneratorer (RNG)",
      desc: "Att bedöma långsiktig statistisk RTP eller RNG-slumpmässighet kräver intern serveråtkomst och miljontals loggade spinn över miljontals rundor. Vi bekräftar att slots ansluter direkt till leverantörernas officiella servrar (som använder ackrediterade testlabb som iTech Labs eller eCOGRA), men vi utför inga egna oberoende RNG-labbtester.",
    },
    {
      title: "Interna konto- och betalningsrutiner",
      desc: "Granskningarna görs ur en besökares perspektiv. Identitetskontroll av spelare (KYC), kontostängningar, omsättningskrav för bonusar och köer i betalningshanteringen ligger dolda inne i casinots programvara och faller utanför externa tekniska kontroller.",
    },
    {
      title: "Garanterad säkerhet vid uttag",
      desc: "Externa granskningar kan inte inspektera en casinooperatörs privata bankkonton eller likviditetsreserver. En giltig licens och äkta slots bekräftar att regelverket följs och att spelen är äkta, men kan inte garantera betalningsförmåga eller utbetalningstid.",
    },
    {
      title: 'Subjektiva omdömen om "säkra casinon"',
      desc: "En licens är ett tillstånd som gäller under vissa villkor. Kraven skiljer sig kraftigt mellan jurisdiktioner (t.ex. MGA, Curacao, Anjouan). Den 4 augusti 2026 hade 215 av 223 indexerade casinon licenshandlingar från Anjouan. Vi ger rena fakta och serverbevis så att du kan fatta informerade beslut — vi utfärdar aldrig allmänna säkerhetsgarantier.",
    },
  ],
  directory: {
    certified: {
      label: "Licens och slots verifierade",
      desc: "Licensnumret bekräftat i myndighetens register OCH spelservrarna verifierade som leverantörens äkta endpoints på granskningsdatumet.",
    },
    scanned: {
      label: "Obekräftad / saknas i registret",
      desc: "Sökningen gav ingen officiell registerträff för domänen på granskningsdatumet. Operatören kan använda en domän som inte är listad, en licens som inte är indexerad, eller sakna publikt tillstånd.",
    },
    listed: {
      label: "Ej kontrollerad post",
      desc: "Indexerad från publika webbkällor. Automatiserad skanning i bakgrunden och spårning av slotservrar har ännu inte utförts för den här sajten.",
    },
    flagged: {
      label: "Flaggad / avvikelse hittad",
      desc: "Granskningen upptäckte avvikelser: t.ex. domäner som inte stämmer överens, trasiga licenssigill eller omdirigeringar till proxyservrar när sloten startas.",
    },
    statusFilterAll: "Alla statusar",
    lastScanned: "Granskningsdatum",
    viewReport: "Visa fullständig rapport",
  },
  casinos: {
    title: "Katalog över verifierade casinon",
    description:
      "Katalog över onlinecasinon som Swift Secured följer. Kontrollera aktuella licensstatusar, officiella registerposter och resultat från granskningen av spelservrar.",
    eyebrow: "Casinokatalog",
    h1: "Granskningskatalog över onlinecasinon",
    sub: "Sök bland casinon som följs för att se licensstatus i register, utfärdande jurisdiktioner och loggar från verifieringen av spelservrar. Att en post finns med innebär ingen rekommendation.",
    searchPlaceholder: "Sök på casinonamn, domän eller jurisdiktion ...",
    searchLabel: "Sök bland granskade casinon",
    empty: "Inga casinon matchar dina sökvillkor.",
  },
  checker: {
    inputPlaceholder: "Ange casinots namn eller URL (t.ex. Lucky Coin Casino eller luckycoin.cash)",
    inputLabel: "Casinots namn, webbadress eller licensnummer",
    button: "Kontrollera",
    steps: [
      { n: "1", title: "Ange casinots namn eller URL" },
      { n: "2", title: "Vi söker i vårt granskningsindex" },
      { n: "3", title: "Läs licens- och skanningsuppgifterna" },
    ],
    footnote: "{count} casinon i indexet. Vi anger det licensnummer ett casino publicerar, om numret finns i den utfärdande tillsynsmyndighetens eget register, och vilket datum vi sökte.",
    emptyInput: "Skriv först in ett casinonamn, en webbadress eller ett licensnummer.",
    recordEyebrow: "Indexpost",
    jurisdiction: "Jurisdiktion",
    operator: "Licensierat bolag",
    licence: "Licensnummer",
    licenceNone: "Inget publicerat",
    licenceExpiry: "Licensen går ut",
    licenceExpired: "Datumet har passerat. Be casinot om en aktuell licens.",
    licenceMatched: "Hittades i {registry} vid vår sökning {date}",
    licenceSecondhand: "Hämtat från offentliga källor. Ännu inte hittat i något register.",
    scan: "Teknisk skanning",
    scanNone: "Ej utförd ännu",
    noteLabel: "Vad vi noterade",
    viewRecord: "Öppna hela posten",
    multipleTitle: "Fler än ett casino matchar",
    multipleBody: "Välj det du menade.",
    notFoundTitle: "Finns inte i indexet",
    notFoundBody: "Vi har ingen post under det namnet, den adressen eller det licensnumret. Det är ingen anmärkning mot casinot — det betyder bara att vi ännu inte har indexerat det.",
    notFoundBrowse: "Bläddra i indexet",
    notFoundApply: "Be oss kontrollera det",
  },
  verify: {
    title: "Verifiera ett sigills äkthet",
    description:
      "Ange ett Swift Secured sigill-ID för att bekräfta en operatörs aktuella verifieringsstatus och förhindra användning av falska sigill.",
    h1: "Verifiera ett Swift Secured-sigill",
    sub: "Ange det unika sigill-ID:t som visas på ett casinos sajt för att bekräfta att granskningen är giltig och för att granska de underliggande verifieringsspåren.",
    inputPlaceholder: "t.ex. CS-2026-0042",
    inputLabel: "Sigill-ID",
    button: "Verifiera sigill",
    validStatus: "Giltigt och aktivt verifierat sigill",
    operator: "Casinovarumärke / operatör:",
    jurisdiction: "Tillsynsmyndighetens jurisdiktion:",
    lastChecked: "Senaste granskningsdatum:",
    invalidStatus: "Oregistrerat / ogiltigt sigill-ID",
    invalidBody:
      "Det finns inget aktivt verifieringsprotokoll för det här ID:t. Sajten som visar märket kan använda en icke godkänd eller förfalskad sigillbild. Om du misstänker bedrägeri,",
    contactUs: "kontakta vårt team",
  },
  apply: {
    title: "Ansökan om casinocertifiering",
    description:
      "Anmäl ditt casinovarumärke för oberoende granskning av licens och spelservrar. Bygg spelarnas förtroende och öka antalet första insättningar (FTD).",
    eyebrow: "Lösningar för operatörer",
    h1: "Få ditt casino granskat och verifierat",
    sub: "Formulär för casinooperatörer och plattformsägare. Ett verifierat Swift Secured-sigill visar att din licens är giltig och att dina slotservrar är äkta, vilket tar bort friktion för spelaren vid insättningen. Granskningarna är gratis de första 6 månaderna.",
    fieldName: "Casinots varumärkesnamn",
    fieldNamePlaceholder: "Det huvudsakliga varumärkesnamnet mot spelare",
    fieldWebsite: "Aktiv webbdomän",
    fieldJurisdiction: "Licensmyndighet",
    fieldJurisdictionPlaceholder: "t.ex. Anjouan, Curacao GCB, MGA",
    fieldEmail: "E-postadress till företaget",
    fieldMessage: "Ytterligare tekniska noteringar",
    fieldMessagePlaceholder:
      "Licensnummer, direkt valideringslänk eller teknisk kontaktuppgift",
    submit: "Skicka in för granskning",
    successTitle: "Ansökan har skickats",
    successBody:
      "Vårt system och vårt compliance-team går igenom din domän och utför spårningstester av spelservrarna. Du får en statusuppdatering om granskningen på {email} inom 24–48 timmar.",
  },
  pricing: {
    title: "Villkor och priser för verifierat sigill",
    description:
      "Gratis verifieringssigill i 6 månader för onlinecasinon. Inga startavgifter, inget kreditkort, ingen intäktsdelning. Förvandla spelarnas tvivel till insättningar.",
    eyebrow: "Lösningar för operatörer",
    h1: "Förvandla spelarnas skepsis till första insättningar",
    sub: "Nya casinovarumärken förlorar upp till 70 % av möjliga insättare på grund av bristande förtroende. Ett oberoende sigill som inte går att manipulera bekräftar direkt att din licens är aktiv och att spelservrarna är äkta, vilket höjer konverteringen utan krånglig uppstart.",
    billingTitle: "Detaljer om verifieringsprogrammet",
  },
  billingNotes: [
    {
      title: "Gratis granskning och sigill i 6 månader",
      desc: "Få en fullständig granskning och visa det verifierade sigillet gratis i 6 månader från integrationsdatumet. Inga startavgifter, inget kreditkort och inga dolda avtal.",
    },
    {
      title: "Enkelt krav på ömsesidig länk",
      desc: "Allt vi kräver är att sigillet i sidfoten länkar till ditt eget granskningsintyg på vår sajt. Det gör att spelare kan kontrollera de tekniska spåren i realtid. Ingen intäktsdelning och inga hänvisningsavgifter.",
    },
    {
      title: "Transparenta alternativ efter provperioden",
      desc: "Innan din 6-månadersperiod tar slut ger vi dig transparenta prisalternativ för förlängning. Det finns inga automatiska debiteringar och inga påtvingade abonnemang — du behåller full kontroll.",
    },
    {
      title: "Ta bort direkt när du vill",
      desc: "Ta helt enkelt bort sigillets kodsnutt ur sajtens sidfot när som helst för att avsluta integrationen. Dina tidigare kontrollprotokoll ligger kvar i arkivet i vår katalog med fullständiga granskningstidsstämplar.",
    },
  ],
  badge: {
    title: "Format och integration av verifierat sigill",
    description:
      "Utforska Swift Secureds sigilldesigner, visuella format och tekniska riktlinjer för hur spelare verifierar äkta granskningslänkar.",
    eyebrow: "Visuella sigillresurser",
    h1: "Integration av Swift Secured-sigillet och hur verifieringen fungerar",
    sub: "Finns i tre responsiva format, utformade för sidfotsrader och registreringsformulär. Varje äkta sigill fungerar som en direkt kryptografisk länk till den aktuella granskningsrapporten. Statiska bilder utan aktiv länk klarar inte verifieringen.",
    primaryTitle: "Standardsigill",
    primaryBody:
      "Utformat för webbplatsens sidfot bredvid licenssigill. Rent och auktoritativt. Ett klick öppnar casinots aktuella verifieringsrapport med bevis från spelserverspårningen och tidsstämplar för registerkontrollerna.",
    compactTitle: "Kompakt variant på en rad",
    compactBody:
      "Horisontellt format anpassat för rader med betalikoner eller mobila navigeringsfält. Behåller full verifieringsspårning och leder till exakt samma granskningsintyg.",
    darkTitle: "Konturvariant för mörkt tema",
    darkBody:
      "Kontursatt version med hög kontrast för mörka casinogränssnitt. Behåller maximal läsbarhet utan att tumma på den visuella varumärkesidentiteten.",
    ctaHeading: "Redo att visa det verifierade sigillet på din sajt?",
    ctaButton: "Bli certifierad",
  },
  faqPage: {
    title: "Vanliga frågor",
    description:
      "Svar om kontroller i licensregister, upptäckt av skriptade slots, oberoende gentemot operatörer och verifieringskriterier.",
    eyebrow: "FAQ och transparens",
    h1: "Vanliga frågor från spelare och operatörer",
    ctaHeading: "Driver du ett casino? Ansök om granskning på under 2 minuter.",
    ctaButton: "Bli certifierad gratis",
  },
  faqs: [
    {
      q: "Vad garanterar Swift Secured-sigillet för en spelare?",
      a: "Sigillet visar att casinots domän på det angivna granskningsdatumet var aktivt registrerad i officiella myndighetsregister OCH att spelens spinnförfrågningar anslöt direkt till certifierade leverantörsservrar (vilket bekräftar oskriptade originalslots med ursprunglig RTP).",
    },
    {
      q: "Hur upptäcker ni skriptade eller förfalskade slots?",
      a: "Under testet inspekterar vi den utgående nätverkstrafiken när sloten startar. Officiella spel strömmar matematik och grafik direkt från certifierade leverantörsdomäner (t.ex. Pragmatic, Evolution). Om en sajt dirigerar om spinnförfrågningar via okända mellanliggande proxyservrar för att förfalska spelresultat flaggas den som skriptad.",
    },
    {
      q: "Kan ett casino betala för att bli verifierat eller för att ändra granskningsresultat?",
      a: "Betalning har absolut noll påverkan. Verifieringsstatus bestäms automatiskt av registersökningar och tekniska serverspår. Operatörer får visa granskningssigill, men kan inte köpa statusändringar eller radera historiska loggar.",
    },
    {
      q: 'Vad betyder statusen "obekräftad" för ett casino?',
      a: "Obekräftad betyder att vårt system inte hittade någon matchande domänpost i den officiella myndighetsdatabasen på granskningsdatumet. Det kan hända om register ligger nere, om domängodkännanden väntar på behandling eller om operatören använder oregistrerade spegeldomäner. Det är en saklig observation, inte ett rättsligt utlåtande.",
    },
    {
      q: "Kan Swift Secured lösa min uttagstvist med ett casino?",
      a: "Vi hanterar inga spelarkonton och inga betalningar. Vårt granskningsintyg innehåller däremot direktlänkar till den licensmyndighet som anges i protokollet, dit du kan lämna in formella klagomål.",
    },
    {
      q: "Varför ska spelare och operatörer lita på Swift Secured?",
      a: "För att varje påstående går att kontrollera med ett klick. Vi publicerar råa länkar till registersökningarna och spåren till slotarnas nätverksendpoints, så att spelare inte behöver förlita sig på löften eller affiliaterecensioner.",
    },
  ],
  about: {
    title: "Om Swift Secured",
    description:
      "Läs om Swift Secureds uppdrag: transparenta, automatiserade och oberoende granskningar av casinolicenser och spelservrar.",
    eyebrow: "Om oss",
    h1: "Oberoende verifiering byggd på tekniska fakta",
    sub: "Swift Secured utför automatiserade tekniska granskningar av onlinecasinon. Vi verifierar poster i myndighetsregister och granskar anslutningarna till slotservrar, och publicerar resultaten med exakta tidsstämplar. Inga betalda placeringar, inga affiliatelänkar och inga manipulerade resultat.",
    card1Title: "Noll kommersiell partiskhet",
    card1Body:
      "Inget casino kan köpa ett verifierat sigill utan att klara de tekniska kontrollerna. Vi tackar nej till intäktsdelning med affiliates, hänvisningar med betalning per klick och sponsrade betygsplaceringar. Resultaten förblir rent objektiva.",
    card2Title: "Tydlig teknisk avgränsning",
    card2Body:
      "Vi anger öppet vad granskningen omfattar: vi bekräftar officiella licensposter och oskriptade slotendpoints, och vi anger uttryckligen gränserna när det gäller operatörens interna ekonomi eller reglerna för spelarnas omsättning.",
  },
};

export default sv;
