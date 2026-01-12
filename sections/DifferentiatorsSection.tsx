import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const DifferentiatorsSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="differentiators" className="bg-brand-navy text-white flex flex-col justify-center relative py-16 pt-24 overflow-hidden">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Differentiators section placeholder */}
        <div>Differentiators Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
