import { test, expect } from "@playwright/test";

test.describe("Route interception for Download Browser link", () => {
  test("should mock redirection to Playwright.dev when clicking Download Browser", async ({
    page,
  }) => {
    await page.route("**/windows?origin=funnel_home___hero", (route) => {
      route.fulfill({
        status: 302,
        headers: {
          location: "https://playwright.dev/",
        },
      });
    });

    await page.goto("/");

    const downloadLink = page.getByRole("link", { name: "Download Browser" });
    await expect(downloadLink).toBeVisible();

    await downloadLink.click();
    await expect(page).toHaveURL(/playwright\.dev/);
    console.log("Redirected to https://playwright.dev/");
  });
});
