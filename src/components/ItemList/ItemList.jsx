import Item from "../Item/Item";

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <p className="no-products-msg">No se encontraron productos.</p>;
  }

  return (
    <div className="item-list">
      {products.map(prod => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
};


export default ItemList;
