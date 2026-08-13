import type { PartialTranslation } from "../types";

/**
 * tr. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const tr: PartialTranslation = {
  nav: {
    howItWorks: "Nasıl çalışır",
    methodology: "Neleri kontrol ediyoruz",
    pricing: "Casinolar için",
    about: "Hakkımızda",
    faq: "SSS",
    casinos: "Casino dizini",
    verify: "Rozet sorgula",
    apply: "Sertifika alın",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    primaryLabel: "Birincil",
  },
  footer: {
    verifySeal: "Mührü doğrulayın",
    apply: "Mühür için başvurun",
    faq: "SSS",
  },
  stickyCta: {
    note: "Bir online casino mu işletiyorsunuz? Bağımsız bir denetimle oyuncu güvenini ve ilk yatırımları artırın.",
    button: "Ücretsiz sertifika alın",
  },
  seal: {
    certified: "Lisans ve slotlar doğrulandı",
  },
  stats: [
    {
      count: "listed",
      label: "Takip edilen casinolar",
    },
    {
      count: "topJurisdiction",
      label: "{regulator} lisansına sahip",
    },
    {
      count: "registryMatched",
      label: "Sicilde doğrulanan lisanslar",
    },
    {
      count: "badged",
      label: "Bugün doğrulanmış mührü gösteren",
    },
  ],
  common: {
    certifiedSince: "Kayıt tarihi",
    viewSealRecord: "Denetim kaydını aç",
    youProvide: "Bunun için gerekenler:",
  },
  home: {
    title: "Swift Secured — Bağımsız Casino ve Oyun Sunucusu Doğrulaması",
    description:
      "Casino lisanslarını resmi düzenleyici kayıtlarında doğrulayın ve para yatırmadan önce script'li slotları tespit edin. Herkese açık zaman damgalarıyla bağımsız teknik denetim.",
    badge: "Bağımsız denetim hizmeti. %100 tarafsız.",
    h1: "Körü körüne para yatırmayı bırakın: Lisansı ve gerçek oyun sunucularını doğrulayın",
    sub: "Online casinoları gerçek zamanlı olarak denetliyoruz. Slotların %100 orijinal olduğunu teyit etmek için canlı oyun sunucularını izliyor, aktif lisans kaydını doğruluyor ve siz paranızı riske atmadan önce dolandırıcı taklitleri işaretliyoruz.",
    ctaApply: "Neleri kontrol ediyoruz",
    ctaVerify: "Rozet sorgula",
    howEyebrow: "Nasıl çalışır",
    howTitle:
      "Gerçek zamanlı kayıt sorgusundan değiştirilemez tarihli denetime",
    criteriaEyebrow: "Güvenlik standartları",
    criteriaTitle: "Denetimimiz neyi doğruluyor — ve arkasındaki katı kurallar",
    operatorsEyebrow: "Herkese Açık Dizin",
    operatorsTitle:
      "Dizinimizde takip edilen casinolar — doğrulanmış, teyit edilmemiş veya işaretlenmiş",
    viewAllCasinos: "Casino dizinini inceleyin",
    ctaHeading: "Şeffaf teknik metodoloji",
    ctaSub:
      "Oyun sunucusu isteklerini nasıl izlediğimizi, düzenleyici kayıtlarını nasıl karşılaştırdığımızı ve olumlu değerlendirme karşılığında operatörlerden ödeme almadan manipüle edilmiş RTP'yi nasıl tespit ettiğimizi tam olarak öğrenin.",
    ctaButton: "Metodolojiyi okuyun",
  },
  criteria: [
    {
      title: "Doğrudan Düzenleyici Kayıt Doğrulaması",
      desc: "Yüzlerce dolandırıcı site, sayfa altlığında sahte lisans logoları gösteriyor. Lisans numaralarını ve aktif web sitesi alan adlarını doğrudan resmi düzenleyici veritabanlarında doğruluyoruz.",
    },
    {
      title: "Eksiksiz Düzenleyici Kimliği ve Yargı Bölgesi Kuralları",
      desc: "Lisans kurumları koruma düzeyi bakımından birbirinden çok farklıdır. Her kayıt, arkasındaki hukuki gücü değerlendirebilmeniz için düzenleyicinin tam adını ve lisans kimliğini öne çıkarır.",
    },
    {
      title: "Kesin Doğrulama Tarihi ve Zaman Damgası",
      desc: "Lisanslar sona erer, askıya alınır veya alan adları bir gecede değişir. Sabit iddiaların hiçbir anlamı yoktur — her kayıt, sistemin sorguyu yaptığı kesin UTC tarihini yazar.",
    },
    {
      title: "Satın Alınamaz ve Kurcalanamaz Denetim Kayıtları",
      desc: "Hiçbir casino, bulguları değiştirmek, kötü denetim sonuçlarını gizlemek veya kayıt günlüklerini silmek için ödeme yapamaz. Doğrulama durumu yalnızca kayıt verileri veya sunucu izleri değiştiğinde değişir.",
    },
    {
      title: "Gerçek Oyun Sunucusu Denetimi (Script'li Slotlara Karşı)",
      desc: "Sahte casinolar oyun grafiklerini kopyalar, ancak spin matematiğini hileli RTP'ye sahip özel sunucular üzerinden yönlendirir. Her spinin doğrudan resmi sağlayıcı sunucularına bağlandığından emin olmak için canlı ağ isteklerini inceliyoruz.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Lisans ve Alan Adı Verisini Çıkarma",
      desc: "Beyan edilen lisans numarasını, şirket bilgisini ve tam oyun URL'sini doğrudan hedef casinonun herkese açık ön yüzünden okuyoruz.",
    },
    {
      n: "2",
      title: "Kayıt Karşılaştırması ve Sunucu İzleme",
      desc: "Lisansı veren düzenleyicinin resmi aktif veritabanında eşleşen alan adı onaylarını arıyor ve oyunlar başlatıldığında giden websocket/HTTP akışlarını analiz ediyoruz.",
    },
    {
      n: "3",
      title: "Tarihli Denetim Sertifikasını Yayınlama",
      desc: "Sonuç ister teyit edilmiş, ister eksik, ister doğrulanmamış olsun, eksiksiz denetim kaydı yapılan her kontrolü ayrıntılandıran değiştirilemez bir zaman damgasıyla yayına girer.",
    },
    {
      n: "4",
      title: "Tek Tıkla Bağımsız Doğrulama",
      desc: "Her kayıt, ham kayıt bağlantılarını ve ağ izleme kanıtını sunar; böylece oyuncular bulguları bağımsız olarak doğrulayabilir.",
    },
  ],
  process: {
    title: "Nasıl Çalışır — Doğrulama Süreci",
    description:
      "Swift Secured'ın casino lisans verilerini nasıl denetlediği, orijinal oyun sunucusu uç noktalarını nasıl izlediği ve kurcalanamaz, herkese açık denetim kayıtlarını nasıl yayınladığı.",
    eyebrow: "Doğrulama Süreci",
    h1: "Casinolar nasıl denetlenir, doğrulanır ve dizine eklenir",
    sub: "Teknik prosedürümüz tamamen otomatiktir ve yayımlanmıştır; bu da tam tekrarlanabilirlik sağlar. Yayımlanmış lisans kimliklerini çıkarıyor, resmi düzenleyici listeleriyle karşılaştırıyor ve casino erişimi ya da oyuncu kaydı gerektirmeden canlı oyun isteklerini izliyoruz.",
    ctaHeading: "Lisanslı bir online casino mu işletiyorsunuz?",
    ctaButton: "Doğrulanmış mühür için başvurun",
  },
  stages: [
    {
      n: "1",
      title: "Herkese Açık Veri ve Uç Nokta Çıkarımı",
      duration: "Ön yüz taraması",
      desc: "Lisans beyanlarını, operatörün şirket bilgilerini ve site alan adı URL'lerini doğrudan hedef sitenin sayfa altlığından okuyoruz. Doğrulanmamış takip kayıtları, tam bir canlı çıkarım tamamlanana kadar açıkça kontrol edilmemiş olarak işaretlenir.",
      provide: "Oyunculardan veya operatörlerden hiçbir şey istenmez.",
    },
    {
      n: "2",
      title: "Düzenleyici Kaydı ve Sunucu İzleme",
      duration: "Yalnızca herkese açık kayıt",
      desc: "Onaylı alan adı listeleri için resmi düzenleyici veritabanlarını arıyoruz. Aynı anda, oyun matematiğinin doğrudan sağlayıcı CDN'lerinden (örneğin Pragmatic, Evolution) yüklendiğini teyit etmek için test oyun oturumları başlatıyoruz.",
      provide: "Kayıt veya ücret gerekmez.",
    },
    {
      n: "3",
      title: "Bağımsız Durum ve Zaman Damgası Yayını",
      duration: "Okuması ücretsiz",
      desc: 'Sonuçlar, doğrulamanın kesin tarihiyle birlikte anında oluşturulur. Bir lisans bulunamazsa veya alan adı doğrulaması başarısız olursa, kayıt bulguları gizlemek yerine şeffaf biçimde "teyit edilmedi" der.',
      provide: "Tüm kullanıcılar için açık erişim.",
    },
    {
      n: "4",
      title: "Sürekli İzleme ve Yeniden Kontrol Döngüleri",
      duration: "Her yeniden kontrolde",
      desc: "Kayıtlar ve oyun alan adları zamanla değişir. Yeniden kontrol yapıldığında durum ve tarih otomatik olarak güncellenir. Gizli değişiklikleri önlemek için geçmiş kontrol günlükleri arşivde kalır.",
      provide: "Rozetteki denetim tarihini her zaman kontrol edin.",
    },
  ],
  methodology: {
    title: "Teknik Denetim Metodolojisi",
    description:
      "Tam doğrulama şartnamesi: düzenleyici kayıtlarını nasıl kontrol ettiğimiz, orijinal slot sunucularını nasıl denetlediğimiz, tarihleri nasıl kaydettiğimiz ve lisanslar sona erdiğinde rozetleri nasıl iptal ettiğimiz.",
    eyebrow: "Metodoloji ve Kapsam",
    h1: "Teknik doğrulama metodolojisi ve operasyonel sınır",
    sub: "Denetimler, özel erişim veya operatör müdahalesi olmadan, sıradan bir oyuncunun bakış açısıyla dışarıdan yürütülür. Yayımlanan lisans numaralarını test ediyor, resmi kayıtlarda aktif alan adı onaylarını kontrol ediyor ve canlı slot sunucusu isteklerini izliyoruz. Her bulgu tarihlendirilir ve yayımlanır.",
    checksTitle: "Doğrulanan teknik parametreler",
    limitsTitle: "Denetim sınırları ve kısıtları",
    limitsSub:
      "Her teknik denetimin katı sınırları vardır. Neyi doğruladığımızı (lisans geçerliliği, resmi slot sunucuları) ve dışarıdan neyin denetlenemeyeceğini (iç muhasebe, bireysel para çekme kararları) açıkça belirtiyoruz.",
    monitoringTitle: "Zorunlu tarih damgası ve izleme",
    monitoringBody:
      "Düzenleyici veritabanları sürekli güncellenir: lisanslar sona erer, alan adları değişir veya sertifikalar iptal edilir. Bir kontrol yalnızca yapıldığı an için doğrudur. Kontrol tarihini belirgin şekilde gösteriyoruz. Eski tarihler yeni bir otomatik denetimi tetikler. Arşivlenmiş bulgular hiçbir zaman sessizce üzerine yazılmaz.",
    suspensionTitle: "Otomatik rozet iptal kuralları",
    suspensionBody:
      "Bir lisans kayıttan kaybolursa veya bir site script'li oyun sunucularına geçerse, rozet durumu anında güncellenir. Şikâyetler veya rakip ihbarları durumu doğrudan değiştirmez — otomatik bir yeniden kontrolü tetikler. Geçersiz bir lisans için hiçbir ücret veya sponsorluk rozeti geri getiremez.",
    ctaHeading: "Para yatırmadan önce casinoyu her zaman doğrulayın.",
    ctaButton: "Casino dizininde arayın",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Lisans ve Kayıt Eşleşmesi",
      summary:
        "Resmi lisans kaydını teyit eder ve aktif oyun alan adını düzenleyici kayıtlarında doğrular.",
      checks: [
        "Lisans kimliği doğrudan operatörün ön yüzünden alınır",
        "Lisansı veren düzenleyicinin resmi veritabanında doğrulanır",
        "Aktif web sitesi alan adı onaylı listeyle karşılaştırılır",
        "Yargı bölgesi parametrelerinde tam şeffaflık",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Gerçek Oyun Sunucusu Denetimi",
      summary:
        "Slotların gerçek sağlayıcı CDN'lerinde çalışmasını sağlar ve manipüle edilmiş RTP'ye sahip sahte oyunları engeller.",
      checks: [
        "Oyun başlatılırken ağ isteklerinin incelenmesi",
        "Oyun matematiği uç noktalarının doğrulanması (Pragmatic, Play'n GO, Hacksaw vb.)",
        "Proxy sunucularının ve sahte slot kopyalarının tespiti",
        "Sağlayıcı yapılandırmalarının değiştirilmediğinin teyidi",
      ],
    },
    {
      id: "dated-records",
      name: "Tarih ve Saat Kanıtı",
      summary:
        "Her bulgu, sistemin siteyi tam olarak ne zaman denetlediğini gösteren değiştirilemez bir UTC zaman damgası taşır.",
      checks: [
        "Doğrulama durumunun yanında açıkça yazılmış kontrol tarihi",
        "Kontrol edilmemiş kayıtlar açıkça belirtilir",
        "Görünür geçmiş kayıt günlükleri",
        "Yeniden denetimde anında durum güncellemesi",
      ],
    },
    {
      id: "strict-independence",
      name: "Bağımsızlık Güvenceleri",
      summary:
        "Sıfır affiliate yanlılığı, sıfır ücretli durum değişikliği ve sıfır tanıtım amaçlı sıralama.",
      checks: [
        "Affiliate bağlantısı veya tıklama başına ödemeli casino yönlendirmesi yok",
        "Ücretli puan yükseltmesi veya sponsorlu rozet yerleşimi yok",
        "Editoryal görüşler yerine nesnel teknik bulgular",
        "Oyuncuların kendi doğrulamasını yapabilmesi için açık prosedür",
      ],
    },
  ],
  limits: [
    {
      title: "Oyun RTP'si ve Rastgele Sayı Üreteçleri (RNG)",
      desc: "Uzun vadeli istatistiksel RTP'yi veya RNG rastgeleliğini değerlendirmek, dahili sunucu erişimi ve milyonlarca turda kaydedilmiş milyonlarca spin gerektirir. Slotların doğrudan resmi sağlayıcı sunucularına (iTech Labs veya eCOGRA gibi akredite test laboratuvarlarını kullanan sağlayıcılara) bağlandığını teyit etsek de, bağımsız RNG laboratuvar testlerini kendimiz yürütmüyoruz.",
    },
    {
      title: "Dahili Hesap ve Bankacılık Prosedürleri",
      desc: "Denetimler bir ziyaretçinin bakış açısıyla yapılır. Oyuncu kimlik doğrulaması (KYC), hesap kapatmaları, bonus çevrim şartları ve ödeme işleme kuyrukları casino yazılımının içinde özel kalır ve dış teknik kontrollerin kapsamı dışındadır.",
    },
    {
      title: "Garantili Para Çekme Güvenliği",
      desc: "Dış denetimler bir casino operatörünün özel banka hesaplarını veya likidite rezervlerini inceleyemez. Geçerli bir lisans ve orijinal slotlar, mevzuata uygunluğu ve oyunların gerçekliğini teyit eder, ancak operasyonel ödeme gücünü veya ödeme hızını garanti edemez.",
    },
    {
      title: 'Öznel "Güvenli Casino" Onayları',
      desc: "Lisans, koşullara tabi bir düzenleyici izindir. Gereklilikler yargı bölgeleri arasında (örneğin MGA, Curacao, Anjouan) önemli ölçüde farklılık gösterir. 4 Ağustos 2026 itibarıyla, dizindeki 223 casinodan 215'i Anjouan belgesine sahiptir. Bilinçli kararlar verebilmeniz için ham gerçekleri ve sunucu kanıtlarını sunuyoruz — asla genel güvenlik garantileri vermiyoruz.",
    },
  ],
  directory: {
    certified: {
      label: "Doğrulanmış Lisans ve Slotlar",
      desc: "Lisans numarası eşleşmesi düzenleyici kaydında teyit edildi VE oyun sunucuları denetim tarihinde gerçek sağlayıcı uç noktaları olarak doğrulandı.",
    },
    scanned: {
      label: "Teyit Edilmedi / Kayıtta Yok",
      desc: "Arama, denetim tarihinde alan adı için resmi kayıtta eşleşme döndürmedi. Operatör listelenmemiş bir alan adı ya da dizine girmemiş bir lisans kullanıyor olabilir veya herkese açık bir izin olmadan faaliyet gösteriyor olabilir.",
    },
    listed: {
      label: "Kontrol Edilmemiş Kayıt",
      desc: "Herkese açık web kaynaklarından dizine eklendi. Bu site için otomatik arka uç taraması ve slot sunucusu izleme henüz yapılmadı.",
    },
    flagged: {
      label: "İşaretlendi / Tutarsızlık Bulundu",
      desc: "Denetim tutarsızlıklar tespit etti: örneğin alan adı uyuşmazlıkları, bozuk lisans mühürleri veya slot başlatılırken proxy sunucusu yönlendirmeleri.",
    },
    statusFilterAll: "Tüm Durumlar",
    lastScanned: "Denetim Tarihi",
    viewReport: "Tam raporu görüntüle",
  },
  casinos: {
    title: "Doğrulanmış Casino Dizini",
    description:
      "Swift Secured tarafından takip edilen online casinoların dizini. Güncel lisans durumlarını, resmi düzenleyici kayıtlarını ve oyun sunucusu denetim sonuçlarını inceleyin.",
    eyebrow: "Casino Dizini",
    h1: "Online casino denetim dizini",
    sub: "Lisans kayıt durumlarını, lisansı veren yargı bölgelerini ve oyun sunucusu doğrulama günlüklerini görmek için takip edilen casinoları arayın. Listelenen kayıtlar bir tavsiye anlamına gelmez.",
    searchPlaceholder:
      "Casino adı, alan adı veya yargı bölgesine göre arayın...",
    searchLabel: "Denetlenen casinolarda ara",
    empty: "Arama kriterlerinize uyan casino yok.",
  },
  verify: {
    title: "Mühür Gerçekliğini Doğrulayın",
    description:
      "Bir operatörün güncel doğrulama durumunu teyit etmek ve sahte rozet kullanımını önlemek için Swift Secured Mühür Kimliğini girin.",
    h1: "Swift Secured mührünü doğrulayın",
    sub: "Resmi denetim geçerliliğini teyit etmek ve altındaki doğrulama izlerini incelemek için bir casino sitesinde gösterilen benzersiz Mühür Kimliğini girin.",
    inputPlaceholder: "örn. CS-2026-0042",
    inputLabel: "Mühür Kimliği",
    button: "Mührü doğrula",
    validStatus: "Geçerli ve Aktif Doğrulanmış Mühür",
    operator: "Casino Markası / Operatör:",
    jurisdiction: "Düzenleyici Yargı Bölgesi:",
    lastChecked: "Son Denetim Tarihi:",
    invalidStatus: "Kayıtlı Değil / Geçersiz Mühür Kimliği",
    invalidBody:
      "Bu kimlik için aktif bir doğrulama kaydı yok. Bu işareti gösteren site onaysız veya sahte bir rozet görseli kullanıyor olabilir. Dolandırıcılıktan şüpheleniyorsanız,",
    contactUs: "ekibimizle iletişime geçin",
  },
  apply: {
    title: "Casino Sertifikasyon Başvurusu",
    description:
      "Online casino markanızı bağımsız lisans ve oyun sunucusu denetimi için gönderin. Oyuncu güvenini inşa edin ve İlk Kez Yatırımları (FTD) artırın.",
    eyebrow: "Operatör Çözümleri",
    h1: "Casinonuzu denetletin ve doğrulatın",
    sub: "Casino operatörleri ve platform sahipleri için form. Doğrulanmış bir Swift Secured mührü göstermek, lisansınızın geçerliliğini ve slot sunucularınızın gerçekliğini kanıtlar; para yatırma aşamasındaki oyuncu tereddüdünü ortadan kaldırır. Denetimler ilk 6 ay ücretsizdir.",
    fieldName: "Casino Marka Adı",
    fieldNamePlaceholder: "Oyunculara gösterilen ana marka adı",
    fieldWebsite: "Aktif Web Sitesi Alan Adı",
    fieldJurisdiction: "Lisans Veren Düzenleyici",
    fieldJurisdictionPlaceholder: "örn. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Kurumsal İletişim E-postası",
    fieldMessage: "Ek Teknik Notlar",
    fieldMessagePlaceholder:
      "Lisans numarası, doğrudan doğrulama URL'si veya teknik iletişim bilgisi",
    submit: "Denetim için gönder",
    successTitle: "Başvuru Başarıyla Gönderildi",
    successBody:
      "Sistemimiz ve uyum ekibimiz alan adınızı inceleyecek ve oyun sunucusu izleme testleri yapacaktır. 24–48 saat içinde {email} adresine bir denetim durumu bildirimi alacaksınız.",
  },
  pricing: {
    title: "Doğrulanmış Mühür Koşulları ve Fiyatlandırma",
    description:
      "Online casinolar için 6 ay ücretsiz doğrulama mührü. Kurulum ücreti yok, kredi kartı gerekmez, gelir paylaşımı yok. Oyuncu şüphesini yatırıma dönüştürün.",
    eyebrow: "Operatör Çözümleri",
    h1: "Oyuncu Şüphesini İlk Yatırımlara Dönüştürün",
    sub: "Yeni casino markaları, güven eksikliği yüzünden potansiyel yatırımcıların %70'ine kadarını kaybediyor. Bağımsız ve kurcalanamaz bir doğrulama mührü göstermek, aktif lisansınızı ve orijinal oyun sunucularınızı anında teyit eder; kurulum zahmeti olmadan dönüşüm oranlarını yükseltir.",
    billingTitle: "Doğrulama Programı Ayrıntıları",
  },
  billingNotes: [
    {
      title: "6 Ay Ücretsiz Denetim ve Mühür",
      desc: "Entegrasyon tarihinden itibaren 6 ay boyunca tam denetimden geçin ve doğrulanmış mührü ücretsiz gösterin. Kurulum ücreti yok, kredi kartı yok, gizli sözleşme yok.",
    },
    {
      title: "Basit Karşılıklı Bağlantı Şartı",
      desc: "Tek istediğimiz, sayfa altlığındaki rozetin sitemizdeki size özel denetim sertifikasına bağlanmasıdır. Bu, oyuncuların teknik izleri gerçek zamanlı doğrulamasını sağlar. Gelir paylaşımı veya yönlendirme ücreti yok.",
    },
    {
      title: "Deneme Sonrası Şeffaf Seçenekler",
      desc: "6 aylık deneme süreniz bitmeden önce şeffaf yenileme fiyat seçenekleri sunacağız. Otomatik ücretlendirme veya zorunlu abonelik yoktur — kontrol tamamen sizde kalır.",
    },
    {
      title: "Anında Kaldırma Seçeneği",
      desc: "Entegrasyonu sonlandırmak için rozet kod parçacığını istediğiniz zaman sitenizin altlığından kaldırmanız yeterlidir. Geçmiş kontrol kayıtlarınız, tüm denetim zaman damgalarıyla birlikte dizinimizde arşivde kalır.",
    },
  ],
  badge: {
    title: "Doğrulanmış Mühür Biçimleri ve Entegrasyonu",
    description:
      "Swift Secured mühür tasarımlarını, görsel rozet biçimlerini ve oyuncuların gerçek denetim bağlantılarını nasıl doğruladığına dair teknik yönergeleri inceleyin.",
    eyebrow: "Görsel Mühür Varlıkları",
    h1: "Swift Secured rozet entegrasyonu ve doğrulama davranışı",
    sub: "Sayfa altlığı şeritleri ve kayıt formları için tasarlanmış üç duyarlı biçimde sunulur. Her gerçek rozet, canlı denetim raporuna doğrudan kriptografik bir bağlantı olarak çalışır. Aktif bağlantısı olmayan sabit görseller doğrulamadan geçmez.",
    primaryTitle: "Standart Rozet",
    primaryBody:
      "Lisans mühürlerinin yanında web sitesi altlıkları için tasarlandı. Sade ve güven veren bir görünüm. Tıklandığında casinonun canlı doğrulama raporunu, oyun sunucusu izleme kanıtları ve kayıt kontrolü zaman damgalarıyla birlikte açar.",
    compactTitle: "Kompakt / Tek Satır Varyantı",
    compactBody:
      "Ödeme simgesi satırları veya mobil gezinme çubukları için uyarlanmış yatay biçim. Tam doğrulama izlemesini korur ve tam olarak aynı denetim sertifikasına götürür.",
    darkTitle: "Koyu Tema Çizgili Varyantı",
    darkBody:
      "Koyu casino arayüzleri için tasarlanmış yüksek kontrastlı çerçeveli sürüm. Marka bütünlüğünden ödün vermeden en yüksek okunabilirliği korur.",
    ctaHeading: "Doğrulanmış mührü sitenizde göstermeye hazır mısınız?",
    ctaButton: "Sertifika alın",
  },
  faqPage: {
    title: "Sıkça Sorulan Sorular",
    description:
      "Lisans kaydı kontrolleri, script'li slot tespiti, operatör bağımsızlığı ve doğrulama kriterleri hakkında yanıtlar.",
    eyebrow: "SSS ve Şeffaflık",
    h1: "Oyuncular ve operatörler tarafından sıkça sorulan sorular",
    ctaHeading:
      "Casino mu işletiyorsunuz? 2 dakikadan kısa sürede denetim için başvurun.",
    ctaButton: "Ücretsiz sertifika alın",
  },
  faqs: [
    {
      q: "Swift Secured rozeti bir oyuncuya ne garanti eder?",
      a: "Rozet, belirtilen denetim tarihinde casinonun alan adının resmi düzenleyici kayıtlarında aktif olarak kayıtlı olduğunu VE oyun spin isteklerinin doğrudan sertifikalı sağlayıcı sunucularına bağlandığını (yani script'li olmayan, orijinal RTP'li slotları) kanıtlar.",
    },
    {
      q: "Script'li veya sahte slotları nasıl tespit ediyorsunuz?",
      a: "Test sırasında, slotlar başlatıldığında giden ağ trafiğini inceliyoruz. Resmi oyunlar matematiği ve varlıkları doğrudan sertifikalı sağlayıcı alan adlarından (örneğin Pragmatic, Evolution) aktarır. Bir site, oyun sonuçlarını sahteleştirmek için spin isteklerini bilinmeyen ara proxy sunucularından geçiriyorsa, script'li olarak işaretlenir.",
    },
    {
      q: "Bir casino doğrulanmak veya denetim bulgularını değiştirmek için ödeme yapabilir mi?",
      a: "Ödemenin kesinlikle hiçbir etkisi yoktur. Doğrulama durumu, kayıt sorguları ve teknik sunucu izleriyle otomatik olarak belirlenir. Operatörler denetim rozetlerini gösterebilir, ancak durum değişikliği satın alamaz veya geçmiş kayıt günlüklerini silemez.",
    },
    {
      q: 'Bir casino için "teyit edilmedi" durumu ne anlama gelir?',
      a: "Teyit edilmedi, sistemimizin denetim tarihinde resmi düzenleyici veritabanında eşleşen bir alan adı kaydı bulamadığı anlamına gelir. Bu, kayıtlar çevrimdışıysa, alan adı onayları beklemedeyse veya operatör kayıtsız yansı siteler kullanıyorsa olabilir. Bu, hukuki bir beyan değil, olgusal bir gözlemdir.",
    },
    {
      q: "Swift Secured bir casino ile yaşadığım para çekme anlaşmazlığını çözebilir mi?",
      a: "Oyuncu hesaplarını yönetmiyor veya ödeme işlemiyoruz. Ancak denetim sertifikamız, kayıtta adı geçen resmi lisans kurumuna doğrudan bağlantılar sunar; resmi düzenleyici şikâyetlerinizi oraya iletebilirsiniz.",
    },
    {
      q: "Oyuncular ve operatörler neden Swift Secured'a güvenmeli?",
      a: "Çünkü her iddia tek tıkla doğrulanabilir. Ham kayıt arama adreslerini ve slot ağ uç noktası izlerini yayımlıyoruz; böylece oyuncuların vaatlere veya affiliate incelemelerine güvenmesi gerekmez.",
    },
  ],
  about: {
    title: "Swift Secured Hakkında",
    description:
      "Swift Secured'ın misyonunu öğrenin: şeffaf, otomatik ve bağımsız casino lisans ve oyun sunucusu denetimleri sunmak.",
    eyebrow: "Hakkımızda",
    h1: "Teknik gerçekler üzerine kurulu bağımsız doğrulama",
    sub: "Swift Secured, online casinolar için otomatik teknik denetimler sağlar. Düzenleyici kayıt girişlerini doğruluyor ve slot sunucusu bağlantılarını denetliyor, bulguları kesin zaman damgalarıyla yayımlıyoruz. Ücretli yerleşim yok, affiliate bağlantısı yok, değiştirilmiş sonuç yok.",
    card1Title: "Sıfır Ticari Yanlılık",
    card1Body:
      "Hiçbir casino, teknik kontrollerden geçmeden doğrulanmış bir mühür satın alamaz. Affiliate gelir paylaşımını, tıklama başına ödemeli yönlendirmeleri ve sponsorlu puan sıralamalarını reddediyoruz. Bulgular tamamen nesnel kalır.",
    card2Title: "Tanımlı Teknik Çevre",
    card2Body:
      "Denetim yeteneklerimizi şeffaf biçimde belirtiyoruz: resmi lisans kayıtlarını ve script'li olmayan slot uç noktalarını teyit ediyoruz; operatörün iç finansmanı veya oyuncu bahis kuralları konusundaki sınırları da açıkça not ediyoruz.",
  },
};

export default tr;
