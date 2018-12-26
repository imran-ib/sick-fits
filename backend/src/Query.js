const { forwardTo } = require("prisma-binding");

//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: Q U E R Y   A L L   I T E M : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
// we can forward this to prisma binding only if we do not want to change anything
const Query = {
  items: forwardTo("db")
};
//
// ─── OR WE CAN USE OUR OWN WAY ──────────────────────────────────────────────────
//

// const Query = {
//   async items(parent, args, ctx, info) {
//     const items = await ctx.db.query.items();
//     return items;
//   }
// };

module.exports = Query;
