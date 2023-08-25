import { RegistryInterface } from "./RegistryInterface.js"
import { Extractor } from "./Extractor.js"
import { ContextInterface } from "./ContextInterface.js"
import { ContentPlaceholder } from "./ContentPlaceholder.js"
import { PlaceholderInterface } from "./PlaceholderInterface.js"

export class Replacer {
  private registry: RegistryInterface

  constructor(registry: RegistryInterface) {
    this.registry = registry
  }

  replacePlaceholders(content: string, context: ContextInterface): string {
    const extractor = new Extractor(this.registry)
    const [contentPlaceholders, instancePlaceholders, contentAfterExtractor] =
      extractor.extract(content)

    context.afterExtract(
      contentPlaceholders,
      instancePlaceholders,
      contentAfterExtractor,
    )

    if (contentPlaceholders.length > 0 && instancePlaceholders.length > 0) {
      return this.replaceWithExtractedData(
        contentPlaceholders,
        instancePlaceholders,
        contentAfterExtractor,
        context,
      )
    }

    return content
  }

  replaceWithExtractedData(
    contentPlaceholders: ContentPlaceholder[],
    instancePlaceholders: PlaceholderInterface[],
    contentAfterExtractor: string,
    context: ContextInterface,
  ): string {
    const toReplace: string[] = []
    const toReplaceWithValues: string[] = []

    contentPlaceholders.forEach((contentPlaceholder, index) => {
      try {
        toReplace.push(contentPlaceholder.getUid())

        const instancePlaceholder = instancePlaceholders[index]

        if (instancePlaceholder) {
          const value = instancePlaceholder.getValue(
            context,
            contentPlaceholder,
          )

          if (
            instancePlaceholder.shouldFallbackValue(
              value,
              context,
              contentPlaceholder,
            )
          ) {
            toReplaceWithValues.push(
              instancePlaceholder.getFallbackValue(context, contentPlaceholder),
            )
          } else {
            toReplaceWithValues.push(value)
          }
        } else {
          toReplaceWithValues.push("")
        }
      } catch (e) {
        toReplace.pop()
      }
    })

    const content = contentAfterExtractor.replace(
      new RegExp(toReplace.join("|"), "g"),
      (match) => {
        const index = toReplace.indexOf(match)
        return index !== -1 ? toReplaceWithValues[index] : match
      },
    )

    return content
  }
}
