import type { PartialTranslation } from "../types";

const zh: PartialTranslation = {
  nav: {
    howItWorks: "认证流程",
    methodology: "核查方法",
    pricing: "价格",
    about: "关于我们",
    faq: "常见问题",
    casinos: "赌场名录",
    verify: "验证",
    apply: "申请",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    primaryLabel: "主导航",
  },
  footer: {
    verifySeal: "验证标识",
    apply: "申请",
    faq: "常见问题",
  },
  stickyCta: {
  },
  seal: {
    certified: "已认证",
  },
  common: {
    certifiedSince: "认证于",
    viewSealRecord: "查看标识记录",
    youProvide: "您需提供：",
  },
  home: {
    title: "Swift Secure",
    ctaVerify: "验证标识",
    howEyebrow: "认证流程",
  },
  process: {
  },
  pricing: {
    title: "价格",
  },
  methodology: {
    title: "核查方法",
    description:
      "Swift Secure 在签发标识前究竟核查什么、多久复查一次，以及我们刻意不声称核查的内容。",
    eyebrow: "核查方法",
    h1: "这枚标识到底意味着什么",
    sub: "信任标记的价值取决于背后有什么。这是完整方法——包括我们不做的核查，免得任何人靠猜。",
    checksTitle: "我们核查什么",
    limitsTitle: "我们不核查什么",
    limitsSub:
      "这是刻意公开的。一枚暗示超出其核查范围的标识，比没有标识更糟；当持有我们标识的运营商出事时，这也是我们坚守的底线。",
    suspensionTitle: "标识如何被暂停",
    suspensionBody:
      "若收到投诉或爬虫发现异常，运营商有 48 小时私下回应的时间，之后才会有任何公开变动——这可以防止竞争对手的不实举报。若问题属实，标识即下架，验证页面按事实更新。我们不会因收钱而删除页面，也没有任何费用能让一项核查发现消失。",
    ctaHeading: "想让我们核查你的平台？",
    ctaButton: "申请扫描",
  },
  directory: {
    scanned: {
      label: "已扫描",
      desc: "由我们的爬虫自动核查。无商业合作关系，也未签发标识。",
    },
    listed: {
      label: "已收录",
      desc: "来自公开来源，已收入我们的索引。尚未进行任何核查，此处内容不代表任何背书。",
    },
    flagged: {
      label: "待人工复核",
      desc: "自动核查发现了一些情况，需要人工查看后才能下结论。",
    },
    statusFilterAll: "全部",
    lastScanned: "最近核查",
    viewReport: "查看报告",
  },
  casinos: {
    title: "赌场目录",
    description: "Swift Secure 追踪的新在线赌场目录，每家均标注当前验证状态。",
    eyebrow: "目录",
    h1: "赌场目录",
    sub: "我们收录的每一家新赌场及其当前状态。多数来自公开来源，尚未经过检查——每张卡片上的状态会说明。",
    searchPlaceholder: "按赌场名称或辖区搜索",
    searchLabel: "搜索已认证赌场",
    empty: "没有符合该搜索条件的赌场。",
  },
  verify: {
    title: "验证标识",
    description: "输入赌场网站上显示的标识编号，确认其真实性以及当前是否由 Swift Secure 认证。",
    h1: "验证标识",
    sub: "输入赌场网站上显示的标识编号，确认其真实且仍然有效。",
    inputPlaceholder: "例如 CS-2026-0042",
    inputLabel: "标识编号",
    button: "验证",
    validStatus: "标识有效且在有效期内",
    operator: "运营商：",
    jurisdiction: "牌照辖区：",
    invalidStatus: "未找到匹配的标识",
    contactUs: "联系我们",
  },
  apply: {
    title: "申请认证",
    description: "最快 10 天获得您的 Swift Secure 标识。请告诉我们您的平台情况——我们的合规团队将在 48 小时内回复。",
    eyebrow: "申请认证",
    h1: "最快 10 天获得您的标识",
    sub: "请告诉我们您的平台情况。我们的合规团队将在 48 小时内回复。",
    fieldName: "赌场名称",
    fieldWebsite: "网站地址",
    fieldJurisdiction: "牌照辖区",
    fieldJurisdictionPlaceholder: "例如 马耳他、库拉索",
    fieldEmail: "联系邮箱",
    fieldMessage: "还有其他需要我们了解的信息吗？",
    fieldMessagePlaceholder: "上线日期、目标市场、当前审计情况……",
    submit: "提交申请",
    successTitle: "申请已收到",
    successBody: "我们的团队将在 48 小时内通过 {email} 与您联系，启动审计。",
  },
  about: {
  },
  faqPage: {
    title: "常见问题",
    eyebrow: "常见问题",
    h1: "常见问题",
    ctaHeading: "还有疑问？",
    ctaButton: "联系我们",
  },
  badge: {
    title: "Swift Secure 标识",
    description: "Swift Secure 认证标识的品牌参考：主徽章、紧凑版组合与深色背景版本。",
    eyebrow: "标识",
    h1: "Swift Secure",
    sub: "一个徽章，三种形式。简洁到可与页脚标志并列，清晰到一眼就有意义。",
    primaryTitle: "主标识",
    primaryBody:
      "完整徽章，适用于首页主视觉或页脚。统一的线条粗细、单一强调色，无渐变与多余装饰——它必须在任何尺寸下都清晰可读，哪怕缩小到 60px。",
    compactTitle: "紧凑版组合",
    compactBody: "适用于结账页、页脚条，或任何横向空间紧张的位置。相同图标、相同字标，排成一行。",
    darkTitle: "深色背景版本",
    darkBody:
      "适用于深色主题的赌场网站：圆环改为描边图标，文字为白色，因此无需在其后加白底也能保持清晰。",
    ctaHeading: "希望在您的网站上展示 Swift Secure？",
    ctaButton: "申请认证",
  },
};

export default zh;
