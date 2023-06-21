export const classToClassName = <T extends Record<string, string>>(
  r: T
): Omit<T, "class"> & { className?: string } => {
  if ("class" in r) {
    const { class: _class, ...rest } = r;
    return { className: _class, ...rest };
  }
  return r;
};

export const crossOrigin = <T extends Record<string, string>>(
  r: T
): Omit<T, "crossorigin"> & { crossOrigin?: string } => {
  if ("crossorigin" in r) {
    const { crossorigin: origin, ...rest } = r;
    return { crossOrigin: origin, ...rest };
  }
  return r;
};
