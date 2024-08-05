import React, { useCallback, useEffect, useRef, useState } from "react";

export const SearchArea = () => {
  const [inputmode, setInputmode] = useState(false);
  const [newTripName, setNewTripName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTripName(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Tab") {
      setInputmode(false);
      removeDocumentClickHandler();
      // ↓ここにfirestoreのtitleフィールド書き換えの関数を書く
      newTripName !== "" && console.log(newTripName);
      setNewTripName("");
    } else if (event.key === "Escape") {
      setInputmode(false);
      removeDocumentClickHandler();
    }
  };
  const namingInput = useRef<HTMLInputElement>(null);
  const documentClickHandler = useRef<(e: any) => void>();

  useEffect(() => {
    documentClickHandler.current = (e: any) => {
      if (namingInput.current!.contains(e.target)) return;

      setInputmode(false);
      removeDocumentClickHandler();
    };
  }, []);
  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current as any);
  };
  const handleNamingTrip = () => {
    setInputmode(true);
    document.addEventListener("click", documentClickHandler.current as any);
  };

  return (
    <>
      <div>SearchArea</div>
      <input className="border rounded-tl-md rounded-bl-md"></input>
      <input className="border"></input>
      <input className="border"></input>
      <div className="h-[20px]"></div>
      {inputmode ? (
        <input
          className="border px-2 py-1 focus:outline-none"
          autoFocus={true}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={namingInput}
        ></input>
      ) : (
        <span>仮のテキスト</span>
      )}

      <button
        className="border rounded-md bg-slate-400 text-white p-2"
        onClick={handleNamingTrip}
      >
        ボタン
      </button>
    </>
  );
};
