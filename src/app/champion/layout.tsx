import React from 'react';

import ChampionList from '@/component/champion/ChampionList';

export default function page({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="path-champion">
      <React.Suspense fallback={<div />}>
        <ChampionList />
        {children}
      </React.Suspense>
    </div>
  )
}
