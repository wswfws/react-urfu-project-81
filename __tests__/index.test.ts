import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import HexletCode from '../src/index';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

const fixture = (name: string): string =>
  readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf8').trim();

describe('HexletCode.formFor', () => {
  it('renders an empty form with default options', () => {
    expect(HexletCode.formFor(template, {}, () => {})).toBe(
      '<form action="#" method="post"></form>',
    );
  });

  it('uses url as the form action', () => {
    expect(HexletCode.formFor(template, { url: '/users' }, () => {})).toBe(
      '<form action="/users" method="post"></form>',
    );
  });

  it('accepts custom form attributes', () => {
    const form = HexletCode.formFor(
      template,
      { method: 'get', url: '/search', class: 'form' },
      () => {},
    );

    expect(form).toBe('<form action="/search" method="get" class="form"></form>');
  });

  it('renders labels, fields and the default submit button', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit();
    });

    expect(form).toBe(fixture('full-form.html'));
  });

  it('allows overriding the submit button text', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit('Wow');
    });

    expect(form).toBe(fixture('custom-submit.html'));
  });

  it('passes custom attributes to fields', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', {
        class: 'user-input',
        required: true,
        disabled: false,
        placeholder: undefined,
      });
      f.input('job', { as: 'textarea', rows: 50, cols: 50 });
    });

    expect(form).toBe(fixture('custom-attributes.html'));
  });

  it('throws when a field does not exist in the template', () => {
    expect(() =>
      HexletCode.formFor(template, { url: '/users' }, (f) => {
        f.input('name');
        f.input('job', { as: 'textarea' });
        f.input('age');
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });

  it('renders empty values for explicit undefined fields', () => {
    const form = HexletCode.formFor({ name: undefined, job: undefined }, {}, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="name">Name</label>' +
        '<input name="name" type="text" value="">' +
        '<label for="job">Job</label>' +
        '<textarea cols="20" rows="40" name="job"></textarea>' +
        '</form>',
    );
  });

  it('escapes template values', () => {
    const form = HexletCode.formFor({ name: '<b>&"' }, {}, (f) => {
      f.input('name');
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="name">Name</label>' +
        '<input name="name" type="text" value="&lt;b&gt;&amp;&quot;">' +
        '</form>',
    );
  });
});
