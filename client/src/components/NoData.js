const NoFoodys = () => <h4>NoData</h4>;

const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && <h4>User does not have followers</h4>}

    {followingComponent && <h4>User does not follow any users</h4>}
  </>
);

export { NoFollowData, NoFoodys };
