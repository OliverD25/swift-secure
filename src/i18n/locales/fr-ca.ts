import type { PartialTranslation } from "../types";

/**
 * fr-ca. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const frCA: PartialTranslation = {
  nav: {
    howItWorks: "Comment ça fonctionne",
    methodology: "Ce que nous vérifions",
    pricing: "Pour les casinos",
    about: "À propos",
    faq: "FAQ",
    casinos: "Répertoire des casinos",
    verify: "Vérifier un badge",
    apply: "Obtenir la certification",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Vérifier un sceau",
    apply: "Demander le sceau",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Vous exploitez un casino en ligne? Renforcez la confiance des joueurs et les premiers dépôts grâce à un audit indépendant.",
    button: "Obtenir la certification gratuitement",
  },
  seal: {
    certified: "Licence et machines à sous vérifiées",
  },
  stats: [
    {
      count: "listed",
      label: "Casinos suivis",
    },
    {
      count: "topJurisdiction",
      label: "Sous licence de {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licences trouvées au registre",
    },
    {
      count: "badged",
      label: "Affichant le sceau vérifié aujourd'hui",
    },
  ],
  common: {
    certifiedSince: "Fiche datée du",
    viewSealRecord: "Ouvrir la fiche d'audit",
    youProvide: "Ce que cela exige :",
  },
  home: {
    title:
      "Swift Secured — Vérification indépendante des casinos et des serveurs de jeu",
    description:
      "Vérifiez les licences de casino dans les registres officiels des organismes de réglementation et détectez les machines à sous scriptées avant de déposer. Audit technique indépendant avec horodatage public.",
    badge: "Service d'audit indépendant. 100 % impartial.",
    h1: "Cessez de déposer à l'aveugle : vérifiez la licence et l'authenticité des serveurs de jeu",
    sub: "Nous auditons les casinos en ligne en temps réel. Nous traçons les serveurs de jeu en direct pour confirmer que les machines à sous sont 100 % originales, nous vérifions que la licence est bien enregistrée et active, et nous signalons les copies frauduleuses avant que vous risquiez votre argent.",
    ctaApply: "Ce que nous vérifions",
    ctaVerify: "Vérifier un badge",
    howEyebrow: "Comment ça fonctionne",
    howTitle:
      "De la recherche en registre en temps réel à une fiche d'audit datée et inaltérable",
    criteriaEyebrow: "Normes de sécurité",
    criteriaTitle:
      "Ce que notre audit vérifie — et les règles strictes qui l'encadrent",
    operatorsEyebrow: "Répertoire public",
    operatorsTitle:
      "Casinos suivis dans notre répertoire — vérifiés, non confirmés ou signalés",
    viewAllCasinos: "Explorer le répertoire des casinos",
    ctaHeading: "Méthodologie technique transparente",
    ctaSub:
      "Découvrez exactement comment nous traçons les requêtes vers les serveurs de jeu, comment nous croisons les registres des organismes de réglementation et comment nous détectons un RTP manipulé, sans accepter de paiement des exploitants pour des évaluations favorables.",
    ctaButton: "Lire la méthodologie",
  },
  criteria: [
    {
      title: "Vérification directe dans le registre du régulateur",
      desc: "Des centaines de sites frauduleux affichent de faux logos de licence dans leur pied de page. Nous vérifions les numéros de licence et les domaines actifs directement dans les bases de données officielles des organismes de réglementation.",
    },
    {
      title: "Identité complète du régulateur et règles de la juridiction",
      desc: "Les organismes de réglementation offrent des niveaux de protection très différents. Chaque fiche indique le nom exact du régulateur et l'identifiant de la licence, pour que vous puissiez juger de la force juridique qui la soutient.",
    },
    {
      title: "Date et heure exactes de la vérification",
      desc: "Une licence peut expirer, être suspendue ou changer de domaine du jour au lendemain. Une affirmation statique ne vaut rien : chaque fiche imprime la date UTC exacte à laquelle le système a fait la recherche.",
    },
    {
      title: "Fiches d'audit inachetables et infalsifiables",
      desc: "Aucun casino ne peut payer pour modifier les résultats, cacher un mauvais audit ou effacer l'historique des fiches. Le statut de vérification change uniquement lorsque les données du registre ou les traces des serveurs changent.",
    },
    {
      title:
        "Audit des serveurs de jeu authentiques (anti-machines à sous scriptées)",
      desc: "Les faux casinos copient les graphismes des jeux, mais font passer le calcul des tours par des serveurs privés au RTP truqué. Nous inspectons les requêtes réseau en direct pour nous assurer que chaque tour se connecte directement aux serveurs officiels du fournisseur.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extraction des données de licence et de domaine",
      desc: "Nous relevons le numéro de licence déclaré, l'entité juridique et l'URL de jeu exacte directement dans l'interface publique du casino visé.",
    },
    {
      n: "2",
      title: "Recoupement avec le registre et traçage des serveurs",
      desc: "Nous cherchons dans la base de données officielle et active du régulateur émetteur les domaines approuvés correspondants, et nous analysons les flux websocket/HTTP sortants au lancement des jeux.",
    },
    {
      n: "3",
      title: "Publication d'un certificat d'audit daté",
      desc: "Que le résultat soit confirmé, absent ou non vérifié, la fiche d'audit complète est publiée avec un horodatage inaltérable qui détaille chaque vérification effectuée.",
    },
    {
      n: "4",
      title: "Vérification indépendante en un clic",
      desc: "Chaque fiche fournit les liens bruts vers le registre visé et les preuves de traçage réseau, ce qui permet aux joueurs de vérifier les résultats par eux-mêmes.",
    },
  ],
  process: {
    title: "Comment ça fonctionne — le processus de vérification",
    description:
      "Comment Swift Secured vérifie les données de licence des casinos, trace les points de terminaison des serveurs de jeu d'origine et publie des fiches d'audit publiques infalsifiables.",
    eyebrow: "Processus de vérification",
    h1: "Comment les casinos sont audités, vérifiés et répertoriés",
    sub: "Notre procédure technique est entièrement automatisée et publiée, ce qui la rend parfaitement reproductible. Nous extrayons les identifiants de licence publiés, nous les croisons avec les listes officielles des organismes de réglementation et nous traçons les requêtes de jeu en direct, sans accès au casino ni inscription du joueur.",
    ctaHeading: "Vous exploitez un casino en ligne sous licence?",
    ctaButton: "Demander le sceau vérifié",
  },
  stages: [
    {
      n: "1",
      title: "Extraction des données publiques et des points de terminaison",
      duration: "Analyse de l'interface publique",
      desc: "Nous relevons les licences déclarées, les renseignements sur la société exploitante et les domaines du site directement dans les pieds de page des sites visés. Les entrées non vérifiées du répertoire sont explicitement marquées comme non vérifiées tant qu'une extraction complète en direct n'a pas été faite.",
      provide: "Rien n'est demandé aux joueurs ni aux exploitants.",
    },
    {
      n: "2",
      title: "Registre du régulateur et traçage des serveurs",
      duration: "Registres publics seulement",
      desc: "Nous cherchons les listes de domaines approuvés dans les bases de données officielles des organismes de réglementation. En parallèle, nous lançons des sessions de jeu d'essai pour confirmer que le calcul du jeu se charge directement depuis les CDN du fournisseur (par exemple Pragmatic, Evolution).",
      provide: "Aucune inscription ni aucuns frais.",
    },
    {
      n: "3",
      title: "Publication indépendante du statut et de l'horodatage",
      duration: "Consultation gratuite",
      desc: "Les résultats sont produits immédiatement, avec la date exacte de la vérification. Si une licence est introuvable ou si la validation du domaine échoue, la fiche indique clairement « non confirmé » au lieu de cacher les résultats.",
      provide: "Accès public ouvert à tous.",
    },
    {
      n: "4",
      title: "Surveillance continue et cycles de revérification",
      duration: "À chaque revérification",
      desc: "Les registres et les domaines de jeu changent avec le temps. Lors d'une revérification, le statut et la date se mettent à jour automatiquement. L'historique des vérifications reste archivé pour empêcher les changements discrets.",
      provide: "Vérifiez toujours la date d'audit sur le badge.",
    },
  ],
  methodology: {
    title: "Méthodologie de l'audit technique",
    description:
      "Spécification complète de la vérification : comment nous consultons les registres des organismes de réglementation, auditons les serveurs de machines à sous d'origine, enregistrons les dates et retirons les badges quand une licence expire.",
    eyebrow: "Méthodologie et portée",
    h1: "Méthodologie de vérification technique et limites d'intervention",
    sub: "Les audits sont réalisés de l'extérieur, du point de vue d'un joueur ordinaire, sans accès particulier ni intervention de l'exploitant. Nous testons les numéros de licence publiés, nous vérifions les domaines actifs approuvés dans les registres officiels et nous traçons les requêtes en direct vers les serveurs de machines à sous. Chaque constat est daté et publié.",
    checksTitle: "Paramètres techniques vérifiés",
    limitsTitle: "Limites et portée de l'audit",
    limitsSub:
      "Tout audit technique a des limites strictes. Nous disons clairement ce que nous vérifions (validité de la licence, serveurs de machines à sous officiels) et ce qui ne peut pas être audité de l'extérieur (comptabilité interne, décisions individuelles de retrait).",
    monitoringTitle: "Horodatage obligatoire et surveillance",
    monitoringBody:
      "Les bases de données des organismes de réglementation changent sans cesse : des licences expirent, des domaines changent, des certificats sont révoqués. Une vérification n'est exacte que pour le moment précis où elle a été faite. Nous affichons la date de vérification bien en vue. Une date ancienne déclenche un nouvel audit automatisé. Les constats archivés ne sont jamais écrasés en silence.",
    suspensionTitle: "Règles de retrait automatique du badge",
    suspensionBody:
      "Si une licence disparaît d'un registre ou si un site passe à des serveurs de jeu scriptés, le statut du badge change immédiatement. Les plaintes ou les signalements de concurrents ne modifient pas le statut directement : ils déclenchent une revérification automatisée. Aucun paiement ni aucune commandite ne peut rétablir un badge pour une licence invalide.",
    ctaHeading: "Vérifiez toujours un casino avant de déposer.",
    ctaButton: "Chercher dans le répertoire des casinos",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Correspondance licence et registre",
      summary:
        "Confirme l'enregistrement officiel de la licence et vérifie le domaine de jeu actif dans les registres du régulateur.",
      checks: [
        "Identifiant de licence extrait directement de l'interface de l'exploitant",
        "Vérifié dans la base de données officielle du régulateur émetteur",
        "Domaine actif recoupé avec la liste des domaines approuvés",
        "Transparence complète sur les paramètres de la juridiction",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audit des serveurs de jeu authentiques",
      summary:
        "Confirme que les machines à sous fonctionnent sur les CDN authentiques des fournisseurs, ce qui écarte les jeux contrefaits au RTP manipulé.",
      checks: [
        "Inspection des requêtes réseau au lancement du jeu",
        "Vérification des points de terminaison du calcul de jeu (Pragmatic, Play'n GO, Hacksaw, etc.)",
        "Détection des serveurs mandataires et des faux miroirs de machines à sous",
        "Confirmation que la configuration du fournisseur n'a pas été modifiée",
      ],
    },
    {
      id: "dated-records",
      name: "Preuve de date et d'heure",
      summary:
        "Chaque constat porte un horodatage UTC inaltérable qui indique exactement quand le système a audité le site.",
      checks: [
        "Date de vérification affichée clairement à côté du statut",
        "Entrées non vérifiées explicitement identifiées",
        "Historique des vérifications visible",
        "Mise à jour immédiate du statut après une nouvelle vérification",
      ],
    },
    {
      id: "strict-independence",
      name: "Garanties d'indépendance",
      summary:
        "Aucun biais d'affiliation, aucune modification de statut payante, aucun classement promotionnel.",
      checks: [
        "Aucun lien d'affiliation ni renvoi de casino au coût par clic",
        "Aucune amélioration de note payante ni position de badge commanditée",
        "Des constats techniques objectifs plutôt que des opinions éditoriales",
        "Procédure ouverte pour que les joueurs vérifient par eux-mêmes",
      ],
    },
  ],
  limits: [
    {
      title: "RTP des jeux et générateurs de nombres aléatoires (RNG)",
      desc: "Évaluer le RTP statistique à long terme ou le caractère aléatoire d'un RNG exige un accès aux serveurs internes et des millions de tours enregistrés sur des millions de parties. Nous confirmons que les machines à sous se connectent directement aux serveurs officiels des fournisseurs (qui font appel à des laboratoires d'essai accrédités comme iTech Labs ou eCOGRA), mais nous ne réalisons pas nous-mêmes de tests de laboratoire indépendants sur les RNG.",
    },
    {
      title: "Procédures internes de compte et de paiement",
      desc: "Les audits sont faits du point de vue d'un visiteur. La vérification de l'identité du joueur (KYC), la fermeture des comptes, les exigences de mise liées aux bonis et les files d'attente de traitement des paiements restent privées dans le logiciel du casino et échappent aux vérifications techniques externes.",
    },
    {
      title: "Sécurité garantie des retraits",
      desc: "Un audit externe ne peut pas examiner les comptes bancaires privés d'un exploitant de casino ni ses réserves de liquidités. Une licence valide et des machines à sous d'origine confirment la conformité réglementaire et l'authenticité des jeux, mais ne peuvent pas garantir la solvabilité de l'entreprise ni la rapidité des paiements.",
    },
    {
      title: "Approbations subjectives du type « casino sécuritaire »",
      desc: "Une licence est un permis réglementaire assorti de conditions. Les exigences varient beaucoup d'une juridiction à l'autre (par exemple MGA, Curacao, Anjouan). Au 4 août 2026, 215 des 223 casinos répertoriés détiennent des titres d'Anjouan. Nous fournissons des faits bruts et des preuves côté serveur pour que vous puissiez décider en connaissance de cause — nous n'émettons jamais de garantie générale de sécurité.",
    },
  ],
  directory: {
    certified: {
      label: "Licence et machines à sous vérifiées",
      desc: "Le numéro de licence a été confirmé dans le registre du régulateur ET les serveurs de jeu ont été vérifiés comme étant les points de terminaison authentiques du fournisseur à la date de l'audit.",
    },
    scanned: {
      label: "Non confirmé / absent du registre",
      desc: "La recherche n'a trouvé aucune correspondance officielle pour le domaine dans le registre à la date de l'audit. L'exploitant utilise peut-être un domaine non inscrit ou une licence non répertoriée, ou il fonctionne sans permis public.",
    },
    listed: {
      label: "Entrée non vérifiée",
      desc: "Répertoriée à partir de sources web publiques. L'analyse automatisée et le traçage des serveurs de machines à sous n'ont pas encore été faits pour ce site.",
    },
    flagged: {
      label: "Signalé / écart constaté",
      desc: "L'audit a relevé des incohérences : domaines qui ne correspondent pas, sceaux de licence brisés ou redirections vers des serveurs mandataires au lancement des machines à sous.",
    },
    statusFilterAll: "Tous les statuts",
    lastScanned: "Date de l'audit",
    viewReport: "Voir le rapport complet",
  },
  casinos: {
    title: "Répertoire des casinos vérifiés",
    description:
      "Répertoire des casinos en ligne suivis par Swift Secured. Consultez le statut des licences en direct, les inscriptions officielles aux registres et les résultats d'audit des serveurs de jeu.",
    eyebrow: "Répertoire des casinos",
    h1: "Répertoire d'audit des casinos en ligne",
    sub: "Cherchez parmi les casinos suivis pour voir le statut au registre des licences, la juridiction émettrice et les journaux de vérification des serveurs de jeu. Une inscription au répertoire n'est pas une recommandation.",
    searchPlaceholder: "Chercher par nom de casino, domaine ou juridiction...",
    searchLabel: "Chercher parmi les casinos audités",
    empty: "Aucun casino ne correspond à votre recherche.",
  },
  checker: {
    inputPlaceholder: "Entrez le nom du casino ou l'URL (ex. : Lucky Coin Casino ou luckycoin.cash)",
    inputLabel: "Nom du casino, adresse du site ou numéro de licence",
    button: "Rechercher",
    steps: [
      { n: "1", title: "Entrez le nom du casino ou l'URL" },
      { n: "2", title: "Nous cherchons dans notre index d'audit" },
      { n: "3", title: "Consultez la licence et l'analyse technique" },
    ],
    footnote: "{count} casinos indexés. Nous indiquons le numéro de licence publié par le casino, s'il figure au registre de l'organisme de réglementation qui a délivré la licence, et la date de notre consultation.",
    emptyInput: "Entrez d'abord un nom de casino, une adresse de site ou un numéro de licence.",
    recordEyebrow: "Fiche de l'index",
    jurisdiction: "Juridiction",
    operator: "Titulaire de la licence",
    licence: "Numéro de licence",
    licenceNone: "Aucun numéro publié",
    licenceExpiry: "Expiration de la licence",
    licenceExpired: "Cette date est passée. Demandez au casino une licence à jour.",
    licenceMatched: "Trouvé dans {registry} lors de notre consultation du {date}",
    licenceSecondhand: "Tiré de sources publiques. Pas encore trouvé dans un registre.",
    scan: "Analyse technique",
    scanNone: "Pas encore effectuée",
    noteLabel: "Nos observations",
    viewRecord: "Ouvrir la fiche complète",
    multipleTitle: "Plus d'un casino correspond",
    multipleBody: "Choisissez celui que vous cherchez.",
    notFoundTitle: "Absent de l'index",
    notFoundBody: "Nous n'avons aucune fiche à ce nom, à cette adresse ou à ce numéro de licence. Ce n'est pas un constat défavorable à l'égard du casino — cela signifie seulement que nous ne l'avons pas encore indexé.",
    notFoundBrowse: "Parcourir l'index",
    notFoundApply: "Nous demander de l'examiner",
  },
  verify: {
    title: "Vérifier l'authenticité d'un sceau",
    description:
      "Entrez un identifiant de sceau Swift Secured pour confirmer le statut de vérification en direct d'un exploitant et écarter les faux badges.",
    h1: "Vérifier un sceau Swift Secured",
    sub: "Entrez l'identifiant unique du sceau affiché sur le site d'un casino pour confirmer la validité de l'audit officiel et consulter les traces de vérification qui le soutiennent.",
    inputPlaceholder: "p. ex. CS-2026-0042",
    inputLabel: "Identifiant du sceau",
    button: "Vérifier le sceau",
    validStatus: "Sceau vérifié valide et actif",
    operator: "Marque de casino / exploitant :",
    jurisdiction: "Juridiction du régulateur :",
    lastChecked: "Date du dernier audit :",
    invalidStatus: "Identifiant de sceau non enregistré ou invalide",
    invalidBody:
      "Aucune fiche de vérification active n'existe pour cet identifiant. Le site qui affiche cette marque utilise peut-être une image de badge non autorisée ou contrefaite. Si vous soupçonnez une fraude,",
    contactUs: "contactez notre équipe",
  },
  apply: {
    title: "Demande de certification pour casino",
    description:
      "Soumettez votre marque de casino en ligne pour un audit indépendant de la licence et des serveurs de jeu. Gagnez la confiance des joueurs et augmentez les premiers dépôts (FTD).",
    eyebrow: "Solutions pour exploitants",
    h1: "Faites auditer et vérifier votre casino",
    sub: "Formulaire pour les exploitants de casino et les propriétaires de plateforme. Afficher un sceau Swift Secured vérifié prouve la validité de votre licence et l'authenticité de vos serveurs de machines à sous, ce qui lève les hésitations du joueur au moment du dépôt. Les audits sont gratuits pendant les 6 premiers mois.",
    fieldName: "Nom de la marque de casino",
    fieldNamePlaceholder: "Nom de marque principal vu par les joueurs",
    fieldWebsite: "Domaine du site actif",
    fieldJurisdiction: "Organisme de réglementation",
    fieldJurisdictionPlaceholder: "p. ex. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Courriel de contact de l'entreprise",
    fieldMessage: "Notes techniques supplémentaires",
    fieldMessagePlaceholder:
      "Numéro de licence, URL de validation directe ou coordonnées techniques",
    submit: "Soumettre pour audit",
    successTitle: "Demande envoyée avec succès",
    successBody:
      "Notre système et notre équipe de conformité examineront votre domaine et effectueront des tests de traçage des serveurs de jeu. Vous recevrez une mise à jour du statut de l'audit à {email} dans les 24 à 48 heures.",
  },
  pricing: {
    title: "Conditions et tarifs du sceau vérifié",
    description:
      "Sceau de vérification gratuit pendant 6 mois pour les casinos en ligne. Aucuns frais d'installation, aucune carte de crédit, aucun partage de revenus. Transformez le doute des joueurs en dépôts.",
    eyebrow: "Solutions pour exploitants",
    h1: "Transformez le scepticisme des joueurs en premiers dépôts",
    sub: "Les nouvelles marques de casino perdent jusqu'à 70 % des déposants potentiels par manque de confiance. Afficher un sceau de vérification indépendant et infalsifiable confirme immédiatement que votre licence est active et que vos serveurs de jeu sont d'origine, ce qui augmente le taux de conversion sans friction d'installation.",
    billingTitle: "Détails du programme de vérification",
  },
  billingNotes: [
    {
      title: "Audit et sceau gratuits pendant 6 mois",
      desc: "Faites-vous auditer et affichez le sceau vérifié gratuitement pendant 6 mois à partir de la date d'intégration. Aucuns frais d'installation, aucune carte de crédit, aucun contrat caché.",
    },
    {
      title: "Une simple exigence de lien réciproque",
      desc: "Nous demandons seulement que le badge du pied de page pointe vers votre certificat d'audit sur notre site. Les joueurs peuvent ainsi vérifier les traces techniques en temps réel. Aucun partage de revenus ni frais de recommandation.",
    },
    {
      title: "Options transparentes après l'essai",
      desc: "Avant la fin de vos 6 mois d'essai, nous vous présenterons des options de renouvellement à prix transparent. Il n'y a aucun prélèvement automatique ni abonnement imposé — vous gardez le contrôle complet.",
    },
    {
      title: "Retrait immédiat",
      desc: "Il suffit de retirer le code du badge du pied de page de votre site, à tout moment, pour mettre fin à l'intégration. L'historique de vos vérifications reste archivé dans notre répertoire, avec tous les horodatages d'audit.",
    },
  ],
  badge: {
    title: "Formats du sceau vérifié et intégration",
    description:
      "Découvrez les designs du sceau Swift Secured, les formats visuels du badge et les consignes techniques sur la façon dont les joueurs vérifient les liens d'audit authentiques.",
    eyebrow: "Éléments visuels du sceau",
    h1: "Intégration du badge Swift Secured et comportement de vérification",
    sub: "Offert en trois formats adaptatifs conçus pour les bandes de pied de page et les formulaires d'inscription. Tout badge authentique fonctionne comme un lien cryptographique direct vers le rapport d'audit en direct. Une image fixe sans lien actif échoue à la vérification.",
    primaryTitle: "Badge standard",
    primaryBody:
      "Conçu pour les pieds de page, à côté des sceaux de licence. Sobre et crédible. Un clic ouvre le rapport de vérification en direct du casino, avec les preuves de traçage des serveurs de jeu et les horodatages des vérifications au registre.",
    compactTitle: "Variante compacte sur une seule ligne",
    compactBody:
      "Format horizontal pensé pour les rangées d'icônes de paiement ou les barres de navigation mobiles. Il conserve tout le suivi de vérification et mène exactement au même certificat d'audit.",
    darkTitle: "Variante à contour pour thème sombre",
    darkBody:
      "Version à contour très contrastée, conçue pour les interfaces de casino en thème sombre. Elle garde une lisibilité maximale sans nuire à l'intégrité visuelle de la marque.",
    ctaHeading: "Prêt à afficher le sceau vérifié sur votre site?",
    ctaButton: "Obtenir la certification",
  },
  faqPage: {
    title: "Foire aux questions",
    description:
      "Réponses sur les vérifications au registre des licences, la détection des machines à sous scriptées, l'indépendance vis-à-vis des exploitants et les critères de vérification.",
    eyebrow: "FAQ et transparence",
    h1: "Questions fréquentes des joueurs et des exploitants",
    ctaHeading:
      "Vous exploitez un casino? Demandez un audit en moins de 2 minutes.",
    ctaButton: "Obtenir la certification gratuitement",
  },
  faqs: [
    {
      q: "Que garantit le badge Swift Secured à un joueur?",
      a: "Le badge prouve qu'à la date d'audit indiquée, le domaine du casino était activement enregistré dans les registres officiels du régulateur ET que les requêtes de tour se connectaient directement aux serveurs certifiés du fournisseur (ce qui confirme des machines à sous d'origine, non scriptées, au RTP d'origine).",
    },
    {
      q: "Comment détectez-vous les machines à sous scriptées ou contrefaites?",
      a: "Pendant les tests, nous inspectons le trafic réseau sortant au lancement des machines à sous. Les jeux officiels diffusent le calcul et les ressources directement depuis les domaines certifiés du fournisseur (par exemple Pragmatic, Evolution). Si un site fait passer les requêtes de tour par des serveurs mandataires intermédiaires inconnus pour fausser les résultats, il est signalé comme scripté.",
    },
    {
      q: "Un casino peut-il payer pour être vérifié ou pour modifier les résultats d'un audit?",
      a: "Aucune influence par l'argent, sans exception. Le statut de vérification est déterminé automatiquement par les recherches au registre et les traces techniques des serveurs. Les exploitants peuvent afficher les badges d'audit, mais ils ne peuvent pas acheter un changement de statut ni supprimer l'historique des fiches.",
    },
    {
      q: "Que signifie le statut « non confirmé » pour un casino?",
      a: "« Non confirmé » signifie que notre système n'a trouvé aucune fiche correspondant au domaine dans la base de données officielle du régulateur à la date de l'audit. Cela peut arriver si un registre est hors service, si l'approbation du domaine est en attente ou si l'exploitant utilise des miroirs non enregistrés. C'est un constat factuel, pas une déclaration juridique.",
    },
    {
      q: "Swift Secured peut-il régler mon litige de retrait avec un casino?",
      a: "Nous ne gérons pas les comptes de joueurs et nous ne traitons pas les paiements. Par contre, notre certificat d'audit fournit des liens directs vers l'autorité de licence officielle nommée dans la fiche, où vous pouvez déposer une plainte réglementaire officielle.",
    },
    {
      q: "Pourquoi les joueurs et les exploitants devraient-ils faire confiance à Swift Secured?",
      a: "Parce que chaque affirmation est vérifiable en un clic. Nous publions les adresses brutes des recherches au registre et les traces des points de terminaison réseau des machines à sous, pour que les joueurs n'aient pas à se fier à des promesses ou à des avis d'affiliés.",
    },
  ],
  about: {
    title: "À propos de Swift Secured",
    description:
      "Découvrez la mission de Swift Secured : offrir des audits indépendants, automatisés et transparents des licences de casino et des serveurs de jeu.",
    eyebrow: "À propos de nous",
    h1: "Une vérification indépendante fondée sur des faits techniques",
    sub: "Swift Secured réalise des audits techniques automatisés pour les casinos en ligne. Nous vérifions les inscriptions aux registres des organismes de réglementation et nous auditons les connexions des serveurs de machines à sous, puis nous publions les constats avec un horodatage précis. Aucun placement payé, aucun lien d'affiliation, aucun résultat trafiqué.",
    card1Title: "Aucun biais commercial",
    card1Body:
      "Aucun casino ne peut acheter un sceau vérifié sans passer les vérifications techniques. Nous refusons le partage de revenus d'affiliation, les renvois au coût par clic et les classements commandités. Les constats restent purement objectifs.",
    card2Title: "Un périmètre technique défini",
    card2Body:
      "Nous énonçons clairement ce que l'audit peut faire : nous confirmons les fiches de licence officielles et les points de terminaison de machines à sous non scriptés, tout en indiquant explicitement nos limites concernant les finances internes de l'exploitant et les règles de mise des joueurs.",
  },
};

export default frCA;
