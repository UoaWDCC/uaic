interface SaveButtonProps {
  onClick: () => void;
  saving: boolean;
  label?: string;
  savingLabel?: string;
}

const SaveButton = ({
  onClick,
  saving,
  label = "Save Changes",
  savingLabel = "Saving...",
}: SaveButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="from-primary-light to-primary rounded-full bg-linear-to-r px-5 py-2 text-xs font-semibold text-white hover:cursor-pointer disabled:opacity-50 md:text-sm"
    >
      {saving ? savingLabel : label}
    </button>
  );
};

export default SaveButton;
