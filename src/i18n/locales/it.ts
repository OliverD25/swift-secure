import type { PartialTranslation } from "../types";

/**
 * it. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const it: PartialTranslation = {
  nav: {
    howItWorks: "Come funziona",
    methodology: "Cosa verifichiamo",
    pricing: "Per i casinò",
    about: "Chi siamo",
    faq: "FAQ",
    casinos: "Indice dei casinò",
    verify: "Controlla un badge",
    apply: "Ottieni la certificazione",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    primaryLabel: "Principale",
  },
  footer: {
    verifySeal: "Verifica un sigillo",
    apply: "Richiedi il sigillo",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Gestisci un casinò online? Aumenta la fiducia dei giocatori e i primi depositi con un audit indipendente.",
    button: "Ottieni la certificazione gratis",
  },
  seal: {
    certified: "Licenza e slot verificate",
  },
  stats: [
    {
      count: "listed",
      label: "Casinò monitorati",
    },
    {
      count: "topJurisdiction",
      label: "Con licenza rilasciata da {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licenze trovate nel registro",
    },
    {
      count: "badged",
      label: "Che oggi mostrano il sigillo verificato",
    },
  ],
  common: {
    certifiedSince: "Record datato",
    viewSealRecord: "Apri il record di audit",
    youProvide: "Cosa serve:",
  },
  home: {
    title:
      "Swift Secured — Verifica indipendente di licenze casinò e server di gioco",
    description:
      "Verifica le licenze dei casinò nei registri ufficiali dei regolatori e individua le slot manipolate prima di depositare. Audit tecnico indipendente con marche temporali pubbliche.",
    badge: "Servizio di audit indipendente. 100% imparziale.",
    h1: "Basta depositare alla cieca: verifica licenza e autenticità dei server di gioco",
    sub: "Controlliamo i casinò online in tempo reale. Tracciamo i server di gioco attivi per confermare che le slot siano originali al 100%, verifichiamo la registrazione attiva della licenza e segnaliamo le copie truffaldine prima che tu rischi il tuo denaro.",
    ctaApply: "Cosa verifichiamo",
    ctaVerify: "Controlla un badge",
    howEyebrow: "Come funziona",
    howTitle:
      "Dalla ricerca nel registro in tempo reale all'audit datato e non alterabile",
    criteriaEyebrow: "Standard di sicurezza",
    criteriaTitle:
      "Cosa verifica il nostro audit — e le regole rigorose che lo governano",
    operatorsEyebrow: "Directory pubblica",
    operatorsTitle:
      "Casinò monitorati nel nostro indice — verificati, non confermati o segnalati",
    viewAllCasinos: "Esplora l'indice dei casinò",
    ctaHeading: "Metodologia tecnica trasparente",
    ctaSub:
      "Scopri esattamente come tracciamo le richieste ai server di gioco, confrontiamo i registri dei regolatori e rileviamo RTP manipolati, senza accettare pagamenti dagli operatori in cambio di recensioni positive.",
    ctaButton: "Leggi la metodologia",
  },
  criteria: [
    {
      title: "Verifica diretta nel registro del regolatore",
      desc: "Centinaia di siti truffa mostrano loghi di licenze falsi nel footer. Noi verifichiamo i numeri di licenza e i domini attivi dei siti direttamente nei database ufficiali dei regolatori.",
    },
    {
      title: "Identità completa del regolatore e regole della giurisdizione",
      desc: "Gli enti di licenza offrono livelli di tutela molto diversi. Ogni record indica il nome esatto del regolatore e l'ID della licenza, così puoi valutare la solidità giuridica che c'è dietro.",
    },
    {
      title: "Data e ora esatte della verifica",
      desc: "Le licenze scadono, vengono sospese o cambiano dominio da un giorno all'altro. Le dichiarazioni statiche non contano nulla: ogni record riporta la data UTC esatta in cui il sistema ha eseguito il controllo.",
    },
    {
      title: "Record di audit non acquistabili e a prova di manomissione",
      desc: "Nessun casinò può pagare per modificare i risultati, nascondere esiti negativi dell'audit o cancellare i log dei record. Lo stato di verifica cambia solo quando cambiano i dati del registro o le tracce dei server.",
    },
    {
      title: "Audit dei server di gioco autentici (anti slot manipolate)",
      desc: "I casinò falsi copiano la grafica dei giochi ma fanno passare la matematica degli spin su server privati con RTP truccato. Ispezioniamo le richieste di rete in tempo reale per accertare che ogni spin si colleghi direttamente ai server ufficiali del provider.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Estrazione dei dati di licenza e dominio",
      desc: "Analizziamo il numero di licenza dichiarato, la società titolare e l'URL di gioco esatto direttamente dal frontend pubblico del casinò esaminato.",
    },
    {
      n: "2",
      title: "Confronto con il registro e tracciamento dei server",
      desc: "Cerchiamo le approvazioni di dominio corrispondenti nel database ufficiale attivo del regolatore che ha rilasciato la licenza e analizziamo i flussi websocket/HTTP in uscita all'avvio dei giochi.",
    },
    {
      n: "3",
      title: "Pubblicazione del certificato di audit datato",
      desc: "Che l'esito sia confermato, mancante o non verificato, il record di audit completo viene pubblicato con una marca temporale immutabile che dettaglia ogni controllo svolto.",
    },
    {
      n: "4",
      title: "Verifica indipendente con un clic",
      desc: "Ogni record fornisce i link diretti al registro di destinazione e le prove delle tracce di rete, così i giocatori possono verificare i risultati in autonomia.",
    },
  ],
  process: {
    title: "Come funziona — il processo di verifica",
    description:
      "Come Swift Secured verifica i dati di licenza dei casinò, traccia gli endpoint dei server di gioco originali e pubblica record di audit pubblici a prova di manomissione.",
    eyebrow: "Processo di verifica",
    h1: "Come i casinò vengono controllati, verificati e indicizzati",
    sub: "La nostra procedura tecnica è interamente automatizzata e pubblicata, quindi completamente riproducibile. Estraiamo gli ID di licenza pubblicati, li confrontiamo con gli elenchi ufficiali dei regolatori e tracciamo le richieste di gioco in tempo reale, senza bisogno di accessi al casinò né di registrazioni dei giocatori.",
    ctaHeading: "Gestisci un casinò online con licenza?",
    ctaButton: "Richiedi il sigillo verificato",
  },
  stages: [
    {
      n: "1",
      title: "Estrazione di dati pubblici ed endpoint",
      duration: "Scansione del frontend",
      desc: "Analizziamo le licenze dichiarate, i dati societari dell'operatore e gli URL del dominio direttamente dai footer dei siti esaminati. Le voci non verificate del tracker sono contrassegnate esplicitamente come non controllate finché non è completata un'estrazione completa in tempo reale.",
      provide: "Non è richiesto nulla a giocatori o operatori.",
    },
    {
      n: "2",
      title: "Registro del regolatore e tracciamento dei server",
      duration: "Solo registri pubblici",
      desc: "Cerchiamo negli elenchi ufficiali dei regolatori i domini approvati. In parallelo avviamo sessioni di gioco di prova per confermare che la matematica del gioco venga caricata direttamente dalle CDN dei provider (ad esempio Pragmatic, Evolution).",
      provide: "Nessuna registrazione né costo.",
    },
    {
      n: "3",
      title: "Pubblicazione indipendente di stato e marca temporale",
      duration: "Consultazione gratuita",
      desc: 'I risultati sono generati subito con la data esatta della verifica. Se una licenza non viene trovata o la convalida del dominio fallisce, il record dichiara in modo trasparente "non confermato" invece di nascondere l\'esito.',
      provide: "Accesso pubblico e aperto a tutti.",
    },
    {
      n: "4",
      title: "Monitoraggio continuo e cicli di ricontrollo",
      duration: "A ogni ricontrollo",
      desc: "I registri e i domini di gioco cambiano nel tempo. Quando avviene un ricontrollo, lo stato e la data si aggiornano automaticamente. I log storici dei controlli restano archiviati per impedire modifiche silenziose.",
      provide: "Controlla sempre la data dell'audit sul badge.",
    },
  ],
  methodology: {
    title: "Metodologia dell'audit tecnico",
    description:
      "Specifica completa della verifica: come controlliamo i registri dei regolatori, verifichiamo i server delle slot originali, registriamo le date e revochiamo i badge quando una licenza scade.",
    eyebrow: "Metodologia e ambito",
    h1: "Metodologia di verifica tecnica e limiti operativi",
    sub: "Gli audit sono svolti dall'esterno, dal punto di vista di un normale giocatore, senza accessi speciali né interventi dell'operatore. Testiamo i numeri di licenza pubblicati, controlliamo le approvazioni dei domini attivi nei registri ufficiali e tracciamo le richieste ai server delle slot in tempo reale. Ogni risultato è datato e pubblicato.",
    checksTitle: "Parametri tecnici verificati",
    limitsTitle: "Confini e limiti dell'audit",
    limitsSub:
      "Ogni audit tecnico ha confini rigorosi. Dichiariamo esplicitamente cosa verifichiamo (validità della licenza, server ufficiali delle slot) e cosa non può essere controllato dall'esterno (contabilità interna, singole decisioni sui prelievi).",
    monitoringTitle: "Datazione obbligatoria e monitoraggio",
    monitoringBody:
      "I database dei regolatori si aggiornano di continuo: le licenze scadono, i domini cambiano, i certificati vengono revocati. Un controllo è accurato solo per il momento esatto in cui è stato eseguito. Mostriamo la data del controllo in evidenza. Le date più vecchie fanno partire un nuovo audit automatico. I risultati archiviati non vengono mai sovrascritti in silenzio.",
    suspensionTitle: "Regole automatiche di revoca del badge",
    suspensionBody:
      "Se una licenza sparisce da un registro o un sito passa a server di gioco manipolati, lo stato del badge si aggiorna immediatamente. Reclami o segnalazioni dei concorrenti non modificano direttamente lo stato: attivano un ricontrollo automatico. Nessun pagamento o sponsorizzazione può ripristinare un badge per una licenza non valida.",
    ctaHeading: "Verifica sempre un casinò prima di depositare.",
    ctaButton: "Cerca nell'indice dei casinò",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Licenza e riscontro nel registro",
      summary:
        "Conferma la registrazione ufficiale della licenza e verifica il dominio di gioco attivo nei record del regolatore.",
      checks: [
        "ID della licenza estratto direttamente dal frontend dell'operatore",
        "Verificato nel database ufficiale del regolatore che l'ha rilasciata",
        "Dominio attivo del sito confrontato con l'elenco approvato",
        "Piena trasparenza sui parametri della giurisdizione",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audit dei server di gioco autentici",
      summary:
        "Accerta che le slot girino su CDN autentiche dei provider, prevenendo giochi contraffatti con RTP manipolato.",
      checks: [
        "Ispezione delle richieste di rete durante l'avvio del gioco",
        "Verifica degli endpoint della matematica di gioco (Pragmatic, Play'n GO, Hacksaw, ecc.)",
        "Rilevamento di server proxy e mirror di slot falsi",
        "Conferma di configurazioni del provider non alterate",
      ],
    },
    {
      id: "dated-records",
      name: "Prova di data e ora",
      summary:
        "Ogni risultato porta una marca temporale UTC immutabile che indica esattamente quando il sistema ha controllato il sito.",
      checks: [
        "Data del controllo stampata chiaramente accanto allo stato di verifica",
        "Voci non controllate identificate esplicitamente",
        "Log storici dei record visibili",
        "Aggiornamento immediato dello stato dopo un nuovo audit",
      ],
    },
    {
      id: "strict-independence",
      name: "Garanzie di indipendenza",
      summary:
        "Zero bias da affiliazione, zero modifiche di stato a pagamento, zero classifiche promozionali.",
      checks: [
        "Nessun link di affiliazione né rimando a casinò a pagamento per clic",
        "Nessun miglioramento del punteggio a pagamento né posizioni del badge sponsorizzate",
        "Risultati tecnici oggettivi al posto di opinioni editoriali",
        "Procedura aperta per la verifica autonoma dei giocatori",
      ],
    },
  ],
  limits: [
    {
      title: "RTP dei giochi e generatori di numeri casuali (RNG)",
      desc: "Valutare l'RTP statistico di lungo periodo o la casualità dell'RNG richiede l'accesso ai server interni e milioni di spin registrati su milioni di round. Confermiamo che le slot si colleghino direttamente ai server ufficiali dei provider (che usano laboratori di test accreditati come iTech Labs o eCOGRA), ma non eseguiamo noi test di laboratorio indipendenti sull'RNG.",
    },
    {
      title: "Procedure interne di conto e pagamento",
      desc: "Gli audit sono svolti dal punto di vista di un visitatore. La verifica dell'identità del giocatore (KYC), le chiusure dei conti, i requisiti di puntata dei bonus e le code di elaborazione dei pagamenti restano privati all'interno del software del casinò e non rientrano nei controlli tecnici esterni.",
    },
    {
      title: "Sicurezza garantita dei prelievi",
      desc: "Un audit esterno non può esaminare i conti bancari privati di un operatore di casinò né le sue riserve di liquidità. Una licenza valida e slot originali confermano la conformità normativa e l'autenticità dei giochi, ma non possono garantire la solvibilità operativa o la rapidità dei pagamenti.",
    },
    {
      title: 'Giudizi soggettivi del tipo "casinò sicuro"',
      desc: "Una licenza è un permesso normativo soggetto a condizioni. I requisiti variano molto tra le giurisdizioni (ad esempio MGA, Curacao, Anjouan). Al 4 agosto 2026, 215 dei 223 casinò indicizzati hanno credenziali di Anjouan. Forniamo fatti grezzi e prove sui server perché tu possa decidere con cognizione di causa: non rilasciamo mai garanzie generiche di sicurezza.",
    },
  ],
  directory: {
    certified: {
      label: "Licenza e slot verificate",
      desc: "Numero di licenza confermato nel registro del regolatore E server di gioco verificati come endpoint autentici del provider alla data dell'audit.",
    },
    scanned: {
      label: "Non confermato / assente dal registro",
      desc: "La ricerca non ha trovato alcuna corrispondenza ufficiale nel registro per il dominio alla data dell'audit. L'operatore potrebbe usare un dominio non elencato, una licenza non indicizzata, oppure operare senza un permesso pubblico.",
    },
    listed: {
      label: "Voce non controllata",
      desc: "Indicizzata da fonti web pubbliche. Per questo sito non sono ancora stati eseguiti la scansione automatica del backend né il tracciamento dei server delle slot.",
    },
    flagged: {
      label: "Segnalato / discrepanza rilevata",
      desc: "L'audit ha rilevato incoerenze: ad esempio domini non corrispondenti, sigilli di licenza non validi o reindirizzamenti a server proxy durante l'avvio delle slot.",
    },
    statusFilterAll: "Tutti gli stati",
    lastScanned: "Data dell'audit",
    viewReport: "Vedi il report completo",
  },
  casinos: {
    title: "Directory dei casinò verificati",
    description:
      "Directory dei casinò online monitorati da Swift Secured. Controlla lo stato aggiornato delle licenze, le voci ufficiali dei regolatori e i risultati degli audit sui server di gioco.",
    eyebrow: "Directory dei casinò",
    h1: "Directory degli audit sui casinò online",
    sub: "Cerca tra i casinò monitorati per vedere lo stato nei registri delle licenze, le giurisdizioni che le hanno rilasciate e i log di verifica dei server di gioco. L'inserimento nell'elenco non implica alcuna approvazione.",
    searchPlaceholder: "Cerca per nome del casinò, dominio o giurisdizione...",
    searchLabel: "Cerca tra i casinò controllati",
    empty: "Nessun casinò corrisponde ai parametri di ricerca.",
  },
  checker: {
    inputPlaceholder: "Nome del casinò o URL (es. Lucky Coin Casino o luckycoin.cash)",
    inputLabel: "Nome del casinò, indirizzo del sito o numero di licenza",
    button: "Controlla",
    steps: [
      { n: "1", title: "Inserisca il nome del casinò o l'URL" },
      { n: "2", title: "Cerchiamo nel nostro indice di audit" },
      { n: "3", title: "Legga la licenza e la scansione" },
    ],
    footnote: "{count} casinò indicizzati. Riportiamo il numero di licenza pubblicato dal casinò, se compare nel registro del regolatore che l'ha rilasciata e la data in cui abbiamo controllato.",
    emptyInput: "Inserisca prima il nome di un casinò, l'indirizzo di un sito o un numero di licenza.",
    recordEyebrow: "Scheda dell'indice",
    jurisdiction: "Giurisdizione",
    operator: "Società licenziataria",
    licence: "Numero di licenza",
    licenceNone: "Nessuno pubblicato",
    licenceExpiry: "Scadenza della licenza",
    licenceExpired: "Questa data è già passata. Chieda al casinò una licenza in corso di validità.",
    licenceMatched: "Trovato nel {registry} al nostro controllo del {date}",
    licenceSecondhand: "Ricavato da fonti pubbliche. Non ancora riscontrato in un registro.",
    scan: "Scansione tecnica",
    scanNone: "Non ancora eseguita",
    noteLabel: "Cosa abbiamo notato",
    viewRecord: "Apri la scheda completa",
    multipleTitle: "Corrisponde più di un casinò",
    multipleBody: "Scelga quello che cercava.",
    notFoundTitle: "Non presente nell'indice",
    notFoundBody: "Non abbiamo alcuna scheda con quel nome, indirizzo o numero di licenza. Non è un rilievo a carico del casinò — significa solo che non lo abbiamo ancora indicizzato.",
    notFoundBrowse: "Sfoglia l'indice",
    notFoundApply: "Ci chieda di controllarlo",
  },
  verify: {
    title: "Verifica l'autenticità del sigillo",
    description:
      "Inserisci un ID sigillo Swift Secured per confermare lo stato di verifica attuale di un operatore ed evitare l'uso di badge falsi.",
    h1: "Verifica un sigillo Swift Secured",
    sub: "Inserisci l'ID sigillo unico mostrato sul sito di un casinò per confermare la validità dell'audit ufficiale ed esaminare le tracce di verifica alla base.",
    inputPlaceholder: "es. CS-2026-0042",
    inputLabel: "ID sigillo",
    button: "Verifica il sigillo",
    validStatus: "Sigillo verificato valido e attivo",
    operator: "Marchio / operatore del casinò:",
    jurisdiction: "Giurisdizione del regolatore:",
    lastChecked: "Data dell'ultimo audit:",
    invalidStatus: "ID sigillo non registrato / non valido",
    invalidBody:
      "Per questo ID non esiste alcun record di verifica attivo. Il sito che mostra questo marchio potrebbe usare un'immagine del badge non autorizzata o contraffatta. Se sospetti una frode,",
    contactUs: "contatta il nostro team",
  },
  apply: {
    title: "Domanda di certificazione per casinò",
    description:
      "Sottoponi il tuo marchio di casinò online a un audit indipendente su licenza e server di gioco. Costruisci la fiducia dei giocatori e aumenta i primi depositi (FTD).",
    eyebrow: "Soluzioni per operatori",
    h1: "Fai controllare e verificare il tuo casinò",
    sub: "Modulo per operatori di casinò e proprietari di piattaforme. Mostrare un sigillo verificato Swift Secured dimostra la validità della tua licenza e l'autenticità dei server delle slot, riducendo l'attrito dei giocatori al momento del deposito. Gli audit sono gratuiti per i primi 6 mesi.",
    fieldName: "Nome del marchio del casinò",
    fieldNamePlaceholder: "Nome del marchio principale visto dai giocatori",
    fieldWebsite: "Dominio attivo del sito",
    fieldJurisdiction: "Regolatore che rilascia la licenza",
    fieldJurisdictionPlaceholder: "es. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Email di contatto aziendale",
    fieldMessage: "Note tecniche aggiuntive",
    fieldMessagePlaceholder:
      "Numero di licenza, URL di convalida diretto o contatto tecnico",
    submit: "Invia per l'audit",
    successTitle: "Domanda inviata con successo",
    successBody:
      "Il nostro sistema e il team compliance esamineranno il tuo dominio ed eseguiranno i test di tracciamento dei server di gioco. Riceverai un aggiornamento sullo stato dell'audit all'indirizzo {email} entro 24–48 ore.",
  },
  pricing: {
    title: "Condizioni e prezzi del sigillo verificato",
    description:
      "Sigillo di verifica gratuito per 6 mesi per i casinò online. Nessun costo di attivazione, nessuna carta di credito, nessuna quota sui ricavi. Trasforma i dubbi dei giocatori in depositi.",
    eyebrow: "Soluzioni per operatori",
    h1: "Trasforma lo scetticismo dei giocatori in primi depositi",
    sub: "I nuovi marchi di casinò perdono fino al 70% dei potenziali depositanti per mancanza di fiducia. Mostrare un sigillo di verifica indipendente e a prova di manomissione conferma subito la licenza attiva e i server di gioco originali, aumentando i tassi di conversione senza attriti in fase di configurazione.",
    billingTitle: "Dettagli del programma di verifica",
  },
  billingNotes: [
    {
      title: "Audit e sigillo gratuiti per 6 mesi",
      desc: "Ricevi un audit completo e mostra il sigillo verificato gratis per 6 mesi dalla data di integrazione. Nessun costo di attivazione, nessuna carta di credito e nessun contratto nascosto.",
    },
    {
      title: "Semplice requisito di link reciproco",
      desc: "Chiediamo solo di collegare il badge nel footer al tuo certificato di audit dedicato sul nostro sito. Così i giocatori possono verificare le tracce tecniche in tempo reale. Nessuna quota sui ricavi né commissioni di referral.",
    },
    {
      title: "Opzioni trasparenti al termine della prova",
      desc: "Prima della fine dei 6 mesi di prova ti proporremo opzioni di rinnovo con prezzi trasparenti. Non ci sono addebiti automatici né abbonamenti forzati: il controllo resta interamente tuo.",
    },
    {
      title: "Rimozione immediata",
      desc: "Per interrompere l'integrazione basta rimuovere in qualsiasi momento il frammento di codice del badge dal footer del tuo sito. I record storici dei controlli restano archiviati nella nostra directory con tutte le marche temporali dell'audit.",
    },
  ],
  badge: {
    title: "Formati del sigillo verificato e integrazione",
    description:
      "Scopri i design del sigillo Swift Secured, i formati grafici del badge e le linee guida tecniche su come i giocatori verificano l'autenticità dei link di audit.",
    eyebrow: "Risorse grafiche del sigillo",
    h1: "Integrazione del badge Swift Secured e comportamento in verifica",
    sub: "Disponibile in tre formati responsive pensati per le strisce del footer e i moduli di registrazione. Ogni badge autentico funziona come link crittografico diretto al report di audit aggiornato. Le immagini statiche senza link attivo non superano la verifica.",
    primaryTitle: "Badge standard",
    primaryBody:
      "Pensato per i footer dei siti, accanto ai sigilli delle licenze. Pulito e autorevole. Il clic apre il report di verifica aggiornato del casinò, con le prove del tracciamento dei server di gioco e le marche temporali dei controlli nel registro.",
    compactTitle: "Variante compatta / su una riga",
    compactBody:
      "Formato orizzontale adatto alle righe delle icone di pagamento o alle barre di navigazione mobile. Mantiene il tracciamento completo della verifica e porta allo stesso identico certificato di audit.",
    darkTitle: "Variante con contorno per tema scuro",
    darkBody:
      "Versione con contorni ad alto contrasto, pensata per le interfacce scure dei casinò. Mantiene la massima leggibilità senza compromettere l'integrità visiva del marchio.",
    ctaHeading: "Pronto a mostrare il sigillo verificato sul tuo sito?",
    ctaButton: "Ottieni la certificazione",
  },
  faqPage: {
    title: "Domande frequenti",
    description:
      "Risposte sui controlli nei registri delle licenze, sul rilevamento delle slot manipolate, sull'indipendenza dagli operatori e sui criteri di verifica.",
    eyebrow: "FAQ e trasparenza",
    h1: "Domande frequenti di giocatori e operatori",
    ctaHeading: "Gestisci un casinò? Richiedi l'audit in meno di 2 minuti.",
    ctaButton: "Ottieni la certificazione gratis",
  },
  faqs: [
    {
      q: "Cosa garantisce al giocatore il badge Swift Secured?",
      a: "Il badge dimostra che, alla data dell'audit indicata, il dominio del casinò era registrato e attivo nei record ufficiali del regolatore E che le richieste di spin si collegavano direttamente ai server certificati dei provider (a conferma di slot originali, non manipolate, con RTP autentico).",
    },
    {
      q: "Come rilevate le slot manipolate o contraffatte?",
      a: "Durante i test ispezioniamo il traffico di rete in uscita all'avvio delle slot. I giochi ufficiali trasmettono matematica e risorse direttamente dai domini certificati dei provider (ad esempio Pragmatic, Evolution). Se un sito devia le richieste di spin attraverso server proxy intermedi sconosciuti per falsare gli esiti del gioco, viene segnalato come manipolato.",
    },
    {
      q: "Un casinò può pagare per essere verificato o per modificare i risultati dell'audit?",
      a: "Nessuna influenza dei pagamenti, in assoluto. Lo stato di verifica è determinato automaticamente dalle interrogazioni ai registri e dalle tracce tecniche dei server. Gli operatori possono mostrare i badge di audit, ma non possono comprare un cambio di stato né cancellare i log storici dei record.",
    },
    {
      q: 'Cosa significa lo stato "non confermato" per un casinò?',
      a: "Non confermato significa che il nostro sistema non ha trovato alcun record di dominio corrispondente nel database ufficiale del regolatore alla data dell'audit. Può succedere se i registri sono offline, se le approvazioni dei domini sono in corso o se l'operatore usa mirror non registrati. È un'osservazione di fatto, non una dichiarazione giuridica.",
    },
    {
      q: "Swift Secured può risolvere la mia controversia su un prelievo con un casinò?",
      a: "Non gestiamo i conti dei giocatori né elaboriamo pagamenti. Il nostro certificato di audit fornisce però i link diretti all'autorità di licenza indicata nel record, dove puoi presentare reclami ufficiali.",
    },
    {
      q: "Perché giocatori e operatori dovrebbero fidarsi di Swift Secured?",
      a: "Perché ogni affermazione è verificabile con un clic. Pubblichiamo le destinazioni grezze delle ricerche nei registri e le tracce degli endpoint di rete delle slot, così i giocatori non devono affidarsi a promesse o a recensioni di affiliati.",
    },
  ],
  about: {
    title: "Chi è Swift Secured",
    description:
      "Scopri la missione di Swift Secured: audit indipendenti, automatizzati e trasparenti su licenze dei casinò e server di gioco.",
    eyebrow: "Chi siamo",
    h1: "Verifica indipendente basata su fatti tecnici",
    sub: "Swift Secured esegue audit tecnici automatizzati sui casinò online. Verifichiamo le voci nei registri dei regolatori e controlliamo le connessioni ai server delle slot, pubblicando i risultati con marche temporali precise. Nessun posizionamento a pagamento, nessun link di affiliazione, nessun risultato alterato.",
    card1Title: "Zero interessi commerciali",
    card1Body:
      "Nessun casinò può comprare un sigillo verificato senza superare i controlli tecnici. Rifiutiamo la condivisione dei ricavi da affiliazione, i rimandi a pagamento per clic e le classifiche sponsorizzate. I risultati restano puramente oggettivi.",
    card2Title: "Perimetro tecnico definito",
    card2Body:
      "Dichiariamo in modo trasparente cosa può fare il nostro audit: confermiamo i record ufficiali delle licenze e gli endpoint delle slot non manipolate, indicando esplicitamente i limiti riguardo alle finanze interne dell'operatore o alle regole di puntata dei giocatori.",
  },
};

export default it;
