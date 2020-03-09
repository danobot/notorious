import React from 'react';
import { HomeStyle } from './component.styles';

export default function Home(props) {
  return (
    <HomeStyle>
      <div>Home Sample Text</div>
      <div>{JSON.stringify(props, null, "\t")}</div>
    </HomeStyle>
  );
}
