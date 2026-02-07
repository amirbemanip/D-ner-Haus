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
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'chicken-doner',
    title: 'Hähnchen Döner',
    price: '€7.00',
    description: 'Marinierte Hähnchenbrust, dünn geschnitten, serviert mit pikanter Joghurtsauce und gemischtem Salat.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'veggie-doner',
    title: 'Vegetarischer Döner',
    price: '€6.50',
    description: 'Knusprige Falafel oder gegrilltes Gemüse mit Hummus und frischem Salat in unserem handwerklichen Brot.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop',
    category: 'doner'
  },
  {
    id: 'fries',
    title: 'Signature Pommes',
    price: '€4.50',
    description: 'Goldbraun knusprige Pommes, gewürzt mit unserer hauseigenen Gewürzmischung.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=800&auto=format&fit=crop',
    category: 'side'
  },
  {
    id: 'drinks',
    title: 'Kalte Getränke',
    price: '€3.00',
    description: 'Auswahl an erfrischenden Softdrinks, Ayran und Mineralwasser.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    category: 'drink'
  }
];
