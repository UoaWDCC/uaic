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
      className="rounded-lg border-2 border-[#E2E9F2] px-5 py-2 text-sm font-medium text-slate-500 hover:cursor-pointer"
    >
      {label}
    </button>
  );
};

export default CancelButton;
