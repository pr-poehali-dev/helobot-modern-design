import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Section = 'about' | 'howto' | 'connect';

interface HeroSectionProps {
  scrollToSection: (section: Section) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl text-center">
        <div className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full">
          <span className="text-sm tracking-widest text-gray-400">AI-POWERED MODERATION</span>
        </div>
        <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          HELOBOT
        </h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
          Лучший бот для модерации с мощным ИИ. В сложных случаях отправляет спорное сообщение 
          на проверку в серверную систему, чтобы избежать ошибок.
        </p>
        <Button 
          onClick={() => scrollToSection('howto')}
          className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold transition-all duration-300 hover-scale"
        >
          Как подключить?
          <Icon name="ArrowRight" className="ml-2" size={20} />
        </Button>
      </div>
    </section>
  );
}
