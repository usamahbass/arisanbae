import { useEffect, useState } from "react";

export const useSlide = () => {
  const [isSlide, setIsSlide] = useState(false);

  useEffect(() => {
    setIsSlide(true);

    return () => setIsSlide(false);
  }, []);

  return isSlide;
};
