import { Page, Locator, expect } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.getByTestId("result");
  }

  async expectResultsVisible() {
    await expect(this.results).toBeVisible();
  }
}
