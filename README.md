
#### [Demos and Documentation](https://fusioncharts.github.io/ember-fusioncharts/)

# Ember-Fusioncharts

A lightweight EmberJS component which provides bindings for FusionCharts JavaScript Charting Library. It easily adds rich and interactive charts to any ambitious Ember applications.

## Installation

To install `ember-fusioncharts` to any existing ember application, run:

For Modern CLI versions

```bash
$ ember install ember-fusioncharts
```

For Earlier CLI versions (and addon developers)

```bash
$ npm install ember-fusioncharts --save-dev
$ ember g ember-fusioncharts
```

Then import `fusioncharts` library to your `ember-cli-build.js` build file:

```javascript
/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Import fusioncharts library
  app.import('bower_components/fusioncharts/fusioncharts.js');
  app.import('bower_components/fusioncharts/fusioncharts.charts.js');
  app.import('bower_components/fusioncharts/themes/fusioncharts.theme.fint.js');
  app.import('bower_components/fusioncharts/themes/fusioncharts.theme.ocean.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};

```

## Getting Started

After installing `angular4-fusioncharts`, import it in your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

import { AppComponent } from './app.component';
import { FusionChartsModule } from 'angular4-fusioncharts';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use this component in your Angular application:

In your Angular `AppComponent`:

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    id = 'chart1';
    width = 600;
    height = 400;
    type = 'column2d';
    dataFormat = 'json';
    dataSource;
    title = 'Angular4 FusionCharts Sample';

    constructor() {
        this.dataSource = {
            "chart": {
                "caption": "Harry's SuperMart",
                "subCaption": "Top 5 stores in last month by revenue",
                "numberprefix": "$",
                "theme": "fint"
            },
            "data": [
                {
                    "label": "Bakersfield Central",
                    "value": "880000"
                },
                {
                    "label": "Garden Groove harbour",
                    "value": "730000"
                },
                {
                    "label": "Los Angeles Topanga",
                    "value": "590000"
                },
                {
                    "label": "Compton-Rancho Dom",
                    "value": "520000"
                },
                {
                    "label": "Daly City Serramonte",
                    "value": "330000"
                }
            ]
        }
    }
}
```

Now, You can use `<fusioncharts>` component in your `app.component.html` template:

```html
<h1>
  {{title}}
</h1>
<fusioncharts
    [id]="id"
    [width]="width"
    [height]="height"
    [type]="type"
    [dataFormat]="dataFormat"
    [dataSource]="dataSource"
></fusioncharts>
```

## Test

```sh
$ npm run test

$ npm run test:unit

$ npm run test:e2e
```

## Contributing

* Clone the repository.
* Install dependencies
* Run `npm start` to start the dev server.
* Open `http://localhost:4200/` in your browser.

```sh
$ git clone https://github.com/fusioncharts/angular4-fusioncharts.git
$ cd angular4-fusioncharts
$ npm i
$ npm start
```

To generate all *.js, *.d.ts and *.js.map files:

```sh
$ npm run transpile
```

To lint all *.ts files:

```sh
$ npm run lint
```

To build, run:

```sh
$ npm run build
```

### [Demos and Documentation](https://fusioncharts.github.io/angular4-fusioncharts/) 