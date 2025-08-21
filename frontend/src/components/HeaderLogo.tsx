const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/url.png" 
        alt="CropLink Logo" 
        className="h-10 w-10 object-contain drop-shadow-md"
      />
      <p className="font-bold text-2xl text-white tracking-wide">
        CropLink
      </p>
    </div>
  );
};

export default HeaderLogo;
