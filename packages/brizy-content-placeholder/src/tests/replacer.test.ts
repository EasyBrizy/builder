import { Replacer } from "../modules/Replacer.js"
import { mySimpleClass } from "../examples/mySimpleClass.js"
import { Registry } from "../modules/Registry.js"
import { EmptyContext } from "../modules/EmptyContext.js"
import { expect } from "@jest/globals"

describe("Replacer test", () => {
  const contentWithPlaceholder =
    '<div begin="hshshsh">ololo</div>{{page_loop filter="some_values" mycustomone="bro"}}<div><h1>{{page_title}}</h2>{{test filter="some_values"}}<div><h1>{{page_title}}</h2><p>{{page_excerpt}}</p></div>{{end_test}}<p>{{page_excerpt}}</p></div>{{end_page_loop}}<h1>something</h1>'

  const contentAfterReplace =
    '<div begin="hshshsh">ololo</div>myCustomValue<h1>something</h1>'

  test("replacer replace id with value", () => {
    const myPlaceholder = new mySimpleClass(
      "label",
      "page_loop",
      "myCustomValue",
    )

    const registration = new Registry()

    registration.registerPlaceholder(myPlaceholder)

    const replacer = new Replacer(registration)

    const result = replacer.replacePlaceholders(
      contentWithPlaceholder,
      new EmptyContext(),
    )

    expect(result).toBe(contentAfterReplace)
  })
})
