export function getItems({ getValue, getDCOption }: any): unknown[] {
  const _zoomFromToolbar = getValue("zoom");
  console.log("background: ", getValue("backg"));
  console.log("fromToolbar getValue:", _zoomFromToolbar);
  console.log("zoom2 getv____ :", getValue("zoom2"));
  return [
    {
      id: "toolbarCurrentElement",
      type: "popover",
      config: {
        icon: "nc-pin",
        title: "Map",
      },
      position: 90,
      options: [
        {
          id: "tabsCurrentElement",
          type: "tabs",
          tabs: [
            {
              id: "tabCurrentElement",
              label: "Map",
              options: [
                {
                  id: "address",
                  label: "Address",
                  type: "inputText",
                  placeholder: "Enter address",
                  // population: getDCOption(DCTypes.richText),
                  default: {
                    value: "Chisinau",
                  },
                  config: {
                    size: "medium",
                  },
                },
                {
                  id: "zoom",
                  label: "Zoom",
                  type: "slider",
                  config: {
                    min: 1,
                    max: 21,
                  },
                  default: {
                    value: 13,
                  },
                },
                {
                  id: "zoom2",
                  label: "zoom2",
                  devices: "responsive",
                  type: "slider",
                  config: {
                    min: 1,
                    max: 21,
                  },
                  default: {
                    value: 10,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "toolbarColor",
      type: "popover",
      config: {
        size: "medium",
        title: "Colors",
        icon: {
          style: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            backgroundColor: getValue("backg")?.hex,
          },
        },
      },
      position: 90,
      devices: "desktop",
      disabled: getValue("coverImageSrc") === "",
      options: [
        {
          id: "tabsColor",
          type: "tabs",
          tabs: [
            {
              id: "tabBackground",
              label: "Background",
              options: [
                {
                  id: "backg",
                  type: "backgroundColor",
                  states: ["normal", "hover"],
                  default: {
                    value: {
                      bgColorHex: "#f1f1f1",
                    },
                  },
                },
              ],
            },
            {
              id: "tabBorder",
              label: "Border",
              options: [
                {
                  id: "border",
                  type: "border",
                  devices: "desktop",
                  states: ["normal", "hover"],
                  // default: {
                  //   value: {
                  //     style: "solid"
                  //   }
                  // }
                },
              ],
            },
            {
              id: "tabBoxShadow",
              label: "Shadow",
              options: [
                {
                  id: "boxShadow",
                  type: "boxShadow",
                  devices: "desktop",
                  states: ["normal", "hover"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "toolbarSettings",
      type: "popover",
      config: {
        icon: "nc-cog",
        title: "Settings",
      },
      position: 110,
      options: [
        {
          id: "size",
          label: "Width",
          type: "slider",
          position: 80,
          states: ["hover"],
          config: {
            min: 1,
            max: getValue("sizeSuffix") === "px" ? 1000 : 100,
            units: [
              { value: "px", title: "px" },
              { value: "%", title: "%" },
            ],
          },
          default: {
            value: 500,
            unit: "px",
          },
        },
        {
          id: "height",
          label: "Height",
          type: "slider",
          config: {
            min: 5,
            max: getValue("heightSuffix") === "%" ? 100 : 500,
            units: [
              { value: "px", title: "px" },
              { value: "%", title: "%" },
            ],
          },
        },
        {
          id: "grid",
          type: "grid",
          config: {
            separator: true,
          },
          columns: [
            {
              id: "grid-settings",
              size: 1,
              options: [
                {
                  id: "styles",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "styles",
                    text: "Styling",
                    icon: "nc-cog",
                  },
                },
              ],
            },
            {
              id: "grid-effects",
              size: 1,
              options: [
                {
                  id: "effects",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "effects",
                    text: "Effects",
                    icon: "nc-flash",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
