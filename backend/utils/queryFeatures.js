module.exports = class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // queryObject is just a shallow copy of the "queryString" object, since req.query is an object
    const queryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObject[field]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this; // Builder Design Pattern. We return the object itself so we can chain methods
  }

  sort() {
    if (this.queryString.sort) {
      // { sort: 'title,year' }
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query.sort("-title");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // || 1 -> default 1
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit; // (1-10, 11-20, 21-30...) NE TREBA + 1 JER MI HOCEMO DA SKIPAMO 10, A NE 11
    this.query = this.query.skip(skip).limit(limit);

    // suvisno, jer ako nam vrati prazan page, onda je logicno da page ne postoji
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist');
    // }

    return this;
  }
};
