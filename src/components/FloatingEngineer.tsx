import engTomImage from "@/assets/eng-tom-illa.jpg";

const FloatingEngineer = () => {
  return (
    <div className="fixed bottom-20 right-4 z-40 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
      <div className="flex flex-col items-center bg-card/80 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border/50">
        <img 
          src={engTomImage} 
          alt="Eng. Tom Illa"
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <p className="text-xs font-semibold mt-1 text-foreground">Eng. Tom Illa</p>
        <p className="text-[10px] text-muted-foreground">Director</p>
      </div>
    </div>
  );
};

export default FloatingEngineer;
