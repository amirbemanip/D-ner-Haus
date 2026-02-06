from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        # Define devices to emulate
        devices = [
            {"name": "Desktop", "viewport": {"width": 1280, "height": 800}},
            {"name": "iPhone 12", "viewport": {"width": 390, "height": 844}, "is_mobile": True}
        ]

        browser = p.chromium.launch(headless=True)

        for device in devices:
            print(f"Testing with {device['name']}...")
            context = browser.new_context(
                viewport=device['viewport'],
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1" if device.get("is_mobile") else None
            )
            page = context.new_page()
            prefix = "mobile_" if device.get("is_mobile") else ""

            # 1. Home Page
            print(f"  Capturing Home Page ({device['name']})...")
            page.goto("http://localhost:3500")
            time.sleep(5)
            page.screenshot(path=f"{prefix}home_page.png", full_page=True)

            # 2. Registration
            print(f"  Capturing Registration ({device['name']})...")
            page.goto("http://localhost:3500/club/register")
            time.sleep(2)
            page.fill('input[placeholder="E.g. Max Mustermann"]', f'User {device["name"]}')
            # Use unique phone to avoid "already registered" error which might change UI
            phone = f"+49151{int(time.time() * 1000) % 10000000}"
            page.fill('input[placeholder="+49 123 4567890"]', phone)
            page.click('button:has-text("Register Now")')
            time.sleep(3)
            page.screenshot(path=f"{prefix}registration_success.png", full_page=True)
            try:
                # The code is in a <p> inside the success card
                code = page.inner_text('.select-all')
                print(f"    Generated code: {code}")
            except Exception as e:
                print(f"    Failed to get code: {e}")
                code = "123456"

            # 3. Seller POS
            print(f"  Capturing Seller POS ({device['name']})...")
            page.goto("http://localhost:3500/seller")
            time.sleep(2)
            page.fill('input[placeholder="6-Digit Code or Phone"]', code)
            page.click('button:has-text("Search Member")')
            time.sleep(2)
            page.screenshot(path=f"{prefix}seller_pos.png", full_page=True)

            # 4. Admin Dashboard
            print(f"  Capturing Admin Dashboard ({device['name']})...")
            page.goto("http://localhost:3500/admin")
            time.sleep(2)
            page.screenshot(path=f"{prefix}admin_dashboard.png", full_page=True)

            context.close()

        browser.close()

if __name__ == "__main__":
    run()
