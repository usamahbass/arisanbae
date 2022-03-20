import { useEffect, useState } from "react";

export const useSlide = () => {
  const [isSlide, setIsSlide] = useState<boolean>(false);

  useEffect(() => {
    setIsSlide(true);

    return () => setIsSlide(false);
  }, []);

  return isSlide;
};
