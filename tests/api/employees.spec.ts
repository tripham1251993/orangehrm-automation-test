import { test, expect, APIRequestContext } from '@playwright/test'
import { getCookies } from '../../util/cookieHelper'

let apiContext: APIRequestContext
const BASE_API_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php'

const empsEndpoint = 'api/v2/pim/employees'
const empsDetailEndpoint = 'api/v2/pim/employees/{empNumber}/personal-details'

test.beforeAll(async ({ playwright, browser }) => {
  const authContext = await browser.newContext()
  const authPage = await authContext.newPage()
  const cookies = await getCookies(authPage)
  await authPage.close()
  await authContext.close()

  apiContext = await playwright.request.newContext({
    baseURL: BASE_API_URL,
    extraHTTPHeaders: {
      Accept: 'application/json, text/plain, */*',
      Cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; '),
    },
  })
})

test.afterAll(async () => {
  await apiContext.dispose()
})

test.describe(
  '[GET] api/v2/pim/employees',
  { tag: ['@api', '@api-regression', '@api-employees'] },
  () => {
    test('Should get all employees', async () => {
      const response = await apiContext.get(empsEndpoint)
      expect(response.status()).toBe(200)

      const responseBody = await response.json()
      expect(responseBody).toHaveProperty('data')
      expect(responseBody).toHaveProperty('meta')
      expect(responseBody).toHaveProperty('rels')

      expect(responseBody.data).toBeInstanceOf(Array)
      expect(responseBody.meta).toBeInstanceOf(Object)
      expect(responseBody.rels).toBeInstanceOf(Array)

      const firstEmployee = responseBody.data[0]
      const properties = [
        'empNumber',
        'lastName',
        'firstName',
        'middleName',
        'employeeId',
        'terminationId',
      ]
      properties.forEach((property) => {
        expect(firstEmployee).toHaveProperty(property)
      })
    })
  }
)

test.describe(
  '[GET] api/v2/pim/employees/{empNumber}/personal-details',
  { tag: ['@api', '@api-regression', '@api-employees-detail'] },
  () => {
    test('Should get employee personal details', async () => {
      const empsResponse = await apiContext.get(empsEndpoint)
      expect(empsResponse.status()).toBe(200)
      const empsResponseBody = await empsResponse.json()
      const employees = empsResponseBody.data
      const randomIndex = Math.floor(Math.random() * employees.length)
      const empNumber = employees[randomIndex].empNumber

      const response = await apiContext.get(
        empsDetailEndpoint.replace('{empNumber}', empNumber.toString())
      )
      expect(response.status()).toBe(200)

      const responseBody = await response.json()
      expect(responseBody).toHaveProperty('data')
      expect(responseBody).toHaveProperty('meta')
      expect(responseBody).toHaveProperty('rels')

      expect(responseBody.data).toBeInstanceOf(Object)
      expect(responseBody.meta).toBeInstanceOf(Array)
      expect(responseBody.rels).toBeInstanceOf(Array)

      const employee = responseBody.data
      const properties = [
        'empNumber',
        'lastName',
        'firstName',
        'middleName',
        'employeeId',
        'otherId',
        'drivingLicenseNo',
        'drivingLicenseExpiredDate',
        'gender',
        'maritalStatus',
        'birthday',
        'terminationId',
        'nationality',
      ]

      properties.forEach((property) => {
        expect(employee).toHaveProperty(property)
      })
    })
  }
)
