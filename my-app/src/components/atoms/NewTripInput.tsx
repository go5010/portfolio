import React, {
  Dispatch,
  FC,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createTrip } from "@/app/_api/db";

const NewTripInput = forwardRef<
  void,
  {
    newTripInput: boolean;
    setNewTripInput: Dispatch<SetStateAction<boolean>>;
  }
>(({ newTripInput, setNewTripInput }, ref) => {
  const [newTripName, setNewTripName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTripName(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Tab") {
      setNewTripInput(false);
      removeDocumentClickHandler();
      // newTripName !== "" && createTrip(newTripName);
      setNewTripName("");
    } else if (event.key === "Escape") {
      setNewTripInput(false);
      removeDocumentClickHandler();
      setNewTripName("");
    }
  };
  const namingInput = useRef<HTMLInputElement>(null);
  const documentClickHandler = useRef<(e: any) => void>();

  useEffect(() => {
    documentClickHandler.current = (e: any) => {
      if (namingInput.current!.contains(e.target)) return;

      setNewTripInput(false);
      removeDocumentClickHandler();
    };
  }, []);
  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current as any);
  };

  useImperativeHandle(ref, () => {
    const handleNamingTrip = () => {
      setNewTripInput(true);
      document.addEventListener("click", documentClickHandler.current as any);
    };
  });

  if (!newTripInput) {
    // newTripName !== "" && createTrip(newTripName);
    newTripName !== "" && setNewTripName("");
  }

  return (
    <input
      className="ml-6 px-2 border focus:outline-none"
      autoFocus={true}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      ref={namingInput}
    />
  );
});

export default NewTripInput;
