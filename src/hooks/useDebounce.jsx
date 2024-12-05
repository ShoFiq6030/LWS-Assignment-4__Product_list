import { useEffect, useRef, useState } from "react";

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [delay, value]);

  return debounceValue;
};

export default useDebounce;
