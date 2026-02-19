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
    title: 'Klassischer Döner',
    price: '€7.50',
    description: 'Traditioneller Kalbsdöner mit frischem Salat und unserer hausgemachten Knoblauchsauce in geröstetem Brot.',
    image: '/pics/classic.webp',
    category: 'doner'
  },
  {
    id: 'chicken-doner',
    title: 'Hähnchen Döner',
    price: '€7.00',
    description: 'Marinierte Hähnchenbrust, dünn geschnitten, serviert mit pikanter Joghurtsauce und gemischtem Salat.',
    image: '/pics/chicken.webp',
    category: 'doner'
  },
  {
    id: 'veggie-doner',
    title: 'Vegetarischer Döner',
    price: '€6.50',
    description: 'Knusprige Falafel oder gegrilltes Gemüse mit Hummus und frischem Salat in unserem handwerklichen Brot.',
    image: '/pics/veggie.webp',
    category: 'doner'
  },
  {
    id: 'fries',
    title: 'Signature Pommes',
    price: '€4.50',
    description: 'Goldbraun knusprige Pommes, gewürzt mit unserer hauseigenen Gewürzmischung.',
    image: '/pics/fries.webp',
    category: 'side'
  },
  {
    id: 'drinks',
    title: 'Kalte Getränke',
    price: '€3.00',
    description: 'Auswahl an erfrischenden Softdrinks, Ayran und Mineralwasser.',
    image: '/pics/drinks.webp',
    category: 'drink'
  }
];
