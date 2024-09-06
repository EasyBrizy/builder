import { ContentPlaceholder } from "./ContentPlaceholder.js"
import { PlaceholderInterface } from "./PlaceholderInterface.js"
import { RegistryInterface } from "./RegistryInterface.js"
import { Attr } from "./types.js"

type ContentPlaceholderType = ContentPlaceholder

export class Extractor {
  private static readonly PLACEHOLDER_REGEX: RegExp =
    /(?<placeholder>{{\s*(?<placeholderName>.+?)\s*(?<attributes>\s+((?:\w+(?:\[(?:\w+)?\])?\s*=\s*(?:'|\"|\&quot;|\&apos;|\&#x27;)(?:.*?)(?<!\\\\)(?:'|\"|\&quot;|\&apos;|\&#x27;)\s*)*))?}}(?:(?<content>[\s\S]*?){{\s*end_\2?\s*}})?)/ims

  private static readonly ATTRIBUTE_REGEX: RegExp =
    /(?<attr_name>\w+)\s*=\s*(?<quote>'|"|&quot;|&apos;|&#x27;)(?<attr_value>.*?)\2/g

  private registry: RegistryInterface | null = null

  constructor(registry?: RegistryInterface) {
    // there were cases were the page had mode that 2Mb of html and
    // this is making sure the preg_match_all wil work
    process.env.PCRE_BACKTRACK_LIMIT = "900000000"

    if (registry) {
      this.registry = registry
    }
  }

  stripPlaceholders(content: string): string {
    const expression = Extractor.PLACEHOLDER_REGEX
    return content.replace(expression, "")
  }

  private extractPlaceholders(
    content: string,
    useRegistry: boolean,
  ): [ContentPlaceholder[], PlaceholderInterface[], string] {
    const placeholderInstances: PlaceholderInterface[] = []
    const contentPlaceholders: ContentPlaceholderType[] = []
    const matches = [
      ...content.matchAll(RegExp(Extractor.PLACEHOLDER_REGEX, "g")),
    ]

    let returnContent = content

    if (matches.length === 0) {
      return [contentPlaceholders, placeholderInstances, returnContent]
    }

    for (const match of matches) {
      const name = match.groups?.placeholderName ?? ""

      // Check registry only if useRegistry is true
      const instance = useRegistry
        ? this.registry?.getPlaceholderSupportingName(name)
        : null

      // If using registry and instance is not found, skip to next match
      if (useRegistry && !instance) {
        continue
      }

      const attributes = this.getPlaceholderAttributes(
        match.groups?.attributes ?? "",
      )
      const content = match.groups?.content ?? ""

      const placeholder = new ContentPlaceholder(
        name,
        match[0],
        attributes,
        content,
      )

      const pos: number = placeholder.getPlaceholder().indexOf(content)

      if (pos !== -1) {
        returnContent = returnContent.replace(
          placeholder.getPlaceholder(),
          placeholder.getUid(),
        )
      }

      contentPlaceholders.push(placeholder)

      // Only push instance if registry is being used
      if (useRegistry && instance) {
        placeholderInstances.push(instance)
      }
    }

    return [contentPlaceholders, placeholderInstances, returnContent]
  }

  // Public method using the registry
  extract(
    content: string,
  ): [ContentPlaceholderType[], PlaceholderInterface[], string] {
    return this.extractPlaceholders(content, true)
  }

  // Public method ignoring the registry
  extractIgnoringRegistry(content: string): [ContentPlaceholder[], string] {
    const [placeholders, , returnContent] = this.extractPlaceholders(
      content,
      false,
    )
    return [placeholders, returnContent]
  }

  //Split the attributes from attribute string
  getPlaceholderAttributes(attributeString: string): Attr {
    const attributes: Attr = {}
    const attributeMatches = [
      ...attributeString.matchAll(RegExp(Extractor.ATTRIBUTE_REGEX, "g")),
    ]

    for (const match of attributeMatches) {
      const attrName = match.groups?.attr_name ?? ""
      if (!attrName) continue

      const attrValue =
        match.groups?.attr_value_quoted ||
        match.groups?.attr_value_single_quoted ||
        match.groups?.attr_value_unquoted ||
        match.groups?.attr_value

      if (!attributes[attrName]) {
        attributes[attrName] = []
      }

      if (match.groups?.attr_value_quoted) {
        attributes[attrName] = attrValue ?? ""
      } else {
        attributes[attrName] = decodeURIComponent(attrValue ?? "")
      }
    }

    return attributes
  }
}
