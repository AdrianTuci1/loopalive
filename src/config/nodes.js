
import BehringerTd3 from '../components/nodes/BehringerTd3';
import StrymonBlueSky from '../components/nodes/StrymonBlueSky';
import BossDd8 from '../components/nodes/BossDd8';
import BehringerXenyx802 from '../components/nodes/BehringerXenyx802';
import { BehringerRd6 } from '../components/nodes/BehringerRd6';
import ElektronDigitakt from '@/components/nodes/ElektronDigitakt/components/ElektronDigitakt/ElektronDigitakt';

export const nodeTypes = {
  BehringerRd6,
  ElektronDigitakt,
  BehringerTd3,
  StrymonBlueSky,
  BossDd8,
  BehringerXenyx802,
  custom: null, // This will be set dynamically in Node.jsx
};

export const nodeMenuItems = [
  { id: 'BehringerRd6', label: 'Behringer Rd6' },
  { id: 'ElektronDigitakt', label: 'Elektron Digitakt' },
  { id: 'BehringerTd3', label: 'Behringer TD-3' },
  { id: 'StrymonBlueSky', label: 'Strymon BlueSky' },
  { id: 'BossDd8', label: 'Boss DD-8' },
  { id: 'BehringerXenyx802', label: 'Behringer Xenyx 802' }
]; 