import { useState } from 'react';
import { toast } from 'sonner';
import HeroSection from '@/components/HeroSection';
import HowToSection from '@/components/HowToSection';
import ConnectPanel from '@/components/ConnectPanel';
import PluginDialogs from '@/components/PluginDialogs';

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

      <HeroSection scrollToSection={scrollToSection} />
      <HowToSection />

      <ConnectPanel
        showConnectPanel={showConnectPanel}
        setShowConnectPanel={setShowConnectPanel}
        connectStep={connectStep}
        setConnectStep={setConnectStep}
        isLoading={isLoading}
        loadingProgress={loadingProgress}
        twitchLink={twitchLink}
        setTwitchLink={setTwitchLink}
        settings={settings}
        setSettings={setSettings}
        setApiKeyDialog={setApiKeyDialog}
        loadingPlugin={loadingPlugin}
        pluginProgress={pluginProgress}
        handlePluginLoad={handlePluginLoad}
        setPluginDialog={setPluginDialog}
        handleFinish={handleFinish}
      />

      <PluginDialogs
        apiKeyDialog={apiKeyDialog}
        setApiKeyDialog={setApiKeyDialog}
        apiKey={apiKey}
        setApiKey={setApiKey}
        settings={settings}
        setSettings={setSettings}
        pluginDialog={pluginDialog}
        setPluginDialog={setPluginDialog}
        customPlugin={customPlugin}
        setCustomPlugin={setCustomPlugin}
      />

      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© 2026 HELOBOT_UNITKB. All rights reserved.</p>
      </footer>
    </div>
  );
}
