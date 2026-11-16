# Генератор форм на TypeScript

[![hexlet-check](https://github.com/wswfws/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/wswfws/react-urfu-project-81/actions)
[![CI](https://github.com/wswfws/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/wswfws/react-urfu-project-81/actions/workflows/ci.yml)

Библиотека для генерации HTML-форм. Берёт на себя обработку ошибок и рутинную
работу, для которой обычно приходится писать много шаблонного кода.

## Установка

```bash
make install
```

## Использование

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name', { class: 'user-input' });
  f.input('job', { as: 'textarea', rows: 50, cols: 50 });
});

console.log(form);
```

```html
<form action="#" method="post">
  <input name="name" type="text" value="rob" class="user-input" />
  <textarea cols="50" rows="50" name="job">hexlet</textarea>
</form>
```

Если поля нет в шаблоне, `input()` выбрасывает ошибку
`Field '<name>' does not exist in the template.`

## Команды

```bash
make build          # сборка пакета
make lint           # линтер и проверка форматирования
make typecheck      # проверка типов
make test           # тесты
make test-coverage  # тесты с покрытием
```

Покрытие считается через Vitest, порог задан в `vitest.config.ts`
(`coverage.thresholds`), поэтому CI падает при его просадке.

---

[Хекслет](https://ru.hexlet.io/) — практические курсы программирования.
