import UpdateItems from "./../components/Sell/UpdateItem";

const Update = ({ query }) => (
  <div>
    <UpdateItems id={query.id} />
  </div>
);
export default Update;
