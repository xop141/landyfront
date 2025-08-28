"use client"
import React from 'react';
import { Facebook, Github, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import LogoLoop from '../reactBits/LogoLoop/LogoLoop';
const icons = [Facebook, Github, Instagram];
const techLogos = [
  { node: <Facebook />, title: "React", href: "https://react.dev" },
  { node: <Github />, title: "Next.js", href: "https://nextjs.org" },
  { node: <Instagram />, title: "TypeScript", href: "https://www.typescriptlang.org" }
];
const Footer = () => {
  return (
   <div className='py-6'>

      <LogoLoop
        logos={techLogos}
        speed={30}
        direction="left"
        logoHeight={48}
        gap={80}
        pauseOnHover
        scaleOnHover
      />
</div>
  );
};

export default Footer;
