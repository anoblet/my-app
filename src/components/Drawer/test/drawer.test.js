import { html, fixture, expect } from "@open-wc/testing";

import "../Component";

describe("<drawer-component>", () => {
  it("drawer shows up", async () => {
    const el = await fixture("<drawer-component></drawer-component>");
    expect(!!el).to.equal(true);
  });
});
