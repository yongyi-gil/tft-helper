import { ClassType } from "react";

export type PropertiesType =
  "컨트리" |
  "펜타킬" |
  "True Damage" |
  "EDM" |
  "KDA" |
  "펑크" |
  "믹스마스터" |
  "와일드카드" |
  "이모코어" |
  "Heartsteel" |
  "하이퍼팝" |
  "재즈" |
  "8비트" |
  "일류 비트" |
  "마에스트로";

export type classType = 
  "감시자" |
  "수호자" |
  "빅히트" |
  "주문술사" |
  "이단아" |
  "처형자" |
  "열혈 팬" |
  "거물" |
  "스테이지다이버"|
  "춤꾼" |
  "속사포" |
  "현혹술사" |
  "난동꾼";

export type SynergyType = {
  [key: string]: number;
}

export type ChampionType = {
  id: string;
  name: string;
  tier: number;
  properties: PropertiesType | ClassType;
}