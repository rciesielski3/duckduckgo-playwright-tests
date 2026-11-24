import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { mockSearch } from "../support/searchMock";

test.describe("Negative search input (results page mocked)", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("blank input is never submitted", async ({ page }) => {
    const mock = await mockSearch(page);

    await homePage.searchFor("");
    await homePage.searchFor("   ");
    await expect(page).toHaveURL(/^https:\/\/duckduckgo\.com\/?$/);

    // Positive control: the hook is alive, and anything submitted earlier
    // would have been recorded before this entry.
    await homePage.searchFor("control");
    await expect(page).toHaveURL(/[?&]q=control/);
    expect(mock.queries).toEqual(["control"]);
  });

  for (const query of [")(*&^%$#@!", "$#@!   ", "<script>alert(1)</script>"]) {
    test(`special characters are sent as-is and handled: ${JSON.stringify(query)}`, async ({
      page,
    }) => {
      const mock = await mockSearch(page, "no-results");
      const resultsPage = new SearchResultsPage(page);

      await homePage.searchFor(query);

      await expect(page.getByTestId("no-results")).toBeVisible();
      await resultsPage.expectNoResults();
      expect(mock.queries).toHaveLength(1);
      // Round-trips through URL encoding unchanged (modulo trailing blanks).
      expect(mock.queries[0].trim()).toBe(query.trim());
    });
  }
});
