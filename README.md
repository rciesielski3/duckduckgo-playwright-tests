# DuckDuckGo UI Testing – Playwright + TypeScript

[![Playwright](https://github.com/rciesielski3/duckduckgo-playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/rciesielski3/duckduckgo-playwright-tests/actions/workflows/playwright.yml)

A small portfolio project showing UI test **patterns** with [Playwright](https://playwright.dev/) and TypeScript against the DuckDuckGo homepage: Page Object Model, role-based locators, network mocking, request assertions, negative inputs and a baseline-gated accessibility check.

The third-party site is not ours, so the suite is split by what each test can reliably prove.

## Deterministic vs live

| Suite | Command | What it does | Blocking |
| --- | --- | --- | --- |
| Deterministic | `npm test` | Loads the real homepage, but the **results page and download funnel are mocked** with `page.route`. Asserts the structure of the homepage and what the page submits (the `q` request parameter). | Yes |
| Live (`@live`) | `npm run test:live` | One real search against duckduckgo.com. | No |

- **Search flow / negative input** (`searchFlow`, `negativeInput`): results come from fixtures in `tests/fixtures/`. They encode assumptions about the results-page contract (`data-testid="result"`), not a copy of the real page. Blank input is checked to never be submitted, with a positive control.
- **Download link** (`downloadRedirect`): asserts the stable `href` contract (`/windows?origin=funnel_home...`) and mocks the funnel response instead of following the real one.
- **Accessibility** (`accessibility`): runs axe on the homepage and fails on any **new** critical/serious rule that is not listed in `tests/a11y-baseline.json` (known third-party issues, each with a reason). The raw axe results are attached to the report. Stale baseline entries are shown as annotations.
- **Live smoke** (`liveSearch`): asserts at least one real result.

### Known limitation: bot protection

DuckDuckGo answers many automated clients, especially from datacenter IPs, with an HTTP 418 bot page on the results page. The `@live` test detects this and is reported as **skipped with a visible reason** instead of failing or passing silently. No stealth or user-agent spoofing is used. A skipped live run therefore means "could not verify from this network", not "search works".

## Run locally

```bash
npm ci
npx playwright install chromium

npm test              # deterministic suite (excludes @live)
npm run test:live     # live smoke, skips on bot block
npm run typecheck     # tsc --noEmit
npm run report        # open the last HTML report
```

Other useful flags: `npx playwright test --headed`, `--ui`, or a single file such as `tests/specs/negativeInput.spec.ts`.

## CI

`.github/workflows/playwright.yml` runs **on demand only** (`workflow_dispatch`) to save resources. Open Actions > Playwright > Run workflow and choose `deterministic` or `live`, or use the CLI:

```bash
gh workflow run playwright.yml -f suite=deterministic
gh workflow run playwright.yml -f suite=live
```

It runs on `ubuntu-24.04` with Node 22 and Chromium only, with read-only permissions and a 15 minute timeout.

### Opening the report and traces

Each run uploads an artifact (`playwright-deterministic` or `playwright-live`) containing `playwright-report/` and `test-results/`. Download and unzip it, then:

```bash
npx playwright show-report path/to/playwright-report
npx playwright show-trace path/to/test-results/<test-folder>/trace.zip   # recorded on first retry
```

## Project structure

```
tests/
├── pages/                  # HomePage, SearchResultsPage (POM)
├── support/searchMock.ts   # page.route helper that records submitted queries
├── fixtures/               # mocked results HTML
├── a11y-baseline.json      # accepted third-party axe rules
└── specs/
    ├── accessibility.spec.ts
    ├── downloadRedirect.spec.ts
    ├── homepageUi.spec.ts
    ├── liveSearch.spec.ts   # @live
    ├── negativeInput.spec.ts
    └── searchFlow.spec.ts
```

## Author

[Rafał Ciesielski](https://github.com/rciesielski3) · [LinkedIn](https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/) · [Portfolio](https://rciesielski3.github.io/portfolio/)

MIT License. Please credit if you reuse it.
