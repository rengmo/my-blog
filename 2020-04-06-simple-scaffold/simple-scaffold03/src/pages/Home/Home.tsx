import { addNovelWord, subtractNovelWord } from '@/redux/actions/novel';
import personImage from '@/assets/images/hetian.png';
import './home.scss';

interface HomeProps {
  addWordsNumber: Function;
  substructWordsNumber: Function;
}

function Home(props: HomeProps): JSX.Element {
  const { addWordsNumber, substructWordsNumber } = props;
  const handleAddWordsNumber = (): void => {
    addWordsNumber(1);
  };
  const handleSubstructWordsNumber = (): void => {
    substructWordsNumber(2);
  };
  return (
    <div>
      <h1>使用Webpack等搭建一个适用于React项目的脚手架</h1>
      <div>
        <div onClick={handleAddWordsNumber} className="common-button">增加1个字</div>
        <div onClick={handleSubstructWordsNumber}  className="common-button">减少2个字</div>
      </div>
      <img src={personImage} />
    </div>
  );
}
const mapDispatchToProps = (dispatch: Function ): object => ({
  addWordsNumber: (number): void => dispatch(addNovelWord(number)),
  substructWordsNumber: (number): void => dispatch(subtractNovelWord(number)),
})

export default ReduxConnect(
  null,
  mapDispatchToProps,
)(Home);