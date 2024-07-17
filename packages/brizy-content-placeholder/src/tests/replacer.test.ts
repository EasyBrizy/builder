import { mySimpleClass } from "../examples/mySimpleClass.js"
import { EmptyContext } from "../modules/EmptyContext.js"
import { Registry } from "../modules/Registry.js"
import { Replacer } from "../modules/Replacer.js"
import { expect } from "@jest/globals"

describe("Replacer test", () => {
  const tests: {
    initialHtml: string
    expected: string
    placeholders: { label?: string; name: string; value: string }[]
  }[] = [
    {
      initialHtml: `<div begin="hshshsh">ololo</div>{{page_loop filter="some_values" mycustomone="bro"}}<div><h1>{{page_title}}</h2>{{test filter="some_values"}}<div><h1>{{page_title}}</h2><p>{{page_excerpt}}</p></div>{{end_test}}<p>{{page_excerpt}}</p></div>{{end_page_loop}}<h1>something</h1>`,
      expected: `<div begin="hshshsh">ololo</div>myCustomValue<h1>something</h1>`,
      placeholders: [
        { label: "label", name: "page_loop", value: "myCustomValue" },
      ],
    },
    {
      initialHtml: `
      <div class="testWithTwoPlaceholders">
      <h1>{{placeholder content="rand"}}</h1>
      Some static content
      <h2>{{placeholder content="texv"}}</h2>
      </div>
      `,
      expected: `
      <div class="testWithTwoPlaceholders">
      <h1>myCustomValue</h1>
      Some static content
      <h2>myCustomValue</h2>
      </div>
      `,
      placeholders: [
        { label: "label", name: "placeholder", value: "myCustomValue" },
      ],
    },
    {
      initialHtml: `
      <div class="testWithDifferentPlaceholders">
      <article>
      <title>my Article Title</title>
      <div> Author: {{firstPlaceholder}}</div>
      {{secondPlaceholder content="withSepia"}}
      </article>
      </div>
      `,
      expected: `
      <div class="testWithDifferentPlaceholders">
      <article>
      <title>my Article Title</title>
      <div> Author: Jora Cardan</div>
      <img src='joraFoto.png'/>
      </article>
      </div>
      `,
      placeholders: [
        {
          name: "firstPlaceholder",
          value: "Jora Cardan",
        },
        {
          name: "secondPlaceholder",
          value: "<img src='joraFoto.png'/>",
        },
      ],
    },
  ]

  test.each(tests)(
    "Check replacer functionality",
    ({ initialHtml, expected, placeholders }) => {
      const registry = new Registry()

      placeholders.forEach(({ label = "testLabel", name, value }) => {
        registry.registerPlaceholder(new mySimpleClass(label, name, value))
      })

      const replacer = new Replacer(registry)

      const result = replacer.replacePlaceholders(
        initialHtml,
        new EmptyContext(),
      )

      expect(result).toBe(expected)
    },
  )
})
