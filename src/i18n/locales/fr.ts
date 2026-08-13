import type { PartialTranslation } from "../types";

/**
 * fr. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const fr: PartialTranslation = {
  nav: {
    howItWorks: "Fonctionnement",
    methodology: "Ce que nous vérifions",
    pricing: "Pour les casinos",
    about: "À propos",
    faq: "FAQ",
    casinos: "Index des casinos",
    verify: "Vérifier un badge",
    apply: "Se faire certifier",
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
    note: "Vous exploitez un casino en ligne ? Renforcez la confiance des joueurs et les premiers dépôts avec un audit indépendant.",
    button: "Certification gratuite",
  },
  seal: {
    certified: "Licence et jeux vérifiés",
  },
  stats: [
    {
      count: "listed",
      label: "Casinos suivis",
    },
    {
      count: "topJurisdiction",
      label: "Sous licence {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licences trouvées au registre",
    },
    {
      count: "badged",
      label: "Affichant aujourd'hui le sceau vérifié",
    },
  ],
  common: {
    certifiedSince: "Relevé daté du",
    viewSealRecord: "Ouvrir le relevé d'audit",
    youProvide: "Ce qu'il faut fournir :",
  },
  home: {
    title:
      "Swift Secured — Vérification indépendante des casinos et des serveurs de jeu",
    description:
      "Vérifiez les licences des casinos dans les registres officiels des régulateurs et détectez les machines à sous scriptées avant de déposer. Audit technique indépendant avec horodatages publics.",
    badge: "Service d'audit indépendant. 100 % impartial.",
    h1: "Ne déposez plus à l'aveugle : vérifiez la licence et l'authenticité des serveurs de jeu",
    sub: "Nous auditons les casinos en ligne en temps réel. Nous traçons les serveurs de jeu en direct pour confirmer que les machines à sous sont 100 % originales, nous vérifions l'enregistrement actif de la licence et nous signalons les copies frauduleuses avant que vous ne risquiez votre argent.",
    ctaApply: "Ce que nous vérifions",
    ctaVerify: "Vérifier un badge",
    howEyebrow: "Fonctionnement",
    howTitle:
      "De la recherche en registre en temps réel à un audit daté et inaltérable",
    criteriaEyebrow: "Normes de sécurité",
    criteriaTitle:
      "Ce que notre audit vérifie — et les règles strictes qui l'encadrent",
    operatorsEyebrow: "Répertoire public",
    operatorsTitle:
      "Casinos suivis dans notre index — vérifiés, non confirmés ou signalés",
    viewAllCasinos: "Explorer l'index des casinos",
    ctaHeading: "Méthodologie technique transparente",
    ctaSub:
      "Découvrez exactement comment nous traçons les requêtes vers les serveurs de jeu, recoupons les registres des régulateurs et détectons un RTP manipulé, sans accepter le moindre paiement d'un opérateur pour un avis favorable.",
    ctaButton: "Lire la méthodologie",
  },
  criteria: [
    {
      title: "Vérification directe dans le registre du régulateur",
      desc: "Des centaines de sites frauduleux affichent de faux logos de licence dans leur pied de page. Nous vérifions les numéros de licence et les domaines actifs directement dans les bases de données officielles des régulateurs.",
    },
    {
      title: "Identité complète du régulateur et règles de juridiction",
      desc: "Les organismes de licence offrent des niveaux de protection très différents. Chaque relevé indique le nom exact du régulateur et l'identifiant de licence, pour que vous puissiez juger de la force juridique qui les soutient.",
    },
    {
      title: "Date et horodatage exacts de la vérification",
      desc: "Les licences expirent, sont suspendues ou changent de domaine du jour au lendemain. Une affirmation figée ne vaut rien : chaque relevé imprime la date UTC exacte à laquelle le système a effectué la recherche.",
    },
    {
      title: "Relevés d'audit inachetables et infalsifiables",
      desc: "Aucun casino ne peut payer pour modifier des conclusions, dissimuler de mauvais résultats d'audit ou effacer des journaux. Le statut de vérification ne change que si les données du registre ou les traces serveur changent.",
    },
    {
      title:
        "Audit des serveurs de jeu authentiques (anti machines à sous scriptées)",
      desc: "Les faux casinos copient les graphismes des jeux, mais font passer le calcul des spins par des serveurs privés au RTP truqué. Nous inspectons les requêtes réseau en direct pour nous assurer que chaque spin se connecte directement aux serveurs officiels du fournisseur.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extraction des données de licence et de domaine",
      desc: "Nous relevons le numéro de licence déclaré, l'entité juridique et l'URL de jeu exacte directement dans l'interface publique du casino ciblé.",
    },
    {
      n: "2",
      title: "Recoupement avec le registre et traçage des serveurs",
      desc: "Nous cherchons dans la base de données officielle en vigueur du régulateur émetteur les autorisations de domaine correspondantes, et nous analysons les flux websocket/HTTP sortants au lancement des jeux.",
    },
    {
      n: "3",
      title: "Publication d'un certificat d'audit daté",
      desc: "Qu'il soit confirmé, absent ou non vérifié, le relevé d'audit complet est publié avec un horodatage immuable détaillant chaque contrôle effectué.",
    },
    {
      n: "4",
      title: "Vérification indépendante en un clic",
      desc: "Chaque relevé fournit les liens bruts vers le registre concerné et les preuves de traçage réseau, ce qui permet aux joueurs de vérifier les conclusions par eux-mêmes.",
    },
  ],
  process: {
    title: "Fonctionnement — le processus de vérification",
    description:
      "Comment Swift Secured audite les données de licence d'un casino, trace les points d'accès des serveurs de jeu d'origine et publie des relevés d'audit publics infalsifiables.",
    eyebrow: "Processus de vérification",
    h1: "Comment les casinos sont audités, vérifiés et indexés",
    sub: "Notre procédure technique est entièrement automatisée et publiée, ce qui la rend totalement reproductible. Nous extrayons les identifiants de licence publiés, recoupons les listes officielles des régulateurs et traçons les requêtes de jeu en direct, sans accès au casino ni inscription du joueur.",
    ctaHeading: "Vous exploitez un casino en ligne sous licence ?",
    ctaButton: "Demander le sceau vérifié",
  },
  stages: [
    {
      n: "1",
      title: "Extraction des données publiques et des points d'accès",
      duration: "Analyse de l'interface publique",
      desc: "Nous relevons les licences déclarées, les informations juridiques de l'opérateur et les URL du domaine directement dans les pieds de page des sites ciblés. Les entrées non vérifiées du suivi sont explicitement marquées comme non contrôlées tant qu'une extraction complète en direct n'a pas eu lieu.",
      provide: "Rien n'est demandé aux joueurs ni aux opérateurs.",
    },
    {
      n: "2",
      title: "Registre du régulateur et traçage des serveurs",
      duration: "Registres publics uniquement",
      desc: "Nous cherchons dans les bases de données officielles des régulateurs les listes de domaines approuvés. En parallèle, nous lançons des sessions de jeu de test pour confirmer que le calcul du jeu se charge directement depuis les CDN des fournisseurs (par exemple Pragmatic, Evolution).",
      provide: "Aucune inscription ni aucun frais.",
    },
    {
      n: "3",
      title: "Publication indépendante du statut et de l'horodatage",
      duration: "Consultation gratuite",
      desc: "Les résultats sont générés immédiatement, avec la date exacte de la vérification. Si une licence est introuvable ou si la validation du domaine échoue, le relevé indique clairement « non confirmé » au lieu de masquer les conclusions.",
      provide: "Accès public ouvert à tous.",
    },
    {
      n: "4",
      title: "Surveillance continue et cycles de nouveaux contrôles",
      duration: "À chaque nouveau contrôle",
      desc: "Les registres et les domaines de jeu changent avec le temps. Lorsqu'un nouveau contrôle a lieu, le statut et la date sont mis à jour automatiquement. Les journaux des contrôles passés restent archivés pour empêcher toute modification discrète.",
      provide: "Vérifiez toujours la date d'audit sur le badge.",
    },
  ],
  methodology: {
    title: "Méthodologie de l'audit technique",
    description:
      "Spécification complète de la vérification : comment nous contrôlons les registres des régulateurs, auditons les serveurs de machines à sous d'origine, enregistrons les dates et retirons les badges lorsqu'une licence expire.",
    eyebrow: "Méthodologie et périmètre",
    h1: "Méthodologie de vérification technique et limites opérationnelles",
    sub: "Les audits sont réalisés de l'extérieur, du point de vue d'un joueur ordinaire, sans accès particulier ni intervention de l'opérateur. Nous testons les numéros de licence publiés, contrôlons les autorisations de domaine actives dans les registres officiels et traçons les requêtes en direct vers les serveurs de machines à sous. Chaque conclusion est datée et publiée.",
    checksTitle: "Paramètres techniques vérifiés",
    limitsTitle: "Périmètre et limites de l'audit",
    limitsSub:
      "Tout audit technique a des limites strictes. Nous indiquons explicitement ce que nous vérifions (validité de la licence, serveurs de jeu officiels) et ce qui ne peut pas être audité de l'extérieur (comptabilité interne, décisions individuelles de retrait).",
    monitoringTitle: "Horodatage obligatoire et surveillance",
    monitoringBody:
      "Les bases de données des régulateurs changent en permanence : des licences expirent, des domaines changent, des certificats sont révoqués. Un contrôle n'est exact que pour l'instant précis où il a été effectué. Nous affichons la date du contrôle bien en évidence. Une date ancienne déclenche un nouvel audit automatisé. Les conclusions archivées ne sont jamais écrasées en silence.",
    suspensionTitle: "Règles de retrait automatique du badge",
    suspensionBody:
      "Si une licence disparaît d'un registre ou si un site bascule vers des serveurs de jeu scriptés, le statut du badge est mis à jour immédiatement. Les plaintes ou les signalements de concurrents ne modifient pas directement le statut : ils déclenchent un nouveau contrôle automatisé. Aucun paiement ni parrainage ne peut rétablir un badge pour une licence invalide.",
    ctaHeading: "Vérifiez toujours un casino avant de déposer.",
    ctaButton: "Rechercher dans l'index des casinos",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Licence et correspondance au registre",
      summary:
        "Confirme l'enregistrement officiel de la licence et vérifie le domaine de jeu actif dans les relevés du régulateur.",
      checks: [
        "Identifiant de licence extrait directement de l'interface de l'opérateur",
        "Vérifié dans la base de données officielle du régulateur émetteur",
        "Domaine actif du site recoupé avec la liste des domaines approuvés",
        "Transparence totale sur les paramètres de la juridiction",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audit des serveurs de jeu authentiques",
      summary:
        "S'assure que les machines à sous tournent sur les CDN authentiques des fournisseurs, ce qui écarte les jeux contrefaits au RTP manipulé.",
      checks: [
        "Inspection des requêtes réseau pendant l'initialisation du jeu",
        "Vérification des points d'accès de calcul du jeu (Pragmatic, Play'n GO, Hacksaw, etc.)",
        "Détection des serveurs proxy et des faux miroirs de machines à sous",
        "Confirmation de configurations fournisseur non modifiées",
      ],
    },
    {
      id: "dated-records",
      name: "Preuve de date et d'heure",
      summary:
        "Chaque conclusion porte un horodatage UTC immuable indiquant exactement quand le système a audité le site.",
      checks: [
        "Date du contrôle imprimée clairement à côté du statut de vérification",
        "Entrées non contrôlées explicitement identifiées",
        "Journaux d'historique visibles",
        "Mise à jour immédiate du statut après un nouvel audit",
      ],
    },
    {
      id: "strict-independence",
      name: "Garanties d'indépendance",
      summary:
        "Aucun biais d'affiliation, aucune modification de statut payante, aucun classement promotionnel.",
      checks: [
        "Aucun lien d'affiliation ni renvoi payant vers un casino",
        "Aucune amélioration de note payante ni position de badge sponsorisée",
        "Des conclusions techniques objectives plutôt que des avis rédactionnels",
        "Procédure ouverte permettant au joueur de vérifier lui-même",
      ],
    },
  ],
  limits: [
    {
      title: "RTP des jeux et générateurs de nombres aléatoires (RNG)",
      desc: "Évaluer le RTP statistique à long terme ou le caractère aléatoire d'un RNG exige un accès aux serveurs internes et des millions de spins enregistrés sur des millions de tours. Nous confirmons que les machines à sous se connectent directement aux serveurs officiels des fournisseurs (qui font appel à des laboratoires de test accrédités comme iTech Labs ou eCOGRA), mais nous ne réalisons pas nous-mêmes de tests RNG indépendants en laboratoire.",
    },
    {
      title: "Procédures internes de compte et de paiement",
      desc: "Les audits sont réalisés du point de vue d'un visiteur. La vérification d'identité des joueurs (KYC), la fermeture des comptes, les conditions de mise des bonus et les files d'attente de traitement des paiements restent internes au logiciel du casino et échappent aux contrôles techniques externes.",
    },
    {
      title: "Sécurité garantie des retraits",
      desc: "Un audit externe ne peut pas inspecter les comptes bancaires privés d'un opérateur de casino ni ses réserves de liquidités. Une licence valide et des machines à sous d'origine confirment la conformité réglementaire et l'authenticité des jeux, mais ne peuvent pas garantir la solvabilité de l'exploitation ni la rapidité des paiements.",
    },
    {
      title: "Labels subjectifs de « casino sûr »",
      desc: "Une licence est une autorisation réglementaire soumise à conditions. Les exigences varient fortement d'une juridiction à l'autre (par exemple MGA, Curacao, Anjouan). Au 4 août 2026, 215 des 223 casinos indexés détiennent des titres d'Anjouan. Nous fournissons des faits bruts et des preuves serveur pour que vous puissiez décider en connaissance de cause — nous n'émettons jamais de garanties de sécurité générales.",
    },
  ],
  directory: {
    certified: {
      label: "Licence et jeux vérifiés",
      desc: "Correspondance du numéro de licence confirmée dans le registre du régulateur ET serveurs de jeu vérifiés comme étant des points d'accès authentiques du fournisseur à la date de l'audit.",
    },
    scanned: {
      label: "Non confirmé / absent du registre",
      desc: "La recherche n'a renvoyé aucune correspondance officielle au registre pour ce domaine à la date de l'audit. L'opérateur utilise peut-être un domaine non listé, une licence non indexée, ou il exerce sans autorisation publique.",
    },
    listed: {
      label: "Entrée non contrôlée",
      desc: "Indexée à partir de sources web publiques. L'analyse automatisée en arrière-plan et le traçage des serveurs de jeu n'ont pas encore été effectués pour ce site.",
    },
    flagged: {
      label: "Signalé / écart constaté",
      desc: "L'audit a détecté des incohérences : par exemple des domaines qui ne correspondent pas, des sceaux de licence défaillants ou des redirections vers un serveur proxy pendant l'initialisation des machines à sous.",
    },
    statusFilterAll: "Tous les statuts",
    lastScanned: "Date de l'audit",
    viewReport: "Voir le rapport complet",
  },
  casinos: {
    title: "Répertoire des casinos vérifiés",
    description:
      "Répertoire des casinos en ligne suivis par Swift Secured. Consultez les statuts de licence en vigueur, les entrées officielles des régulateurs et les résultats d'audit des serveurs de jeu.",
    eyebrow: "Répertoire des casinos",
    h1: "Répertoire d'audit des casinos en ligne",
    sub: "Cherchez parmi les casinos suivis pour consulter les statuts au registre des licences, les juridictions émettrices et les journaux de vérification des serveurs de jeu. Une entrée au répertoire ne vaut pas recommandation.",
    searchPlaceholder:
      "Rechercher par nom de casino, domaine ou juridiction...",
    searchLabel: "Rechercher parmi les casinos audités",
    empty: "Aucun casino ne correspond à votre recherche.",
  },
  checker: {
    inputPlaceholder: "Saisissez le nom du casino ou l'URL (ex. Lucky Coin Casino ou luckycoin.cash)",
    inputLabel: "Nom du casino, adresse du site ou numéro de licence",
    button: "Rechercher",
    steps: [
      { n: "1", title: "Saisissez le nom du casino ou l'URL" },
      { n: "2", title: "Nous consultons notre index d'audit" },
      { n: "3", title: "Consultez la licence et l'analyse technique" },
    ],
    footnote: "{count} casinos indexés. Nous indiquons le numéro de licence publié par le casino, sa présence ou non dans le registre du régulateur émetteur, et la date de notre consultation.",
    emptyInput: "Saisissez d'abord un nom de casino, une adresse de site ou un numéro de licence.",
    recordEyebrow: "Fiche de l'index",
    jurisdiction: "Juridiction",
    operator: "Titulaire de la licence",
    licence: "Numéro de licence",
    licenceNone: "Aucun numéro publié",
    licenceExpiry: "Expiration de la licence",
    licenceExpired: "Cette date est passée. Demandez au casino une licence en cours de validité.",
    licenceMatched: "Trouvé dans {registry} lors de notre consultation du {date}",
    licenceSecondhand: "Issu de sources publiques. Pas encore recoupé avec un registre.",
    scan: "Analyse technique",
    scanNone: "Pas encore effectuée",
    noteLabel: "Ce que nous avons observé",
    viewRecord: "Ouvrir la fiche complète",
    multipleTitle: "Plusieurs casinos correspondent",
    multipleBody: "Choisissez celui que vous cherchez.",
    notFoundTitle: "Absent de l'index",
    notFoundBody: "Nous n'avons aucune fiche à ce nom, à cette adresse ou à ce numéro de licence. Ce n'est pas un constat défavorable à l'encontre du casino : cela signifie seulement que nous ne l'avons pas encore indexé.",
    notFoundBrowse: "Parcourir l'index",
    notFoundApply: "Nous demander de l'examiner",
  },
  verify: {
    title: "Vérifier l'authenticité d'un sceau",
    description:
      "Saisissez un identifiant de sceau Swift Secured pour confirmer le statut de vérification en vigueur d'un opérateur et écarter les faux badges.",
    h1: "Vérifier un sceau Swift Secured",
    sub: "Saisissez l'identifiant unique du sceau affiché sur un site de casino pour confirmer la validité de l'audit officiel et consulter les traces de vérification sous-jacentes.",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "Identifiant du sceau",
    button: "Vérifier le sceau",
    validStatus: "Sceau vérifié, valide et actif",
    operator: "Marque / opérateur du casino :",
    jurisdiction: "Juridiction du régulateur :",
    lastChecked: "Date du dernier audit :",
    invalidStatus: "Identifiant de sceau non enregistré / invalide",
    invalidBody:
      "Aucun relevé de vérification actif n'existe pour cet identifiant. Le site qui affiche cette marque utilise peut-être une image de badge non autorisée ou contrefaite. Si vous soupçonnez une fraude,",
    contactUs: "contactez notre équipe",
  },
  apply: {
    title: "Demande de certification pour casino",
    description:
      "Soumettez votre marque de casino en ligne à un audit indépendant de la licence et des serveurs de jeu. Renforcez la confiance des joueurs et augmentez les premiers dépôts (FTD).",
    eyebrow: "Solutions pour opérateurs",
    h1: "Faites auditer et vérifier votre casino",
    sub: "Formulaire pour les opérateurs de casino et les propriétaires de plateformes. Afficher un sceau Swift Secured vérifié prouve la validité de votre licence et l'authenticité de vos serveurs de machines à sous, ce qui lève les freins du joueur au moment du dépôt. Les audits sont gratuits pendant les 6 premiers mois.",
    fieldName: "Nom de la marque du casino",
    fieldNamePlaceholder: "Nom de marque principal vu par les joueurs",
    fieldWebsite: "Domaine actif du site",
    fieldJurisdiction: "Régulateur de la licence",
    fieldJurisdictionPlaceholder: "ex. Anjouan, Curacao GCB, MGA",
    fieldEmail: "E-mail de contact de la société",
    fieldMessage: "Notes techniques complémentaires",
    fieldMessagePlaceholder:
      "Numéro de licence, URL de validation directe ou contact technique",
    submit: "Soumettre pour audit",
    successTitle: "Demande envoyée avec succès",
    successBody:
      "Notre système et notre équipe conformité examineront votre domaine et effectueront des tests de traçage des serveurs de jeu. Vous recevrez une mise à jour du statut de l'audit à l'adresse {email} sous 24 à 48 heures.",
  },
  pricing: {
    title: "Conditions et tarifs du sceau vérifié",
    description:
      "Sceau de vérification gratuit pendant 6 mois pour les casinos en ligne. Aucuns frais d'installation, aucune carte bancaire, aucun partage de revenus. Transformez le doute du joueur en dépôt.",
    eyebrow: "Solutions pour opérateurs",
    h1: "Transformez le scepticisme des joueurs en premiers dépôts",
    sub: "Les nouvelles marques de casino perdent jusqu'à 70 % de leurs déposants potentiels par manque de confiance. Afficher un sceau de vérification indépendant et infalsifiable confirme immédiatement votre licence active et l'authenticité de vos serveurs de jeu, ce qui améliore le taux de conversion sans friction d'installation.",
    billingTitle: "Détails du programme de vérification",
  },
  billingNotes: [
    {
      title: "Audit et sceau gratuits pendant 6 mois",
      desc: "Faites-vous auditer entièrement et affichez le sceau vérifié gratuitement pendant 6 mois à compter de la date d'intégration. Aucuns frais d'installation, aucune carte bancaire, aucun contrat caché.",
    },
    {
      title: "Une simple exigence de lien réciproque",
      desc: "Nous demandons seulement que le badge du pied de page renvoie à votre certificat d'audit dédié sur notre site. Les joueurs peuvent ainsi vérifier les traces techniques en temps réel. Aucun partage de revenus ni frais d'apport.",
    },
    {
      title: "Options transparentes après la période d'essai",
      desc: "Avant la fin de vos 6 mois d'essai, nous vous présenterons des options de renouvellement au tarif transparent. Il n'y a aucun prélèvement automatique ni abonnement imposé : vous gardez le contrôle total.",
    },
    {
      title: "Retrait immédiat possible",
      desc: "Il suffit de retirer le code du badge du pied de page de votre site, à tout moment, pour mettre fin à l'intégration. Vos relevés de contrôle passés restent archivés dans notre répertoire avec tous leurs horodatages d'audit.",
    },
  ],
  badge: {
    title: "Formats du sceau vérifié et intégration",
    description:
      "Découvrez les visuels du sceau Swift Secured, les formats de badge et les règles techniques qui permettent aux joueurs de vérifier l'authenticité du lien d'audit.",
    eyebrow: "Visuels du sceau",
    h1: "Intégration du badge Swift Secured et comportement de la vérification",
    sub: "Disponible en trois formats adaptatifs pensés pour les bandeaux de pied de page et les formulaires d'inscription. Tout badge authentique fonctionne comme un lien cryptographique direct vers le rapport d'audit en vigueur. Une image statique sans lien actif échoue à la vérification.",
    primaryTitle: "Badge standard",
    primaryBody:
      "Conçu pour les pieds de page, aux côtés des sceaux de licence. Sobre et sérieux. Un clic ouvre le rapport de vérification en vigueur du casino, avec les preuves de traçage des serveurs de jeu et les horodatages des contrôles au registre.",
    compactTitle: "Variante compacte / sur une ligne",
    compactBody:
      "Format horizontal pensé pour les rangées d'icônes de paiement ou les barres de navigation mobiles. Il conserve tout le suivi de vérification et mène exactement au même certificat d'audit.",
    darkTitle: "Variante contour pour thème sombre",
    darkBody:
      "Version au contour très contrasté, pensée pour les interfaces de casino sombres. Elle garde une lisibilité maximale sans nuire à l'identité visuelle de la marque.",
    ctaHeading: "Prêt à afficher le sceau vérifié sur votre site ?",
    ctaButton: "Se faire certifier",
  },
  faqPage: {
    title: "Questions fréquentes",
    description:
      "Réponses sur les contrôles au registre des licences, la détection des machines à sous scriptées, l'indépendance vis-à-vis des opérateurs et les critères de vérification.",
    eyebrow: "FAQ et transparence",
    h1: "Questions fréquentes des joueurs et des opérateurs",
    ctaHeading:
      "Vous exploitez un casino ? Demandez un audit en moins de 2 minutes.",
    ctaButton: "Certification gratuite",
  },
  faqs: [
    {
      q: "Que garantit le badge Swift Secured à un joueur ?",
      a: "Le badge prouve qu'à la date d'audit indiquée, le domaine du casino était enregistré et actif dans les relevés officiels du régulateur ET que les requêtes de spin se connectaient directement aux serveurs certifiés du fournisseur (ce qui confirme des machines à sous d'origine, non scriptées, avec leur RTP d'origine).",
    },
    {
      q: "Comment détectez-vous les machines à sous scriptées ou contrefaites ?",
      a: "Pendant les tests, nous inspectons le trafic réseau sortant au lancement des machines à sous. Les jeux officiels diffusent leur calcul et leurs ressources directement depuis les domaines certifiés des fournisseurs (par exemple Pragmatic, Evolution). Si un site fait passer les requêtes de spin par des serveurs proxy intermédiaires inconnus pour fausser les résultats, il est signalé comme scripté.",
    },
    {
      q: "Un casino peut-il payer pour être vérifié ou pour modifier les conclusions d'un audit ?",
      a: "Aucune influence par l'argent, jamais. Le statut de vérification est déterminé automatiquement par les recherches au registre et les traces techniques des serveurs. Les opérateurs peuvent afficher les badges d'audit, mais ne peuvent ni acheter un changement de statut ni supprimer les journaux d'historique.",
    },
    {
      q: "Que signifie un statut « non confirmé » pour un casino ?",
      a: "« Non confirmé » signifie que notre système n'a trouvé aucun relevé de domaine correspondant dans la base de données officielle du régulateur à la date de l'audit. Cela peut arriver si des registres sont hors ligne, si des autorisations de domaine sont en cours, ou si l'opérateur utilise des miroirs non enregistrés. C'est un constat factuel, pas une déclaration juridique.",
    },
    {
      q: "Swift Secured peut-il régler mon litige de retrait avec un casino ?",
      a: "Nous ne gérons pas les comptes des joueurs et ne traitons pas les paiements. En revanche, notre certificat d'audit fournit des liens directs vers l'autorité de licence officielle nommée dans le relevé, auprès de laquelle vous pouvez déposer une plainte réglementaire officielle.",
    },
    {
      q: "Pourquoi les joueurs et les opérateurs devraient-ils faire confiance à Swift Secured ?",
      a: "Parce que chaque affirmation est vérifiable en un clic. Nous publions les adresses brutes des recherches au registre et les traces des points d'accès réseau des machines à sous, pour que les joueurs n'aient pas à se fier à des promesses ou à des avis d'affiliés.",
    },
  ],
  about: {
    title: "À propos de Swift Secured",
    description:
      "Découvrez la mission de Swift Secured : fournir des audits de licence et de serveurs de jeu transparents, automatisés et indépendants.",
    eyebrow: "À propos",
    h1: "Une vérification indépendante fondée sur des faits techniques",
    sub: "Swift Secured réalise des audits techniques automatisés pour les casinos en ligne. Nous vérifions les entrées aux registres des régulateurs et auditons les connexions aux serveurs de machines à sous, puis publions nos conclusions avec un horodatage précis. Aucun placement payant, aucun lien d'affiliation, aucun résultat trafiqué.",
    card1Title: "Aucun biais commercial",
    card1Body:
      "Aucun casino ne peut acheter un sceau vérifié sans passer les contrôles techniques. Nous refusons le partage de revenus d'affiliation, les renvois payants au clic et les classements sponsorisés. Les conclusions restent purement objectives.",
    card2Title: "Un périmètre technique défini",
    card2Body:
      "Nous énonçons nos capacités d'audit en toute transparence : nous confirmons les relevés officiels de licence et les points d'accès de machines à sous non scriptés, tout en indiquant explicitement nos limites concernant les finances internes de l'opérateur ou les règles de mise des joueurs.",
  },
};

export default fr;
