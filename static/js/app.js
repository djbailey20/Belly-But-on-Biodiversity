var fullData = [];

//Unpack
const unpack = (data, key) => {
  return data.map(obj => obj[key]);
};

//Do Once the Select Input Changes
const optionChanged = value => {
  var sample = fullData.samples[value];
  var sampleValues = sample.sample_values.slice(0, 10);
  var otuIds = sample.otu_ids.slice(0, 10);
  var otuLabels = sample.otu_labels.slice(0, 10);
  var id = sample.id;
  graphBar(sampleValues, otuIds, otuLabels, id);
  graphBubble(otuIds, sampleValues, otuLabels, id);
  updateDemographic(fullData.metadata[value]);
  graphGauge(fullData.metadata[value].wfreq);
};

//Update Demographic Function
const updateDemographic = obj => {
  d3.select("#sample-metadata").html("");
  var demoContainer = d3
    .select("#sample-metadata")
    .append("ul")
    .style("list-style-type", "none")
    .style("padding-left", "0");
  Object.entries(obj).forEach(([key, value]) => {
    demoContainer.append("li").text(`${key}: ${value}`);
  });
};

// Graph Bar Function
const graphBar = (x, y, labels, name) => {
  var trace1 = {
    x: x,
    y: y.map(d => "OTU " + d),
    type: "bar",
    orientation: "h",
    text: labels
  };

  var data = [trace1];

  var layout = {
    title: `Bar Chart: Top 10 OTUs found in Sample ${name}`
  };

  Plotly.newPlot("bar", data, layout);
};

//Graph Bubble Function
const graphBubble = (x, y, labels, name) => {
  var trace1 = {
    x: x,
    y: y,
    mode: "markers",
    marker: {
      color: x,
      size: y
    },
    text: labels
  };

  var data = [trace1];

  var layout = {
    title: `Bubble Chart: Top 10 OTUs found in Sample ${name}`,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", data, layout);
};

//Get Data
d3.json("samples.json").then(data => {
  console.log(data);
  fullData = data;
  var select = d3.select("#selDataset");
  data.samples.forEach((sample, i) => {
    select
      .append("option")
      .attr("value", i)
      .text(sample.id);
  });
  optionChanged(0);
});
