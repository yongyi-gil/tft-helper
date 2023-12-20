"use client";
import ChampionImage from '@/component/champion/ChampionImage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

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

    .match-time {
      margin: 0px 10px;
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

        if (matchIds.length === idx + 1) {
          console.log(temp);
          const sortedTemp = temp.sort((match1, match2) => {
            return match2.dateTime - match1.dateTime;
          })
          setMatchs(sortedTemp);
        }
      });
    }
  }, [matchIds]);

  const getMatchData = async (id: string) => {
    try {
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
      myMatchData.gameType = data.info.tft_game_type;
      myMatchData.dateTime = data.info.game_datetime;

      return myMatchData;
    } catch (error) {
      throw error;
    }
  }

  return (
    <MatchsDiv>
      <h2>최근 게임</h2>
      {
        matchs &&
        matchs.map((match, idx) => {
          const dateTime = moment(match.dateTime).format('YYYY-MM-DD HH:mm:ss');
          const today = moment().format('YYYY-MM-DD HH:mm:ss');

          const palyTime = match.time_eliminated;
          const minutes = Math.floor(palyTime / 60);
          const seconds = Math.floor(palyTime % 60);

          return (
            <div
              key={`match-${idx}`}
              className="recent-matchs"
            >
              <span className="match-placement">
                {match.placement}st
              </span>
              <div className={`match-unit match-${idx}`}>
                {
                  match.units.map((unit, idx) => {
                    const champ = unit;
                    champ.id = unit.character_id.substring(6);
                    champ.name = unit.character_id.substring(6);
                    champ.tier =
                      unit.rarity > 5 ? unit.rarity - 1 :
                      unit.rarity === 0 ? unit.rarity + 1 : unit.rarity;

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
              {/* <span className="match-datetime">{dateTime}</span> */}
              <div className="match-time">
                <div>{moment(today).to(dateTime)}</div>
                <div>{minutes}분 {seconds}초</div>
              </div>
            </div>
          )
        })
      }
    </MatchsDiv>
  )
}
