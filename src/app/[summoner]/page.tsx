"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import SummonerInfo from '@/component/summoner/SummonerInfo';
import RecentMatchs from '@/component/summoner/match/RecentMatchs';

export default function Summoner() {
  const [ summoner , setSummoner ] = useState(null);
  const [ matchIds, setMatchIds ] = useState([]);

  const params = useParams();

  useEffect(() => {
    getSummonerInfo(params.summoner);
  }, []);

  const getSummonerInfo = async (name: string) => {
    try {
      const url = `/tft/summoner/v1/summoners/by-name/${name}`;
      const options = {
        method: 'GET',
        headers: {
          "X-Riot-Token": `${process.env.NEXT_PUBLIC_TFT_API_KEY}`,
        },
        cache: 'force-cache'
      }

      const res = await fetch(url, options);
      const data = await res.json();

      getLeague(data.id);
      getMatchIds(data.puuid);
    } catch (error) {
      throw error;
    }
  }

  const getLeague = async (id: string) => {
    try {
      const url = `/tft/league/v1/entries/by-summoner/${id}`;
      const options = {
        method: 'GET',
        headers: {
          "X-Riot-Token": `${process.env.NEXT_PUBLIC_TFT_API_KEY}`,
        },
        cache: 'force-cache'
      }

      const res = await fetch(url, options);
      const data = await res.json();

      setSummoner(data[0]);
    } catch (error) {
      throw error;
    }
  }

  const getMatchIds = async (puuid: string) => {
    try {
      const limit = 5;
      const url = `/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=${limit}`;
      const options = {
        method: 'GET',
        headers: {
          "X-Riot-Token": `${process.env.NEXT_PUBLIC_TFT_API_KEY}`,
        },
        cache: 'force-cache'
      }

      const res = await fetch(url, options);
      const data = await res.json();

      setMatchIds(data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      {
        summoner ? (
          <SummonerInfo
            summoner={summoner}
          />
        ) : <div>Loading...</div>
      }
      {
        summoner && matchIds.length !== 0 && (
          <RecentMatchs
            matchIds={matchIds}
            summonerId={summoner.puuid}
          />
        )
      }
    </>
  )
}
