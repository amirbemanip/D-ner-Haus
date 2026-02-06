export interface MenuItem {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  category: 'doner' | 'side' | 'drink';
}

export const menuItems: MenuItem[] = [
  {
    id: 'classic-doner',
    title: 'Classic Döner',
    price: '€7.50',
    description: 'Traditional veal döner with fresh salad and our signature garlic sauce in toasted bread.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'chicken-doner',
    title: 'Chicken Döner',
    price: '€7.00',
    description: 'Marinated chicken breast, thinly sliced and served with zesty yogurt sauce and mixed greens.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'veggie-doner',
    title: 'Veggie Döner',
    price: '€6.50',
    description: 'Crispy falafel or grilled vegetables with hummus and fresh salad in our artisanal bread.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'fries',
    title: 'Signature Fries',
    price: '€4.50',
    description: 'Golden crispy fries seasoned with our house blend of spices.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=800&auto=format&fit=crop',
    category: 'side'
  },
  {
    id: 'drinks',
    title: 'Cold Drinks',
    price: '€3.00',
    description: 'Selection of refreshing soft drinks, Ayran, and mineral water.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    category: 'drink'
  }
];
