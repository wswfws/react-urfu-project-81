import Tag, { type TagAttributes } from './Tag.js';

type FormMethod = 'get' | 'post';

type Template = Record<string, unknown>;

type FormOptions = {
  url?: string;
  method?: FormMethod;
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

const asAttributes = (attributes: Record<string, unknown>): TagAttributes =>
  attributes as TagAttributes;

export class FormBuilder {
  private readonly parts: string[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): this {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = 'input', ...attributes } = options;
    const value = this.template[name];

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
        asAttributes({ name, type: 'text', value: value ?? '', ...attributes }),
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
    const { url = '#', method = 'post', ...attributes } = options;
    const builder = new FormBuilder(template);

    callback(builder);

    return new Tag(
      'form',
      asAttributes({ action: url, method, ...attributes }),
      builder.toString(),
    ).toString();
  }
}

export type { FormMethod, FormOptions, InputOptions, Template };
