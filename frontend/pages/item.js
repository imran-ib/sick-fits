import { SingleItem } from "./../components/Home/SingleItem";
const Item = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
);

export default Item;
