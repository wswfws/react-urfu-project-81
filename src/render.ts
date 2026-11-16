import Tag, { type TagAttributes } from './Tag.js';
import type { FormItem, FormModel } from './model.js';

const escapeHtml = (value: unknown): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const asAttributes = (attributes: Record<string, unknown>): TagAttributes =>
  attributes as TagAttributes;

const renderLabel = (name: string): string =>
  new Tag('label', { for: name }, escapeHtml(capitalize(name))).toString();

const renderItem = (item: FormItem): string => {
  if (item.type === 'submit') {
    return new Tag('input', { type: 'submit', value: item.value }).toString();
  }

  if (item.type === 'textarea') {
    return (
      renderLabel(item.name) +
      new Tag(
        'textarea',
        asAttributes({ cols: 20, rows: 40, ...item.attributes, name: item.name }),
        escapeHtml(item.value ?? ''),
      ).toString()
    );
  }

  return (
    renderLabel(item.name) +
    new Tag(
      'input',
      asAttributes({ name: item.name, type: 'text', value: item.value ?? '', ...item.attributes }),
    ).toString()
  );
};

export const renderForm = (model: FormModel): string =>
  new Tag(
    'form',
    asAttributes({ action: model.url, method: model.method, ...model.attributes }),
    model.items.map(renderItem).join(''),
  ).toString();
