# DuckDuckGo UI Testing Project – Playwright + TypeScript

This project demonstrates a complete UI automation testing approach using [Playwright](https://playwright.dev/) in TypeScript, applied to the DuckDuckGo homepage and search functionality. It integrates best practices for structure, clarity, and flexibility.

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

# Run a single file
npx playwright test tests/specs/negativeInput.spec.ts

# Open HTML report
npx playwright show-report
```

---

## 📌 Summary

This project demonstrates a modern, clean, and maintainable approach to UI testing with:

- Reliable selectors
- Structured design (POM)
- Realistic and negative test scenarios
- Practical reporting and logs
- Expandability for future test needs (e.g., mobile viewport, localization)

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
