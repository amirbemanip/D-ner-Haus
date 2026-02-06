import requests

BASE_URL = "http://localhost:3500"

def test_security_flow():
    # 1. Try to access /admin without login
    print("Accessing /admin without login...")
    resp = requests.get(f"{BASE_URL}/admin", allow_redirects=False)
    assert resp.status_code == 307
    print(f"Redirected as expected to: {resp.headers.get('location')}")

    # 2. Login with correct password
    print("Logging in...")
    login_resp = requests.post(f"{BASE_URL}/api/auth/login", json={"password": "donerhaus2026"})
    assert login_resp.status_code == 200
    cookies = login_resp.cookies
    print("Login successful. Cookie received.")

    # 3. Access /admin with cookie
    print("Accessing /admin with cookie...")
    admin_resp = requests.get(f"{BASE_URL}/admin", cookies=cookies)
    assert admin_resp.status_code == 200
    print("Access granted to /admin!")

    # 4. Login with WRONG password
    print("Trying wrong password...")
    wrong_resp = requests.post(f"{BASE_URL}/api/auth/login", json={"password": "wrongpassword"})
    assert wrong_resp.status_code == 401
    print("Wrong password rejected.")

    print("\nSecurity verification PASSED!")

if __name__ == "__main__":
    test_security_flow()
