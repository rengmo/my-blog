interface HeaderProps {
  userName: string;
}
export default function Header (props: HeaderProps): JSX.Element {
  return (
    <div>
      <p>{props.userName}</p>
    </div>
  );
}