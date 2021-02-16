const difficulties = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6,
  5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

const { fake } = require('faker');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 3);
    const endDate = startDate;
    endDate.setDate(endDate.getDate() + 3);

    const tripsList = [
      {
        name: 'krabi',
        creator: faker.name.firstName(),
        start_date: startDate,
        end_date: endDate,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yosemite',
        creator: faker.name.firstName(),
        start_date: startDate,
        end_date: endDate,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert categories before items because items reference categories
    const trips = await queryInterface.bulkInsert(
      'trips',
      tripsList,
      { returning: true },
    );

    const routes = [];

    for (let i = 0; i < trips.length; i += 1) {
      const trip = trips[i];
      const countRoutes = 15;
      for (let routeIdx = 0; routeIdx < countRoutes; routeIdx += 1) {
        const noun = faker.company.bsNoun(); // Rowan Nikolaus
        const adjective = faker.commerce.productAdjective(); // Rowan Nikolaus
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        routes.push({
          name: `${adjective} ${noun}`,
          trip_id: trip.id,
          difficulty,
          order: (routeIdx + 1),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    queryInterface.bulkInsert('routes', routes);
  },

  down: async (queryInterface, Sequelize) => {},
};
