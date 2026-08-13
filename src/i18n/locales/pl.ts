import type { PartialTranslation } from "../types";

/**
 * pl. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const pl: PartialTranslation = {
  nav: {
    howItWorks: "Jak to działa",
    methodology: "Co sprawdzamy",
    pricing: "Dla kasyn",
    about: "O nas",
    faq: "FAQ",
    casinos: "Indeks kasyn",
    verify: "Sprawdź plakietkę",
    apply: "Uzyskaj certyfikat",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    primaryLabel: "Główne",
  },
  footer: {
    verifySeal: "Zweryfikuj pieczęć",
    apply: "Złóż wniosek o pieczęć",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Prowadzisz kasyno online? Zwiększ zaufanie graczy i liczbę pierwszych depozytów dzięki niezależnemu audytowi.",
    button: "Uzyskaj certyfikat za darmo",
  },
  seal: {
    certified: "Licencja i sloty zweryfikowane",
  },
  stats: [
    {
      count: "listed",
      label: "Śledzone kasyna",
    },
    {
      count: "topJurisdiction",
      label: "Licencjonowane przez {regulator}",
    },
    {
      count: "registryMatched",
      label: "Licencje odnalezione w rejestrze",
    },
    {
      count: "badged",
      label: "Wyświetla dziś zweryfikowaną pieczęć",
    },
  ],
  common: {
    certifiedSince: "Data wpisu",
    viewSealRecord: "Otwórz wpis audytu",
    youProvide: "Co jest do tego potrzebne:",
  },
  home: {
    title: "Swift Secured — niezależna weryfikacja kasyn i serwerów gier",
    description:
      "Sprawdź licencje kasyn w oficjalnych rejestrach regulatorów i wykryj skryptowane sloty, zanim wpłacisz depozyt. Niezależny audyt techniczny z publicznymi znacznikami czasu.",
    badge: "Niezależna usługa audytu. W 100% bezstronna.",
    h1: "Nie wpłacaj w ciemno: zweryfikuj licencję i autentyczne serwery gier",
    sub: "Audytujemy kasyna online w czasie rzeczywistym. Śledzimy działające serwery gier, aby potwierdzić, że sloty są w 100% oryginalne, weryfikujemy aktywną rejestrację licencji i oznaczamy oszukańcze podróbki, zanim zaryzykujesz swoje pieniądze.",
    ctaApply: "Co sprawdzamy",
    ctaVerify: "Sprawdź plakietkę",
    howEyebrow: "Jak to działa",
    howTitle:
      "Od wyszukiwania w rejestrze w czasie rzeczywistym do niezmiennego, datowanego audytu",
    criteriaEyebrow: "Standardy bezpieczeństwa",
    criteriaTitle:
      "Co weryfikuje nasz audyt — i jakie ścisłe zasady za tym stoją",
    operatorsEyebrow: "Katalog publiczny",
    operatorsTitle:
      "Śledzone kasyna w naszym indeksie — zweryfikowane, niepotwierdzone lub oznaczone",
    viewAllCasinos: "Przeglądaj indeks kasyn",
    ctaHeading: "Przejrzysta metodologia techniczna",
    ctaSub:
      "Dowiedz się dokładnie, jak śledzimy żądania do serwerów gier, porównujemy dane z rejestrami regulatorów i wykrywamy zmanipulowane RTP, nie przyjmując od operatorów płatności za pozytywne recenzje.",
    ctaButton: "Przeczytaj metodologię",
  },
  criteria: [
    {
      title: "Bezpośrednia weryfikacja w rejestrze regulatora",
      desc: "Setki oszukańczych stron umieszcza w stopce fałszywe logotypy licencji. Weryfikujemy numery licencji i aktywne domeny stron bezpośrednio w oficjalnych bazach danych regulatorów.",
    },
    {
      title: "Pełna tożsamość regulatora i zasady jurysdykcji",
      desc: "Organy licencyjne bardzo różnią się poziomem ochrony. Każdy wpis podaje dokładną nazwę regulatora i numer licencji, abyś mógł ocenić siłę prawną, która za nim stoi.",
    },
    {
      title: "Dokładna data i znacznik czasu weryfikacji",
      desc: "Licencje wygasają, zostają zawieszone lub zmieniają domeny z dnia na dzień. Statyczne deklaracje nic nie znaczą — każdy wpis podaje dokładną datę UTC, w której system wykonał sprawdzenie.",
    },
    {
      title: "Niemożliwe do kupienia i odporne na manipulacje wpisy audytu",
      desc: "Żadne kasyno nie może zapłacić za zmianę ustaleń, ukrycie złych wyników audytu ani skasowanie dzienników wpisów. Status weryfikacji zmienia się tylko wtedy, gdy zmieniają się dane w rejestrze lub ślady serwerowe.",
    },
    {
      title: "Audyt autentyczności serwerów gier (przeciw skryptowanym slotom)",
      desc: "Fałszywe kasyna kopiują grafikę gier, ale przepuszczają matematykę spinów przez prywatne serwery ze sfałszowanym RTP. Badamy żądania sieciowe na żywo, aby upewnić się, że każdy spin łączy się bezpośrednio z oficjalnymi serwerami dostawcy.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Pobranie danych o licencji i domenie",
      desc: "Odczytujemy deklarowany numer licencji, podmiot korporacyjny i dokładny adres URL gry bezpośrednio z publicznego frontendu badanego kasyna.",
    },
    {
      n: "2",
      title: "Porównanie z rejestrem i śledzenie serwerów",
      desc: "Przeszukujemy oficjalną, aktualną bazę danych regulatora wydającego licencję w poszukiwaniu zatwierdzonych domen i analizujemy wychodzące strumienie websocket/HTTP w momencie uruchomienia gier.",
    },
    {
      n: "3",
      title: "Publikacja datowanego certyfikatu audytu",
      desc: "Niezależnie od tego, czy wynik jest potwierdzony, brakujący czy niezweryfikowany, pełny wpis audytu trafia do sieci z niezmiennym znacznikiem czasu opisującym każde wykonane sprawdzenie.",
    },
    {
      n: "4",
      title: "Niezależna weryfikacja jednym kliknięciem",
      desc: "Każdy wpis zawiera surowe linki do rejestru oraz dowody ze śladów sieciowych, dzięki czemu gracze mogą samodzielnie zweryfikować ustalenia.",
    },
  ],
  process: {
    title: "Jak to działa — proces weryfikacji",
    description:
      "Jak Swift Secured audytuje dane licencyjne kasyn, śledzi oryginalne punkty końcowe serwerów gier i publikuje odporne na manipulacje, publiczne wpisy audytu.",
    eyebrow: "Proces weryfikacji",
    h1: "Jak kasyna są audytowane, weryfikowane i indeksowane",
    sub: "Nasza procedura techniczna jest w pełni zautomatyzowana i opublikowana, co zapewnia pełną powtarzalność. Pobieramy opublikowane numery licencji, porównujemy je z oficjalnymi listami regulatorów i śledzimy żądania gier na żywo, bez dostępu do kasyna i bez rejestracji gracza.",
    ctaHeading: "Prowadzisz licencjonowane kasyno online?",
    ctaButton: "Złóż wniosek o zweryfikowaną pieczęć",
  },
  stages: [
    {
      n: "1",
      title: "Pobranie danych publicznych i punktów końcowych",
      duration: "Skanowanie frontendu",
      desc: "Odczytujemy deklaracje licencyjne, dane korporacyjne operatora i adresy domen bezpośrednio ze stopek badanych stron. Wpisy jeszcze niesprawdzone są wyraźnie oznaczone jako niezweryfikowane, dopóki pełne pobranie danych na żywo nie zostanie zakończone.",
      provide: "Nic nie jest wymagane od graczy ani operatorów.",
    },
    {
      n: "2",
      title: "Rejestr regulatora i śledzenie serwerów",
      duration: "Tylko rejestr publiczny",
      desc: "Przeszukujemy oficjalne bazy danych regulatorów w poszukiwaniu list zatwierdzonych domen. Równocześnie uruchamiamy testowe sesje gier, aby potwierdzić, że matematyka gry ładuje się bezpośrednio z CDN dostawcy (np. Pragmatic, Evolution).",
      provide: "Nie jest wymagana rejestracja ani opłata.",
    },
    {
      n: "3",
      title: "Publikacja niezależnego statusu i znacznika czasu",
      duration: "Bezpłatny dostęp do odczytu",
      desc: "Wyniki powstają natychmiast, z dokładną datą weryfikacji. Jeśli licencji nie da się odnaleźć lub walidacja domeny się nie powiedzie, wpis w sposób przejrzysty podaje status „niepotwierdzone”, zamiast ukrywać ustalenia.",
      provide: "Otwarty publiczny dostęp dla wszystkich użytkowników.",
    },
    {
      n: "4",
      title: "Ciągłe monitorowanie i cykle ponownych sprawdzeń",
      duration: "Przy każdym ponownym sprawdzeniu",
      desc: "Rejestry i domeny gier zmieniają się w czasie. Gdy dochodzi do ponownego sprawdzenia, status i data aktualizują się automatycznie. Historyczne dzienniki sprawdzeń pozostają zarchiwizowane, aby zapobiec cichym zmianom.",
      provide: "Zawsze sprawdzaj datę audytu na plakietce.",
    },
  ],
  methodology: {
    title: "Metodologia audytu technicznego",
    description:
      "Pełna specyfikacja weryfikacji: jak sprawdzamy rejestry regulatorów, audytujemy oryginalne serwery slotów, zapisujemy daty i cofamy plakietki, gdy licencje wygasają.",
    eyebrow: "Metodologia i zakres",
    h1: "Metodologia weryfikacji technicznej i granice działania",
    sub: "Audyty prowadzimy z zewnątrz, z perspektywy zwykłego gracza, bez specjalnego dostępu i bez udziału operatora. Testujemy opublikowane numery licencji, sprawdzamy zatwierdzenia aktywnych domen w oficjalnych rejestrach i śledzimy żądania do serwerów slotów na żywo. Każde ustalenie jest datowane i publikowane.",
    checksTitle: "Weryfikowane parametry techniczne",
    limitsTitle: "Granice i ograniczenia audytu",
    limitsSub:
      "Każdy audyt techniczny ma ścisłe granice. Wyraźnie mówimy, co weryfikujemy (ważność licencji, oficjalne serwery slotów), a czego nie da się zbadać z zewnątrz (wewnętrzna księgowość, indywidualne decyzje o wypłatach).",
    monitoringTitle: "Obowiązkowe datowanie i monitorowanie",
    monitoringBody:
      "Bazy danych regulatorów stale się zmieniają: licencje wygasają, domeny się zmieniają, certyfikaty są cofane. Sprawdzenie jest dokładne tylko dla dokładnego momentu, w którym je wykonano. Datę sprawdzenia pokazujemy w widocznym miejscu. Starsze daty uruchamiają nowy automatyczny audyt. Zarchiwizowane ustalenia nigdy nie są po cichu nadpisywane.",
    suspensionTitle: "Zasady automatycznego cofania plakietki",
    suspensionBody:
      "Jeśli licencja znika z rejestru lub strona przechodzi na skryptowane serwery gier, status plakietki aktualizuje się natychmiast. Skargi ani zgłoszenia konkurencji nie zmieniają statusu bezpośrednio — uruchamiają automatyczne ponowne sprawdzenie. Żadna opłata ani sponsoring nie przywróci plakietki przy nieważnej licencji.",
    ctaHeading: "Zawsze sprawdź kasyno, zanim wpłacisz depozyt.",
    ctaButton: "Przeszukaj indeks kasyn",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Zgodność licencji z rejestrem",
      summary:
        "Potwierdza oficjalną rejestrację licencji i weryfikuje aktywną domenę gry we wpisach regulatora.",
      checks: [
        "Numer licencji pobrany bezpośrednio z frontendu operatora",
        "Zweryfikowany w oficjalnej bazie danych regulatora wydającego licencję",
        "Aktywna domena strony porównana z listą zatwierdzonych domen",
        "Pełna przejrzystość parametrów jurysdykcji",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Audyt autentyczności serwerów gier",
      summary:
        "Zapewnia, że sloty działają na prawdziwych CDN dostawców, zapobiegając podrabianym grom ze zmanipulowanym RTP.",
      checks: [
        "Kontrola żądań sieciowych podczas inicjalizacji gry",
        "Weryfikacja punktów końcowych matematyki gry (Pragmatic, Play'n GO, Hacksaw itd.)",
        "Wykrywanie serwerów proxy i fałszywych kopii slotów",
        "Potwierdzenie niezmienionych konfiguracji dostawcy",
      ],
    },
    {
      id: "dated-records",
      name: "Dowód daty i godziny",
      summary:
        "Każde ustalenie ma niezmienny znacznik czasu UTC pokazujący dokładnie, kiedy system audytował stronę.",
      checks: [
        "Wyraźnie podana data sprawdzenia obok statusu weryfikacji",
        "Wpisy niesprawdzone wyraźnie oznaczone",
        "Widoczne dzienniki historycznych wpisów",
        "Natychmiastowa aktualizacja statusu po ponownym audycie",
      ],
    },
    {
      id: "strict-independence",
      name: "Gwarancje niezależności",
      summary:
        "Zero stronniczości afiliacyjnej, zero płatnych zmian statusu i zero promocyjnych rankingów.",
      checks: [
        "Brak linków afiliacyjnych i poleceń kasyn w modelu pay-per-click",
        "Brak płatnych podwyżek ocen i sponsorowanych pozycji plakietki",
        "Obiektywne ustalenia techniczne zamiast opinii redakcyjnych",
        "Otwarta procedura samodzielnej weryfikacji przez graczy",
      ],
    },
  ],
  limits: [
    {
      title: "RTP gier i generatory liczb losowych (RNG)",
      desc: "Ocena długoterminowego statystycznego RTP lub losowości RNG wymaga dostępu do serwerów wewnętrznych i milionów zarejestrowanych spinów w milionach rund. Potwierdzamy, że sloty łączą się bezpośrednio z oficjalnymi serwerami dostawców (którzy korzystają z akredytowanych laboratoriów testowych, takich jak iTech Labs czy eCOGRA), ale sami nie prowadzimy niezależnych laboratoryjnych testów RNG.",
    },
    {
      title: "Wewnętrzne procedury kont i płatności",
      desc: "Audyty wykonujemy z perspektywy odwiedzającego. Weryfikacja tożsamości gracza (KYC), zamykanie kont, wymogi obrotu bonusem i kolejki przetwarzania płatności pozostają prywatne wewnątrz oprogramowania kasyna i są poza zakresem zewnętrznych sprawdzeń technicznych.",
    },
    {
      title: "Gwarantowane bezpieczeństwo wypłat",
      desc: "Audyty zewnętrzne nie mogą sprawdzić prywatnych kont bankowych operatora kasyna ani jego rezerw płynności. Ważna licencja i oryginalne sloty potwierdzają zgodność z wymogami regulatora i autentyczność gier, ale nie mogą zagwarantować wypłacalności operacyjnej ani szybkości wypłat.",
    },
    {
      title: "Subiektywne rekomendacje „bezpiecznego kasyna”",
      desc: "Licencja to zezwolenie regulacyjne obwarowane warunkami. Wymogi znacznie różnią się między jurysdykcjami (np. MGA, Curacao, Anjouan). Na dzień 4 sierpnia 2026 r. 215 z 223 zaindeksowanych kasyn posiada uprawnienia z Anjouan. Podajemy surowe fakty i dowody serwerowe, abyś mógł podejmować świadome decyzje — nigdy nie wydajemy ogólnych gwarancji bezpieczeństwa.",
    },
  ],
  directory: {
    certified: {
      label: "Licencja i sloty zweryfikowane",
      desc: "Zgodność numeru licencji potwierdzona w rejestrze regulatora ORAZ serwery gier zweryfikowane jako autentyczne punkty końcowe dostawcy w dniu audytu.",
    },
    scanned: {
      label: "Niepotwierdzone / brak w rejestrze",
      desc: "Wyszukiwanie nie zwróciło oficjalnego dopasowania domeny w rejestrze w dniu audytu. Operator może używać niewymienionej domeny, licencji nieujętej w indeksie lub działać bez publicznego zezwolenia.",
    },
    listed: {
      label: "Wpis niesprawdzony",
      desc: "Zaindeksowany z publicznych źródeł internetowych. Automatyczne skanowanie zaplecza i śledzenie serwerów slotów nie zostały jeszcze przeprowadzone dla tej strony.",
    },
    flagged: {
      label: "Oznaczone / wykryto rozbieżność",
      desc: "Audyt wykrył niespójności: np. niezgodność domen, uszkodzone pieczęcie licencji lub przekierowania przez serwer proxy podczas uruchamiania slotów.",
    },
    statusFilterAll: "Wszystkie statusy",
    lastScanned: "Data audytu",
    viewReport: "Zobacz pełny raport",
  },
  casinos: {
    title: "Katalog zweryfikowanych kasyn",
    description:
      "Katalog kasyn online śledzonych przez Swift Secured. Sprawdź aktualne statusy licencji, oficjalne wpisy regulatorów i wyniki audytu serwerów gier.",
    eyebrow: "Katalog kasyn",
    h1: "Katalog audytów kasyn online",
    sub: "Przeszukaj śledzone kasyna, aby zobaczyć statusy w rejestrach licencji, jurysdykcje wydające licencje i dzienniki weryfikacji serwerów gier. Obecność w katalogu nie oznacza rekomendacji.",
    searchPlaceholder: "Szukaj po nazwie kasyna, domenie lub jurysdykcji...",
    searchLabel: "Szukaj audytowanych kasyn",
    empty: "Żadne kasyno nie pasuje do podanych kryteriów wyszukiwania.",
  },
  checker: {
    inputPlaceholder: "Wpisz nazwę kasyna lub adres strony (np. Lucky Coin Casino lub luckycoin.cash)",
    inputLabel: "Nazwa kasyna, adres strony lub numer licencji",
    button: "Sprawdź",
    steps: [
      { n: "1", title: "Wpisz nazwę kasyna lub adres strony" },
      { n: "2", title: "Przeszukujemy nasz indeks audytowy" },
      { n: "3", title: "Przeczytaj wpis o licencji i skanie" },
    ],
    footnote: "Kasyn w indeksie: {count}. Podajemy numer licencji publikowany przez kasyno, informację, czy występuje on w rejestrze organu, który go wydał, oraz datę sprawdzenia.",
    emptyInput: "Prosimy najpierw wpisać nazwę kasyna, adres strony lub numer licencji.",
    recordEyebrow: "Wpis w indeksie",
    jurisdiction: "Jurysdykcja",
    operator: "Licencjobiorca",
    licence: "Numer licencji",
    licenceNone: "Brak opublikowanego numeru",
    licenceExpiry: "Licencja wygasa",
    licenceExpired: "Ta data już minęła. Prosimy zwrócić się do kasyna o aktualną licencję.",
    licenceMatched: "Odnaleziono w {registry} podczas sprawdzenia w dniu {date}",
    licenceSecondhand: "Pochodzi ze źródeł publicznych. Jeszcze nie odnaleziono w rejestrze.",
    scan: "Skan techniczny",
    scanNone: "Jeszcze nie wykonano",
    noteLabel: "Co zauważyliśmy",
    viewRecord: "Otwórz pełny wpis",
    multipleTitle: "Pasuje więcej niż jedno kasyno",
    multipleBody: "Prosimy wybrać właściwe kasyno.",
    notFoundTitle: "Brak w indeksie",
    notFoundBody: "Nie mamy wpisu pod taką nazwą, adresem ani numerem licencji. To nie jest ustalenie przeciwko kasynu — oznacza tylko, że jeszcze go nie zindeksowaliśmy.",
    notFoundBrowse: "Przeglądaj indeks",
    notFoundApply: "Zgłoś kasyno do sprawdzenia",
  },
  verify: {
    title: "Zweryfikuj autentyczność pieczęci",
    description:
      "Wpisz identyfikator pieczęci Swift Secured, aby potwierdzić aktualny status weryfikacji operatora i zapobiec używaniu fałszywych plakietek.",
    h1: "Zweryfikuj pieczęć Swift Secured",
    sub: "Wpisz unikalny identyfikator pieczęci widoczny na stronie kasyna, aby potwierdzić ważność oficjalnego audytu i przejrzeć stojące za nim ślady weryfikacji.",
    inputPlaceholder: "np. CS-2026-0042",
    inputLabel: "Identyfikator pieczęci",
    button: "Zweryfikuj pieczęć",
    validStatus: "Ważna i aktywna zweryfikowana pieczęć",
    operator: "Marka kasyna / operator:",
    jurisdiction: "Jurysdykcja regulatora:",
    lastChecked: "Data ostatniego audytu:",
    invalidStatus: "Niezarejestrowany / nieprawidłowy identyfikator pieczęci",
    invalidBody:
      "Dla tego identyfikatora nie istnieje aktywny wpis weryfikacji. Strona pokazująca ten znak może używać niezatwierdzonego lub podrobionego obrazu plakietki. Jeśli podejrzewasz oszustwo,",
    contactUs: "skontaktuj się z naszym zespołem",
  },
  apply: {
    title: "Wniosek o certyfikację kasyna",
    description:
      "Zgłoś swoją markę kasyna online do niezależnego audytu licencji i serwerów gier. Buduj zaufanie graczy i zwiększaj liczbę pierwszych depozytów (FTD).",
    eyebrow: "Rozwiązania dla operatorów",
    h1: "Zleć audyt i weryfikację swojego kasyna",
    sub: "Formularz dla operatorów kasyn i właścicieli platform. Wyświetlanie zweryfikowanej pieczęci Swift Secured dowodzi ważności Twojej licencji i autentyczności serwerów slotów, usuwając opory gracza na etapie depozytu. Audyty są bezpłatne przez pierwsze 6 miesięcy.",
    fieldName: "Nazwa marki kasyna",
    fieldNamePlaceholder: "Główna nazwa marki widoczna dla graczy",
    fieldWebsite: "Aktywna domena strony",
    fieldJurisdiction: "Regulator wydający licencję",
    fieldJurisdictionPlaceholder: "np. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Firmowy adres e-mail do kontaktu",
    fieldMessage: "Dodatkowe uwagi techniczne",
    fieldMessagePlaceholder:
      "Numer licencji, bezpośredni adres URL do walidacji lub dane kontaktu technicznego",
    submit: "Wyślij do audytu",
    successTitle: "Wniosek wysłany pomyślnie",
    successBody:
      "Nasz system i zespół ds. zgodności sprawdzą Twoją domenę i przeprowadzą testy śledzenia serwerów gier. Aktualizację statusu audytu otrzymasz na adres {email} w ciągu 24–48 godzin.",
  },
  pricing: {
    title: "Warunki i cennik zweryfikowanej pieczęci",
    description:
      "Bezpłatna 6-miesięczna pieczęć weryfikacji dla kasyn online. Bez opłat wdrożeniowych, bez karty kredytowej, bez udziału w przychodach. Zamień wątpliwości graczy w depozyty.",
    eyebrow: "Rozwiązania dla operatorów",
    h1: "Zamień sceptycyzm graczy w pierwsze depozyty",
    sub: "Nowe marki kasyn tracą nawet 70% potencjalnych depozytorów z powodu braku zaufania. Wyświetlanie niezależnej, odpornej na manipulacje pieczęci weryfikacji natychmiast potwierdza Twoją aktywną licencję i oryginalne serwery gier, podnosząc współczynniki konwersji bez utrudnień przy wdrożeniu.",
    billingTitle: "Szczegóły programu weryfikacji",
  },
  billingNotes: [
    {
      title: "Bezpłatny audyt i pieczęć przez 6 miesięcy",
      desc: "Przejdź pełny audyt i wyświetlaj zweryfikowaną pieczęć bezpłatnie przez 6 miesięcy od dnia integracji. Bez opłat wdrożeniowych, bez karty kredytowej i bez ukrytych umów.",
    },
    {
      title: "Prosty wymóg linku zwrotnego",
      desc: "Wymagamy jedynie podlinkowania plakietki w stopce do Twojego certyfikatu audytu na naszej stronie. Dzięki temu gracze mogą weryfikować ślady techniczne w czasie rzeczywistym. Zero udziału w przychodach i zero opłat za polecenia.",
    },
    {
      title: "Przejrzyste opcje po okresie próbnym",
      desc: "Przed końcem 6-miesięcznego okresu próbnego przedstawimy przejrzyste opcje cenowe przedłużenia. Nie ma automatycznych obciążeń ani wymuszonych subskrypcji — zachowujesz pełną kontrolę.",
    },
    {
      title: "Natychmiastowa opcja usunięcia",
      desc: "Aby zakończyć integrację, wystarczy w dowolnym momencie usunąć fragment kodu plakietki ze stopki swojej strony. Twoje historyczne wpisy sprawdzeń pozostają zarchiwizowane w naszym katalogu wraz z pełnymi znacznikami czasu audytu.",
    },
  ],
  badge: {
    title: "Formaty i integracja zweryfikowanej pieczęci",
    description:
      "Poznaj projekty pieczęci Swift Secured, formaty wizualne plakietki i wytyczne techniczne dotyczące tego, jak gracze weryfikują autentyczne linki audytu.",
    eyebrow: "Wizualne materiały pieczęci",
    h1: "Integracja plakietki Swift Secured i sposób działania weryfikacji",
    sub: "Dostępna w trzech responsywnych formatach zaprojektowanych do pasków w stopce i formularzy rejestracji. Każda autentyczna plakietka działa jako bezpośredni kryptograficzny link do aktualnego raportu z audytu. Statyczne obrazy bez aktywnych linków nie przechodzą weryfikacji.",
    primaryTitle: "Plakietka standardowa",
    primaryBody:
      "Zaprojektowana do stopek stron, obok pieczęci licencyjnych. Czysta i autorytatywna. Kliknięcie otwiera aktualny raport weryfikacji kasyna z dowodami śledzenia serwerów gier i znacznikami czasu sprawdzeń w rejestrze.",
    compactTitle: "Wariant kompaktowy / jednoliniowy",
    compactBody:
      "Format poziomy dopasowany do rzędów ikon płatności lub mobilnych pasków nawigacji. Zachowuje pełne śledzenie weryfikacji i prowadzi do dokładnie tego samego certyfikatu audytu.",
    darkTitle: "Wariant konturowy do ciemnego motywu",
    darkBody:
      "Wersja konturowa o wysokim kontraście, stworzona do ciemnych interfejsów kasyn. Zachowuje maksymalną czytelność bez naruszania spójności wizualnej marki.",
    ctaHeading: "Gotowy, aby pokazać zweryfikowaną pieczęć na swojej stronie?",
    ctaButton: "Uzyskaj certyfikat",
  },
  faqPage: {
    title: "Najczęściej zadawane pytania",
    description:
      "Odpowiedzi na pytania o sprawdzanie licencji w rejestrach, wykrywanie skryptowanych slotów, niezależność od operatorów i kryteria weryfikacji.",
    eyebrow: "FAQ i przejrzystość",
    h1: "Najczęściej zadawane pytania graczy i operatorów",
    ctaHeading: "Prowadzisz kasyno? Złóż wniosek o audyt w mniej niż 2 minuty.",
    ctaButton: "Uzyskaj certyfikat za darmo",
  },
  faqs: [
    {
      q: "Co plakietka Swift Secured gwarantuje graczowi?",
      a: "Plakietka dowodzi, że we wskazanym dniu audytu domena kasyna była aktywnie zarejestrowana w oficjalnych rejestrach regulatora ORAZ że żądania spinów łączyły się bezpośrednio z certyfikowanymi serwerami dostawców (co potwierdza nieskryptowane sloty z oryginalnym RTP).",
    },
    {
      q: "Jak wykrywacie skryptowane lub podrobione sloty?",
      a: "Podczas testów badamy wychodzący ruch sieciowy w momencie uruchomienia slotów. Oficjalne gry przesyłają matematykę i zasoby bezpośrednio z certyfikowanych domen dostawców (np. Pragmatic, Evolution). Jeśli strona przekierowuje żądania spinów przez nieznane pośrednie serwery proxy, aby sfałszować wyniki gry, jest oznaczana jako skryptowana.",
    },
    {
      q: "Czy kasyno może zapłacić za weryfikację albo za zmianę ustaleń audytu?",
      a: "Absolutnie zerowy wpływ płatności. Status weryfikacji jest ustalany automatycznie na podstawie zapytań do rejestrów i technicznych śladów serwerowych. Operatorzy mogą wyświetlać plakietki audytu, ale nie mogą kupić zmiany statusu ani usunąć dzienników historycznych wpisów.",
    },
    {
      q: "Co oznacza dla kasyna status „niepotwierdzone”?",
      a: "Niepotwierdzone oznacza, że nasz system nie znalazł pasującego wpisu domeny w oficjalnej bazie danych regulatora w dniu audytu. Może się tak zdarzyć, gdy rejestry są niedostępne, zatwierdzenia domen czekają na rozpatrzenie lub operator używa niezarejestrowanych domen lustrzanych. To obserwacja faktyczna, a nie oświadczenie prawne.",
    },
    {
      q: "Czy Swift Secured może rozwiązać mój spór o wypłatę z kasynem?",
      a: "Nie zarządzamy kontami graczy ani nie obsługujemy płatności. Nasz certyfikat audytu zawiera jednak bezpośrednie linki do oficjalnego organu licencyjnego wskazanego we wpisie, gdzie możesz złożyć oficjalną skargę regulacyjną.",
    },
    {
      q: "Dlaczego gracze i operatorzy mają ufać Swift Secured?",
      a: "Ponieważ każde twierdzenie da się sprawdzić jednym kliknięciem. Publikujemy surowe adresy wyszukiwań w rejestrach i ślady punktów końcowych sieci slotów, aby gracze nie musieli polegać na obietnicach ani recenzjach afiliacyjnych.",
    },
  ],
  about: {
    title: "O Swift Secured",
    description:
      "Poznaj misję Swift Secured: dostarczanie przejrzystych, zautomatyzowanych i niezależnych audytów licencji kasyn oraz serwerów gier.",
    eyebrow: "O nas",
    h1: "Niezależna weryfikacja oparta na faktach technicznych",
    sub: "Swift Secured dostarcza zautomatyzowane audyty techniczne dla kasyn online. Weryfikujemy wpisy w rejestrach regulatorów i audytujemy połączenia z serwerami slotów, publikując ustalenia z dokładnymi znacznikami czasu. Bez płatnych miejsc, bez linków afiliacyjnych i bez manipulowanych wyników.",
    card1Title: "Zero komercyjnej stronniczości",
    card1Body:
      "Żadne kasyno nie może kupić zweryfikowanej pieczęci bez przejścia sprawdzeń technicznych. Odmawiamy udziału w przychodach afiliacyjnych, poleceń pay-per-click i sponsorowanych rankingów ocen. Ustalenia pozostają całkowicie obiektywne.",
    card2Title: "Wyznaczony zakres techniczny",
    card2Body:
      "Otwarcie mówimy o możliwościach audytu: potwierdzamy oficjalne wpisy licencyjne i nieskryptowane punkty końcowe slotów, wyraźnie zaznaczając ograniczenia dotyczące wewnętrznych finansów operatora i zasad obstawiania przez graczy.",
  },
};

export default pl;
