import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function HowToSection() {
  return (
    <section id="howto" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-5xl font-bold mb-16 text-center">Процесс подключения</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Подключение',
              desc: 'Предоставьте ссылку на ваш Twitch-канал',
              icon: 'Link',
            },
            {
              num: '02',
              title: 'Настройка',
              desc: 'Тонкая настройка параметров модерации и AI',
              icon: 'Settings',
            },
            {
              num: '03',
              title: 'Плагины',
              desc: 'Выбор плагинов и завершение подключения',
              icon: 'Puzzle',
            },
          ].map((step) => (
            <Card key={step.num} className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all duration-300 hover-scale">
              <div className="text-5xl font-bold text-white/20 mb-4">{step.num}</div>
              <Icon name={step.icon as any} size={32} className="mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
