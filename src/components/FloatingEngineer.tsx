import engTomImage from "@/assets/eng-tom-illa.jpg";

const FloatingEngineer = () => {
  return (
    <div className="fixed bottom-24 right-4 z-40 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="flex flex-col items-center bg-primary text-primary-foreground rounded-lg p-3 shadow-xl border-2 border-primary-foreground/20">
        <img 
          src={engTomImage} 
          alt="Eng. Tom Illa"
          className="w-16 h-16 rounded-full object-cover border-3 border-primary-foreground shadow-lg"
        />
        <p className="text-sm font-bold mt-2">Eng. Tom Illa</p>
        <p className="text-xs opacity-90">Director</p>
      </div>
    </div>
  );
};

export default FloatingEngineer;
