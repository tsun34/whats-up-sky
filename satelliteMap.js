const dataPath = "./data/UCS-Satellite-Database-4-1-2020.csv";

document.addEventListener("DOMContentLoaded", function(){
  
    
    const widthValue = 1200;
    const heightValue = 650;

    const svg = d3
                .select("#satellite-map")
                .append("svg")
                .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

    // set dimensions and margin for display  
    const margin = { top: 10, right: 20, bottom: 30, left: 50 };
    const width = widthValue - margin.left - margin.right;
    const height = heightValue - margin.top - margin.bottom; // for xscale and yscale


    // set the ranges
    let y = d3.scaleLinear().range([height, 0])


    // gridlines representing orbital height
    function make_orbit_height_gridlines() {
        return d3.axisLeft(y)
                .ticks(5)
    }

    // get data
    Promise.all([d3.csv("./data/UCS-Satellite-Database-4-1-2020.csv")]).then(function(data){

        // if (error) throw error;
        console.log(data[0]);

        // //format the data
        // data.forEach(function(d){
        //     d.date = parseTime(d.date);
        //     d.close = +d.close;
        // })

        //scale the y range of data
        // y.domain([0, d3.max(data, function(d) {return d.close;})]);


        // add gridlines 
        svg.append("g")
            .attr("class", "grid")
            .call(make_orbit_height_gridlines()
                .tickSize(-height)
                .tickFormat('')
            );

        // add axis
        svg.append("g")
            .call(d3.axisLeft(y));
    });

    



    


    function MouseHover(){

    }

    function SortBy(field){

    }
})