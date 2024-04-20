import { useState, useEffect } from "react";

const Typer = ({ spell, setCurrCountDown }) => {
  const [text, setText] = useState('');
  
  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault();
      if (e.key === "Backspace")
        setText((text) => text.slice(0, text.length - 1));
      else if (e.key.length === 1)
        setText((text) => (text.length < spell.length) ? text + e.key : text);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (text.length === spell.length && spell.localeCompare(text) === 0)
      setCurrCountDown(0);
  }, [text]);

  const completedText = spell.slice(0, text.length).split('').map((char, index) => {
    if (char === text[index])
      return <span key={index} className="text-success">{char}</span>;
    else
      return <span key={index} className="text-danger">{char}</span>;
  });

  return (
    <div className="row justify-content-center align-items-center text-center p-2">
      <p className="display-6">
        {completedText}
        {(text.length < spell.length || text.length === 0) ? <u>{spell[text.length]}</u> : ""}
        {spell.slice(text.length + 1)}
      </p>
    </div>
  );
}

export default Typer;