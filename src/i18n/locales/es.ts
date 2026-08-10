import type { PartialTranslation } from "../types";

/**
 * es. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const es: PartialTranslation = {
  nav: {
    howItWorks: "Cómo funciona",
    methodology: "Qué verificamos",
    pricing: "Para casinos",
    about: "Quiénes somos",
    faq: "Preguntas frecuentes",
    casinos: "Índice de casinos",
    verify: "Comprobar una insignia",
    apply: "Obtener la certificación",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar un sello",
    apply: "Solicitar el sello",
    faq: "Preguntas frecuentes",
  },
  stickyCta: {
    note: "¿Opera un casino en línea? Aumente la confianza de los jugadores y los primeros depósitos con una auditoría independiente.",
    button: "Certifíquese gratis",
  },
  seal: {
    certified: "Licencia y tragamonedas verificadas",
  },
  stats: [
    {
      count: "listed",
      label: "Casinos en seguimiento",
    },
    {
      count: "topJurisdiction",
      label: "Con licencia de {regulator}",
    },
    {
      count: "badged",
      label: "Mostrando hoy el sello verificado",
    },
  ],
  common: {
    certifiedSince: "Registro fechado el",
    viewSealRecord: "Abrir el registro de auditoría",
    youProvide: "Qué se necesita:",
  },
  home: {
    title:
      "Swift Secured — Verificación independiente de casinos y servidores de juego",
    description:
      "Verifique las licencias de los casinos en los registros oficiales de los reguladores y detecte tragamonedas manipuladas antes de hacer un depósito. Auditoría técnica independiente con marcas de fecha públicas.",
    badge: "Servicio de auditoría independiente. 100 % imparcial.",
    h1: "Deje de depositar a ciegas: verifique la licencia y la autenticidad de los servidores de juego",
    sub: "Auditamos casinos en línea en tiempo real. Rastreamos los servidores de juego en vivo para confirmar que las tragamonedas son 100 % originales, verificamos el registro activo de la licencia y señalamos las copias fraudulentas antes de que arriesgue su dinero.",
    ctaApply: "Qué verificamos",
    ctaVerify: "Comprobar una insignia",
    howEyebrow: "Cómo funciona",
    howTitle:
      "De la búsqueda en el registro en tiempo real a una auditoría fechada e inalterable",
    criteriaEyebrow: "Estándares de seguridad",
    criteriaTitle:
      "Qué verifica nuestra auditoría — y las reglas estrictas que hay detrás",
    operatorsEyebrow: "Directorio público",
    operatorsTitle:
      "Casinos en seguimiento en nuestro índice: verificados, sin confirmar o señalados",
    viewAllCasinos: "Explorar el índice de casinos",
    ctaHeading: "Metodología técnica transparente",
    ctaSub:
      "Conozca exactamente cómo rastreamos las peticiones a los servidores de juego, cotejamos los registros de los reguladores y detectamos el RTP manipulado, sin aceptar pagos de operadores a cambio de reseñas positivas.",
    ctaButton: "Leer la metodología",
  },
  criteria: [
    {
      title: "Verificación directa en el registro del regulador",
      desc: "Cientos de sitios fraudulentos muestran logotipos de licencia falsos en su pie de página. Nosotros verificamos los números de licencia y los dominios activos directamente dentro de las bases de datos oficiales de los reguladores.",
    },
    {
      title: "Identidad completa del regulador y reglas de la jurisdicción",
      desc: "Los organismos reguladores difieren mucho en el nivel de protección que ofrecen. Cada registro indica el nombre exacto del regulador y el número de licencia, para que usted pueda juzgar la fuerza legal que hay detrás.",
    },
    {
      title: "Fecha y hora exactas de la verificación",
      desc: "Las licencias caducan, se suspenden o cambian de dominio de un día para otro. Las afirmaciones estáticas no significan nada: cada registro imprime la fecha UTC exacta en la que el sistema realizó la consulta.",
    },
    {
      title: "Registros de auditoría no comprables e inalterables",
      desc: "Ningún casino puede pagar para modificar los hallazgos, ocultar resultados negativos ni borrar el historial de registros. El estado de verificación cambia solo cuando cambian los datos del registro o los rastreos de servidor.",
    },
    {
      title:
        "Auditoría de servidores de juego auténticos (anti tragamonedas manipuladas)",
      desc: "Los casinos falsos copian los gráficos de los juegos, pero envían la lógica del giro a servidores privados con el RTP manipulado. Inspeccionamos las peticiones de red en vivo para asegurar que cada giro se conecta directamente a los servidores oficiales del proveedor.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extracción de los datos de licencia y dominio",
      desc: "Extraemos el número de licencia declarado, la entidad corporativa y la URL de juego exacta directamente del frontend público del casino analizado.",
    },
    {
      n: "2",
      title: "Cotejo en el registro y rastreo de servidores",
      desc: "Buscamos en la base de datos oficial activa del regulador emisor las aprobaciones de dominio coincidentes y analizamos los flujos websocket/HTTP salientes cuando se lanzan los juegos.",
    },
    {
      n: "3",
      title: "Publicación del certificado de auditoría fechado",
      desc: "Tanto si el resultado es confirmado, ausente o sin verificar, el registro completo de la auditoría se publica con una marca de tiempo inmutable que detalla cada comprobación realizada.",
    },
    {
      n: "4",
      title: "Verificación independiente con un clic",
      desc: "Cada registro ofrece enlaces directos al registro oficial y pruebas del rastreo de red, para que los jugadores puedan verificar los hallazgos por su cuenta.",
    },
  ],
  process: {
    title: "Cómo funciona — el proceso de verificación",
    description:
      "Cómo Swift Secured audita los datos de licencia de un casino, rastrea los endpoints originales de los servidores de juego y publica registros de auditoría públicos e inalterables.",
    eyebrow: "Proceso de verificación",
    h1: "Cómo se auditan, se verifican y se indexan los casinos",
    sub: "Nuestro procedimiento técnico está totalmente automatizado y publicado, lo que garantiza una reproducibilidad completa. Extraemos los números de licencia publicados, cotejamos las listas oficiales de los reguladores y rastreamos las peticiones de juego en vivo sin necesitar acceso al casino ni el registro de un jugador.",
    ctaHeading: "¿Opera un casino en línea con licencia?",
    ctaButton: "Solicitar el sello verificado",
  },
  stages: [
    {
      n: "1",
      title: "Extracción de datos públicos y endpoints",
      duration: "Análisis del frontend",
      desc: "Extraemos las declaraciones de licencia, los datos corporativos del operador y las URL del dominio directamente del pie de página del sitio analizado. Las entradas del índice sin verificar se marcan explícitamente como no comprobadas hasta que se completa una extracción en vivo completa.",
      provide: "No se requiere nada de los jugadores ni de los operadores.",
    },
    {
      n: "2",
      title: "Registro del regulador y rastreo de servidores",
      duration: "Solo registros públicos",
      desc: "Buscamos en las bases de datos oficiales de los reguladores las listas de dominios aprobados. Al mismo tiempo, iniciamos sesiones de juego de prueba para confirmar que la lógica del juego se carga directamente desde los CDN del proveedor (por ejemplo, Pragmatic, Evolution).",
      provide: "No se requiere registro ni pago.",
    },
    {
      n: "3",
      title: "Publicación independiente del estado y la fecha",
      duration: "Lectura gratuita",
      desc: "Los resultados se generan al instante con la fecha exacta de la verificación. Si no se encuentra una licencia o falla la validación del dominio, el registro indica de forma transparente «sin confirmar» en lugar de ocultar los hallazgos.",
      provide: "Acceso público y abierto para todos los usuarios.",
    },
    {
      n: "4",
      title: "Monitorización continua y ciclos de nueva comprobación",
      duration: "En cada nueva comprobación",
      desc: "Los registros y los dominios de juego cambian con el tiempo. Cuando se realiza una nueva comprobación, el estado y la fecha se actualizan automáticamente. El historial de comprobaciones queda archivado para impedir cambios silenciosos.",
      provide:
        "Compruebe siempre la fecha de auditoría que figura en la insignia.",
    },
  ],
  methodology: {
    title: "Metodología de auditoría técnica",
    description:
      "Especificación completa de la verificación: cómo comprobamos los registros de los reguladores, auditamos los servidores originales de las tragamonedas, anotamos las fechas y retiramos las insignias cuando caduca una licencia.",
    eyebrow: "Metodología y alcance",
    h1: "Metodología de verificación técnica y límites operativos",
    sub: "Las auditorías se realizan desde fuera, desde la perspectiva de un jugador corriente, sin acceso especial ni intervención del operador. Comprobamos los números de licencia publicados, verificamos las aprobaciones de dominio activas en los registros oficiales y rastreamos las peticiones en vivo a los servidores de tragamonedas. Cada hallazgo se fecha y se publica.",
    checksTitle: "Parámetros técnicos verificados",
    limitsTitle: "Límites y limitaciones de la auditoría",
    limitsSub:
      "Toda auditoría técnica tiene límites estrictos. Indicamos de forma explícita qué verificamos (validez de la licencia, servidores oficiales de las tragamonedas) y qué no se puede auditar desde fuera (contabilidad interna, decisiones sobre retiradas concretas).",
    monitoringTitle: "Fechado obligatorio y monitorización",
    monitoringBody:
      "Las bases de datos de los reguladores se actualizan constantemente: las licencias caducan, los dominios rotan o los certificados se revocan. Una comprobación solo es exacta para el momento preciso en que se realizó. Mostramos la fecha de la comprobación de forma destacada. Las fechas antiguas activan una nueva auditoría automatizada. Los hallazgos archivados nunca se sobrescriben en silencio.",
    suspensionTitle: "Reglas automatizadas de retirada de la insignia",
    suspensionBody:
      "Si una licencia desaparece de un registro o un sitio pasa a usar servidores de juego manipulados, el estado de la insignia se actualiza de inmediato. Las quejas o los informes de la competencia no cambian el estado directamente: activan una nueva comprobación automatizada. Ningún pago ni patrocinio puede restaurar una insignia para una licencia no válida.",
    ctaHeading: "Verifique siempre un casino antes de depositar.",
    ctaButton: "Buscar en el índice de casinos",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Coincidencia de licencia y registro",
      summary:
        "Confirma el registro oficial de la licencia y verifica el dominio de juego activo en los registros del regulador.",
      checks: [
        "Número de licencia extraído directamente del frontend del operador",
        "Verificado en la base de datos oficial del regulador emisor",
        "Dominio activo del sitio cotejado con la lista de dominios aprobados",
        "Transparencia total sobre los parámetros de la jurisdicción",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Auditoría de servidores de juego auténticos",
      summary:
        "Comprueba que las tragamonedas funcionan en los CDN genuinos del proveedor, lo que evita juegos falsificados con el RTP manipulado.",
      checks: [
        "Inspección de las peticiones de red durante la inicialización del juego",
        "Verificación de los endpoints de la lógica del juego (Pragmatic, Play'n GO, Hacksaw, etc.)",
        "Detección de servidores proxy y réplicas falsas de tragamonedas",
        "Confirmación de configuraciones del proveedor sin alterar",
      ],
    },
    {
      id: "dated-records",
      name: "Prueba de fecha y hora",
      summary:
        "Cada hallazgo lleva una marca de tiempo UTC inmutable que muestra exactamente cuándo auditó el sistema el sitio.",
      checks: [
        "Fecha de la comprobación impresa con claridad junto al estado de verificación",
        "Entradas sin comprobar identificadas de forma explícita",
        "Historial de comprobaciones visible",
        "Actualización inmediata del estado tras una nueva auditoría",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantías de independencia",
      summary:
        "Cero sesgo de afiliación, cero cambios de estado pagados y cero clasificaciones promocionales.",
      checks: [
        "Sin enlaces de afiliados ni referencias de casinos de pago por clic",
        "Sin mejoras de valoración pagadas ni posiciones patrocinadas para la insignia",
        "Hallazgos técnicos objetivos por encima de opiniones editoriales",
        "Procedimiento abierto para que el jugador verifique por su cuenta",
      ],
    },
  ],
  limits: [
    {
      title: "RTP de los juegos y generadores de números aleatorios (RNG)",
      desc: "Evaluar el RTP estadístico a largo plazo o la aleatoriedad del RNG exige acceso interno al servidor y millones de giros registrados a lo largo de millones de rondas. Aunque confirmamos que las tragamonedas se conectan directamente a los servidores oficiales del proveedor (que usan laboratorios de pruebas acreditados como iTech Labs o eCOGRA), nosotros no realizamos pruebas de laboratorio de RNG independientes.",
    },
    {
      title: "Procedimientos internos de cuenta y banca",
      desc: "Las auditorías se realizan desde el punto de vista de un visitante. La verificación de identidad del jugador (KYC), los cierres de cuenta, los requisitos de apuesta de los bonos y las colas de procesamiento de pagos permanecen dentro del software privado del casino y quedan fuera de las comprobaciones técnicas externas.",
    },
    {
      title: "Seguridad garantizada de las retiradas",
      desc: "Una auditoría externa no puede inspeccionar las cuentas bancarias privadas de un operador de casino ni sus reservas de liquidez. Una licencia válida y unas tragamonedas originales confirman el cumplimiento normativo y que los juegos son genuinos, pero no pueden garantizar la solvencia operativa ni la velocidad de los pagos.",
    },
    {
      title: "Recomendaciones subjetivas de «casino seguro»",
      desc: "Una licencia es un permiso regulatorio sujeto a condiciones. Los requisitos varían mucho entre jurisdicciones (por ejemplo, MGA, Curacao, Anjouan). A 4 de agosto de 2026, 215 de los 223 casinos indexados tienen credenciales de Anjouan. Ofrecemos datos en bruto y pruebas de servidor para que usted pueda tomar decisiones informadas: nunca emitimos garantías genéricas de seguridad.",
    },
  ],
  directory: {
    certified: {
      label: "Licencia y tragamonedas verificadas",
      desc: "Coincidencia del número de licencia confirmada en el registro del regulador Y servidores de juego verificados como endpoints auténticos del proveedor en la fecha de la auditoría.",
    },
    scanned: {
      label: "Sin confirmar / ausente del registro",
      desc: "La búsqueda no devolvió ninguna coincidencia oficial en el registro para el dominio en la fecha de la auditoría. El operador puede usar un dominio no listado, una licencia no indexada, u operar sin un permiso público.",
    },
    listed: {
      label: "Entrada sin comprobar",
      desc: "Indexada a partir de fuentes web públicas. Todavía no se han realizado el análisis automatizado del backend ni el rastreo de los servidores de tragamonedas para este sitio.",
    },
    flagged: {
      label: "Señalado / discrepancia detectada",
      desc: "La auditoría detectó incoherencias: por ejemplo, dominios que no coinciden, sellos de licencia rotos o redirecciones a servidores proxy durante la inicialización de las tragamonedas.",
    },
    statusFilterAll: "Todos los estados",
    lastScanned: "Fecha de la auditoría",
    viewReport: "Ver el informe completo",
  },
  casinos: {
    title: "Directorio de casinos verificados",
    description:
      "Directorio de casinos en línea en seguimiento por Swift Secured. Consulte el estado actual de las licencias, las entradas oficiales de los reguladores y los resultados de la auditoría de los servidores de juego.",
    eyebrow: "Directorio de casinos",
    h1: "Directorio de auditorías de casinos en línea",
    sub: "Busque entre los casinos en seguimiento para ver el estado en el registro de licencias, las jurisdicciones emisoras y los registros de verificación de los servidores de juego. Aparecer en la lista no implica una recomendación.",
    searchPlaceholder: "Buscar por nombre de casino, dominio o jurisdicción...",
    searchLabel: "Buscar casinos auditados",
    empty: "Ningún casino coincide con los parámetros de búsqueda.",
  },
  verify: {
    title: "Verificar la autenticidad de un sello",
    description:
      "Introduzca un ID de sello de Swift Secured para confirmar el estado de verificación actual de un operador y evitar el uso de insignias falsas.",
    h1: "Verificar un sello de Swift Secured",
    sub: "Introduzca el ID de sello único que aparece en el sitio de un casino para confirmar la validez oficial de la auditoría e inspeccionar los rastreos de verificación en los que se basa.",
    inputPlaceholder: "p. ej. CS-2026-0042",
    inputLabel: "ID del sello",
    button: "Verificar el sello",
    validStatus: "Sello verificado válido y activo",
    operator: "Marca / operador del casino:",
    jurisdiction: "Jurisdicción del regulador:",
    lastChecked: "Fecha de la última auditoría:",
    invalidStatus: "ID de sello no registrado o no válido",
    invalidBody:
      "No existe ningún registro de verificación activo para este ID. El sitio que muestra esta marca puede estar usando una imagen de insignia no autorizada o falsificada. Si sospecha de un fraude,",
    contactUs: "póngase en contacto con nuestro equipo",
  },
  apply: {
    title: "Solicitud de certificación para casinos",
    description:
      "Presente su marca de casino en línea para una auditoría independiente de licencia y servidores de juego. Genere confianza en los jugadores y aumente los primeros depósitos (FTD).",
    eyebrow: "Soluciones para operadores",
    h1: "Consiga que su casino sea auditado y verificado",
    sub: "Formulario para operadores de casino y propietarios de plataformas. Mostrar un sello verificado de Swift Secured demuestra la validez de su licencia y la autenticidad de sus servidores de tragamonedas, y elimina la fricción del jugador en el momento del depósito. Las auditorías son gratuitas durante los primeros 6 meses.",
    fieldName: "Nombre de la marca del casino",
    fieldNamePlaceholder: "Nombre principal de la marca de cara al jugador",
    fieldWebsite: "Dominio activo del sitio web",
    fieldJurisdiction: "Regulador que otorga la licencia",
    fieldJurisdictionPlaceholder: "p. ej. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Correo electrónico de contacto corporativo",
    fieldMessage: "Notas técnicas adicionales",
    fieldMessagePlaceholder:
      "Número de licencia, URL de validación directa o datos del contacto técnico",
    submit: "Enviar para auditoría",
    successTitle: "Solicitud enviada correctamente",
    successBody:
      "Nuestro sistema y nuestro equipo de cumplimiento revisarán su dominio y realizarán pruebas de rastreo de los servidores de juego. Recibirá una actualización del estado de la auditoría en {email} en un plazo de 24 a 48 horas.",
  },
  pricing: {
    title: "Condiciones y precios del sello verificado",
    description:
      "Sello de verificación gratuito durante 6 meses para casinos en línea. Sin cuotas de alta, sin tarjeta de crédito, sin reparto de ingresos. Convierta la duda del jugador en depósitos.",
    eyebrow: "Soluciones para operadores",
    h1: "Convierta el escepticismo del jugador en primeros depósitos",
    sub: "Las marcas de casino nuevas pierden hasta el 70 % de los posibles depositantes por falta de confianza. Mostrar un sello de verificación independiente e inalterable confirma al instante que su licencia está activa y que sus servidores de juego son originales, lo que mejora la tasa de conversión sin fricción en la puesta en marcha.",
    billingTitle: "Detalles del programa de verificación",
  },
  billingNotes: [
    {
      title: "Auditoría y sello gratis durante 6 meses",
      desc: "Obtenga una auditoría completa y muestre el sello verificado gratis durante 6 meses desde la fecha de integración. Sin cargos de alta, sin tarjeta de crédito y sin contratos ocultos.",
    },
    {
      title: "Requisito simple de enlace recíproco",
      desc: "Lo único que pedimos es que la insignia del pie de página enlace a su certificado de auditoría en nuestro sitio. Así los jugadores pueden verificar los rastreos técnicos en tiempo real. Sin reparto de ingresos ni comisiones por referidos.",
    },
    {
      title: "Opciones transparentes tras el periodo de prueba",
      desc: "Antes de que termine su prueba de 6 meses, le ofreceremos opciones de precio de renovación transparentes. No hay cargos automáticos ni suscripciones forzadas: usted mantiene el control total.",
    },
    {
      title: "Opción de retirada inmediata",
      desc: "Basta con quitar el fragmento de código de la insignia del pie de página de su sitio en cualquier momento para terminar la integración. Su historial de comprobaciones permanece archivado en nuestro directorio con todas las marcas de tiempo de la auditoría.",
    },
  ],
  badge: {
    title: "Formatos e integración del sello verificado",
    description:
      "Explore los diseños del sello de Swift Secured, los formatos visuales de la insignia y las pautas técnicas sobre cómo los jugadores verifican los enlaces de auditoría auténticos.",
    eyebrow: "Recursos visuales del sello",
    h1: "Integración de la insignia de Swift Secured y su comportamiento de verificación",
    sub: "Disponible en tres formatos adaptables, diseñados para franjas de pie de página y formularios de registro. Toda insignia auténtica funciona como un enlace criptográfico directo al informe de auditoría en vivo. Las imágenes estáticas sin enlace activo no superan la verificación.",
    primaryTitle: "Insignia estándar",
    primaryBody:
      "Diseñada para pies de página de sitios web, junto a los sellos de licencia. Limpia y con autoridad. Al hacer clic se abre el informe de verificación en vivo del casino, con las pruebas del rastreo de los servidores de juego y las marcas de tiempo de las comprobaciones en el registro.",
    compactTitle: "Variante compacta / de una sola línea",
    compactBody:
      "Formato horizontal pensado para filas de iconos de pago o barras de navegación móviles. Conserva el seguimiento completo de la verificación y lleva exactamente al mismo certificado de auditoría.",
    darkTitle: "Variante de contorno para tema oscuro",
    darkBody:
      "Versión de alto contraste con contorno, diseñada para interfaces de casino oscuras. Mantiene la máxima legibilidad sin comprometer la integridad visual de la marca.",
    ctaHeading: "¿Listo para mostrar el sello verificado en su sitio?",
    ctaButton: "Obtener la certificación",
  },
  faqPage: {
    title: "Preguntas frecuentes",
    description:
      "Respuestas sobre las comprobaciones en los registros de licencias, la detección de tragamonedas manipuladas, la independencia frente a los operadores y los criterios de verificación.",
    eyebrow: "Preguntas frecuentes y transparencia",
    h1: "Preguntas frecuentes de jugadores y operadores",
    ctaHeading:
      "¿Opera un casino? Solicite la auditoría en menos de 2 minutos.",
    ctaButton: "Certifíquese gratis",
  },
  faqs: [
    {
      q: "¿Qué le garantiza a un jugador la insignia de Swift Secured?",
      a: "La insignia demuestra que, en la fecha de auditoría indicada, el dominio del casino estaba registrado de forma activa en los registros oficiales del regulador Y que las peticiones de giro de los juegos se conectaban directamente a servidores certificados del proveedor (lo que confirma tragamonedas originales, sin manipular, con su RTP real).",
    },
    {
      q: "¿Cómo detectan las tragamonedas manipuladas o falsificadas?",
      a: "Durante las pruebas inspeccionamos el tráfico de red saliente cuando se lanza una tragamonedas. Los juegos oficiales transmiten la lógica y los recursos directamente desde dominios certificados del proveedor (por ejemplo, Pragmatic, Evolution). Si un sitio redirige las peticiones de giro a través de servidores proxy intermedios desconocidos para falsear los resultados del juego, se señala como manipulado.",
    },
    {
      q: "¿Puede un casino pagar para ser verificado o para modificar los hallazgos de una auditoría?",
      a: "El pago no tiene absolutamente ninguna influencia. El estado de verificación se determina de forma automática mediante consultas al registro y rastreos técnicos de servidor. Los operadores pueden mostrar las insignias de auditoría, pero no pueden comprar cambios de estado ni borrar el historial de registros.",
    },
    {
      q: "¿Qué significa el estado «sin confirmar» para un casino?",
      a: "«Sin confirmar» significa que nuestro sistema no encontró ningún registro de dominio coincidente en la base de datos oficial del regulador en la fecha de la auditoría. Puede ocurrir si los registros están fuera de servicio, si las aprobaciones de dominio están pendientes o si el operador usa réplicas no registradas. Es una observación factual, no una declaración legal.",
    },
    {
      q: "¿Puede Swift Secured resolver mi disputa por una retirada con un casino?",
      a: "No gestionamos cuentas de jugadores ni procesamos pagos. Sin embargo, nuestro certificado de auditoría incluye enlaces directos a la autoridad de licencias oficial que figura en el registro, donde usted puede presentar reclamaciones regulatorias oficiales.",
    },
    {
      q: "¿Por qué deberían jugadores y operadores confiar en Swift Secured?",
      a: "Porque cada afirmación se puede verificar con un clic. Publicamos las direcciones de búsqueda en los registros y los rastreos de los endpoints de red de las tragamonedas, para que los jugadores no tengan que fiarse de promesas ni de reseñas de afiliados.",
    },
  ],
  about: {
    title: "Acerca de Swift Secured",
    description:
      "Conozca la misión de Swift Secured: ofrecer auditorías de licencias de casino y de servidores de juego transparentes, automatizadas e independientes.",
    eyebrow: "Quiénes somos",
    h1: "Verificación independiente basada en hechos técnicos",
    sub: "Swift Secured realiza auditorías técnicas automatizadas de casinos en línea. Verificamos las entradas en los registros de los reguladores y auditamos las conexiones a los servidores de tragamonedas, y publicamos los hallazgos con marcas de tiempo precisas. Sin posiciones pagadas, sin enlaces de afiliados y sin resultados manipulados.",
    card1Title: "Cero sesgo comercial",
    card1Body:
      "Ningún casino puede comprar un sello verificado sin superar las comprobaciones técnicas. Rechazamos el reparto de ingresos con afiliados, las referencias de pago por clic y las clasificaciones patrocinadas. Los hallazgos son puramente objetivos.",
    card2Title: "Perímetro técnico definido",
    card2Body:
      "Declaramos de forma transparente lo que puede hacer nuestra auditoría: confirmamos los registros oficiales de licencia y que los endpoints de las tragamonedas no están manipulados, e indicamos de forma explícita los límites en cuanto a las finanzas internas del operador o las reglas de apuesta de los jugadores.",
  },
};

export default es;
