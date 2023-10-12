# leaflet-mapping_challenge

In this challenge, I have implemented a web-based visualization tool that provides a map-based representation of earthquakes that occurred in the last seven days. The data is fetched from the USGS Earthquake Data API. Here's a breakdown of the core functionalities and features I integrated:

I. Data Fetching and Processing:
I utilized the D3 library to fetch earthquake data in GeoJSON format from the eqDataURL. After retrieving the data, I computed the maximum depth of earthquakes in the dataset, which would be subsequently used for the visualization's color scale.

II. Map Creation with Leaflet:
For the base map, I used the Leaflet library. The map is centered at coordinates [37.8, 0] with an initial zoom level of 2. Various interactive features like zooming and dragging were disabled for simplicity.

III. Plotting Earthquake Data:
On top of the base map, I visualized earthquake data using SVG elements. Each earthquake was represented by a circle, with the circle's size being proportional to the magnitude of the earthquake. The color of each circle corresponds to the depth of the earthquake, with a gradient ranging from light (for shallow earthquakes) to dark (for deep earthquakes).

IV. Popup Functionality:
Upon clicking any earthquake circle, a popup appears showing the details of the earthquake such as its code, place, time, type, and magnitude. The showPopup function was designed to handle this. The popup can be closed using the 'X' button in its top-right corner.

V. Depth Color Gradient Legend:
To provide users with context on the color representation of earthquake depths, I added a linear gradient legend. It is a colored bar ranging from dark to light, indicating high to low depths, respectively.

The provided HTML file serves as the structure of the web page. It contains the map container, a depth gradient legend, and a popup section. All the dynamic interactions and data visualizations are driven by the JavaScript code. The CSS within the HTML provides the necessary styling to make the visualization visually appealing.
