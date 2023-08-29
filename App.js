import React, { useState } from 'react';
import './App.css';

const generatePassword = (length, options, name) => {
  const characterSet = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+[]{}|;:,.<>?',
  };

  let allowedChars = '';
  Object.keys(options).forEach(option => {
    if (options[option]) {
      allowedChars += characterSet[option];
    }
  });

  let password = '';
  for (let i = 0; i < length; i++) {
    if (i < name.length) {
      password += name[i];
    } else {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }
  }

  return password;
};

function App() {
  const [name, setName] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const options = {
      uppercase: includeUppercase,
      lowercase: includeLowercase,
      numbers: includeNumbers,
      special: includeSpecial,
    };
    const newPassword = generatePassword(passwordLength, options, name);
    setGeneratedPassword(newPassword);
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Your Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordLength}
          onChange={e => setPasswordLength(e.target.value)}
        />
      </div>
      <div>
        {/* ... Checkbox inputs for options ... */}
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {generatedPassword && (
        <div>
          <h2>Generated Password:</h2>
          <p>{generatedPassword}</p>
        </div>
      )}
    </div>
  );
}

export default App;
