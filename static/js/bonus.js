const graphGauge = freq => {
  var data = [
    {
      value: freq,
      title: { text: "Belly Button Washing Frequency/Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { visible: true, range: [null, 9], tickmode: "linear" },
        steps: [
          { range: [0, 1], color: "#bad9ff" },
          { range: [1, 2], color: "#bae6ff" },
          { range: [2, 3], color: "#baefff" },
          { range: [3, 4], color: "#baf8ff" },
          { range: [4, 5], color: "#bafffc" },
          { range: [5, 6], color: "#bafff4" },
          { range: [6, 7], color: "#baffe9" },
          { range: [7, 8], color: "#baffde" },
          { range: [8, 9], color: "#baffc8" }
        ]
      }
    }
  ];

  Plotly.newPlot("gauge", data);
};
