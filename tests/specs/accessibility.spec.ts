import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HomePage } from "../pages/HomePage";
import baseline from "../a11y-baseline.json";

const GATED_IMPACTS = ["critical", "serious"];

test.describe("Accessibility (baseline-gated)", () => {
  test("homepage has no NEW critical/serious axe violations", async ({
    page,
  }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.searchInput).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    await testInfo.attach("axe-results.json", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });

    const known = new Set(baseline.knownViolations.map((v) => v.id));
    const gated = results.violations.filter(
      (v) => v.impact && GATED_IMPACTS.includes(v.impact),
    );
    const unexpected = gated
      .filter((v) => !known.has(v.id))
      .map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
      }));

    // Baselined rules that no longer fire are surfaced, not failed.
    const seen = new Set(gated.map((v) => v.id));
    for (const id of known) {
      if (!seen.has(id)) {
        testInfo.annotations.push({
          type: "stale-baseline",
          description: `${id} no longer reported; remove it from a11y-baseline.json`,
        });
      }
    }

    expect(unexpected, "new critical/serious a11y violations").toEqual([]);
  });
});
