import { test, expect } from "@playwright/test";

test.describe("DuckDuckGo Homepage UI", () => {
  test("should display base homepage elements", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("combobox", { name: /Search with DuckDuckGo/i })
    ).toBeVisible();

    await expect(
      page.getByLabel("Learn about DuckDuckGo").nth(1)
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Switch to DuckDuckGo. It’s private and free!",
      })
    ).toBeVisible();

    await expect(page.locator("text=Set As Default Search")).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Download Browser" })
    ).toBeVisible();

    await expect(
      page.locator("text=Trusted by tens of millions").first()
    ).toBeVisible();

    await expect(
      page.getByTestId("hero").getByText("Learn more")
    ).toBeVisible();
  });
});
