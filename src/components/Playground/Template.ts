import "../Chart/ChartComponent";

import { populationByCountry, populationByState } from "../CitySDK/CitySDK";

import { html } from "lit-element";
import { until } from "lit-html/directives/until";
import { store } from "../../Store";

export default function() {
  const state = store.getState();
  const theme = state.app.settings.theme;
  return html`
    <grid-component columns="1">
      <card-component>
        <h3 slot="title">US Population</h3>
        ${until(
          populationByCountry().then((result: any) =>
            result[0]["B01001_001E"].toLocaleString()
          )
        )}
      </card-component>
      <card-component>
        <h3 slot="title">Population by state (bar)</h3>
        ${until(
          populationByState().then((states: any) => {
            const mapArray = states.map(function(obj) {
              return Object.keys(obj)
                .sort()
                .map(function(key) {
                  return obj[key];
                });
            });
            const newArray = [["State", "Population"], ...mapArray];
            return html`
              <chart-component
                .data=${newArray}
                .options=${{
                  backgroundColor: theme.backgroundColor,
                  colors: [theme.primaryColor, theme.linkColor],
                  legend: {
                    textStyle: { color: theme.textColor }
                  }
                }}
              ></chart-component>
            `;
          }),
          html`
            Loading...
          `
        )}
      </card-component>
      <card-component>
        <h3 slot="title">Population by state (table)</h3>
        <grid-component columns="2">
          ${until(
            populationByState().then(
              (states: any) =>
                html`
                  ${states.map(
                    (state: any) =>
                      html`
                        <span>${state.name}</span
                        ><span style="text-align: center;"
                          >${state.population.toLocaleString()}</span
                        >
                      `
                  )}
                `
            ),
            html`
              Loading...
            `
          )}
        </grid-component>
      </card-component>
    </grid-component>
  `;
}
