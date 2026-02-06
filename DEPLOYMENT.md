# 🚀 Dönerhaus Nürnberg Deployment Guide | راهنمای راه‌اندازی و انتشار

This guide explains how to deploy your premium Dönerhaus website to **Render.com** so you can show it to anyone, anywhere.

این راهنما توضیح می‌دهد که چگونه وب‌سایت حرفه‌ای «دونرهاوس» را در سایت **Render.com** منتشر کنید تا بتوانید آن را به هر کسی و در هر کجای دنیا نشان دهید.

---

## 📋 Prerequisites | پیش‌نیازها

1.  **GitHub Account:** You need to upload your code to a GitHub repository.
    *(باید کد خود را در یک مخزن گیت‌هاب آپلود کنید)*
2.  **Render Account:** Sign up at [render.com](https://render.com).
    *(در سایت Render.com ثبت‌نام کنید)*

---

## 🛠 Step 1: Database Setup | مرحله ۱: تنظیم پایگاه داده

Render uses an ephemeral filesystem, so your local SQLite database (`dev.db`) will reset every time the server restarts. To keep your customer data safe, we recommend using **Render PostgreSQL**.

سایت Render فایل‌های معمولی (مثل SQLite) را بعد از هر بار ری‌استارت پاک می‌کند. برای حفظ اطلاعات مشتریان، از دیتابیس رایگان PostgreSQL خود Render استفاده کنید.

1.  In your Render Dashboard, click **New** > **PostgreSQL**.
2.  Name it `donerhaus-db`.
3.  Copy the **Internal Database URL**.

---

## ⚙️ Step 2: Prepare the Code | مرحله ۲: آماده‌سازی کد

The code is already pre-configured to use **PostgreSQL** for professional production environments like Render. You don't need to change the schema manually.

کد از قبل برای استفاده از **PostgreSQL** در محیط‌های حرفه‌ای (مانند رندر) تنظیم شده است. نیازی به تغییر دستی اسکیما نیست.

1.  Commit and Push the latest changes to your GitHub repository.

---

## 🌐 Step 3: Deploy to Render | مرحله ۳: انتشار در رندر

1.  In Render Dashboard, click **New** > **Web Service**.
2.  Connect your GitHub repository.
3.  **Settings:**
    *   **Name:** `donerhaus-nuernberg`
    *   **Runtime:** `Node`
    *   **Build Command:** `npm install && npx prisma generate && npx prisma db push && npm run build`
    *   **Start Command:** `npm start`
4.  **Environment Variables:**
    Click **Advanced** > **Add Environment Variable**:
    *   `DATABASE_URL`: *(Paste your PostgreSQL URL here)*
    *   `ADMIN_PASSWORD`: *(Choose a secure password for Admin/Seller access)*
    *   `NEXT_PUBLIC_BASE_URL`: `https://your-site-name.onrender.com`

---

## 🎨 Branding & Assets | برندینگ و تصاویر

Ensure your logo and images are in the `public/` folder. The app is already configured to use the high-end charcoal (#0F0F0F) and orange (#E67E22) theme.

مطمئن شوید لوگو و تصاویر شما در پوشه `public` قرار دارند. برنامه از قبل برای تم مشکی زغالی و نارنجی لوکس تنظیم شده است.

---

## 👨‍💼 Admin & Seller Access | دسترسی مدیریت و فروشنده

Once live, your site will be at `https://your-site.onrender.com`.
بعد از آنلاین شدن، آدرس‌های شما به این صورت خواهد بود:

*   **Main Site:** `/` (Customer registration)
*   **Connect Page:** `/connect` (Linktree-style page for Club & Google Review)
*   **Seller POS:** `/seller` (For the cashier)
*   **Admin Panel:** `/admin` (Management analytics)

---

### 💡 Pro Tip | نکته حرفه‌ای
If you want a custom domain (like `donerhaus-nbg.de`), you can easily add it in the **Settings** tab of your Render Web Service.

اگر دامنه اختصاصی دارید، می‌توانید آن را در بخش Settings رندر اضافه کنید.
