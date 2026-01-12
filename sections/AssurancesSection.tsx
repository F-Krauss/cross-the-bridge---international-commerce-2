import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const AssurancesSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section className="bg-[#f6f7fb] text-brand-navy py-16 border-t border-gray-100">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Assurances section placeholder */}
        <div>Assurances Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
