import { UserCard } from 'react-ui-cards';
import defaultShop from '../assets/defaultShop.png';

function ShopTile({ data }) {
  let img;
  data.avatarUrl ? img = `${data.avatarUrl}` : img = { defaultShop };
  return (
    <UserCard
      float
      href="https://github.com/nukeop"
      avatar={img}
      name={data.name}
    />
  );
}

export default ShopTile;
