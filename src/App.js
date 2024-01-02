import { useState } from "react";
import image from "./captcha-bg.png";

export default function App() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState("");

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    const length = 6;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }
    console.log(captcha);
    return captcha;
  }

  function handleReload() {
    setCaptcha(generateCaptcha());
    setIsError(false);
    setIsSuccess(false);
    setInput("");
  }

  function handleCheck() {
    if (input === captcha) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setInput("");
        setCaptcha(generateCaptcha());
      }, 2000);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setInput("");
        setCaptcha(generateCaptcha());
      }, 2000);
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <CaptchaArea captcha={captcha} onReload={handleReload} />
      <CaptchaCheck onCheck={handleCheck} input={input} onInput={setInput} />
      {isError && <ErrorMessage />}
      {isSuccess && <SuccessMessage />}
    </div>
  );
}

function Header() {
  return <header>Are you a human?</header>;
}

function CaptchaArea({ captcha, onReload }) {
  return (
    <div className="captcha-area">
      <div className="captcha-img">
        <img src={image} alt="captcha-background"></img>
        <span className="captcha">{captcha}</span>
      </div>
      <button className="reload-btn" onClick={onReload}>
        <i className="fas fa-redo-alt"></i>
      </button>
    </div>
  );
}

function CaptchaCheck({ onCheck, input, onInput }) {
  return (
    <form
      action="#"
      className="input-area"
      onSubmit={(e) => {
        e.preventDefault();
        onCheck();
      }}
    >
      <input
        type="text"
        placeholder="enter captcha without spaces"
        maxLength="6"
        spellCheck="false"
        required
        value={input}
        onChange={(e) => onInput(e.target.value)}
      />
      <button className="check-btn">Check</button>
    </form>
  );
}

function ErrorMessage() {
  return <div className="error">Captcha not matched. Please try again!</div>;
}

function SuccessMessage() {
  return <div className="success">Nice! You don't appear to be a robot.</div>;
}
