import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const InfoDiv = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #2b2b2b;
  display: flex;
  align-items: center;
  min-width: 360px;
  border-radius: 10px;

  .info {
    flex: 1;
    padding-left: 20px;
    color: #999;

    h2 {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
`;

export default function SummonerInfo(props: any) {
  const { summoner } = props;
  const { summonerName, tier, rank, leaguePoints, wins, losses } = summoner;

  console.log(summoner);
  return (
    <InfoDiv>
      <Image
        className="champion-info-img"
        src={`/img/tier/tier_${tier.toLowerCase()}.png`}
        alt={`${tier}`}
        width={128}
        height={128}
        priority
      />
      <div className="info">
        <h2>{summonerName}</h2>
        <h3>{tier} {rank}  {leaguePoints}</h3>
        <h3>{wins}승 {losses}패 {`(${Math.round(wins / (wins + losses) * 100)}%)`}</h3>
      </div>
    </InfoDiv>
  )
}
