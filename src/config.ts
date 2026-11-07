/**
 * ─────────────────────────────────────────────────────────────
 *  ВСЁ ЛИЧНОЕ — ЗДЕСЬ.
 *  Больше нигде в проекте контактов и имён нет: меняете тут,
 *  сайт подхватывает автоматически (шапка, hero, форма, футер).
 * ─────────────────────────────────────────────────────────────
 */

export const config = {
  // ─── Бренд ───────────────────────────────────────────────
  // Имя сайта в шапке, футере, <title> и OG-картинке.
  // Меняете здесь — меняется везде. Варианты на замену: "не падает", "99.9", "infra"
  brand: {
    wordmark: "uptime",
    tagline: "инфраструктура, которая не падает",
  },

  // Как вас зовут (нужно в блоке «кто я» и в подписи футера)
  name: "Иван Раенко",
  shortName: "Иван",
  initials: "ИР",
  role: "DevOps-инженер",
  city: "Новосибирск",

  // TODO: домен после покупки (и в astro.config.mjs тоже)
  siteUrl: "https://example.com",

  contacts: {
    // TODO: проверьте ссылку — сейчас взята из резюме
    telegram: { label: "@devopsnsk", url: "https://t.me/devopsnsk" },
    // TODO: проверьте ссылку Max — сейчас взята из резюме
    max: {
      label: "Max",
      url: "https://max.ru/u/f9LHodD0cOJRMeqwry1H3VOwIUXQYiUHdfjxw4NfCPLSptlnNq9DlD3CL60",
    },
    // TODO: проверьте номер для WhatsApp (сейчас — номер из резюме)
    whatsapp: { label: "WhatsApp", url: "https://wa.me/79130197199" },
    // TODO: проверьте почту — сейчас взята из резюме
    email: { label: "devopsnskru@gmail.com", url: "mailto:devopsnskru@gmail.com" },
    // TODO: проверьте профиль
    github: { label: "github.com/BlackoJack", url: "https://github.com/BlackoJack" },
  },

  // Публичное портфолио — используется в блоке «Кто я» и в кейсах
  portfolio: {
    label: "k8s-gitops-platform",
    url: "https://github.com/BlackoJack/k8s-gitops-platform",
  },

  // Куда уходит форма. Работает на Cloudflare Pages (functions/api/lead.ts).
  // formMode: "api"    — POST на formAction, ответ уходит в Telegram через функцию;
  // formMode: "static" — функции нет (GitHub Pages, GitLab Pages, nginx):
  //                      кнопка сразу открывает Telegram с готовым текстом.
  // Переключается переменной окружения PUBLIC_FORM_MODE при сборке.
  formMode: (import.meta.env.PUBLIC_FORM_MODE === "static" ? "static" : "api") as "api" | "static",
  formAction: "/api/lead",

  // true → в футере появится строка «сайт работает на платформе, которую я собрал»
  selfHosted: false,
  selfHostedUrl: "",

  meta: {
    title: "uptime — инфраструктура, которая не падает",
    description:
      "Настраиваю инфраструктуру так, чтобы сайт не падал, релизы выходили за минуты, а данные не терялись. 8 лет опыта, удалённо. Первый разговор — бесплатно.",
    // OG-картинка 1200×630 лежит в public/og.png
    ogImage: "/og.png",
  },
} as const;

/** Ссылка на Telegram с заранее заполненным текстом (если знаем username). */
export function telegramWithText(text: string): string {
  const url = new URL(config.contacts.telegram.url);
  url.searchParams.set("text", text);
  return url.toString();
}

/** Мессенджеры в порядке показа: hero, блок контактов, футер, мобильная плашка. */
export const channels = [
  { id: "telegram", label: "Telegram", url: config.contacts.telegram.url },
  { id: "max", label: "Max", url: config.contacts.max.url },
  { id: "whatsapp", label: "WhatsApp", url: config.contacts.whatsapp.url },
] as const;

export type Config = typeof config;
