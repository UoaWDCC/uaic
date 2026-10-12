interface CancelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const CancelButton = ({ onClick, disabled, label = "Cancel" }: CancelButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border-border rounded-full border-2 px-4 py-2 text-xs font-medium text-slate-500 hover:cursor-pointer md:text-sm"
    >
      {label}
    </button>
  );
};

export default CancelButton;
