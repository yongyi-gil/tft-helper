import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';


const ToobarDiv = styled.div`
  display: flex;
  background-color: #2b2b2b;
  height: 40px;
  align-items: center;

  .link-button {
    padding: 8px 12px;

    &:hover {
      background-color: #101010;
      color: #f1f1f1;
    }
  }
`;

export default function Toolbar() {
  return (
    <ToobarDiv>
      <Link
        href="/"
        className="link-button"
      >
        배치 툴
      </Link>
      <Link
        href="/champion"
        className="link-button"
      >
        챔피언
      </Link>
      <Link
        href="/synergy"
        className="link-button"
      >
        시너지
      </Link>
      <Link
        href="/item"
        className="link-button"
      >
        아이템
      </Link>
    </ToobarDiv>
  )
}
