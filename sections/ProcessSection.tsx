import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const ProcessSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="process" className="relative flex flex-col justify-center py-16 bg-[#f6f7fb] overflow-hidden">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Process section placeholder */}
        <div>Process Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
