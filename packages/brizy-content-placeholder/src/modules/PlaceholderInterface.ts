import { ContextInterface } from "./ContextInterface.js"
import { ContentPlaceholder } from "./ContentPlaceholder.js"
import { Attr } from "./types.js"

export interface PlaceholderInterface {
  // Returns true if the placeholder can return a value for the given placeholder name
  support(placeholderName: string): boolean

  // Return the string value that will replace the placeholder name in content
  getValue(context: ContextInterface, placeholder: ContentPlaceholder): string

  shouldFallbackValue(
    value: string,
    context: ContextInterface,
    placeholder: ContentPlaceholder,
  ): boolean

  getFallbackValue(
    context: ContextInterface,
    placeholder: ContentPlaceholder,
  ): string

  getConfigStructure()

  // It should return a unique identifier of the placeholder
  getUid(): string

  // Return the placeholder Label
  getLabel(): string

  setLabel(label: string): void

  // Return the placeholder name
  getPlaceholder(): string

  setPlaceholder(placeholder: string): void

  // Return the hard coded attributes if there are any
  getAttributes(): Attr | undefined

  // Return the  attributes that can vary
  getVaryAttributes(): string
}
