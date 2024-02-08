import { getItems } from "./toolbar";
import { Brizy } from "@brizy/core";

export function MyComponent() {
  return <div>Test my third party component</div>;
}

Brizy.registerComponent(MyComponent, {
  title: "TestComponent",
  id: "ComponentID",
  category: "test",
  options: (props: any) => [
    {
      selector: ".brz-map",
      toolbar: getItems(props),
      sidebar: {},
    },
  ],
});
