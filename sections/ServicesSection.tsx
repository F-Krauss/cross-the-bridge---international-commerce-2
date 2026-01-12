import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const ServicesSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="services" className="relative bg-[#f6f7fb] text-brand-navy flex flex-col justify-center py-16 overflow-hidden">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Services section placeholder */}
        <div>Services Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
