import type { FormItem, FormModel } from './model.js';
import { renderForm } from './render.js';

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

export class FormBuilder {
  private items: readonly FormItem[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): this {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = 'input', ...attributes } = options;

    this.items = [
      ...this.items,
      {
        type: as,
        name,
        value: this.template[name],
        attributes: { ...attributes },
      },
    ];

    return this;
  }

  submit(value = 'Save'): this {
    this.items = [...this.items, { type: 'submit', value }];
    return this;
  }

  getItems(): readonly FormItem[] {
    return this.items;
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

    const form: FormModel = {
      url,
      method,
      attributes: { ...attributes },
      items: builder.getItems(),
    };

    return renderForm(form);
  }
}

export type { FormMethod, FormOptions, InputOptions, Template };
