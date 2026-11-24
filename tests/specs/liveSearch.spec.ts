import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

// Non-blocking smoke against the real results page. DuckDuckGo serves an
// HTTP 418 bot-protection page to many automated/datacenter clients; when that
// happens the test is SKIPPED with a visible reason (never silently passed,
// never "fixed" with stealth/UA spoofing).
test.describe("Live search smoke", () => {
  test(
    "real search returns results (skips when bot-blocked)",
    { tag: "@live" },
    async ({ page }) => {
      test.setTimeout(30_000);
      let blockedStatus: number | undefined;
      page.on("response", (r) => {
        if (r.status() === 418) blockedStatus = 418;
      });

      const homePage = new HomePage(page);
      const resultsPage = new SearchResultsPage(page);

      await homePage.goto();
      await homePage.searchFor("Playwright Testing");

      await page.waitForURL(
        (url) => url.pathname !== "/" || url.searchParams.has("q"),
      );
      const blocked = () =>
        blockedStatus === 418 || page.url().includes("home-error/418");

      // Wait for either real results or the block page.
      await expect
        .poll(
          async () => blocked() || (await resultsPage.results.count()) > 0,
          {
            message: "results or bot block",
          },
        )
        .toBe(true);

      if (blocked()) {
        test.skip(
          true,
          "DuckDuckGo bot protection (HTTP 418, /static-pages/home-error/418.html) blocked this client; live results not verifiable from here.",
        );
      }

      await resultsPage.expectResultsVisible();
      expect(await resultsPage.results.count()).toBeGreaterThan(0);
    },
  );
});
