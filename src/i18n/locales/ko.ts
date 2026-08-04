import type { PartialTranslation } from "../types";

const ko: PartialTranslation = {
  nav: {
    howItWorks: "인증 절차",
    methodology: "검증 방법",
    pricing: "요금",
    about: "회사 소개",
    faq: "자주 묻는 질문",
    casinos: "인증 카지노",
    verify: "씰 확인",
    apply: "신청",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    primaryLabel: "주요 메뉴",
  },
  footer: {
    verifySeal: "씰 확인하기",
    apply: "신청",
    faq: "자주 묻는 질문",
  },
  stickyCta: {
  },
  seal: {
    certified: "인증 완료",
  },
  common: {
    certifiedSince: "인증 시작일",
    viewSealRecord: "씰 기록 보기",
    youProvide: "제출 자료:",
  },
  home: {
    title: "Swift Secured",
    ctaVerify: "씰 확인하기",
    howEyebrow: "인증 절차",
  },
  process: {
  },
  pricing: {
    title: "요금",
  },
  methodology: {
    title: "검증 방법",
    description:
      "Swift Secure가 배지를 발급하기 전에 정확히 무엇을 점검하고, 얼마나 자주 재점검하며, 무엇을 검증한다고 주장하지 않는지 밝힙니다.",
    eyebrow: "검증 방법",
    h1: "이 배지가 실제로 뜻하는 것",
    sub: "신뢰 표식의 가치는 그 뒤를 받치는 것만큼입니다. 수행하지 않는 점검까지 포함한 전체 방법이며, 누구도 짐작할 필요가 없도록 공개합니다.",
    checksTitle: "저희가 검증하는 것",
    limitsTitle: "저희가 검증하지 않는 것",
    limitsSub:
      "의도적으로 공개합니다. 점검한 것보다 많은 것을 암시하는 씰은 없는 편이 낫습니다. 저희 배지를 단 사업자에게 문제가 생겼을 때에도 지키는 선입니다.",
    suspensionTitle: "배지가 정지되는 절차",
    suspensionBody:
      "민원이 접수되거나 크롤러가 이상을 발견하면, 공개적으로 무엇이 바뀌기 전에 사업자에게 비공개로 48시간의 소명 기회를 드립니다. 이는 경쟁사의 허위 신고로부터 보호하기 위함입니다. 문제가 사실이면 배지는 내려가고 검증 페이지는 사실대로 갱신됩니다. 대가를 받고 페이지를 삭제하지 않으며, 지적 사항을 사라지게 하는 요금도 없습니다.",
    ctaHeading: "귀사 플랫폼을 점검받고 싶으신가요?",
    ctaButton: "스캔 요청하기",
  },
  directory: {
    scanned: {
      label: "스캔됨",
      desc: "저희 크롤러가 자동으로 점검했습니다. 상업적 관계가 없으며 배지도 발급하지 않았습니다.",
    },
    listed: {
      label: "등재됨",
      desc: "공개 자료를 바탕으로 색인에 올렸습니다. 아직 점검을 진행하지 않았으며 여기 실린 어떤 것도 추천이 아닙니다.",
    },
    flagged: {
      label: "확인 필요",
      desc: "자동 점검에서 결론을 내리기 전에 사람이 살펴봐야 할 점이 발견되었습니다.",
    },
    statusFilterAll: "전체",
    lastScanned: "최근 점검",
    viewReport: "보고서 보기",
  },
  casinos: {
    title: "카지노 디렉터리",
    description: "Swift Secure가 추적하는 신규 온라인 카지노 디렉터리이며, 각 항목의 현재 검증 상태를 표시합니다.",
    eyebrow: "디렉터리",
    h1: "카지노 디렉터리",
    sub: "저희가 색인한 모든 신규 카지노와 현재 상태입니다. 대부분은 공개 출처에서 등재되었으며 아직 점검하지 않았습니다 — 각 카드의 상태가 이를 보여줍니다.",
    searchPlaceholder: "카지노 이름 또는 관할로 검색",
    searchLabel: "인증 카지노 검색",
    empty: "검색 조건에 맞는 카지노가 없습니다.",
  },
  verify: {
    title: "씰 확인하기",
    description: "카지노 사이트에 표시된 씰 ID를 입력하면 해당 씰이 진짜이며 현재 Swift Secured 인증을 유지하고 있는지 확인할 수 있습니다.",
    h1: "씰 확인하기",
    sub: "카지노 사이트에 표시된 씰 ID를 입력해 진짜이며 현재 유효한지 확인하십시오.",
    inputPlaceholder: "예: CS-2026-0042",
    inputLabel: "씰 ID",
    button: "확인",
    validStatus: "유효하며 활성 상태인 씰",
    operator: "운영사:",
    jurisdiction: "관할:",
    invalidStatus: "일치하는 씰을 찾을 수 없습니다",
    contactUs: "문의하기",
  },
  apply: {
    title: "인증 신청하기",
    description: "최단 10일 안에 Swift Secured 씰을 받으십시오. 플랫폼에 대해 알려주시면 컴플라이언스팀이 48시간 이내에 답변드립니다.",
    eyebrow: "인증 신청",
    h1: "최단 10일 안에 씰을 받으십시오",
    sub: "플랫폼에 대해 알려주십시오. 컴플라이언스팀이 48시간 이내에 답변드립니다.",
    fieldName: "카지노 이름",
    fieldWebsite: "웹사이트 주소",
    fieldJurisdiction: "라이선스 관할",
    fieldJurisdictionPlaceholder: "예: 몰타, 퀴라소",
    fieldEmail: "연락용 이메일",
    fieldMessage: "그 밖에 알려주실 내용이 있습니까?",
    fieldMessagePlaceholder: "오픈 예정일, 목표 시장, 현재 진행 중인 감사...",
    submit: "신청서 제출",
    successTitle: "신청이 접수되었습니다",
    successBody: "담당 팀이 48시간 이내에 {email} 주소로 연락드려 감사를 시작합니다.",
  },
  about: {
  },
  faqPage: {
    title: "자주 묻는 질문",
    eyebrow: "자주 묻는 질문",
    h1: "자주 묻는 질문",
    ctaHeading: "아직 궁금한 점이 있으십니까?",
    ctaButton: "문의하기",
  },
  badge: {
    title: "Swift Secured 씰",
    description: "Swift Secured 인증 씰의 브랜드 레퍼런스: 기본 배지, 컴팩트 조합, 어두운 배경용 버전.",
    eyebrow: "씰 소개",
    h1: "Swift Secured",
    sub: "하나의 배지, 세 가지 형태. 푸터 로고 옆에 놓일 만큼 단순하고, 한눈에 의미가 전해질 만큼 명확합니다.",
    primaryTitle: "기본 씰",
    primaryBody:
      "홈페이지 상단이나 푸터에 쓰는 전체 배지입니다. 선 굵기는 하나, 강조색도 하나이며 그러데이션이나 불필요한 장식은 없습니다. 60px로 줄여도 어떤 크기에서든 또렷하게 읽혀야 하기 때문입니다.",
    compactTitle: "컴팩트 조합",
    compactBody: "결제 페이지, 푸터 영역 등 가로 공간이 좁은 곳에 사용합니다. 같은 아이콘과 같은 워드마크를 한 줄에 배치했습니다.",
    darkTitle: "어두운 배경용 버전",
    darkBody:
      "어두운 테마의 카지노 사이트를 위해 링은 외곽선 아이콘으로, 글자는 흰색으로 바뀝니다. 뒤에 흰색 판을 깔지 않아도 가독성이 유지됩니다.",
    ctaHeading: "사이트에 Swift Secure를 표시하고 싶으십니까?",
    ctaButton: "인증 신청하기",
  },
};

export default ko;
