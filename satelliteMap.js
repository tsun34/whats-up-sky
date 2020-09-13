const dataPath = "./data/UCS-Satellite-Database-4-1-2020.csv";

document.addEventListener("DOMContentLoaded", function(){


  const widthValue = 1000;
  const heightValue = 3000;
  
  // set dimensions and margin for display
  const margin = { top: 10, right: 20, bottom: 30, left: 50 };
  const width = widthValue - margin.left - margin.right;
  const height = heightValue - margin.top - margin.bottom; // for xscale and yscale

  const svg = d3
              .select("#satellite-map")
              .append("svg")
            //   .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)

  svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // get data
  d3.csv(dataPath, function(data){

      // console.log(data["Perigee (km)"]);

      //set x axis
      const xScale = d3.scaleLinear()
                      .domain([-180, 180])
                      .range([0, width]);
      const xAxis = svg.append("g")
                      .attr("transform", `translate(0, ${height})`)
                      .call(d3.axisBottom(xScale))//.ticks(width/80, ","))
      //add x axis label
    //   svg.append("text")
    //       .attr("class", "x-label")
    //       .attr("text-anchor", "end")
    //       .attr("x", width)
    //       .attr("y", height-5)
    //       .attr("fill", "1e56a0")

      // set y axis
      const yScale = d3.scaleBand()
                      .domain([200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000, 50000, 62200])
                    // .domain([200, 60000])  
                    .range([height, 0]);
      const yAxis = svg.append("g")
                      .attr("transform", `translate(${width}, 0)`)
                      .call(d3.axisLeft(yScale))//.ticks(height/80, ","));

      // set bubble size
      const zScale = d3.scaleSqrt()
                      .domain([0, 20000])
                      .range([1, 40])


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

      // // gridlines representing orbital height
      // function make_orbit_height_gridlines() {
      //     return d3.axisLeft(y)
      //             .ticks(5)
      // }

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
              .attr("cx", function (d) { return xScale(d.longitude); })
              .attr("cy", function (d) { return yScale(d.perigee); })
              .attr("r", function (d) { return zScale(d.mass); })
              .style("fill", function (d) { return dotColor(d.country); })
          .on("mouseover", showTooltip)
          .on("mousemove", moveTooltip)
          .on("mouseleave", hideTooltip)

      // svg.append("g")
      //     .attr("class", "grid")
      //     .call(make_orbit_height_gridlines()
      //         .tickSize(-height)
      //         .tickFormat('')
      //     );

  });

  // function MouseHover(){

  // }

  // function SortBy(field){

  // }
})