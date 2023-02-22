interface ActionBarButtonProps {
  icon: string;
  onClick(): void;
}
const ActionBarButton: React.FC<ActionBarButtonProps> = ({icon, onClick}) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={icon} />
      </span>
    </button>
  );
};

export default ActionBarButton;
