function populateCityList() {
  const cityList = document.querySelector("#city-list ul");
  cityList.innerHTML = "";
  cities.forEach((city, index) => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.style.backgroundColor = "#f44336";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "4px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.fontSize = "14px";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      cities.splice(index, 1);
      animateTour(cities);
      populateCityList();
    });
    listItem.innerText = `City ${index + 1} (${city.x}, ${city.y})`;
    listItem.appendChild(deleteButton);
    cityList.appendChild(listItem);
  });
}
