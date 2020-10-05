const dataPath = "./data/UCS-Satellite-Database-4-1-2020.csv";
const uniqueVehiclePath = "./data/launchVehicleUnique.csv";

document.addEventListener("DOMContentLoaded", function(){

  let uniqueVehicle = [];

  d3.csv(uniqueVehiclePath, function(vehicles){
    vehicles.forEach(function(v){
      uniqueVehicle.push(v.launchVehicle)
    })
  })

  const widthValue = 1000;
  const heightValue = 4000;
  
  // set dimensions and margin for display
  const margin = { top: 10, right: 20, bottom: 30, left: 50 };
  const width = widthValue - margin.left - margin.right;
  const height = heightValue - margin.top - margin.bottom; // for xscale and yscale

  const svg = d3
              .select("#satellite-map")
              .append("svg")
              .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);
              // .attr("width", width + margin.left + margin.right)
              // .attr("height", height + margin.top + margin.bottom)

  svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // get data
  d3.csv(dataPath, function(data){


      //set x axis
      const xScale = d3.scaleLinear()
                        .domain([0,1])
                        .range([40,Math.min(1000, width-40)])
      //.scalePoint()
      //                 .domain(uniqueVehicle)
      //                 .range([40, Math.min(1000, width - 40)])
      //                 .padding(0.6)
      //                 .round(true)


      // const xAxis = svg.append("g")
      //                 .attr("transform", `translate(0, ${height})`)
      //                 .call(d3.axisBottom(xScale))
  

      // set y axis
    const yScale = d3//.scaleSequential(d3.interpolator([0, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000, 50000, 62200]))
                    .scaleLinear()
                    .domain([1050, 180])
                    .range([height, 0])
                    // .nice()

      const yAxis = svg.append("g")
                      .attr("transform", `translate(${widthValue}, 0)`)
                      .call(d3.axisLeft(yScale))

      // set bubble size
      const zScale = d3.scaleSqrt()
                      .domain([0, 20000])
                      .range([5, 40])
                      .clamp(true)


      //set bubble color
      const colorDomain = ["USA","Russia", "China", "Japan", "India", "European", "Multinational"]
      const dotColor = d3.scaleOrdinal()
                        .domain(colorDomain)
                        .range(d3.schemeTableau10)

      //create tooltip (hidden by default)
      const tooltip = d3.select("#satellite-map")
                        .append("div")
                            .style("opacity", 0)
                            .attr("class", "tooltip")
                            .style("background-color", "black")
                            .style("border-radius", "5px")
                            .style("padding", "10px")
                            .style("color", "white")

      const showTooltip = function(d) {
          const infoShown = `Official Name of Satellite: ${d.name} <br/>
                          Country of Owner: ${d.country} <br/>
                          User: ${d.user} <br/>
                          Purpose: ${d.purpose} <br/>
                          Class of Orbit: ${d.orbit} <br/> 
                          Perigee(km): ${d.perigee} <br/>
                          Launch Site: ${d.launchSite} <br/>
                          Launch Vehicle: ${d.launchVehicle} <br/>
                          Date of Launch: ${d.date} <br/>
                          Launch Mass(kg): ${d.mass}`

          tooltip.transition()
                .duration(200)
          tooltip.style("opacity", 1)
                .html(infoShown)
                .style("left", (d3.event.pageX)+"px")
                .style("top", (d3.event.pageY)+"px")
                .style("display", "inline-block")
      }

      const moveTooltip = function(d) {
        const infoShown = `Official Name of Satellite: ${d.name} <br/>
                          Country of Owner: ${d.country} <br/>
                          User: ${d.user} <br/>
                          Purpose: ${d.purpose} <br/>
                          Class of Orbit: ${d.orbit} <br/> 
                          Perigee(km): ${d.perigee} <br/>
                          Launch Site: ${d.launchSite} <br/>
                          Launch Vehicle: ${d.launchVehicle} <br/>
                          Date of Launch: ${d.date} <br/>
                          Launch Mass(kg): ${d.mass}`
        tooltip.style("left", (d3.event.pageX + 15) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
      }

      const hideTooltip = function(d) {
          tooltip.transition()
                .duration(200)
                .style("opacity", 0)
      }

      // gridlines representing orbital height
      function make_orbit_height_gridlines() {
          return d3.axisLeft(yScale)
                  .ticks(10)
      }

      // //format the data
      // data.forEach(function(d){
      //     d.date = parseTime(d.date);
      //     d.close = +d.close;
      // })

      //scale the y range of data
      // y.domain([0, d3.max(data, function(d) {return d.close;})]);

      // add gridlines
      svg.append("g")
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
              .attr("class", "bubbles")
              .attr("cx", function (d) { return xScale(Math.random());})// d.launchVehicle); })
              .attr("cy", function (d) { return yScale(d.perigee); })
              .attr("r", function (d) { return zScale(d.mass); })
              .style("fill", function (d) { return dotColor(d.country); })
          .on("mouseover", showTooltip)
          .on("mousemove", moveTooltip)
          .on("mouseleave", hideTooltip)

      svg.append("g")
          .attr("class", "grid")
          .call(make_orbit_height_gridlines()
              .tickSize(-height)
              .tickFormat('')
          );

  });


  // function SortBy(field){

  // }
})