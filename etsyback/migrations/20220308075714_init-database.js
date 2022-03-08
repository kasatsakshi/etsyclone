/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists('payment_paypal_status', (table) => {
      table.increments(); // integer id

      // name
      table.string('name');

      // description
      table.string('description');
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('payment_paypal_status'),
  ]);
};
