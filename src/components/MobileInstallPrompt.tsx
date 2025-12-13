import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const MobileInstallPrompt = () => {
  const { isInstallable, installApp } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isInstallable || isDismissed) {
      setIsVisible(false);
      return;
    }

    // Show initially
    setIsVisible(true);

    // Set up interval to show every minute
    const interval = setInterval(() => {
      if (!isDismissed && isInstallable) {
        setIsVisible(true);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [isInstallable, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Will show again in 1 minute due to interval
  };

  const handlePermanentDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleInstall = () => {
    installApp();
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible || !isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="font-semibold text-sm">Install Toval App</p>
            <p className="text-xs opacity-90 mt-1">Get quick access from your home screen</p>
          </div>
          <button 
            onClick={handlePermanentDismiss}
            className="p-1 hover:bg-primary-foreground/20 rounded"
            aria-label="Dismiss permanently"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1"
            onClick={handleInstall}
          >
            <Download className="h-4 w-4 mr-2" />
            Install Now
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDismiss}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileInstallPrompt;
