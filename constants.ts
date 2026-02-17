
import { GatewayData } from './types';

export const STRIPE_COUNTRIES = [
  "United States", "Canada", "Brazil", "Mexico", "Austria", "Belgium", 
  "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", 
  "Finland", "France", "Germany", "Gibraltar", "Greece", "Hungary", 
  "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", 
  "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom", 
  "Australia", "Hong Kong", "Japan", "Malaysia", "New Zealand", "Singapore", "Thailand"
];

export const GATEWAYS: Record<string, GatewayData> = {
  paypal: {
    id: 'paypal',
    name: "PayPal MultiParty",
    description: "Global reach with massive presence in Africa and Latin America.",
    countries: ["Algeria", "Angola", "Argentina", "Bahamas", "Bahrain", "Bolivia", "Chile", "Colombia", "Costa Rica", "Egypt", "Ethiopia", "India", "Indonesia", "Israel", "Jordan", "Kenya", "Kuwait", "Morocco", "Nigeria", "Oman", "Panama", "Peru", "Philippines", "Qatar", "Saudi Arabia", "South Africa", "South Korea", "Taiwan", "United Arab Emirates", "Vietnam"],
    color: '#2ecc71',
    strategicValue: "Adds ~200 countries. Essential for platforms scaling to emerging markets."
  },
  razorpay: {
    id: 'razorpay',
    name: "RazorPay Route",
    description: "The gold standard for the Indian marketplace ecosystem.",
    countries: ["India", "Malaysia"],
    color: '#2ecc71',
    strategicValue: "Directly addresses Stripe Connect's limited support in India's massive marketplace economy."
  },
  checkout: {
    id: 'checkout',
    name: "Checkout.com",
    description: "Deep specialization in Middle East (MENA) and North Africa.",
    countries: ["United Arab Emirates", "Saudi Arabia", "Egypt", "Pakistan", "Morocco", "Tunisia", "Kuwait", "Oman", "Bahrain", "Jordan"],
    color: '#2ecc71',
    strategicValue: "Critical for expansion into high-growth digital economies in the Gulf and MENA region."
  },
  adyen: {
    id: 'adyen',
    name: "Adyen for Platforms",
    description: "Enterprise-grade redundancy and identical geographic focus.",
    countries: ["United States", "Canada", "Europe", "Australia", "Singapore", "Hong Kong"],
    color: '#2ecc71',
    strategicValue: "High overlap with Stripe. Best for enterprise redundancy and failover processing."
  }
};

export const COLORS = {
  stripe: '#635bff',
  expansion: '#2ecc71',
  none: '#dcdde1'
};
