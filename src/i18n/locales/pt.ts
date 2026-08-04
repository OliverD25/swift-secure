import type { PartialTranslation } from "../types";

const pt: PartialTranslation = {
  nav: {
    howItWorks: "Como funciona",
    methodology: "Metodologia",
    pricing: "Preços",
    about: "Sobre nós",
    faq: "FAQ",
    casinos: "Casinos",
    verify: "Verificar",
    apply: "Candidatura",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar um selo",
    apply: "Candidatura",
    faq: "FAQ",
  },
  stickyCta: {
  },
  seal: {
    certified: "Certificado",
  },
  common: {
    certifiedSince: "Certificado desde",
    viewSealRecord: "Ver registo do selo",
    youProvide: "O que fornece:",
  },
  home: {
    title: "Swift Secured",
    ctaVerify: "Verificar um selo",
    howEyebrow: "Como funciona",
  },
  process: {
  },
  pricing: {
    title: "Preços",
  },
  methodology: {
    title: "Metodologia de verificação",
    description:
      "Exatamente o que a Swift Secured verifica antes de emitir um selo, com que frequência repete a verificação e o que assumidamente não afirma verificar.",
    eyebrow: "Metodologia",
    h1: "O que o selo significa de facto",
    sub: "Uma marca de confiança só vale aquilo que a sustenta. Esta é a metodologia completa — incluindo as verificações que não fazemos, para ninguém ter de adivinhar.",
    checksTitle: "O que verificamos",
    limitsTitle: "O que não verificamos",
    limitsSub:
      "Publicado de propósito. Um selo que sugere mais do que verifica é pior do que não existir selo, e é esta a linha que mantemos quando algo corre mal num operador que exibe o nosso selo.",
    suspensionTitle: "Como um selo é suspenso",
    suspensionBody:
      "Se chegar uma reclamação ou o crawler detetar algo anormal, o operador tem 48 horas para responder em privado antes de qualquer alteração pública — isso protege contra denúncias falsas da concorrência. Se o problema for real, o selo é retirado e a página de verificação é atualizada com os factos. Não removemos páginas a troco de pagamento e não há taxa que faça desaparecer uma conclusão.",
    ctaHeading: "Quer a sua plataforma verificada?",
    ctaButton: "Pedir uma análise",
  },
  directory: {
    scanned: {
      label: "Analisado",
      desc: "Verificado automaticamente pelo nosso crawler. Sem relação comercial e sem selo emitido.",
    },
    listed: {
      label: "Listado",
      desc: "Consta do nosso índice a partir de fontes públicas. Ainda não foi feita qualquer verificação e nada aqui é recomendado.",
    },
    flagged: {
      label: "A rever",
      desc: "A verificação automática encontrou algo que exige análise humana antes de qualquer conclusão.",
    },
    statusFilterAll: "Todos",
    lastScanned: "Última verificação",
    viewReport: "Ver relatório",
  },
  casinos: {
    title: "Diretório de casinos",
    description: "Diretório de novos casinos online acompanhados pela Swift Secured, cada um com o estado de verificação atual.",
    eyebrow: "Diretório",
    h1: "Diretório de casinos",
    sub: "Cada novo casino que indexamos, com o estado atual. A maioria está listada a partir de fontes públicas e ainda não foi analisada — o estado em cada cartão indica quais.",
    searchPlaceholder: "Pesquisar por nome do casino ou jurisdição",
    searchLabel: "Pesquisar casinos certificados",
    empty: "Nenhum casino corresponde a essa pesquisa.",
  },
  verify: {
    title: "Verificar um selo",
    description: "Introduza o ID do selo apresentado no site de um casino para confirmar que é autêntico e está atualmente certificado pela Swift Secured.",
    h1: "Verificar um selo",
    sub: "Introduza o ID do selo apresentado no site do casino para confirmar que é autêntico e está em vigor.",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "ID do selo",
    button: "Verificar",
    validStatus: "Selo válido e ativo",
    operator: "Operador:",
    jurisdiction: "Jurisdição:",
    invalidStatus: "Nenhum selo correspondente",
    contactUs: "contacte-nos",
  },
  apply: {
    title: "Pedir certificação",
    description: "Obtenha o selo Swift Secured em apenas 10 dias. Fale-nos da sua plataforma — a nossa equipa de compliance responde em 48 horas.",
    eyebrow: "Pedir certificação",
    h1: "Obtenha o seu selo em apenas 10 dias",
    sub: "Fale-nos da sua plataforma. A nossa equipa de compliance responde em 48 horas.",
    fieldName: "Nome do casino",
    fieldWebsite: "URL do site",
    fieldJurisdiction: "Jurisdição de licenciamento",
    fieldJurisdictionPlaceholder: "ex. Malta, Curacao",
    fieldEmail: "Email de contacto",
    fieldMessage: "Mais alguma coisa que devamos saber?",
    fieldMessagePlaceholder: "Data de lançamento, mercados-alvo, auditorias em curso...",
    submit: "Enviar candidatura",
    successTitle: "Candidatura recebida",
    successBody: "A nossa equipa contacta {email} no prazo de 48 horas para iniciar a auditoria.",
  },
  about: {
  },
  faqPage: {
    title: "FAQ",
    eyebrow: "FAQ",
    h1: "Perguntas frequentes",
    ctaHeading: "Ainda tem dúvidas?",
    ctaButton: "Fale connosco",
  },
  badge: {
    title: "O selo Swift Secured",
    description: "Referência de marca do selo de certificação Swift Secured: distintivo principal, versão compacta e variante para fundo escuro.",
    eyebrow: "O selo",
    h1: "Swift Secured",
    sub: "Um distintivo, três formas. Simples o suficiente para ficar ao lado de um logótipo no rodapé, claro o suficiente para dizer algo num relance.",
    primaryTitle: "Selo principal",
    primaryBody:
      "O distintivo completo, para o topo da página inicial ou o rodapé. Uma espessura de traço, uma cor de destaque, sem gradientes nem ornamentos — tem de ler-se bem em qualquer tamanho, mesmo reduzido a 60px.",
    compactTitle: "Versão compacta",
    compactBody: "Para uma página de pagamento, uma barra de rodapé ou onde o espaço horizontal seja reduzido. Mesmo ícone, mesmo logótipo, numa só linha.",
    darkTitle: "Variante para fundo escuro",
    darkBody:
      "Para sites de casino com tema escuro: o anel passa a ícone de contorno e o texto a branco, para se manter legível sem precisar de uma base branca.",
    ctaHeading: "Quer mostrar a Swift Secured no seu site?",
    ctaButton: "Pedir certificação",
  },
};

export default pt;
