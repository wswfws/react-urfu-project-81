type TagAttributeValue = string | number | boolean | null | undefined;

export type TagAttributes = Record<string, TagAttributeValue>;

const SINGLE_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const escapeAttribute = (value: TagAttributeValue): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const renderAttributes = (attributes: TagAttributes): string =>
  Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => (value === true ? ` ${name}` : ` ${name}="${escapeAttribute(value)}"`))
    .join('');

class Tag {
  readonly name: string;

  readonly attributes: TagAttributes;

  readonly body: string | undefined;

  constructor(name: string, attributes: TagAttributes = {}, body?: string) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
  }

  toString(): string {
    const renderedAttributes = renderAttributes(this.attributes);

    if (SINGLE_TAGS.has(this.name)) {
      return `<${this.name}${renderedAttributes}>`;
    }

    return `<${this.name}${renderedAttributes}>${this.body ?? ''}</${this.name}>`;
  }
}

export default Tag;
export { Tag };
