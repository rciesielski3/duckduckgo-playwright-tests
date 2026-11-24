import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchForm: Locator;
  readonly submitButton: Locator;
  readonly windowsDownloadLink: Locator;
  readonly logoLink: Locator;
  readonly searchModes: Locator;
  readonly mainNavigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchForm = page.getByRole("search", {
      name: /Search the web with DuckDuckGo/,
    });
    this.searchInput = page.getByRole("combobox", {
      name: /Search with DuckDuckGo/,
    });
    this.submitButton = this.searchForm.getByRole("button", {
      name: "Search",
      exact: true,
    });
    // Link text is marketing copy; the href contract is the stable handle.
    this.windowsDownloadLink = page
      .locator('a[href^="/windows?origin=funnel_home"]')
      .first();
    this.logoLink = page.getByRole("link", { name: "Learn about DuckDuckGo" });
    this.searchModes = page.getByRole("radiogroup", { name: "Search mode" });
    this.mainNavigation = page.getByRole("navigation", {
      name: "Main navigation",
    });
  }

  async goto() {
    await this.page.goto("/");
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }
}
