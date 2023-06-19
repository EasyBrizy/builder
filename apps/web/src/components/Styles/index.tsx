import React, { ReactElement } from "react";
import { getStyles } from "ui";

export interface Props {
  data: Array<string>;
}

export const Styles = (props: Props): ReactElement => {
  const styles = getStyles(props.data);

  return (
    <>
      {styles.map((style, i) => {
        if (style.type === "link") {
          return <link key={i} {...style.attr} />;
        }

        return (
          <style
            key={i}
            {...style.attr}
            dangerouslySetInnerHTML={{ __html: style.html }}
          />
        );
      })}
    </>
  );
};
