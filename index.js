const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

axios.get('https://www.taptap.com/top/download',{
}).then((res)=>{
    // console.log(res.data)
  const $ = cheerio.load(res.data);
  let hotList = [];
//   console.log($("#topList"))
  $("#topList .taptap-top-card").each(function (index) {
    if (index !== 0) {

      const $td = $(this).children('.top-card-middle').eq(0);
      console.log($td)
      const link = $td.find("h4").text();
      const text = $td.find(".card-middle-author").find('a').text();
      const hotValue = $td.find(".card-middle-author").find('a').attr('herf');
      hotList.push({
        index,
        link,
        text,
        hotValue,
      });
    }
  });
  fs.writeFileSync(
    `${__dirname}/hotSearch.json`,
    JSON.stringify(hotList),
    "utf-8"
  );


})