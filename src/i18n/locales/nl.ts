import type { PartialTranslation } from "../types";

/**
 * nl. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const nl: PartialTranslation = {
  nav: {
    howItWorks: "Hoe het werkt",
    methodology: "Wat we controleren",
    pricing: "Voor casino's",
    about: "Over ons",
    faq: "FAQ",
    casinos: "Casino-index",
    verify: "Badge controleren",
    apply: "Certificering aanvragen",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    primaryLabel: "Primair",
  },
  footer: {
    verifySeal: "Een zegel verifiëren",
    apply: "Zegel aanvragen",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Runt u een online casino? Vergroot het vertrouwen van spelers en het aantal eerste stortingen met een onafhankelijke audit.",
    button: "Gratis certificering",
  },
  seal: {
    certified: "Licentie en slots geverifieerd",
  },
  stats: [
    {
      count: "listed",
      label: "Gevolgde casino's",
    },
    {
      count: "topJurisdiction",
      label: "Gelicentieerd onder {regulator}",
    },
    {
      count: "badged",
      label: "Toont vandaag een geverifieerd zegel",
    },
  ],
  common: {
    certifiedSince: "Record gedateerd",
    viewSealRecord: "Auditrecord openen",
    youProvide: "Wat hiervoor nodig is:",
  },
  home: {
    title:
      "Swift Secured — Onafhankelijke verificatie van casino's en gameservers",
    description:
      "Controleer casinolicenties in de officiële registers van toezichthouders en spoor gescripte slots op voordat u stort. Onafhankelijke technische audit met openbare tijdstempels.",
    badge: "Onafhankelijke auditdienst. 100% onpartijdig.",
    h1: "Stort niet langer blind: controleer licentie en echte gameservers",
    sub: "Wij auditen online casino's in realtime. We traceren live gameservers om te bevestigen dat slots 100% origineel zijn, controleren of de licentie actief geregistreerd is, en markeren frauduleuze kopieën voordat u uw geld riskeert.",
    ctaApply: "Wat we controleren",
    ctaVerify: "Badge controleren",
    howEyebrow: "Hoe het werkt",
    howTitle:
      "Van realtime registerzoekopdracht tot onveranderbaar gedateerd auditrecord",
    criteriaEyebrow: "Veiligheidsnormen",
    criteriaTitle: "Wat onze audit verifieert — en de strikte regels erachter",
    operatorsEyebrow: "Openbare directory",
    operatorsTitle:
      "Gevolgde casino's in onze index — geverifieerd, onbevestigd of gemarkeerd",
    viewAllCasinos: "Casino-index bekijken",
    ctaHeading: "Transparante technische methodologie",
    ctaSub:
      "Lees precies hoe we verzoeken aan gameservers traceren, registers van toezichthouders naast elkaar leggen en gemanipuleerde RTP opsporen, zonder betalingen van operators aan te nemen voor positieve beoordelingen.",
    ctaButton: "Methodologie lezen",
  },
  criteria: [
    {
      title: "Directe verificatie in het register van de toezichthouder",
      desc: "Honderden frauduleuze sites tonen valse licentielogo's in hun footer. Wij controleren licentienummers en actieve websitedomeinen rechtstreeks in de officiële databases van toezichthouders.",
    },
    {
      title:
        "Volledige identiteit van de toezichthouder en regels van het rechtsgebied",
      desc: "Licentieverstrekkers verschillen sterk in het beschermingsniveau dat zij bieden. Elk record vermeldt de exacte naam van de toezichthouder en het licentienummer, zodat u de juridische kracht erachter kunt beoordelen.",
    },
    {
      title: "Exacte verificatiedatum en tijdstempel",
      desc: "Licenties verlopen, worden geschorst of wisselen van domein van de ene dag op de andere. Statische claims zeggen niets — elk record vermeldt de exacte UTC-datum waarop het systeem de opzoeking uitvoerde.",
    },
    {
      title: "Onkoopbare en fraudebestendige auditrecords",
      desc: "Geen enkel casino kan betalen om bevindingen te wijzigen, slechte auditresultaten te verbergen of logboeken te wissen. De verificatiestatus verandert alleen wanneer registergegevens of servertraces veranderen.",
    },
    {
      title: "Audit van echte gameservers (tegen gescripte slots)",
      desc: "Valse casino's kopiëren de graphics van games, maar laten de spinberekening via eigen servers lopen met gemanipuleerde RTP. Wij inspecteren live netwerkverzoeken om te controleren of elke spin rechtstreeks verbinding maakt met de officiële servers van de provider.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Licentie- en domeingegevens uitlezen",
      desc: "We lezen het opgegeven licentienummer, de bedrijfsentiteit en de exacte speel-URL rechtstreeks uit de openbare frontend van het betreffende casino.",
    },
    {
      n: "2",
      title: "Vergelijking met het register en servertrace",
      desc: "We doorzoeken de officiële actieve database van de uitgevende toezichthouder op overeenkomende domeingoedkeuringen en analyseren de uitgaande websocket- en HTTP-stromen wanneer games starten.",
    },
    {
      n: "3",
      title: "Gedateerd auditcertificaat publiceren",
      desc: "Of het resultaat nu bevestigd, ontbrekend of niet-geverifieerd is: het volledige auditrecord gaat live met een onveranderbare tijdstempel die elke uitgevoerde controle beschrijft.",
    },
    {
      n: "4",
      title: "Onafhankelijke verificatie met één klik",
      desc: "Elk record bevat directe links naar het register en bewijs uit de netwerktrace, zodat spelers de bevindingen zelf kunnen controleren.",
    },
  ],
  process: {
    title: "Hoe het werkt — het verificatieproces",
    description:
      "Hoe Swift Secured licentiegegevens van casino's audit, de endpoints van originele gameservers traceert en fraudebestendige openbare auditrecords publiceert.",
    eyebrow: "Verificatieproces",
    h1: "Hoe casino's worden geaudit, geverifieerd en geïndexeerd",
    sub: "Onze technische procedure is volledig geautomatiseerd en gepubliceerd, zodat ze volledig reproduceerbaar is. We lezen gepubliceerde licentienummers uit, leggen die naast de officiële lijsten van toezichthouders en traceren live gameverzoeken, zonder toegang tot het casino of registratie van een speler.",
    ctaHeading: "Runt u een gelicentieerd online casino?",
    ctaButton: "Geverifieerd zegel aanvragen",
  },
  stages: [
    {
      n: "1",
      title: "Uitlezen van openbare gegevens en endpoints",
      duration: "Frontend-scan",
      desc: "We lezen licentieclaims, bedrijfsgegevens van de operator en domein-URL's rechtstreeks uit de footer van de doelsite. Niet-geverifieerde vermeldingen in de tracker worden uitdrukkelijk als ongecontroleerd gemarkeerd totdat een volledige live-uitlezing is afgerond.",
      provide: "Spelers of operators hoeven niets aan te leveren.",
    },
    {
      n: "2",
      title: "Register van de toezichthouder en servertrace",
      duration: "Alleen openbaar register",
      desc: "We doorzoeken de officiële databases van toezichthouders op lijsten met goedgekeurde domeinen. Tegelijk starten we testsessies met games om te bevestigen dat de spelberekening rechtstreeks van de CDN's van de provider komt (bijvoorbeeld Pragmatic, Evolution).",
      provide: "Geen registratie of kosten vereist.",
    },
    {
      n: "3",
      title: "Publicatie van onafhankelijke status en tijdstempel",
      duration: "Gratis te lezen",
      desc: 'Resultaten worden direct gegenereerd met de exacte verificatiedatum. Als een licentie niet gevonden wordt of de domeinvalidatie mislukt, vermeldt het record transparant "onbevestigd" in plaats van bevindingen te verbergen.',
      provide: "Vrij toegankelijk voor alle gebruikers.",
    },
    {
      n: "4",
      title: "Doorlopende monitoring en hercontroles",
      duration: "Bij elke hercontrole",
      desc: "Registers en gamedomeinen veranderen na verloop van tijd. Bij een hercontrole worden de status en de datum automatisch bijgewerkt. Oude controlelogboeken blijven gearchiveerd om stille wijzigingen te voorkomen.",
      provide: "Controleer altijd de auditdatum op de badge.",
    },
  ],
  methodology: {
    title: "Technische auditmethodologie",
    description:
      "Volledige verificatiespecificatie: hoe we registers van toezichthouders controleren, originele slotservers auditen, datums vastleggen en badges intrekken wanneer licenties verlopen.",
    eyebrow: "Methodologie en reikwijdte",
    h1: "Technische verificatiemethodologie en operationele grenzen",
    sub: "Audits worden extern uitgevoerd vanuit het perspectief van een gewone speler, zonder speciale toegang of tussenkomst van de operator. We toetsen gepubliceerde licentienummers, controleren actieve domeingoedkeuringen in officiële registers en traceren live verzoeken aan slotservers. Elke bevinding wordt gedateerd en gepubliceerd.",
    checksTitle: "Geverifieerde technische parameters",
    limitsTitle: "Grenzen en beperkingen van de audit",
    limitsSub:
      "Elke technische audit heeft strikte grenzen. We benoemen uitdrukkelijk wat we verifiëren (geldigheid van de licentie, officiële slotservers) en wat van buitenaf niet te auditen is (interne boekhouding, individuele beslissingen over uitbetalingen).",
    monitoringTitle: "Verplichte datumvermelding en monitoring",
    monitoringBody:
      "Databases van toezichthouders worden voortdurend bijgewerkt: licenties verlopen, domeinen wisselen en certificaten worden ingetrokken. Een controle is alleen juist voor het exacte moment waarop ze is uitgevoerd. We tonen de controledatum duidelijk. Oudere datums leiden tot een nieuwe geautomatiseerde audit. Gearchiveerde bevindingen worden nooit stilzwijgend overschreven.",
    suspensionTitle: "Regels voor automatische intrekking van de badge",
    suspensionBody:
      "Als een licentie uit een register verdwijnt of een site overstapt op gescripte gameservers, wordt de status van de badge onmiddellijk bijgewerkt. Klachten of meldingen van concurrenten wijzigen de status niet rechtstreeks — ze starten een geautomatiseerde hercontrole. Geen enkele betaling of sponsoring kan een badge herstellen voor een ongeldige licentie.",
    ctaHeading: "Controleer een casino altijd voordat u stort.",
    ctaButton: "Casino-index doorzoeken",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Licentie- en registervergelijking",
      summary:
        "Bevestigt de officiële licentieregistratie en verifieert het actieve speeldomein in de records van de toezichthouder.",
      checks: [
        "Licentienummer rechtstreeks uit de frontend van de operator gelezen",
        "Getoetst aan de officiële database van de uitgevende toezichthouder",
        "Actief websitedomein vergeleken met de lijst van goedgekeurde domeinen",
        "Volledige transparantie over de parameters van het rechtsgebied",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audit van echte gameservers",
      summary:
        "Zorgt ervoor dat slots draaien op de echte CDN's van de provider, zodat nagemaakte games met gemanipuleerde RTP worden voorkomen.",
      checks: [
        "Inspectie van netwerkverzoeken tijdens het starten van de game",
        "Verificatie van de endpoints voor de spelberekening (Pragmatic, Play'n GO, Hacksaw, enz.)",
        "Opsporing van proxyservers en valse slotkopieën",
        "Bevestiging van ongewijzigde providerconfiguraties",
      ],
    },
    {
      id: "dated-records",
      name: "Bewijs van datum en tijd",
      summary:
        "Elke bevinding draagt een onveranderbare UTC-tijdstempel die precies aangeeft wanneer het systeem de site heeft geaudit.",
      checks: [
        "Duidelijk vermelde controledatum naast de verificatiestatus",
        "Ongecontroleerde vermeldingen uitdrukkelijk aangeduid",
        "Zichtbare historische controlelogboeken",
        "Directe statusupdates na een nieuwe audit",
      ],
    },
    {
      id: "strict-independence",
      name: "Waarborgen voor onafhankelijkheid",
      summary:
        "Geen affiliate-belangen, geen betaalde statuswijzigingen en geen promotionele ranglijsten.",
      checks: [
        "Geen affiliate-links of pay-per-click-verwijzingen naar casino's",
        "Geen betaalde verhogingen van beoordelingen of gesponsorde badgeposities",
        "Objectieve technische bevindingen in plaats van redactionele meningen",
        "Open procedure zodat spelers zelf kunnen verifiëren",
      ],
    },
  ],
  limits: [
    {
      title: "RTP van games en generatoren van willekeurige getallen (RNG)",
      desc: "Het beoordelen van de statistische RTP op lange termijn of van de willekeurigheid van een RNG vereist toegang tot interne servers en miljoenen vastgelegde spins over miljoenen rondes. Wij bevestigen dat slots rechtstreeks verbinding maken met de officiële servers van de provider (die geaccrediteerde testlabs zoals iTech Labs of eCOGRA gebruiken), maar we voeren zelf geen onafhankelijke RNG-labtests uit.",
    },
    {
      title: "Interne account- en bankprocedures",
      desc: "Audits worden uitgevoerd vanuit het standpunt van een bezoeker. Identiteitscontrole van spelers (KYC), accountsluitingen, inzetvereisten voor bonussen en wachtrijen bij de betaalverwerking blijven privé binnen de casinosoftware en vallen buiten externe technische controles.",
    },
    {
      title: "Gegarandeerde zekerheid van uitbetalingen",
      desc: "Externe audits kunnen de privébankrekeningen of liquiditeitsreserves van een casino-operator niet inzien. Een geldige licentie en originele slots bevestigen naleving van de regelgeving en echte games, maar kunnen geen operationele solvabiliteit of uitbetalingssnelheid garanderen.",
    },
    {
      title: 'Subjectieve aanbevelingen als "veilig casino"',
      desc: "Een licentie is een vergunning van een toezichthouder, met voorwaarden. De eisen verschillen sterk per rechtsgebied (bijvoorbeeld MGA, Curacao, Anjouan). Op 4 augustus 2026 hadden 215 van de 223 geïndexeerde casino's een vergunning uit Anjouan. Wij leveren ruwe feiten en serverbewijs zodat u weloverwogen beslissingen kunt nemen — we geven nooit algemene veiligheidsgaranties.",
    },
  ],
  directory: {
    certified: {
      label: "Licentie en slots geverifieerd",
      desc: "Licentienummer bevestigd in het register van de toezichthouder ÉN gameservers geverifieerd als echte endpoints van de provider op de auditdatum.",
    },
    scanned: {
      label: "Onbevestigd / niet in register",
      desc: "De zoekopdracht leverde op de auditdatum geen officiële registervermelding voor het domein op. De operator gebruikt mogelijk een niet-vermeld domein of een niet-geïndexeerde licentie, of werkt zonder openbare vergunning.",
    },
    listed: {
      label: "Ongecontroleerde vermelding",
      desc: "Geïndexeerd uit openbare bronnen op het web. Voor deze site zijn nog geen geautomatiseerde backend-scan en slotservertrace uitgevoerd.",
    },
    flagged: {
      label: "Gemarkeerd / afwijking gevonden",
      desc: "De audit vond onregelmatigheden: bijvoorbeeld niet-overeenkomende domeinen, defecte licentiezegels of doorverwijzingen via proxyservers bij het starten van slots.",
    },
    statusFilterAll: "Alle statussen",
    lastScanned: "Auditdatum",
    viewReport: "Volledig rapport bekijken",
  },
  casinos: {
    title: "Directory van geverifieerde casino's",
    description:
      "Directory van online casino's die door Swift Secured worden gevolgd. Bekijk actuele licentiestatussen, officiële vermeldingen bij toezichthouders en resultaten van gameserver-audits.",
    eyebrow: "Casinodirectory",
    h1: "Auditdirectory van online casino's",
    sub: "Doorzoek de gevolgde casino's voor licentiestatussen in het register, uitgevende rechtsgebieden en logboeken van de gameserververificatie. Een vermelding betekent geen aanbeveling.",
    searchPlaceholder: "Zoek op casinonaam, domein of rechtsgebied...",
    searchLabel: "Geauditeerde casino's zoeken",
    empty: "Geen casino's komen overeen met uw zoekopdracht.",
  },
  verify: {
    title: "Echtheid van een zegel verifiëren",
    description:
      "Voer een Swift Secured Seal ID in om de actuele verificatiestatus van een operator te bevestigen en het gebruik van valse badges te voorkomen.",
    h1: "Een Swift Secured-zegel verifiëren",
    sub: "Voer de unieke Seal ID in die op een casinosite wordt getoond om de geldigheid van de officiële audit te bevestigen en de onderliggende verificatietraces in te zien.",
    inputPlaceholder: "bijv. CS-2026-0042",
    inputLabel: "Seal ID",
    button: "Zegel verifiëren",
    validStatus: "Geldig en actief geverifieerd zegel",
    operator: "Casinomerk / operator:",
    jurisdiction: "Rechtsgebied van de toezichthouder:",
    lastChecked: "Datum van laatste audit:",
    invalidStatus: "Niet-geregistreerde / ongeldige Seal ID",
    invalidBody:
      "Voor dit ID bestaat geen actief verificatierecord. De site die dit merkteken toont, gebruikt mogelijk een niet-goedgekeurde of vervalste badgeafbeelding. Vermoedt u fraude,",
    contactUs: "neem contact op met ons team",
  },
  apply: {
    title: "Aanvraag voor casinocertificering",
    description:
      "Meld uw online casinomerk aan voor een onafhankelijke audit van licentie en gameservers. Bouw vertrouwen bij spelers op en verhoog het aantal eerste stortingen (FTD).",
    eyebrow: "Oplossingen voor operators",
    h1: "Laat uw casino auditen en verifiëren",
    sub: "Formulier voor casino-operators en platformeigenaren. Een geverifieerd Swift Secured-zegel toont aan dat uw licentie geldig is en uw slotservers echt zijn, waardoor twijfel bij spelers op het moment van storten wegvalt. Audits zijn de eerste 6 maanden gratis.",
    fieldName: "Naam van het casinomerk",
    fieldNamePlaceholder: "Belangrijkste merknaam voor spelers",
    fieldWebsite: "Actief websitedomein",
    fieldJurisdiction: "Licentieverstrekkende toezichthouder",
    fieldJurisdictionPlaceholder: "bijv. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Zakelijk contact-e-mailadres",
    fieldMessage: "Aanvullende technische opmerkingen",
    fieldMessagePlaceholder:
      "Licentienummer, directe validatie-URL of technische contactgegevens",
    submit: "Indienen voor audit",
    successTitle: "Aanvraag succesvol ingediend",
    successBody:
      "Ons systeem en ons complianceteam beoordelen uw domein en voeren tracetests op de gameservers uit. U ontvangt binnen 24–48 uur een statusupdate van de audit op {email}.",
  },
  pricing: {
    title: "Voorwaarden en prijzen van het geverifieerde zegel",
    description:
      "Gratis verificatiezegel van 6 maanden voor online casino's. Geen installatiekosten, geen creditcard nodig, geen omzetdeling. Verander twijfel bij spelers in stortingen.",
    eyebrow: "Oplossingen voor operators",
    h1: "Verander scepsis bij spelers in eerste stortingen",
    sub: "Nieuwe casinomerken verliezen tot 70% van de potentiële storters door een gebrek aan vertrouwen. Een onafhankelijk, fraudebestendig verificatiezegel bevestigt meteen uw actieve licentie en originele gameservers, en verhoogt zo de conversie zonder extra drempels.",
    billingTitle: "Details van het verificatieprogramma",
  },
  billingNotes: [
    {
      title: "Gratis audit en zegel gedurende 6 maanden",
      desc: "Laat u volledig auditen en toon het geverifieerde zegel 6 maanden gratis vanaf de integratiedatum. Geen installatiekosten, geen creditcard en geen verborgen contracten.",
    },
    {
      title: "Eenvoudige eis van een wederzijdse link",
      desc: "Het enige wat we vragen, is dat u de badge in uw footer koppelt aan uw eigen auditcertificaat op onze site. Zo kunnen spelers de technische traces in realtime controleren. Geen omzetdeling of verwijzingsvergoedingen.",
    },
    {
      title: "Transparante opties na de proefperiode",
      desc: "Voordat uw proefperiode van 6 maanden afloopt, geven we transparante prijsopties voor verlenging. Er zijn geen automatische afschrijvingen of gedwongen abonnementen — u houdt volledige controle.",
    },
    {
      title: "Direct verwijderen mogelijk",
      desc: "Verwijder de badgecode op elk moment uit de footer van uw site om de integratie te beëindigen. Uw historische controlerecords blijven gearchiveerd in onze directory, met volledige audittijdstempels.",
    },
  ],
  badge: {
    title: "Formaten en integratie van het geverifieerde zegel",
    description:
      "Bekijk de ontwerpen van het Swift Secured-zegel, de visuele badgeformaten en de technische richtlijnen voor hoe spelers echte auditlinks controleren.",
    eyebrow: "Visuele zegelbestanden",
    h1: "Integratie van de Swift Secured-badge en het verificatiegedrag",
    sub: "Beschikbaar in drie responsieve formaten, ontworpen voor footerbalken en registratieformulieren. Elke echte badge werkt als een directe cryptografische link naar het actuele auditrapport. Statische afbeeldingen zonder actieve link doorstaan de verificatie niet.",
    primaryTitle: "Standaardbadge",
    primaryBody:
      "Ontworpen voor de footer van websites, naast licentiezegels. Strak en gezaghebbend. Een klik opent het actuele verificatierapport van het casino, met bewijs uit de gameservertrace en tijdstempels van de registercontrole.",
    compactTitle: "Compacte variant op één regel",
    compactBody:
      "Horizontaal formaat, afgestemd op rijen met betaalicoontjes of mobiele navigatiebalken. Behoudt de volledige verificatietracking en leidt naar precies hetzelfde auditcertificaat.",
    darkTitle: "Donkere variant met contour",
    darkBody:
      "Contrastrijke versie met contour, gemaakt voor donkere casino-interfaces. Blijft maximaal leesbaar zonder de visuele merkidentiteit aan te tasten.",
    ctaHeading: "Klaar om het geverifieerde zegel op uw site te tonen?",
    ctaButton: "Certificering aanvragen",
  },
  faqPage: {
    title: "Veelgestelde vragen",
    description:
      "Antwoorden over controles in licentieregisters, het opsporen van gescripte slots, onafhankelijkheid van operators en verificatiecriteria.",
    eyebrow: "FAQ en transparantie",
    h1: "Veelgestelde vragen van spelers en operators",
    ctaHeading:
      "Runt u een casino? Vraag in minder dan 2 minuten een audit aan.",
    ctaButton: "Gratis certificering",
  },
  faqs: [
    {
      q: "Wat garandeert de Swift Secured-badge een speler?",
      a: "De badge toont aan dat op de vermelde auditdatum het domein van het casino actief geregistreerd stond in de officiële records van de toezichthouder ÉN dat de spinverzoeken van de games rechtstreeks verbinding maakten met gecertificeerde servers van de provider (wat bevestigt dat het om originele, niet-gescripte slots met de echte RTP gaat).",
    },
    {
      q: "Hoe spoort u gescripte of nagemaakte slots op?",
      a: "Tijdens het testen inspecteren we het uitgaande netwerkverkeer wanneer slots starten. Officiële games streamen de berekening en de bestanden rechtstreeks vanaf gecertificeerde domeinen van providers (bijvoorbeeld Pragmatic, Evolution). Als een site spinverzoeken omleidt via onbekende tussenliggende proxyservers om spelresultaten te vervalsen, wordt die als gescript gemarkeerd.",
    },
    {
      q: "Kan een casino betalen om geverifieerd te worden of om auditbevindingen te wijzigen?",
      a: "Betaling heeft absoluut geen invloed. De verificatiestatus wordt automatisch bepaald door zoekopdrachten in registers en door technische servertraces. Operators mogen auditbadges tonen, maar kunnen geen statuswijzigingen kopen en geen historische logboeken verwijderen.",
    },
    {
      q: 'Wat betekent de status "onbevestigd" voor een casino?',
      a: "Onbevestigd betekent dat ons systeem op de auditdatum geen overeenkomend domeinrecord vond in de officiële database van de toezichthouder. Dat kan gebeuren als registers offline zijn, als domeingoedkeuringen nog lopen, of als de operator niet-geregistreerde spiegelsites gebruikt. Het is een feitelijke vaststelling, geen juridische uitspraak.",
    },
    {
      q: "Kan Swift Secured mijn uitbetalingsgeschil met een casino oplossen?",
      a: "Wij beheren geen spelersaccounts en verwerken geen betalingen. Ons auditcertificaat bevat wel directe links naar de officiële licentieautoriteit die in het record wordt genoemd, waar u een officiële klacht bij de toezichthouder kunt indienen.",
    },
    {
      q: "Waarom zouden spelers en operators Swift Secured vertrouwen?",
      a: "Omdat elke claim met één klik te controleren is. We publiceren de ruwe bestemmingen van de registerzoekopdrachten en de traces van de netwerkendpoints van slots, zodat spelers niet hoeven af te gaan op beloftes of affiliate-reviews.",
    },
  ],
  about: {
    title: "Over Swift Secured",
    description:
      "Lees meer over de missie van Swift Secured: transparante, geautomatiseerde en onafhankelijke audits van casinolicenties en gameservers.",
    eyebrow: "Over ons",
    h1: "Onafhankelijke verificatie op basis van technische feiten",
    sub: "Swift Secured voert geautomatiseerde technische audits uit voor online casino's. We verifiëren vermeldingen in registers van toezichthouders en auditen de verbindingen met slotservers, en publiceren de bevindingen met precieze tijdstempels. Geen betaalde plaatsing, geen affiliate-links en geen aangepaste resultaten.",
    card1Title: "Geen commerciële belangen",
    card1Body:
      "Geen enkel casino kan een geverifieerd zegel kopen zonder de technische controles te doorstaan. We weigeren omzetdeling met affiliates, pay-per-click-verwijzingen en gesponsorde posities in ranglijsten. Bevindingen blijven zuiver objectief.",
    card2Title: "Duidelijk afgebakend technisch werkterrein",
    card2Body:
      "We benoemen transparant wat de audit kan: we bevestigen officiële licentierecords en niet-gescripte slot-endpoints, en geven uitdrukkelijk aan waar de grenzen liggen bij interne financiën van de operator of inzetregels voor spelers.",
  },
};

export default nl;
