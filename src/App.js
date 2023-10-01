import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const { providers } = require("near-api-js");
  const [nameAvailable, setNameAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const providerTestnet = new providers.JsonRpcProvider(
    "https://archival-rpc.testnet.near.org"
);
  const providerMainnet=new providers.JsonRpcProvider(
    "https://archival-rpc.mainnet.near.org"
  );

  const handleSearch = async(event) => {
    let provider
    if(searchQuery.includes("near")){
      provider=providerMainnet
    }
    else{
      provider=providerTestnet
    }
    let succeeded = true;
    if (event.key === 'Enter') {
      let rawResult;
      try {
          rawResult = await provider.query({
              request_type: "view_account",
              account_id: searchQuery,
              finality: "final",
          });
      } catch (e) {
          if (e.type === 'AccountDoesNotExist') {
              succeeded = false;
          }
      }
    }
    succeeded?setNameAvailable(false):setNameAvailable(true);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const redirectToPurchase = () => {
  //   navigate('/redirect')
  // };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-semibold mb-4">NEAR Domains</h1>
        <input
          type="text"
          placeholder=".near or .testnet"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleSearch}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {nameAvailable ? (
          <div>
            <p className='text-green pb-4'>Domain <span className="font-semibold">{searchQuery}</span> available.</p>
            {/* <button onClick={redirectToPurchase}>Go to NEAR</button> */}
            {searchQuery.includes("testnet")?
            (<Link to="/redirectTestnet" target="_blank" rel="noopener noreferrer" className='border rounded px-3 py-2 text-purple'>Go to NEAR</Link>
            ):(<Link to="/redirectMainnet" target="_blank" rel="noopener noreferrer" className='border rounded px-3 py-2 text-purple'>Go to NEAR</Link>)
            }
          </div>
        ) : (
          <p className="text-lg text-red">No results to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
