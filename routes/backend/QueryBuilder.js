class QueryBuilder {
  constructor(queryObject, queryChain) {
    let createFilterQuery = function(obj) {
      let temp = { ...obj };
      let excludeFields = ["sort", "page", "limit", "fields"];
      excludeFields.forEach(el => delete temp[el]);
      return JSON.stringify(temp)
        .replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`); // queryString for filter
    }
    this.queryObject = queryObject; // query object from request
    this.filteredQuery = createFilterQuery(this.queryObject);
    this.queryChain = queryChain;  // to chain query together
  }

  filter() {
    this.queryChain = this.queryChain.find(JSON.parse(this.filteredQuery));
    return this;
  }
  sort() {
    if ("sort" in this.queryObject) {
      const sortFields = this.queryObject.sort.split(",").join(" ")
      this.queryChain = this.queryChain.sort(sortFields);
    } else {
      this.queryChain = this.queryChain.sort("-createdAt _id");
    }
    return this;
  }
  paginate() {
    const page = this.queryObject.page * 1 || 1;
    let limit = 10;
    if("limit" in this.queryObject){
      limit = this.queryObject.limit;
    }
    const skip = (page - 1) * 10;
    this.queryChain = this.queryChain.skip(skip).limit(limit);
    return this;
  }
}



module.exports = QueryBuilder;
