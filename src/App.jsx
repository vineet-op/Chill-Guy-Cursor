import React from 'react'
import CustomCursor from 'custom-chill-cursor'
import chillGuy from './image/chillguy.png'

const App = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm i custom-chill-cursor');
    alert('copied to clipboard!');
  };

  return (
    <div className="h-screen w-screen bg-center bg-no-repeat bg-cover relative flex flex-col items-center justify-center cursor-none bg-gray-900">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 text-center cursor-none p-8">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
          Welcome to the
        </h1>
        <h2 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Chill Guy Cursor
        </h2>

        <p className="text-xl text-gray-200 max-w-md mx-auto mb-8">
          Move your mouse around to see the magic happen!
        </p>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg inline-block">
          <p className="text-white mb-2">Install the package:</p>
          <div className="flex items-center">
            <code className="bg-gray-700 text-yellow-300 p-2 rounded">
              npm i custom-chill-cursor
            </code>
            <button
              onClick={copyToClipboard}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <CustomCursor
        cursorImage={chillGuy}

      />

      <footer className="absolute bottom-0 w-full text-center p-4 bg-gradient-to-r text-lg font-mono bg-blkack-800 text-white">
        <span role="img" aria-label="heart">❤️</span> Created with love by
        <a
          href="https://www.linkedin.com/in/vineet-op"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-300 hover:text-yellow-500 ml-1"
        >
          <b > Vineet🔥</b>
        </a>
      </footer>
    </div>
  )
}

export default App