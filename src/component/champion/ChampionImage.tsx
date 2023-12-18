"use client"
import React from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';

import { ChampionType } from '@/app/types/champion';

const ChampionImageDiv = styled.div<{ tier: number }>`
  position: relative;
  width: 48px;
  height: 48px;
  margin: 4px;
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
  cursor: pointer;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    border: none;
  }

  .champ-name {
    position: absolute;
    font-size: 10px;
    bottom: 0;
    left: 2px;
  }
`;

export default function ChampionImage(
  props: {
    champ: ChampionType,
    handleClick: () => void,
  }
) {

  const { champ, handleClick } = props;

  return (
    <ChampionImageDiv
      key={champ.id}
      onClick={handleClick}
      tier={champ.tier}
    >
      <Image
        src={`/img/champions/${champ.id}.png`}
        alt={`${champ.id}`}
        width={48}
        height={48}
        priority
        title={champ.name}
      />
      <span className="champ-name">
        {champ.name}
      </span>
    </ChampionImageDiv>
  )
}
