// outputs only data (no sideeffects)
const getSheetData = async () => {
  const cleanRow = function (row) {
    // row = [null,{v:'123'},null,{v:'hello'}]
    function replaceNull(item) {
      if (item == null) {
        return { v: "" };
      }
      return item;
    }
    data = row.map((item) => replaceNull(item)).map((item) => item.v);
    return data;
  };
  const sheetId = "1ujrnwrvuWBk21q_1gC3aiVzB9joPFbFebJpbJLqpeUY";

  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "raw";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;

  const response = await fetch(url);
  data = await response.text();
  parsed = JSON.parse(data.substring(47).slice(0, -2));

  let columns = parsed.table.cols.map((col) => col.label);
  let items = parsed.table.rows.map(({ c }) => cleanRow(c)); // only as in array
  // .map(([name, branch, typeMid, typeSmall, address, building, lon, lat]) => ({ name, branch, typeMid, typeSmall, address, building, lon, lat }))
  l = columns.length;
  var formattedItems = []; //formatted into array of objects
  for (var i = 0; i < items.length; i++) {
    var d = items[i],
      o = {};
    for (var j = 0; j < l; j++) {
      o[columns[j]] = d[j];
    }
    formattedItems.push(o);
  }
  //   console.log(formattedItems);
  return formattedItems;
};

let nameSuggestions;
let globalItems;
// we need then to resolve
getSheetData().then((items) => {
  globalItems = items;
  nameSuggestions = items
    .filter((item) => item["상세영업상태코드"] == 1)
    .map((item) => item["사업장명"]);
});
