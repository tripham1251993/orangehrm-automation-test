import { Page } from '@playwright/test'
import { HomePage } from '../pageObjects/homePage'

export const getCookies = async (page: Page) => {
  const homePage = new HomePage(page)
  await page.goto(
    process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com'
  )
  await homePage.waitForPageLoaded(30000)
  await homePage.login(
    process.env.USERNAME ?? 'Admin',
    process.env.PASSWORD ?? 'admin123'
  )
  await homePage.waitForLoginSuccess(30000)
  const cookies = await page.context().cookies()
  return cookies
}
