import { describe, expect, it } from 'vitest';
import HexletCode from '../src/index';

describe('HexletCode.formFor', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' };

  it('renders a full form', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit('Wow');
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="name">Name</label><input name="name" type="text" value="rob">' +
        '<label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea>' +
        '<input type="submit" value="Wow">' +
        '</form>',
    );
  });

  it('uses default form options', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name');
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="name">Name</label><input name="name" type="text" value="rob">' +
        '</form>',
    );
  });

  it('accepts custom form attributes', () => {
    const form = HexletCode.formFor(
      template,
      { method: 'get', action: '/search', class: 'form' },
      () => {},
    );

    expect(form).toBe('<form action="/search" method="get" class="form"></form>');
  });

  it('passes custom attributes to an input', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="name">Name</label>' +
        '<input name="name" type="text" class="user-input" value="rob">' +
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
        '<label for="name">Name</label>' +
        '<input name="name" type="text" value="&lt;b&gt;&amp;&quot;">' +
        '</form>',
    );
  });

  it('renders an empty textarea for a missing value', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('missing', { as: 'textarea', cols: 5 });
    });

    expect(form).toBe(
      '<form action="#" method="post">' +
        '<label for="missing">Missing</label>' +
        '<textarea cols="5" rows="40" name="missing"></textarea>' +
        '</form>',
    );
  });
});
