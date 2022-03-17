import { UserCard } from 'react-ui-cards';
import { BASE } from "../api/http";

function ShopTile({data}) {
    let img;
    data.avatarUrl ?  img = BASE + "/" + data.avatarUrl : img = "defaultShop.png"
    return (
          <UserCard
            float
            href='https://github.com/nukeop'
            avatar={img}
            name= {data.name}
        />
    );
};

export default ShopTile;