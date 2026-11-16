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
  f.input('job', { as: 'textarea' });
  f.submit();
});

console.log(form);
```

```html
<form method="post" action="#">
  <label for="name">Name</label>
  <input name="name" type="text" value="rob" class="user-input" />
  <label for="job">Job</label>
  <textarea cols="20" rows="40" name="job">hexlet</textarea>
  <input type="submit" value="Save" />
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
