import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("DuckDuckGo homepage structure", () => {
  test("exposes search, branding link, search modes and navigation", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchInput).toBeEditable();
    // Submit button only becomes visible once text is typed.
    await expect(homePage.submitButton).toBeAttached();

    await expect(homePage.logoLink).toHaveAttribute("href", "/about");

    await expect(
      homePage.searchModes.getByRole("radio", { name: "Search" }),
    ).toBeChecked();

    await expect(homePage.mainNavigation).toBeAttached();
    await expect(
      homePage.mainNavigation.getByRole("link", { name: "Settings" }),
    ).toHaveAttribute("href", "/settings");
  });
});
