import React from 'react';
import { SectionProps } from './types';
import { ScrollReveal } from './shared';

export const ContactSection: React.FC<SectionProps> = ({ lang, t, ui }) => {
  return (
    <section id="contact" className="bg-[#f6f7fb] flex flex-col justify-center relative text-brand-navy py-16">
      <ScrollReveal className="container mx-auto px-4 md:px-6">
        {/* Contact section placeholder */}
        <div>Contact Section - To be implemented</div>
      </ScrollReveal>
    </section>
  );
};
