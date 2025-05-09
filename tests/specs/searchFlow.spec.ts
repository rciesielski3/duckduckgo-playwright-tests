import { test, expect } from "@playwright/test";
import { DuckDuckGoHomePage } from "../pages/DuckDuckGoHomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

test.describe("DuckDuckGo Search Flow", () => {
  test("should load DuckDuckGo and return results for a query", async ({
    page,
  }) => {
    const homePage = new DuckDuckGoHomePage(page);
    const resultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await expect(homePage.searchInput).toBeVisible();

    await homePage.searchFor("Playwright Testing");

    await resultsPage.expectResultsVisible();
  });
});
