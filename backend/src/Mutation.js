const Mutation = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // copy the item //item
    const updates = { ...args };
    // remove the id from updated
    delete updates.id;
    // update the item
    const updatedItem = await ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
    return updatedItem;
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1 find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 2 check if the are the owner
    // TODO
    // 3 delete the item
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutation;
