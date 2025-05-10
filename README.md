# DuckDuckGo UI Testing Project – Playwright + TypeScript

This project demonstrates a complete UI automation testing approach using [Playwright](https://playwright.dev/) in TypeScript, applied to the DuckDuckGo homepage and search functionality. It integrates best practices for structure, clarity, and flexibility.

---

## 🧠 Key Testing Principles & Focus Areas

Testing UI isn't just about checking what appears — it's about verifying **user experience**, **app behavior**, **accessibility**, and **system resilience**.

The following areas are emphasized:

### 1. **Test What Matters Most**

- Critical user journeys (e.g., search, navigation)
- Primary UI elements and CTAs
- Input validation and edge case handling

### 2. **Separation of Concerns**

- Logic for UI actions is abstracted using the Page Object Model (POM)
- Tests describe _what_ to verify, not _how_ it's done

### 3. **Robust Locator Strategy**

- `getByRole`, `getByTestId`, and ARIA labels are prioritized for stability and accessibility awareness
- Avoid brittle CSS selectors

### 4. **Accessibility Awareness**

- Built-in a11y validations ensure the interface is perceivable, operable, and understandable
- Reports highlight WCAG rule violations

### 5. **Negative Testing**

- Inputs that are empty, malformed, or unusual shouldn't break the flow
- Validates how the system fails — gracefully, without errors or inconsistent UI state

### 6. **Mocking External Behavior**

- When testing redirections or integrations, simulate responses to isolate front-end logic
- Example: redirection is mocked to avoid relying on third-party servers

---

## ✅ Test Coverage Overview

### 🔹 Static UI Tests (`homepageUi.spec.ts`)

- Checks visibility of search box, logo, headings, CTA links
- Ensures critical homepage elements are not missing

### 🔹 Functional Search Flow (`searchFlow.spec.ts`)

- Enters query in search box
- Submits with `Enter`
- Verifies that the results page loads and content appears

### 🔹 Accessibility Validation (`accessibility.spec.ts`)

- Uses `axe-core` integration to run WCAG-level checks
- Reports any contrast, role, or structure violations

### 🔹 Negative Input Handling (`negativeInput.spec.ts`)

- Handles invalid characters, empty fields, and whitespace input
- Ensures app remains on homepage, or shows no results — without breaking

### 🔹 Route Interception Test (`downloadRedirect.spec.ts`)

- Mocks the browser download button redirect
- Ensures expected behavior regardless of external URL response

---

## 💡 Best Practices Reflected

- **Descriptive test names**: Each test clearly states its intent
- **Reusable components**: Via `HomePage` and `SearchResultsPage`
- **Assert minimal UI assumptions**: Check only what must be visible
- **Scalable test setup**: Easy to expand with new flows or conditions
- **Avoid hardcoded waits**: Use locators and timeouts smartly

---

## 📁 Project Structure

```
tests/
├── pages/
│   ├── HomePage.ts              # Homepage interactions
│   └── SearchResultsPage.ts     # Result list validation
│
├── specs/
│   ├── accessibility.spec.ts
│   ├── downloadRedirect.spec.ts
│   ├── homepageUi.spec.ts
│   ├── negativeInput.spec.ts
│   └── searchFlow.spec.ts
```

---

## 🚀 Run Tests

```bash
# Run all
npx playwright test

# Debug with browser visible
npx playwright test --headed

# Interactive test runner (UI mode)
npx playwright test --ui

# Run a single file
npx playwright test tests/specs/negativeInput.spec.ts

# Open HTML report
npx playwright show-report
```

---

## 📌 Summary

This test suite balances structure and flexibility. Tests cover content, behavior, accessibility, and external interaction, ensuring the application delivers a working and user-friendly experience. Structure and naming conventions are aligned to make the test suite easy to expand, adapt, or reuse.

It's not just about green checks — it's about confidence in product quality.

---

## 🧑‍💻 Author

Created with 💡 by [**Rafał Ciesielski**](https://github.com/rciesielski3)

- [LinkedIn](https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/)
- [GitHub](https://github.com/rciesielski3)
- [Portfolio](https://rciesielski3.github.io/portfolio/)

---

## 📄 License

MIT License  
Please credit if you reuse it in your own work 🙌

[☕ Buy Me a Coffee](https://buycoffee.to/adateo)
