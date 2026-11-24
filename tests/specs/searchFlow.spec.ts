import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { mockSearch } from "../support/searchMock";

test.describe("Search flow (results page mocked)", () => {
  test("submitting a query sends it to the results route and shows results", async ({
    page,
  }) => {
    const mock = await mockSearch(page);
    const homePage = new HomePage(page);
    const resultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await expect(homePage.searchInput).toBeVisible();

    const requestPromise = page.waitForRequest(
      (r) => r.isNavigationRequest() && new URL(r.url()).searchParams.has("q"),
    );
    await homePage.searchFor("Playwright Testing");
    const request = await requestPromise;

    expect(new URL(request.url()).searchParams.get("q")).toBe(
      "Playwright Testing",
    );
    expect(mock.queries).toEqual(["Playwright Testing"]);

    await resultsPage.expectResultsVisible();
    await expect(resultsPage.results).toHaveCount(3);
    const top = await resultsPage.topResults(1);
    expect(top[0].url).toBe("playwright.dev");
  });
});
