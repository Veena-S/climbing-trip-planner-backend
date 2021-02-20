// db is an argument to this function so
// that we can make db queries inside
export default function initTripsController(db) {
  const index = (request, response) => {
    db.Trip.findAll()
      .then((trips) => {
        response.send({ trips });
      })
      .catch((error) => console.log(error));
  };

  const createTrip = async (request, response) => {
    try {
      const newTrip = await db.Trip.create({
        name: request.body.name,
        creator: request.body.creator,
        startDate: new Date(request.body.startDate),
        endDate: new Date(request.body.endDate),
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(newTrip);
      const { routes } = request.body;

      const tripRouteQueries = [];
      for (let count = 0; count < routes.length; count += 1) {
        const singleRoute = {
          name: routes[count].name,
          difficulty: routes[count].difficulty,
          order: (count + 1),
          tripId: newTrip.id,
          created_at: new Date(),
          updated_at: new Date(),
        };
        tripRouteQueries.push(db.Route.create(singleRoute));
      }
      const routesResults = await Promise.all(tripRouteQueries);
      response.send({ trip: newTrip, routes: routesResults });
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index, createTrip,
  };
}
