import { useCallback, useState } from "react";

interface BooleanState {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

// Custom hook to manage a boolean value
const useBoolean = (initialValue?: boolean): BooleanState => {
  const [value, setValue] = useState(!!initialValue);

  //   const setTrue = () => setValue(true);
  //   const setFalse = () => setValue(false);
  //   const toggle = () => setValue((prevValue) => !prevValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return { value, setTrue, setFalse, toggle, setValue };
};

export default useBoolean;
