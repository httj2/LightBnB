const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
/// Users

const pool = new Pool({
  database: "lightbnb",
  host: "localhost",
  user: "vagrant",
  password: "corgi123",
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1`;
  // console.log("queryString for getUserwithEmail:", queryString);
  return pool
    .query(queryString, [email])
    .then((res) => res.rows[0])
      // console.log(res.rows[0]);
      
    .catch((err) => console.error(err));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `
  SELECT * 
  FROM users
  WHERE id = $1`;
  // console.log("queryString for getUserwithId:", queryString);
  return pool
    .query(queryString, [id])
    .then((res) => res.rows[0]
      // console.log(res.rows[0]);

    )
    .catch((err) => console.error(err));
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function async (user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)  RETURNING *`;

  // console.log("queryString: :", queryString);
  return pool
    .query(queryString, [user.name, user.email, user.password])
    .then((res) => 
      // console.log(`addUser: ${res.rows[0]}`);
      res.rows[0]
    )
    .catch((err) => console.error("eror:", err));
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
 //This function accepts a guest_id, limits the properties to 10 and returns a promise. The promise should resolve reservations for that user. Use the All My Reservations query that you made in a previous assignments.
 const queryString = `
  SELECT *
  FROM reservations
  JOIN users ON guest_id = users.id
  JOIN properties ON property_id = properties.id
  WHERE guest_id = $1
  AND end_date < now()::date
  LIMIT $2`;
 return pool
    .query(queryString, [guest_id, limit])
    .then((res) => res.rows
      // console.log(res.rows)
    )
    .catch((err) => console.error("eror:", err));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} \n`;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryParams.length === 1) {
      queryString += `WHERE owner_id  $${queryParams.length}`
    } else {
      queryString += `AND owner_id = $${queryParams.length}`
    }
  }
  if (options.minimum_price_per_night){
    queryParams.push(options.minimum_price_per_night * 100)
    if (queryParams.length === 1){
      queryString += ` WHERE cost_per_night >= $${queryParams.length} \n`
    } else {
      queryString += ` AND cost_per_night >= $${queryParams.length } \n`
    }
  };
  if (options.maximum_price_per_night){
    queryParams.push(options.maximum_price_per_night * 100)
    if (queryParams.length === 1){
      queryString += ` WHERE cost_per_night <= $${queryParams.length} \n`
    } else {
      queryString += ` AND cost_per_night <= $${queryParams.length } \n`
    }
  };

  queryString += `GROUP BY properties.id \n`;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(rating) >= $${queryParams.length} `;
  };
  
  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
