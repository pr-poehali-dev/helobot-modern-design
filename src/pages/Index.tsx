import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

type Section = 'about' | 'howto' | 'connect';
type ConnectStep = 'connection' | 'settings' | 'plugins' | 'finish';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [showConnectPanel, setShowConnectPanel] = useState(false);
  const [connectStep, setConnectStep] = useState<ConnectStep>('connection');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [twitchLink, setTwitchLink] = useState('');
  const [apiKeyDialog, setApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [pluginDialog, setPluginDialog] = useState(false);
  const [loadingPlugin, setLoadingPlugin] = useState<string | null>(null);
  const [pluginProgress, setPluginProgress] = useState(0);

  const [settings, setSettings] = useState({
    aiProcessed: false,
    autoModeration: false,
    twitchAPI: false,
    autoBan: false,
    autoMute: false,
    nickChecker: false,
    botChecker: false,
    adaptiveSettings: false,
    videoOld: false,
    aiToolkit: false,
    autoReport: false,
    checkBan: false,
    checkMute: false,
  });

  const [customPlugin, setCustomPlugin] = useState({
    aggression: 5,
    discipline: 3,
    antiBotAggression: 5,
    matReaction: 'multi',
    ledProtection: 5,
    aiModeration: 6,
    bannedWords: '',
    artificialModeration: 5,
  });

  const handleOpenConnect = () => {
    setShowConnectPanel(true);
    setIsLoading(true);
    setLoadingProgress(0);

    const duration = 4500;
    const steps = 45;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setLoadingProgress((step / steps) * 100);
      if (step >= steps) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, interval);
  };

  const handleTwitchLinkSubmit = () => {
    if (!twitchLink.includes('twitch.tv/')) {
      toast.error('Ошибка: введите корректную ссылку на Twitch канал');
      return;
    }
    toast.success('Применено!', {
      description: 'Twitch канал успешно подключен',
    });
  };

  const handleApiKeySubmit = () => {
    if (apiKey === '89HTPSCALL') {
      toast.success('API ключ принят', {
        description: 'AI-TOOLKIT активирован',
      });
      setSettings({ ...settings, aiToolkit: true });
      setApiKeyDialog(false);
      setApiKey('');
    } else {
      toast.error('Ошибка: неверный API ключ');
    }
  };

  const handlePluginLoad = (pluginName: string) => {
    setLoadingPlugin(pluginName);
    setPluginProgress(0);

    const duration = Math.random() * 6000 + 4000;
    const steps = 50;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setPluginProgress((step / steps) * 100);
      if (step >= steps) {
        clearInterval(timer);
        setLoadingPlugin(null);
        toast.success('Применено!', {
          description: `${pluginName} установлен`,
        });
      }
    }, interval);
  };

  const handleFinish = () => {
    setIsLoading(true);
    setLoadingProgress(0);

    const duration = 12000;
    const steps = 120;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setLoadingProgress((step / steps) * 100);
      if (step >= steps) {
        clearInterval(timer);
        setIsLoading(false);
        toast.success('Успешно!', {
          description: 'Бот прибудет на стрим через 2-3 минуты',
          duration: 5000,
        });
      }
    }, interval);
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wider">HELOBOT_UNITKB</h1>
          <div className="flex gap-8">
            {(['about', 'howto', 'connect'] as Section[]).map((section) => (
              <button
                key={section}
                onClick={() => section === 'connect' ? handleOpenConnect() : scrollToSection(section)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-white relative group ${
                  activeSection === section ? 'text-white' : 'text-gray-400'
                }`}
              >
                {section === 'about' && 'О боте'}
                {section === 'howto' && 'Как подключить?'}
                {section === 'connect' && 'Подключение'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
      </nav>

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

      <Dialog open={showConnectPanel} onOpenChange={setShowConnectPanel}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-black border-white/20 text-white overflow-hidden p-0">
          {isLoading && connectStep === 'connection' ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg text-gray-400">Загрузка панели управления...</p>
                <Progress value={loadingProgress} className="w-64 mt-4 mx-auto" />
              </div>
            </div>
          ) : (
            <div className="flex h-[85vh]">
              <div className="w-64 bg-white/5 border-r border-white/10 p-6">
                <h3 className="text-xs font-bold tracking-widest mb-6 text-gray-400">МЕНЮ</h3>
                {[
                  { id: 'connection', label: 'Подключение', icon: 'Link' },
                  { id: 'settings', label: 'Настройка', icon: 'Settings' },
                  { id: 'plugins', label: 'Плагины', icon: 'Puzzle' },
                  { id: 'finish', label: 'Завершить', icon: 'Check' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConnectStep(item.id as ConnectStep)}
                    className={`w-full text-left px-4 py-3 mb-2 rounded transition-all duration-200 flex items-center gap-3 ${
                      connectStep === item.id ? 'bg-white text-black' : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon name={item.icon as any} size={18} />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 p-8 overflow-y-auto">
                {connectStep === 'connection' && (
                  <div className="max-w-xl">
                    <h2 className="text-3xl font-bold mb-6">Подключение канала</h2>
                    <Label className="text-sm text-gray-400 mb-2 block">Ссылка на Twitch канал</Label>
                    <div className="flex gap-3">
                      <Input
                        value={twitchLink}
                        onChange={(e) => setTwitchLink(e.target.value)}
                        placeholder="https://twitch.tv/yourchannel"
                        className="bg-white/5 border-white/20 text-white"
                      />
                      <Button onClick={handleTwitchLinkSubmit} className="bg-white text-black hover:bg-gray-200">
                        Применить
                      </Button>
                    </div>
                  </div>
                )}

                {connectStep === 'settings' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Настройка модерации</h2>
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries({
                        aiProcessed: 'AI-PROCESSED',
                        autoModeration: 'AutoModeration',
                        twitchAPI: 'TwitchAPI',
                        autoBan: 'Auto-ban',
                        autoMute: 'Auto-mute',
                        nickChecker: 'Nick-checker',
                        botChecker: 'Bot-checker',
                        adaptiveSettings: 'Adaptive_settings',
                        videoOld: 'Video old',
                        autoReport: 'Auto-report (my servers)',
                        checkBan: 'Check-ban',
                        checkMute: 'Check-mute',
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-white/10 rounded">
                          <Label className="text-sm">{label}</Label>
                          <Switch
                            checked={settings[key as keyof typeof settings]}
                            onCheckedChange={(checked) => setSettings({ ...settings, [key]: checked })}
                          />
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-4 border border-white/10 rounded bg-white/5">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">AI-TOOLKIT</Label>
                          <span className="text-xs bg-white text-black px-2 py-0.5 rounded">ПРЕМИУМ</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => setApiKeyDialog(true)}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Активировать
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {connectStep === 'plugins' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Плагины</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { name: 'Hard moderation plugin', sizes: ['3кб', '4кб', '5кб'], available: true },
                        { name: 'Soft moderation plugin', sizes: ['3кб', '4кб'], available: true },
                        { name: 'Anti-spam plugin', sizes: ['2кб', '3кб'], available: true },
                        { name: 'Chat filter plugin', sizes: ['4кб'], available: false },
                        { name: 'URL blocker plugin', sizes: ['2кб'], available: true },
                        { name: 'Emoji limiter plugin', sizes: ['1кб'], available: true },
                        { name: 'Advanced AI plugin', sizes: ['10кб'], available: false },
                        { name: 'Custom rules plugin', sizes: ['5кб'], available: false },
                      ].map((plugin) => (
                        <Card key={plugin.name} className="bg-white/5 border-white/10 p-4">
                          <h3 className="text-sm font-semibold mb-2">{plugin.name}</h3>
                          {plugin.available ? (
                            <>
                              <div className="flex gap-2 mb-3">
                                {plugin.sizes.map((size) => (
                                  <span key={size} className="text-xs px-2 py-1 bg-white/10 rounded">
                                    {size}
                                  </span>
                                ))}
                              </div>
                              {loadingPlugin === plugin.name ? (
                                <Progress value={pluginProgress} className="w-full" />
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => handlePluginLoad(plugin.name)}
                                  className="w-full bg-white text-black hover:bg-gray-200"
                                >
                                  Загрузить
                                </Button>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">Не доступно</span>
                          )}
                        </Card>
                      ))}
                    </div>
                    <Button onClick={() => setPluginDialog(true)} variant="outline" className="w-full border-white/20">
                      Создать свой плагин
                    </Button>
                  </div>
                )}

                {connectStep === 'finish' && (
                  <div className="max-w-xl">
                    <h2 className="text-3xl font-bold mb-6">Завершение подключения</h2>
                    <Label className="text-sm text-gray-400 mb-4 block">Выберите тип бота</Label>
                    <RadioGroup defaultValue="lk" className="mb-6">
                      <div className="flex items-center space-x-2 p-4 border border-white/10 rounded mb-2">
                        <RadioGroupItem value="lk" id="lk" />
                        <Label htmlFor="lk">LK BOT</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-white/10 rounded">
                        <RadioGroupItem value="spk" id="spk" />
                        <Label htmlFor="spk">Spk</Label>
                      </div>
                    </RadioGroup>
                    {isLoading ? (
                      <div className="text-center">
                        <Progress value={loadingProgress} className="mb-4" />
                        <p className="text-sm text-gray-400">Финализация подключения...</p>
                      </div>
                    ) : (
                      <Button onClick={handleFinish} className="w-full bg-white text-black hover:bg-gray-200 py-6">
                        Завершить подключение
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={apiKeyDialog} onOpenChange={setApiKeyDialog}>
        <DialogContent className="bg-black border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Активация AI-TOOLKIT</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-400 mb-2 block">API ключ</Label>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Введите API ключ"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <Button onClick={handleApiKeySubmit} className="w-full bg-white text-black hover:bg-gray-200">
              Подтвердить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={pluginDialog} onOpenChange={setPluginDialog}>
        <DialogContent className="max-w-4xl bg-black border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Создать свой плагин</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Агрессивность модерации (1-10)</Label>
                <Slider
                  value={[customPlugin.aggression]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, aggression: v[0] })}
                  max={10}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.aggression}</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Дисциплина бота (1-5)</Label>
                <Slider
                  value={[customPlugin.discipline]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, discipline: v[0] })}
                  max={5}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.discipline}</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Анти-бот агрессивность (1-10)</Label>
                <Slider
                  value={[customPlugin.antiBotAggression]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, antiBotAggression: v[0] })}
                  max={10}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.antiBotAggression}</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Реакция на мат</Label>
                <RadioGroup
                  value={customPlugin.matReaction}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, matReaction: v })}
                >
                  <div className="flex items-center space-x-2 text-xs">
                    <RadioGroupItem value="multi" id="multi" />
                    <Label htmlFor="multi">Мут 10 мин за &gt;10 матов</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <RadioGroupItem value="each" id="each" />
                    <Label htmlFor="each">Мут за каждый мат</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Защита от накрутки Led (1-10)</Label>
                <Slider
                  value={[customPlugin.ledProtection]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, ledProtection: v[0] })}
                  max={10}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.ledProtection}</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">AI-модерация (1-10, рек. 6)</Label>
                <Slider
                  value={[customPlugin.aiModeration]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, aiModeration: v[0] })}
                  max={10}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.aiModeration}</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Анти-каспер</Label>
                <span className="text-xs text-gray-600">Не доступно</span>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Запрещенные слова</Label>
                <Textarea
                  value={customPlugin.bannedWords}
                  onChange={(e) => setCustomPlugin({ ...customPlugin, bannedWords: e.target.value })}
                  placeholder="Слова через запятую"
                  className="bg-white/5 border-white/20 text-white text-xs"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-xs text-gray-400">Искусственная модерация чата (1-10)</Label>
                  <Icon name="Info" size={14} className="text-gray-500" />
                </div>
                <Slider
                  value={[customPlugin.artificialModeration]}
                  onValueChange={(v) => setCustomPlugin({ ...customPlugin, artificialModeration: v[0] })}
                  max={10}
                  min={1}
                  step={1}
                />
                <span className="text-sm">{customPlugin.artificialModeration}</span>
              </div>
              <div className="text-xs text-gray-600 pt-4">
                <p>Остальные функции не поддерживаются данным устройством</p>
              </div>
            </div>
          </div>

          <Separator className="my-4 bg-white/10" />

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-white/20">
              Установить плагин на ПК (txt)
            </Button>
            <Button className="flex-1 bg-white text-black hover:bg-gray-200">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© 2026 HELOBOT_UNITKB. All rights reserved.</p>
      </footer>
    </div>
  );
}
