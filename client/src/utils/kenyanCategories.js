export const KENYAN_CATEGORIES = [
  { value: 'gikomba', label: '🛍️ Gikomba Shopping', type: 'expense' },
  { value: 'matatu', label: '🚌 Matatu', type: 'expense' },
  { value: 'boda', label: '🏍️ Boda-boda', type: 'expense' },
  { value: 'nyama', label: '🍖 Nyama Choma', type: 'expense' },
  { value: 'mama_mboga', label: '🥬 Mama Mboga', type: 'expense' },
  { value: 'shule', label: '📚 Shule Fees', type: 'expense' },
  { value: 'rent', label: '🏠 Rent (Keja)', type: 'expense' },
  { value: 'mpesa', label: '📱 M-Pesa Services', type: 'expense' },
  { value: 'salon', label: '💇 Salon/Barber', type: 'expense' },
  { value: 'entertainment', label: '🎉 Sherehe', type: 'expense' },
  { value: 'salary', label: '💼 Salary/Mshahara', type: 'income' },
  { value: 'business', label: '🏪 Business Income', type: 'income' },
  { value: 'other', label: '📦 Other', type: 'both' },
];

export const formatKES = (amount) => {
  return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
};

export const getCategoryLabel = (value) => {
  return KENYAN_CATEGORIES.find(cat => cat.value === value)?.label || value;
};