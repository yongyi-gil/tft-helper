/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ChampionImage from '@/component/champion/ChampionImage';

import { ChampionType } from '@/types/champion';

const InfoDiv = styled.div<{tier: number}>`
  flex: 1;
  overflow: hidden;
  width: calc(100% - 40px);
  height: 100%;
  margin: 20px;

  .info-wrap {
    display: flex;
    background-color: #2b2b2b;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  
    .champion-info-img {
      width: 100px;
      height: 100px;
      border: ${props =>
      props.tier === 1 ?
        '1px solid #fff' :
      props.tier === 2 ?
        '1px solid #1feb37' :
      props.tier === 3 ?
        '1px solid #4527eb' :
      props.tier === 4 ?
        '1px solid #e81feb' :
      props.tier === 5 ?
        '1px solid #fcea27' :
        '1px solid #fff'
    };
    }
  
    .champion-info-name {
      padding-left: 20px;
      font-size: 40px;
    }
  
    .champion-info-properties {
      display: flex;
      padding-left: 20px;
  
      .champion-info-synergy {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 8px;
        margin-right: 10px;
        color: #666;
  
        &:hover {
          background-color: #2b2b2b;
          color: #fff;
          border: 1px solid #fff;
        }
      }
    }
  }

  .same-tier-champion, .same-synergy-champion {
    background-color: #2b2b2b;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      margin-bottom: 10px;
    }
    .list {
      display: flex;
      flex: 1;
      overflow: hidden;
      flex-wrap: wrap;
    }
  }

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
`

export default function page() {
  const [ champion, setChampion ] = useState(null);
  const [ sameTierChampion, setSameTierChampion ] = useState(null);
  const [ sameSynergyChampion, setSameSynergyChampion ] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getChampion();
  }, []);

  const params = useParams();
  const id = params.id;

  const getChampion = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/champions/${id}`;
      const res = await fetch(url, { cache: 'force-cache' });
    
      const data = await res.json();
      setChampion(data);

      getSameTierChampion(data);
      getSameSynergyChampion(data);
    } catch (error) {
      throw error;    
    } 
  }

  const getSameTierChampion = async (champ: ChampionType) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/champions?tier=${champ.tier}`;
      const res = await fetch(url, { cache: 'force-cache' });
    
      const data = await res.json();
      const filteredData = data.filter((el) => el.id !== champ.id);
      setSameTierChampion(filteredData);
    } catch (error) {
      throw error;    
    } 
  }

  const getSameSynergyChampion = async (champ: ChampionType) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/champions`;
      for (let i = 0; i < Math.min(champ.properties.length, 3); i++) {
        const separator = i === 0 ? '?' : '&';
        url += `${separator}properties_like=${champ.properties[i]}`;
      }

      const res = await fetch(url, { cache: 'force-cache' });
    
      const data = await res.json();
      const filteredData = data.filter((el) => el.id !== champ.id);
      setSameSynergyChampion(filteredData);
    } catch (error) {
      throw error;    
    } 
  }

  return (
    <InfoDiv tier={champion?.tier}>
      <div className="info-wrap">
        <Image
          className="champion-info-img"
          src={`/img/champions/${id}.png`}
          alt={`${champion?.id}`}
          width={48}
          height={48}
          priority
          title={champion?.name}
        />
        <div>
          <div className="champion-info-name">{champion?.name}</div>
          <div className="champion-info-properties">
            {
              champion?.properties.map((el :string, idx: number) => (
                <span
                  key={`${el}_${idx}`}
                  className="champion-info-synergy"
                >
                  <Image
                    key={`synergy-img-${el}`}
                    src={`/img/properties/${el}.png`}
                    alt={`${el}`}
                    width={24}
                    height={24}
                    priority
                  />
                  {el}
                </span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="same-tier-champion">
        <h2>같은 {champion?.tier}티어 챔피언</h2>
        <div className="list">
          {
            sameTierChampion &&
            sameTierChampion.map((champ: ChampionType) => (
              <ChampionImage
                key={`same-tier-${champ.id}`}
                champ={champ}
                handleClick={() => {
                  router.push(`/champion/${champ.id}`);
                }}
              />
            ))
          }
        </div>
      </div>
      <div className="same-synergy-champion">
        <h2>동일 시너지 챔피언</h2>
        <div className="list">
          {
            sameSynergyChampion &&
            sameSynergyChampion.map((champ: ChampionType) => (
              <ChampionImage
                key={`same-synergy-${champ.id}`}
                champ={champ}
                handleClick={() => {
                  router.push(`/champion/${champ.id}`);
                }}
              />
            ))
          }
        </div>
      </div>
    </InfoDiv>
  )
}
