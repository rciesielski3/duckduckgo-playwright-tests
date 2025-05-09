import { Page, Locator, expect } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.getByTestId("result");
  }

  async expectResultsVisible() {
    await expect(this.results.first()).toBeVisible({ timeout: 5000 });
  }

  async getResultCount(): Promise<number> {
    return await this.results.count();
  }

  async logTopResults(count: number = 3) {
    const items = await this.results.elementHandles();

    for (let i = 0; i < Math.min(count, items.length); i++) {
      const item = items[i];

      const urlElement = await item.$('[data-testid="result-extras-url-link"]');
      const snippetElement = await item.$('[data-testid="snippet"]');

      const urlText = urlElement ? await urlElement.innerText() : "(no url)";
      const snippetText = snippetElement
        ? await snippetElement.innerText()
        : "(no snippet)";

      console.log(`${i + 1}. "${urlText}", snippet: "${snippetText}"`);
    }
  }
}
