"use client"
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import {
  useRecoilState,
  useRecoilValue
} from 'recoil';

import {
  searchKeywordState,
  selectedChampState,
  champDataSelector,
} from '../../recoil/championAtoms';

import { ChampionType } from '@/app/types/champion';

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

    .champ-img {
      width: 48px;
      height: 48px;
      margin: 4px;
      border: 1px solid #eee;
      cursor: pointer;

      &:hover {
        border: 1px solid #da2f2f;
      }
    }
  }
`;

const ChampionList = () => {
  const [ selectedChampion, setSelectedChampion ] = useRecoilState(selectedChampState);
  const [ keyword, setKeyword ] = useRecoilState(searchKeywordState);

  const champData = useRecoilValue(champDataSelector);

  const championData: ChampionType[] = champData ? Object.values(champData) : [];
  
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
          championData.map((champ) => champ.name.includes(keyword) && (
            <div
              className="champ-img"
              key={champ.id}
              onClick={() => {
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
            >
              <Image
                src={`/img/champions/${champ.id}.png`}
                alt={`${champ.id}`}
                width={48}
                height={48}
                priority
              />
            </div>
          ))
        }
      </div>
    </ChampListDiv>
  );
};

export default ChampionList;
