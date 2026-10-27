export const emiBanks = [
  {
    id: "city-bank",
    name: "City Bank (American Express & Visa)",
    tenures: [3, 6, 9, 12, 18, 24, 36],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "City Bank Amex"
  },
  {
    id: "scb",
    name: "Standard Chartered Bank (SCB)",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Standard Chartered"
  },
  {
    id: "ebl",
    name: "Eastern Bank Limited (EBL)",
    tenures: [3, 6, 9, 12, 18, 24, 36],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "EBL"
  },
  {
    id: "brac",
    name: "BRAC Bank Limited",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "BRAC Bank"
  },
  {
    id: "dbbl",
    name: "Dutch-Bangla Bank (DBBL Nexus & Visa)",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "DBBL"
  },
  {
    id: "mtb",
    name: "Mutual Trust Bank (MTB)",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "MTB"
  },
  {
    id: "ucb",
    name: "United Commercial Bank (UCB)",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "UCB"
  },
  {
    id: "dhaka-bank",
    name: "Dhaka Bank Limited",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Dhaka Bank"
  },
  {
    id: "prime-bank",
    name: "Prime Bank Limited",
    tenures: [3, 6, 9, 12, 18],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Prime Bank"
  },
  {
    id: "bank-asia",
    name: "Bank Asia Limited",
    tenures: [3, 6, 9, 12, 18],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Bank Asia"
  },
  {
    id: "midland-bank",
    name: "Midland Bank",
    tenures: [3, 6, 9, 12],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Midland Bank"
  },
  {
    id: "southeast-bank",
    name: "Southeast Bank Limited",
    tenures: [3, 6, 9, 12, 18, 24],
    zeroInterest: true,
    minAmount: 10000,
    logoText: "Southeast Bank"
  }
];

export function calculateEMI(price, months = 12) {
  if (!price || months <= 0) return 0;
  return Math.ceil(price / months);
}

export function formatBDT(amount) {
  if (amount === undefined || amount === null) return "৳0";
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}
