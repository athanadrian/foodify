import React from 'react';
import { Card, Followers, Following, Social } from '.';
import Wrapper from 'wrappers/public-profile/User';
const User = () => {
  return (
    <Wrapper>
      <Card />
      <Social />
      <Followers />
      <Following />
    </Wrapper>
  );
};

export default User;
