"use client";
import ChampionImage from '@/component/champion/ChampionImage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MatchsDiv = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #2b2b2b;
  min-width: 360px;
  border-radius: 10px;

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .recent-matchs {
    display: flex;
    align-items: center;
    margin: 10px 0px;

    &:hover {
      background-color: #666;
      border-radius: 10px;
    }

    .match-placement {
      width: 50px;
      text-align: center;
    }

    .match-unit {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }
  }
`;

export default function RecentMatchs(props: any) {
  const { matchIds, summonerId } = props;

  const [ matchs, setMatchs ] = useState(null);

  useEffect(() => {
    if (matchIds.length !== 0) {
      let temp = matchs || [];
      matchIds.forEach(async (id: string, idx: number) => {
        const match = await getMatchData(id);
        temp.push(match);

        console.log(idx, matchIds.length);
        if (matchIds.length === idx + 1) {
          setMatchs(temp);
          console.log('end', matchs);
        }
      });
    }
  }, [matchIds]);

  const getMatchData = async (id: string) => {
    const url = `/tft/match/v1/matches/${id}`;
    const options = {
      method: 'GET',
      headers: {
        "X-Riot-Token": `${process.env.NEXT_PUBLIC_TFT_API_KEY}`,
      },
      cache: 'force-cache'
    }

    const res = await fetch(url, options);
    const data = await res.json();
    
    const parts = data.info.participants;
    const myMatchData = parts.filter((part) => part.puuid === summonerId)[0];

    return myMatchData;
  }

  console.log(matchs);
  return (
    <MatchsDiv>
      <h2>최근 게임</h2>
      {
        matchs &&
        matchs.map((match, idx) => {
          const palyTime = match.time_eliminated;
          const minutes = Math.floor(palyTime / 60);
          const seconds = Math.floor(palyTime % 60);

          return (
            <div className="recent-matchs">
              <span className="match-placement">
                {match.placement}st
              </span>
              <div className={`match-unit match-${idx}`}>
                {
                  match.units.map((unit, idx) => {
                    const champ = unit;
                    champ.id = unit.character_id.substring(6);
                    champ.name = unit.character_id.substring(6);

                    return (
                      <ChampionImage
                        key={`${unit.character_id}-${idx}`}
                        champ={champ}
                        handleClick={() => {
                        }}
                      />
                    )
                  })
                }
              </div>
              <span>{minutes}분 {seconds}초</span>
            </div>
          )
        })
      }
    </MatchsDiv>
  )
}