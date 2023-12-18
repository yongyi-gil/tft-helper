import { atom, selector } from 'recoil';

// fetch synergy
const fetchSynergyData = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/synergy`;
    const res = await fetch(url, { cache: 'force-cache' });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;    
  } 
}

// load synergy data
export const synergyState = atom({
  key: 'synergyState',
  default: fetchSynergyData(),
});

// access synergy data
export const synergyDataSelector = selector({
  key: 'synergyDataSelector',
  get: async ({ get }) => {
    const data = await get(synergyState);
    return data;
  }
});
