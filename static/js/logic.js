function showPopup({ target }) {
  //   console.log(target.__data__);
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  const list = document.getElementById("list");
  if (list) {
    popup.removeChild(list);
  }
  const newList = document.createElement("ul");
  newList.setAttribute("id", "list");

  const { code, place, time, type, mag } = target.__data__.properties;
  const listItemCode = document.createElement("li");
  listItemCode.innerHTML = `<b>Code</b>: ${code}`;

  const listItemPlace = document.createElement("li");
  listItemPlace.innerHTML = `<b>Place</b>: ${place}`;

  const listItemTime = document.createElement("li");
  const dateTime = new Date(time);
  listItemTime.innerHTML = `<b>Time</b>: ${
    dateTime.getMonth() + 1
  }/${dateTime.getDate()}/${dateTime.getFullYear()}`;

  const listItemType = document.createElement("li");
  listItemType.innerHTML = `<b>Type</b>: ${type}`;

  const listItemMagnitude = document.createElement("li");
  listItemMagnitude.innerHTML = `<b>Magnitude</b>: ${mag}`;

  newList.appendChild(listItemCode);
  newList.appendChild(listItemPlace);
  newList.appendChild(listItemTime);
  newList.appendChild(listItemType);
  newList.appendChild(listItemMagnitude);

  popup.appendChild(newList);
}

const closePopupButton = document.getElementById("close-popup");
closePopupButton.onclick = () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
};

/************************************************************************
                    STARTS HERE
*************************************************************************/

let projection = d3.geoEquirectangular().scale(100).translate([460, 300]);

let geoGenerator = d3.geoPath().projection(projection);

var map = new L.Map("map", {
  center: [37.8, 0],
  zoom: 2,
  zoomControl: false,
  dragging: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  touchZoom: false,
}).addLayer(
  new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
);

var svg = d3.select(map.getPanes().overlayPane).append("svg");
svg
  .attr("width", "960px")
  .attr("height", "500px")
  .attr("style", "z-index: 99;");
var g = svg.append("g").attr("class", "leaflet-zoom-hide");
g.attr("style", "z-index: 199;");

const eqDataURL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(eqDataURL).then(function (collection) {
  console.log(collection);

  const getMaxDepth = (accumulator, currentValue) => {
    if (currentValue.geometry.coordinates[2] + 33 > accumulator)
      return currentValue.geometry.coordinates[2] + 33;
    else return accumulator;
  };

  const max_depth = collection.features.reduce(
    getMaxDepth,
    collection.features[0].geometry.coordinates[2] + 33
  );

  console.log(max_depth);
  function update(geojson) {
    const u = g.selectAll("path").data(
      geojson.features.map((feature) => {
        return {
          ...feature,
          geometry: { ...feature.geometry, type: "Point" },
        };
      })
    );

    u.enter()
      .append("circle")
      .attr("cx", function (d) {
        var point = map.latLngToLayerPoint(
          new L.LatLng(d.geometry.coordinates[1], d.geometry.coordinates[0])
        );
        console.log("hello", point);
        return point.x;
      })
      .attr("cy", function (d) {
        var point = map.latLngToLayerPoint(
          new L.LatLng(d.geometry.coordinates[1], d.geometry.coordinates[0])
        );
        return point.y;
      })

      .attr("r", function (d) {
        return d.properties.mag * (d.properties.mag / 1.5);
      })

      .attr("fill", (d) => {
        return `hsl(155, 75%, ${
          ((max_depth - (d.geometry.coordinates[2] + 33)) / max_depth) * 100
        }%)`;
      })
      .attr("stroke", "hsl(155, 75%, 85%)")
      .attr("stroke-width", "2px")
      .on("click", showPopup);
  }

  update(collection);
});
