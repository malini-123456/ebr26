import * as React from "react";

function useAsRef<T>(value: T) {
  const ref = React.useRef<T>(value);

  React.useLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}

export { useAsRef };
