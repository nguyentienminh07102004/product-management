let search = (query) => {
  let keywordSearch = {
    keyword: ""
  }
  if (query.keyword) {
    keywordSearch.keyword = query.keyword;
    let regex = new RegExp(keywordSearch.keyword, "i"); // Regex
    keywordSearch.regex = regex;
  }

  return keywordSearch;
}

module.exports = search;