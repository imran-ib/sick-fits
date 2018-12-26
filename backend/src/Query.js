const Query = {
  dog(parent, args, ctx, info) {
    return [
      {
        name: "Snikers"
      },
      {
        name: "papu"
      }
    ];
  }
};

module.exports = Query;
