import { Page, Request } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

export type FixtureName = "results" | "no-results";

const fixtureDir = path.join(__dirname, "..", "fixtures");

/**
 * A search submission is a top-level navigation to "/" carrying a `q` param.
 * (The homepage form is a plain GET form, so no XHR is involved.)
 */
const isSearchUrl = (url: URL) =>
  url.pathname === "/" && url.searchParams.has("q");

export interface SearchMock {
  /** Every `q` value the page tried to submit, in order. */
  queries: string[];
}

/**
 * Intercepts search submissions and answers them with a local HTML fixture,
 * so tests exercise OUR flow (what is submitted) without depending on the
 * live results page (which blocks automated browsers).
 * The fixtures encode assumptions about the results-page contract
 * (data-testid="result" etc.); they are not a copy of the real page.
 */
export async function mockSearch(
  page: Page,
  fixture: FixtureName = "results",
): Promise<SearchMock> {
  const body = readFileSync(path.join(fixtureDir, `${fixture}.html`), "utf8");
  const mock: SearchMock = { queries: [] };

  await page.route(
    (url) => isSearchUrl(url),
    async (route) => {
      const request: Request = route.request();
      mock.queries.push(new URL(request.url()).searchParams.get("q") ?? "");
      await route.fulfill({
        status: 200,
        contentType: "text/html; charset=utf-8",
        body,
      });
    },
  );

  return mock;
}
