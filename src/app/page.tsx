import React from 'react';
import type { Metadata } from 'next';

import ChampionList from '@/component/list/ChampionList';
import SelectedChampion from '@/component/champion/SelectedChampion';

export const metadata: Metadata = {
  title: 'TeamFight Tactics Helper',
}

export default function Home() {
  return (
    <div className="root">
      <ChampionList />
      <SelectedChampion />
    </div>
  )
}
