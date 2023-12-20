"use client";
import React, { useState } from 'react';

import SearchPlayer from '../component/search/SearchPlayer';
import SummonerInfo from '@/component/search/SummonerInfo';

export default function SummonerPage() {
  const [ summoner , setSummoner ] = useState(null);

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
      console.log(data);

      getLeague(data.id);
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
      console.log(data);

      setSummoner(data[0]);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <SearchPlayer
        handleSearch={(name) => {
          getSummonerInfo(name);
        }}
      />
      {
        summoner && (
          <SummonerInfo
            summoner={summoner}
          />
        )
      }
    </div>
  )
};
