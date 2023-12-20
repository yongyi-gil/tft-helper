"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import SummonerInfo from '@/component/summoner/SummonerInfo';

export default function Summoner() {
  const [ summoner , setSummoner ] = useState(null);

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
        }
      }

      const res = await fetch(url, options);
      const data = await res.json();

      getLeague(data.id);
      // getMatches(data.puuid);
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
        }
      }

      const res = await fetch(url, options);
      const data = await res.json();

      setSummoner(data[0]);
    } catch (error) {
      throw error;
    }
  }

  const getMatches = async (puuid: string) => {
    try {
      const url = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10`;
      const options = {
        method: 'GET',
        headers: {
          "X-Riot-Token": `${process.env.NEXT_PUBLIC_TFT_API_KEY}`,
        }
      }

      const res = await fetch(url, options);
      const data = await res.json();

      console.log('getMatches()', data);
    } catch (error) {
      throw error;
    }
  }

  return (
    summoner ? (
      <SummonerInfo
        summoner={summoner}
      />
    ) : <div>Loading...</div>
  )
}
