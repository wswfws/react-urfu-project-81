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

const renderAttributes = (attributes: Record<string, unknown>): string =>
  Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => (value === true ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`))
    .join('');

export class FormBuilder {
  private readonly parts: string[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): this {
    const { as = 'input', ...attributes } = options;
    const value = this.template[name];

    this.parts.push(`<label for="${escapeHtml(name)}">${escapeHtml(capitalize(name))}</label>`);

    if (as === 'textarea') {
      this.parts.push(
        `<textarea${renderAttributes({ cols: 20, rows: 40, ...attributes, name })}>${escapeHtml(value ?? '')}</textarea>`,
      );
      return this;
    }

    this.parts.push(
      `<input${renderAttributes({ name, type: 'text', ...attributes, value: value ?? '' })}>`,
    );
    return this;
  }

  submit(value = 'Save'): this {
    this.parts.push(`<input${renderAttributes({ type: 'submit', value })}>`);
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

    return `<form${renderAttributes({ action, method, ...attributes })}>${builder.toString()}</form>`;
  }
}

export type { FormMethod, FormOptions, InputOptions, Template };
