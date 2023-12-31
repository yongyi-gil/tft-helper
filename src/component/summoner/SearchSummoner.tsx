"use client";
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  color: #333;
  min-width: 360px;

  select {
    padding: 10px;
    width: 80px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
    height: 40px;
  }

  input {
    flex: 1;
    padding: 8px;
    width: 100%;
    outline: none;
  }

  button {
    width: 100px;
    min-width: 80px;
    padding: 8px;
    background-color: #5cb0f9;
    color: #fff;
    text-align: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    outline: none;
  }
`;

type SearchProps = {
  handleSearch: (name: string) => void;
}

export default function SearchSummoner(props: SearchProps) {
  const { handleSearch } = props;

  const [ selectedCountry, setSelectedCountry] = useState('KR');
  const [ searchKeyword, setSearchKeyword ] = useState('');
  
  return (
    <SearchDiv>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="KR">KR</option>
      </select>
      <input
        type="text"
        placeholder="플레이어 이름"
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.isComposing || e.keyCode === 229) {
            return
          };
          if (e.key === 'Enter') {
            handleSearch(searchKeyword);
          }
        }}
      />
      <button
        type="button"
        onClick={() => handleSearch(searchKeyword)}
      >
        검색
      </button>
    </SearchDiv>
  )
}
