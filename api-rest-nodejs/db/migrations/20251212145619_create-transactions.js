export async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}
export async function down(knex) {
    await knex.schema.dropTable('transactions');
}
//# sourceMappingURL=20251212145619_create-transactions.js.map