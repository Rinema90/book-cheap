
function ProductCategoryRow({ category }) {
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
  
  function ProductRow({ product }) {
    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
  
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
  
  function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function SearchBar() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <label>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </label>
      </form>
    );
  }
  
  function FilterableProductTable({ products }) {
    return (
      <div>
        <SearchBar />
        <ProductTable products={products} />
      </div>
    );
  }



const books = [{"id":18,"title":"Petit Ours Brun va à l'école","author":"Marie Aubinais","published_date":"1990-11-16T23:00:00.000Z","price":"2.00","stock":1,"picture":"https://m.media-amazon.com/images/I/61I8ASrp3jL._SY522_.jpg"},{"id":19,"title":"Petit Ours Brun est malade","author":"Marie Aubinais","published_date":"1991-03-05T23:00:00.000Z","price":"2.00","stock":2,"picture":"https://dxbyzx5id4chj.cloudfront.net/fit-in/400x400/filters:fill(fff)/pub/media/catalog/product/9/7/9782092570760ORI_fe19.jpg"},{"id":20,"title":"Alice Détective","author":"Caroline Quine","published_date":"1930-04-27T23:00:00.000Z","price":"3.50","stock":4,"picture":"https://www.babelio.com/couv/CVT_5094_682831.jpg"},{"id":22,"title":"Nouveau livre","author":"Auteur inconnu","published_date":"2023-10-09T22:00:00.000Z","price":"10.99","stock":5,"picture":"https://example.com/image.jpg"},{"id":17,"title":"Nouveau titre","author":"Nouvel auteur","published_date":"2024-10-09T22:00:00.000Z","price":"14.99","stock":5,"picture":"https://example.com/newimage.jpg"}]