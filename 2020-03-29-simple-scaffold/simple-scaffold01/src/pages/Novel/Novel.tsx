export default function Novel(): JSX.Element {
  const novelsArr = ['一号小说', '二号小说'];
  return (
    <div>
      <ul>
        {novelsArr.map((novel, index) => {
          return <li key={index}>{novel}</li>;
        })}
      </ul>
    </div>
  );
}