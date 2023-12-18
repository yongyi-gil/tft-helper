"use client"
import React from 'react';
import styled from 'styled-components';

import {
  useRecoilState,
  useRecoilValue
} from 'recoil';

import {
  searchKeywordState,
  selectedChampState,
  champDataSelector,
} from '../../recoil/championAtoms';

import { ChampionType } from '@/types/champion';
import ChampionImage from '../champion/ChampionImage';

const ChampListDiv = styled.div`
  width: 230px;
  margin: 20px;
  margin-right: 0px;

  @media(max-width: 1000px) {
    width: calc(100% - 20px);
    height: 280px;
    overflow: auto;
    margin: 10px;

    .list {
      justify-content: center;
    }
  }

  .search-input {
    display: flex;
    justify-content: center;

    input {
      width: 224px;
      height: 32px;
      background-color: #2d2b2b;
      color: #666;
      margin-bottom: 8px;
      padding: 0px 12px;
      border-radius: 4px;

      @media(max-width: 1000px) {
        width: 100%;
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    position: relative;

    
  }
`;

const ChampionList = () => {
  const [ selectedChampion, setSelectedChampion ] = useRecoilState(selectedChampState);
  const [ keyword, setKeyword ] = useRecoilState(searchKeywordState);

  const champData = useRecoilValue(champDataSelector);

  const championDataArray: ChampionType[] = champData ? Object.values(champData) : [];

  return (
    <ChampListDiv>
      <div className="search-input">
        <input
          type="text"
          placeholder='Search Champion'
          onChange={(e) => {
            setKeyword(e.target.value.toLowerCase());
          }}
          value={keyword}
        />
      </div>
      <div className="list">
        {
          championDataArray.map((champ) => champ.name.includes(keyword) && (
            <ChampionImage
              key={champ.id}
              champ={champ}
              handleClick={() => {
                const isDuplicate = selectedChampion.some((champion) => champion.id === champ.id);
                if (
                  isDuplicate || 
                  selectedChampion.length > 9
                ) {
                  return;
                }

                const selected = [...selectedChampion];
                selected.push(champ);
                setSelectedChampion(selected);
              }}
            />
          ))
        }
      </div>
    </ChampListDiv>
  );
};

export default ChampionList;
