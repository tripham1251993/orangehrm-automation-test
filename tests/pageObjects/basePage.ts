import { Locator, Page } from '@playwright/test'

export abstract class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  setPage(page: Page) {
    this.page = page
  }

  abstract waitForPageLoaded(timeout: number): Promise<void>

  async waitForElementEditable(selector: Locator, timeout: number = 5000) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const elementHandle = await selector.elementHandle()
      if (elementHandle) {
        const isEditable = await elementHandle.isEditable()
        if (isEditable) {
          return elementHandle
        }
      }
      await this.page.waitForTimeout(100)
    }
    throw new Error(`Element "${selector}" not editable after ${timeout}ms`)
  }
}
