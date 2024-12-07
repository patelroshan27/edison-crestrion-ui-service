import { PowerOff } from 'lucide-react';
import { type ColorIntensity } from './Configs';

export const commonRoomColorStates: ColorIntensity[] = [
  {
    name: 'Red',
    color: 'bg-red-500',
    scene: '51',
  },
  {
    name: 'Orange',
    color: 'bg-orange-500',
    scene: '52',
  },
  { name: 'Amber', color: 'bg-amber-500', scene: '53' },
  {
    name: 'Yellow',
    color: 'bg-yellow-300',
    scene: '54',
  },
  {
    name: 'Lime',
    color: 'bg-lime-300',
    scene: '55',
  },
  {
    name: 'Green',
    color: 'bg-green-500',
    scene: '56',
  },
  {
    name: 'Emerald',
    color: 'bg-emerald-300',
    scene: '57',
  },
  {
    name: 'Teal',
    color: 'bg-teal-600',
    scene: '58',
  },
  {
    name: 'Cyan',
    color: 'bg-cyan-400',
    scene: '59',
  },
  {
    name: 'Skyblue',
    color: 'bg-sky-600',
    scene: '60',
  },
  {
    name: 'Blue',
    color: 'bg-blue-700',
    scene: '61',
  },
  {
    name: 'Indigo',
    color: 'bg-indigo-400',
    scene: '62',
  },
  { name: 'Violet', color: 'bg-violet-800', scene: '63' },
  {
    name: 'Purple',
    color: 'bg-purple-500',
    scene: '64',
  },
  {
    name: 'Fuchsia',
    color: 'bg-fuchsia-300',
    scene: '65',
  },
  {
    name: 'Pink',
    color: 'bg-pink-500',
    scene: '66',
  },
  {
    name: 'Rose',
    color: 'bg-rose-300',
    scene: '67',
  },
  {
    name: 'White',
    color:
      'bg-white dark:bg-neutral-200 border-neutral-300 dark:border-neutral-600',
    scene: '68',
  },
  {
    name: 'Gray',
    color:
      'bg-neutral-200 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-500',
    scene: '69',
  },
  {
    name: 'Off',
    color:
      'bg-neutral-100 dark:bg-neutral-800 border-neutral-500 dark:border-neutral-400',
    icon: PowerOff,
    scene: '00',
  },
];

export const sabhaHallColorStates: ColorIntensity[] = [
  {
    name: 'Red',
    color: 'bg-red-500',
    scene: '51',
  },
  {
    name: 'Orange',
    color: 'bg-orange-500',
    scene: '52',
  },
  { name: 'Amber', color: 'bg-amber-500', scene: '53' },
  {
    name: 'Yellow',
    color: 'bg-yellow-300',
    scene: '54',
  },
  {
    name: 'Emerald',
    color: 'bg-emerald-300',
    scene: '55',
  },
  {
    name: 'Teal',
    color: 'bg-teal-600',
    scene: '56',
  },
  {
    name: 'Cyan',
    color: 'bg-cyan-400',
    scene: '57',
  },
  {
    name: 'Skyblue',
    color: 'bg-sky-600',
    scene: '58',
  },
  {
    name: 'Blue',
    color: 'bg-blue-700',
    scene: '59',
  },
  { name: 'Violet', color: 'bg-violet-800', scene: '60' },
  {
    name: 'Purple',
    color: 'bg-purple-500',
    scene: '61',
  },
  {
    name: 'Pink',
    color: 'bg-pink-500',
    scene: '62',
  },
  {
    name: 'Rose',
    color: 'bg-rose-300',
    scene: '63',
  },
  {
    name: 'White',
    color: 'bg-white',
    scene: '64',
  },
  {
    name: 'Cyan Light',
    color: 'bg-gradient-to-r from-cyan-500 via-cyan-100 to-white-500',
    scene: '65',
  },
  {
    name: 'Cyan Dark',
    color: 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-white-500',
    scene: '66',
  },
  {
    name: 'Purple Light',
    color: 'bg-gradient-to-r from-purple-500 via-purple-100 to-white-500',
    scene: '67',
  },
  {
    name: 'Purple Dark',
    color: 'bg-gradient-to-r from-purple-500 via-purple-400 to-white-500',
    scene: '68',
  },
  {
    name: 'Amber Light',
    color: 'bg-gradient-to-r from-amber-500 via-amber-100 to-white-500',
    scene: '69',
  },
  {
    name: 'Amber Dark',
    color: 'bg-gradient-to-r from-amber-500 via-amber-400 to-white-500',
    scene: '70',
  },
  {
    name: 'Pink Light',
    color: 'bg-gradient-to-r from-pink-500 via-pink-100 to-white-500',
    scene: '71',
  },
  {
    name: 'Pink Dark',
    color: 'bg-gradient-to-r from-pink-500 via-pink-400 to-white-500',
    scene: '72',
  },
  {
    name: 'Teal Light',
    color: 'bg-gradient-to-r from-teal-500 via-teal-100 to-white-500',
    scene: '73',
  },
  {
    name: 'Teal Dark',
    color: 'bg-gradient-to-r from-teal-500 via-teal-400 to-white-500',
    scene: '74',
  },
  {
    name: 'Orange Light',
    color: 'bg-gradient-to-r from-orange-500 via-orange-100 to-white-500',
    scene: '75',
  },
  {
    name: 'Orange Dark',
    color: 'bg-gradient-to-r from-orange-500 via-orange-400 to-white-500',
    scene: '76',
  },
  {
    name: 'Orange Green',
    color: 'bg-gradient-to-r from-orange-500 via-orange-400 to-green-500',
    scene: '77',
  },
  {
    name: 'Off',
    color:
      'bg-neutral-100 dark:bg-neutral-800 border-neutral-500 dark:border-neutral-400',
    icon: PowerOff,
    scene: '00',
  },
];

export const mandirColorStates: ColorIntensity[] = [
  {
    name: 'Sky Blue/Light Sky Blue',
    color: 'bg-sky-600',
    scene: '01',
  },
  {
    name: 'Purple/Light Purple',
    color: 'bg-purple-500',
    scene: '02',
  },
  {
    name: 'Orange/Light Orange',
    color: 'bg-orange-500',
    scene: '03',
  },
  {
    name: 'Yellow/Yellow Green',
    color: 'bg-yellow-300',
    scene: '04',
  },
  {
    name: 'Pink/Light Pink',
    color: 'bg-pink-500',
    scene: '05',
  },
  {
    name: 'Gold/Light Gold',
    color: 'bg-amber-500',
    scene: '06',
  },
  {
    name: 'Rose Pink',
    color: 'bg-rose-300',
    scene: '07',
  },
  {
    name: 'Orange',
    color: 'bg-orange-500',
    scene: '08',
  },
  {
    name: 'Sky Blue',
    color: 'bg-sky-600',
    scene: '09',
  },
  {
    name: 'Purple',
    color: 'bg-purple-500',
    scene: '10',
  },
  {
    name: 'Mint',
    color: 'bg-emerald-300',
    scene: '11',
  },
  {
    name: 'Gold',
    color: 'bg-amber-500',
    scene: '12',
  },
  {
    name: 'Purple/SKy Blue/Light Sky Blue',
    color: 'bg-gradient-to-r from-purple-500 via-sky-600 to-white-500',
    scene: '13',
  },
  {
    name: 'Mint/Purple/Light Purple',
    color: 'bg-gradient-to-r from-mint-500 via-purple-500 to-white-500',
    scene: '14',
  },
  {
    name: 'Pink/Orange/Light Orange',
    color: 'bg-gradient-to-r from-pink-500 via-orange-500 to-white-500',
    scene: '15',
  },
  {
    name: 'Sky Blue/Yellow/Light Yellow',
    color: 'bg-gradient-to-r from-sky-600 via-yellow-300 to-white-500',
    scene: '16',
  },
  {
    name: 'Rose Pink/Blue/Light Blue',
    color: 'bg-gradient-to-r from-rose-300 via-blue-700 to-white-500',
    scene: '17',
  },
  {
    name: 'Yellow/Pink/Light Pink',
    color: 'bg-gradient-to-r from-yellow-300 via-pink-500 to-white-500',
    scene: '18',
  },
  {
    name: 'Light Sky Blue/Sky Blue',
    color: 'bg-gradient-to-r from-sky-600 via-sky-500 to-white-500',
    scene: '19',
  },
  {
    name: 'Light Purple/Purple',
    color: 'bg-gradient-to-r from-purple-500 via-purple-400 to-white-500',
    scene: '20',
  },
  {
    name: 'Light Orange/Orange',
    color: 'bg-gradient-to-r from-orange-500 via-orange-400 to-white-500',
    scene: '21',
  },
  {
    name: 'Light Yellow/Yellow',
    color: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-white-500',
    scene: '22',
  },
  {
    name: 'Light Pink/Pink',
    color: 'bg-gradient-to-r from-pink-500 via-pink-400 to-white-500',
    scene: '23',
  },
  {
    name: 'Light Gold/Gold',
    color: 'bg-gradient-to-r from-amber-500 via-amber-400 to-white-500',
    scene: '24',
  },
  {
    name: 'Purple/SKy Blue/Light Sky Blue',
    color: 'bg-gradient-to-r from-purple-500 via-sky-600 to-white-500',
    scene: '25',
  },
  {
    name: 'Mint/Purple/Light Purple',
    color: 'bg-gradient-to-r from-mint-500 via-purple-500 to-white-500',
    scene: '26',
  },
  {
    name: 'Pink/Orange/Light Orange',
    color: 'bg-gradient-to-r from-pink-500 via-orange-500 to-white-500',
    scene: '27',
  },
  {
    name: 'Sky Blue/Yellow/Light Yellow',
    color: 'bg-gradient-to-r from-sky-600 via-yellow-300 to-white-500',
    scene: '28',
  },
  {
    name: 'Rose Pink/Blue/Light Blue',
    color: 'bg-gradient-to-r from-rose-300 via-blue-700 to-white-500',
    scene: '29',
  },
  {
    name: 'Yellow/Pink/Light Pink',
    color: 'bg-gradient-to-r from-yellow-300 via-pink-500 to-white-500',
    scene: '30',
  },
  {
    name: 'Off',
    color:
    'bg-neutral-100 dark:bg-neutral-800 border-neutral-500 dark:border-neutral-400',
    icon: PowerOff,
    scene: '00',
  }
];

