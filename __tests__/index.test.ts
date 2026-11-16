import { describe, expect, it } from 'vitest';
import HexletCode from '../src/index';

describe('HexletCode.formFor', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' };

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

  it('renders inputs and a textarea', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<input name="name" type="text" value="rob">' +
        '<textarea cols="20" rows="40" name="job">hexlet</textarea>' +
        '</form>',
    );
  });

  it('passes custom attributes to an input', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<input name="name" type="text" value="rob" class="user-input">' +
        '<input name="job" type="text" value="hexlet">' +
        '</form>',
    );
  });

  it('allows overriding textarea rows and cols', () => {
    const form = HexletCode.formFor(template, { url: '#' }, (f) => {
      f.input('job', { as: 'textarea', rows: 50, cols: 50 });
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<textarea cols="50" rows="50" name="job">hexlet</textarea>' +
        '</form>',
    );
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
        '<input name="name" type="text" value="">' +
        '<textarea cols="20" rows="40" name="job"></textarea>' +
        '</form>',
    );
  });

  it('uses default submit value', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.submit();
    });

    expect(form).toBe('<form action="#" method="post"><input type="submit" value="Save"></form>');
  });

  it('escapes template values', () => {
    const form = HexletCode.formFor({ name: '<b>&"' }, {}, (f) => {
      f.input('name');
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<input name="name" type="text" value="&lt;b&gt;&amp;&quot;">' +
        '</form>',
    );
  });
});
