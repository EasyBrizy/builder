import React, { FC, useEffect } from "react";

export interface Props {
  error: Error;
  onClick?: VoidFunction;
}

export const Error: FC<Props> = (props) => {
  const { error, onClick } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={onClick}>Try again</button>
    </div>
  );
};
