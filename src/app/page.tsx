"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SearchSummoner from '@/component/summoner/SearchSummoner';

export default function SummonerPage() {
  const router = useRouter();

  return (
    <div>
      <SearchSummoner
        handleSearch={(name) => {
          router.push(`/${name}`);
        }}
      />
    </div>
  )
};
