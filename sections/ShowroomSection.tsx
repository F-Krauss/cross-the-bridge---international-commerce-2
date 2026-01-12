import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const ShowroomSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="showroom" className="bg-brand-navy text-white flex flex-col justify-center relative py-16">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Showroom section placeholder */}
        <div>Showroom Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
