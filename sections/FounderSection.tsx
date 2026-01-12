import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const FounderSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="team" className="flex flex-col bg-[#f6f7fb] overflow-hidden">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Founder section placeholder */}
        <div>Founder Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
