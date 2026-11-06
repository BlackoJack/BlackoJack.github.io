# Сайт-визитка DevOps-инженера

Одна страница, которая объясняет услуги человеку без технического бэкграунда. Собрана на Astro 7 + Tailwind 4, без клиентского фреймворка: JS только там, где он реально нужен (схема в hero, выбор болей, форма).

## Запуск

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # статика в dist/
```

## Что и где менять

Всё личное — в одном файле: **`src/config.ts`**.

| Поле | Что это | Сейчас |
|---|---|---|
| `name`, `shortName`, `initials` | Имя в шапке, hero и футере | заполнено |
| `contacts.telegram` | ссылка и подпись для кнопки «Написать» | `@devopsnsk` — проверьте |
| `contacts.email` | почта в блоке контактов | из резюме — проверьте |
| `contacts.github` | профиль GitHub | `BlackoJack` |
| `portfolio` | ссылка на репозиторий-портфолио | `k8s-gitops-platform` |
| `siteUrl` | домен (нужен для sitemap и OG) | `https://example.com` — поменяйте |
| `selfHosted` | `true` → в футере появится строка «сайт работает на платформе, которую я собрал» | `false` |
| `meta.*` | title, description, картинка для превью | заполнено |

Тексты — в `src/data/`:

- `services.ts` — семь услуг: заголовок, описание, что входит, «кому подходит» и к каким болям привязана.
- `pains.ts` — шесть болей в блоке «Узнаёте себя?».
- `cases.ts` — три кейса с цифрами.
- `process.ts` — четыре шага и четыре формата работы.
- `faq.ts` — вопросы и ответы.

Дизайн — в `src/styles/global.css`: палитра и шрифты в блоке `@theme` (цвет `--color-lime`, фон `--color-paper` и т.д.). Меняете токен — меняется весь сайт.

## Форма заявок

Есть два режима, выбор — переменная окружения `PUBLIC_FORM_MODE` при сборке:

**`static`** (GitHub Pages, GitLab Pages, nginx). Серверных функций нет, поэтому форма сразу открывает Telegram с уже собранным текстом заявки — остаётся нажать «Отправить». Ничего настраивать не нужно.

**`api`** (по умолчанию, Cloudflare Pages). Заявка уходит `POST /api/lead`, обработчик — `functions/api/lead.ts`, дальше в Telegram.

1. Создайте бота у [@BotFather](https://t.me/BotFather), получите токен.
2. Узнайте свой `chat_id` у [@userinfobot](https://t.me/userinfobot).
3. В Cloudflare: **Settings → Environment variables** → `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
4. Перезапустите деплой.

## Деплой на GitHub Pages

Репозиторий = содержимое этой папки (`package.json` в корне). Всё остальное уже настроено: `.github/workflows/deploy.yml` собирает сайт и публикует его.

1. Создайте репозиторий на GitHub (публичный — Pages бесплатны; приватному нужен платный план).
2. Запушьте:
   ```bash
   git remote add origin git@github.com:BlackoJack/<имя-репозитория>.git
   git push -u origin main
   ```
3. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Пуш в `main` → через минуту сайт на `https://blackojack.github.io/<имя-репозитория>/`.

Как это работает: workflow сам подставляет `SITE_URL` и `BASE_PATH`, поэтому сайт живёт в подпапке с именем репозитория и стили не отваливаются. Если репозиторий называется `<ник>.github.io`, база автоматически станет корнем.

**Свой домен**: добавьте `public/CNAME` с доменом (`example.com`) и настройте CNAME-запись у регистратора. Затем поменяйте `SITE_URL`/`BASE_PATH` в workflow на `https://example.com` и `/`.

**Pull request** собирается, но не деплоится — удобно смотреть, что ничего не сломалось.

## Деплой на GitLab Pages

Всё лежит в `.gitlab-ci.yml`:

- `build:mr` — сборка на каждый merge request (артефакт `dist`, живёт неделю).
- `pages` — на основной ветке: собирает, переименовывает `dist` → `public` и публикует.

`SITE_URL` и `BASE_PATH` подставляются из `CI_PAGES_URL`, так что подпапка проекта учитывается автоматически. Адрес — `https://<группа>.gitlab.io/<проект>/`.

## Свой сервер / кластер

Соберите `PUBLIC_FORM_MODE=static npm run build` и отдайте `dist/` любым веб-сервером. Пример для nginx:

```nginx
server {
  listen 443 ssl http2;
  server_name example.com;

  root /var/www/site/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(css|js|woff2|svg|png)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

Сертификат — cert-manager, если сайт живёт в вашем кластере. Тогда включите `selfHosted: true` в конфиге.

## Что проверить перед публикацией

- [ ] Домен в `src/config.ts` и в `astro.config.mjs` (иначе sitemap и OG-ссылки ведут на example.com).
- [ ] Контакты: Telegram, почта, GitHub.
- [ ] Тексты услуг — прочитать вслух: не осталось ли слов, которые вы бы не сказали клиенту.
- [ ] Цифры в кейсах — только те, которые сможете подтвердить.
- [ ] Заголовок `index.html` и description — они видны в поиске и в превью Telegram.
- [ ] Прогнать Lighthouse на `npm run preview`.
- [ ] Проверить на телефоне: первый экран должен умещаться без скролла.

## Структура

```
src/
  config.ts            ← все личные данные
  data/                ← тексты (услуги, кейсы, вопросы)
  components/          ← секции страницы
  layouts/Base.astro   ← head, мета, JSON-LD
  pages/index.astro    ← сборка страницы
  styles/global.css    ← токены, схемы, анимации
functions/api/lead.ts  ← приём формы → Telegram
public/                ← favicon, og.png, robots.txt
```

## Чего здесь сознательно нет

- Выдуманных отзывов, логотипов клиентов и наград.
- Цен: вместо них — «вилка после разговора».
- Стоковых фото и иконок-эмодзи.
- Аналитики: если понадобится, Cloudflare Web Analytics подключается одной строкой и не требует cookie-баннера.
