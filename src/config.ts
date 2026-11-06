/**
 * ─────────────────────────────────────────────────────────────
 *  ВСЁ ЛИЧНОЕ — ЗДЕСЬ.
 *  Больше нигде в проекте контактов и имён нет: меняете тут,
 *  сайт подхватывает автоматически (шапка, hero, форма, футер).
 * ─────────────────────────────────────────────────────────────
 */

export const config = {
  // Как вас зовут на сайте
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
    title: "Иван Раенко — DevOps-инженер: чтобы сервисы не падали",
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

export type Config = typeof config;
