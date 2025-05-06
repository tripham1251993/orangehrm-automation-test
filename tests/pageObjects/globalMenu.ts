import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './basePage'

export class GlobalMenu extends BasePage {
  readonly searchInput: Locator
  readonly adminMenu: Locator
  readonly pimMenu: Locator
  readonly leaveMenu: Locator
  readonly timeMenu: Locator
  readonly recruitmentMenu: Locator
  readonly myInfoMenu: Locator
  readonly performanceMenu: Locator
  readonly dashboardMenu: Locator
  readonly maintenanceMenu: Locator
  readonly claimMenu: Locator
  readonly buzzMenu: Locator

  readonly menuMapping: object

  constructor(page: Page) {
    super(page)
    this.searchInput = page.locator('input[placeholder="Search"]')
    this.adminMenu = page.locator(
      'a[href="/web/index.php/admin/viewAdminModule"]'
    )
    this.pimMenu = page.locator('a[href="/web/index.php/pim/viewPimModule"]')
    this.leaveMenu = page.locator(
      'a[href="/web/index.php/leave/viewLeaveModule"]'
    )
    this.timeMenu = page.locator('a[href="/web/index.php/time/viewTimeModule"]')
    this.recruitmentMenu = page.locator(
      'a[href="/web/index.php/recruitment/viewRecruitmentModule"]'
    )
    this.myInfoMenu = page.locator('a[href="/web/index.php/pim/viewMyDetails"]')
    this.performanceMenu = page.locator(
      'a[href="/web/index.php/performance/viewPerformanceModule"]'
    )
    this.dashboardMenu = page.locator(
      'a[href="/web/index.php/dashboard/index"]'
    )
    this.maintenanceMenu = page.locator(
      'a[href="/web/index.php/maintenance/viewMaintenanceModule"]'
    )
    this.claimMenu = page.locator(
      'a[href="/web/index.php/claim/viewClaimModule"]'
    )
    this.buzzMenu = page.locator('a[href="/web/index.php/buzz/viewBuzz"]')

    this.menuMapping = {
      Admin: this.adminMenu,
      PIM: this.pimMenu,
      Leave: this.leaveMenu,
      Time: this.timeMenu,
      Recruitment: this.recruitmentMenu,
      'My Info': this.myInfoMenu,
      Performance: this.performanceMenu,
      Dashboard: this.dashboardMenu,
      Maintenance: this.maintenanceMenu,
      Claim: this.claimMenu,
      Buzz: this.buzzMenu,
    }
  }

  getMenuByName(name: string): Locator {
    const menu = this.menuMapping[name]
    if (!menu) {
      throw new Error(`Menu with name "${name}" not found`)
    }
    return menu
  }

  async waitForPageLoaded(timeout: number = 10000) {
    await this.page.waitForLoadState('networkidle', { timeout })
    await this.dashboardMenu.waitFor({ state: 'visible', timeout })
  }

  async search(query: string) {
    await this.searchInput.fill(query, { force: true })
    await this.searchInput.press('Enter')
    await this.page.waitForTimeout(300)
  }

  async clickAdminMenu() {
    await this.adminMenu.click()
  }

  async clickPimMenu() {
    await this.pimMenu.click()
  }

  async clickLeaveMenu() {
    await this.leaveMenu.click()
  }

  async clickTimeMenu() {
    await this.timeMenu.click()
  }

  async clickRecruitmentMenu() {
    await this.recruitmentMenu.click()
  }

  async clickMyInfoMenu() {
    await this.myInfoMenu.click()
  }

  async clickPerformanceMenu() {
    await this.performanceMenu.click()
  }

  async clickDashboardMenu() {
    await this.dashboardMenu.click()
  }

  async clickMaintenanceMenu() {
    await this.maintenanceMenu.click()
  }

  async clickClaimMenu() {
    await this.claimMenu.click()
  }

  async clickBuzzMenu() {
    await this.buzzMenu.click()
  }

  async verifyMenuIsVisible(menu: Locator) {
    await expect(menu).toBeVisible()
  }

  async verifyMenuIsNotVisible(menu: Locator) {
    await expect(menu).not.toBeVisible()
  }

  async verifyMenuIsEnabled(menu: Locator) {
    await expect(menu).toBeEnabled()
  }

  async verifyMenuIsDisabled(menu: Locator) {
    await expect(menu).toBeDisabled()
  }

  async verifyMenuText(menu: Locator, expectedText: string) {
    const actualText = await menu.innerText()
    expect(actualText).toBe(expectedText)
  }

  async verifyMenuUrl(menu: Locator, expectedUrl: string) {
    const actualUrl = await menu.getAttribute('href')
    expect(actualUrl).toBe(expectedUrl)
  }

  async verifyMenuIsActive(menu: Locator) {
    const className = await menu.getAttribute('class')
    expect(className).toContain('active')
  }
}
