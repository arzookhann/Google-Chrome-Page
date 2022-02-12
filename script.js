`use strict`;

// Selecting DOM elements.
const bodyEl = document.querySelector("body");
const searchBarEl = document.querySelector(".container-search-bar");
const searchInputEl = document.querySelector("#search-input");
const searchBarAnchorTagEl = document.querySelector(".search-google");
const searchHistoryBoxEl = document.querySelector(".search-history-box");

/**
 * @function displaySearchHistory | Function to display the searched history which matches the user input.
 * @param {array} matchedHistoryData | Array of history data matched with user input.
 */
const displaySearchHistory = function (matchedHistoryData) {
   let historyDataHTML;
   if (matchedHistoryData.length) {
      historyDataHTML = matchedHistoryData.map(data => `<li><img src="img/history.png" alt="history">${data}</li>`).join(" ");
   }
   else {
      historyDataHTML = `<li><img src="img/history.png" alt="history">${searchInputEl.value}</li>`;
   }
   searchHistoryBoxEl.innerHTML = historyDataHTML;
}


/**
 * @function googleSearch | Function to search the user input on google.
 */
const googleSearch = function () {
   const searchLink = `https://www.google.com/search?q=${searchInputEl.value}`;

   // Updating search history data
   const indexOfUserInput = searchHistoryData.indexOf(searchInputEl.value);
   if (indexOfUserInput > -1) {
      searchHistoryData.splice(indexOfUserInput, 1);
   }
   searchHistoryData.unshift(searchInputEl.value);

   searchInputEl.value = "";
   searchInputEl.blur();
   searchBarEl.classList.remove("active");
   searchBarAnchorTagEl.setAttribute("href", searchLink);
   searchBarAnchorTagEl.click();
};


/**
 * @function selectElement | Function to select the user choice from history box and search the same on google.
 * @param {object} element | User selected element.
 */
const selectElement = function (element) {
   searchBarEl.focus();
   searchInputEl.value = element.textContent;
   googleSearch();
}


// Adding event listener on search input box.
searchInputEl.addEventListener("keyup", function (event) {
   let userInput = event.target.value;

   if (userInput) {
      if (event.key === "Enter") {
         googleSearch();
      }
      else {
         const matchedHistoryData = searchHistoryData
            .filter((data) => data.toLowerCase().startsWith(userInput.toLowerCase()));

         // Show search history box
         searchBarEl.classList.add("active");
         displaySearchHistory(matchedHistoryData);

         // Selecting all li tags in search history box
         const searchHistoryBoxAllListEl = searchHistoryBoxEl.querySelectorAll("li");

         // Adding onclick attribute in all li tags
         searchHistoryBoxAllListEl.forEach(function (_, i, listArray) {
            listArray[i].setAttribute("onclick", "selectElement(this)");
         });
      }
   }
   else {
      // Hide search history box
      searchBarEl.classList.remove("active");
   }
});

// When input box looses focus.
bodyEl.addEventListener("click", function (event) {
   searchBarEl.classList.remove("active");
});
