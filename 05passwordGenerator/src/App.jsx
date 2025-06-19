import { useState, useCallback, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const resetOptions = () => {
    setLength(8);
    setNumberAllowed(false);
    setCharAllowed(false);
    setPassword('');
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold text-orange-500 text-center mb-6">🔐 Password Manager</h1>

      {/* Display password */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 text-black"
          placeholder="Your secure password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-4">
          <label htmlFor="length">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            id="length"
            className="w-full cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="characterInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Include Special Characters</label>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={passwordGenerator}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Generate Password
        </button>
        <button
          onClick={resetOptions}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
