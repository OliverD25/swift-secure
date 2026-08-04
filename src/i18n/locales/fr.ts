import type { PartialTranslation } from "../types";

const fr: PartialTranslation = {
  nav: {
    howItWorks: "Fonctionnement",
    methodology: "Méthodologie",
    pricing: "Tarifs",
    about: "À propos",
    faq: "FAQ",
    casinos: "Casinos",
    verify: "Vérifier",
    apply: "Candidater",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Vérifier un sceau",
    apply: "Candidater",
    faq: "FAQ",
  },
  stickyCta: {
  },
  seal: {
    certified: "Certifié",
  },
  common: {
    certifiedSince: "Certifié depuis",
    viewSealRecord: "Voir la fiche du sceau",
    youProvide: "Vous fournissez :",
  },
  home: {
    title: "Swift Secure",
    ctaVerify: "Vérifier un sceau",
    howEyebrow: "Fonctionnement",
  },
  process: {
  },
  pricing: {
    title: "Tarifs",
  },
  methodology: {
    title: "Méthodologie de vérification",
    description:
      "Exactement ce que Swift Secure contrôle avant d’émettre un badge, à quelle fréquence la vérification est refaite, et ce que nous ne prétendons délibérément pas vérifier.",
    eyebrow: "Méthodologie",
    h1: "Ce que le badge signifie réellement",
    sub: "Une marque de confiance ne vaut que ce qu’il y a derrière. Voici la méthode complète, y compris les vérifications que nous ne faisons pas, pour que personne n’ait à deviner.",
    checksTitle: "Ce que nous vérifions",
    limitsTitle: "Ce que nous ne vérifions pas",
    limitsSub:
      "Publié délibérément. Un sceau qui laisse entendre plus qu’il ne vérifie est pire que pas de sceau du tout, et c’est la ligne que nous tenons quand quelque chose tourne mal chez un opérateur qui porte notre badge.",
    suspensionTitle: "Comment un badge est suspendu",
    suspensionBody:
      "Si une plainte arrive ou si le robot repère quelque chose d’anormal, l’opérateur dispose de 48 heures pour répondre en privé avant tout changement public : cela protège contre les fausses dénonciations de concurrents. Si le problème est réel, le badge est retiré et la page de vérification est mise à jour avec les faits. Nous ne retirons aucune page contre paiement, et aucun montant ne fait disparaître une conclusion.",
    ctaHeading: "Vous voulez faire vérifier votre plateforme ?",
    ctaButton: "Demander un scan",
  },
  directory: {
    scanned: {
      label: "Scanné",
      desc: "Contrôlé automatiquement par notre robot. Aucune relation commerciale et aucun badge émis.",
    },
    listed: {
      label: "Répertorié",
      desc: "Dans notre index à partir de sources publiques. Aucune vérification n’a encore été faite et rien ici n’est recommandé.",
    },
    flagged: {
      label: "À examiner",
      desc: "La vérification automatique a relevé un point qui exige un regard humain avant toute conclusion.",
    },
    statusFilterAll: "Tous",
    lastScanned: "Dernière vérification",
    viewReport: "Voir le rapport",
  },
  casinos: {
    title: "Répertoire des casinos",
    description: "Répertoire des nouveaux casinos en ligne suivis par Swift Secure, chacun avec son statut de vérification actuel.",
    eyebrow: "Répertoire",
    h1: "Répertoire des casinos",
    sub: "Chaque nouveau casino que nous indexons, avec son statut actuel. La plupart sont répertoriés à partir de sources publiques et n'ont pas encore été vérifiés — le statut sur chaque fiche l'indique.",
    searchPlaceholder: "Chercher par nom de casino ou juridiction",
    searchLabel: "Rechercher parmi les casinos certifiés",
    empty: "Aucun casino ne correspond à cette recherche.",
  },
  verify: {
    title: "Vérifier un sceau",
    description: "Saisissez l’identifiant du sceau affiché sur le site d’un casino pour confirmer qu’il est authentique et actuellement certifié par Swift Secure.",
    h1: "Vérifier un sceau",
    sub: "Saisissez l’identifiant du sceau affiché sur le site du casino pour confirmer qu’il est authentique et à jour.",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "Identifiant du sceau",
    button: "Vérifier",
    validStatus: "Sceau valide et actif",
    operator: "Opérateur :",
    jurisdiction: "Juridiction :",
    invalidStatus: "Aucun sceau correspondant",
    contactUs: "contactez-nous",
  },
  apply: {
    title: "Demander la certification",
    description: "Obtenez votre sceau Swift Secure en seulement 10 jours. Parlez-nous de votre plateforme : notre équipe conformité répond sous 48 heures.",
    eyebrow: "Demander la certification",
    h1: "Obtenez votre sceau en seulement 10 jours",
    sub: "Parlez-nous de votre plateforme. Notre équipe conformité répond sous 48 heures.",
    fieldName: "Nom du casino",
    fieldNamePlaceholder: "Northgate Interactive",
    fieldWebsite: "URL du site",
    fieldJurisdiction: "Juridiction de la licence",
    fieldJurisdictionPlaceholder: "ex. Malta, Curacao",
    fieldEmail: "E-mail de contact",
    fieldMessage: "Autre chose à nous signaler ?",
    fieldMessagePlaceholder: "Date de lancement, marchés visés, audits en cours...",
    submit: "Envoyer la candidature",
    successTitle: "Candidature reçue",
    successBody: "Notre équipe contactera {email} sous 48 heures pour lancer l’audit.",
  },
  about: {
  },
  faqPage: {
    title: "FAQ",
    eyebrow: "FAQ",
    h1: "Questions fréquentes",
    ctaHeading: "D’autres questions ?",
    ctaButton: "Nous contacter",
  },
  badge: {
    title: "Le sceau Swift Secure",
    description: "Référence de marque du sceau de certification Swift Secure : sceau principal, version compacte et variante sur fond sombre.",
    eyebrow: "Le sceau",
    h1: "Swift Secure",
    sub: "Un sceau, trois formes. Assez simple pour côtoyer un logo de pied de page, assez clair pour vouloir dire quelque chose d’un coup d’œil.",
    primaryTitle: "Sceau principal",
    primaryBody:
      "Le sceau complet, pour un en-tête d’accueil ou un pied de page. Une seule épaisseur de trait, une seule couleur d’accent, aucun dégradé ni ornement : il doit rester lisible à toute taille, même réduit à 60 px.",
    compactTitle: "Version compacte",
    compactBody: "Pour une page de paiement, un bandeau de pied de page ou tout espace horizontal restreint. Même icône, même logotype, sur une ligne.",
    darkTitle: "Variante sur fond sombre",
    darkBody:
      "Pour les sites de casino aux thèmes sombres : l’anneau devient une icône en contour et le texte passe en blanc, pour rester lisible sans plaque blanche derrière.",
    ctaHeading: "Vous voulez afficher Swift Secure sur votre site ?",
    ctaButton: "Demander la certification",
  },
};

export default fr;
