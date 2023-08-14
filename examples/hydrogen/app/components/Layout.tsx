import { ReactElement } from "react";

interface Props {
  children: ReactElement;
  title: string;
}

export function Layout(props: Props) {
  return <>{props.children}</>;
}
