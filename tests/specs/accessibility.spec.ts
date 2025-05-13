import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HomePage } from "../pages/HomePage";

test.describe("Accessibility checks", () => {
  test("should not have basic a11y violations on homepage", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    console.log(
      "Accessibility Violations:",
      accessibilityScanResults.violations
    );
  });
});
