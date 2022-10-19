import { useState, useEffect } from "react";
import {useDebouncedCallback} from 'use-debounce'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = useDebouncedCallback(
    () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
    200) 

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)


    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

return windowSize
}