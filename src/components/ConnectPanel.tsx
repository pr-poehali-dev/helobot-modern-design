import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

type ConnectStep = 'connection' | 'settings' | 'plugins' | 'finish';

interface ConnectPanelProps {
  showConnectPanel: boolean;
  setShowConnectPanel: (show: boolean) => void;
  connectStep: ConnectStep;
  setConnectStep: (step: ConnectStep) => void;
  isLoading: boolean;
  loadingProgress: number;
  twitchLink: string;
  setTwitchLink: (link: string) => void;
  settings: {
    aiProcessed: boolean;
    autoModeration: boolean;
    twitchAPI: boolean;
    autoBan: boolean;
    autoMute: boolean;
    nickChecker: boolean;
    botChecker: boolean;
    adaptiveSettings: boolean;
    videoOld: boolean;
    aiToolkit: boolean;
    autoReport: boolean;
    checkBan: boolean;
    checkMute: boolean;
  };
  setSettings: (settings: any) => void;
  setApiKeyDialog: (show: boolean) => void;
  loadingPlugin: string | null;
  pluginProgress: number;
  handlePluginLoad: (name: string) => void;
  setPluginDialog: (show: boolean) => void;
  handleFinish: () => void;
}

export default function ConnectPanel({
  showConnectPanel,
  setShowConnectPanel,
  connectStep,
  setConnectStep,
  isLoading,
  loadingProgress,
  twitchLink,
  setTwitchLink,
  settings,
  setSettings,
  setApiKeyDialog,
  loadingPlugin,
  pluginProgress,
  handlePluginLoad,
  setPluginDialog,
  handleFinish,
}: ConnectPanelProps) {
  const handleTwitchLinkSubmit = () => {
    if (!twitchLink.includes('twitch.tv/')) {
      toast.error('Ошибка: введите корректную ссылку на Twitch канал');
      return;
    }
    toast.success('Применено!', {
      description: 'Twitch канал успешно подключен',
    });
  };

  return (
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
  );
}
