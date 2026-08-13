import type { PartialTranslation } from "../types";

/**
 * de. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const de: PartialTranslation = {
  nav: {
    howItWorks: "Ablauf",
    methodology: "Was wir prüfen",
    pricing: "Für Casinos",
    about: "Über uns",
    faq: "FAQ",
    casinos: "Casino-Verzeichnis",
    verify: "Badge prüfen",
    apply: "Zertifizierung erhalten",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    primaryLabel: "Hauptnavigation",
  },
  footer: {
    verifySeal: "Siegel prüfen",
    apply: "Siegel beantragen",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Betreiben Sie ein Online-Casino? Stärken Sie das Vertrauen der Spieler und die Ersteinzahlungen mit einer unabhängigen Prüfung.",
    button: "Kostenlos zertifizieren lassen",
  },
  seal: {
    certified: "Lizenz & Slots geprüft",
  },
  stats: [
    {
      count: "listed",
      label: "Erfasste Casinos",
    },
    {
      count: "topJurisdiction",
      label: "Lizenziert unter {regulator}",
    },
    {
      count: "registryMatched",
      label: "Lizenzen im Register bestätigt",
    },
    {
      count: "badged",
      label: "Zeigen heute das geprüfte Siegel",
    },
  ],
  common: {
    certifiedSince: "Eintrag vom",
    viewSealRecord: "Prüfeintrag öffnen",
    youProvide: "Was dafür nötig ist:",
  },
  home: {
    title: "Swift Secured — Unabhängige Prüfung von Casinos und Spielservern",
    description:
      "Prüfen Sie Casino-Lizenzen in den offiziellen Registern der Regulierungsbehörden und erkennen Sie gescriptete Slots, bevor Sie einzahlen. Unabhängige technische Prüfung mit öffentlichen Zeitstempeln.",
    badge: "Unabhängiger Prüfdienst. 100 % unvoreingenommen.",
    h1: "Nicht mehr blind einzahlen: Lizenz und echte Spielserver prüfen",
    sub: "Wir prüfen Online-Casinos in Echtzeit. Wir verfolgen die aktiven Spielserver, um zu bestätigen, dass Slots zu 100 % im Original laufen, prüfen die aktive Lizenzregistrierung und melden betrügerische Nachahmer, bevor Sie Ihr Geld riskieren.",
    ctaApply: "Was wir prüfen",
    ctaVerify: "Badge prüfen",
    howEyebrow: "Ablauf",
    howTitle:
      "Von der Echtzeitsuche im Register zum unveränderlichen, datierten Prüfeintrag",
    criteriaEyebrow: "Sicherheitsstandards",
    criteriaTitle:
      "Was unsere Prüfung bestätigt — und die strengen Regeln dahinter",
    operatorsEyebrow: "Öffentliches Verzeichnis",
    operatorsTitle:
      "Erfasste Casinos in unserem Verzeichnis — geprüft, unbestätigt oder markiert",
    viewAllCasinos: "Casino-Verzeichnis ansehen",
    ctaHeading: "Transparente technische Methodik",
    ctaSub:
      "Erfahren Sie genau, wie wir Anfragen an Spielserver verfolgen, Register der Regulierungsbehörden abgleichen und manipulierten RTP erkennen — ohne Zahlungen von Betreibern für positive Bewertungen anzunehmen.",
    ctaButton: "Methodik lesen",
  },
  criteria: [
    {
      title: "Direkte Prüfung im Register der Regulierungsbehörde",
      desc: "Hunderte Betrugsseiten zeigen gefälschte Lizenzlogos in ihrer Fußzeile. Wir prüfen Lizenznummern und aktive Website-Domains direkt in den offiziellen Datenbanken der Regulierungsbehörden.",
    },
    {
      title:
        "Vollständige Angaben zur Behörde und zu den Regeln der Jurisdiktion",
      desc: "Lizenzbehörden unterscheiden sich stark im Schutzniveau. Jeder Eintrag nennt den genauen Namen der Behörde und die Lizenz-ID, damit Sie die rechtliche Substanz dahinter beurteilen können.",
    },
    {
      title: "Genaues Prüfdatum und Zeitstempel",
      desc: "Lizenzen laufen ab, werden ausgesetzt oder wechseln über Nacht die Domain. Statische Angaben sagen nichts aus — jeder Eintrag nennt das genaue UTC-Datum, an dem das System die Abfrage durchgeführt hat.",
    },
    {
      title: "Unkäufliche und manipulationssichere Prüfeinträge",
      desc: "Kein Casino kann dafür bezahlen, Ergebnisse zu ändern, schlechte Prüfergebnisse zu verbergen oder Protokolle zu löschen. Der Prüfstatus ändert sich nur, wenn sich die Registerdaten oder die Server-Spuren ändern.",
    },
    {
      title: "Prüfung echter Spielserver (gegen gescriptete Slots)",
      desc: "Gefälschte Casinos kopieren die Grafik der Spiele, leiten die Spielmathematik aber über private Server mit manipuliertem RTP. Wir untersuchen die Netzwerkanfragen im laufenden Betrieb, um sicherzustellen, dass jeder Spin direkt mit den offiziellen Servern des Anbieters verbunden ist.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Lizenz- und Domaindaten auslesen",
      desc: "Wir lesen die angegebene Lizenznummer, die Firma und die genaue Spiel-URL direkt aus dem öffentlichen Frontend des jeweiligen Casinos aus.",
    },
    {
      n: "2",
      title: "Abgleich mit dem Register und Server-Spur",
      desc: "Wir durchsuchen die offizielle aktive Datenbank der ausstellenden Behörde nach passenden Domainfreigaben und analysieren die ausgehenden WebSocket-/HTTP-Verbindungen beim Start eines Spiels.",
    },
    {
      n: "3",
      title: "Datiertes Prüfzertifikat veröffentlichen",
      desc: "Ob bestätigt, fehlend oder ungeprüft — der vollständige Prüfeintrag geht mit einem unveränderlichen Zeitstempel online und führt jede durchgeführte Prüfung auf.",
    },
    {
      n: "4",
      title: "Unabhängige Prüfung mit einem Klick",
      desc: "Jeder Eintrag enthält direkte Links zum Register und Belege der Netzwerkspur, damit Spieler die Ergebnisse selbst nachprüfen können.",
    },
  ],
  process: {
    title: "Ablauf — der Prüfprozess",
    description:
      "Wie Swift Secured die Lizenzdaten von Casinos prüft, die originalen Endpunkte der Spielserver verfolgt und manipulationssichere öffentliche Prüfeinträge veröffentlicht.",
    eyebrow: "Prüfprozess",
    h1: "Wie Casinos geprüft, bestätigt und erfasst werden",
    sub: "Unser technisches Verfahren ist vollständig automatisiert und veröffentlicht, sodass es sich vollständig nachvollziehen lässt. Wir lesen die veröffentlichten Lizenz-IDs aus, gleichen sie mit den offiziellen Listen der Behörden ab und verfolgen Spielanfragen im laufenden Betrieb — ohne Zugang zum Casino und ohne Anmeldung eines Spielers.",
    ctaHeading: "Betreiben Sie ein lizenziertes Online-Casino?",
    ctaButton: "Geprüftes Siegel beantragen",
  },
  stages: [
    {
      n: "1",
      title: "Öffentliche Daten und Endpunkte auslesen",
      duration: "Frontend-Scan",
      desc: "Wir lesen Lizenzangaben, Firmendaten des Betreibers und die Domain der Website direkt aus den Fußzeilen der jeweiligen Seite aus. Erfasste Einträge ohne Prüfung werden ausdrücklich als ungeprüft markiert, bis eine vollständige Live-Auslesung abgeschlossen ist.",
      provide: "Von Spielern oder Betreibern ist nichts erforderlich.",
    },
    {
      n: "2",
      title: "Register der Behörde und Server-Spur",
      duration: "Nur öffentliche Register",
      desc: "Wir durchsuchen die offiziellen Datenbanken der Behörden nach freigegebenen Domains. Gleichzeitig starten wir Testspiele, um zu bestätigen, dass die Spielmathematik direkt von den CDNs der Anbieter geladen wird (z. B. Pragmatic, Evolution).",
      provide: "Keine Registrierung und keine Gebühr erforderlich.",
    },
    {
      n: "3",
      title: "Unabhängiger Status mit Zeitstempel veröffentlichen",
      duration: "Kostenlos lesbar",
      desc: 'Die Ergebnisse entstehen sofort und tragen das genaue Prüfdatum. Wird eine Lizenz nicht gefunden oder schlägt die Domainprüfung fehl, weist der Eintrag offen "unbestätigt" aus, statt Ergebnisse zu verbergen.',
      provide: "Offener öffentlicher Zugang für alle.",
    },
    {
      n: "4",
      title: "Laufende Überwachung und erneute Prüfungen",
      duration: "Bei jeder erneuten Prüfung",
      desc: "Register und Spieldomains ändern sich mit der Zeit. Bei einer erneuten Prüfung werden Status und Datum automatisch aktualisiert. Frühere Prüfprotokolle bleiben archiviert, um heimliche Änderungen zu verhindern.",
      provide: "Prüfen Sie immer das Prüfdatum auf dem Badge.",
    },
  ],
  methodology: {
    title: "Technische Prüfmethodik",
    description:
      "Vollständige Spezifikation der Prüfung: wie wir Register der Behörden abfragen, originale Slot-Server prüfen, Daten festhalten und Badges entziehen, wenn Lizenzen ablaufen.",
    eyebrow: "Methodik und Umfang",
    h1: "Technische Prüfmethodik und Grenzen der Arbeit",
    sub: "Die Prüfungen erfolgen von außen, aus der Sicht eines gewöhnlichen Spielers, ohne besonderen Zugang und ohne Mitwirkung des Betreibers. Wir testen die veröffentlichten Lizenznummern, prüfen aktive Domainfreigaben in offiziellen Registern und verfolgen Anfragen an Slot-Server im laufenden Betrieb. Jedes Ergebnis wird datiert und veröffentlicht.",
    checksTitle: "Geprüfte technische Parameter",
    limitsTitle: "Grenzen und Einschränkungen der Prüfung",
    limitsSub:
      "Jede technische Prüfung hat klare Grenzen. Wir sagen ausdrücklich, was wir prüfen (Gültigkeit der Lizenz, offizielle Slot-Server) und was sich von außen nicht prüfen lässt (interne Buchhaltung, einzelne Auszahlungsentscheidungen).",
    monitoringTitle: "Verbindliche Datierung und Überwachung",
    monitoringBody:
      "Die Datenbanken der Behörden ändern sich ständig: Lizenzen laufen ab, Domains wechseln, Zertifikate werden entzogen. Eine Prüfung gilt nur für den genauen Zeitpunkt, an dem sie durchgeführt wurde. Wir zeigen das Prüfdatum deutlich an. Ältere Daten lösen eine neue automatische Prüfung aus. Archivierte Ergebnisse werden nie stillschweigend überschrieben.",
    suspensionTitle: "Regeln für den automatischen Entzug des Badges",
    suspensionBody:
      "Verschwindet eine Lizenz aus einem Register oder wechselt eine Seite zu gescripteten Spielservern, ändert sich der Status des Badges sofort. Beschwerden oder Meldungen von Wettbewerbern ändern den Status nicht direkt — sie lösen eine automatische erneute Prüfung aus. Keine Gebühr und kein Sponsoring kann ein Badge für eine ungültige Lizenz wiederherstellen.",
    ctaHeading: "Prüfen Sie ein Casino immer, bevor Sie einzahlen.",
    ctaButton: "Casino-Verzeichnis durchsuchen",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Lizenz- und Registerabgleich",
      summary:
        "Bestätigt die offizielle Lizenzregistrierung und prüft die aktive Spiel-Domain in den Registern der Behörde.",
      checks: [
        "Lizenz-ID direkt aus dem Frontend des Betreibers ausgelesen",
        "Abgleich mit der offiziellen Datenbank der ausstellenden Behörde",
        "Aktive Website-Domain gegen die Freigabeliste abgeglichen",
        "Volle Transparenz über die Parameter der Jurisdiktion",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Prüfung echter Spielserver",
      summary:
        "Stellt sicher, dass Slots auf den echten CDNs der Anbieter laufen, und verhindert so gefälschte Spiele mit manipuliertem RTP.",
      checks: [
        "Untersuchung der Netzwerkanfragen beim Start des Spiels",
        "Prüfung der Endpunkte der Spielmathematik (Pragmatic, Play'n GO, Hacksaw usw.)",
        "Erkennung von Proxy-Servern und gefälschten Slot-Kopien",
        "Bestätigung unveränderter Anbieterkonfigurationen",
      ],
    },
    {
      id: "dated-records",
      name: "Nachweis von Datum und Uhrzeit",
      summary:
        "Jedes Ergebnis trägt einen unveränderlichen UTC-Zeitstempel, der genau zeigt, wann das System die Seite geprüft hat.",
      checks: [
        "Prüfdatum deutlich neben dem Prüfstatus ausgewiesen",
        "Ungeprüfte Einträge ausdrücklich gekennzeichnet",
        "Sichtbare Protokolle früherer Prüfungen",
        "Sofortige Statusaktualisierung nach erneuter Prüfung",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantien der Unabhängigkeit",
      summary:
        "Keine Affiliate-Verzerrung, keine bezahlten Statusänderungen und keine werblichen Ranglisten.",
      checks: [
        "Keine Affiliate-Links und keine Pay-per-Click-Vermittlung von Casinos",
        "Keine bezahlten Bewertungsverbesserungen und keine gesponserten Badge-Plätze",
        "Objektive technische Ergebnisse statt redaktioneller Meinungen",
        "Offenes Verfahren zur eigenen Nachprüfung durch Spieler",
      ],
    },
  ],
  limits: [
    {
      title: "Spiel-RTP und Zufallsgeneratoren (RNG)",
      desc: "Die Bewertung des langfristigen statistischen RTP oder der Zufälligkeit eines RNG erfordert internen Serverzugang und Millionen protokollierter Spins über Millionen Runden. Wir bestätigen zwar, dass Slots direkt mit den offiziellen Servern der Anbieter verbunden sind (die akkreditierte Prüflabore wie iTech Labs oder eCOGRA nutzen), führen selbst aber keine unabhängigen RNG-Labortests durch.",
    },
    {
      title: "Interne Konto- und Zahlungsabläufe",
      desc: "Die Prüfungen erfolgen aus der Sicht eines Besuchers. Die Identitätsprüfung der Spieler (KYC), Kontoschließungen, Umsatzbedingungen für Boni und die Warteschlangen der Zahlungsabwicklung bleiben in der Casino-Software privat und liegen außerhalb externer technischer Prüfungen.",
    },
    {
      title: "Garantierte Sicherheit der Auszahlung",
      desc: "Externe Prüfungen können weder die privaten Bankkonten eines Casino-Betreibers noch dessen Liquiditätsreserven einsehen. Eine gültige Lizenz und originale Slots belegen die Einhaltung der Regulierung und echte Spiele, können aber weder die Zahlungsfähigkeit noch die Auszahlungsgeschwindigkeit garantieren.",
    },
    {
      title: 'Subjektive Empfehlungen als "sicheres Casino"',
      desc: "Eine Lizenz ist eine behördliche Erlaubnis mit Auflagen. Die Anforderungen unterscheiden sich stark zwischen den Jurisdiktionen (z. B. MGA, Curacao, Anjouan). Stand 4. August 2026 halten 215 von 223 erfassten Casinos eine Zulassung aus Anjouan. Wir liefern reine Fakten und Server-Belege, damit Sie fundiert entscheiden können — pauschale Sicherheitsgarantien geben wir nie.",
    },
  ],
  directory: {
    certified: {
      label: "Lizenz & Slots geprüft",
      desc: "Übereinstimmung der Lizenznummer im Register der Behörde bestätigt UND Spielserver am Prüfdatum als echte Endpunkte des Anbieters bestätigt.",
    },
    scanned: {
      label: "Unbestätigt / kein Registereintrag",
      desc: "Die Suche ergab am Prüfdatum keinen offiziellen Registereintrag für die Domain. Der Betreiber nutzt möglicherweise eine nicht gelistete Domain, eine nicht erfasste Lizenzierung oder arbeitet ohne öffentliche Erlaubnis.",
    },
    listed: {
      label: "Ungeprüfter Eintrag",
      desc: "Aus öffentlichen Webquellen erfasst. Ein automatischer Scan im Hintergrund und die Verfolgung der Slot-Server wurden für diese Seite noch nicht durchgeführt.",
    },
    flagged: {
      label: "Markiert / Abweichung gefunden",
      desc: "Die Prüfung hat Widersprüche festgestellt: z. B. abweichende Domains, defekte Lizenzsiegel oder Weiterleitungen über Proxy-Server beim Start eines Slots.",
    },
    statusFilterAll: "Alle Status",
    lastScanned: "Prüfdatum",
    viewReport: "Vollständigen Bericht ansehen",
  },
  casinos: {
    title: "Verzeichnis geprüfter Casinos",
    description:
      "Verzeichnis der von Swift Secured erfassten Online-Casinos. Prüfen Sie aktuelle Lizenzstatus, offizielle Registereinträge und Ergebnisse der Spielserver-Prüfung.",
    eyebrow: "Casino-Verzeichnis",
    h1: "Prüfverzeichnis für Online-Casinos",
    sub: "Durchsuchen Sie die erfassten Casinos, um Lizenzstatus im Register, ausstellende Jurisdiktionen und Protokolle der Spielserver-Prüfung zu sehen. Ein Eintrag ist keine Empfehlung.",
    searchPlaceholder: "Nach Casinoname, Domain oder Jurisdiktion suchen …",
    searchLabel: "Geprüfte Casinos durchsuchen",
    empty: "Keine Casinos passen zu Ihrer Suche.",
  },
  checker: {
    inputPlaceholder: "Casinoname oder URL eingeben (z. B. Lucky Coin Casino oder luckycoin.cash)",
    inputLabel: "Casinoname, Website-Adresse oder Lizenznummer",
    button: "Prüfen",
    steps: [
      { n: "1", title: "Casinoname oder URL eingeben" },
      { n: "2", title: "Wir durchsuchen unseren Prüfindex" },
      { n: "3", title: "Lizenz- und Scan-Eintrag lesen" },
    ],
    footnote: "{count} Casinos erfasst. Wir dokumentieren, welche Lizenznummer ein Casino veröffentlicht, ob sie im Register der ausstellenden Behörde erscheint und wann wir nachgesehen haben.",
    emptyInput: "Geben Sie zuerst einen Casinonamen, eine Website-Adresse oder eine Lizenznummer ein.",
    recordEyebrow: "Indexeintrag",
    jurisdiction: "Jurisdiktion",
    operator: "Lizenziertes Unternehmen",
    licence: "Lizenznummer",
    licenceNone: "Keine angegeben",
    licenceExpiry: "Lizenz läuft ab",
    licenceExpired: "Dieses Datum ist verstrichen. Fragen Sie das Casino nach einer aktuellen Lizenz.",
    licenceMatched: "Am {date} in {registry} gefunden",
    licenceSecondhand: "Aus öffentlichen Quellen übernommen. Noch nicht mit einem Register abgeglichen.",
    scan: "Technischer Scan",
    scanNone: "Noch nicht durchgeführt",
    noteLabel: "Was uns aufgefallen ist",
    viewRecord: "Vollständigen Eintrag öffnen",
    multipleTitle: "Mehrere Casinos passen zur Suche",
    multipleBody: "Wählen Sie das gesuchte Casino aus.",
    notFoundTitle: "Nicht im Index",
    notFoundBody: "Zu diesem Namen, dieser Adresse oder dieser Lizenznummer liegt uns kein Eintrag vor. Das spricht nicht gegen das Casino — es heißt nur, dass wir es noch nicht erfasst haben.",
    notFoundBrowse: "Index durchsuchen",
    notFoundApply: "Prüfung anfragen",
  },
  verify: {
    title: "Echtheit des Siegels prüfen",
    description:
      "Geben Sie eine Swift Secured Siegel-ID ein, um den aktuellen Prüfstatus eines Betreibers zu bestätigen und die Verwendung gefälschter Badges zu verhindern.",
    h1: "Ein Swift Secured Siegel prüfen",
    sub: "Geben Sie die eindeutige Siegel-ID ein, die auf einer Casino-Website angezeigt wird, um die Gültigkeit der offiziellen Prüfung zu bestätigen und die zugrunde liegenden Prüfspuren einzusehen.",
    inputPlaceholder: "z. B. CS-2026-0042",
    inputLabel: "Siegel-ID",
    button: "Siegel prüfen",
    validStatus: "Gültiges und aktives geprüftes Siegel",
    operator: "Casino-Marke / Betreiber:",
    jurisdiction: "Jurisdiktion der Behörde:",
    lastChecked: "Letztes Prüfdatum:",
    invalidStatus: "Nicht registrierte / ungültige Siegel-ID",
    invalidBody:
      "Für diese ID gibt es keinen aktiven Prüfeintrag. Die Seite, die dieses Zeichen zeigt, verwendet möglicherweise ein nicht freigegebenes oder gefälschtes Badge-Bild. Wenn Sie Betrug vermuten,",
    contactUs: "kontaktieren Sie unser Team",
  },
  apply: {
    title: "Antrag auf Casino-Zertifizierung",
    description:
      "Melden Sie Ihre Online-Casino-Marke für eine unabhängige Prüfung von Lizenz und Spielservern an. Stärken Sie das Vertrauen der Spieler und erhöhen Sie die Zahl der Ersteinzahlungen (FTD).",
    eyebrow: "Lösungen für Betreiber",
    h1: "Lassen Sie Ihr Casino prüfen und bestätigen",
    sub: "Formular für Casino-Betreiber und Plattforminhaber. Ein sichtbares geprüftes Swift Secured Siegel belegt die Gültigkeit Ihrer Lizenz und echte Slot-Server und nimmt Spielern die Hemmung bei der Einzahlung. Die Prüfungen sind in den ersten 6 Monaten kostenlos.",
    fieldName: "Name der Casino-Marke",
    fieldNamePlaceholder: "Hauptmarke, die Spieler sehen",
    fieldWebsite: "Aktive Website-Domain",
    fieldJurisdiction: "Lizenzbehörde",
    fieldJurisdictionPlaceholder: "z. B. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Geschäftliche Kontakt-E-Mail",
    fieldMessage: "Weitere technische Hinweise",
    fieldMessagePlaceholder:
      "Lizenznummer, direkte Prüf-URL oder technischer Ansprechpartner",
    submit: "Zur Prüfung einreichen",
    successTitle: "Antrag erfolgreich eingereicht",
    successBody:
      "Unser System und unser Compliance-Team prüfen Ihre Domain und führen Tests zur Verfolgung der Spielserver durch. Sie erhalten innerhalb von 24–48 Stunden eine Statusmeldung zur Prüfung an {email}.",
  },
  pricing: {
    title: "Bedingungen und Preise für das geprüfte Siegel",
    description:
      "Kostenloses Prüfsiegel für 6 Monate für Online-Casinos. Keine Einrichtungsgebühr, keine Kreditkarte, keine Umsatzbeteiligung. Machen Sie aus Zweifeln der Spieler Einzahlungen.",
    eyebrow: "Lösungen für Betreiber",
    h1: "Aus Skepsis der Spieler werden Ersteinzahlungen",
    sub: "Neue Casino-Marken verlieren bis zu 70 % der möglichen Einzahler, weil Vertrauen fehlt. Ein unabhängiges, manipulationssicheres Prüfsiegel bestätigt sofort Ihre aktive Lizenz und echte Spielserver und erhöht die Conversion-Rate ohne Aufwand bei der Einrichtung.",
    billingTitle: "Details zum Prüfprogramm",
  },
  billingNotes: [
    {
      title: "Kostenlose Prüfung und Siegel für 6 Monate",
      desc: "Lassen Sie sich vollständig prüfen und zeigen Sie das geprüfte Siegel ab dem Tag der Einbindung 6 Monate lang kostenlos. Keine Einrichtungsgebühren, keine Kreditkarte und keine versteckten Verträge.",
    },
    {
      title: "Einfache Anforderung: ein gegenseitiger Link",
      desc: "Wir verlangen nur, dass das Badge in Ihrer Fußzeile auf Ihr eigenes Prüfzertifikat auf unserer Seite verlinkt. So können Spieler die technischen Spuren in Echtzeit nachprüfen. Keine Umsatzbeteiligung und keine Vermittlungsgebühren.",
    },
    {
      title: "Transparente Optionen nach der Testphase",
      desc: "Vor dem Ende Ihrer 6-monatigen Testphase nennen wir Ihnen transparente Preisoptionen für die Verlängerung. Es gibt keine automatischen Abbuchungen und keine erzwungenen Abonnements — Sie behalten die volle Kontrolle.",
    },
    {
      title: "Jederzeit sofort entfernbar",
      desc: "Entfernen Sie den Badge-Code einfach jederzeit aus der Fußzeile Ihrer Seite, um die Einbindung zu beenden. Ihre bisherigen Prüfeinträge bleiben mit vollständigen Zeitstempeln in unserem Verzeichnis archiviert.",
    },
  ],
  badge: {
    title: "Formate und Einbindung des geprüften Siegels",
    description:
      "Sehen Sie sich die Siegel-Designs von Swift Secured, die visuellen Badge-Formate und die technischen Hinweise an, wie Spieler echte Prüf-Links erkennen.",
    eyebrow: "Visuelle Siegel-Assets",
    h1: "Einbindung des Swift Secured Badges und sein Verhalten bei der Prüfung",
    sub: "Verfügbar in drei responsiven Formaten für Fußzeilen und Registrierungsformulare. Jedes echte Badge ist ein direkter kryptografischer Link zum aktuellen Prüfbericht. Statische Bilder ohne aktiven Link bestehen die Prüfung nicht.",
    primaryTitle: "Standard-Badge",
    primaryBody:
      "Für Website-Fußzeilen neben Lizenzsiegeln gestaltet. Klar und seriös. Ein Klick öffnet den aktuellen Prüfbericht des Casinos mit den Belegen der Spielserver-Spur und den Zeitstempeln der Registerprüfung.",
    compactTitle: "Kompakte einzeilige Variante",
    compactBody:
      "Horizontales Format, zugeschnitten auf Reihen von Zahlungssymbolen oder mobile Navigationsleisten. Behält die vollständige Prüfverfolgung und führt zu genau demselben Prüfzertifikat.",
    darkTitle: "Umriss-Variante für dunkle Themes",
    darkBody:
      "Kontrastreiche Umrissversion für dunkle Casino-Oberflächen. Bleibt maximal lesbar, ohne das visuelle Erscheinungsbild der Marke zu stören.",
    ctaHeading: "Bereit, das geprüfte Siegel auf Ihrer Seite zu zeigen?",
    ctaButton: "Zertifizierung erhalten",
  },
  faqPage: {
    title: "Häufige Fragen",
    description:
      "Antworten zu Registerprüfungen von Lizenzen, zur Erkennung gescripteter Slots, zur Unabhängigkeit von Betreibern und zu den Prüfkriterien.",
    eyebrow: "FAQ und Transparenz",
    h1: "Häufige Fragen von Spielern und Betreibern",
    ctaHeading:
      "Betreiben Sie ein Casino? Prüfung in unter 2 Minuten beantragen.",
    ctaButton: "Kostenlos zertifizieren lassen",
  },
  faqs: [
    {
      q: "Was garantiert das Swift Secured Badge einem Spieler?",
      a: "Das Badge belegt, dass am angegebenen Prüfdatum die Domain des Casinos aktiv in den offiziellen Registern der Behörde eingetragen war UND die Spin-Anfragen der Spiele direkt mit zertifizierten Servern der Anbieter verbunden waren (Bestätigung nicht gescripteter Slots mit originalem RTP).",
    },
    {
      q: "Wie erkennen Sie gescriptete oder gefälschte Slots?",
      a: "Beim Test untersuchen wir den ausgehenden Netzwerkverkehr, während ein Slot startet. Offizielle Spiele laden Mathematik und Grafiken direkt von den zertifizierten Domains der Anbieter (z. B. Pragmatic, Evolution). Leitet eine Seite die Spin-Anfragen über unbekannte Zwischen-Proxys um, um Spielergebnisse zu fälschen, wird sie als gescriptet markiert.",
    },
    {
      q: "Kann ein Casino für eine Bestätigung bezahlen oder Prüfergebnisse ändern lassen?",
      a: "Zahlungen haben absolut keinen Einfluss. Der Prüfstatus ergibt sich automatisch aus Registerabfragen und technischen Server-Spuren. Betreiber dürfen Prüf-Badges zeigen, können aber keine Statusänderungen kaufen und keine früheren Protokolle löschen.",
    },
    {
      q: 'Was bedeutet der Status "unbestätigt" für ein Casino?',
      a: "Unbestätigt heißt, dass unser System am Prüfdatum keinen passenden Domaineintrag in der offiziellen Datenbank der Behörde gefunden hat. Das kann passieren, wenn Register offline sind, Domainfreigaben noch ausstehen oder der Betreiber nicht registrierte Spiegelseiten nutzt. Es ist eine sachliche Beobachtung, keine rechtliche Feststellung.",
    },
    {
      q: "Kann Swift Secured meinen Auszahlungsstreit mit einem Casino lösen?",
      a: "Wir verwalten keine Spielerkonten und wickeln keine Zahlungen ab. Unser Prüfzertifikat enthält aber direkte Links zur offiziellen Lizenzbehörde, die im Eintrag genannt ist. Dort können Sie eine offizielle Beschwerde bei der Aufsicht einreichen.",
    },
    {
      q: "Warum sollten Spieler und Betreiber Swift Secured vertrauen?",
      a: "Weil sich jede Aussage mit einem Klick nachprüfen lässt. Wir veröffentlichen die Ziele der Registersuchen im Rohzustand und die Netzwerk-Endpunkte der Slots, damit Spieler sich nicht auf Versprechen oder Affiliate-Bewertungen verlassen müssen.",
    },
  ],
  about: {
    title: "Über Swift Secured",
    description:
      "Erfahren Sie mehr über die Mission von Swift Secured: transparente, automatisierte und unabhängige Prüfungen von Casino-Lizenzen und Spielservern.",
    eyebrow: "Über uns",
    h1: "Unabhängige Prüfung auf Basis technischer Fakten",
    sub: "Swift Secured führt automatisierte technische Prüfungen für Online-Casinos durch. Wir prüfen Einträge in den Registern der Behörden und die Verbindungen der Slot-Server und veröffentlichen die Ergebnisse mit genauen Zeitstempeln. Keine bezahlte Platzierung, keine Affiliate-Links und keine manipulierten Ergebnisse.",
    card1Title: "Keine kommerzielle Verzerrung",
    card1Body:
      "Kein Casino kann ein geprüftes Siegel kaufen, ohne die technischen Prüfungen zu bestehen. Wir lehnen Affiliate-Umsatzbeteiligungen, Pay-per-Click-Vermittlung und gesponserte Ranglisten ab. Die Ergebnisse bleiben rein objektiv.",
    card2Title: "Klar abgegrenzter technischer Rahmen",
    card2Body:
      "Wir benennen unsere Prüfmöglichkeiten transparent: Wir bestätigen offizielle Lizenzeinträge und nicht gescriptete Slot-Endpunkte und nennen ausdrücklich die Grenzen bei internen Finanzen der Betreiber oder bei Regeln für Spielereinsätze.",
  },
};

export default de;
