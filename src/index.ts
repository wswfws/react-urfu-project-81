import Tag, { type TagAttributes } from './Tag.js';

type FormMethod = 'get' | 'post';

type Template = Record<string, unknown>;

type FormOptions = {
  method?: FormMethod;
  action?: string;
  [key: string]: unknown;
};

type InputOptions = {
  as?: 'input' | 'textarea';
  [key: string]: unknown;
};

const escapeHtml = (value: unknown): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const asAttributes = (attributes: Record<string, unknown>): TagAttributes =>
  attributes as TagAttributes;

export class FormBuilder {
  private readonly parts: string[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): this {
    const { as = 'input', ...attributes } = options;
    const value = this.template[name];

    this.parts.push(
      new Tag('label', { for: name }, escapeHtml(capitalize(name))).toString(),
    );

    if (as === 'textarea') {
      this.parts.push(
        new Tag(
          'textarea',
          asAttributes({ cols: 20, rows: 40, ...attributes, name }),
          escapeHtml(value ?? ''),
        ).toString(),
      );
      return this;
    }

    this.parts.push(
      new Tag(
        'input',
        asAttributes({ name, type: 'text', ...attributes, value: value ?? '' }),
      ).toString(),
    );
    return this;
  }

  submit(value = 'Save'): this {
    this.parts.push(new Tag('input', { type: 'submit', value }).toString());
    return this;
  }

  toString(): string {
    return this.parts.join('');
  }
}

export default class HexletCode {
  static formFor(
    template: Template,
    options: FormOptions = {},
    callback: (builder: FormBuilder) => void,
  ): string {
    const { method = 'post', action = '#', ...attributes } = options;
    const builder = new FormBuilder(template);

    callback(builder);

    return new Tag('form', asAttributes({ action, method, ...attributes }), builder.toString()).toString();
  }
}

export { Tag };
export type { FormMethod, FormOptions, InputOptions, TagAttributes, Template };
