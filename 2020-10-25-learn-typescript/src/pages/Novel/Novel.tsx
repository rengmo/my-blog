export default function Novel(): JSX.Element {
  const [ novels, setNovels ] = UseState(['一号小说', '二号小说']);
  function deleteNovel (index): void {
    if (!novels[index]) return;
    const nextNovels = [...novels];
    nextNovels.splice(index, 1);
    setNovels(nextNovels);
  }
  return (
    <div>
      <ul>
        {novels.map((novel, index) => {
          return <li key={index} onClick={deleteNovel.bind(this, index)} style={{ cursor: 'pointer' }}>{novel}</li>;
        })}
      </ul>
    </div>
  );
}