import { atom, selector } from 'recoil';

// fetch champions data
const fetchChampData = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/champions`;
    const res = await fetch(url, { cache: 'force-cache' });
  
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;    
  } 
}

// load champ data
export const champState = atom({
  key: 'champState',
  default: fetchChampData(),
});

// access champ data
export const champDataSelector = selector({
  key: 'champDataSelector',
  get: async ({ get }) => {
    const data = await get(champState);
    return data;
  }
});

// selected champion
export const selectedChampState = atom({
  key: 'selectedChampState',
  default: [],
})

// search champion
export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
})
