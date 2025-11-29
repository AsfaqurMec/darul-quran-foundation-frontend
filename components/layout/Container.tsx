type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props): JSX.Element {
  return (
    <div className={`max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}


