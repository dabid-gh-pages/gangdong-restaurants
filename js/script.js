// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const searchData = document.querySelector(".search-data");

let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    // icon.onclick = () => {
    //   webLink = `https://www.google.com/search?q=${userData}`;
    //   linkTag.setAttribute("href", webLink);
    //   linkTag.click();
    //   searchWrapper.classList.remove("active");
    // };
    emptyArray = nameSuggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  // icon.onclick = () => {
  //   webLink = `https://www.google.com/search?q=${selectData}`;
  //   linkTag.setAttribute("href", webLink);
  //   linkTag.click();
  // };
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

icon.onclick = () => {
  function to_date(date_str) {
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(4, 6);
    var sDate = yyyyMMdd.substring(6, 8);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  }
  if (inputBox.value != "") {
    searchWrapper.classList.remove("active");
    searchData.classList.remove("active");

    var values = inputBox.value;
    const itemObject = globalItems.filter(
      (item) => values == item["사업장명"]
    )[0];
    const permitDate = itemObject["인허가일자"];
    const address = itemObject["도로명주소"];
    console.log({ itemObject });
    console.log({ values });
    searchData.innerHTML =
      "<div style='font-weight: 500;'>" +
      "</div>" +
      "<span style='font-weight: 500;'>" +
      values +
      "</span>" +
      // "<div style='font-weight: 500;'>" +
      // address +
      // "</div>" +
      "<div style='font-weight: 500;'>" +
      `인허가일 : ${String(permitDate).substring(0, 4)}년 ${String(
        permitDate
      ).substring(4, 6)}월 ${String(permitDate).substring(6, 8)}일 ` +
      "</div>";
  } else {
    searchData.textContent = "";
  }
};
