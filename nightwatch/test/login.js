describe('mgalerie login', function() {

    const loginButton = "a.navbar-txt:nth-child(2)";
    const email = 'test@test';
    const password = 'test';
    const profilButton = "a.navbar-txt:nth-child(1)";
    const logoutButton = "a.navbar-txt:nth-child(2)";

    it('mgalerie login', function(browser) {
        browser
            .navigateTo('http://localhost:5173/')
            .waitForElementVisible('body', 500)
            .assert.titleContains('M.GALERIE')
            .waitForElementVisible( loginButton, 1000)
            .click(loginButton)
            .pause(1000)

        browser
            .assert.urlContains('/login')
            .waitForElementVisible('input[name="email"]', 1000)
            .clearValue('input[name="email"]')
            .setValue('input[name="email"]', email)
            .setValue('input[name="password"]', password)
            .pause(1000)
            .click('button[type=submit]')
            .pause(5000)

        browser
            .assert.urlContains('/profil')
            .waitForElementVisible(profilButton, 1000)
            .waitForElementVisible(logoutButton,1000)
            .click(logoutButton)
            .pause(5000)

            .url('http://localhost:5173/profil')
            .pause(1000)
    })

    browser.end()
});