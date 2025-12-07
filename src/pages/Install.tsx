import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle, Share } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import logo from "@/assets/logo.png";

const Install = () => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      console.log("App installed successfully");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <img src={logo} alt="Toval Engineering Contractors" className="h-24 w-auto mx-auto mb-8" />
          
          <h1 className="text-4xl font-bold mb-4">Install Toval App</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get quick access to Toval Engineering Contractors right from your home screen
          </p>

          {isInstalled ? (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">App Installed!</h2>
                <p className="text-muted-foreground">
                  You can now access Toval from your home screen.
                </p>
              </CardContent>
            </Card>
          ) : isInstallable ? (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <Download className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Ready to Install</h2>
                <Button size="lg" onClick={handleInstall}>
                  <Download className="mr-2 h-5 w-5" />
                  Install App
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Smartphone className="h-6 w-6" />
                  Install on Your Device
                </CardTitle>
                <CardDescription>
                  Follow these steps to add the app to your home screen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-left space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">On iPhone/iPad (Safari)</p>
                      <p className="text-sm text-muted-foreground">
                        Tap the <Share className="inline h-4 w-4" /> Share button, then select "Add to Home Screen"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">On Android (Chrome)</p>
                      <p className="text-sm text-muted-foreground">
                        Tap the menu (⋮), then select "Add to Home Screen" or "Install App"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">On Desktop (Chrome/Edge)</p>
                      <p className="text-sm text-muted-foreground">
                        Look for the install icon in the address bar, or use the browser menu
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <Card>
              <CardContent className="pt-6">
                <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Quick Access</h3>
                <p className="text-sm text-muted-foreground">Launch from home screen</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Offline Ready</h3>
                <p className="text-sm text-muted-foreground">Works without internet</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Fast & Light</h3>
                <p className="text-sm text-muted-foreground">No app store needed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Install;
