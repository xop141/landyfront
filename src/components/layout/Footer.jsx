import React from 'react';
import { Facebook, Github, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const icons = [Facebook, Github, Instagram];

const Footer = () => {
  return (
    <div className="m-4 rounded-xl p-4 flex flex-col gap-4">
      <div className='flex items-center gap-2'>
        
        <span className='font-bold'>Landy</span>
      </div>

      <Separator className="bg-white/20" />

      <div className='flex gap-2'>
        {icons.map((Icon, index) => (
          <div
            key={index}
            className='p-2 bg-white/20 backdrop-blur-xl rounded-xl hover:bg-white/30 transition-colors'
          >
            <Icon className="w-6 h-6 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
