import { Page, Locator, expect } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.getByTestId("result");
  }

  async expectResultsVisible() {
    await expect(this.results.first()).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.results).toHaveCount(0);
  }

  /** Reads (url, snippet) of the first results; used for assertions, not logging. */
  async topResults(count = 3): Promise<{ url: string; snippet: string }[]> {
    const n = Math.min(count, await this.results.count());
    const out: { url: string; snippet: string }[] = [];
    for (let i = 0; i < n; i++) {
      const item = this.results.nth(i);
      out.push({
        url: await item.getByTestId("result-extras-url-link").innerText(),
        snippet: await item.getByTestId("snippet").innerText(),
      });
    }
    return out;
  }
}
