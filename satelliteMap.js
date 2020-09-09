document.addEventListener("DOMContentLoaded", function(){
  
    
    const widthValue = 1200;
    const heightValue = 650;

    const svg = d3
                .select("#satellite-map")
                .append("svg")
                .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);
    
    // set dimensions and margin for display  
    const margin = {top: 10, right: 20, bottom:30, left: 50};
    const width = widthValue - margin.left - margin.right;
    const height = heightValue - margin.top - margin.bottom; // for xscale and yscale


    function MouseHover(){

    }

    function SortBy(field){

    }
})