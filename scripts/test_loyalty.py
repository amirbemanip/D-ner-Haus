import requests
import random

BASE_URL = "http://localhost:3500"

def test_loyalty_flow():
    # 1. Register a new user
    phone = f"+4915{random.randint(1000000, 9999999)}"
    name = "Loyalty Test User"

    print(f"Registering user with phone: {phone}")
    reg_response = requests.post(f"{BASE_URL}/api/register", json={
        "name": name,
        "phone": phone
    })

    if reg_response.status_code != 200:
        print(f"Registration failed: {reg_response.text}")
        return

    user = reg_response.json()
    code = user['membershipCode']
    print(f"User registered. Code: {code}")

    # 2. Check initial state
    print("Checking initial state...")
    user_data = requests.get(f"{BASE_URL}/api/customer/{code}").json()
    assert user_data['coupons'] == 0
    assert user_data['receivedFirstGift'] == False
    print("Initial state OK (0 coupons, gift pending)")

    # 3. Add 10 purchases
    print("Adding 10 purchases...")
    for i in range(10):
        resp = requests.patch(f"{BASE_URL}/api/customer/{code}", json={"action": "add_purchase"})
        assert resp.status_code == 200

    user_data = requests.get(f"{BASE_URL}/api/customer/{code}").json()
    assert user_data['coupons'] == 10
    print(f"Current coupons: {user_data['coupons']}")

    # 4. Try to redeem free Döner
    print("Redeeming free Döner...")
    resp = requests.patch(f"{BASE_URL}/api/customer/{code}", json={"action": "redeem_doner"})
    assert resp.status_code == 200

    user_data = requests.get(f"{BASE_URL}/api/customer/{code}").json()
    assert user_data['coupons'] == 0
    print("Döner redeemed successfully. Coupons reset to 0.")

    # 5. Try to redeem free Fries (First gift)
    print("Redeeming free fries...")
    resp = requests.patch(f"{BASE_URL}/api/customer/{code}", json={"action": "redeem_fries"})
    assert resp.status_code == 200

    user_data = requests.get(f"{BASE_URL}/api/customer/{code}").json()
    assert user_data['receivedFirstGift'] == True
    print("Fries redeemed successfully.")

    # 6. Try to redeem fries again (should fail)
    print("Trying to redeem fries again (should fail)...")
    resp = requests.patch(f"{BASE_URL}/api/customer/{code}", json={"action": "redeem_fries"})
    assert resp.status_code == 400
    print(f"Fries re-redemption failed as expected: {resp.json()['error']}")

    print("\nLoyalty logic test PASSED!")

if __name__ == "__main__":
    test_loyalty_flow()
