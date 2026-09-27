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
      className="rounded-lg bg-linear-to-r from-[#249AFF] to-[#005EAF] px-5 py-2 text-sm font-semibold text-white hover:cursor-pointer disabled:opacity-50"
    >
      {saving ? savingLabel : label}
    </button>
  );
};

export default SaveButton;
