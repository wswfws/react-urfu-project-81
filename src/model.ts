export type FieldType = 'input' | 'textarea';

interface FieldItem {
  readonly type: FieldType;
  readonly name: string;
  readonly value: unknown;
  readonly attributes: Readonly<Record<string, unknown>>;
}

interface SubmitItem {
  readonly type: 'submit';
  readonly value: string;
}

export type FormItem = FieldItem | SubmitItem;

export interface FormModel {
  readonly url: string;
  readonly method: string;
  readonly attributes: Readonly<Record<string, unknown>>;
  readonly items: readonly FormItem[];
}
