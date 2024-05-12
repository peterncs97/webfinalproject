import { useState, useEffect } from "react";

const Typer = ({ skillCode, setCountDown }) => {
  const [text, setText] = useState('');
  
  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault();
      if (e.key === "Backspace")
        setText((text) => text.slice(0, text.length - 1));
      else if (e.key.length === 1)
        setText((text) => (text.length < skillCode.length) ? text + e.key : text);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [skillCode]);

  useEffect(() => {
    if (text.length === skillCode.length && skillCode.localeCompare(text) === 0)
      setCountDown(0);
  }, [text, skillCode, setCountDown]);

  const completedText = skillCode.slice(0, text.length).split('').map((char, index) => {
    if (char === text[index])
      return <span key={index} className="text-success">{char}</span>;
    else
      return <span key={index} className="text-danger">{char}</span>;
  });

  return (
    <div className="row justify-content-center align-items-center text-center p-2">
      <p className="display-6">
        {completedText}
        {(text.length < skillCode.length || text.length === 0) ? <u>{skillCode[text.length]}</u> : ""}
        {skillCode.slice(text.length + 1)}
      </p>
    </div>
  );
}

export default Typer;