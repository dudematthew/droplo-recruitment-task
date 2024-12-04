

interface MoveIconProps {
  className?: string;
}

export function MoveIcon({ className = "w-6 h-6" }: MoveIconProps) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M4.1667 7.5001L1.6667 10.0001M1.6667 10.0001L4.1667 12.5001M1.6667 10.0001H18.3333M7.5 4.1667L10 1.6667M10 1.6667L12.5 4.1667M10 1.6667V18.3334M12.5 15.8334L10 18.3334M10 18.3334L7.5 15.8334M15.8333 7.5001L18.3333 10.0001M18.3333 10.0001L15.8333 12.5001" 
        stroke="currentColor" 
        strokeWidth="1.66667" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
} 