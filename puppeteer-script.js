/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();
  await page.authenticate({
    username: 'test123@codeit.com',
    password: 'test12345',
  });
  await page.goto(url);
};
