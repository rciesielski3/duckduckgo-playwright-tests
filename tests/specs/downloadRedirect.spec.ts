import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Windows download link", () => {
  test("hero download link targets the /windows funnel", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const heroLink = homePage.windowsDownloadLink;
    await expect(heroLink).toBeVisible();
    await expect(heroLink).toHaveAttribute(
      "href",
      /^\/windows\?origin=funnel_home/,
    );
  });

  test("clicking the Windows download link requests /windows (funnel mocked)", async ({
    page,
  }) => {
    // Mock the third-party funnel with a local stub so the test never
    // depends on where DuckDuckGo currently sends downloads.
    await page.route(
      (url) => url.pathname === "/windows",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<h1>mock download page</h1>",
        }),
    );

    const homePage = new HomePage(page);
    await homePage.goto();

    const requestPromise = page.waitForRequest(
      (r) => new URL(r.url()).pathname === "/windows",
    );
    await homePage.windowsDownloadLink.click();
    const request = await requestPromise;

    expect(new URL(request.url()).searchParams.get("origin")).toMatch(
      /^funnel_home/,
    );
    await expect(page.getByRole("heading")).toHaveText("mock download page");
  });
});
