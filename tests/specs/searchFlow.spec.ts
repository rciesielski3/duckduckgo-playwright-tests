import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

test.describe("DuckDuckGo Search Flow", () => {
  test("should load DuckDuckGo and return results for a query", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const resultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await expect(homePage.searchInput).toBeVisible();

    await homePage.searchFor("Playwright Testing");
    await page.waitForTimeout(500);
    await resultsPage.expectResultsVisible();

    const resultCount = await resultsPage.getResultCount();
    console.log(`🔎 Results found: ${resultCount}`);

    await resultsPage.logTopResults();
    expect(resultCount).toBeGreaterThan(0);
  });
});
