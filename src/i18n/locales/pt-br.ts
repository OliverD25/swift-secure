import type { PartialTranslation } from "../types";

/**
 * pt-br. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const ptBR: PartialTranslation = {
  nav: {
    howItWorks: "Como funciona",
    methodology: "O que verificamos",
    pricing: "Para cassinos",
    about: "Sobre",
    faq: "FAQ",
    casinos: "Índice de cassinos",
    verify: "Conferir um selo",
    apply: "Obter certificação",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar um selo",
    apply: "Solicitar o selo",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Opera um cassino online? Aumente a confiança dos jogadores e os primeiros depósitos com uma auditoria independente.",
    button: "Obtenha a certificação grátis",
  },
  seal: {
    certified: "Licença e slots verificados",
  },
  stats: [
    {
      count: "listed",
      label: "Cassinos acompanhados",
    },
    {
      count: "topJurisdiction",
      label: "Licenciados sob {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licenças encontradas no registro",
    },
    {
      count: "badged",
      label: "Exibindo o selo verificado hoje",
    },
  ],
  common: {
    certifiedSince: "Registro datado de",
    viewSealRecord: "Abrir registro de auditoria",
    youProvide: "O que é necessário:",
  },
  home: {
    title:
      "Swift Secured — Verificação independente de cassinos e servidores de jogo",
    description:
      "Verifique as licenças de cassinos nos registros oficiais dos reguladores e detecte slots com script antes de depositar. Auditoria técnica independente com carimbos de data e hora públicos.",
    badge: "Serviço de auditoria independente. 100% imparcial.",
    h1: "Pare de depositar às cegas: verifique a licença e a autenticidade dos servidores de jogo",
    sub: "Auditamos cassinos online em tempo real. Rastreamos os servidores de jogo ao vivo para confirmar que os slots são 100% originais, verificamos o registro ativo da licença e sinalizamos cópias fraudulentas antes que você arrisque seu dinheiro.",
    ctaApply: "O que verificamos",
    ctaVerify: "Conferir um selo",
    howEyebrow: "Como funciona",
    howTitle:
      "Da busca em tempo real no registro à auditoria datada e inalterável",
    criteriaEyebrow: "Padrões de segurança",
    criteriaTitle:
      "O que nossa auditoria verifica — e as regras rígidas por trás dela",
    operatorsEyebrow: "Diretório público",
    operatorsTitle:
      "Cassinos acompanhados em nosso índice — verificados, não confirmados ou sinalizados",
    viewAllCasinos: "Explorar o índice de cassinos",
    ctaHeading: "Metodologia técnica transparente",
    ctaSub:
      "Saiba exatamente como rastreamos as requisições aos servidores de jogo, cruzamos os registros dos reguladores e detectamos RTP manipulado sem aceitar pagamento de operadores por avaliações positivas.",
    ctaButton: "Ler a metodologia",
  },
  criteria: [
    {
      title: "Verificação direta no registro do regulador",
      desc: "Centenas de sites fraudulentos exibem logotipos de licença falsos no rodapé. Verificamos os números de licença e os domínios ativos diretamente nas bases de dados oficiais dos reguladores.",
    },
    {
      title: "Identidade completa do regulador e regras da jurisdição",
      desc: "Os órgãos licenciadores variam muito no nível de proteção que oferecem. Cada registro destaca o nome exato do regulador e o ID da licença, para que você possa julgar a força jurídica por trás dele.",
    },
    {
      title: "Data e hora exatas da verificação",
      desc: "Licenças expiram, são suspensas ou mudam de domínio da noite para o dia. Afirmações estáticas não significam nada — cada registro imprime a data UTC exata em que o sistema fez a consulta.",
    },
    {
      title: "Registros de auditoria que não se compram nem se adulteram",
      desc: "Nenhum cassino pode pagar para alterar resultados, esconder auditorias desfavoráveis ou apagar históricos de registro. O status de verificação muda apenas quando mudam os dados do registro ou os rastreamentos de servidor.",
    },
    {
      title:
        "Auditoria de autenticidade dos servidores de jogo (contra slots com script)",
      desc: "Cassinos falsos copiam os gráficos dos jogos, mas passam a matemática dos giros por servidores privados com RTP manipulado. Inspecionamos as requisições de rede ao vivo para garantir que cada giro se conecte diretamente aos servidores oficiais do provedor.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extrair dados de licença e domínio",
      desc: "Lemos o número de licença declarado, a entidade empresarial e a URL exata de jogo diretamente do front-end público do cassino analisado.",
    },
    {
      n: "2",
      title: "Cruzamento com o registro e rastreamento de servidor",
      desc: "Buscamos na base de dados oficial ativa do regulador emissor as aprovações de domínio correspondentes e analisamos os fluxos websocket/HTTP de saída quando os jogos são iniciados.",
    },
    {
      n: "3",
      title: "Publicar o certificado de auditoria datado",
      desc: "Seja confirmado, ausente ou não verificado, o registro completo da auditoria vai ao ar com um carimbo de data e hora imutável que detalha cada verificação feita.",
    },
    {
      n: "4",
      title: "Verificação independente com um clique",
      desc: "Cada registro traz os links brutos para o registro oficial e as provas do rastreamento de rede, permitindo que os jogadores confirmem os resultados por conta própria.",
    },
  ],
  process: {
    title: "Como funciona — processo de verificação",
    description:
      "Como a Swift Secured audita os dados de licença dos cassinos, rastreia os endpoints originais dos servidores de jogo e publica registros públicos de auditoria à prova de adulteração.",
    eyebrow: "Processo de verificação",
    h1: "Como os cassinos são auditados, verificados e indexados",
    sub: "Nosso procedimento técnico é totalmente automatizado e publicado, o que garante reprodutibilidade completa. Extraímos os IDs de licença publicados, cruzamos as listas oficiais dos reguladores e rastreamos as requisições de jogo ao vivo, sem precisar de acesso ao cassino nem de cadastro do jogador.",
    ctaHeading: "Opera um cassino online licenciado?",
    ctaButton: "Solicitar o selo verificado",
  },
  stages: [
    {
      n: "1",
      title: "Extração de dados públicos e endpoints",
      duration: "Varredura do front-end",
      desc: "Lemos as declarações de licença, os dados societários do operador e as URLs de domínio do site diretamente dos rodapés dos sites analisados. As entradas do rastreador ainda não verificadas são marcadas de forma explícita como não conferidas até que uma extração completa ao vivo seja concluída.",
      provide: "Nada é exigido de jogadores ou operadores.",
    },
    {
      n: "2",
      title: "Registro do regulador e rastreamento de servidor",
      duration: "Somente registro público",
      desc: "Buscamos nas bases de dados oficiais dos reguladores as listas de domínios aprovados. Ao mesmo tempo, abrimos sessões de jogo de teste para confirmar que a matemática do jogo carrega diretamente das CDNs do provedor (por exemplo, Pragmatic, Evolution).",
      provide: "Sem cadastro nem taxa.",
    },
    {
      n: "3",
      title: "Publicação independente do status e do carimbo de data e hora",
      duration: "Leitura gratuita",
      desc: 'Os resultados são gerados na hora, com a data exata da verificação. Se a licença não for encontrada ou a validação do domínio falhar, o registro declara de forma transparente "não confirmado", em vez de esconder os resultados.',
      provide: "Acesso público e aberto a todos os usuários.",
    },
    {
      n: "4",
      title: "Monitoramento contínuo e ciclos de reverificação",
      duration: "A cada reverificação",
      desc: "Registros e domínios de jogo mudam com o tempo. Quando uma reverificação acontece, o status e a data são atualizados automaticamente. Os históricos das verificações anteriores continuam arquivados para impedir mudanças silenciosas.",
      provide: "Sempre confira a data da auditoria no selo.",
    },
  ],
  methodology: {
    title: "Metodologia técnica de auditoria",
    description:
      "Especificação completa da verificação: como conferimos os registros dos reguladores, auditamos os servidores originais dos slots, registramos as datas e revogamos selos quando as licenças expiram.",
    eyebrow: "Metodologia e escopo",
    h1: "Metodologia técnica de verificação e limite operacional",
    sub: "As auditorias são feitas de fora, do ponto de vista de um jogador comum, sem acesso especial nem intervenção do operador. Testamos os números de licença publicados, conferimos as aprovações de domínio ativas nos registros oficiais e rastreamos as requisições ao vivo dos servidores de slots. Cada resultado é datado e publicado.",
    checksTitle: "Parâmetros técnicos verificados",
    limitsTitle: "Limites e limitações da auditoria",
    limitsSub:
      "Toda auditoria técnica tem limites rígidos. Declaramos de forma explícita o que verificamos (validade da licença, servidores oficiais dos slots) e o que não pode ser auditado de fora (contabilidade interna, decisões individuais de saque).",
    monitoringTitle: "Datação obrigatória e monitoramento",
    monitoringBody:
      "As bases de dados dos reguladores mudam o tempo todo: licenças expiram, domínios são trocados, certificados são revogados. Uma verificação só é exata para o momento exato em que foi feita. Exibimos a data da verificação em destaque. Datas antigas disparam uma nova auditoria automatizada. Resultados arquivados nunca são sobrescritos em silêncio.",
    suspensionTitle: "Regras automáticas de revogação do selo",
    suspensionBody:
      "Se uma licença desaparece de um registro ou um site passa a usar servidores de jogo com script, o status do selo é atualizado na hora. Reclamações ou denúncias de concorrentes não alteram o status diretamente — elas disparam uma reverificação automatizada. Nenhuma taxa ou patrocínio restaura um selo para uma licença inválida.",
    ctaHeading: "Sempre verifique um cassino antes de depositar.",
    ctaButton: "Buscar no índice de cassinos",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Correspondência de licença e registro",
      summary:
        "Confirma o registro oficial da licença e verifica o domínio de jogo ativo nos registros do regulador.",
      checks: [
        "ID da licença extraído diretamente do front-end do operador",
        "Conferido na base de dados oficial do regulador emissor",
        "Domínio ativo do site cruzado com a lista de aprovados",
        "Transparência total sobre os parâmetros da jurisdição",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Auditoria de autenticidade dos servidores de jogo",
      summary:
        "Garante que os slots rodem nas CDNs genuínas dos provedores, evitando jogos falsificados com RTP manipulado.",
      checks: [
        "Inspeção das requisições de rede durante a inicialização do jogo",
        "Verificação dos endpoints de matemática do jogo (Pragmatic, Play'n GO, Hacksaw etc.)",
        "Detecção de servidores proxy e espelhos falsos de slots",
        "Confirmação de configurações do provedor sem alterações",
      ],
    },
    {
      id: "dated-records",
      name: "Prova de data e hora",
      summary:
        "Cada resultado carrega um carimbo UTC imutável que mostra exatamente quando o sistema auditou o site.",
      checks: [
        "Data da verificação impressa com clareza ao lado do status",
        "Entradas não verificadas identificadas de forma explícita",
        "Históricos de registro visíveis",
        "Atualização imediata do status após nova auditoria",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantias de independência",
      summary:
        "Zero viés de afiliação, zero alterações de status pagas e zero rankings promocionais.",
      checks: [
        "Sem links de afiliados nem indicações de cassinos por pagamento por clique",
        "Sem melhorias de nota pagas nem posições de selo patrocinadas",
        "Resultados técnicos objetivos acima de opiniões editoriais",
        "Procedimento aberto para o jogador verificar por conta própria",
      ],
    },
  ],
  limits: [
    {
      title: "RTP dos jogos e geradores de números aleatórios (RNG)",
      desc: "Avaliar o RTP estatístico de longo prazo ou a aleatoriedade do RNG exige acesso aos servidores internos e milhões de giros registrados ao longo de milhões de rodadas. Embora confirmemos que os slots se conectam diretamente aos servidores oficiais dos provedores (que usam laboratórios de teste credenciados, como iTech Labs ou eCOGRA), nós mesmos não realizamos testes laboratoriais independentes de RNG.",
    },
    {
      title: "Procedimentos internos de conta e bancários",
      desc: "As auditorias são feitas do ponto de vista de um visitante. A verificação de identidade do jogador (KYC), o encerramento de contas, os requisitos de aposta dos bônus e as filas de processamento de pagamentos permanecem privados dentro do software do cassino e ficam fora das verificações técnicas externas.",
    },
    {
      title: "Segurança garantida dos saques",
      desc: "Auditorias externas não conseguem inspecionar as contas bancárias privadas nem as reservas de liquidez de um operador de cassino. Uma licença válida e slots originais confirmam a conformidade regulatória e a autenticidade dos jogos, mas não podem garantir solvência operacional nem velocidade de pagamento.",
    },
    {
      title: 'Recomendações subjetivas de "cassino seguro"',
      desc: "Uma licença é uma permissão regulatória sujeita a condições. Os requisitos variam bastante entre as jurisdições (por exemplo, MGA, Curacao, Anjouan). Em 4 de agosto de 2026, 215 dos 223 cassinos indexados têm credenciais de Anjouan. Fornecemos fatos brutos e provas de servidor para que você decida com informação — nunca emitimos garantias genéricas de segurança.",
    },
  ],
  directory: {
    certified: {
      label: "Licença e slots verificados",
      desc: "Número de licença confirmado no registro do regulador E servidores de jogo verificados como endpoints autênticos do provedor na data da auditoria.",
    },
    scanned: {
      label: "Não confirmado / ausente no registro",
      desc: "A busca não encontrou correspondência oficial no registro para o domínio na data da auditoria. O operador pode usar um domínio não listado, um licenciamento não indexado ou operar sem permissão pública.",
    },
    listed: {
      label: "Entrada não verificada",
      desc: "Indexado a partir de fontes públicas da web. A varredura automatizada de back-end e o rastreamento dos servidores de slots ainda não foram feitos para este site.",
    },
    flagged: {
      label: "Sinalizado / divergência encontrada",
      desc: "A auditoria detectou inconsistências: por exemplo, domínios divergentes, selos de licença quebrados ou redirecionamentos por servidor proxy durante a inicialização dos slots.",
    },
    statusFilterAll: "Todos os status",
    lastScanned: "Data da auditoria",
    viewReport: "Ver relatório completo",
  },
  casinos: {
    title: "Diretório de cassinos verificados",
    description:
      "Diretório de cassinos online acompanhados pela Swift Secured. Confira o status atual das licenças, as entradas oficiais nos registros dos reguladores e os resultados da auditoria dos servidores de jogo.",
    eyebrow: "Diretório de cassinos",
    h1: "Diretório de auditoria de cassinos online",
    sub: "Busque os cassinos acompanhados para ver o status no registro da licença, as jurisdições emissoras e os históricos de verificação dos servidores de jogo. A presença na lista não significa recomendação.",
    searchPlaceholder: "Busque por nome do cassino, domínio ou jurisdição...",
    searchLabel: "Buscar cassinos auditados",
    empty: "Nenhum cassino corresponde aos seus parâmetros de busca.",
  },
  checker: {
    inputPlaceholder: "Digite o nome ou o site do cassino (ex.: Lucky Coin Casino ou luckycoin.cash)",
    inputLabel: "Nome do cassino, endereço do site ou número da licença",
    button: "Consultar",
    steps: [
      { n: "1", title: "Digite o nome ou o site do cassino" },
      { n: "2", title: "Consultamos nosso índice de auditoria" },
      { n: "3", title: "Leia o registro da licença e da varredura" },
    ],
    footnote: "{count} cassinos indexados. Informamos o número de licença que o cassino publica, se ele consta no registro do próprio órgão regulador emissor e a data da consulta.",
    emptyInput: "Digite primeiro o nome do cassino, o endereço do site ou o número da licença.",
    recordEyebrow: "Registro do índice",
    jurisdiction: "Jurisdição",
    operator: "Empresa licenciada",
    licence: "Número da licença",
    licenceNone: "Nenhum publicado",
    licenceExpiry: "Validade da licença",
    licenceExpired: "Esta data já passou. Peça ao cassino uma licença atual.",
    licenceMatched: "Encontrado em {registry} na consulta de {date}",
    licenceSecondhand: "Obtido de fontes públicas. Ainda não localizado em um registro.",
    scan: "Varredura técnica",
    scanNone: "Ainda não realizada",
    noteLabel: "O que observamos",
    viewRecord: "Abrir o registro completo",
    multipleTitle: "Mais de um cassino corresponde à busca",
    multipleBody: "Escolha o que você procura.",
    notFoundTitle: "Não está no índice",
    notFoundBody: "Não temos registro com esse nome, endereço ou número de licença. Isso não é uma constatação contra o cassino — significa apenas que ainda não o indexamos.",
    notFoundBrowse: "Ver o índice",
    notFoundApply: "Peça uma verificação",
  },
  verify: {
    title: "Verificar a autenticidade do selo",
    description:
      "Digite um ID de selo Swift Secured para confirmar o status de verificação ao vivo de um operador e evitar o uso de selos falsos.",
    h1: "Verificar um selo Swift Secured",
    sub: "Digite o ID único do selo exibido no site de um cassino para confirmar a validade da auditoria oficial e inspecionar os rastreamentos de verificação por trás dela.",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "ID do selo",
    button: "Verificar selo",
    validStatus: "Selo verificado válido e ativo",
    operator: "Marca do cassino / operador:",
    jurisdiction: "Jurisdição do regulador:",
    lastChecked: "Data da última auditoria:",
    invalidStatus: "ID de selo não registrado / inválido",
    invalidBody:
      "Não existe registro de verificação ativo para este ID. O site que exibe esta marca pode estar usando uma imagem de selo não aprovada ou falsificada. Se você suspeita de fraude,",
    contactUs: "fale com nossa equipe",
  },
  apply: {
    title: "Solicitação de certificação para cassinos",
    description:
      "Inscreva a marca do seu cassino online para uma auditoria independente de licença e de servidores de jogo. Construa a confiança do jogador e aumente os primeiros depósitos (FTD).",
    eyebrow: "Soluções para operadores",
    h1: "Tenha seu cassino auditado e verificado",
    sub: "Formulário para operadores de cassino e donos de plataforma. Exibir um selo verificado da Swift Secured comprova a validade da sua licença e a autenticidade dos servidores de slots, removendo o atrito do jogador na hora do depósito. As auditorias são gratuitas nos primeiros 6 meses.",
    fieldName: "Nome da marca do cassino",
    fieldNamePlaceholder: "Nome principal da marca visto pelo jogador",
    fieldWebsite: "Domínio ativo do site",
    fieldJurisdiction: "Regulador licenciador",
    fieldJurisdictionPlaceholder: "ex. Anjouan, Curacao GCB, MGA",
    fieldEmail: "E-mail corporativo de contato",
    fieldMessage: "Notas técnicas adicionais",
    fieldMessagePlaceholder:
      "Número da licença, URL direta de validação ou contato técnico",
    submit: "Enviar para auditoria",
    successTitle: "Solicitação enviada com sucesso",
    successBody:
      "Nosso sistema e nossa equipe de conformidade vão analisar seu domínio e executar testes de rastreamento dos servidores de jogo. Você receberá uma atualização do status da auditoria em {email} dentro de 24 a 48 horas.",
  },
  pricing: {
    title: "Condições e preços do selo verificado",
    description:
      "Selo de verificação gratuito por 6 meses para cassinos online. Sem taxa de instalação, sem cartão de crédito, sem divisão de receita. Transforme a dúvida do jogador em depósitos.",
    eyebrow: "Soluções para operadores",
    h1: "Transforme o ceticismo do jogador em primeiros depósitos",
    sub: "Marcas novas de cassino perdem até 70% dos possíveis depositantes por falta de confiança. Exibir um selo de verificação independente e à prova de adulteração confirma na hora sua licença ativa e seus servidores de jogo originais, elevando as taxas de conversão sem atrito de implantação.",
    billingTitle: "Detalhes do programa de verificação",
  },
  billingNotes: [
    {
      title: "Auditoria e selo grátis por 6 meses",
      desc: "Seja auditado por completo e exiba o selo verificado de graça por 6 meses a partir da data da integração. Sem taxas de instalação, sem cartão de crédito e sem contratos ocultos.",
    },
    {
      title: "Requisito simples de link recíproco",
      desc: "Tudo o que pedimos é que o selo do rodapé aponte para o certificado de auditoria dedicado ao seu site em nosso site. Isso permite que os jogadores confiram os rastreamentos técnicos em tempo real. Sem divisão de receita nem taxas de indicação.",
    },
    {
      title: "Opções transparentes após o período gratuito",
      desc: "Antes de terminarem os 6 meses de teste, apresentaremos opções transparentes de preço para renovação. Não há cobranças automáticas nem assinaturas forçadas — o controle é todo seu.",
    },
    {
      title: "Remoção imediata quando quiser",
      desc: "Basta remover o trecho de código do selo do rodapé do seu site a qualquer momento para encerrar a integração. Seus registros históricos de verificação continuam arquivados em nosso diretório, com todos os carimbos de data e hora da auditoria.",
    },
  ],
  badge: {
    title: "Formatos do selo verificado e integração",
    description:
      "Conheça os designs do selo Swift Secured, os formatos visuais do selo e as orientações técnicas sobre como os jogadores conferem links de auditoria autênticos.",
    eyebrow: "Recursos visuais do selo",
    h1: "Integração do selo Swift Secured e comportamento da verificação",
    sub: "Disponível em três formatos responsivos, pensados para faixas de rodapé e formulários de cadastro. Todo selo autêntico funciona como link criptográfico direto para o relatório de auditoria ao vivo. Imagens estáticas sem links ativos não passam na verificação.",
    primaryTitle: "Selo padrão",
    primaryBody:
      "Feito para rodapés de site, ao lado dos selos de licença. Limpo e com autoridade. O clique abre o relatório de verificação ao vivo do cassino, com as provas do rastreamento dos servidores de jogo e os carimbos de data e hora das consultas ao registro.",
    compactTitle: "Variante compacta / de uma linha",
    compactBody:
      "Formato horizontal, feito para fileiras de ícones de pagamento ou barras de navegação em celular. Mantém todo o rastreamento de verificação e leva exatamente ao mesmo certificado de auditoria.",
    darkTitle: "Variante de contorno para tema escuro",
    darkBody:
      "Versão em contorno de alto contraste, estilizada para interfaces escuras de cassino. Mantém a legibilidade máxima sem comprometer a integridade visual da marca.",
    ctaHeading: "Pronto para exibir o selo verificado no seu site?",
    ctaButton: "Obter a certificação",
  },
  faqPage: {
    title: "Perguntas frequentes",
    description:
      "Respostas sobre as consultas aos registros de licença, a detecção de slots com script, a independência em relação aos operadores e os critérios de verificação.",
    eyebrow: "FAQ e transparência",
    h1: "Perguntas frequentes de jogadores e operadores",
    ctaHeading: "Opera um cassino? Solicite a auditoria em menos de 2 minutos.",
    ctaButton: "Obtenha a certificação grátis",
  },
  faqs: [
    {
      q: "O que o selo Swift Secured garante a um jogador?",
      a: "O selo comprova que, na data de auditoria indicada, o domínio do cassino estava registrado ativamente nos registros oficiais do regulador E as requisições de giro dos jogos se conectavam diretamente a servidores certificados dos provedores (confirmando slots originais e sem script, com RTP original).",
    },
    {
      q: "Como vocês detectam slots com script ou falsificados?",
      a: "Durante os testes, inspecionamos o tráfego de rede de saída quando os slots são iniciados. Os jogos oficiais transmitem a matemática e os recursos diretamente dos domínios certificados dos provedores (por exemplo, Pragmatic, Evolution). Se um site desvia as requisições de giro por servidores proxy intermediários desconhecidos para forjar os resultados do jogo, ele é sinalizado como com script.",
    },
    {
      q: "Um cassino pode pagar para ser verificado ou para alterar os resultados da auditoria?",
      a: "Zero influência de pagamento, em absoluto. O status de verificação é definido automaticamente por consultas ao registro e por rastreamentos técnicos de servidor. Os operadores podem exibir os selos de auditoria, mas não podem comprar mudanças de status nem apagar os históricos de registro.",
    },
    {
      q: 'O que o status "não confirmado" significa para um cassino?',
      a: "Não confirmado significa que nosso sistema não encontrou registro de domínio correspondente na base de dados oficial do regulador na data da auditoria. Isso pode acontecer se os registros ficarem fora do ar, se as aprovações de domínio estiverem pendentes ou se o operador usar espelhos não registrados. É uma observação factual, não uma declaração jurídica.",
    },
    {
      q: "A Swift Secured pode resolver minha disputa de saque com um cassino?",
      a: "Não administramos contas de jogadores nem processamos pagamentos. Porém, nosso certificado de auditoria traz links diretos para a autoridade licenciadora indicada no registro, onde você pode apresentar reclamações regulatórias oficiais.",
    },
    {
      q: "Por que jogadores e operadores devem confiar na Swift Secured?",
      a: "Porque toda afirmação pode ser conferida com um clique. Publicamos os destinos brutos das buscas nos registros e os rastreamentos dos endpoints de rede dos slots, para que os jogadores não precisem depender de promessas nem de análises de afiliados.",
    },
  ],
  about: {
    title: "Sobre a Swift Secured",
    description:
      "Conheça a missão da Swift Secured: entregar auditorias de licença de cassino e de servidores de jogo transparentes, automatizadas e independentes.",
    eyebrow: "Sobre nós",
    h1: "Verificação independente construída sobre fatos técnicos",
    sub: "A Swift Secured faz auditorias técnicas automatizadas de cassinos online. Verificamos as entradas nos registros dos reguladores e auditamos as conexões dos servidores de slots, publicando os resultados com carimbos de data e hora precisos. Sem posições pagas, sem links de afiliados e sem resultados adulterados.",
    card1Title: "Zero viés comercial",
    card1Body:
      "Nenhum cassino pode comprar um selo verificado sem passar nas verificações técnicas. Recusamos divisão de receita de afiliados, indicações por pagamento por clique e rankings patrocinados. Os resultados permanecem puramente objetivos.",
    card2Title: "Perímetro técnico definido",
    card2Body:
      "Declaramos com transparência o que a auditoria consegue fazer: confirmamos os registros oficiais de licença e os endpoints de slots sem script, ao mesmo tempo em que apontamos de forma explícita os limites quanto às finanças internas do operador ou às regras de aposta dos jogadores.",
  },
};

export default ptBR;
