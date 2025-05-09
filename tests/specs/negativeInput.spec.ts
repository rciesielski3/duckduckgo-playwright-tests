import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

test.describe("Negative Search Input Scenarios (POM)", () => {
  let homePage: HomePage;
  let resultsPage: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    resultsPage = new SearchResultsPage(page);
    await homePage.goto();
  });

  test("should not submit empty input", async ({ page }) => {
    await homePage.searchFor("");
    await page.waitForTimeout(500);

    await expect(page).toHaveURL("https://duckduckgo.com/");
    await resultsPage.expectNoResults();
  });

  test("should not trigger search on whitespace-only input", async ({
    page,
  }) => {
    await homePage.searchFor(" ");
    await page.waitForTimeout(500);

    await expect(page).toHaveURL("https://duckduckgo.com/");
    await resultsPage.expectNoResults();
  });

  test("should handle invalid characters gracefully", async () => {
    await homePage.searchFor(")(*&^%$#@!");

    const count = await resultsPage.getResultCount();
    console.log(`Results found: ${count}`);
    expect(count).toBeGreaterThanOrEqual(0);
    await resultsPage.logTopResults();
  });

  test("should handle symbols and spaces", async () => {
    await homePage.searchFor("$#@!   ");

    const count = await resultsPage.getResultCount();
    console.log(`Results found: ${count}`);
    expect(count).toBeGreaterThanOrEqual(0);
    await resultsPage.logTopResults();
  });
});
