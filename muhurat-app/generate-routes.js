const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'new-arrivals', title: 'New Arrivals' },
  { path: 'best-sellers', title: 'Best Sellers' },
  { path: 'bridal', title: 'Bridal Collection' },
  { path: 'collections', title: 'All Collections' },
  { path: 'collections/antique', title: 'The Antique Edit' },
  { path: 'collections/everyday', title: 'Everyday Luxury' },
  { path: 'festive', title: 'Festive Radiance' },
  { path: 'contact', title: 'Contact Us' },
  { path: 'faq', title: 'Frequently Asked Questions' },
  { path: 'shipping', title: 'Shipping & Delivery' },
  { path: 'returns', title: 'Returns & Exchanges' },
  { path: 'journal', title: 'Journal' },
  { path: 'journal/care-guide', title: 'Jewelry Care Guide' },
  { path: 'about', title: 'Our Story' },
  { path: 'careers', title: 'Careers' },
  { path: 'privacy', title: 'Privacy Policy' },
  { path: 'terms', title: 'Terms of Service' },
  { path: 'search', title: 'Search' },
  { path: 'wishlist', title: 'Wishlist' },
  { path: 'account', title: 'Account Dashboard' },
  { path: 'login', title: 'Sign In' },
  { path: 'register', title: 'Create Account' },
  { path: 'forgot-password', title: 'Reset Password' },
  { path: 'cart', title: 'Shopping Cart' },
  { path: 'checkout', title: 'Checkout' },
  { path: 'orders', title: 'Order History' },
  { path: 'order-tracking', title: 'Track Order' }
];

const basePath = path.join(__dirname, 'src', 'app');

routes.forEach(route => {
  const dirPath = path.join(basePath, ...route.path.split('/'));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    const content = `import LuxuryComingSoon from "@/components/ui/LuxuryComingSoon";

export default function ${route.title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return <LuxuryComingSoon title="${route.title}" />;
}
`;
    fs.writeFileSync(filePath, content);
    console.log("Created " + filePath);
  } else {
    console.log("Skipped " + filePath + " (already exists)");
  }
});
