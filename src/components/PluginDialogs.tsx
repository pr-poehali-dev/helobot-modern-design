import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface PluginDialogsProps {
  apiKeyDialog: boolean;
  setApiKeyDialog: (show: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  settings: any;
  setSettings: (settings: any) => void;
  pluginDialog: boolean;
  setPluginDialog: (show: boolean) => void;
  customPlugin: {
    aggression: number;
    discipline: number;
    antiBotAggression: number;
    matReaction: string;
    ledProtection: number;
    aiModeration: number;
    bannedWords: string;
    artificialModeration: number;
  };
  setCustomPlugin: (plugin: any) => void;
}

export default function PluginDialogs({
  apiKeyDialog,
  setApiKeyDialog,
  apiKey,
  setApiKey,
  settings,
  setSettings,
  pluginDialog,
  setPluginDialog,
  customPlugin,
  setCustomPlugin,
}: PluginDialogsProps) {
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

  return (
    <>
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
    </>
  );
}
