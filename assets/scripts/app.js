var chartJSON = {
    "chart": {
        "caption": "Top Global Oil Reserves",
        "subCaption": "[2015-16]",
        "xAxisName": "MMbbl= One Million barrels",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "showValues": "0",
        "theme": "fusion"
    },
    "data": [{
        "label": "Venezuela",
        "value": "290"
    }, {
        "label": "Saudi",
        "value": "260"
    }, {
        "label": "Canada",
        "value": "180"
    }, {
        "label": "Iran",
        "value": "140"
    }, {
        "label": "Russia",
        "value": "115"
    }, {
        "label": "UAE",
        "value": "100"
    }, {
        "label": "US",
        "value": "30"
    }, {
        "label": "China",
        "value": "30"
    }]
};

var jsonCode = CodeMirror(document.getElementById("chartCode"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});

var step1command1 = CodeMirror(document.getElementById("c1"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript",
    viewportMargin: Infinity
});

step1command1.setValue("$ ember install ember-fusioncharts");

var step1command2 = CodeMirror(document.getElementById("c2"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript",
    viewportMargin: Infinity
});

step1command2.setValue("/* eslint-env node */\n'use strict';\n\nconst EmberApp = require('ember-cli/lib/broccoli/ember-app');\n\nmodule.exports = function(defaults) {\n    let app = new EmberApp(defaults, {\n    // Add options here\n    });\n\n    // Import fusioncharts library\n    app.import('node_modules/fusioncharts/fusioncharts.js');\n    app.import('node_modules/fusioncharts/fusioncharts.charts.js');\n    app.import('node_modules/fusioncharts/themes/fusioncharts.theme.fusion.js');\n\n    // Use `app.import` to add additional libraries to the generated\n    // output files.\n    //\n    // If you need to use different assets in different\n    // environments, specify an object as the first parameter. That\n    // object's keys should be the environment name and the values\n    // should be the asset to use in that environment.\n    //\n    // If the library that you are including contains AMD or ES6\n    // modules that you would like to import into your application\n    // please specify an object with the list of modules as keys\n    // along with the exports of each module as its value.\n\n    return app.toTree();\n};\n");

var step2command1 = CodeMirror(document.getElementById("c3"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript",
    viewportMargin: Infinity
});

step2command1.setValue("$ ember generate component chart-viewer");

var step2command2 = CodeMirror(document.getElementById("c4"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript",
    viewportMargin: Infinity
});

step2command2.setValue("import Component from '@ember/component';\n        \nconst myDataSource = {\n    \"chart\": {\n        \"caption\": \"Harry's SuperMart\",\n        \"subCaption\": \"Top 5 stores in last month by revenue\",\n        \"numberPrefix\": \"$\",\n        \"theme\": \"fint\"\n    },\n    \"data\": [\n        {\n            \"label\": \"Bakersfield Central\",\n            \"value\": \"880000\"\n        },\n        {\n            \"label\": \"Garden Groove harbour\",\n            \"value\": \"730000\"\n        },\n        {\n            \"label\": \"Los Angeles Topanga\",\n            \"value\": \"590000\"\n        },\n        {\n            \"label\": \"Compton-Rancho Dom\",\n            \"value\": \"520000\"\n        },\n        {\n            \"label\": \"Daly City Serramonte\",\n            \"value\": \"330000\"\n        }\n    ]\n};\n\nexport default Component.extend({\n    title: 'Ember FusionCharts Sample',\n    width: 600,\n    height: 400,\n    type: 'column2d',\n    dataFormat: 'json',\n    dataSource: myDataSource\n});");

var step3command1 = CodeMirror(document.getElementById("c5"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});
var c5Code = "<h1>{{ title }}</h1>\n    \n{{fusioncharts-xt\n    width=width\n    height=height\n    type=type\n    dataFormat=dataFormat\n    dataSource=dataSource}}";
step3command1.setValue(c5Code);

var modal = document.getElementById("myModal");
var btn = document.getElementById("mobileChart-selector");

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
modal.onclick = function(event) {
    // if (event.target == modal) {
        modal.style.display = "none";
    // }
}

// Samples
// Change the code snippet to default
jsonCode.setValue(sampleConfig["simple-chart"]["code"]);
document.getElementById("chart-container").src = "samples/simple-chart/";
document.getElementById("chart-container").classList.add("simple-chart");

var tabMode = {
  "code": "javascript",
  "html": "xml",
  "data": "javascript",
  "ember-build": "javascript"
};

Array.from(document.querySelectorAll(".nav-list .nav-item")).forEach(
  item => {
    item.onclick = function(event) {
      // Get the tab ID and Chart ID
      var tabID = (event.currentTarget.getAttribute("data-id"));

      // Get the active button
      var activeBtnID = document.querySelector(".code-nav-btns button.selected").getAttribute("data-id");

      if (tabID && activeBtnID) {
        // Switch the selected tab
        Array.from(document.querySelectorAll(".nav-list .nav-item.selected")).forEach(
          item => {
            item.classList.remove("selected");
          }
        );
        event.currentTarget.classList.add("selected");

        // Change the sample iframe src
        document.getElementById("chart-container").src = "samples/" + tabID + "/";
        document.getElementById("chart-container").className = '';
        document.getElementById("chart-container").classList.add(tabID);

        // Change the code snippet js/html/data
        jsonCode.setValue(sampleConfig[tabID][activeBtnID]);
        if (tabID === "fetch-data-from-xml-url" && activeBtnID === "data") {
          jsonCode.setOption("mode", "xml");
        } else {
          jsonCode.setOption("mode", tabMode[activeBtnID]);
        }

        // Set the mobile select active title
        document.querySelector('#mobileChart-selector .selector').innerText = event.currentTarget.innerText;
      }
    }
  }
)
Array.from(document.querySelectorAll(".code-nav-btns button")).forEach(
  item => {
    item.onclick = function(event) {
      // Get the button ID
      var btnID = (event.currentTarget.getAttribute("data-id"));

      // Get the active tab
      var activeTabID = document.querySelector(".nav-list .nav-item.selected").getAttribute("data-id");

      if (btnID && activeTabID) {
        // Switch the selected button
        document.querySelector(".code-nav-btns button.selected").classList.remove("selected");
        event.currentTarget.classList.add("selected");

        // Change the code snippet js/html/data
        jsonCode.setValue(sampleConfig[activeTabID][btnID]);
        if (activeTabID === "fetch-data-from-xml-url" && btnID === "data") {
          jsonCode.setOption("mode", "xml");
        } else {
          jsonCode.setOption("mode", tabMode[btnID]);
        }
      }
    }
  }
)
