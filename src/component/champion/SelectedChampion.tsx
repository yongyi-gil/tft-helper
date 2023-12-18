"use client"
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {
  useRecoilState,
} from 'recoil';

import {
  selectedChampState,
} from '../../recoil/championAtoms';

import {
  synergyState,
} from '../../recoil/synergyAtoms';

import { SynergyType, ChampionType } from '@/app/types/champion';
import ChampionImage from './ChampionImage';

const SelectedDiv = styled.div`
  flex: 1;
  overflow: hidden;
  width: calc(100% - 40px);
  height: 100%;
  margin: 20px;
  background-color: #2b2b2b;
  border-radius: 10px;

  @media(max-width: 1000px) {
    width: calc(100% - 20px);
    margin: 10px;

    .champions {
      justify-content: center;
    }
  }

  h2 {
    margin: 20px 20px 12px;
    font-size: 18px;
  }

  .champions {
    display: flex;
    padding: 0px 12px;
    margin-bottom: 12px;
    overflow: hidden;
    flex-wrap: wrap;
    
    .champions-info {
      position: relative;
      img {
        margin: 8px;
        cursor: pointer;
      }
  
      .champ-name {
        position: absolute;
        font-size: 10px;
        bottom: 0;
      }
    }

    .empty-champion {
      margin: 8px;
      height: 48px;
      width: 48px;
      background-color: #eaeaea;
      border: 1px solid #666;
      color: #666;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-size: 24px;
    }
  }

  .synergy {
    display: flex;
    padding: 0px 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
    overflow: hidden;

    .synergy-item {
      display: flex;
      align-items: center;
      margin: 4px 4px;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #666;
      font-size: 13px;
      padding: 2px 8px;

      img {
        margin-right: 4px;
      }

      &:hover {
        background-color: #2b2b2b;
        color: #fff;
        border: 1px solid #fff;
      }
    }

    .empty-synergy {
      margin: 8px;
    }
  }

  .synergy-abilites-wrap {
    padding: 12px;

    .synergy-card {
      margin-bottom: 12px;

      .synergy-name {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        font-size: 17px;

        img {
          margin-right: 8px;
        }
      }

      .synergy-desc {
        padding-left: 32px;
        padding-bottom: 8px;
        font-size: 15px;
      }

      .synergy-abilites {
        display: flex;
        padding-left: 32px;
        font-size: 15px;

        &.applied {
          color: red;
        }

        .abilites-level {
          margin-right: 12px;
        }
      }
    }
  }
`;

export default function SelectedChampion() {
  const [ selectedChampion, setSelectedChampion ] = useRecoilState(selectedChampState);
  const [ synergyData, setSynergyData ] = useRecoilState(synergyState);

  const handleDeleteChampion = (id: string) => {
    const selected = [...selectedChampion];
    const filteredChamps = selected.filter((champ) => champ.id !== id);

    setSelectedChampion(filteredChamps);
  }

  const getSynergyCount = () => {
    const synergy = selectedChampion.map((item) => item.properties);
    if (synergy.length === 0) {
      return;
    }

    const joinedSynergy = synergy.reduce((acc, cur) => {
      return acc.concat(cur);
    })

    const countMap: SynergyType = {};
    joinedSynergy.forEach((item: string) => {
      if (countMap[item]) {
        countMap[item]++;
      } else {
        countMap[item] = 1;
      }
    });

    const synergyArray = Object.entries(countMap).map(([key, value]) => ({ [key]: value }));

    const sortedArray = synergyArray.sort((obj1, obj2) => {
      const value1 = Object.values(obj1)[0];
      const value2 = Object.values(obj2)[0];
      
      return value2 - value1;
    });

    return sortedArray;
  }

  const appliedSynergy = getSynergyCount();

  return (
    <SelectedDiv>
      <h2>선택된 챔피언</h2>
      <div className="champions">
        {
          selectedChampion.map((champ: ChampionType) => (
            <ChampionImage
              key={`selected-${champ.id}`}
              champ={champ}
              handleClick={() => {
                handleDeleteChampion(champ.id);
              }}
            />
          ))
        }
        {
          Array.from({
            length: 10 - selectedChampion.length
          }).map((el, idx) => (
            <div
              className="empty-champion"
              key={`empty-${idx}`}
            >
              +
            </div>
          ))
        }
      </div>
      <h2>시너지</h2>
      <div className="synergy">
        {
          appliedSynergy &&
          appliedSynergy.length !== 0 ?
            appliedSynergy?.map((synergy) => {
              const key = Object.keys(synergy);
              const value = Object.values(synergy);
              return (
                <div
                  className="synergy-item"
                  key={`synergy-${key}`}
                >
                  <Image
                    key={`synergy-img-${key}`}
                    src={`/img/properties/${key}.png`}
                    alt={`${key}`}
                    width={24}
                    height={24}
                    priority
                  />
                  {key} {value}
                </div>
              )
            }) :
            <div className="empty-synergy">
              적용된 효과가 없습니다.
            </div>
        }
      </div>
      <div className="synergy-abilites-wrap">
        {
          appliedSynergy &&
          appliedSynergy.length !== 0 ?
            appliedSynergy.map((synergy) => {
              const key = Object.keys(synergy);
              const value = Object.values(synergy);

              const desc = synergyData[key]?.desc;
              const abilities = synergyData[key]?.abilities;

              return (
                <div
                  className="synergy-card"
                  key={`synergy-desc-${key}`}
                >
                  <div className="synergy-name">
                    <Image
                      key={`synergy-img-${key}`}
                      src={`/img/properties/${key}.png`}
                      alt={`${key}`}
                      width={24}
                      height={24}
                      priority
                    />
                      {value[0]}  {key}
                  </div>
                  <p className="synergy-desc">
                    {desc}
                  </p>
                  {
                    abilities &&
                    Object.entries(abilities).map(([level, description]) => {
                      const applied = value[0] >= Number(level);
                      return (
                        <div
                          className={`synergy-abilites ${applied ? 'applied' : ''}`}
                          key={level}
                        >
                          <p
                            className={`abilites-level`}
                          >
                            {level}
                          </p>
                          <p>{description}</p>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
            : null
        }
      </div>
    </SelectedDiv>
  )
}
