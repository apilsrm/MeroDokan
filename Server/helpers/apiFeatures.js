import { query } from "express"

class ApiFeatures {
    constructor (query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //for search
    search(){

     const keyword = this.queryStr.keyword ? {
        productName:{$regex:this.queryStr.keyword, $options: "i" }
     } :{}
     console.log(keyword);

     //pailako pani operater merge (to merge 2 object) garxa spread operator ...
     this.query = this.query.find({ ...keyword });
     return this;

    }

  //for filter
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    //for ratings and price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    if (this.queryStr.category) {
      this.query = this.query.find({ category: this.queryStr.category });
    }
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }




    //for pagination---  only this take as a parameter
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page ) || 1;
      const skip = resultPerPage * (currentPage-1)
    
      this.query = this.query.limit(resultPerPage).skip(skip);
      return this;
    }







}



export default ApiFeatures;