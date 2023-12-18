import React from 'react';
import type { Metadata } from 'next';

import ChampionList from '@/component/list/ChampionList';
import SelectedChampion from '@/component/champion/SelectedChampion';

export const metadata: Metadata = {
  title: 'TeamFight Tactics Helper',
}

export default function Home() {
  return (
    <div className="home">
      <React.Suspense fallback={<div />}>
        <ChampionList />
        <SelectedChampion />
      </React.Suspense>
    </div>
  )
}
