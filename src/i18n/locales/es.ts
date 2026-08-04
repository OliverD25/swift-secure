import type { PartialTranslation } from "../types";

const es: PartialTranslation = {
  nav: {
    howItWorks: "Cómo funciona",
    methodology: "Metodología",
    pricing: "Precios",
    about: "Nosotros",
    faq: "FAQ",
    casinos: "Casinos",
    verify: "Verificar",
    apply: "Solicitar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar un sello",
    apply: "Solicitar",
    faq: "FAQ",
  },
  stickyCta: {
  },
  seal: {
    certified: "Certificado",
  },
  common: {
    certifiedSince: "Certificado desde",
    viewSealRecord: "Ver registro del sello",
    youProvide: "Usted aporta:",
  },
  home: {
    title: "Swift Secured",
    ctaVerify: "Verificar un sello",
    howEyebrow: "Cómo funciona",
  },
  process: {
  },
  pricing: {
    title: "Precios",
  },
  methodology: {
    title: "Metodología de verificación",
    description:
      "Exactamente qué comprueba Swift Secured antes de emitir un distintivo, con qué frecuencia se vuelve a revisar y qué decimos abiertamente que no verificamos.",
    eyebrow: "Metodología",
    h1: "Qué significa realmente el distintivo",
    sub: "Una marca de confianza vale lo que hay detrás de ella. Este es el método completo, incluidas las comprobaciones que no hacemos, para que nadie tenga que adivinarlo.",
    checksTitle: "Qué verificamos",
    limitsTitle: "Qué no verificamos",
    limitsSub:
      "Publicado a propósito. Un sello que insinúa más de lo que comprueba es peor que ningún sello, y esta es la línea que mantenemos cuando algo sale mal en un operador que lleva nuestro distintivo.",
    suspensionTitle: "Cómo se suspende un distintivo",
    suspensionBody:
      "Si llega una reclamación o el rastreador detecta algo anómalo, el operador dispone de 48 horas para responder en privado antes de que cambie nada públicamente: eso protege frente a denuncias falsas de la competencia. Si el problema es real, el distintivo se retira y la página de verificación se actualiza con los hechos. No retiramos páginas a cambio de dinero y no existe ninguna tarifa que haga desaparecer un hallazgo.",
    ctaHeading: "¿Quiere que revisemos su plataforma?",
    ctaButton: "Solicitar un escaneo",
  },
  directory: {
    scanned: {
      label: "Escaneado",
      desc: "Comprobado automáticamente por nuestro rastreador. Sin relación comercial y sin distintivo emitido.",
    },
    listed: {
      label: "Listado",
      desc: "En nuestro índice a partir de fuentes públicas. Todavía no se ha hecho ninguna comprobación y nada de esto es un respaldo.",
    },
    flagged: {
      label: "Requiere revisión",
      desc: "La comprobación automática encontró algo que necesita una mirada humana antes de sacar conclusiones.",
    },
    statusFilterAll: "Todos",
    lastScanned: "Última comprobación",
    viewReport: "Ver informe",
  },
  casinos: {
    title: "Directorio de casinos",
    description: "Directorio de nuevos casinos online que Swift Secured sigue, cada uno con su estado de verificación actual.",
    eyebrow: "Directorio",
    h1: "Directorio de casinos",
    sub: "Cada casino nuevo que indexamos, con su estado actual. La mayoría figura a partir de fuentes públicas y aún no se ha comprobado — el estado de cada tarjeta lo indica.",
    searchPlaceholder: "Buscar por nombre de casino o jurisdicción",
    searchLabel: "Buscar casinos certificados",
    empty: "Ningún casino coincide con esa búsqueda.",
  },
  verify: {
    title: "Verificar un sello",
    description: "Introduzca el ID del sello que aparece en el sitio de un casino para confirmar que es auténtico y que está certificado actualmente por Swift Secured.",
    h1: "Verificar un sello",
    sub: "Introduzca el ID del sello que aparece en el sitio del casino para confirmar que es auténtico y está vigente.",
    inputPlaceholder: "p. ej. CS-2026-0042",
    inputLabel: "ID del sello",
    button: "Verificar",
    validStatus: "Sello válido y activo",
    operator: "Operador:",
    jurisdiction: "Jurisdicción:",
    invalidStatus: "No se ha encontrado ningún sello",
    contactUs: "contáctenos",
  },
  apply: {
    title: "Solicitar certificación",
    description: "Consiga su sello Swift Secured en tan solo 10 días. Cuéntenos cómo es su plataforma: nuestro equipo de cumplimiento responde en 48 horas.",
    eyebrow: "Solicitar certificación",
    h1: "Consiga su sello en tan solo 10 días",
    sub: "Cuéntenos cómo es su plataforma. Nuestro equipo de cumplimiento responde en 48 horas.",
    fieldName: "Nombre del casino",
    fieldWebsite: "URL del sitio web",
    fieldJurisdiction: "Jurisdicción de la licencia",
    fieldJurisdictionPlaceholder: "p. ej. Malta, Curacao",
    fieldEmail: "Correo electrónico de contacto",
    fieldMessage: "¿Algo más que debamos saber?",
    fieldMessagePlaceholder: "Fecha de lanzamiento, mercados objetivo, auditorías actuales...",
    submit: "Enviar solicitud",
    successTitle: "Solicitud recibida",
    successBody: "Nuestro equipo se pondrá en contacto con {email} en un plazo de 48 horas para iniciar la auditoría.",
  },
  about: {
  },
  faqPage: {
    title: "FAQ",
    eyebrow: "FAQ",
    h1: "Preguntas frecuentes",
    ctaHeading: "¿Le queda alguna duda?",
    ctaButton: "Contactar",
  },
  badge: {
    title: "El sello Swift Secured",
    description: "Referencia de marca del sello de certificación Swift Secured: sello principal, versión compacta y variante para fondos oscuros.",
    eyebrow: "El sello",
    h1: "Swift Secured",
    sub: "Un sello, tres formas. Lo bastante simple para ir junto a un logotipo de pie de página y lo bastante claro para significar algo de un vistazo.",
    primaryTitle: "Sello principal",
    primaryBody:
      "El sello completo, para la cabecera de la página de inicio o el pie. Un único grosor de trazo, un color de acento, sin degradados ni adornos: debe leerse con claridad a cualquier tamaño, incluso reducido a 60 px.",
    compactTitle: "Versión compacta",
    compactBody: "Para una página de pago, una franja de pie o cualquier lugar con poco espacio horizontal. Mismo icono, mismo logotipo, una sola línea.",
    darkTitle: "Variante para fondos oscuros",
    darkBody:
      "Para sitios de casino con temas oscuros: el anillo pasa a icono de contorno y tipografía blanca para seguir siendo legible sin necesidad de una placa blanca detrás.",
    ctaHeading: "¿Quiere mostrar Swift Secured en su sitio?",
    ctaButton: "Solicitar certificación",
  },
};

export default es;
