# Генератор форм на TypeScript

[![hexlet-check](https://github.com/wswfws/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/wswfws/react-urfu-project-81/actions)
[![CI](https://github.com/wswfws/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/wswfws/react-urfu-project-81/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=wswfws_react-urfu-project-81&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=wswfws_react-urfu-project-81)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=wswfws_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=wswfws_react-urfu-project-81)

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
  f.input('name');
  f.input('job', { as: 'textarea' });
  f.submit('Wow');
});

console.log(form);
```

```html
<form action="#" method="post">
  <label for="name">Name</label>
  <input name="name" type="text" value="rob" />
  <label for="job">Job</label>
  <textarea cols="20" rows="40" name="job">hexlet</textarea>
  <input type="submit" value="Wow" />
</form>
```

## Команды

```bash
make build          # сборка пакета
make lint           # линтер и проверка форматирования
make typecheck      # проверка типов
make test           # тесты
make test-coverage  # тесты с покрытием
```

## SonarQube

Чтобы включить анализ и бейджик покрытия, нужно:

1. Импортировать репозиторий в [SonarCloud](https://sonarcloud.io/) (или SonarQube).
2. Убедиться, что `sonar.projectKey` и `sonar.organization` в
   `sonar-project.properties` совпадают с настройками проекта.
3. Добавить в GitHub Secrets репозитория токен `SONAR_TOKEN`
   (Settings → Secrets and variables → Actions).

После этого шаг `SonarQube Scan` в CI будет запускаться автоматически и
отправлять `coverage/lcov.info` в SonarQube.

---

[Хекслет](https://ru.hexlet.io/) — практические курсы программирования.
