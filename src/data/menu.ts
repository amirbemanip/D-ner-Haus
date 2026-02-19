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
    image: '/pics/1.webp',
    category: 'doner'
  },
  {
    id: 'chicken-doner',
    title: 'Hähnchen Döner',
    price: '€7.00',
    description: 'Marinierte Hähnchenbrust, dünn geschnitten, serviert mit pikanter Joghurtsauce und gemischtem Salat.',
    image: '/pics/2.webp',
    category: 'doner'
  },
  {
    id: 'doner-plate',
    title: 'Döner Teller',
    price: '€12.50',
    description: 'Saftiges Dönerfleisch serviert mit knusprigen Pommes, frischem Salat und hausgemachten Saucen.',
    image: '/pics/3.webp',
    category: 'doner'
  },
  {
    id: 'veggie-doner',
    title: 'Vegetarischer Döner',
    price: '€6.50',
    description: 'Knusprige Falafel oder gegrilltes Gemüse mit Hummus und frischem Salat in unserem handwerklichen Brot.',
    image: '/pics/4.webp',
    category: 'doner'
  },
  {
    id: 'doner-sandwich',
    title: 'Döner Sandwich',
    price: '€8.00',
    description: 'Extra Fleisch und viel Sauce in einem besonders knusprig getoasteten Sandwich-Brot.',
    image: '/pics/5.webp',
    category: 'doner'
  },
  {
    id: 'salad-mix',
    title: 'Frischer Salat Mix',
    price: '€5.50',
    description: 'Täglich frisch zubereitete Salate mit feinstem Dressing nach Hausart.',
    image: '/pics/6.webp',
    category: 'side'
  },
  {
    id: 'drinks-ayran',
    title: 'Frischer Ayran',
    price: '€2.50',
    description: 'Die perfekte Erfrischung zu jedem Döner.',
    image: '/pics/drinks.jpg',
    category: 'drink'
  }
];
