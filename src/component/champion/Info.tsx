"use client";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { useRecoilState } from 'recoil';
import {
  selectedChampState,
} from '../../recoil/championAtoms';

const ChampionInfoDiv = styled.div`
  flex: 1;
  height: 290px;
  background-color: #2d2b2b;
  color: #666;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;

  .champ {
    display: flex;
  }
`;

export default function Info() {
  const [ selectedChampion, setSelectedChampion ] = useRecoilState(selectedChampState);

  return (
    <ChampionInfoDiv>
      {
        selectedChampion && (
          <div className="champ">
            <Image
              src={`/img/champions/${selectedChampion.id}.png`}
              alt={`${selectedChampion.id}`}
              width={200}
              height={200}
              priority
            />
            <div>
              <h2>{selectedChampion.name}</h2>
              {
                selectedChampion.properties.map((item) => (
                  <h2>{item}</h2>
                ))
              }
            </div>
          </div>
        )
      }
    </ChampionInfoDiv>
  )
}
