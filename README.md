This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.









## 🗃️ Database Tables


## 🧾 Sample Orders Table

| Order ID                            | Subtotal | Tax  | Discount | Total | Payment | Status    | Created At           |
|-------------------------------------|----------|------|----------|-------|---------|-----------|----------------------|
| 688cb69e7d131627ab7d2174            | 1        | 0.05 | 0        | 1.05  | card    | completed | 2025-08-01 12:44:14  |
| 688cb7c87d131627ab7d21d7            | 99       | 4.95 | 0        | 103.95| card    | completed | 2025-08-01 12:49:12  |
| 688dfb7c781d5b760c894e1b            | 22       | 1.1  | 0        | 23.1  | cash    | completed | 2025-08-02 11:50:20  |
| 688e0449d15bd7c0a891fb7e            | 22       | 1.1  | 0        | 23.1  | cash    | completed | 2025-08-02 12:27:53  |
| 688e078ac070503e24afecf3            | 891      | 44.55| 20       | 915.55| card    | completed | 2025-08-02 12:41:46  |



### 📦 Sample Products Table

| Product ID                        | Name   | Description     | Price | Cost | Barcode | Category | Stock | Min Stock | Created At           |
|----------------------------------|--------|------------------|-------|------|---------|----------|--------|------------|----------------------|
| 688cb7b07d131627ab7d21c4         | juisa  | ss               | 99    | 99   | 99      | fruit    | 49     | 99         | 2025-08-01 12:48:48  |
| 688cc481660a99a5c3637522         | banana | good             | 22    | 22   | 26      | fruit    | -2     | 2          | 2025-08-01 13:43:29  |
| 688e42fff4ce249976c21ae5         | cofee  | good             | 50    | 33   |         | drink    | 0      | 2          | 2025-08-02 16:55:27  |
| 688e4397f4ce249976c21b4b         | cap    | good             | 2     | 0.96 |         | kit      | 19     | 0          | 2025-08-02 16:57:59  |
| 6890f7887de02e27a1a91928         | Apple  | Sweats Apple     | 20    | 15   |         | Fruite   | 48     | 5          | 2025-08-04 18:10:16  |




### ⚙️ Sample Settings Table

| Setting ID                       | Singleton | Shop Name     | Tax Rate | Currency | Created At           | Updated At           |
|----------------------------------|-----------|----------------|----------|----------|----------------------|----------------------|
| 688f5e3def3f825f4a0dc9d0         | true      | My POS Store   | 6        | $        | 2025-08-03 13:03:57  | 2025-08-04 21:38:02  |




### 🚚 Sample Suppliers Table

| Supplier ID                     | Name              | Contact Person | Email                      | Phone        | Address                                 | Created At           | Updated At           |
|---------------------------------|-------------------|----------------|-----------------------------|--------------|------------------------------------------|----------------------|----------------------|
| 688e7748f4ce249976c228e4        | Mr. Waseem Khan   | Ali k          | mrwaseemk465@gmail.com     | 03471079465  | Rawalpindi, Pishawar Road, Line2        | 2025-08-02 20:38:32  | 2025-08-02 21:12:19  |




### 👤 Sample Users Table

| User ID                          | Name           | Email                    | Role               | Is Active | Created At           | Updated At           |
|----------------------------------|----------------|---------------------------|--------------------|-----------|----------------------|----------------------|
| 688aacd0182b1dc74b4643f6         | Waseem khan N  | waseemkhan771771@gmail.com | customer           | true      | 2025-07-30 23:37:52  | 2025-08-03 13:15:09  |
| 688cc34a9e70fc2a157c3558         | ali            | ali1@gmail.com             | admin              | true      |                      | 2025-08-04 21:37:59  |
| 688cc514660a99a5c363754b         | Waseem Akram   | waseem71@gmail.com         | cashier            | true      | 2025-08-01 13:45:56  | 2025-08-01 13:45:56  |
| 688eaa36d0732bb72fefb07f         | thomas shelby  | thomasshelby6@gmail.com    | cashier            | true      | 2025-08-03 00:15:50  | 2025-08-03 00:15:50  |
| 688eac63d0732bb72fefb08f         | Ali            | ali11@gmail.com            | manager            | true      | 2025-08-03 00:25:07  | 2025-08-03 00:38:39  |
| 688eafe267535eca6587ddde         | Faraz Kha      | faraz322@gmail.com         | inventory_manager  | true      | 2025-08-03 00:40:02  | 2025-08-04 21:50:24  |
| 688f640738d75b35e0d80a53         | jutt           | abdullah1@gmail.com        | customer           | true      | 2025-08-03 13:28:39  | 2025-08-03 14:23:31  |
| 688f78c4e08535e73af7d4b6         | abd            | abd1@gmail.com             | customer           | true      | 2025-08-03 14:57:08  | 2025-08-03 14:57:08  |
| 689131cf7de02e27a1a91e2f         | usama          | usama1@gmail.com           | customer           | true      | 2025-08-04 22:18:55  | 2025-08-04 22:18:55  |







### 📌 ERD Diagram:
[Click here to view](https://dbdiagram.io/d/689154a7dd90d17865696a84)








### 🔐 Admin Access

The project includes a secure admin panel with **full system access**.

**Admin Credentials:**
- **Email**: `ali1@gmail.com`
- **Password**: `654321`

**Admin Capabilities:**
- Full access to all products, categories, and inventory
- Manage all user accounts
- View and manage all orders
- Generate sales reports
- Access system settings and configurations

---

### 👤 User Access

The system allows users to register and log in independently.

**User Capabilities:**
- Register and log in with their own email and password
- Browse product catalog
- Place and track their own orders
- View personal profile and order history

> ⚠️ **Note:** Users only have access to their own data and limited functionalities. They **cannot** access admin-level features.







### 🚀 Project Demo

🔗 **Live Demo:** [Click here to view the project](https://your-demo-link.com)

> Replace the link above with your actual deployed project link (e.g., Vercel, Netlify, or any live server).
