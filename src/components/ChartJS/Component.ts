import { LitElement, customElement, property } from "lit-element";

import Chart from "chart.js";
import GlobalStyle from "../../GlobalStyle";
import { ResizeObserver } from "resize-observer";
import Style from "./Style";
import Template from "./Template";
import { populationByState } from "../CitySDK/CitySDK";

@customElement("chart-js")
export class ChartJS extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property() public type = "bar";
  public data: any;
  public chart: Chart;

  public firstUpdated() {
    this.createChart();
    this.observeResize();
  }

  public async getData() {
    const _data = await populationByState("2017");
    const labels = [];
    const data = [];
    _data.map((state: any) => {
      labels.push(state.name);
      data.push(state.population);
    });
    return { labels, data };
  }

  public async createChart() {
    const { backgroundColor, data, labels } = this.data;
    const chart: any = this.shadowRoot.querySelector("#myChart");
    const ctx = chart.getContext("2d");
    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels,
        datasets: [
          {
            label: "Population",
            data,
            backgroundColor
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        legend: {
          display: false
        }
      }
    });
  }

  public observeResize() {
    const resizeObserver = new ResizeObserver(() => {
      if (this.chart) this.chart.resize();
    });
    resizeObserver.observe(this.shadowRoot.querySelector("#container"));
  }
}
