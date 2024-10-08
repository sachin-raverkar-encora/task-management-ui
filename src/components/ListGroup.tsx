function ListGroup() {
  const cities = ["London", "Paris", "New York", "San Francisco"];
  return (
    <>
      <h1>List Group</h1>
      {cities.length === 0 && <p>No cities found</p>}
      <ul className="list-group">
        {cities.map((city) => (
          <li className="list-group-item" key={city}>
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
