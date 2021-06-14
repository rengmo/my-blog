// 在项目中可以使用 import { useState } from 'react'; 引入useState
// 因为在浏览器中会将import转换为require，于是会报错require is not defined，所以使用下面这个句子引入useState
let useState = React.useState; 
let useEffect = React.useEffect; 

function TodoItem (props) {
  const { content, setCompleteItems } = props;
  // 声明一个名为complete的state变量，可以通过setComplete改变变量的值，complete的初始值为false。
  const [ complete, setComplete ] = useState(false);
  let timer = null; // 定时器
  // useEffect的参数为一个函数，这个函数在组件挂载和更新时都会执行
  useEffect(() => {
    // 在useEffect中返回一个函数，这个函数会在组件清除的时候执行
    return () => {
      clearTimeout(timer)
    }
  });
  function changeTodoState (content, event) {
    let value = event.target.value;
    timer = setTimeout(() => {
      if (value) {
        // 通过setComplete改变complete的值
        setComplete(true);
        setCompleteItems(content); // 这里原本是this.props.setCompleteItems(content);
      }
    }, 200);
  }
  return (
    (!complete) && 
    <li className="todo-item" key={content.toString()}>
      {/* 如果不需要绑定参数，在{}中直接写this.changeTodoState就行，如果要传入参数，则需要使用bind方法 */}
      <input type="checkbox" onChange={changeTodoState.bind(this, content)}/>
      <span>{content}</span>
    </li>
  );
}

function TodoList (props) {
  const { list } = props;
  const [ completeItems, setCompleteItemsState ] = useState([]);
  useEffect(() => {
    // 更新文档的title
    document.title = completeItems.join();
    return () => {
      document.title = '清单';
    }
  });
  const setCompleteItems = (completedItem) => {
    setCompleteItemsState([...completeItems, completedItem]);
  };
  const unmountComponent = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  };
  let todoList = list.map((item) => <TodoItem content={item} setCompleteItems={setCompleteItems}/>);
  return (
    <div>
      <ul className="todo-list">
        {todoList}
      </ul>
      <p>已完成: {completeItems.join()}</p>
      <p onClick={unmountComponent}>点此手动卸载组件</p>
   </div>
  )
}
let list = ['洗衣服', '买水果', '追剧'];
const todoList = <TodoList  list={list} />;
ReactDOM.render(
  todoList,
  document.getElementById('root')
);