import { Locator, Page } from '@playwright/test'

export class HomePage {
  private page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly forgotPasswordLink: Locator
  readonly logo: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('input[name="username"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.loginButton = page.locator('.orangehrm-login-button')
    this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header')
    this.logo = page.locator('.orangehrm-login-branding img')
  }

  setPage(page: Page) {
    this.page = page
  }

  async navigateTo() {
    await this.page.goto('/')
    await this.waitForPageLoaded()
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 })
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async waitForPageLoaded(timeout: number = 10000) {
    await this.page.waitForLoadState('networkidle', { timeout })
    await this.page.waitForSelector('.orangehrm-login-branding img', {
      state: 'visible',
      timeout,
    })
  }

  async waitForLoginSuccess(timeout: number = 10000) {
    await this.page.waitForURL('**/dashboard/index', { timeout })
  }
}
