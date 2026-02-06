from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # 1. Home Page
        print("Capturing Home Page...")
        page.goto("http://localhost:3000")
        time.sleep(5)
        page.screenshot(path="home_page.png")

        # 2. Registration Success
        print("Capturing Registration Success...")
        page.goto("http://localhost:3000/club/register")
        page.fill('input[placeholder="E.g. Max Mustermann"]', 'Meryem Demir')
        page.fill('input[placeholder="+49 123 4567890"]', '+4915122233344')
        page.click('button:has-text("Register & Generate Code")')
        time.sleep(3)
        page.screenshot(path="registration_success.png")
        code = page.inner_text('.select-all')

        # 3. Seller POS
        print("Capturing Seller POS...")
        page.goto("http://localhost:3000/seller")
        page.fill('input[placeholder="Enter Membership Code (e.g. 123456)"]', code)
        page.click('button:has-text("Search Member")')
        time.sleep(2)
        page.screenshot(path="seller_pos.png")

        # 4. Admin Dashboard
        print("Capturing Admin Dashboard...")
        page.goto("http://localhost:3000/admin")
        time.sleep(2)
        page.screenshot(path="admin_dashboard.png")

        browser.close()

if __name__ == "__main__":
    run()
