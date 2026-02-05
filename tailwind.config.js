/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... আপনার কনটেন্ট পাথ
  ],
  theme: {
    extend: { // <--- অবশ্যই extend ব্যবহার করুন
      fontFamily: { 
          // Tailwind এর ডিফল্ট সেটিংসের সাথে নতুন ফন্ট যোগ করা হলো
          roboto: ['var(--font-roboto)', 'sans'],
          inter: ['var(--font-inter)', 'sans'],
      },
    },
  },
  plugins: [],
}