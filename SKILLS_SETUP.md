# UI/UX Skills — установка среды Codex

Проектные правила находятся в `AGENTS.md`, а официальные инструкции 21st.dev включены в `.agents/skills/`.

## Полная установка инструментов на компьютере с Codex
Открой терминал в корне проекта:

```bash
npx ui-ux-pro-max-cli init --ai codex
codex plugin marketplace add 21st-dev/codex-plugin
```

Установка 21st.dev может потребовать выбрать плагин и авторизоваться в интерфейсе Codex. Эти команды **не выполнялись** через GitHub. Проверяй наличие `.agents/skills/ui-ux-pro-max/SKILL.md` после установки UI UX Pro Max; до этого в проекте действуют только правила `AGENTS.md` и скачанные инструкции 21st.dev.

Официальные источники:
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://github.com/21st-dev/skill
- https://github.com/21st-dev/codex-plugin

Важно: 21st.dev в первую очередь ориентирован на React/shadcn. Наш проект остаётся ванильным HTML/CSS/JS, поэтому компоненты применяй только при совместимости.
