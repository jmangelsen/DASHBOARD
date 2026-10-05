import React from 'react';
import { DataClassification } from '../../types';

interface Props {
  classification: DataClassification;
  showIcon?: boolean;
}

export const DataClassificationBadge: React.FC<Props> = ({ classification }) => {
  const getStyle = () => {
    switch (classification) {
      case 'public':
        return 'text-emerald-400 border-l-2 border-emerald-500/60 pl-1.5';
      case 'licensed':
        return 'text-cyan-400 border-l-2 border-cyan-500/60 pl-1.5';
      case 'customer-provided':
        return 'text-amber-400 border-l-2 border-amber-500/60 pl-1.5';
      case 'private':
        return 'text-violet-400 border-l-2 border-violet-500/60 pl-1.5';
      case 'restricted':
        return 'text-rose-400 border-l-2 border-rose-500 pl-1.5 font-medium';
      default:
        return 'text-slate-400 border-l-2 border-slate-600 pl-1.5';
    }
  };

  return (
    <span className={`text-[11px] uppercase tracking-wider font-mono ${getStyle()}`}>
      {classification}
    </span>
  );
};
