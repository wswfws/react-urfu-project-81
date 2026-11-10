import { describe, expect, it } from 'vitest';
import Tag from '../src/Tag';

describe('Tag', () => {
  it('renders a single tag without attributes', () => {
    expect(new Tag('br').toString()).toBe('<br>');
  });

  it('renders a single tag with attributes', () => {
    expect(new Tag('img', { src: 'path/to/image' }).toString()).toBe('<img src="path/to/image">');
  });

  it('renders an input submit', () => {
    expect(new Tag('input', { type: 'submit', value: 'Save' }).toString()).toBe(
      '<input type="submit" value="Save">',
    );
  });

  it('ignores the body of a single tag', () => {
    expect(new Tag('br', {}, 'body').toString()).toBe('<br>');
  });

  it('renders a paired tag with a body', () => {
    expect(new Tag('label', {}, 'Email').toString()).toBe('<label>Email</label>');
  });

  it('renders a paired tag with attributes and a body', () => {
    expect(new Tag('label', { for: 'email' }, 'Email').toString()).toBe(
      '<label for="email">Email</label>',
    );
  });

  it('renders an empty paired tag', () => {
    expect(new Tag('div').toString()).toBe('<div></div>');
  });

  it('skips null, undefined and false attributes, keeps true as a flag', () => {
    const tag = new Tag('input', {
      disabled: true,
      readonly: false,
      value: undefined,
      name: null,
      type: 'text',
    });

    expect(tag.toString()).toBe('<input disabled type="text">');
  });

  it('escapes special characters in attribute values', () => {
    expect(new Tag('input', { value: 'a "b" <c> & d' }).toString()).toBe(
      '<input value="a &quot;b&quot; &lt;c&gt; &amp; d">',
    );
  });
});
