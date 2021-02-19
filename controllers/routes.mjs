// db is an argument to this function so
// that we can make db queries inside
export default function initRoutesController(db) {
  /**
   * Function to get all the routes present in the database
   * @param request
   * @param response
   */
  const index = (request, response) => {
    db.Route.findAll()
      .then((routes) => {
        response.send({ routes });
      })
      .catch((error) => console.log(error));
  };

  /**
   * Function to get the names of all the routes present in the database
   */
  const getAllRouteNames = (request, response) => {
    db.Route.findAll({
      attributes: ['name'],
    }).then((routes) => {
      const routeNames = [];
      routes.forEach((elRoute) => {
        routeNames.push(elRoute.name);
      });
      console.log(routes);
      response.send({ routeNames });
    })
      .catch((error) => {
        console.log(error);
      });
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, getAllRouteNames,
  };
}
