import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility checks", () => {
  test("should not have basic a11y violations on homepage", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    console.log(
      "Accessibility Violations:",
      accessibilityScanResults.violations
    );
  });
});
