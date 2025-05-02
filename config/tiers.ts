import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Online Business Setup",
    price: "$20",
    href: siteConfig.openSourceURL || "#",
    description: "Ideal for individuals or small businesses looking to set up their online presence",
    features: [
      "Website",
      "Social media booster",
      "Basic chatbot integration",
      "Social media content",
      "Copywriting tricks",
    ],
    buttonText: "Buy Now",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Website",
    href: siteConfig.authors[0].twitter || "#",
    description: "Perfect for businesses ready to establish a professional website and digital presence",
    price: "$10",
    features: [
      "E-commerce websites",
      "Portfolio websites",
      "Landing pages",
      "Membership/community websites",
      "Free domain + unlimited hosting",
    ],
    buttonText: "Buy Now",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Setup Bisnis Online",
    price: "Rp50.000",
    href: siteConfig.openSourceURL || "#",
    description: "Mulai Nisnis Anda, Kami Siapkan Semua",
    features: [
      "Website",
      "Chatbot Otomatis",
      "Social Media Konten",
      "Social Media Booster",
    ],
    buttonText: "Bayar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Website",
    href: siteConfig.authors[0].twitter || "#",
    description: "Website untuk Bisnis anda gratis Domain my.id / web.id",
    price: "Rp24.999",
    features: [
      "Toko Online",
      "Landing Page",
      "Portofolio",
      "Profil Bisnis",
      "Unlimited Hosting & Gratis Domain",
    ],
    buttonText: "Bayar",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "オープンソース / 無料",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description: "GitHubリポジトリからランディングページのボイラープレートを自由にクローンできます。",
    features: [
      "無料",
      "全コードへのアクセス",
      "二次開発",
      "MITライセンス",
    ],
    buttonText: "始める",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "カスタマイズ",
    href: siteConfig.authors[0].twitter || "#",
    description: "専用のランディングページをカスタマイズするために支払います。",
    price: "$188",
    features: [
      "全コードへのアクセス",
      "二次開発",
      "独占スタイル",
      "1対1のサービス",
      "より精巧なページ",
    ],
    buttonText: "お問い合わせ",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "مفتوح المصدر / مجاني",
    price: "مجاناً",
    href: siteConfig.openSourceURL || "#",
    description: "يمكنك نسخ قالب صفحة الهبوط من مستودع GitHub بحرية.",
    features: [
      "مجاني",
      "الوصول إلى كامل الكود",
      "التطوير الثانوي",
      "رخصة MIT",
    ],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "تخصيص",
    href: siteConfig.authors[0].twitter || "#",
    description: "ادفع لتخصيص صفحة هبوط حصرية.",
    price: "$188",
    features: [
      "الوصول إلى كامل الكود",
      "التطوير الثانوي",
      "أسلوب حصري",
      "خدمة فردية",
      "صفحات أكثر دقة",
    ],
    buttonText: "اتصل بنا",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Código Abierto / Gratuito",
    price: "Gratis",
    href: siteConfig.openSourceURL || "#",
    description: "Clona libremente la plantilla de página de aterrizaje desde el repositorio de GitHub.",
    features: [
      "Gratis",
      "Acceso a todo el código",
      "Desarrollo secundario",
      "Licencia MIT",
    ],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Personalizar",
    href: siteConfig.authors[0].twitter || "#",
    description: "Paga para personalizar una página de aterrizaje exclusiva.",
    price: "$188",
    features: [
      "Acceso a todo el código",
      "Desarrollo secundario",
      "Estilo exclusivo",
      "Servicio personalizado",
      "Páginas más exquisitas",
    ],
    buttonText: "Contáctanos",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Открытый Источник / Бесплатно",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description: "Свободно клонируйте шаблон лендинга из репозитория на GitHub.",
    features: [
      "Бесплатно",
      "Доступ ко всему коду",
      "Вторичная разработка",
      "Лицензия MIT",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Настройка",
    href: siteConfig.authors[0].twitter || "#",
    description: "Оплатите персонализацию эксклюзивной лендинг страницы.",
    price: "$188",
    features: [
      "Доступ ко всему коду",
      "Вторичная разработка",
      "Эксклюзивный стиль",
      "Индивидуальное обслуживание",
      "Более изысканные страницы",
    ],
    buttonText: "Связаться с нами",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

interface TiersCollection {
  [key: string]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU,
};
