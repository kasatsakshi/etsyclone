/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return Promise.all([
    knex.schema.hasTable('address').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('address', (t) => {
          // t.increments().primary; // integer id
          t.string('address1').notNullable();
          t.string('address2');
          t.string('city').notNullable();
          t.string('state').notNullable();
          t.string('country').notNullable();
          t.string('zipcode').notNullable();
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }
      return null;
    }),

    knex.schema.hasTable('user').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('user', (t) => {
          // t.increments().primary; // integer id
          t.string('name');
          t.string('email').unique();
          t.string('password').notNullable();
          t.string('gender');
          t.string('phone').checkRegex('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');
          t.string('avatarUrl');
          t.string('birthday');
          t.string('bio');
          t.string('userStatus').checkIn(['active', 'inactive']);
          t.timestamp('lastLoginAt');
          t.timestamp('lastLogoutAt');
          t.string('currency').notNullable().defaultTo('USD');
          t.boolean('userLevel').checkIn([0, 1, 2]); // 0-buyer, 1-seller, 2-admin
          t.integer('addressId').unsigned();
          t.foreign('addressId').references('id').inTable('address');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }
      return null;
    }),

    knex.schema.hasTable('shop').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('shop', (t) => {
          // t.increments().primary; // integer id
          t.string('name').notNullable().unique();
          t.string('description');
          t.string('avatarUrl');
          t.integer('userId').unsigned().notNullable();
          t.integer('addressId').unsigned().notNullable();
          t.foreign('userId').references('id').inTable('user');
          t.foreign('addressId').references('id').inTable('address');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }
      return null;
    }),

    knex.schema.hasTable('inventory').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('inventory', (t) => {
          // t.increments().primary; // integer id
          t.string('name').notNullable();
          t.string('description');
          t.string('pictureUrl');
          t.string('category').notNullable();
          t.integer('categoryId').unsigned();
          t.foreign('categoryId').references('id').inTable('category');
          t.decimal('price').notNullable();
          t.integer('quantity').notNullable();
          t.integer('shopId').unsigned().notNullable();
          t.foreign('shopId').references('id').inTable('shop');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
          t.timestamp('deletedAt');
        });
      }
      return null;
    }),

    knex.schema.hasTable('category').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('category', (t) => {
          // t.increments().primary; // integer id
          t.string('name').notNullable();
          t.integer('shopId').unsigned();
          t.foreign('shopId').references('id').inTable('shop');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }
      return null;
    }),

    knex.schema.hasTable('userFavorites').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('userFavorites', (t) => {
          // t.increments().primary; // integer id
          t.integer('userId').unsigned().notNullable();
          t.integer('inventoryId').unsigned().notNullable();
          t.foreign('userId').references('id').inTable('user');
          t.foreign('inventoryId').references('id').inTable('inventory');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }

      return null;
    }),

    knex.schema.hasTable('order').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('order', (t) => {
          // t.increments().primary; // integer id
          t.decimal('finalAmount').notNullable();
          t.string('status').checkIn(['ordered', 'inTransit', 'delivered', 'cancelled']);
          t.string('orderId');
          t.timestamp('orderedDate').notNullable();
          t.integer('userId').unsigned().notNullable();
          t.foreign('userId').references('id').inTable('user');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }

      return null;
    }),

    knex.schema.hasTable('orderDetails').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('orderDetails', (t) => {
          // t.increments().primary; // integer id
          t.integer('orderQuantity').notNullable();
          t.string('orderId');
          t.decimal('price');
          t.string('pictureUrl');
          t.string('category');
          t.string('name');
          t.string('description');
          t.integer('shopId').unsigned().notNullable();
          t.foreign('shopId').references('id').inTable('shop');
          t.integer('inventoryId').unsigned().notNullable();
          t.foreign('inventoryId').references('id').inTable('inventory');
          t.timestamp('createdAt').defaultTo(knex.fn.now());
          t.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
      }
      return null;
    }),
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return Promise.all([
    await knex.schema.dropTableIfExists('orderDetails'),
    await knex.schema.dropTableIfExists('order'),
    await knex.schema.dropTableIfExists('userFavorites'),
    await knex.schema.dropTableIfExists('order'),
    await knex.schema.dropTableIfExists('inventory'),
    await knex.schema.dropTableIfExists('shop'),
    await knex.schema.dropTableIfExists('user'),
    await knex.schema.dropTableIfExists('address'),
  ]);
}
