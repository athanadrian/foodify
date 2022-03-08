import React from 'react';
import { Card, Followers } from '.';
import Wrapper from 'wrappers/public-profile/User';
const User = () => {
  return (
    <Wrapper>
      <Card />
      <Followers />
    </Wrapper>
  );
};

export default User;
