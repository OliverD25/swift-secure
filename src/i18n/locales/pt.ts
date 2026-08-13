import type { PartialTranslation } from "../types";

/**
 * pt. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const pt: PartialTranslation = {
  nav: {
    howItWorks: "Como funciona",
    methodology: "O que verificamos",
    pricing: "Para casinos",
    about: "Sobre",
    faq: "FAQ",
    casinos: "Índice de casinos",
    verify: "Verificar um selo",
    apply: "Obter certificação",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar um selo",
    apply: "Pedir o selo",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Explora um casino online? Aumente a confiança dos jogadores e os primeiros depósitos com uma auditoria independente.",
    button: "Obter certificação gratuita",
  },
  seal: {
    certified: "Licença e slots verificados",
  },
  stats: [
    {
      count: "listed",
      label: "Casinos monitorizados",
    },
    {
      count: "topJurisdiction",
      label: "Licenciados sob {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licenças encontradas no registo",
    },
    {
      count: "badged",
      label: "A exibir o selo verificado hoje",
    },
  ],
  common: {
    certifiedSince: "Registo datado de",
    viewSealRecord: "Abrir registo de auditoria",
    youProvide: "O que é necessário:",
  },
  home: {
    title:
      "Swift Secured — Verificação independente de casinos e servidores de jogo",
    description:
      "Verifique as licenças dos casinos nos registos oficiais dos reguladores e detete slots manipuladas antes de depositar. Auditoria técnica independente com datas públicas.",
    badge: "Serviço de auditoria independente. 100% imparcial.",
    h1: "Pare de depositar às cegas: verifique a licença e a autenticidade dos servidores de jogo",
    sub: "Auditamos casinos online em tempo real. Seguimos os servidores de jogo em direto para confirmar que as slots são 100% originais, verificamos o registo ativo da licença e sinalizamos cópias fraudulentas antes de arriscar o seu dinheiro.",
    ctaApply: "O que verificamos",
    ctaVerify: "Verificar um selo",
    howEyebrow: "Como funciona",
    howTitle:
      "Da pesquisa em tempo real no registo à auditoria datada e inalterável",
    criteriaEyebrow: "Normas de segurança",
    criteriaTitle:
      "O que a nossa auditoria verifica — e as regras rigorosas que a sustentam",
    operatorsEyebrow: "Diretório público",
    operatorsTitle:
      "Casinos monitorizados no nosso índice — verificados, não confirmados ou sinalizados",
    viewAllCasinos: "Explorar o índice de casinos",
    ctaHeading: "Metodologia técnica transparente",
    ctaSub:
      "Saiba exatamente como seguimos os pedidos aos servidores de jogo, cruzamos os registos dos reguladores e detetamos RTP manipulado, sem aceitar pagamentos de operadores por avaliações positivas.",
    ctaButton: "Ler a metodologia",
  },
  criteria: [
    {
      title: "Verificação direta no registo do regulador",
      desc: "Centenas de sites fraudulentos mostram logótipos de licença falsos no rodapé. Verificamos os números de licença e os domínios ativos diretamente nas bases de dados oficiais dos reguladores.",
    },
    {
      title: "Identidade completa do regulador e regras da jurisdição",
      desc: "Os organismos de licenciamento diferem muito no nível de proteção. Cada registo indica o nome exato do regulador e o número da licença, para que possa avaliar a força legal por trás dela.",
    },
    {
      title: "Data e hora exatas da verificação",
      desc: "As licenças caducam, são suspensas ou mudam de domínio de um dia para o outro. Afirmações estáticas não valem nada — cada registo indica a data UTC exata em que o sistema fez a consulta.",
    },
    {
      title: "Registos de auditoria que não se compram nem se alteram",
      desc: "Nenhum casino pode pagar para alterar conclusões, esconder maus resultados de auditoria ou apagar históricos de registo. O estado de verificação só muda quando mudam os dados do registo oficial ou os rastreios dos servidores.",
    },
    {
      title:
        "Auditoria de servidores de jogo autênticos (anti-slots com script)",
      desc: "Os casinos falsos copiam os gráficos dos jogos, mas encaminham a matemática das rodadas por servidores privados com RTP viciado. Inspecionamos os pedidos de rede em direto para garantir que cada rodada liga diretamente aos servidores oficiais do fornecedor.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extrair os dados da licença e do domínio",
      desc: "Recolhemos o número de licença declarado, a entidade societária e o URL de jogo exato diretamente da parte pública do casino analisado.",
    },
    {
      n: "2",
      title: "Cruzamento com o registo e rastreio dos servidores",
      desc: "Pesquisamos a base de dados oficial e ativa do regulador emissor à procura de domínios aprovados correspondentes e analisamos os fluxos websocket/HTTP de saída quando os jogos arrancam.",
    },
    {
      n: "3",
      title: "Publicar o certificado de auditoria datado",
      desc: "Seja confirmado, em falta ou não verificado, o registo de auditoria completo é publicado com uma data imutável que detalha cada verificação realizada.",
    },
    {
      n: "4",
      title: "Verificação independente com um clique",
      desc: "Cada registo inclui as ligações diretas ao registo oficial e a prova do rastreio de rede, permitindo aos jogadores confirmar as conclusões por si próprios.",
    },
  ],
  process: {
    title: "Como funciona — processo de verificação",
    description:
      "Como a Swift Secured audita os dados de licença dos casinos, rastreia os endpoints originais dos servidores de jogo e publica registos de auditoria públicos e inalteráveis.",
    eyebrow: "Processo de verificação",
    h1: "Como os casinos são auditados, verificados e indexados",
    sub: "O nosso procedimento técnico é totalmente automatizado e publicado, o que garante total reprodutibilidade. Extraímos os números de licença publicados, cruzamos as listas oficiais dos reguladores e rastreamos os pedidos de jogo em direto, sem precisar de acesso do casino nem de registo do jogador.",
    ctaHeading: "Explora um casino online licenciado?",
    ctaButton: "Pedir o selo verificado",
  },
  stages: [
    {
      n: "1",
      title: "Extração de dados públicos e de endpoints",
      duration: "Análise do frontend",
      desc: "Recolhemos as declarações de licença, os dados societários do operador e os domínios do site diretamente dos rodapés dos sites analisados. As entradas ainda não verificadas são marcadas explicitamente como não verificadas até estar concluída uma extração completa em direto.",
      provide: "Nada é exigido a jogadores ou operadores.",
    },
    {
      n: "2",
      title: "Registo do regulador e rastreio dos servidores",
      duration: "Apenas registo público",
      desc: "Pesquisamos nas bases de dados oficiais dos reguladores as listas de domínios aprovados. Em paralelo, iniciamos sessões de jogo de teste para confirmar que a matemática do jogo é carregada diretamente das CDN dos fornecedores (por exemplo, Pragmatic, Evolution).",
      provide: "Não é necessário registo nem pagamento.",
    },
    {
      n: "3",
      title: "Publicação independente do estado e da data",
      duration: "Leitura gratuita",
      desc: 'Os resultados são gerados de imediato com a data exata da verificação. Se a licença não for encontrada ou se a validação do domínio falhar, o registo indica de forma transparente "não confirmado", em vez de esconder as conclusões.',
      provide: "Acesso público e aberto a todos os utilizadores.",
    },
    {
      n: "4",
      title: "Monitorização contínua e ciclos de nova verificação",
      duration: "Em cada nova verificação",
      desc: "Os registos oficiais e os domínios de jogo mudam ao longo do tempo. Quando ocorre uma nova verificação, o estado e a data são atualizados automaticamente. Os históricos das verificações anteriores ficam arquivados, para impedir alterações silenciosas.",
      provide: "Verifique sempre a data da auditoria no selo.",
    },
  ],
  methodology: {
    title: "Metodologia da auditoria técnica",
    description:
      "Especificação completa da verificação: como consultamos os registos dos reguladores, auditamos os servidores originais das slots, registamos datas e retiramos selos quando as licenças caducam.",
    eyebrow: "Metodologia e âmbito",
    h1: "Metodologia de verificação técnica e limites da operação",
    sub: "As auditorias são feitas do exterior, na perspetiva de um jogador comum, sem acesso especial nem intervenção do operador. Testamos os números de licença publicados, verificamos os domínios ativos aprovados nos registos oficiais e rastreamos os pedidos aos servidores de slots em direto. Cada conclusão é datada e publicada.",
    checksTitle: "Parâmetros técnicos verificados",
    limitsTitle: "Limites e restrições da auditoria",
    limitsSub:
      "Toda a auditoria técnica tem limites rigorosos. Dizemos claramente o que verificamos (validade da licença, servidores oficiais das slots) e o que não pode ser auditado do exterior (contabilidade interna, decisões individuais sobre levantamentos).",
    monitoringTitle: "Datação obrigatória e monitorização",
    monitoringBody:
      "As bases de dados dos reguladores mudam constantemente: as licenças caducam, os domínios mudam ou os certificados são revogados. Uma verificação só é exata para o momento exato em que foi feita. Mostramos a data da verificação de forma bem visível. Datas antigas dão origem a uma nova auditoria automática. As conclusões arquivadas nunca são substituídas em silêncio.",
    suspensionTitle: "Regras de retirada automática do selo",
    suspensionBody:
      "Se uma licença desaparecer de um registo oficial ou se um site passar a usar servidores de jogo com script, o estado do selo é atualizado de imediato. Queixas ou denúncias de concorrentes não alteram o estado diretamente — desencadeiam uma nova verificação automática. Nenhum pagamento ou patrocínio pode repor um selo para uma licença inválida.",
    ctaHeading: "Verifique sempre um casino antes de depositar.",
    ctaButton: "Pesquisar no índice de casinos",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Correspondência entre licença e registo",
      summary:
        "Confirma o registo oficial da licença e verifica o domínio de jogo ativo nos registos do regulador.",
      checks: [
        "Número de licença extraído diretamente do frontend do operador",
        "Verificado na base de dados oficial do regulador emissor",
        "Domínio ativo do site cruzado com a lista de domínios aprovados",
        "Total transparência sobre os parâmetros da jurisdição",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Auditoria de servidores de jogo autênticos",
      summary:
        "Garante que as slots correm nas CDN genuínas dos fornecedores, evitando jogos falsificados com RTP manipulado.",
      checks: [
        "Inspeção dos pedidos de rede durante o arranque do jogo",
        "Verificação dos endpoints da matemática do jogo (Pragmatic, Play'n GO, Hacksaw, etc.)",
        "Deteção de servidores proxy e de cópias falsas de slots",
        "Confirmação de configurações do fornecedor sem alterações",
      ],
    },
    {
      id: "dated-records",
      name: "Prova de data e hora",
      summary:
        "Cada conclusão tem uma data UTC imutável que mostra exatamente quando o sistema auditou o site.",
      checks: [
        "Data da verificação indicada de forma clara junto ao estado",
        "Entradas não verificadas identificadas de forma explícita",
        "Históricos de verificação visíveis",
        "Atualização imediata do estado após nova auditoria",
      ],
    },
    {
      id: "strict-independence",
      name: "Garantias de independência",
      summary:
        "Zero enviesamento de afiliados, zero alterações de estado pagas e zero rankings promocionais.",
      checks: [
        "Sem links de afiliados nem referências a casinos pagas por clique",
        "Sem melhorias de classificação pagas nem posições de selo patrocinadas",
        "Conclusões técnicas objetivas em vez de opiniões editoriais",
        "Procedimento aberto para o jogador verificar por si próprio",
      ],
    },
  ],
  limits: [
    {
      title: "RTP dos jogos e geradores de números aleatórios (RNG)",
      desc: "Avaliar o RTP estatístico de longo prazo ou a aleatoriedade do RNG exige acesso aos servidores internos e milhões de rodadas registadas ao longo de milhões de jogadas. Embora confirmemos que as slots ligam diretamente aos servidores oficiais dos fornecedores (que recorrem a laboratórios de teste acreditados como a iTech Labs ou a eCOGRA), não realizamos testes laboratoriais de RNG por nossa conta.",
    },
    {
      title: "Procedimentos internos de conta e de pagamentos",
      desc: "As auditorias são feitas do ponto de vista de um visitante. A verificação de identidade do jogador (KYC), o encerramento de contas, os requisitos de aposta dos bónus e as filas de processamento de pagamentos ficam privados dentro do software do casino e estão fora do alcance de verificações técnicas externas.",
    },
    {
      title: "Segurança garantida dos levantamentos",
      desc: "Uma auditoria externa não pode inspecionar as contas bancárias privadas nem as reservas de liquidez do operador de um casino. Uma licença válida e slots originais confirmam a conformidade regulamentar e a autenticidade dos jogos, mas não podem garantir a solvência operacional nem a rapidez dos pagamentos.",
    },
    {
      title: 'Recomendações subjetivas de "casino seguro"',
      desc: "Uma licença é uma autorização regulamentar sujeita a condições. Os requisitos variam bastante entre jurisdições (por exemplo, MGA, Curacao, Anjouan). Em 4 de agosto de 2026, 215 dos 223 casinos indexados tinham credenciais de Anjouan. Damos factos em bruto e provas dos servidores para que possa decidir com informação — nunca emitimos garantias genéricas de segurança.",
    },
  ],
  directory: {
    certified: {
      label: "Licença e slots verificados",
      desc: "Número de licença confirmado no registo do regulador E servidores de jogo verificados como endpoints autênticos do fornecedor na data da auditoria.",
    },
    scanned: {
      label: "Não confirmado / ausente do registo",
      desc: "A pesquisa não devolveu qualquer correspondência oficial no registo para o domínio na data da auditoria. O operador pode usar um domínio não listado, um licenciamento não indexado ou funcionar sem autorização pública.",
    },
    listed: {
      label: "Entrada não verificada",
      desc: "Indexado a partir de fontes públicas na web. A análise automática do backend e o rastreio dos servidores de slots ainda não foram realizados para este site.",
    },
    flagged: {
      label: "Sinalizado / discrepância encontrada",
      desc: "A auditoria detetou inconsistências: por exemplo, domínios que não correspondem, selos de licença inválidos ou redirecionamentos para servidores proxy durante o arranque das slots.",
    },
    statusFilterAll: "Todos os estados",
    lastScanned: "Data da auditoria",
    viewReport: "Ver relatório completo",
  },
  casinos: {
    title: "Diretório de casinos verificados",
    description:
      "Diretório de casinos online monitorizados pela Swift Secured. Consulte o estado atual das licenças, as entradas oficiais nos reguladores e os resultados da auditoria aos servidores de jogo.",
    eyebrow: "Diretório de casinos",
    h1: "Diretório de auditorias a casinos online",
    sub: "Pesquise os casinos monitorizados para ver o estado no registo da licença, as jurisdições emissoras e os históricos de verificação dos servidores de jogo. A presença na lista não significa recomendação.",
    searchPlaceholder: "Pesquisar por nome do casino, domínio ou jurisdição...",
    searchLabel: "Pesquisar casinos auditados",
    empty: "Nenhum casino corresponde aos seus critérios de pesquisa.",
  },
  verify: {
    title: "Verificar a autenticidade do selo",
    description:
      "Introduza um ID de selo Swift Secured para confirmar o estado de verificação atual de um operador e impedir o uso de selos falsos.",
    h1: "Verificar um selo Swift Secured",
    sub: "Introduza o ID único do selo apresentado no site de um casino para confirmar a validade oficial da auditoria e consultar os rastreios de verificação que a sustentam.",
    inputPlaceholder: "ex.: CS-2026-0042",
    inputLabel: "ID do selo",
    button: "Verificar selo",
    validStatus: "Selo verificado, válido e ativo",
    operator: "Marca / operador do casino:",
    jurisdiction: "Jurisdição do regulador:",
    lastChecked: "Data da última auditoria:",
    invalidStatus: "ID de selo não registado / inválido",
    invalidBody:
      "Não existe qualquer registo de verificação ativo para este ID. O site que apresenta esta marca pode estar a usar um selo não aprovado ou falsificado. Se suspeita de fraude,",
    contactUs: "contacte a nossa equipa",
  },
  apply: {
    title: "Pedido de certificação de casino",
    description:
      "Submeta a sua marca de casino online para uma auditoria independente à licença e aos servidores de jogo. Ganhe a confiança dos jogadores e aumente os primeiros depósitos (FTD).",
    eyebrow: "Soluções para operadores",
    h1: "Audite e verifique o seu casino",
    sub: "Formulário para operadores de casinos e proprietários de plataformas. Exibir um selo Swift Secured verificado prova a validade da sua licença e a autenticidade dos servidores das slots, removendo hesitação do jogador no momento do depósito. As auditorias são gratuitas nos primeiros 6 meses.",
    fieldName: "Nome da marca do casino",
    fieldNamePlaceholder: "Nome principal apresentado aos jogadores",
    fieldWebsite: "Domínio ativo do site",
    fieldJurisdiction: "Regulador que emitiu a licença",
    fieldJurisdictionPlaceholder: "ex.: Anjouan, Curacao GCB, MGA",
    fieldEmail: "E-mail de contacto da empresa",
    fieldMessage: "Notas técnicas adicionais",
    fieldMessagePlaceholder:
      "Número de licença, URL de validação direta ou contacto técnico",
    submit: "Submeter para auditoria",
    successTitle: "Pedido submetido com sucesso",
    successBody:
      "O nosso sistema e a equipa de conformidade vão analisar o seu domínio e realizar testes de rastreio aos servidores de jogo. Receberá uma atualização sobre o estado da auditoria em {email} dentro de 24 a 48 horas.",
  },
  pricing: {
    title: "Condições e preços do selo verificado",
    description:
      "Selo de verificação gratuito durante 6 meses para casinos online. Sem custos de instalação, sem cartão de crédito, sem partilha de receita. Transforme a dúvida do jogador em depósitos.",
    eyebrow: "Soluções para operadores",
    h1: "Transforme o ceticismo dos jogadores em primeiros depósitos",
    sub: "As marcas de casino novas perdem até 70% dos potenciais depositantes por falta de confiança. Exibir um selo de verificação independente e inalterável confirma de imediato a sua licença ativa e os servidores de jogo originais, aumentando as taxas de conversão sem atrito na instalação.",
    billingTitle: "Detalhes do programa de verificação",
  },
  billingNotes: [
    {
      title: "Auditoria e selo gratuitos durante 6 meses",
      desc: "Faça a auditoria completa e exiba o selo verificado gratuitamente durante 6 meses a contar da data de integração. Sem custos de instalação, sem cartão de crédito e sem contratos escondidos.",
    },
    {
      title: "Requisito simples de ligação recíproca",
      desc: "Só pedimos que o selo no rodapé tenha uma ligação ao certificado de auditoria dedicado no nosso site. Assim, os jogadores podem verificar os rastreios técnicos em tempo real. Sem partilha de receita nem comissões de referência.",
    },
    {
      title: "Opções transparentes após o período gratuito",
      desc: "Antes de terminarem os 6 meses de teste, apresentamos opções de preço de renovação transparentes. Não há cobranças automáticas nem subscrições forçadas — o controlo é totalmente seu.",
    },
    {
      title: "Remoção imediata",
      desc: "Basta remover o snippet de código do selo do rodapé do seu site, a qualquer momento, para terminar a integração. Os seus registos históricos de verificação continuam arquivados no nosso diretório, com todas as datas de auditoria.",
    },
  ],
  badge: {
    title: "Formatos e integração do selo verificado",
    description:
      "Conheça os desenhos do selo Swift Secured, os formatos visuais do badge e as orientações técnicas sobre como os jogadores verificam as ligações de auditoria autênticas.",
    eyebrow: "Recursos visuais do selo",
    h1: "Integração do badge Swift Secured e comportamento na verificação",
    sub: "Disponível em três formatos responsivos, pensados para faixas de rodapé e formulários de registo. Todos os badges autênticos funcionam como ligação direta ao relatório de auditoria em direto. Imagens estáticas sem ligação ativa não passam na verificação.",
    primaryTitle: "Badge padrão",
    primaryBody:
      "Pensado para rodapés de sites, ao lado dos selos de licença. Limpo e sóbrio. Ao clicar, abre o relatório de verificação em direto do casino, com as provas do rastreio dos servidores de jogo e as datas das consultas ao registo.",
    compactTitle: "Variante compacta / de uma só linha",
    compactBody:
      "Formato horizontal, feito para as filas de ícones de pagamento ou para barras de navegação em telemóvel. Mantém todo o rastreio de verificação e leva ao mesmo certificado de auditoria.",
    darkTitle: "Variante de contorno para tema escuro",
    darkBody:
      "Versão de contorno com alto contraste, desenhada para interfaces de casino escuras. Mantém a máxima legibilidade sem comprometer a integridade visual da marca.",
    ctaHeading: "Pronto para exibir o selo verificado no seu site?",
    ctaButton: "Obter certificação",
  },
  faqPage: {
    title: "Perguntas frequentes",
    description:
      "Respostas sobre as consultas aos registos de licenças, a deteção de slots com script, a independência face aos operadores e os critérios de verificação.",
    eyebrow: "FAQ e transparência",
    h1: "Perguntas frequentes de jogadores e operadores",
    ctaHeading: "Tem um casino? Peça a auditoria em menos de 2 minutos.",
    ctaButton: "Obter certificação gratuita",
  },
  faqs: [
    {
      q: "O que é que o badge Swift Secured garante a um jogador?",
      a: "O badge prova que, na data de auditoria indicada, o domínio do casino estava ativamente registado nos registos oficiais do regulador E que os pedidos das rodadas de jogo ligavam diretamente a servidores certificados do fornecedor (o que confirma slots originais, sem script, com o RTP original).",
    },
    {
      q: "Como detetam slots com script ou falsificadas?",
      a: "Durante os testes, inspecionamos o tráfego de rede de saída no arranque das slots. Os jogos oficiais transmitem a matemática e os recursos diretamente de domínios certificados do fornecedor (por exemplo, Pragmatic, Evolution). Se um site reencaminhar os pedidos das rodadas por servidores proxy intermédios desconhecidos para falsear os resultados do jogo, é sinalizado como jogo com script.",
    },
    {
      q: "Um casino pode pagar para ser verificado ou para alterar as conclusões da auditoria?",
      a: "Zero influência do pagamento, em absoluto. O estado de verificação é determinado automaticamente por consultas aos registos oficiais e por rastreios técnicos dos servidores. Os operadores podem exibir os badges de auditoria, mas não podem comprar alterações de estado nem apagar históricos de registo.",
    },
    {
      q: 'O que significa o estado "não confirmado" para um casino?',
      a: "Não confirmado significa que o nosso sistema não encontrou qualquer registo correspondente do domínio na base de dados oficial do regulador na data da auditoria. Isto pode acontecer se os registos ficarem offline, se as aprovações de domínio estiverem pendentes ou se o operador usar espelhos não registados. É uma observação factual, não uma declaração jurídica.",
    },
    {
      q: "A Swift Secured pode resolver o meu litígio de levantamento com um casino?",
      a: "Não gerimos contas de jogadores nem processamos pagamentos. No entanto, o nosso certificado de auditoria inclui ligações diretas à autoridade de licenciamento indicada no registo, onde pode apresentar queixas oficiais.",
    },
    {
      q: "Porque devem os jogadores e os operadores confiar na Swift Secured?",
      a: "Porque cada afirmação é verificável com um clique. Publicamos os destinos das pesquisas nos registos oficiais e os rastreios dos endpoints de rede das slots, para que os jogadores não tenham de confiar em promessas ou em análises de afiliados.",
    },
  ],
  about: {
    title: "Sobre a Swift Secured",
    description:
      "Conheça a missão da Swift Secured: auditorias independentes, automatizadas e transparentes às licenças dos casinos e aos seus servidores de jogo.",
    eyebrow: "Sobre nós",
    h1: "Verificação independente assente em factos técnicos",
    sub: "A Swift Secured faz auditorias técnicas automatizadas a casinos online. Verificamos as entradas nos registos dos reguladores e auditamos as ligações aos servidores das slots, publicando as conclusões com datas exatas. Sem colocações pagas, sem links de afiliados e sem resultados manipulados.",
    card1Title: "Zero enviesamento comercial",
    card1Body:
      "Nenhum casino pode comprar um selo verificado sem passar nas verificações técnicas. Recusamos partilha de receita de afiliação, referências pagas por clique e rankings patrocinados. As conclusões mantêm-se puramente objetivas.",
    card2Title: "Perímetro técnico definido",
    card2Body:
      "Indicamos com transparência o que a auditoria consegue fazer: confirmamos os registos oficiais de licença e os endpoints de slots sem script, indicando explicitamente os limites quanto às finanças internas do operador ou às regras de aposta dos jogadores.",
  },
};

export default pt;
